# South-View HBCU Connections

## Use
Serve these files on a static website host, or run `python3 -m http.server 8000` and open `http://localhost:8000`. No installation or API key is required. Keep `index.html`, `app.js`, `data.js`, `content-config.js`, `sheet-content.js`, `style.css`, `images/`, and `fonts/` together. The school cards and bundled profiles work offline; live Google Sheets updates require a network connection and an HTTP(S) page.

For Wix, embed the hosted page in an HTML iframe with title="Atlanta HBCU connections", width="100%", and a height appropriate for the host page. Allow enough height for the school cards on mobile.

## School selection
Five school buttons display bundled official institutional logos, school names, and an Explore timeline action. Founding years are not displayed on the main page. The desktop layout has three cards above two centered cards; tablets use two columns and phones use one. Image sources are recorded in `images/schools/SOURCES.md`. Images retain their original colors and proportions; if one fails to load, the school name remains visible and the button still works.

## Add or edit people

- [Open the Add a Person form](https://docs.google.com/forms/d/e/1FAIpQLSdKrniEZMaU0MyBf-WwBQU4qLjea9jDq3xMqhyVrKjxc7lkYg/viewform)
- [Open the South-View content sheet](https://docs.google.com/spreadsheets/d/1L8A5vvuU3bUk8sq8bk_3koTH5QejEJ-VgaYrUnA-HDo/edit) (editors only)

1. Fill out the form to add a person.
2. Open **Form Responses 1** in the Sheet and check **Published** on their row.
3. Refresh the website after Google's update takes effect; this may take a few minutes.
4. Edit their row in the Sheet to make corrections, or uncheck **Published** to remove their sheet entry.

## School configuration

School-card settings live in `data.js`. To add or edit people, use the Form/Sheet workflow above.

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
