/* Google Sheets content adapter. Plain text only; profile markup stays in app.js. */
(function (root) {
  'use strict';

  const clean = value => String(value ?? '').normalize('NFC')
    .replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim();
  const singleLine = value => clean(value).replace(/\s+/g, ' ');
  const bullets = value => clean(value).split('\n')
    .map(line => singleLine(line).replace(/^(?:[-*•▪◦‣]\s*|\d+[.)]\s+)/, '').trim())
    .filter(Boolean);
  const key = value => singleLine(value).toLocaleLowerCase('en-US');

  // Handles commas, escaped quotes, and multiline biographies inside quoted cells.
  function parseCSV(text) {
    text = String(text).replace(/^\uFEFF/, '');
    if (/^\s*</.test(text)) throw new Error('The content feed returned a web page instead of CSV.');
    const rows = []; let row = [], field = '', quoted = false, closed = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quoted) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') { quoted = false; closed = true; }
        else field += c;
      } else if (c === '"') {
        if (field || closed) throw new Error('Invalid CSV quote.');
        quoted = true;
      } else if (c === ',' || c === '\n' || c === '\r') {
        row.push(field); field = ''; closed = false;
        if (c !== ',') {
          rows.push(row); row = [];
          if (c === '\r' && text[i + 1] === '\n') i++;
        }
      } else {
        if (closed) throw new Error('Unexpected text after a quoted CSV cell.');
        field += c;
      }
    }
    if (quoted) throw new Error('The content feed contains an unfinished quoted cell.');
    if (field || row.length || closed) { row.push(field); rows.push(row); }
    return rows;
  }

  function publicURL(value) {
    try {
      const url = new URL(clean(value));
      return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
    } catch { return ''; }
  }

  function photoURL(value) {
    const raw = publicURL(value);
    if (!raw) return '';
    const url = new URL(raw);
    if (url.hostname === 'drive.google.com') {
      const id = url.searchParams.get('id') || url.pathname.match(/^\/file\/d\/([\w-]+)/)?.[1];
      if (!id || !/^[\w-]+$/.test(id)) return '';
      return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
    }
    return raw;
  }

  function readContent(csv, institutions, yearBefore = 2026) {
    const rows = parseCSV(csv);
    const headers = rows.shift()?.map(key) || [];
    const required = ['College', 'Timeline year', 'Name', 'Life dates', 'College connection',
      'Institutional Connection and Legacy', 'Biography', 'Photo', 'Sources', 'Entry ID'];
    for (const header of required) {
      if (headers.filter(h => h === key(header)).length !== 1) throw new Error(`Missing or duplicate feed column: ${header}`);
    }
    const people = [], timelines = [], errors = [], ids = new Set(), names = new Set();
    rows.forEach((values, index) => {
      if (values.every(v => !clean(v))) return;
      const get = label => clean(values[headers.indexOf(key(label))]);
      if (headers.includes('published') && key(get('Published')) !== 'true') return;
      const error = message => errors.push({ row: index + 2, name: singleLine(get('Name')), message });
      if (values.length !== headers.length) return error('Row has the wrong number of columns.');
      const school = institutions.find(i => key(i.name) === key(get('College')));
      if (!school) return error('Choose a supported college.');
      const yearText = get('Timeline year'), year = Number(yearText);
      if (!/^\d{4}$/.test(yearText) || year >= yearBefore || year < (school.timelineStart ?? school.founded))
        return error(`Use a four-digit year from ${school.timelineStart ?? school.founded} through ${yearBefore - 1}.`);
      const name = singleLine(get('Name')), connection = singleLine(get('College connection'));
      const bio = bullets(get('Biography')), legacy = bullets(get('Institutional Connection and Legacy'));
      const image = photoURL(get('Photo')), sourceId = singleLine(get('Entry ID'));
      if (get('Photo') && !image) return error('Photo must be a complete http or https link, or left blank.');
      const photoSourceText = get('Photo source');
      const photoSource = publicURL(photoSourceText);
      if (photoSourceText && !photoSource) return error('Photo source must be a complete http or https link, or left blank.');
      const hasBurialLocation = headers.includes('burial location');
      const burialText = get('Burial Location');
      const burialLocation = publicURL(burialText);
      if (burialText && !burialLocation) return error('Burial Location must be a complete http or https map link, or left blank.');
      if (!name || !connection || !bio.length || !legacy.length || !sourceId)
        return error('Name, college connection, legacy, biography, and entry ID are required.');
      if (name.length > 200 || connection.length > 2000 || bio.join('').length > 50000 || legacy.join('').length > 50000)
        return error('Content is too long. Shorten the name, connection, or biography sections.');
      const identity = `${school.id}:${key(name)}`;
      if (ids.has(sourceId) || names.has(identity)) return error('Duplicate person or entry ID. Edit the existing submission instead.');
      const sources = [];
      for (const line of bullets(get('Sources'))) {
        const match = line.match(/^(.*?)\s*(https?:\/\/\S+)$/);
        const url = match && publicURL(match[2]);
        if (!url) {
          // Books and other print references may be cited without a web address.
          // Keep rejecting malformed or unsafe links instead of disguising them as print citations.
          if (match || /[|]|\b(?:https?|javascript|data|file):/i.test(line))
            return error('Use a plain-text print citation or a complete http or https source link.');
          sources.push({ title: line });
          continue;
        }
        sources.push({ title: match[1].replace(/[|—–-]\s*$/, '').trim() || new URL(url).hostname, url });
      }
      ids.add(sourceId); names.add(identity);
      const id = `sheet:${sourceId}`;
      people.push({ id, name, years: singleLine(get('Life dates')), bio, legacy, sources, showSources: true,
        ...(hasBurialLocation ? { burialLocation } : {}),
        connections: [{ institutionId: school.id, label: connection }],
        image: image ? { url: image, sourceUrl: photoSource, alt: `Portrait of ${name}` } : null });
      timelines.push({ institutionId: school.id, entries: [{ id, personId: id, sortYear: year, displayDate: yearText }] });
    });
    return { people, timelines, errors };
  }

  // Check supplied portraits before exposing their person records.
  function checkImage(url, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const img = new root.Image();
      const finish = error => { clearTimeout(timer); img.onload = img.onerror = null; error ? reject(error) : resolve(); };
      const timer = setTimeout(() => { img.src = ''; finish(new Error('Photo took too long to load.')); }, timeoutMs);
      img.onload = () => img.naturalWidth > 0 ? finish() : finish(new Error('Photo is empty.'));
      img.onerror = () => finish(new Error('Photo could not load. Check its public sharing permissions.'));
      img.referrerPolicy = 'no-referrer';
      img.src = url;
    });
  }

  function install(store, config, options = {}) {
    if (!config?.csvUrl) return { refresh: async () => ({ configured: false }) };
    config = { ...config, sheetOwnsProfiles: config.sheetOwnsProfiles !== false };
    const basePeople = structuredClone(store.people), baseTimelines = structuredClone(store.timelines);
    const fetcher = options.fetch || root.fetch.bind(root);
    const verifyImage = options.checkImage || (url => checkImage(url, config.timeoutMs));
    let inFlight;
    const status = { state: 'loading', errors: [], updatedAt: null };

    // In sheet-managed mode, do not briefly expose bundled people before the feed
    // loads, or resurrect unpublished people if the first request fails.
    if (config.sheetOwnsProfiles) {
      store.people.splice(0);
      store.timelines.forEach(t => { t.entries = t.entries.filter(e => !e.personId); });
      store.timelines.splice(0, store.timelines.length, ...store.timelines.filter(t => t.entries.length));
      store.notify(null);
    }

    function apply(snapshot) {
      const people = structuredClone(basePeople), timelines = structuredClone(baseTimelines);
      const personIds = new Map();
      for (const person of snapshot.people) {
        let merged = person;
        // A submitted version of a bundled example replaces its original, without duplicate names.
        const originalId = person.id.slice('sheet:'.length);
        const existing = people.findIndex(p => p.id === originalId || (key(p.name) === key(person.name) &&
          p.connections.some(c => c.institutionId === person.connections[0].institutionId)));
        if (existing >= 0) {
          const original = people[existing];
          // Editing a shared profile must preserve its other college connections,
          // portrait treatment, attribution, and stable profile/timeline identifiers.
          const connections = original.connections.map(connection =>
            person.connections.find(item => item.institutionId === connection.institutionId) || connection);
          for (const connection of person.connections) {
            if (!connections.some(item => item.institutionId === connection.institutionId)) connections.push(connection);
          }
          merged = { ...original, ...person, id: original.id, connections,
            image: person.image ? { ...original.image, ...person.image, alt: original.image?.alt || person.image.alt } : null };
          people[existing] = merged;
        } else {
          people.push(merged);
        }
        personIds.set(person.id, merged.id);
      }
      snapshot.timelines.forEach(t => {
        let target = timelines.find(item => item.institutionId === t.institutionId);
        if (!target) { target = { institutionId: t.institutionId, entries: [] }; timelines.push(target); }
        for (const entry of t.entries) {
          const personId = personIds.get(entry.personId) || entry.personId;
          const existing = target.entries.findIndex(item => item.personId === personId);
          if (existing >= 0) {
            const original = target.entries[existing];
            target.entries[existing] = { ...original, ...entry, id: original.id, personId,
              displayDate: original.sortYear === entry.sortYear ? original.displayDate : entry.displayDate };
          } else {
            target.entries.push({ ...entry, personId });
          }
        }
      });
      if (config.sheetOwnsProfiles) {
        const publishedIds = new Set(personIds.values());
        for (let i = people.length - 1; i >= 0; i--) {
          if (!publishedIds.has(people[i].id)) people.splice(i, 1);
        }
        timelines.forEach(t => {
          t.entries = t.entries.filter(e => !e.personId || publishedIds.has(e.personId));
        });
      }
      // Keep the arrays used by ProfileCard and InstitutionTimeline intact.
      store.people.splice(0, store.people.length, ...people);
      store.timelines.splice(0, store.timelines.length, ...timelines.filter(t => t.entries.length));
      store.notify(null);
    }

    async function load() {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), config.timeoutMs || 15000);
      try {
        status.state = 'loading';
        const feedURL = new URL(config.csvUrl, root.location?.href);
        // A fresh URL also avoids stale intermediary copies of Google's published CSV.
        feedURL.searchParams.set('_sv', String(Date.now()));
        const response = await fetcher(feedURL.href, { signal: controller.signal, credentials: 'omit', cache: 'no-store' });
        if (!response.ok) throw new Error(`Content feed is unavailable (${response.status}).`);
        const snapshot = readContent(await response.text(), store.institutions, config.yearBefore);
        // Limit concurrent downloads when the sheet grows to many people.
        const accepted = new Set(); let next = 0;
        async function worker() {
          while (next < snapshot.people.length) {
            const person = snapshot.people[next++];
            // Rights-reviewed assets must travel with their own source and credit.
            // A stale sheet photo must never inherit a different image's license.
            const originalId = person.id.slice('sheet:'.length);
            const original = basePeople.find(p => p.id === originalId || (key(p.name) === key(person.name) &&
              p.connections.some(c => c.institutionId === person.connections[0].institutionId)));
            if (person.image && original?.image?.license) person.image = structuredClone(original.image);
            try { if (person.image?.url) await verifyImage(person.image.url); accepted.add(person.id); }
            catch (error) { snapshot.errors.push({ name: person.name, message: error.message }); }
          }
        }
        await Promise.all(Array.from({ length: Math.min(4, snapshot.people.length) }, worker));
        snapshot.people = snapshot.people.filter(p => accepted.has(p.id));
        snapshot.timelines.forEach(t => { t.entries = t.entries.filter(e => accepted.has(e.personId)); });
        apply(snapshot);
        status.errors = snapshot.errors;
        status.updatedAt = new Date().toISOString();
        status.state = snapshot.errors.length ? 'partial' : 'ready';
        if (snapshot.errors.length) console.warn('South-View: rejected sheet entries', snapshot.errors);
        return { ...status, added: snapshot.people.length };
      } catch (error) {
        // Leave all existing content untouched if the entire feed fails.
        status.state = 'error'; status.errors = [{ message: error.message }];
        console.warn('South-View: existing content retained.', error.message);
        return { ...status };
      } finally { clearTimeout(timer); }
    }
    function refresh() {
      if (!inFlight) inFlight = load().finally(() => { inFlight = null; });
      return inFlight;
    }
    return { refresh, status };
  }

  const api = { clean, singleLine, bullets, parseCSV, photoURL, readContent, install };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SouthViewContent = api;
})(typeof window !== 'undefined' ? window : globalThis);
