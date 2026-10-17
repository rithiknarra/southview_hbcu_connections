# South-View HBCU Connections

## Use
Serve these files on a static website host, or run `python3 -m http.server 8000` and open `http://localhost:8000`. No installation or API key is required. Keep `index.html`, `app.js`, `data.js`, `content-config.js`, `sheet-content.js`, `style.css`, `images/`, and `fonts/` together. The school cards and bundled profiles work offline; live Google Sheets updates require a network connection and an HTTP(S) page.

For Wix, embed the hosted page in an HTML iframe with title="Atlanta HBCU connections", width="100%", and a height appropriate for the host page. Allow enough height for the school cards on mobile.

## School selection
Five school buttons display bundled official institutional logos, school names, and an Explore timeline action. Founding years are not displayed on the main page. The desktop layout has three cards above two centered cards; tablets use two columns and phones use one. Image sources are recorded in `images/schools/SOURCES.md`. Images retain their original colors and proportions; if one fails to load, the school name remains visible and the button still works.

## Add people without editing code

- [Open the Add a Person form](https://docs.google.com/forms/d/e/1FAIpQLSdKrniEZMaU0MyBf-WwBQU4qLjea9jDq3xMqhyVrKjxc7lkYg/viewform)
- [Open the South-View content sheet](https://docs.google.com/spreadsheets/d/1L8A5vvuU3bUk8sq8bk_3koTH5QejEJ-VgaYrUnA-HDo/edit) (editors only)

1. Submit the form: College, Timeline year, Name, Life dates, College connection, Institutional Connection and Legacy, Biography, Burial Location, Photo, Sources. Life dates, Burial Location, and Sources are optional. A portrait image is required. Google requires sign-in for file uploads.
2. In **Form Responses 1**, check **Published** (column L) on the submitted row. Edit response cells directly for later corrections. Uncheck Published to remove a sheet-managed profile.
3. The **Website** tab fills automatically. Leave its headers and formula intact. Only this tab is published, as CSV. Keep automatic republishing enabled. Visitors get updates on page load after Google's publishing/cache delay; an already open page needs a refresh.

Enter one point per line for Legacy and Biography. The loader removes leading bullet/number markers, blank lines, and excess whitespace, and renders consistent site typography. Sources accept one full HTTP(S) URL per line, optionally preceded by a title and ` | `. For Burial Location, paste the verified Google Maps share link or a coordinate URL such as `https://maps.google.com/?q=LATITUDE,LONGITUDE`. Leave it blank if unknown; the existing Burial Location section will show "Location is not available." A supplied invalid link rejects the entry.

All required values must be present. Years must have four digits, be earlier than 2026, and not predate the chosen institution. Invalid source URLs and duplicate people are rejected. Every portrait must load successfully **before** its person and timeline entry are added. Broken/private images, incomplete profiles, and invalid rows are skipped as complete records. Errors go to the browser console; the website does not write to the sheet.

The form's dedicated portrait-upload folder must allow public viewing for images to work for signed-out site visitors. Use that folder only for portraits intended for publication. Publishing the Website tab does not publish the images themselves. Drive file links in the feed are converted to image thumbnail URLs automatically. File hosting limits still apply.

`content-config.js` contains the published CSV URL, exclusive year limit, and timeout. `sheet-content.js` parses CSV, validates complete records, checks photos, and updates the existing profile/timeline arrays in one step. A failed feed request leaves the existing content untouched. The two bundled profiles remain as a fallback and are replaced (without duplicate names) by matching published sheet entries; unpublishing a replacement restores its bundled version.

Developer checks: `node --test tests/sheet-content.test.js`. To manually reload the configured feed in the console, use `southViewContent.refresh()`. Read `southViewContent.status` for load state and rejected rows. No credentials or write API keys belong in this public static site.

The Website tab currently uses this formula in A2, with columns A:K headed College, Timeline year, Name, Life dates, College connection, Institutional Connection and Legacy, Biography, Photo, Sources, Entry ID, Burial Location:

```excel
=IFNA(FILTER({'Form Responses 1'!B:D,'Form Responses 1'!H:J,'Form Responses 1'!E:G,ARRAYFORMULA("sheet-"&ROW('Form Responses 1'!A:A)),'Form Responses 1'!K:K},'Form Responses 1'!L:L=TRUE),"")
```

After connecting the feed, deploy the updated HTML and both new scripts along with the existing assets once. Future content changes only require the form/sheet workflow.

## Edit content

Content lives in `data.js` in three arrays: `INSTITUTIONS`, `PEOPLE`, and `TIMELINES`. Save the file and reload the page to see changes. Spelman currently has profiles for Ruby Doris Smith-Robinson and Ludie Clay Andrews; the other four schools show founding information and "Stories for this institution are being added."

### School cards: INSTITUTIONS

Cards are generated automatically from `INSTITUTIONS`, sorted by founding year from oldest to newest. Schools with the same founding year retain their order in the array. The current order is Morehouse College, Spelman College, Morris Brown College, Morehouse School of Medicine, and Clark Atlanta University. Each object uses these fields:

| Field | What it controls |
| --- | --- |
| `id` | Stable school identifier used by timelines and person connections. Current ids: `spelman`, `morehouse`, `clark`, `morris`, `medicine`. |
| `name` | Full school name on the card and at the top of its timeline. |
| `image` | Local logo path as a string, such as `images/schools/spelman.png`. |
| `founded` | Numeric founding year used to sort the school cards and set the timeline's starting year; hidden on the main page. |
| `foundingNote` | School description shown below the timeline heading, not on the selection card. |
| `foundingSource` | URL for the timeline's "Institution history" link. |

For example, this is the current Morris Brown record, formatted for readability:

```js
{
  id: 'morris',
  name: 'Morris Brown College',
  image: 'images/schools/morris.png',
  founded: 1881,
  foundingNote: 'Morris Brown College is a historically Black liberal arts college located in Atlanta, Georgia. Founded in 1881 by the African Methodist Episcopal Church, it has a long tradition of expanding access to higher education and supporting students in a nurturing environment. With a commitment to academic achievement, personal growth, and public service, Morris Brown prepares students to pursue meaningful careers and make positive contributions to society.',
  foundingSource: 'https://morrisbrown.edu/history/'
}
```

Edit the existing object instead of adding another object with the same id. Keep ids unchanged when updating wording so existing timeline and profile connections continue to work. Use the full school name and a factual description of about three sentences, matching the Spelman introduction: identify the school and location, summarize its founding, then explain its educational mission and community contribution. The card's "Explore timeline" wording is shared by all schools and is defined in `SchoolPicker` in `app.js`.

The page introduction and "Choose a school. Discover a story." instructions are in `index.html`. Card spacing, type sizes, responsive layout, and the navy background behind the white School of Medicine logo are in `style.css`. Store replacement school images in `images/schools/` and update [the image source list](images/schools/SOURCES.md). School logo images use empty alt text because the button already announces the full school name.

School descriptions appear above their timelines. The four expanded descriptions were checked against official institutional pages on 2026-10-17:

- Morehouse College: [mission and values](https://morehouse.edu/about/mission-and-values) and [history](https://morehouse.edu/about/our-history/).
- Clark Atlanta University: [about](https://www.cau.edu/about-clark-atlanta) and [history](https://www.cau.edu/about/history).
- Morris Brown College: [mission](https://morrisbrown.edu/about-mbc/) and [history](https://morrisbrown.edu/history/).
- Morehouse School of Medicine: [overview and mission](https://www.msm.edu/about_us/) and [history](https://www.msm.edu/about_us/msm-history.php).

### Person profiles: PEOPLE

Profiles show the person's name, life dates, and school connection, followed by **Institutional Connection and Legacy**, **Biography**, and **Burial Location**. Write `legacy` and `bio` as arrays of strings: each string becomes one bullet. Plain strings are still supported as a single bullet, but arrays are the preferred format for new content.

| Field | Format and display |
| --- | --- |
| `id` | Unique, stable person identifier; timeline `personId` must match it exactly, including capitalization. |
| `name` | Full name shown on the timeline and profile. |
| `years` | Display text for life dates; use the known dates or years consistently. |
| `connections` | Array of `{ institutionId, label }` objects. Write each label as a complete sentence describing the person's school connection. Labels appear together below the life dates. |
| `legacy` | Array of factual bullet sentences about the person's institutional connection and impact. |
| `bio` | Array of factual bullet sentences about their life, preferably in chronological order. |
| `image` | Optional object with `url`, `alt`, and optional `credit`. Unlike a school logo, this is an object rather than a path string. |
| `burialLocation` | Optional Google Maps URL string for the burial location. Appears after Biography as a link, never as a bullet. Missing, empty, or invalid web links display "Location is not available." |
| `sources` | Optional array of `{ title, url }` research references. These appear as clickable references in a Sources section at the end of the profile. |

Example format using an excerpt of the existing Ludie Clay Andrews profile:

```js
{
  id: 'Ludie-Clay-Andrews',
  name: 'Ludie Clay Andrews',
  years: 'March 3, 1874 - January 6, 1969',
  image: {
    url: 'images/ludie-clay-andrews.jpg',
    alt: 'Portrait of Ludie Clay Andrews'
  },
  connections: [{
    institutionId: 'spelman',
    label: 'Graduated in 1906 from the nursing training program at Spelman Seminary, now Spelman College.'
  }],
  legacy: [
    'Later served as superintendent of MacVicar Hospital, providing care to the college community.',
    'Taught health education in the Spelman-Morehouse summer school.'
  ],
  bio: [
    'Trained nurses, promoted public health, and challenged racial discrimination in healthcare.'
  ],
  burialLocation: '', // Leave empty until the burial location is verified.
  sources: [{
    title: 'Ludie Clay Andrews - Georgia Women of Achievement',
    url: 'https://www.georgiawomen.org/ludie-clay-andrews'
  }]
}
```

Use one clear point per bullet and keep school-specific contributions in `legacy` and broader life history in `bio`. Do not include bullet characters, HTML tags, or Markdown formatting inside the strings: the app supplies the bullets and displays the content as plain text. Use double quotes around a string containing an apostrophe, or escape the apostrophe if using single quotes. Separate array items and object fields with commas. Keep research references with the record when changing factual information.

To provide a burial location, copy the Google Maps share link for the verified location into the person's `burialLocation` field. Both full Google Maps links and shortened share links work. For example, the field format is `burialLocation: 'https://maps.google.com/?q=LATITUDE,LONGITUDE'`; replace the coordinate placeholders with verified coordinates, or paste the actual share link instead. Omit the field or use `burialLocation: ''` when the location is unknown. Do not use a general cemetery location as if it identifies a specific grave. The link opens in a new tab with the label "View burial location on Google Maps". Burial Location is shown on person profiles only, not event profiles.

### Timeline entries: TIMELINES

A person profile needs a matching timeline entry to appear in a school timeline. Within the object whose `institutionId` matches the school, add an object to `entries`:

```js
{
  id: 'ludie-spelman-graduation',
  personId: 'Ludie-Clay-Andrews',
  sortYear: 1906,
  displayDate: '1906',
  title: 'Ludie Clay Andrews'
}
```

This example already exists; edit it rather than duplicating it. Entry ids must be unique within their school's timeline. `sortYear` is a number controlling chronological order and position; it must not predate the school's founding year. `displayDate` is the visible date text and can be a year, range, or approximate date. A person entry uses the referenced person's `name` for its label; its `title` is a fallback. Events without a `personId` use `title`, `summary`, and `details`; summary appears under Biography and details under Institutional Connection and Legacy in the current profile layout. Event images use the same object format as person images.

After editing, open the affected school, check the timeline label and date, and open the profile to review the bullet order and image. Check a phone-sized viewport when changing names or card text.

## UI classes
`SchoolPicker`: accessible school buttons that open timelines.
`InstitutionTimeline`: school-specific, horizontally scrollable timeline overlay.
`ProfileCard`: reusable profile overlay.
`OverlayManager`: close buttons, Escape, focus restoration, and focus trapping. Closing the profile returns to its timeline; closing the timeline returns to the selected school button. The school browser stays inert while either overlay is open.

## Styling
The palette and typography were compared with https://www.southviewpreservation.com/historyintheneighborhood on 2026-10-17. The page uses Cormorant Garamond for headings and school names, Manrope for introductory text and school actions, and EB Garamond for descriptions and biographies. Main text is `#1a1d1a`, secondary text `#4a4d4a`, near-black action text `#1a1d1a`, and muted gold accents `#a69666`. The background and school cards are white, with `#dcded7` card borders. The desktop page heading is 50.55px and school names are 29px bold; mobile keeps its smaller page heading. Introductory text is 18px and selection instructions 17px. Each card is one accessible button with a plain "Explore timeline" action separated by a thin line. Hover and keyboard-focus states provide visual feedback, and reduced-motion preferences are respected. Timeline names, dots, and interface actions use near-black in place of green. Event dates use plain near-black text centered in a break in the gold divider beside each name. For entries below the timeline, the divider sits above the name; for entries above the timeline, it sits below the name. School logos retain their own brand colors. Font files are bundled for offline appearance; see `fonts/OFL-*.txt`.

## Full-page timelines and profiles
Selecting a school opens a full-viewport timeline. Its left endpoint is the institution's founding year; its right endpoint is the current year or the latest entry, whichever is later. CAU starts in 1988, with its predecessor institutions noted separately. MSM starts in 1975, with independence in 1981 noted separately. Each dated entry is placed proportionally along the time axis, and its label is only the person's name or event title. Nearby and same-year entries automatically use separate vertical lanes. On narrow screens the horizontal timeline scrolls; arrow controls, keyboard focus, and normal touch scrolling remain available.

Selecting a name opens a separate full-page profile. X or Escape returns to the timeline, preserving the scroll position. Closing the timeline returns to the selected school button. These overlays cover the browser viewport. If embedded in a Wix iframe, they cover that iframe, not the surrounding parent website; full-parent-page coverage requires native placement or a host-controlled full-screen iframe/lightbox.

## Automatic entries
Edit PEOPLE and TIMELINES in data.js and reload. No coordinates or hand-built timeline HTML are required. `sortYear` controls positioning, `displayDate` controls the date label. The timeline recalculates its date range and label lanes automatically.

A runtime integration can update an open timeline immediately:

```js
southViewHistory.addPerson({
  id: 'new-person', name: 'Person name', years: 'Life dates',
  bio: ['Approved biography sentence.'],
  legacy: ['Approved institutional connection or contribution.'],
  burialLocation: '', // Optional: paste a verified Google Maps share link here.
  connections: [{institutionId: 'spelman', label: 'Graduated from Spelman College in 1950.'}],
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

The runtime API changes the current page's memory, not a server database. To retain manual changes, save them in data.js or use the Google Form/Sheet workflow above. The entry form is separate from the public website. `HistoryStore` validates dates and references, and notifies the open timeline on changes. `timelineLayout` calculates positions and collision lanes.
