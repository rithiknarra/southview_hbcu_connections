# South-View HBCU Connections

## Use
Serve these files on a static website host, or run `python3 -m http.server 8000` and open `http://localhost:8000`. No installation or API key is required. Keep `index.html`, `app.js`, `data.js`, `content-config.js`, `sheet-content.js`, `style.css`, `images/`, and `fonts/` together. The school cards and bundled profiles work offline; live Google Sheets updates require a network connection and an HTTP(S) page.

For Wix, embed the hosted page in an HTML iframe with title="Atlanta HBCU connections", width="100%", and a height appropriate for the host page. Allow enough height for the school cards on mobile.

## School selection
Five school buttons display bundled official institutional logos, school names, and an Explore timeline action. Founding years are not displayed on the main page. The cards and the centered "Choose a school. Discover a story." heading sit on a light grey band (`#f6f6f2`) that runs edge to edge and down to the bottom of the window. Each card's top stripe uses its school's `color`; on hover the card border and arrow take that color too. The desktop layout has three cards above two centered cards; tablets use two columns and phones use one. Image sources are recorded in `images/schools/SOURCES.md`. Images retain their original colors and proportions; if one fails to load, the school name remains visible and the button still works.

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
| `foundingNote` | School description shown below the timeline heading, not on the selection card. The timeline first shows its opening sentence with a "Read more" button for the rest and a "Read less" button to collapse it again. |
| `foundingSource` | URL for the "Institution history" link in the timeline top bar. |
| `color` | Hex color for the school: the card's top stripe, and the background of its timeline and profile headers. Use a deep shade that keeps white text readable. Current values: Spelman `#1b3a73`, Morehouse `#6b1f2a`, Clark Atlanta `#9b1b30`, Morris Brown `#4a2c6d`, School of Medicine `#003b5c`. |

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

The page introduction and the "Choose a school. Discover a story." heading are in `index.html`. Card spacing, type sizes, responsive layout, and the navy background behind the white School of Medicine logo are in `style.css`. Store replacement school images in `images/schools/` and update [the image source list](images/schools/SOURCES.md). School logo images use empty alt text because the button already announces the full school name.

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
The palette and typography were compared with https://www.southviewpreservation.com/historyintheneighborhood on 2026-10-17. The page uses Cormorant Garamond for headings and school names, Manrope for introductory text and school actions, and EB Garamond for descriptions and biographies. Main text is `#1a1d1a`, secondary text `#4a4d4a`, near-black action text `#1a1d1a`, and muted gold accents `#a69666`. The background and school cards are white, with `#dcded7` card borders. The desktop page heading is 50.55px and school names are 29px bold; mobile keeps its smaller page heading. Introductory text is 18px. Each card is one accessible button with a plain "Explore timeline" action separated by a thin line. Hover and keyboard-focus states provide visual feedback, and reduced-motion preferences are respected. Timeline names, dots, and interface actions use near-black in place of green. Event dates use plain near-black text centered in a break in the gold divider beside each name. For entries below the timeline, the divider sits above the name; for entries above the timeline, it sits below the name. School logos retain their own brand colors. Font files are bundled for offline appearance; see `fonts/OFL-*.txt`.

## Full-page timelines and profiles
Selecting a school opens a full-viewport timeline. A sticky top bar holds the "All Schools" back button and the "Institution history" link, which opens the college history page in a new tab. Below it, the school logo sits beside the school name, founding year, and description in a centered content group, all in white on the school's `color`, with a light gold stripe underneath. The timeline itself sits on a light grey band (`#f6f6f2`) that fills the rest of the window, with a "Timeline · start – end" label and arrow controls; the solid black axis and its dots share the same center line. The timeline spans the width between the heading and the right arrow button; its axis ends at the centers of the endpoint dots so no line protrudes beyond them. Labels near either endpoint shift inward to remain fully visible. Its left endpoint is the institution's founding year; its right endpoint is the current year or the latest entry, whichever is later. CAU's header keeps its 1988 founding date; its timeline starts in 1865 to include explicitly labeled predecessor-institution connections. MSM starts in 1975, with independence in 1981 noted separately. Each entry shows the person's name or event title. Crowded date ranges expand horizontally only when needed to keep labels within two vertical lanes on each side; quiet intervals retain their normal spacing. Year ticks follow the same expanded date scale. Entries alternate above and below the axis, with at most two stacked labels above and two below. The timeline uses the full display width and centers itself in the remaining display height. Sparse timelines fit smaller screens; busy timelines can scroll horizontally to keep names readable. Wrapped names receive extra lane spacing, mobile labels and headings use smaller type, and short desktop windows use a compact school header. Resizing the window, rotating a device, or expanding the school description recalculates the layout; arrow controls, keyboard focus, and normal touch scrolling remain available.

Selecting a name opens a separate full-page profile. The top bar and a header band use the school's `color`: the framed portrait sits on the left of the band and overlaps the page below it, with the name, life dates, and college connection in white beside it (stacked on phones). Connection and Legacy and Biography follow below, lined up with the name. Empty sections are hidden, and the gravestone map link appears only when an exact South-View gravestone location is supplied by the user. Leave `burialLocation` empty when unknown. The back button or Escape returns to the timeline, preserving the scroll position. Closing the timeline returns to the selected school button. These overlays cover the browser viewport. If embedded in a Wix iframe, they cover that iframe, not the surrounding parent website; full-parent-page coverage requires native placement or a host-controlled full-screen iframe/lightbox.

## Source display
General source lists are not rendered. The timeline top bar includes an Institution history link. Source metadata may remain in the bundled data and content feed for internal reference. Picture credits are displayed only when explicitly required by the image license: set `image.attributionRequired` to `true` and supply the required text in `image.credit`. A credit string alone does not display a caption.

## Researched South-View profiles
The bundled data includes 30 profiles and 36 college connections following a review of the Wikipedia South-View burial category. See [the content review](RESEARCH.md) for inclusion decisions, portrait requests, historical-date bounds, and burial-location limitations. Four profiles await user-supplied pictures. Clark Atlanta uses `timelineStart: 1865` for predecessor history while retaining `founded: 1988`. Burial links are reserved for exact South-View gravestone locations supplied by the user; no general cemetery or memorial map links are shown.
