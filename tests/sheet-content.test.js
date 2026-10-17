'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const content = require('../sheet-content.js');
const schools = [{ id: 'spelman', name: 'Spelman College', founded: 1881 }];
const headers = ['College', 'Timeline year', 'Name', 'Life dates', 'College connection', 'Institutional Connection and Legacy', 'Biography', 'Photo', 'Sources', 'Entry ID'];
const row = ['Spelman College', '1965', '  Example   Person ', '1942 – 1967', ' Graduate, class of 1965. ', '• First legacy point\n\n- Second legacy point', '1. Early life\n2. Later work, including "quoted text".', 'https://example.org/portrait.jpg', 'Archive | https://example.org/archive', 'sheet-2'];
const csv = rows => [headers, ...rows].map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n');
const burialCSV = value => [headers.concat('Burial Location'), row.concat(value)]
  .map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n');

test('burial links map to the existing profile field; blank remains optional', () => {
  for (const link of ['https://maps.google.com/?q=33.7000,-84.3800', 'https://maps.app.goo.gl/example', '']) {
    const result = content.readContent(burialCSV(link), schools);
    assert.equal(result.people.length, 1);
    assert.equal(result.people[0].burialLocation, link);
  }
  assert.equal(Object.hasOwn(content.readContent(csv([row]), schools).people[0], 'burialLocation'), false);
  for (const invalid of ['33.7,-84.38', 'javascript:alert(1)', 'not a link']) {
    const result = content.readContent(burialCSV(invalid), schools);
    assert.equal(result.people.length, 0);
    assert.equal(result.errors.length, 1);
  }
});

test('multiline CSV becomes normalized complete profiles', () => {
  const result = content.readContent('\uFEFF' + csv([row]), schools);
  assert.deepEqual(result.errors, []);
  assert.equal(result.people[0].name, 'Example Person');
  assert.deepEqual(result.people[0].legacy, ['First legacy point', 'Second legacy point']);
  assert.deepEqual(result.people[0].bio, ['Early life', 'Later work, including "quoted text".']);
  assert.equal(result.people[0].sources[0].title, 'Archive');
  assert.equal(result.timelines[0].entries[0].sortYear, 1965);
});

test('each missing required field rejects the entire person and timeline entry', () => {
  for (const index of [0, 1, 2, 4, 5, 6, 7, 9]) {
    const missing = [...row]; missing[index] = '';
    const result = content.readContent(csv([missing]), schools);
    assert.equal(result.people.length, 0, headers[index]);
    assert.equal(result.timelines.length, 0, headers[index]);
    assert.equal(result.errors.length, 1, headers[index]);
  }
});

test('rejects invalid years, unknown colleges, malformed URLs, and duplicate submissions', () => {
  for (const year of ['2026', '2030', '965', '1965.5', '1800', '1965abc']) {
    const invalid = [...row]; invalid[1] = year;
    assert.equal(content.readContent(csv([invalid]), schools).people.length, 0, year);
  }
  for (const [index, value] of [[0, 'Unknown school'], [7, 'javascript:alert(1)'], [8, 'Not a source link']]) {
    const invalid = [...row]; invalid[index] = value;
    assert.equal(content.readContent(csv([invalid]), schools).people.length, 0);
  }
  assert.equal(content.readContent(csv([row, row]), schools).people.length, 1);
});

test('bad feeds fail instead of clearing existing profiles', () => {
  for (const broken of ['<html>Sign in</html>', 'wrong,headers', csv([row]) + '\n"unfinished']) {
    assert.throws(() => content.readContent(broken, schools));
  }
});

test('uploaded Drive photo URLs become usable image URLs', () => {
  assert.equal(content.photoURL('https://drive.google.com/open?id=abc_123'), 'https://drive.google.com/thumbnail?id=abc_123&sz=w1200');
  assert.equal(content.photoURL('https://drive.google.com/file/d/abc_123/view'), 'https://drive.google.com/thumbnail?id=abc_123&sz=w1200');
  assert.equal(content.photoURL('https://drive.google.com/'), '');
});

test('photo failure rejects a whole record; repeated refreshes update and unpublish it', async () => {
  const store = { institutions: schools, people: [], timelines: [], notify() {} };
  let source = csv([row]), failPhoto = true;
  const adapter = content.install(store, { csvUrl: 'https://example.org/feed.csv', yearBefore: 2026 }, {
    fetch: async () => ({ ok: true, text: async () => source }),
    checkImage: async () => { if (failPhoto) throw new Error('Photo is private'); }
  });
  await adapter.refresh(); assert.equal(store.people.length, 0); assert.equal(adapter.status.state, 'partial');
  failPhoto = false;
  await adapter.refresh(); await adapter.refresh();
  assert.equal(store.people.length, 1); assert.equal(store.timelines[0].entries.length, 1);
  source = csv([[...row.slice(0, 6), 'Updated biography', ...row.slice(7)]]);
  await adapter.refresh(); assert.deepEqual(store.people[0].bio, ['Updated biography']);
  source = '<html>Unavailable</html>';
  await adapter.refresh(); assert.equal(store.people.length, 1); assert.equal(adapter.status.state, 'error');
  source = csv([]);
  await adapter.refresh(); assert.equal(store.people.length, 0); assert.equal(store.timelines.length, 0);
});

test('an edited bundled example appears only once, and unrelated examples remain', async () => {
  const bundled = { id: 'original', name: 'Example Person', burialLocation: 'https://maps.google.com/?q=verified-location', connections: [{ institutionId: 'spelman' }] };
  const people = [bundled], timelines = [{ institutionId: 'spelman', entries: [{ id: 'original-entry', personId: 'original', sortYear: 1965 }] }];
  const store = { institutions: schools, people, timelines, notify() {} };
  const adapter = content.install(store, { csvUrl: 'https://example.org/feed.csv' }, {
    fetch: async () => ({ ok: true, text: async () => csv([row]) }), checkImage: async () => {}
  });
  await adapter.refresh();
  assert.equal(store.people, people); assert.equal(store.timelines, timelines);
  assert.equal(store.people.length, 1); assert.equal(store.people[0].id, 'sheet:sheet-2');
  assert.equal(store.people[0].burialLocation, bundled.burialLocation);
  assert.equal(store.timelines[0].entries.length, 1);
});
