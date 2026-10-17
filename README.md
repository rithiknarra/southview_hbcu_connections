# South-View HBCU map feature

## Use
Unzip and open `index.html` in a modern browser. No installation, API key, or live network connection is required. Keep all files and the fonts folder together.

Upload the files from `dist/` together to any static website host. The downloadable ZIP puts these files at its root for convenience. Embed the hosted page in Wix using an HTML iframe with title="Atlanta HBCU connections", width="100%", height="980" and border="0". Adjust the iframe height for your host page. The generated ChatGPT Site is private; use a public host or deliberately change its audience before embedding for public visitors. There is no Foundation header, footer, story-submission form, or suggestion link in this feature.

## Map
This is real geographic SVG, not an invented street map or a raster tile image. `map-data.js` includes 15,438 OpenStreetMap features downloaded with the Overpass API, projected with Web Mercator. Streets, parks, and university polygons remain vector shapes at every zoom. Campus markers use longitude/latitude. Drag, mouse-wheel, two-finger pinch, +/- buttons, arrow keys, and Home are supported. View all locations includes South-View Cemetery.

Data coverage is a bounded part of Atlanta (33.70–33.78 N, 84.44–84.36 W). It is a bundled snapshot, not live-updating tiles or an unrestricted world map. Pan limits keep the view near the downloaded region. No API account, paid map subscription, or per-visitor map request is needed. Keep OpenStreetMap attribution visible.

To update map geometry, POST this Overpass QL query as URL-encoded `data` to https://overpass-api.de/api/interpreter and save the JSON:

[out:json][timeout:40];
(way[highway](33.70,-84.44,33.78,-84.36);
 way[leisure=park](33.70,-84.44,33.78,-84.36);
 way[amenity=university](33.70,-84.44,33.78,-84.36););
out geom;

In the source repository, `python scripts/build-map.py response.json` regenerates `dist/map-data.js`. Public Overpass endpoints can be busy; refresh at build time, not on every visitor's page load.

## Edit content
`data.js` contains INSTITUTIONS, PEOPLE, and TIMELINES. There is exactly one sample timeline entry and one sample profile under Spelman. Other campuses show empty states. No alumni research has been added.
- Add people with unique ids, names, dates, biography, legacy, connections, optional image, and sources.
- Add timeline entries referencing personId and institutionId. sortYear controls order; displayDate is the visible date.
- For real researched content, set sample:false.
- Images can be relative paths with alt text and credit.

## UI classes
`CampusMap`: SVG geography, geographic projection, marker selection, pan, zoom, pinch, fit, keyboard controls.
`InstitutionTimeline`: school-specific, horizontally scrollable timeline overlay.
`ProfileCard`: reusable profile overlay.
`OverlayManager`: X buttons, Escape, focus restoration, and focus trapping for profile cards. Closing the profile returns to its timeline; closing the timeline returns to the map.

## Styling
The reference page was inspected at https://www.southviewpreservation.com/historyintheneighborhood on 2026-10-09. Fonts are the same Cormorant Garamond semibold family, Manrope, and EB Garamond used there. Exact observed colors: text #1a1d1a, secondary text #4a4d4a, buttons #2c342c, button text #f7f2f2. The page uses a white background and a thin gold heading divider. All feature styles are scoped to .sv-feature where practical. Font files are bundled for consistent offline appearance; see fonts/OFL-*.txt.

## Full-page timelines and profiles
Selecting a school opens a full-viewport timeline. Its left endpoint is the institution's founding year; its right endpoint is the current year or the latest entry, whichever is later. CAU starts in 1988, with its predecessor institutions noted separately. MSM starts in 1975, with independence in 1981 noted separately. Each dated entry is placed proportionally along the time axis, and its label is only the person's name or event title. Nearby and same-year entries automatically use separate vertical lanes. On narrow screens the horizontal timeline scrolls; arrow controls, keyboard focus, and normal touch scrolling remain available.

Selecting a name opens a separate full-page profile. X or Escape returns to the timeline, preserving the scroll position. Closing the timeline returns to the map. These overlays cover the browser viewport. If embedded in a Wix iframe, they cover that iframe, not the surrounding parent website; full-parent-page coverage requires native placement or a host-controlled full-screen iframe/lightbox.

## Automatic entries
Edit PEOPLE and TIMELINES in data.js and reload. No coordinates or hand-built timeline HTML are required. `sortYear` controls positioning, `displayDate` controls the date label. The timeline recalculates its date range and label lanes automatically.

A runtime integration can update an open timeline immediately:

```js
southViewHistory.addPerson({
  id: 'new-person', name: 'Person name', years: 'Life dates',
  bio: 'Approved biography', legacy: 'Community legacy',
  connections: [{institutionId: 'spelman', label: 'Graduate'}],
  sources: []
});
southViewHistory.addEntry('spelman', {
  id: 'new-entry', personId: 'new-person',
  sortYear: 1950, displayDate: '1950'
});
// An event can stand alone without a person record:
southViewHistory.addEntry('spelman', {
  id: 'new-event', title: 'Event name', sortYear: 1960,
  summary: 'Event description', details: 'Additional context', sources: []
});
southViewHistory.updateEntry('spelman', 'new-entry', {sortYear: 1955});
southViewHistory.removeEntry('spelman', 'new-event');
```

The runtime API changes the current page's memory, not a server database. To retain changes, save them in data.js or connect this API to your own content backend. No entry-creation form or suggestion feature is included. `HistoryStore` validates dates and references, and notifies the open timeline on changes. `timelineLayout` calculates positions and collision lanes.
