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
      const photoLines = clean(photoSourceText).split('\n').map(line => line.trim());
      const photoCaption = photoLines.length === 2 ? photoLines[0] : (headers.includes('photo credit') ? singleLine(get('Photo credit')) : undefined);
      const photoSource = publicURL(photoLines.length === 2 ? photoLines[1] : photoSourceText);
      if (photoLines.length > 1 && (photoLines.length !== 2 || !photoCaption || photoCaption.length > 500 || !/^https:\/\//i.test(photoLines[1])))
        return error('Photo source: use the photographer or organization on line 1 and a complete https:// source link on line 2.');
      if (photoSourceText && !photoSource) return error('Photo source must be a complete http or https link, or left blank.');
      const hasBurialLocation = headers.includes('burial location');
      const burialText = get('Burial Location');
      const burialLocation = publicURL(burialText);
      if (burialText && !burialLocation) return error('Burial Location must be a complete http or https map link, or left blank.');
      const eventConnections = [];
      const eventDescriptions = bullets(get('Event Connection Descriptions'));
      const eventLines = bullets(get('Event Connections'));
      if (headers.includes('event connection descriptions') && (eventDescriptions.length !== eventLines.length || eventDescriptions.some(text => text.length > 2000))) return error('Event Connection Descriptions: add one sentence per event in the same order, up to 2000 characters each.');
      for (const [eventIndex, line] of eventLines.entries()) {
        const match = line.match(/^(.+?)\s*\|\s*(https?:\/\/\S+)$/);
        const url = match && publicURL(match[2]);
        const name = match && singleLine(match[1]);
        if (!name || !url || name.length > 200) return error('Use one event name and a complete http or https link per Event Connections line.');
        if (!eventConnections.some(item => item.url === url)) eventConnections.push({ name, url, ...(eventDescriptions[eventIndex] ? { description: eventDescriptions[eventIndex] } : {}) });
      }
      if (!name || !connection || !bio.length || !legacy.length || !sourceId)
        return error('Name, college connection, legacy, biography, and entry ID are required.');
      if (name.length > 200 || connection.length > 2000 || bio.join('').length > 50000 || legacy.join('').length > 50000)
        return error('Content is too long. Shorten the name, connection, or biography sections.');
      const secondaryText = get('Secondary College');
      const secondaryYearText = get('Timeline year for Secondary College');
      const secondaryConnection = singleLine(get('Secondary College connection'));
      const secondaryLegacy = bullets(get('Secondary Institutional Connection and Legacy'));
      const noSecondary = !secondaryText || /^no (?:second|secondary) college$/i.test(secondaryText);
      const hasSecondaryDetails = Boolean(secondaryYearText || secondaryConnection || secondaryLegacy.length);
      let secondarySchool;
      if (noSecondary && hasSecondaryDetails) return error('Secondary College: choose a college or clear its year, connection, and legacy.');
      if (!noSecondary) {
        secondarySchool = institutions.find(i => key(i.name) === key(secondaryText));
        if (!secondarySchool) return error('Secondary College: choose a supported college.');
        if (secondarySchool.id === school.id) return error('Secondary College: choose a different college from the first.');
        if (!/^\d{4}$/.test(secondaryYearText) || Number(secondaryYearText) >= yearBefore || Number(secondaryYearText) < (secondarySchool.timelineStart ?? secondarySchool.founded))
          return error(`Timeline year for Secondary College: use four digits from ${secondarySchool.timelineStart ?? secondarySchool.founded} through ${yearBefore - 1}.`);
        if (!secondaryConnection || !secondaryLegacy.length) return error('Secondary College connection and Secondary Institutional Connection and Legacy are required.');
        if (secondaryConnection.length > 2000 || secondaryLegacy.join('').length > 50000) return error('Secondary college connection or legacy is too long.');
      }
      const identities = [school, ...(secondarySchool ? [secondarySchool] : [])].map(item => `${item.id}:${key(name)}`);

      if (ids.has(sourceId) || identities.some(identity => names.has(identity))) return error('Duplicate person or entry ID. Edit the existing submission instead.');
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
      ids.add(sourceId); identities.forEach(identity => names.add(identity));
      const id = `sheet:${sourceId}`;
      people.push({ id, name, years: singleLine(get('Life dates')), bio, legacy, sources,
        ...(headers.includes('event connections') ? { eventConnections } : {}), showSources: true,
        ...(hasBurialLocation ? { burialLocation } : {}),
        connections: [{ institutionId: school.id, label: connection, ...(headers.includes('secondary college') ? { legacy } : {}) },
          ...(secondarySchool ? [{ institutionId: secondarySchool.id, label: secondaryConnection, legacy: secondaryLegacy }] : [])],
        image: image ? { url: image, sourceUrl: photoSource, alt: `Portrait of ${name}`, ...(photoCaption !== undefined ? { caption: photoCaption } : {}) } : null });
      timelines.push({ institutionId: school.id, entries: [{ id, personId: id, sortYear: year, displayDate: yearText }] });
      if (secondarySchool) timelines.push({ institutionId: secondarySchool.id, entries: [{ id, personId: id, sortYear: Number(secondaryYearText), displayDate: secondaryYearText }] });
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
    // Preserve school events; the spreadsheet is the only source of people.
    const eventTimelines = structuredClone(store.timelines).map(timeline => ({
      ...timeline, entries: timeline.entries.filter(entry => !entry.personId)
    })).filter(timeline => timeline.entries.length);
    const fetcher = options.fetch || root.fetch.bind(root);
    const verifyImage = options.checkImage || (url => checkImage(url, config.timeoutMs));
    let inFlight;
    const status = { state: 'loading', errors: [], updatedAt: null };

    store.people.splice(0);
    store.timelines.splice(0, store.timelines.length, ...structuredClone(eventTimelines));
    store.notify(null);

    function apply(snapshot) {
      const timelines = structuredClone(eventTimelines);
      for (const timeline of snapshot.timelines) {
        let target = timelines.find(item => item.institutionId === timeline.institutionId);
        if (!target) { target = { institutionId: timeline.institutionId, entries: [] }; timelines.push(target); }
        target.entries.push(...timeline.entries);
      }
      // Keep the arrays used by ProfileCard and InstitutionTimeline intact.
      store.people.splice(0, store.people.length, ...snapshot.people);
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
