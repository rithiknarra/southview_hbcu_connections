"""Research draft exporter; no remote writes and no site-code edits."""
from pathlib import Path
import csv,json,re
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'southview-people-2026-11-09';OUT.mkdir(exist_ok=True)
with (ROOT/'existing-profiles-2026-11-09.csv').open(encoding='utf-8-sig',newline='') as f:
 r=csv.DictReader(f);HEADERS=r.fieldnames;EXISTING=list(r)
BOOK='https://search.worldcat.org/title/1048552699'
SCHOOLS={'S':'Spelman College','A':'Clark Atlanta University','M':'Morris Brown College','H':'Morehouse College','C':'Clark Atlanta University'}
records=[]
def add(name,school,pages,dates,year,connection,bio,legacy,urls='',portrait='Not found in searches',photo='',photo_source='',notes='',basis=''):
 row=dict.fromkeys(HEADERS,'')
 row.update({'College':SCHOOLS[school],'Timeline year':str(year) if year else '', 'Name':name,'Life dates':dates,'College connection':connection,'Biography':bio,'Institutional Connection and Legacy':legacy,'Photo':photo,'Photo source':photo_source,'Sources':f'D. L. Henderson, South-View: An African American City of the Dead (2018), pp. {pages}; supplied PDF consulted; catalog link | {BOOK}'+ ('\n'+urls if urls else ''),'Entry ID':re.sub('[^a-z0-9]+','-',name.lower()).strip('-')+'-'+school.lower(),'Published':'FALSE'})
 records.append(dict(row=row,book_pages=pages,portrait_status=portrait,notes=notes,timeline_basis=basis or ('See cited degree or connection.' if year else 'Year not established; intentionally blank.'),action='ADD'))
add('Zimmie Reva Shelton','S','241','d. 2006',1929,
 'Spelman College graduate, class of 1929; Atlanta art teacher.',
 'Shelton taught art in Atlanta public schools for approximately fifty years. She was the maternal grandmother of filmmaker Shelton Jackson "Spike" Lee.\nShe saved Social Security payments for her grandchildren\'s education, helping Lee attend Morehouse College and New York University, and supplied early funding for She\'s Gotta Have It.\nShe married postal employee Richard Jackson Shelton, who died in 1976.',
 'Her Spelman education supported a long teaching career.\nIn 2022 Spelman dedicated its admissions office to Shelton and her daughter, Jacquelyn Shelton Lee.',
 "Spelman College: admissions-office dedication, Shelton C'29 | https://www.linkedin.com/posts/spelman-college-2_today-is-a-bright-day-in-the-history-of-the-activity-7003082229618806784-AbAN\nAJC: identified 1929 graduation photograph | https://www.ajc.com/news/atlanta-news/spelman-honors-spike-lees-mother-grandmother/BU6QLB66BNC3HE52F3PL3RLNX4/",
 portrait='Found: identified group photo; portrait file not extracted',notes='Book: Reva; Spelman: Retha; other sources: Reatha. AJC identifies her second from left in front row of 1929 class photograph, credited to Spelman Archives. Individual yearbook photo also reported in Ralph Lauren commemorative book, not extracted.')
add('Jewel Woodward Simon','A','241-242','1911–1996',1930,
 'Atlanta University graduate, summa cum laude; artist and mathematics teacher.',
 'Born in Houston, Simon combined interests in mathematics, visual arts, music and poetry. She taught mathematics at Jack Yates High School before settling in Atlanta with her husband Edward Lloyd Simon.\nShe studied painting with Hale Woodruff and sculpture with Alice Dunbar and became the first Black graduate awarded a BFA by the Atlanta School of Art in 1967.',
 'Her Atlanta University education preceded a career in painting, sculpture and printmaking.\nShe helped found the National Conference of Negro Artists and participated in civic arts leadership.',
 'Texas State Historical Association: Jewel Alma Woodard Simon | https://www.tshaonline.org/handbook/entries/simon-jewel-alma-woodard\nAUC Woodruff Library: Simon oral history, October 15, 1976 | https://dlg.usg.edu/record/auu_auc-062_auc-062-0016',
 notes='Book: Woodward; TSHA: Woodard. TSHA gives 1930 undergraduate degree; secondary directory says 1931. Timeline follows TSHA; university record desirable. No verified portrait found; artwork and audio are not portraits.')
add('Louie Delphia Davis Shivery','A','241','d. 1961',1936,
 'Atlanta University master\'s graduate; educator and social-welfare historian.',
 'Shivery headed the English department at Booker T. Washington High School and wrote its school song.\nShe contributed to the Atlanta Daily World and held leadership roles in Black women\'s civic organizations, including the Atlanta Metropolitan Council of Negro Women. She also served the Colored Branch of the Atlanta Tuberculosis Association.',
 'Her Atlanta University research documented organized social work among Black Atlantans from 1890 to 1935.\nShe helped develop the Neighborhood Union and served as its executive secretary and historian.',
 'GSU research: citations to her 1936 Atlanta University thesis | https://scholarworks.gsu.edu/bitstreams/6a009b2c-3a02-4b23-bee9-c11fcdf0cb86/download',
 portrait='Archival lead: portrait indexed; image not obtained',notes='The Ivy Leaf index lists a Louie D. Shivery portrait in March 1962, vol.39 no.4: https://pq-static-content.proquest.com/collateral/media2/documents/1336_TheIvyLeaf.pdf . Thesis year supported by research citations; original thesis record desirable.')
add('Nellie Harriet Watts','A','249','d. 1969','',
 'Atlanta University graduate; Detroit educator and concert promoter.',
 'Watts also graduated from Detroit Teachers College and taught in Detroit public schools. In 1937 she financed Marian Anderson\'s first Detroit performance.\nHer concert series presented artists including Leontyne Price, Paul Robeson and the Alvin Ailey Dance Theatre. She founded an arts-support organization and served on the Detroit NAACP board.\nShe was a daughter of South-View co-founder Albert Watts.',
 'Her Nellie Watts Concert Series expanded opportunities for Black performing artists for twenty-five years.',
 'Detroit Historical Society: program documenting 1971 presentation of Watts portrait | https://www.detroithistorical.org/learn/online-research/collection/archive/program-193',
 portrait='Archival lead: museum portrait documented; image not obtained',notes='DHS record 2014.002.339 depicts a program; it is not the portrait itself. Degree year not established.')
add('Wilmere Kathleen Redding Adams','A','169','1890–1993',1911,
 'Completed Atlanta University\'s high school and normal teacher-training course in 1911.',
 'Adams grew up on Auburn Avenue, the daughter of Wesley Chapel Redding and Ellen Redding.\nShe taught in Atlanta and Fulton County schools and at the Carrie Steele-Pitts Home. She preserved local history through oral histories and her service as historian of First Congregational Church. The book also records her Auburn Avenue Research Library board service.',
 'Applied her Atlanta University training in public education and service to children.\nPreserved the history of Auburn Avenue and Black education in Atlanta.',
 'Atlanta History Center: Kathleen Adams oral history, AU 1911 graduate | https://dlg.usg.edu/record/geh_livatl_ahc-637-004-001\nBlack Women Oral History Project: Adams interview and biographical introduction | https://api.pageplace.de/preview/DT0400.9783110973914_A21709471/preview-9783110973914_A21709471.pdf',
 portrait='Found: downloaded and visually checked portrait',photo='https://upload.wikimedia.org/wikipedia/commons/3/39/Kathleen_Adams_%2813270247873%29.jpg',photo_source='https://commons.wikimedia.org/wiki/File:Kathleen_Adams_(13270247873).jpg',notes='Date conflict: book gives death 2003; Atlanta History Center authority record gives 1890–1993. Draft follows archive; reconcile before publishing. Photo: Judith Sedwick, Schlesinger Library, Black Women Oral History Project; source states no known copyright restrictions.')
add('Julia Agnes Washington Bond','A','177','1908–2007',2000,
 'Atlanta University library-science master\'s graduate and librarian; retired in 2000.',
 'Bond was born in Nashville and attended Fisk University, where she met educator Horace Mann Bond.\nShe returned to school at age fifty-six to study library science at Atlanta University. She worked at Trevor Arnett Library and later as a part-time reference librarian at Robert W. Woodruff Library.\nShe and her husband supported their children\'s civil rights work, including Julian Bond\'s. She retired in 2000 at ninety-two.',
 'Sustained the Atlanta University Center\'s scholarly community through decades of library service.',
 'The HistoryMakers: Julia Bond oral-history biography | https://www.thehistorymakers.org/biography/julia-bond-41',
 portrait='Archival lead: video oral history; portrait file not obtained',notes='Do not repeat HistoryMakers errors identifying Horace as AU president and death 1973. Book identifies him as dean and dates death 1972. Degree year unverified.',basis='2000 is documented library retirement, not graduation year.')
add('Minnie Dyer','M','36-38','c. 1890–1974','',
 'Graduate of Morris Brown College and Atlanta University; Atlanta elementary-school teacher.',
 'Dyer was a daughter of Caleb and Emma Dyer. Her father, a carpenter, purchased the family\'s first cemetery land at South-View.\nShe worked as a seamstress before earning teaching credentials. After temporary teaching work in 1910, she joined Mitchell Street School full time in 1911. She later taught at Ashby Street School and Our Lady of Lourdes Catholic School.\nHer niece and pupil, Pearlie Craft Dove, became a noted educator at Clark College.',
 'Put her college education into practice in Atlanta schools during segregation, supporting generations of elementary-school students.',
 portrait='Found in book: identified group photo, printed p.37',notes='Book-based biography; no reliable additional online biography found. Minnie Lee Dyer (1916–1999), buried in Durham, is a different person and excluded. Book photo identifies Minnie standing at far right, credit Carol Dove; needs extraction and portrait preparation.')
add('Harold Irvin Bearden','M','173','d. 1990','',
 'Morris Brown College and Turner Theological Seminary graduate; later chaired Morris Brown\'s trustees.',
 'Bearden became pastor of Big Bethel AME Church in Atlanta in 1951. His radio sermons reached a wide audience, and he participated in civil rights protests.\nHe served as president of the Atlanta NAACP and was elected an AME bishop in 1964.',
 'Helped Morris Brown work toward accreditation as chair of its trustees.\nCombined educational leadership with AME ministry and advocacy against segregation.',
 'Big Bethel AME Church: history | https://www.bigbethelame.org/history\nAUC Woodruff Library: Bishop H.I. Bearden photograph, circa 1978 | https://dlg.usg.edu/record/auu_auc-047_auc-066-0206',
 portrait='Found: archive identifies photo; working file still needed',notes='DLG thumbnail returns 404. Partner handle https://hdl.handle.net/20.500.12322/auc.066:0206 . Graduation and trustee appointment years not established.')
add('Fred C. Bennette Jr.','M','174','1928–1994',1960,
 'Morris Brown and Turner Theological Seminary alumnus; student civil rights organizer.',
 'Bennette served in the U.S. Army before returning to Atlanta for further education and civil rights work.\nHe organized voter-registration campaigns and worked closely with Martin Luther King Jr. and Andrew Young. He later advised Jimmy Carter and Young and served the King Center as an adviser and security director.',
 'Organized against segregation at Rich\'s department store while a Morris Brown student.\nBecame the first director of SCLC\'s Operation Breadbasket.',
 'SCLC Newsletter April 1962: Turner student and Georgia field secretary | https://www.crmvet.org/docs/sclc/6204_sclc_newsletter.pdf\nSCLC Newsletter November–December 1963: identified group photograph | https://www.crmvet.org/docs/sclc/6311_sclc_newsletter.pdf\nRoyal Holloway research: Bennette biographical note | https://pure.royalholloway.ac.uk/ws/files/17598699/PhD_2_postviva_final.pdf',
 portrait='Found: identified newsletter group photo; not extracted',basis='1960 marks student civil rights organizing, not a verified graduation year.')
add('Hilliard D. Canady','M','185','1859–1932','',
 'Attended Morris Brown College and Turner Theological Seminary; AME presiding elder.',
 'Canady was born in Troup County, Georgia, in 1859 and also attended Meharry Medical College. He served as a presiding elder in the AME Church.\nHis wife, Nora Lee Bryant Canady, was a Clark College graduate and church worker. Their son, Hilliard D. Canady Jr., became a physician and medical inspector of Atlanta\'s Black public schools. Father and son died in 1932.',
 'His Morris Brown and Turner education supported his career in African Methodist Episcopal ministry.',
 notes='Book-based profile; no reliable additional online biography or identified portrait found for elder Canady. Do not assign physician/football-coach son\'s achievements to father.')
add('William Alfred Fountain Sr.','M','200','1870–1955',1911,
 'Morris Brown alumnus and fifth president, 1911–1920; later chancellor.',
 'Fountain was an AME minister who became a bishop in 1920. He held degrees from Morris Brown and Turner Theological Seminary and pursued further education elsewhere.\nHe strengthened congregations, participated in civic organizations and worked to sustain Black higher education alongside his son William Alfred Fountain Jr.',
 'Led Morris Brown as president and later chancellor.\nFountain Hall bears his name and connects Morris Brown with the former Atlanta University campus.',
 'National Park Service: Atlanta University Center historic district nomination | https://npgallery.nps.gov/NRHP/GetAsset/1b062e51-9356-4645-a747-d87a5d6e6237/\nLibrary of Congress: Fountain, Rev. W.A., LC-DIG-bellcm-00373 | https://www.loc.gov/resource/bellcm.00373/',
 portrait='Found: downloaded and visually checked LOC portrait',photo='https://tile.loc.gov/storage-services/service/pnp/bellcm/00300/00373v.jpg',photo_source='https://www.loc.gov/resource/bellcm.00373/',notes='LOC landing page blocks retrieval, but catalog search identifies sitter and image downloads correctly. C.M. Bell collection; catalog says no known publication restrictions.')
add('William Alfred Fountain Jr.','M','200','d. 1953',1929,
 'Seventh president of Morris Brown College, serving 1929–1950.',
 'Fountain Jr. led Morris Brown during severe financial hardship. The book describes his decision to forgo salary while the institution reorganized. His father, a former president, served as chancellor during the early years of his administration.\nAfter his presidency he served as secretary-treasurer of the AME Church\'s General Board of Education.',
 'Helped keep Morris Brown operating through the Great Depression.\nDuring his administration the college joined the Atlanta University Center and relocated to the former Atlanta University campus.',
 'National Park Service: Atlanta University Center historic district nomination | https://npgallery.nps.gov/NRHP/GetAsset/1b062e51-9356-4645-a747-d87a5d6e6237/',
 notes='Do not reuse father\'s portrait. Book discusses a funding allegation at end of tenure; omitted from short bio without fuller context.')
add('Evelyn Jones Frazier','M','201','d. 2007','',
 'Associated with Morris Brown College; Atlanta restaurant owner and civic leader.',
 'Frazier opened the Evelyn Jones Cafe in 1936 and expanded it with her husband Luther Ellis Frazier in the 1940s as Frazier\'s Cafe Society.\nThe restaurant became a gathering place for leaders including Benjamin Mays, Martin Luther King Jr. and Thurgood Marshall. She supported businesswomen\'s organizations and the NAACP. Her funeral notice confirms interment at South-View.',
 'Her restaurant provided space for Black civic, religious and civil rights organizations.\nHenderson records a Morris Brown affiliation without specifying a degree or graduation year.',
 'Discover Atlanta: A Seat at the Table with Evelyn J. Frazier | https://discoveratlanta.com/dining/culinary-scene/a-seat-at-the-table-with-evelyn-j-frazier/\nFamily funeral notice: Evelyn Jones Frazier | https://www.legacy.com/us/obituaries/atlanta/name/evelyn-frazier-obituary?id=23620152',
 portrait='Lead: article images require visual verification',notes='BlackPast original now retrieved separately; reconcile degree year and photo before finishing this record.')
add('Cornelius King','M','219-220','d. 1934','',
 'Trustee of Morris Brown College; real-estate entrepreneur and hospital organizer.',
 'King worked in Atlanta\'s private clubs and later in Washington, D.C., before developing businesses that served Black Atlantans.\nHe opened King\'s Wigwam, a recreation resort near Kennesaw, in 1918 and founded Cornelius King & Son real estate in 1922. His second wife Nina Culver King was a Spelman graduate. His son Turner later headed the family firm.',
 'Served Morris Brown as trustee and Big Bethel AME Church as trustee-board chair.\nHelped organize Mercy Hospital in 1919 and served as superintendent.',
 'Auburn Avenue Research Library: Progress and Achievements of the Colored People, biographical-engraving lead | https://dlg.galileo.usg.edu/id:dlg_aaed_aarl09-002-011-001',
 portrait='Archival lead: engraving cataloged; exact image not obtained',notes='Dawes Commission claims in book not independently verified and omitted. DLG volume is a portrait lead, not a checked standalone image.')
add('John Henry Lewis','M','222','1882–1958',1905,
 'Morris Brown graduate, 1905; sixth and eighth president, 1920–1928 and 1951–1958.',
 'Born in Ellaville, Georgia, Lewis studied ministry at Yale Divinity School and pursued graduate education at the University of Chicago.\nHe served as an AME minister and educational administrator in several states before returning to Morris Brown for his second presidency, which continued until his death. Historian David Levering Lewis was his son.',
 'Taught at Morris Brown and led it through two presidencies.\nHis wider educational leadership included Dunbar High School, Shorter College and Payne Theological Seminary.',
 'Yale University Library: John Henry Lewis biography and portrait | https://onlineexhibits.library.yale.edu/s/early-black-yale-students/item/20972',
 portrait='Found: downloaded and visually checked Yale portrait',photo='https://omeka-yale-prod.s3.amazonaws.com/large/5878c1ee9547f53789e89e082c4f40d7e8796c6f.jpg',photo_source='https://onlineexhibits.library.yale.edu/s/early-black-yale-students/item/20972',notes='MA year conflict: book 1914; Yale prose 1915 but lists thesis 1914. Omit degree year. Exclude boxer with same name.')
add('John Wesley Edward Linder','M','223','d. 1939','',
 'Morris Brown College graduate; physician and medical-association leader.',
 'Linder continued to Meharry Medical College and initially practiced medicine in Dublin, Georgia, before relocating to Atlanta.\nHe served as president of the Atlanta and Georgia medical associations and began the Georgia association\'s first quarterly journal. He also served on the National Medical Association\'s executive board.',
 'His education and professional leadership supported Black physicians and patients in segregated Georgia.',
 notes='Book-based profile; no reliable additional online biography or identified portrait found. Omit book\'s unverified characterization of father George W. Linder as congressman; confirm office first.')
add('Henry James Charles Bowden','H','178','1902–1995',1925,
 'Morehouse College graduate, class of 1925; Episcopal priest and advocate for older adults.',
 'Bowden continued at General Theological Seminary and Columbia University. Ordained in 1929, he became rector of St. Paul\'s Episcopal Church in Atlanta in 1934.\nHe served as a military and Veterans Administration chaplain and worked with aging-service organizations and the NAACP.',
 'Connected ministry with service and advocacy for older adults.\nFulton County\'s H.J.C. Bowden senior multipurpose facility recognizes his work.',
 'Friends of Bowden: founder biography and portrait | https://friendsofbowden.wixsite.com/website-2/founder\nThe Morehouse Tiger 1925, reproduced in commemorative book | https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/default/dwe07b70ee/hbcu/PoloRLExclusivelyforMorehouseAndSpelmanColleges.pdf?ab=en_US_HBCU_Slot_8_S1_L1_SHOP\nSmithsonian: Bowden oral-history video record | https://www.si.edu/object/archives/components/sova-acma-09-001-ref141',
 portrait='Found: downloaded and visually checked portrait',photo='https://static.wixstatic.com/media/747dc6_d0547f88ba8146528608f3e542f64c9b~mv2.png',photo_source='https://friendsofbowden.wixsite.com/website-2/founder')
add('Clifford Nathaniel Ellis','H','197','1897–1980',1926,
 'Morehouse graduate, 1926; Morehouse School of Religion graduate, 1927.',
 'Born in Chattanooga, Ellis completed Morehouse Academy before his college and divinity degrees. He pastored Georgia churches and led Reed Street, later Paradise, Baptist Church for more than four decades.\nHe served as president of the Atlanta Baptist Ministers Union. His wife Vashti Scott Ellis was a journalist in the Atlanta Daily World publishing family.',
 'Applied Morehouse training in a long pastoral career.\nExtended the church\'s reach through Chariot Wheels gospel broadcasting and national Baptist leadership.',
 'Paradise Baptist Church: degrees and ministry | https://paradiseatlmbc.org/our-history\nCapital B: identified 1942 Ellis and choir photograph | https://atlanta.capitalbnews.org/paradise-church-celebrates-160-years/',
 portrait='Found: identified choir group photo; not extracted',notes='Book starts pastorate in 1933; church says 1934. Draft avoids disputed start year; degree dates follow church. Photo caption identifies him seated at center; credit Auburn Avenue Research Library.')
add('Charles Walter Greenlea','H','203','d. 1992','',
 'Morehouse College graduate; Atlanta University master\'s graduate.',
 'Known as Pete, Greenlea served for twenty years as executive director of the Atlanta NAACP. He worked as an editor at the Atlanta Daily World and with Economic Opportunity Atlanta.\nHe co-founded and led Summerhill Neighborhood Inc., connecting community organizing with housing and neighborhood development.',
 'Applied his education to journalism, civil rights and community development.\nGreenlea Commons in Summerhill was named in his honor.',
 notes='Book-based profile; no reliable additional online biography or identified portrait found. Exclude modern ECO-PARADIGM founder and Charles Walter Greenlea II (d.2026).')
add('Rogers Henderson','H','209','d. 1962','',
 'Honorary alumnus and supporter of Morehouse College; real-estate entrepreneur.',
 'Henderson founded Henderson Realty Company on Auburn Avenue and helped establish the Empire Real Estate Board. His wife Ida Franklin Henderson joined the business and held leadership roles in Black women\'s civic organizations.\nThe couple supported Morehouse\'s Danforth Chapel with a stained-glass window and painting.',
 'Morehouse honored him as an honorary alumnus, reflecting his support rather than an earned degree.',
 'Atlanta Daily World, September 25, 1959: group-photo caption identifies Rogers Henderson | https://tile.loc.gov/storage-services/service/ndnp/gu/batch_gu_goblin_ver01/data/sn82015425/00529041032/1959092501/0499.pdf',
 portrait='Found: captioned group-photo lead; not extracted',notes='Photo requires visual identification against full caption. Honorary-alumnus date not established.')
add('Charles Dubois Hubert','H','214','d. 1944',1909,
 'Morehouse graduate, 1909; religion-school director and acting president, 1937–1940.',
 'Hubert grew up in Hancock County, Georgia, and completed Morehouse Academy in 1905. He earned a Morehouse bachelor\'s degree in 1909 and a divinity degree from Rochester Theological Seminary in 1912.\nHe taught church history, directed Morehouse\'s School of Religion and served as pastor of Providence Baptist Church.',
 'Guided Morehouse as acting president between Samuel Archer and Benjamin Mays.\nCombined scholarship with pastoral and educational leadership.',
 'Benjamin Brawley: History of Morehouse College, alumni list | https://dlg.usg.edu/record/dlg_zlgb_gb0312\nMorehouse Alumnus, July 1944: Hubert tribute and Mays eulogy, family reproduction | https://www.wcrhubert.com/Tribute_to_Dr_Hubert.html',
 notes='Tribute page has text, not verified portrait.')
add('Dennis Taylor Hubert','H','214','d. 1930',1930,
 'Morehouse divinity student in 1930; awarded a posthumous honorary degree in 2025.',
 'Hubert was eighteen when a white mob killed him on the Crogman School playground in Atlanta on June 15, 1930.\nHe was a son of minister Gaddus Johnson Hubert and educator Pearl Parks Hubert and nephew of Charles Dubois Hubert. The killing and attacks against his family illustrate the racial terror that constrained Black life and education.',
 'His interrupted education is part of Morehouse\'s history.\nMorehouse honored his life in its 2025 commencement with a posthumous honorary bachelor\'s degree.',
 'Morehouse College: 2025 commencement, Dennis Hubert biography | https://morehouse.edu/events/signature-events/commencement/2025',
 portrait='Not found: college image is a marker, not a portrait',notes='Book: Dennis Taylor; Morehouse: Dennis O. Same age, school, killing date support identity. Name variant needs note. Morehouse has contradictory degree language; individual bio specifies honorary bachelor\'s. Downloaded Dennis Hubert.jpg depicts historical marker; rejected as portrait.',basis='1930 marks documented student enrollment and death, not graduation.')
add('Graham Washington Jackson','H','215-216','1903–1983','',
 'Attended Morehouse College and Atlanta University; musician and music educator.',
 'Born in Portsmouth, Virginia, Jackson became known for piano, organ and accordion performance. He led music at Booker T. Washington High School and performed at wartime fundraising events and for U.S. presidents.\nA widely circulated 1945 photograph shows him playing accordion in mourning for Franklin Roosevelt. His career also included jazz-band leadership, broadcasting and public performances.',
 'Connected college study with music education and performance in Atlanta.\nJimmy Carter named him Georgia\'s official state musician.',
 'New Georgia Encyclopedia: Graham Jackson Sr. biography and portraits | https://www.georgiaencyclopedia.org/articles/arts-culture/graham-jackson-sr/\nGPB: Graham Jackson family recollections | https://www.gpb.org/blogs/hullingers-musings/2025/04/17/80-year-westside-atlanta-roots',
 portrait='Found: downloaded and visually checked signed portrait',photo='https://bunny-wp-pullzone-cjamrcljf0.b-cdn.net/wp-content/uploads/2023/09/Graham-Jackson-Sr_001-810x1024.jpeg',photo_source='https://www.georgiaencyclopedia.org/articles/arts-culture/graham-jackson-sr/',notes='Attendance conflict: NGE 1924; GPB family account 1922–1923. Leave timeline blank. Book says seven presidents, NGE six; omit count. Portrait courtesy of Auburn Avenue Research Library.')
add('Phoebe Lucille Fraser Burney Callier Hart','C','208','1902–2000',1935,
 'Clark College graduate, 1935; dean of women, 1943–1958.',
 'Hart pursued religious-education study at Gammon Theological Seminary after her Clark degree. She directed Congregational religious education and worked in Morehouse\'s endowment office before becoming Clark\'s dean of women.\nLater known as Phoebe Callier, she served educational institutions in Chattanooga. The book also records her sponsorship of two African students.',
 'Guided Clark students for fifteen years as dean of women.\nConnected religious education with administration at several Black colleges.',
 'Stanford King Institute: Phoebe Fraser Burney biography, Clark BA 1935 and deanship 1943–1958 | https://kinginstitute.stanford.edu/king-papers/documents/alberta-williams-king-3',
 notes='Aliases needed for research: Phoebe Fraser Burney and Phoebe F. Callier. No verified portrait found.')
add('Cora B. Finley','S','197-198','d. 1953','',
 'Spelman graduate; first Spelman alumna to earn an advanced degree at Atlanta University, according to Henderson.',
 'Finley was principal of Atlanta\'s Yonge Street School. She helped organize an early Black parent-teacher association in 1911 and challenged unequal teacher salaries through the Gate City Teachers Association.\nShe worked with the NAACP, served on the first board of the Atlanta Urban League, organized a night school and later led Alabama State University\'s education department.',
 'Applied Spelman and Atlanta University education in school leadership, adult education and advocacy for teachers.',
 'Spelman Archives: Harriet Giles papers, correspondence involving Cora Finley | https://www.spelman.edu/_1_Docs-and-Files/archives/finding-aids/harriet-giles-papers.pdf',
 notes='Online finding aid confirms correspondence only, not extra biography or portrait. Book supports biography. Use early PTA wording; national-first claim not independently checked.')
add('Estelle B. Ivey','S','215','d. 1977','',
 'Graduate of Spelman\'s historical nursing school; Ivey Brothers Funeral Home business officer.',
 'Ivey and her four brothers grew up in the Carrie Steele orphanage after their parents died. Henry and James established Ivey Brothers Funeral Home in 1912.\nEstelle worked as bookkeeper, secretary and treasurer. The family enterprise supported churches, charitable work and families with limited financial means.',
 'Her Spelman training and business service connected the college with an important Black-owned funeral enterprise.',
 notes='Book-based profile; no reliable additional online biography or identified portrait found. Historical nursing-school graduation must not be described as modern bachelor\'s degree. Ivey, not Ivy.')
add('Clara Ivey Wilson','S','33, 215','d. 1992',1938,
 'Spelman College graduate, class of 1938; funeral-home owner and South-View board leader.',
 'Wilson succeeded her father Henry M. Ivey in ownership and leadership of Ivey Brothers Funeral Home. She also followed him onto South-View\'s board and served as second vice president.\nA 1962 Atlanta Daily World account records her service with Gate City Day Nurseries and Delta Sigma Theta and jury duty in Fulton County.',
 'Continued her family\'s funeral-service and civic leadership.\nSpelman\'s Ivey-Wilson endowed scholarship commemorates her as a member of its class of 1938.',
 'Spelman scholarship catalog: Ivey-Wilson Scholarship, Clara Ivey Wilson C\'38 | https://spelman.scholarships.ngwebsolutions.com/Scholarships/Search\nAtlanta Daily World, March 7, 1962: Wilson\'s civic and business service | https://tile.loc.gov/storage-services/service/ndnp/gu/batch_gu_harpy_ver01/data/sn82015425/00529041093/1962030701/0357.pdf',
 notes='No portrait assigned: article heading does not prove adjacent newspaper image is her.')
add('Nina Culver King','S','220','d. 1934','',
 'Spelman College graduate; member of Atlanta\'s King family of business and civic leaders.',
 'King worked in the United States Patent Office in Washington, D.C., where she met Cornelius King. She became his second wife.\nHenderson identifies her as a Spelman graduate and records her death in 1934.',
 'Her Spelman education connects the college to the family of Morris Brown trustee and entrepreneur Cornelius King.',
 notes='Book-based profile; no reliable additional online biography or verified portrait found. Exclude Nina King Miller, modern journalist Nina Culver and other namesakes.')
add('Alberta Williams King','S','220','1903–1974',1922,
 'Spelman Seminary high school graduate, 1922; later Morris Brown College graduate.',
 'King was the daughter of Ebenezer Baptist Church pastor Adam Daniel Williams and Jennie Celeste Williams. She led Ebenezer\'s choir and served for decades as organist and music director.\nShe raised her family with Martin Luther King Sr. and was the mother of Martin Luther King Jr. She was killed while playing the church organ in June 1974.',
 'Her historical Spelman Seminary education preceded teacher training at Hampton and a Morris Brown bachelor\'s degree in 1938.\nSpelman\'s Alberta Williams King Memorial Endowed Scholarship connects her legacy with music and nonviolence studies.',
 'Spelman 2010–2011 philanthropy report: Alberta Williams King H.S.\'22 | https://www.spelman.edu/_1_Docs-and-Files/giving/philanthropy-report-2010-2011.pdf\nStanford King Institute: Alberta Williams King | https://kinginstitute.stanford.edu/king-alberta-williams',
 portrait='Existing hosted portrait available',photo='https://southview-hbcu-connections.netlify.app/images/people/Alberta%20Williams%20King.png',photo_source='https://commons.wikimedia.org/wiki/File:Martin_Luther_King,_Henry_Elkins,_and_Alberta_Williams_King_at_Ebenezer,_1962_(cropped).png',notes='Add Spelman row with unique Entry ID and retain Morris Brown row. Birth-year conflict: existing row 1904, Stanford 1903; draft follows Stanford. Flag existing dates for review.')
add('Flora Ethelwyn Zeto Malekebu','S','225','d. 1977',1915,
 'Spelman High School graduate, 1915; co-namesake of Gordon-Zeto Center for Global Education.',
 'As a child Flora Zeto came from the Congo to Atlanta with Spelman alumna and missionary Clara A. Howard.\nShe married physician Daniel Sharpe Malekebu, who had also come from Africa with a missionary and later trained at Meharry Medical College.\nThe couple worked in African missions and maintained U.S. connections. National Baptist Convention records identify Flora as an assistant at Providence Industrial Mission in Nyasaland.',
 'Spelman identifies Zeto as its first African graduate from the historical high school program in 1915.\nHer education and missionary service form part of Spelman\'s international legacy.',
 'Spelman handbook: historical high school graduation and Gordon-Zeto naming | https://mit.spelman.edu/policies/Student%20Handbook.pdf\nNational Baptist Convention minutes, 1947 p.256: Flora Malekebu\'s role | https://media2.sbhla.org.s3.amazonaws.com/aaa/nbc/NBC_1947.pdf',
 notes='Corrected Maklekebu to Malekebu. Institutional source specifies high school, not college bachelor\'s degree. No verified portrait found.')

# Reuse existing rows and IDs; append source citations to original records.
for name,pages in [('Dinah Watts Pace','233'),('Bazoline Estelle Usher','247'),('Adrienne McNeil Herndon','209-210'),('Mattiwilda Dobbs','194-195'),('Irene Carolyn Dobbs Jackson','216')]:
 row=next(x.copy() for x in EXISTING if x['Name']==name)
 row['Sources']=row['Sources'].rstrip()+f'\nD. L. Henderson, South-View: An African American City of the Dead (2018), pp. {pages}; supplied PDF consulted; catalog link | {BOOK}'
 records.append(dict(row=row,book_pages=pages,portrait_status='Already published with hosted portrait',notes='Update Sources in existing row; do not append duplicate.',timeline_basis='Retain existing year.',action='UPDATE SOURCES'))

# BlackPast original, retrieved in full: resolve Evelyn's degree and portrait.
e=next(x for x in records if x['row']['Name']=='Evelyn Jones Frazier')
e['row'].update({'Life dates':'1912–2007','Timeline year':'1952','College connection':'Morris Brown College graduate, 1952; Atlanta restaurant owner and civic leader.','Photo':'https://blackpast.org/wp-content/uploads/Unknown-2-scaled.jpeg','Photo source':'https://blackpast.org/african-american-history/evelyn-jones-frazier-1912-2007/'})
e['row']['Sources']+='\nBlackPast: Evelyn Jones Frazier (1912–2007), Maurice Hobson | https://blackpast.org/african-american-history/evelyn-jones-frazier-1912-2007/'
e['row']['Institutional Connection and Legacy']='Earned her Morris Brown bachelor\'s degree in 1952 while developing her restaurant business.\nHer restaurant provided meeting space for Black civic, religious and civil rights organizations.'
e['portrait_status']='Found: downloaded and visually checked labeled portrait'
e['notes']='Original BlackPast biography retrieved and confirms bachelor\'s degree 1952. Article published October 14, 2026; author Maurice Hobson. Photo labeled Evelyn Jones Frazier.'
e['timeline_basis']='1952 bachelor\'s degree, BlackPast.'

def write_csv(name,rows,headers=HEADERS):
 with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=headers);w.writeheader();w.writerows(rows)
new=[r['row'] for r in records if r['action']=='ADD']
updates=[r['row'] for r in records if r['action']=='UPDATE SOURCES']
write_csv('new-profiles.csv',new);write_csv('existing-source-updates.csv',updates)
(OUT/'profiles.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
audit=[]
for r in records:
 row=r['row'];missing=[]
 if not row['Photo']:missing.append('working portrait URL')
 if not row['Timeline year']:missing.append('verified timeline year')
 audit.append({'Name':row['Name'],'College':row['College'],'Action':r['action'],'Book pages':r['book_pages'],'Portrait status':r['portrait_status'],'Missing':'; '.join(missing),'Timeline basis':r['timeline_basis'],'Notes':r['notes']})
write_csv('research-audit.csv',audit,list(audit[0]))
print(f'{len(records)} requested associations: {len(new)} new rows and {len(updates)} existing source updates.')
print('New rows without portrait URLs:',sum(not r['Photo'] for r in new),'without timeline years:',sum(not r['Timeline year'] for r in new))
