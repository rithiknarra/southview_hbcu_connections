# South-View HBCU Connections 

An interactive website connecting people associated with South-View Cemetery to Atlanta’s historically Black colleges and universities. Built for the South-View Foundation, it brings together school timelines, portraits, biographies, and supporting references.

Visitors can explore Morehouse College, Spelman College, Morris Brown College, Morehouse School of Medicine, and Clark Atlanta University, or search by name and filter by college. The site supports mobile layouts, keyboard navigation, and reduced-motion preferences.

## Key links

- [Visit the website](https://southview-hbcu-connections.netlify.app/)
- [Open the content spreadsheet](https://docs.google.com/spreadsheets/d/1L8A5vvuU3bUk8sq8bk_3koTH5QejEJ-VgaYrUnA-HDo/edit) — editing requires an authorized Google account.
- [Add a Person form](https://docs.google.com/forms/d/e/1FAIpQLSdKrniEZMaU0MyBf-WwBQU4qLjea9jDq3xMqhyVrKjxc7lkYg/viewform)

For detailed staff instructions and screenshots, refer to the separate **South-View HBCU Connections Website Maintenance and Content Guide** supplied with the project handoff. This README covers the project overview, content workflow, and essentials for maintaining the website files.

## Managing content

Routine profile updates happen through Google Forms and Google Sheets, without editing website code.

| Task | Where to work |
| --- | --- |
| Add a person | Submit the form, then review and publish the row in **Form Responses**. |
| Edit a person originally included on the site | Edit their row in **Existing Profiles**. |
| Edit a later form submission | Edit their original row in **Form Responses**. |
| Hide or restore a record | Uncheck or check **Published** in column M of its input tab. |
| Change school information or website design | Ask the website maintainer to update the project files. |

**Final Website** automatically combines published rows from both input tabs. Do not edit its generated cells. Keep column headings, Entry IDs, and formulas unchanged. If a person has multiple school rows, unpublish each relevant row to remove all appearances. Allow a few minutes for updates, then refresh the website.

The form accepts a portrait upload. **Photo** stores the image link; optional **Photo source** stores the original webpage and appears beneath the portrait. Images must be accessible to website visitors—publishing the spreadsheet does not change private image permissions. Required photo credits and burial-history notes need maintainer assistance because the adapter has no dedicated spreadsheet fields for them.

Use separate lines for biography and legacy points. In **Sources**, enter one reference per line. For web sources, use a full URL, optionally as `Source title | https://example.org/page`. For books and other print sources, enter a plain-text citation with the relevant page numbers; no URL is required. Available non-Wikipedia references appear on profiles. Leave **Burial Location** blank unless an exact South-View gravestone location is confirmed.

### Publication behavior and limits

- With a live feed configured, the published spreadsheet controls visibility. Unpublished records are not restored from bundled data. Bundled records may supply optional metadata for matching published people.
- A failed refresh retains the current page’s last successfully loaded records. A fresh page with an unavailable feed shows an error and no profiles. Without a configured live feed, bundled profiles remain available offline.
- Invalid records and profiles whose portraits cannot load are rejected. The page reports a partial-load message; detailed errors are available in the browser console. Validation messages are not written back to the sheet.
- The current feed accepts four-digit timeline years **through 2025**, within the selected school’s timeline range. Later years require updating `yearBefore` in `content-config.js`. Approximate display dates such as “By 1953” are supported in bundled data, but not by the current spreadsheet adapter.

## Historical content and attribution

Connections include graduates, faculty, academic leaders, and documented institutional namesakes. Morehouse School of Medicine also includes documented donors and speakers. Describe the verified relationship accurately, and label historical training programs and uncertain dates clearly.

Clark Atlanta University’s timeline starts in 1865 for predecessor history while retaining its 1988 founding date. Morehouse School of Medicine’s timeline starts in 1975, with independence in 1981 noted separately.

Confirm South-View burial connections, use supporting sources, and retain required image attribution. School logo sources are listed in [images/schools/SOURCES.md](images/schools/SOURCES.md). Bundled font licenses are in `fonts/OFL-*.txt`.

## Running and hosting

The website uses plain HTML, CSS, and JavaScript. No build step, package installation, or API key is required to run it. Live spreadsheet content requires an internet connection and an HTTP or HTTPS page.

For a local preview, install Python 3 if needed, open a terminal in the repository folder, and run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Stop the server with Ctrl+C.

For hosting, publish the website files together with `index.html` at the site root. Include all scripts, `style.css`, `images/`, and `fonts/`. Local code edits do not change the live site until deployed. Update asset version query strings in `index.html` when needed to avoid stale browser caches.

The hosted page can be embedded in Wix or another site using an iframe with a descriptive title, full width, and enough height for mobile content. Timeline and profile overlays fill the iframe, not the surrounding parent page.

## Project files

| File or folder | Purpose |
| --- | --- |
| `index.html` | Page structure, introductory text, search controls, and overlay containers. |
| `app.js` | Search, school selection, timelines, profile display, and navigation. |
| `data.js` | School settings, bundled historical records, and timeline entries. |
| `content-config.js` | Published CSV address, year cutoff, and loading timeout. |
| `sheet-content.js` | Spreadsheet parsing, validation, and publication behavior. |
| `style.css` | Fonts, colors, responsive layout, and interaction styles. |
| `images/people/` | Bundled portraits; spreadsheet records may also link to these hosted files. |
| `images/schools/` | School logos and their source list. |
| `fonts/` | Bundled fonts and licenses. |
| `tests/` | Checks for publishing, search, source display, and timeline layout. |

School settings are defined in `INSTITUTIONS` in `data.js`; keep school IDs stable when editing descriptions, logos, names, or colors. Cards are sorted by founding year. Check spreadsheet photo links before removing hosted portraits.

The live connection uses a published, read-only CSV address in `content-config.js`. If replacing the spreadsheet, update this address and preserve the expected column headings. Never store Google credentials in project files.

## Verification and troubleshooting

After content updates, check search results, the relevant timeline, profile text, portraits, sources, and map links. After code changes, also check mobile layout, keyboard navigation, and back buttons.

| Issue | First checks |
| --- | --- |
| A profile is missing | Published, required fields, school name, allowed year, and public portrait access. |
| An edit has not appeared | Correct input row, time for Google’s update, and a refreshed page. |
| A person remains after unpublishing | Other published school rows in either input tab; latest website code deployed. |
| Profiles cannot load | Internet connection and feed address; maintainers can inspect `window.southViewContent.status` and browser-console errors. |
| An embedded page is cut off | Iframe height and mobile presentation. |

With Node.js installed, run automated checks from the repository folder:

```sh
node --test tests/*.test.js
```

Save dated backups before changing spreadsheet formulas or hosting settings. Keep account ownership and support contacts in the handoff guide. When reporting an issue, include the affected profile or school, the expected result, and a screenshot; do not share passwords.
