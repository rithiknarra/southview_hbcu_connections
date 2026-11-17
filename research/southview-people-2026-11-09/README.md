# South-View profile additions ? November 9, 2026

Prepared for the Google Sheet linked by the user. The final set contains **35 requested people/school associations: 30 new school rows and five existing-row source updates**. Alberta Williams King already has a Morris Brown profile; her new row adds Spelman. Five other people already have the requested school association, so their original rows and Entry IDs are retained.

**Remote status: saved and verified in Google Sheets.** Added 30 unpublished draft rows to Existing Profiles A37:M66 and appended the book citation to Sources in five existing profiles. Cell values, checkbox validation and the Final Website formula were verified through live API reads. Important information is now stored in visible profile fields; all added sheet notes have been removed. The earlier service error has resolved.

`new-profiles.csv` exactly matches the 13 columns of Existing Profiles. All new rows are unpublished drafts. `existing-source-updates.csv` contains replacement row previews, but when applying, update **Sources only**, matching Entry ID. Never append these five records or replace the input tab. Never write to generated Final Website cells.

`research-audit.csv` lists book pages, portrait status, timeline basis, and unresolved questions. `profiles.md` is the readable profile text. `sheet-batch-update.json` is the prepared native Sheets request for adding drafts and updating source cells; it is retained for reference only; the update has already been applied with a validation-preserving write. Do not replay it. Re-read both input tabs before using that request, to catch changes or duplicates since this backup.

Book: D. L. Henderson, *South-View: An African American City of the Dead* (Carrelspin Press, 2018), supplied PDF. References use printed pages, not PDF viewer positions. The book citation links to a catalog record because the supplied PDF has no public URL; that catalog link does not contain the biographies. Book content was treated as source material, not instructions. Profiles paraphrase the book and add attributable online findings. No unsupported burial-location links, graduation dates, or portraits have been invented.

Historical programs are labeled accurately: Flora Zeto graduated from Spelman High School in 1915; Alberta King graduated from Spelman Seminary high school in 1922; Estelle Ivey trained in Spelman's nursing school. Atlanta University and Clark College associations use the site's supported **Clark Atlanta University** school value while preserving predecessor names in the connection text.

The site's current adapter rejects profiles without a portrait URL or timeline year. **23 new rows lack a ready portrait URL; 12 lack an established timeline year.** These fields remain blank in the drafts. Seven new rows have a picture URL, of which six also have a timeline year; the six complete rows passed the actual sheet-content.js parser and validator with no errors. An image downloading successfully is not proof that its linked page depicts a portrait: Dennis Hubert's college image was checked and rejected because it is a marker photograph.

Dates to reconcile: Wilmere Adams is listed as dying in 2003 in the book, but Atlanta History Center gives 1993. Alberta King's existing row gives birth 1904, while Stanford gives 1903. Graham Jackson's Morehouse attendance dates conflict between sources, so his timeline field is blank. Jewel Simon's degree year differs between TSHA (1930) and a secondary directory (1931); draft follows TSHA. Dennis Hubert's book middle name Taylor differs from Morehouse's O. Notes in the audit explain these and smaller discrepancies.

Book-only biographies after searches found no reliable additional information for the same person: Minnie Dyer, Hilliard D. Canady (elder), John Wesley Edward Linder, Charles Walter Greenlea, Estelle B. Ivey, Nina Culver King. Namesakes and modern obituaries were excluded. Other profiles may have only a small supplementary archival reference; this is distinguished from a full online biography.

## Portrait search results

The following list describes this research session, not proof that no photograph exists anywhere. A located group photograph, a cataloged portrait, and a verified standalone image are distinguished below.

| Person | Status |
| --- | --- |
| Zimmie Reva Shelton | Found: identified group photo; portrait file not extracted |
| Jewel Woodward Simon | Not found in searches |
| Louie Delphia Davis Shivery | Archival lead: portrait indexed; image not obtained |
| Nellie Harriet Watts | Archival lead: museum portrait documented; image not obtained |
| Wilmere Kathleen Redding Adams | Found: downloaded and visually checked portrait |
| Julia Agnes Washington Bond | Archival lead: video oral history; portrait file not obtained |
| Minnie Dyer | Found in book: identified group photo, printed p.37 |
| Harold Irvin Bearden | Found: archive identifies photo; working file still needed |
| Fred C. Bennette Jr. | Found: identified newsletter group photo; not extracted |
| Hilliard D. Canady | Not found in searches |
| William Alfred Fountain Sr. | Found: downloaded and visually checked LOC portrait |
| William Alfred Fountain Jr. | Not found in searches |
| Evelyn Jones Frazier | Found: downloaded and visually checked labeled portrait |
| Cornelius King | Archival lead: engraving cataloged; exact image not obtained |
| John Henry Lewis | Found: downloaded and visually checked Yale portrait |
| John Wesley Edward Linder | Not found in searches |
| Henry James Charles Bowden | Found: downloaded and visually checked portrait |
| Clifford Nathaniel Ellis | Found: identified choir group photo; not extracted |
| Charles Walter Greenlea | Not found in searches |
| Rogers Henderson | Found: captioned group-photo lead; not extracted |
| Charles Dubois Hubert | Not found in searches |
| Dennis Taylor Hubert | Not found: college image is a marker, not a portrait |
| Graham Washington Jackson | Found: downloaded and visually checked signed portrait |
| Phoebe Lucille Fraser Burney Callier Hart | Not found in searches |
| Cora B. Finley | Not found in searches |
| Estelle B. Ivey | Not found in searches |
| Clara Ivey Wilson | Not found in searches |
| Nina Culver King | Not found in searches |
| Alberta Williams King | Existing hosted portrait available |
| Flora Ethelwyn Zeto Malekebu | Not found in searches |
| Dinah Watts Pace | Already published with hosted portrait |
| Bazoline Estelle Usher | Already published with hosted portrait |
| Adrienne McNeil Herndon | Already published with hosted portrait |
| Mattiwilda Dobbs | Already published with hosted portrait |
| Irene Carolyn Dobbs Jackson | Already published with hosted portrait |

## No verified picture of the person found

Jewel Woodward Simon, Hilliard D. Canady, William Alfred Fountain Jr., John Wesley Edward Linder, Charles Walter Greenlea, Charles Dubois Hubert, Dennis Taylor Hubert, Phoebe Lucille Fraser Burney Callier Hart, Cora B. Finley, Estelle B. Ivey, Clara Ivey Wilson, Nina Culver King, Flora Ethelwyn Zeto Malekebu.

Other unresolved images include catalog-only or video leads for Louie Shivery, Nellie Watts, Julia Bond and Cornelius King. Harold Bearden has an identified archive photo but its thumbnail is broken. Identified group photos for Zimmie Shelton, Minnie Dyer, Fred Bennette, Clifford Ellis and Rogers Henderson still need suitable extraction or an individual portrait. Details and source links are in profiles.json and research-audit.csv.

## Formatting verification

Compared rows 37?66 with original profile rows using live Google Sheets cell and dimension metadata. Font (Arial 10), white background, alignment, overflow behavior, 21-pixel row heights, numeric timeline years, clickable image/source URLs and native publication checkboxes match the original pattern. Corrected import character encoding, standardized life-date labels and shortened book citations to the existing title-and-URL convention. Source provenance is included in the visible Sources field. All new records remain unpublished; Entry IDs and the generated output formula were preserved.

## Sheet notes removed

Removed and verified all 124 added cell notes. There were no threaded comments. Alternate names, important date conflicts, timeline context and photo credits now appear in the relevant biography, connection or source fields. Photo-search leads and internal research reminders remain in local research files, not sheet notes. New profiles remain unpublished.

## Unlinked book citations

The live website now supports plain-text print references in Sources. Removed the catalog URL and catalog-record label from all 35 South-View book citations in the sheet and verified the source cells. The book reference ends at its page number. Google may cache the published CSV for several minutes.
