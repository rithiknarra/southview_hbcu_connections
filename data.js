/* College profiles and historical connections. Source metadata is retained internally.
   Clark Atlanta University was founded in 1988; its timeline includes explicitly labeled
   Atlanta University (1865) and Clark University/College (1869) predecessor connections.
   Dates prefixed with "By" or "c." are bounds or approximations, not asserted graduation dates.
   Missing image values await user-supplied portraits; see RESEARCH.md.
   Image credits display only when attributionRequired is true. */
const INSTITUTIONS = [
  {
    "id": "spelman",
    "image": "images/schools/spelman.png",
    "founded": 1881,
    "color": "#1b3a73",
    "foundingNote": "Spelman College is a historically Black women’s college located in Atlanta, Georgia. Founded in 1881, it has a long tradition of educating and empowering Black women through the liberal arts and sciences. With a focus on academic excellence, leadership, and service, Spelman prepares students to make meaningful contributions to their communities and the world.",
    "foundingSource": "https://www.spelman.edu/about/history-in-brief.html",
    "name": "Spelman College"
  },
  {
    "id": "morehouse",
    "image": "images/schools/morehouse.svg",
    "founded": 1867,
    "color": "#6b1f2a",
    "foundingNote": "Morehouse College is a historically Black liberal arts college for men located in Atlanta, Georgia. Founded in 1867 as Augusta Institute, it has a long tradition of educating Black men and developing their intellectual abilities and character. With an emphasis on academic achievement, leadership, and service, Morehouse prepares students to contribute to their professions, strengthen their communities, and engage with the wider world.",
    "foundingSource": "https://morehouse.edu/about/our-history/",
    "name": "Morehouse College"
  },
  {
    "id": "clark",
    "image": "images/schools/clark.svg",
    "founded": 1988,
    "color": "#9b1b30",
    "foundingNote": "Clark Atlanta University is a historically Black university located in Atlanta, Georgia. Established in 1988, it carries forward a rich legacy of Black higher education. Through teaching, research, and service, Clark Atlanta prepares students to become leaders, advance knowledge, and help address challenges in their communities and beyond.",
    "foundingSource": "https://www.cau.edu/about/history",
    "name": "Clark Atlanta University",
    "timelineStart": 1865,
    "timelineStartLabel": "Predecessors"
  },
  {
    "id": "morris",
    "image": "images/schools/morris.png",
    "founded": 1881,
    "color": "#4a2c6d",
    "foundingNote": "Morris Brown College is a historically Black liberal arts college located in Atlanta, Georgia. Founded in 1881 by the African Methodist Episcopal Church, it has a long tradition of expanding access to higher education and supporting students in a nurturing environment. With a commitment to academic achievement, personal growth, and public service, Morris Brown prepares students to pursue meaningful careers and make positive contributions to society.",
    "foundingSource": "https://morrisbrown.edu/history/",
    "name": "Morris Brown College"
  },
  {
    "id": "medicine",
    "image": "images/schools/medicine.png",
    "founded": 1975,
    "color": "#003b5c",
    "foundingNote": "Morehouse School of Medicine is a historically Black medical school located in Atlanta, Georgia. Founded in 1975 as a medical education program at Morehouse College, it became an independent institution in 1981. Through education, research, and community service, the school prepares healthcare professionals and scientists to improve health, expand access to care, and advance health equity, with particular attention to underserved communities.",
    "foundingSource": "https://www.msm.edu/about_us/msm-history.php",
    "name": "Morehouse School of Medicine"
  }
];

const PEOPLE = [
  {
    "id": "Ruby-Doris-Smith-Robinson",
    "name": "Ruby Doris Smith-Robinson",
    "years": "April 25, 1942 – October 7, 1967",
    "image": {
      "url": "images/people/Ruby Doris Smith-Robinson.jpg",
      "alt": "Portrait of Ruby Doris Smith-Robinson",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ruby_Doris_Smith-Robinson.jpg"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1965 with a degree in physical education. Organized with the Atlanta Student Movement while a student."
      }
    ],
    "bio": [
      "Attended SNCC’s founding conference at Shaw University and became one of the organization’s central administrators.",
      "Joined the 1961 Rock Hill sit-in campaign and served a 30-day sentence as part of the jail-no-bail strategy. Later that year, joined the Freedom Rides and was imprisoned in Mississippi’s Parchman Penitentiary.",
      "As SNCC’s administrative secretary, coordinated support for organizers in Mississippi, Alabama, and Georgia, ensuring that field workers received supplies and transportation.",
      "Organized the Sojourner Truth Motor Fleet, providing vehicles for civil rights workers traveling throughout the South.",
      "Became SNCC’s executive secretary in 1966, overseeing the organization’s national office and its support for field organizing."
    ],
    "legacy": [
      "Organized with the Committee on Appeal for Human Rights (COAHR), the Atlanta Student Movement’s coordinating organization, while attending Spelman. Represented COAHR on SNCC’s Coordinating Committee in 1961 and Executive Committee in 1962.",
      "Worked as a teaching assistant at Spelman in 1961 and as a swimming instructor at Morehouse’s summer camp in 1960.",
      "Continued her studies alongside her organizing work and completed her physical education degree in 1965."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "SNCC Digital Gateway: Ruby Doris Smith Robinson’s organizing and leadership",
        "url": "https://snccdigital.org/people/ruby-doris-smith-robinson/"
      },
      {
        "title": "SNCC: Original Atlanta office staff credentials, circa 1964",
        "url": "https://snccdigital.org/wp-content/uploads/digitalcollections/64_sncc_staff-jobs.pdf"
      },
      {
        "title": "Stanford King Institute: Ruby Doris Smith correspondence and education",
        "url": "https://kinginstitute.stanford.edu/king-papers/documents/ruby-doris-smith"
      }
    ],
    "showSources": true
  },
  {
    "id": "Ludie-Clay-Andrews",
    "name": "Ludie Clay Andrews",
    "image": {
      "url": "images/people/Ludie Clay Andrews.jpg",
      "alt": "Portrait of Ludie Clay Andrews",
      "sourceUrl": "https://www.southviewpreservation.com/historyintheneighborhood"
    },
    "years": "Died January 1969",
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Completed Spelman’s nurse-training course in 1906. Later led campus infirmaries serving Morehouse, Spelman, and Atlanta University."
      }
    ],
    "legacy": [
      "Graduated from Spelman’s MacVicar Hospital nurse-training program in 1906.",
      "Served as superintendent of the Morehouse College Infirmary from 1922 to 1928, then led the joint Morehouse-Spelman-Atlanta University Infirmary until 1948.",
      "Taught health education in the Spelman-Morehouse summer school and continued caring for students throughout her later nursing career."
    ],
    "bio": [
      "Began her nursing leadership at Lula Grove Hospital and Training School for Colored Nurses, where she supervised patient care and taught student nurses.",
      "Organized Grady’s Municipal Training School for Colored Nurses in 1914. The school received its charter in 1917 and opened professional nursing education to Black women in Atlanta.",
      "Challenged the exclusion of Black nurses from Georgia’s licensing system, pursuing a lengthy legal campaign for their right to take the state examination and receive registration.",
      "Worked in public health through the Neighborhood Union and Atlanta Tuberculosis Association, and served as an Atlanta Urban League trustee.",
      "Received the Mary Mahoney Award in 1943 for her contributions to nursing and opportunities for Black nurses."
    ],
    "sources": [
      {
        "title": "Georgia Women of Achievement: Ludie Clay Andrews’s nursing and campus service",
        "url": "https://www.georgiawomen.org/ludie-clay-andrews"
      },
      {
        "title": "Georgia State University Library: Grady nursing-school timeline and licensing campaign",
        "url": "https://exhibits.library.gsu.edu/grady-exhibit/timeline-of-major-events/"
      },
      {
        "title": "American National Biography: Ludie Andrews’s training and early nursing leadership",
        "url": "https://academic.oup.com/american-national-biography/reference/63042/reference-article-abstract/570335526"
      },
      {
        "title": "Spelman College Archives: Albert Manley papers, correspondence with nurse Ludie Andrews",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/archives/finding-aids/albert-e-manley-presidential-papers.pdf"
      }
    ],
    "burialLocation": "",
    "showSources": true
  },
  {
    "id": "samuel-archer",
    "name": "Samuel Archer",
    "years": "December 23, 1870 - January 15, 1941",
    "image": {
      "url": "images/people/Samuel Archer.jpg",
      "alt": "Portrait of Samuel Archer",
      "sourceUrl": "https://morehouseathletics.com/honors/den-of-honor/dr-samuel-h-archer/13"
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Served as Morehouse College’s fifth president from 1931 to 1937, following years as a teacher, coach, and dean."
      }
    ],
    "bio": [
      "Graduated from Colgate University in 1902, where he was among its early Black football players.",
      "Devoted his career to teaching and college leadership. Former students and colleagues remembered his combination of demanding scholarship, humor, and close attention to young men’s development."
    ],
    "legacy": [
      "Joined Morehouse’s mathematics faculty in 1905 and also coached its football team. Served as acting president while John Hope was away during World War I.",
      "Served as dean of the college from 1920 to 1931 and also directed its summer school. Worked with John Hope to build a faculty that included Benjamin E. Mays and sociologist E. Franklin Frazier.",
      "Mentored Howard Thurman during his Morehouse years and continued advising him after graduation as Thurman developed his career in ministry and higher education.",
      "Became Morehouse’s fifth president in 1931 and led the college during the Great Depression.",
      "Established maroon and white as the college’s colors, drawing on those of his alma mater, Colgate University. Morehouse named Archer Hall in recognition of his service."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Morehouse Athletics: Samuel H. Archer, educator and president",
        "url": "https://morehouseathletics.com/honors/den-of-honor/dr-samuel-h-archer/13"
      },
      {
        "title": "Atlanta University Center: Morehouse College Office of the Presidents records",
        "url": "https://findingaids.auctr.edu/repositories/2/resources/202"
      },
      {
        "title": "Colgate University: Samuel Howard Archer’s education and legacy",
        "url": "https://www.colgate.edu/news/stories/glimpse-colgate-history"
      },
      {
        "title": "Howard Thurman Papers Project: Letter to Samuel Archer, April 14, 1936",
        "url": "https://www.thurmanpapersproject.org/node/558"
      },
      {
        "title": "Howard Thurman Papers Project: Morehouse faculty, Dean Archer, and Thurman’s education",
        "url": "https://www.thurmanpapersproject.org/index.php/biography/biographical-vol1"
      },
      {
        "title": "Mark S. Giles: Howard Thurman — The Making of a Morehouse Man (2006)",
        "url": "https://files.eric.ed.gov/fulltext/EJ751763.pdf"
      }
    ],
    "showSources": true
  },
  {
    "id": "horace-mann-bond",
    "name": "Horace Mann Bond",
    "years": "November 8, 1904 - December 21, 1972",
    "image": {
      "url": "images/people/Horace Mann Bond.jpg",
      "alt": "Portrait of Horace Mann Bond",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Horace_Mann_Bond.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Joined Atlanta University in 1957 and served as a dean and researcher."
      }
    ],
    "bio": [
      "As president of Fort Valley State College from 1939 to 1945, improved its curriculum and finances and oversaw its transition to a four-year, degree-granting institution.",
      "Led Lincoln University from 1945 to 1957 as its first Black president.",
      "Challenged claims of racial inferiority based on intelligence tests, examining the effects of unequal schooling and social conditions on test results.",
      "Conducted historical research with John Hope Franklin and C. Vann Woodward for the NAACP Legal Defense and Educational Fund in 1953. Their work contributed to the arguments in Brown v. Board of Education.",
      "Helped establish the Africa-America Institute in 1953 to support educational exchange and opportunities for African students.",
      "Wrote The Education of the Negro in the American Social Order and Negro Education in Alabama, examining the political and economic conditions shaping Black education."
    ],
    "legacy": [
      "Served as dean of Atlanta University’s School of Education from 1957 to 1966, teaching and directing the school’s academic work.",
      "Conducted research on Black recipients of doctoral degrees while at Atlanta University.",
      "Became director of the university’s Bureau of Educational and Social Research in 1966 and continued educational research until retiring in 1971.",
      "Spoke as an Atlanta University education leader before the U.S. Commission on Civil Rights in 1962, challenging the use of test scores to justify racial exclusion in school desegregation plans."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "New Georgia Encyclopedia — Horace Mann Bond",
        "url": "https://www.georgiaencyclopedia.org/articles/education/horace-mann-bond-1904-1972/"
      },
      {
        "title": "Horace Mann Bond — testimony on planning school desegregation, U.S. Commission on Civil Rights (1962), pp. 73–79",
        "url": "https://www.usccr.gov/files/historical/1962/62-002.pdf#page=81"
      },
      {
        "title": "UMass Amherst Libraries — Horace Mann Bond papers and career history",
        "url": "https://scua.library.umass.edu/bond-horace-mann-1904-1972/"
      }
    ],
    "showSources": true
  },
  {
    "id": "william-holmes-borders",
    "name": "William Holmes Borders",
    "years": "February 24, 1905 - November 23, 1993",
    "image": {
      "url": "images/people/William Holmes Borders.jpg",
      "alt": "Portrait of William Holmes Borders",
      "sourceUrl": "https://www.georgiaencyclopedia.org/articles/arts-culture/william-holmes-borders-1905-1993/",
      "credit": "Courtesy of Wheat Street Baptist Church; Estate of the Reverend William Holmes Borders Sr.",
      "attributionRequired": true,
      "fit": "contain"
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Graduated from Morehouse College in 1929. Returned as an instructor in 1936."
      }
    ],
    "bio": [
      "Led Wheat Street Baptist Church from 1937 for more than five decades, developing services that included an employment agency, a credit union, childcare, and a medical clinic.",
      "Helped create affordable housing through Wheat Street’s church-sponsored housing program, extending the congregation’s work beyond worship into neighborhood needs.",
      "Organized voter registration and campaigned for Black police officers in Atlanta. In 1957, he and five fellow ministers challenged segregated bus seating through the Love, Law, and Liberation Movement. Their test case helped secure a 1959 ruling against the segregation law.",
      "Chaired the Student-Adult Liaison Committee that negotiated the desegregation of Atlanta lunch counters in 1961.",
      "Broadcast sermons to Black and white listeners and published Seven Minutes at the “Mike” in the Deep South. His preaching addressed religious life alongside racial inequality and public affairs."
    ],
    "legacy": [
      "Returned to Morehouse in 1936 as an instructor after graduate study at Garrett Theological Seminary and Northwestern University. Became pastor of Wheat Street Baptist Church the following year."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "New Georgia Encyclopedia: William Holmes Borders’s ministry and community institutions",
        "url": "https://www.georgiaencyclopedia.org/articles/arts-culture/william-holmes-borders-1905-1993/"
      },
      {
        "title": "Stanford King Institute: William Holmes Borders Sr.",
        "url": "https://kinginstitute.stanford.edu/borders-william-holmes-sr"
      },
      {
        "title": "William Holmes Borders: Letter to Martin Luther King Jr., April 6, 1957",
        "url": "https://kinginstitute.stanford.edu/king-papers/documents/william-holmes-borders"
      }
    ],
    "showSources": true
  },
  {
    "id": "ariel-serena-hedges-bowen",
    "name": "Ariel Serena Hedges Bowen",
    "years": "March 3, 1863 - July 7, 1904",
    "image": {
      "url": "images/people/Ariel Serena Hedges Bowen.jpg",
      "alt": "Portrait of Ariel Serena Hedges Bowen",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ariel_Serena_Hedges_Bowen,_ca._1880s.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Became a professor of music at Clark University in 1895."
      }
    ],
    "bio": [
      "Taught history and English at Tuskegee Institute under Booker T. Washington before moving to Atlanta.",
      "Served as state president of Georgia’s Woman’s Christian Temperance Union No. 2, leading the organization’s work among Black women.",
      "Spoke at Chautauqua in 1899 about the activities of Georgia’s WCTU No. 2.",
      "Wrote “Music in the Home” and “The Ethics of Reform,” addressing music education and social reform.",
      "Contributed to the 1902 collection Twentieth Century Negro Literature, which brought together Black writers discussing education, civil rights, and public life."
    ],
    "legacy": [
      "Became professor of music at Clark University in 1895.",
      "Worked as a vocalist, pianist, and pipe organist alongside her teaching."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Twentieth Century Negro Literature (1902) — Ariel S. Bowen biography and essay",
        "url": "https://www.gutenberg.org/cache/epub/18772/pg18772-images.html#Page_264"
      },
      {
        "title": "Atlanta Housing — Ariel Serena Hedges Bowen’s educational and civic work",
        "url": "https://www.atlantahousing.org/atlanta-housing-introduces-ariel-place-at-bowen-bringing-fuller-bowen-family-legacy-forward/"
      },
      {
        "title": "The Chautauquan Daily — Black temperance activists at Chautauqua (August 17, 2022)",
        "url": "https://chqdaily.com/wp-content/uploads/2023/06/081722_Daily.pdf"
      }
    ],
    "showSources": true
  },
  {
    "id": "alice-dugged-cary",
    "name": "Alice Dugged Cary",
    "years": "September 1859 - September 25, 1941",
    "image": {
      "url": "images/people/Alice Dugged Cary.jpg",
      "alt": "Portrait of Alice Dugged Cary",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Aliceduggedcary.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "morris",
        "label": "Became the second principal of Morris Brown College in 1886."
      }
    ],
    "bio": [
      "Graduated from Wilberforce University in 1881 and worked as a teacher and assistant principal before moving to Atlanta.",
      "Became the first principal of Atlanta’s Mitchell Street School in 1887, adding public-school leadership to her college work.",
      "Led the Auburn Branch of the Carnegie Library when it opened in 1921, the first Atlanta public-library branch serving Black residents under segregation.",
      "As president of the Georgia Federation of Colored Women’s Clubs, coordinated its work with the Woman’s Committee of the Council of National Defense during World War I. Led an Atlanta canteen committee that served Black soldiers and opened a Red Cross workroom on Auburn Avenue."
    ],
    "legacy": [
      "Served as Morris Brown’s second principal during the college’s early years.",
      "Was identified as chair of science at Morris Brown in the proceedings of the 1902 National Baptist Convention.",
      "Helped establish Zeta Phi Beta’s Beta Chapter at Morris Brown in 1921, the sorority’s second chapter."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Fulton County Library System: History of the Auburn Avenue Research Library",
        "url": "https://www.fulcolibrary.org/aarl/aarl-history/"
      },
      {
        "title": "Georgia Public Library Service: Auburn Branch staff and Alice Dugged Cary",
        "url": "https://georgialibraries.omeka.net/s/AARL/page/staff"
      },
      {
        "title": "National Baptist Convention: 1902 proceedings identifying Cary’s science chairmanship",
        "url": "https://s3.amazonaws.com/media2.sbhla.org/aaa/nbc/NBC_1902.pdf"
      },
      {
        "title": "Zeta Phi Beta: Alice Dugged Cary’s institutional leadership",
        "url": "https://zphib1920.org/membership/member-highlight-honorary-members/"
      },
      {
        "title": "Alice Dugged Cary: Report on Georgia Black women’s wartime service (1919), pp. 85–86",
        "url": "https://dlg.usg.edu/record/dlg_ggpd_s-ga-bd475-pc6-br1-bw6-b1919"
      }
    ],
    "showSources": true
  },
  {
    "id": "mattiwilda-dobbs",
    "name": "Mattiwilda Dobbs",
    "years": "July 11, 1925 - December 8, 2015",
    "image": {
      "url": "images/people/Mattiwilda Dobbs.jpg",
      "alt": "Portrait of Mattiwilda Dobbs",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mattiwilda_Dobbs_1957.JPG",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1946. Returned as artist-in-residence in 1974–1975."
      }
    ],
    "bio": [
      "Won the International Music Competition in Geneva in 1951 and built an international operatic career. In 1953, became the first Black singer to perform at La Scala in Milan.",
      "Made her Metropolitan Opera debut as Gilda in Rigoletto in 1956 and became the first Black woman offered a long-term contract by the company.",
      "Refused to perform for segregated audiences. In 1962, sang at Atlanta Municipal Auditorium after its desegregation, bringing her performances to an integrated audience in her hometown.",
      "Combined performance with the education of younger singers through university teaching, master classes, and recitals. She also served on the Metropolitan Opera’s board and a National Endowment for the Arts recital panel."
    ],
    "legacy": [
      "Began formal voice training at Spelman with Naomi Maise and Willis Laurence James, and sang in the Spelman College Glee Club. Graduated as valedictorian in 1946.",
      "Returned as artist-in-residence for the 1974–1975 academic year, giving recitals and teaching master classes.",
      "Also taught at the University of Texas and Howard University, where she became a professor of voice."
    ],
    "burialLocation": "https://maps.app.goo.gl/iXNY1aV1Cg4YKZLr7",
    "sources": [
      {
        "title": "New Georgia Encyclopedia: Mattiwilda Dobbs’s career and Spelman residency",
        "url": "https://www.georgiaencyclopedia.org/articles/arts-culture/mattiwilda-dobbs-1925-2015/"
      },
      {
        "title": "The HistoryMakers: Mattiwilda Dobbs Janzon oral-history biography",
        "url": "https://www.thehistorymakers.org/biography/mattiwilda-dobbs-janzon-40"
      },
      {
        "title": "Spelman College Glee Club: The Dobbs Girls, June 2017 newsletter",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/academics/music/2017-06-newsletter.pdf"
      },
      {
        "title": "University of South Florida Contemporary Art Museum: Mattiwilda Dobbs’s Spelman voice training and 1946 rehearsal photograph",
        "url": "https://ira.usf.edu/cam/exhibitions/2021_01_Still_Here/Still-Here-Study-Guide.pdf"
      }
    ],
    "showSources": true
  },
  {
    "id": "grace-towns-hamilton",
    "name": "Grace Towns Hamilton",
    "years": "February 10, 1907 - June 17, 1992",
    "image": {
      "url": "images/people/Grace Town Hamilton.jpg",
      "alt": "Portrait of Grace Towns Hamilton seated between the American and Georgia flags",
      "credit": "Grace Towns Hamilton Papers. Archives Research Center, Atlanta University Center, Robert W. Woodruff Library.",
      "attributionRequired": true,
      "sourceUrl": "https://dlg.usg.edu/record/auu_gthamilton_auc-152-0054"
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Earned a bachelor's degree from Atlanta University in 1927 and later taught at Clark College."
      }
    ],
    "bio": [
      "Surveyed Black workers for the Works Progress Administration in Memphis and developed interracial programs on college campuses through the YWCA.",
      "Became executive director of the Atlanta Urban League in 1943, leading campaigns for better schooling, housing, health care, and voting rights for Black Atlantans.",
      "Helped organize Atlanta’s 1946 Black voter-registration campaign and worked to improve hospital access through the Hughes Spalding Pavilion at Grady Memorial Hospital.",
      "Elected to the Georgia legislature in 1965, becoming the first Black woman elected to the General Assembly. She worked on legislative and congressional redistricting to expand Black political representation.",
      "Helped write Atlanta’s 1973 city charter, establishing district representation that increased Black residents’ representation on the City Council.",
      "Served as an adviser to the U.S. Civil Rights Commission from 1985 to 1987."
    ],
    "legacy": [
      "Earned her undergraduate degree at Atlanta University in 1927.",
      "Returned after graduate study to teach psychology at Clark College and the Atlanta School of Social Work."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "New Georgia Encyclopedia — Grace Towns Hamilton",
        "url": "https://www.georgiaencyclopedia.org/articles/history-archaeology/grace-towns-hamilton-1907-1992"
      },
      {
        "title": "Georgia Women of Achievement — Grace Towns Hamilton’s public service",
        "url": "https://www.georgiawomen.org/grace-towns-hamilton"
      },
      {
        "title": "University of Mississippi — Grace Hamilton oral-history interview (1984)",
        "url": "https://egrove.olemiss.edu/swl/37/"
      }
    ],
    "showSources": true
  },
  {
    "id": "freddye-scarborough-henderson",
    "name": "Freddye Scarborough Henderson",
    "years": "February 18, 1917 - January 19, 2007",
    "image": {
      "url": "images/people/Freddye Scarborough Henderson.png",
      "alt": "Portrait of Freddye Scarborough Henderson",
      "sourceUrl": "https://www.southviewpreservation.com/freddyehenderson"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Taught at Spelman College for 11 years at the invitation of president Florence Read."
      }
    ],
    "bio": [
      "Helped establish the National Association of Fashion and Accessory Designers and served as its first president, promoting the work of Black designers to the wider fashion industry.",
      "Led a delegation of designers to Europe, where members visited major fashion houses. Her fashion journalism included the “Fashion Trends” series for the Associated Negro Press.",
      "Founded Henderson Travel Service with her husband Jake in Atlanta in 1955, creating a Black-owned agency that organized international travel for African American customers.",
      "Expanded tours to Africa in 1957, including travel for Ghana’s independence celebrations. The agency also arranged international tours for professional associations, churches, fraternities, and sororities."
    ],
    "legacy": [
      "Recruited by Spelman president Florence Read to teach home economics, textiles, fashion design, applied art, and personality development. Taught at the college for 11 years."
    ],
    "burialLocation": "https://maps.app.goo.gl/NPh39ChZFTz4v2aa8",
    "sources": [
      {
        "title": "Auburn Avenue Research Library: Freddye Henderson funeral program and Spelman teaching",
        "url": "https://dlg.usg.edu/record/aarl_afpc_hendersonfreddyescarborough20070124"
      },
      {
        "title": "Georgia Public Library Service: Henderson family papers and travel-service history",
        "url": "https://georgialibraries.omeka.net/s/aarl-freddye/page/hendersons"
      },
      {
        "title": "Georgia Public Library Service: Original fashion writing and professional records",
        "url": "https://georgialibraries.omeka.net/s/aarl-freddye/item?tag=Freddye+Henderson"
      }
    ],
    "researchNote": "Exact Spelman service dates remain unverified; bounded date is explicitly labeled.",
    "showSources": true
  },
  {
    "id": "adrienne-mcneil-herndon",
    "name": "Adrienne McNeil Herndon",
    "years": "July 22, 1869 - April 6, 1910",
    "image": {
      "url": "images/people/Adrienne McNeil Herndon.jpg",
      "alt": "Portrait of Adrienne McNeil Herndon",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Adrienne_Herndon_portrait.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Graduated from Atlanta University's Normal Department in 1890 and later taught at the university."
      }
    ],
    "bio": [
      "Performed on stages in Boston and New York while pursuing a professional acting career.",
      "Faced discriminatory casting that restricted the roles available to Black actresses.",
      "Studied at the Boston School of Expression and performed a one-woman presentation of Antony and Cleopatra in Boston in 1904.",
      "Took a leading role in planning the Herndon family home near Atlanta University, including spaces intended for university gatherings and theatrical performances."
    ],
    "legacy": [
      "Graduated from Atlanta University’s Normal Department in 1890 and joined its faculty in 1895.",
      "Introduced Shakespeare into the university’s curriculum and taught elocution.",
      "Directed annual Shakespeare productions during commencement season, involving students in public performances.",
      "Trained student actors in concentration, voice control, movement, and character interpretation, describing her methods in “Shakespeare at Atlanta University” in 1906.",
      "Directed The Merchant of Venice in 1905 and The Taming of the Shrew in 1906. The productions raised money for a proposed university auditorium, chapel, and gymnasium."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "National Park Service — Herndon Home landmark nomination",
        "url": "https://npgallery.nps.gov/pdfhost/docs/NHLS/Text/00000261.pdf"
      },
      {
        "title": "Adrienne E. Herndon — “Shakespeare at Atlanta University,” The Voice of the Negro (July 1906), pp. 482–486",
        "url": "https://archive.org/details/sim_voice_1906-07_3_7"
      }
    ],
    "showSources": true
  },
  {
    "id": "alonzo-herndon",
    "name": "Alonzo Herndon",
    "years": "June 26, 1858 - July 21, 1927",
    "image": {
      "url": "images/people/Alonzo Herndon.jpg",
      "alt": "Portrait of Alonzo Herndon",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Alonzo_herndon.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "morris",
        "label": "Morris Brown College’s Alonzo Herndon Stadium opened in 1948 in his honor."
      }
    ],
    "bio": [
      "Built a successful Atlanta barbering business and invested its earnings in residential and commercial real estate.",
      "Founded the enterprise that became Atlanta Life Insurance Company in 1905. The company provided insurance to Black customers and grew into one of the country’s leading Black-owned insurers.",
      "Supported local educational, religious, and charitable institutions and participated in organizations advancing Black economic and civil rights."
    ],
    "legacy": [
      "Morris Brown named Alonzo Herndon Stadium in his honor. The stadium opened in 1948 and served as the college’s football venue.",
      "His son Norris Herndon and Atlanta Life supported construction of the stadium and other improvements at Morris Brown."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "New Georgia Encyclopedia: Alonzo Herndon’s businesses and public service",
        "url": "https://www.georgiaencyclopedia.org/articles/business-economy/alonzo-herndon-1858-1927/"
      },
      {
        "title": "Library of Congress: Alonzo Herndon and Atlanta Life",
        "url": "https://guides.loc.gov/this-month-in-business-history/june/alonzo-herndon"
      },
      {
        "title": "PBS: From Slavery to Legacy — Alonzo Herndon and the family’s Morris Brown support",
        "url": "https://www.pbs.org/video/from-slavery-to-legacy-alonzo-herndon-jedhv7/"
      },
      {
        "title": "The Atlanta Journal-Constitution: Herndon Stadium’s history",
        "url": "https://www.ajc.com/news/atlanta-black-history/the-past-was-bright-but-the-future-looks-bleak-for-herndon-stadium/O52PYZR4UBCKJGUQUIAPUVWQ3U/"
      }
    ],
    "showSources": true
  },
  {
    "id": "jesse-b-blayton",
    "name": "Jesse B. Blayton",
    "years": "December 6, 1897 - September 7, 1977",
    "image": {
      "url": "images/people/Jesse B. Blayton.png",
      "alt": "Portrait of Jesse B. Blayton",
      "credit": "Atlanta University Photographs. Archives Research Center, Atlanta University Center, Robert W. Woodruff Library.",
      "attributionRequired": true,
      "sourceUrl": "https://dlg.usg.edu/record/auu_auc-001_auc-001-1114"
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Taught accounting at Morehouse College from 1925 to 1930."
      },
      {
        "institutionId": "clark",
        "label": "Began teaching accounting at Atlanta University in 1930."
      }
    ],
    "bio": [
      "Became Georgia’s first Black certified public accountant in 1928 and practiced accounting while teaching.",
      "Served as a bank president in Atlanta.",
      "Purchased WERD in 1949, establishing the first radio station in the United States owned and operated by an African American.",
      "Employed Black broadcasters and developed programming that included rhythm and blues, local news, and coverage of Black community life.",
      "Provided airtime for Martin Luther King Jr. and other Southern Christian Leadership Conference leaders during the civil-rights movement. WERD and the SCLC occupied the same Auburn Avenue building."
    ],
    "legacy": [
      "Taught accounting at Morehouse College from 1925 to 1930 before joining Atlanta University’s faculty in 1930.",
      "Supervised 18 advanced accounting students keeping books for Black-owned Atlanta businesses in 1931. Their fieldwork included shops, a printing company, a hospital, and a church.",
      "Encouraged Black students to enter accounting at a time when white-owned firms largely refused to employ Black accountants.",
      "His radio station, WERD, featured Atlanta University professors discussing news affecting Black Atlantans."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "John Hope — “Trained Men for Negro Business,” Opportunity (November 1931), pp. 343–345",
        "url": "https://www.sbana.org/wp-content/uploads/2019/02/Opportunity-Journal-of-Negro-Life-Volume-9_November1931-Trained-Men-for-Negro-Business-by-John-Hope.pdf#page=7"
      },
      {
        "title": "New Georgia Encyclopedia — WERD",
        "url": "https://www.georgiaencyclopedia.org/articles/arts-culture/werd/"
      },
      {
        "title": "Gale / Encyclopedia.com — Jesse B. Blayton Sr.",
        "url": "https://www.encyclopedia.com/education/news-wires-white-papers-and-books/blayton-jesse-b-sr"
      }
    ],
    "showSources": true
  },
  {
    "id": "virginia-lacy-jones",
    "name": "Virginia Lacy Jones",
    "years": "June 25, 1912 - December 3, 1984",
    "image": {
      "url": "images/people/Virginia Lacy Jones.jpg",
      "alt": "Portrait of Virginia Lacy Jones",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Virginia_Lacy_Jones_(13270287595).jpg",
      "license": "No restrictions",
      "licenseUrl": "https://www.flickr.com/commons/usage/",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Became dean of Atlanta University's School of Library Service in 1945 and served until 1981."
      }
    ],
    "bio": [
      "Taught library science at Prairie View and worked at Louisville Municipal College before joining Atlanta University.",
      "Earned a doctorate in library service at the University of Chicago in 1945, becoming the second African American to earn a doctorate in the field.",
      "Recruited future librarian Satia Marshall Orange through a fellowship offer. Orange later directed the American Library Association’s Office for Literacy and Outreach Services.",
      "Wrote about unequal funding, book collections, and staffing in segregated public libraries.",
      "Served on the editorial board of Phylon and in leadership roles in national library organizations, including the American Library Association’s executive board."
    ],
    "legacy": [
      "Joined Atlanta University in 1939 as catalog librarian at Trevor Arnett Library.",
      "Surveyed other library schools’ administration and curricula while helping plan Atlanta University’s School of Library Service, then joined its faculty when it opened in 1941.",
      "Served as dean from 1945 to 1981. In 1967, opened the school’s conference on improving children’s access to books about Black history and achievements, urging better representation in school and library collections.",
      "Worked with the school’s faculty to integrate Southern public libraries and regional professional organizations.",
      "Became the first director of the Atlanta University Center’s Robert W. Woodruff Library in 1981."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Atlanta University Center / Digital Library of Georgia: Virginia Lacy Jones’s papers and library leadership",
        "url": "https://dlg.usg.edu/record/auu_auc-115"
      },
      {
        "title": "Virginia Lacy Jones — opening address, Atlanta University conference on Black representation in children’s books (1967), pp. 1–3",
        "url": "https://files.eric.ed.gov/fulltext/ED032087.pdf#page=14"
      },
      {
        "title": "American Library Association — Jones’s recruitment of Satia Marshall Orange",
        "url": "https://www.ala.org/news/2022/04/new-ala-endowment-honoring-satia-marshall-orange-benefit-spectrum-scholarship-program"
      }
    ],
    "showSources": true
  },
  {
    "id": "alberta-williams-king",
    "name": "Alberta Williams King",
    "years": "September 13, 1904 - June 30, 1974",
    "image": {
      "url": "images/people/Alberta Williams King.png",
      "alt": "Portrait of Alberta Williams King",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Martin_Luther_King,_Henry_Elkins,_and_Alberta_Williams_King_at_Ebenezer,_1962_(cropped).png",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "morris",
        "label": "Earned a bachelor’s degree from Morris Brown College in 1938."
      }
    ],
    "bio": [
      "Taught briefly before Atlanta’s restrictions on married women teachers ended her classroom career.",
      "Founded Ebenezer Baptist Church’s choir and served as its organist and choir director for decades. She helped organize the church’s musical and women’s activities.",
      "Participated in the NAACP, YWCA, and Women’s International League for Peace and Freedom.",
      "Worked with Coretta Scott King and Christine King Farris to restore Martin Luther King Jr.’s birth home as a place the public could visit.",
      "Was killed while playing the organ during Sunday worship at Ebenezer in June 1974."
    ],
    "legacy": [
      "Continued her education at Morris Brown while raising her family and serving Ebenezer Baptist Church, completing her bachelor’s degree in 1938.",
      "Also studied at Spelman Seminary and earned a teaching certificate from Hampton Normal and Industrial Institute before her Morris Brown degree."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Stanford King Institute: Alberta Williams King’s education and church work",
        "url": "https://kinginstitute.stanford.edu/king-alberta-williams"
      },
      {
        "title": "Morris Brown College: 2024 President’s Report, alumni facts",
        "url": "https://morrisbrown.edu/wp-content/uploads/2024/10/MBC-Presidents-Report_2024_FINAL_v5.pdf"
      },
      {
        "title": "National Park Service: Restoration of the King birth home",
        "url": "https://home.nps.gov/malu/a-loving-home-of-influence.htm"
      },
      {
        "title": "National Park Service: Collier Heights historic district documentation",
        "url": "https://npgallery.nps.gov/GetAsset/c5d4cda7-9db5-452f-8e99-d5f11932fd21/"
      }
    ],
    "showSources": true
  },
  {
    "id": "alfred-daniel-king",
    "name": "Alfred Daniel King",
    "years": "July 30, 1930 - July 21, 1969",
    "image": {
      "url": "images/people/Alfred Daniel King.jpg",
      "alt": "Portrait of Alfred Daniel King",
      "sourceUrl": "https://en.wikipedia.org/wiki/File:AD_King.jpg"
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Graduated from Morehouse College in 1959. Became a pastor and organizer in the civil rights movement."
      }
    ],
    "bio": [
      "Joined the October 1960 Atlanta lunch-counter sit-in in which he, Martin Luther King Jr., and dozens of other demonstrators were arrested.",
      "Helped lead the Birmingham campaign while pastoring First Street Baptist Church in Ensley. After his home was bombed in May 1963, he continued organizing and urged demonstrators to maintain nonviolence.",
      "Became pastor of Zion Baptist Church in Louisville in 1965 and campaigned for open housing. The city adopted an open-housing ordinance in 1968.",
      "Supported the Southern Christian Leadership Conference and the Poor People’s Campaign, addressing racial discrimination and economic inequality.",
      "Returned to Atlanta after his brother’s assassination and became co-pastor of Ebenezer Baptist Church in September 1968."
    ],
    "legacy": [
      "Earned his bachelor’s degree at Morehouse in 1959 before becoming pastor of Mount Vernon First Baptist Church in Newnan, Georgia."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Stanford King Institute: Alfred Daniel Williams King’s ministry and organizing",
        "url": "https://kinginstitute.stanford.edu/king-alfred-daniel-williams"
      },
      {
        "title": "A. D. King Foundation: Nonviolent organizing and the open-housing campaign",
        "url": "https://www.adkingfoundation.com/about"
      },
      {
        "title": "Alfred Daniel King: Letter about his Ensley pastorate, April 2, 1962",
        "url": "https://kinginstitute.stanford.edu/king-papers/documents/alfred-daniel-king-1"
      }
    ],
    "showSources": true
  },
  {
    "id": "martin-luther-king-sr",
    "name": "Martin Luther King Sr.",
    "years": "December 19, 1897 – November 11, 1984",
    "image": {
      "url": "images/people/Martin Luther King Sr..jpg",
      "alt": "Portrait of Martin Luther King Sr.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Martin_Luther_King_Sr,_c1977-81.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Earned his theology degree from Morehouse College in 1930. Later served on the boards of Morehouse and Atlanta University."
      }
    ],
    "bio": [
      "Led Ebenezer Baptist Church from 1931 until his retirement in 1975, expanding its role as a religious and civic institution.",
      "Worked through the Atlanta Civic and Political League and the NAACP to register Black voters and challenge discrimination. In 1939, called for a mass voter-registration effort and a march to City Hall.",
      "Chaired the Committee on the Equalization of Teachers’ Salaries, which challenged discriminatory pay for Black teachers with legal assistance from the NAACP.",
      "Supported the civil rights work of his sons and continued public advocacy after Martin Luther King Jr.’s assassination. His ministry connected church leadership with campaigns for voting rights, education, and equal treatment."
    ],
    "legacy": [
      "Entered Morehouse in 1926 and completed his theology degree in 1930.",
      "Elected to Morehouse’s board of trustees on April 24, 1947. Also served on Atlanta University’s board."
    ],
    "burialLocation": "https://www.google.com/maps/place/Rev+Martin+Luther+King+Sr.+Grave/@33.7014766,-84.3745437,18z/data=!4m6!3m5!1s0x88f503cee438dc73:0xba1440e6e2739918!8m2!3d33.7014766!4d-84.3737141!16s%2Fg%2F11l2969tss?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D",
    "sources": [
      {
        "title": "Stanford King Institute: Martin Luther King Sr.’s education and civic leadership",
        "url": "https://kinginstitute.stanford.edu/king-martin-luther-sr"
      },
      {
        "title": "National Park Service: Ebenezer Baptist Church history",
        "url": "https://www.nps.gov/malu/planyourvisit/upload/EBC_History.pdf"
      },
      {
        "title": "Morehouse College: The King family at Morehouse",
        "url": "https://morehouse.edu/academics/centers-and-institutes/martin-luther-king-jr-collection/king-at-morehouse"
      },
      {
        "title": "Stanford King Institute: Martin Luther King Sr. elected a Morehouse trustee, April 24, 1947",
        "url": "https://kinginstitute.stanford.edu/king-sr-elected-trustee-morehouse"
      }
    ],
    "showSources": true
  },
  {
    "id": "duke-pearson",
    "name": "Duke Pearson",
    "years": "August 17, 1932 - August 4, 1980",
    "image": {
      "url": "images/people/Duke Pearson.jpg",
      "alt": "Portrait of Duke Pearson",
      "sourceUrl": "https://www.bluenote.com/artist/duke-pearson/",
      "credit": "Photograph by Francis Wolff / Blue Note Records."
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Attended Clark College and returned as a teacher in 1971."
      }
    ],
    "bio": [
      "Performed with Donald Byrd and the Art Farmer–Benny Golson Jazztet and worked as an accompanist and musical director for Nancy Wilson.",
      "Recorded as a bandleader for Blue Note and wrote compositions including “Jeannine,” “Idle Moments,” “Sweet Honey Bee,” and “Cristo Redentor.”",
      "Arranged Donald Byrd’s A New Perspective in 1963, combining a jazz ensemble with a choir.",
      "Became a Blue Note producer and talent scout in 1963. His arranging work included recordings by Grant Green, Stanley Turrentine, Lee Morgan, and Blue Mitchell.",
      "Led his own big band in the late 1960s and accompanied Carmen McRae and Joe Williams during the 1970s."
    ],
    "legacy": [
      "Attended Clark College before his professional recording career.",
      "Returned to Clark as a teacher in 1971 after working as a pianist, composer, arranger, and producer at Blue Note Records."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Blue Note Records — Duke Pearson artist biography",
        "url": "https://www.bluenote.com/artist/duke-pearson/"
      },
      {
        "title": "Blue Note Records — The Man in the Shadows: Duke Pearson, Arranger",
        "url": "https://www.bluenote.com/spotlight/the-man-in-the-shadows-duke-pearson-arranger/"
      },
      {
        "title": "Jazz Lines Foundation — Duke Pearson biography and score notes",
        "url": "https://www.ejazzlines.com/mc_files/2/jlp7334.pdf"
      }
    ],
    "showSources": true
  },
  {
    "id": "donald-reeves",
    "name": "Donald Reeves",
    "years": "July 31, 1911 - January 3, 1973",
    "image": {
      "url": "images/people/Donald Soup Reeves.jpg",
      "alt": "Portrait of Donald Reeves",
      "sourceUrl": "https://en.wikipedia.org/wiki/File:Donald_Soup_Reeves.jpg"
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Played baseball, basketball, and football at Clark before entering professional baseball with the Atlanta Black Crackers in 1937."
      }
    ],
    "bio": [
      "Entered professional baseball with the Atlanta Black Crackers in 1937.",
      "Played right field on Atlanta’s 1938 team, which won the second half of the Negro American League season. Teammate Gabby Kemp later recalled his contributions as a hitter.",
      "Played at Ponce de Leon Park with the Black Crackers during segregation. On the road, the team faced exclusion from ballparks, dressing rooms, restaurants, and lodging.",
      "Continued his career with the Indianapolis ABCs in 1939 and the Chicago American Giants in 1940 and 1941.",
      "Later worked as a teacher in Atlanta’s school system."
    ],
    "legacy": [
      "Played baseball, basketball, and football at Clark.",
      "Helped lead Clark’s basketball team to victory over Tuskegee in January 1934.",
      "Was inducted into Clark Atlanta University’s Athletics Hall of Fame in 1997."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Washington Tribune — Clark’s basketball victory over Tuskegee (January 25, 1934)",
        "url": "https://dangerouspress.org/papers/washington-tribune/1934-01-25"
      },
      {
        "title": "Atlanta History Center — The Black Crackers: Atlanta’s Negro League Baseball Legacy",
        "url": "https://www.atlantahistorycenter.com/blog/the-black-crackers-atlantas-negro-league-baseball-legacy/"
      },
      {
        "title": "Leslie Heaphy, Society for American Baseball Research — The Atlanta Black Crackers",
        "url": "https://sabr.org/journal/article/the-atlanta-black-crackers/"
      }
    ],
    "showSources": true
  },
  {
    "id": "henry-mcneal-turner",
    "name": "Henry McNeal Turner",
    "years": "February 1, 1834 - May 8, 1915",
    "image": {
      "url": "images/people/Henry McNeal Turner.jpg",
      "alt": "Portrait of Henry McNeal Turner",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Henry_McNeil_Turner.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "morris",
        "label": "Turner Theological Seminary, then part of Morris Brown College, was named in his honor in 1900."
      }
    ],
    "bio": [
      "Helped recruit the First Regiment of U.S. Colored Troops during the Civil War and served as its chaplain.",
      "Organized AME congregations across Georgia after emancipation, recruiting members and establishing churches in communities that lacked trained ministers and meeting places.",
      "Helped organize Georgia’s Republican Party, served in the state constitutional convention, and won election to the Georgia House of Representatives. In 1868, protested the legislature’s expulsion of its Black members.",
      "Became an AME bishop in 1880. Promoted the denomination’s work in Africa and Latin America and advocated African American emigration to Africa.",
      "Published The Genius and Theory of Methodist Polity, a guide to church governance, and spoke and wrote extensively against racial discrimination."
    ],
    "legacy": [
      "Morris Brown opened its Department of Theology in 1894 and named it Turner Theological Seminary in 1900, honoring his leadership in the African Methodist Episcopal Church.",
      "The department trained ministers for the AME Church. Turner Seminary remained affiliated with Morris Brown until 1957, when it joined the Interdenominational Theological Center."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Turner Theological Seminary: Institutional history",
        "url": "https://www.turnerseminary.org/ourhistory"
      },
      {
        "title": "New Georgia Encyclopedia: Henry McNeal Turner’s church and political leadership",
        "url": "https://www.georgiaencyclopedia.org/articles/arts-culture/henry-mcneal-turner-1834-1915"
      },
      {
        "title": "Morris Brown College: Catalog history, Digital Library of Georgia",
        "url": "https://dlg.usg.edu/record/auu_auc-007-catalog"
      }
    ],
    "showSources": true
  },
  {
    "id": "bazoline-estelle-usher",
    "name": "Bazoline Estelle Usher",
    "years": "December 26, 1885 - February 8, 1992",
    "image": {
      "url": "images/people/Bazoline Estelle Usher.jpg",
      "alt": "Portrait of Bazoline Estelle Usher",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Bazoline_Usher_(13269931405).jpg",
      "license": "No restrictions",
      "licenseUrl": "https://www.flickr.com/commons/usage/",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Atlanta University alumna."
      },
      {
        "institutionId": "spelman",
        "label": "Former Spelman College instructor."
      }
    ],
    "bio": [
      "Taught in Virginia before returning to Atlanta’s public schools, where she worked as a classroom teacher, assistant principal, and principal.",
      "Served as assistant principal at Booker T. Washington High School and became principal of David T. Howard Grammar School in 1929.",
      "Became supervisor of education for Black students in Atlanta in 1944, then the highest position held by a Black educator in the city’s school system.",
      "Helped establish Girl Scout troops for Black girls in Atlanta in 1943 and recruited Black women to lead the troops, organized as District V."
    ],
    "legacy": [
      "Atlanta University: attended its preparatory school, graduated from the college in 1906, and later earned a master’s degree in education.",
      "Spelman College: taught for three years after retiring from Atlanta’s public schools in 1954.",
      "University of Chicago: pursued graduate study."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Atlanta History Center: Bazoline Usher’s teaching, school leadership, and visual arts collection",
        "url": "https://album.atlantahistorycenter.com/digital/collection/p17222coll54"
      },
      {
        "title": "Georgia Historic Preservation Division — A True Woman of Distinction: Bazoline Usher",
        "url": "https://dca.georgia.gov/document/newsletters/april-2016-reflectionspdf/download"
      },
      {
        "title": "Harvard Schlesinger Library — Bazoline Usher’s education and teaching career",
        "url": "https://guides.library.harvard.edu/schlesinger_bwohp/biographies"
      }
    ],
    "showSources": true
  },
  {
    "id": "dinah-watts-pace",
    "name": "Dinah Watts Pace",
    "years": "January 9, 1853 - January 25, 1933",
    "image": {
      "url": "images/people/Dinah Watts Pace.jpg",
      "alt": "Portrait of Dinah Watts Pace",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dinah_Watts_Pace.jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "clark",
        "label": "Graduated from Atlanta University in 1883 with training in education."
      }
    ],
    "bio": [
      "Organized a Sunday school for children in Atlanta’s Summerhill neighborhood after the Civil War. It developed into Pleasant Grove, later Reed Street Baptist Church and today Paradise Missionary Baptist Church.",
      "Alongside her classroom teaching in Covington, visited families and helped care for their children. She began taking orphaned children into her own home.",
      "Founded the Covington Colored Orphans Home in 1890, later known as the Reed Home and Industrial School, providing children with housing, care, and education.",
      "Combined academic instruction with practical and vocational training. The school accepted children without limiting admission to a single religious denomination.",
      "Expanded from caring for a small group of children to operating a school with several buildings and additional teachers.",
      "Continued the work for decades. Paradise Baptist Church’s history credits her with educating about 700 children by the time of her death in 1933."
    ],
    "legacy": [
      "Graduated from Atlanta University’s Normal Department in June 1883 and began teaching in Covington that summer.",
      "Employed three fellow Atlanta University graduates or former students as teachers at the Reed Home and School.",
      "Taught Bazoline Estelle Usher and recommended her for Atlanta University’s preparatory school. Usher later graduated from the university and became supervisor of education for Black students in Atlanta’s public schools."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "G. F. Richings — Reed Orphan Home, its teaching staff and educational program (1902)",
        "url": "https://www.gutenberg.org/cache/epub/64338/pg64338-images.html#Page_239"
      },
      {
        "title": "Paradise Missionary Baptist Church — Dinah Watts Pace’s founding and educational work",
        "url": "https://paradiseatlmbc.org/our-history"
      },
      {
        "title": "Sophia Maxine Todd, Miami University — Bazoline Usher’s education and Pace’s recommendation (2023)",
        "url": "https://etd.ohiolink.edu/acprod/odb_etd/ws/send_file/send?accession=miami1682031615785713&disposition=inline"
      }
    ],
    "showSources": true
  },
  {
    "id": "samuel-woodrow-williams",
    "name": "Samuel Woodrow Williams",
    "years": "February 20, 1912 – October 10, 1970",
    "image": {
      "url": "images/people/Samuel Woodrow Williams.png",
      "alt": "Portrait of Samuel Woodrow Williams",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Samuel_Woodrow_Williams.png",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "attributionRequired": true,
      "credit": "InstantMaruchan / Wikimedia Commons"
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Graduated from Morehouse College in 1937. Returned in 1946 to chair its Department of Philosophy and Religion."
      }
    ],
    "bio": [
      "Combined his teaching with ministry at Friendship Baptist Church and leadership in Atlanta’s civil rights organizations.",
      "As an Atlanta NAACP leader, challenged segregated public transportation and supported litigation against segregated public schools.",
      "Supported the Atlanta Student Movement and encouraged student leaders to publish “An Appeal for Human Rights” in 1960.",
      "Helped establish the Atlanta Summit Leadership Council to address segregation, poverty, and transportation needs. Later served on the city’s Community Relations Commission, which brought residents’ concerns to public officials."
    ],
    "legacy": [
      "Returned to Morehouse in 1946 as chair of Philosophy and Religion after teaching and serving as a chaplain at Alcorn College and Alabama A&M.",
      "Taught and mentored students including Martin Luther King Jr., Samuel DuBois Cook, and Maynard Jackson.",
      "Co-taught Morehouse’s Seminar in Social Philosophy with Martin Luther King Jr. in 1961–1962. The course examined ethics and social organization, including democracy and the relationship between individual conduct and society."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Encyclopedia of Arkansas: Samuel Woodrow Williams’s teaching and civil rights work",
        "url": "https://encyclopediaofarkansas.net/entries/samuel-woodrow-williams-529/"
      },
      {
        "title": "Samuel W. Williams: Correspondence preserved by the Stanford King Institute",
        "url": "https://kinginstitute.stanford.edu/king-papers/documents/samuel-w-williams"
      },
      {
        "title": "American Philosophical Association: Morehouse’s philosophical tradition",
        "url": "https://blog.apaonline.org/2018/04/17/black-issues-in-philosophy-a-citadel-of-the-ideal/"
      },
      {
        "title": "Stanford King Institute: Original lecture outline for the Morehouse Social Philosophy seminar, October 1961",
        "url": "https://kinginstitute.stanford.edu/king-papers/documents/outline-lecture-social-philosophy-0"
      }
    ],
    "showSources": true
  },
  {
    "id": "asa-g-yancey-sr",
    "name": "Asa G. Yancey Sr.",
    "years": "August 19, 1916 – March 9, 2013",
    "image": {
      "url": "images/people/Asa G. Yancey Sr..jpg",
      "alt": "Portrait of Asa G. Yancey Sr.",
      "sourceUrl": "https://med.emory.edu/departments/surgery/education/general-surgery-residency/asa-yancey-bio.html"
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Graduated with highest honors from Morehouse College in 1937 before studying medicine at the University of Michigan."
      },
      {
        "institutionId": "medicine",
        "label": "Appointed clinical professor of surgery at Morehouse School of Medicine in 1984."
      }
    ],
    "bio": [
      "Trained in surgery under Charles Drew at Howard University’s Freedmen’s Hospital and led surgery at the Veterans Administration hospital in Tuskegee from 1948 to 1958.",
      "Published a surgical technique for Hirschsprung disease in 1952, seeking to reduce the risk of injury to surrounding nerves. The operation is now recognized in surgical literature as the Yancey-Soave technique.",
      "Became chief of surgery at Grady’s Hughes Spalding Pavilion in 1958 and established a surgical residency program that expanded training opportunities for Black physicians in Georgia.",
      "Joined Emory’s medical faculty in 1964 as its first Black faculty member. In 1972, became Grady’s medical director and an associate dean at Emory’s School of Medicine.",
      "Served on the Atlanta Board of Education from 1966 to 1976 while continuing his clinical and teaching work."
    ],
    "legacy": [
      "Graduated from Morehouse with highest honors in 1937 before earning his medical degree at the University of Michigan in 1941.",
      "Received Morehouse’s Bennie Service Award in 1990 for his contributions to medicine and the community.",
      "Joined Morehouse School of Medicine as a clinical professor of surgery in 1984, after years of surgical teaching and leadership at Grady and Emory."
    ],
    "burialLocation": "https://maps.app.goo.gl/aQsFWYjbcJgy7Dgw5",
    "sources": [
      {
        "title": "Emory School of Medicine: Asa G. Yancey’s medical and educational leadership",
        "url": "https://med.emory.edu/departments/surgery/education/general-surgery-residency/asa-yancey-bio.html"
      },
      {
        "title": "The HistoryMakers: Asa G. Yancey oral-history biography",
        "url": "https://www.thehistorymakers.org/biography/dr-asa-yancey-sr"
      },
      {
        "title": "Asa G. Yancey and colleagues: Original 1952 surgical paper",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2617332/"
      },
      {
        "title": "World Journal of Pediatric Surgery: Recognition of the Yancey-Soave technique",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11429006/"
      },
      {
        "title": "Asa G. Yancey Sr.: Family obituary documenting his 1984 medical-school appointment and South-View burial",
        "url": "https://www.legacy.com/us/obituaries/atlanta/name/asa-yancey-obituary?id=32767817"
      }
    ],
    "showSources": true
  },
  {
    "id": "ernestine-erskine-brazeal",
    "name": "Ernestine Erskine Brazeal",
    "years": "1905 – 2002",
    "image": {
      "url": "images/people/Ernestine Erskine Brazeal.jpg",
      "alt": "Portrait of Ernestine Erskine Brazeal",
      "sourceUrl": "https://netroamer.com/jj/"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1928. Taught history and served as alumnae secretary from 1943 to 1976."
      }
    ],
    "legacy": [
      "Taught at Spelman and directed its alumnae work as secretary from 1943 to 1976.",
      "Served as president of the National Alumnae Association of Spelman College from 1950 to 1954.",
      "Returned after retirement to help prepare Spelman’s centennial. Worked with student assistant Taronda Spencer to collect publications, photographs, and artifacts that became a foundation of the Spelman College Archives. Spencer later became the college’s archivist and historian."
    ],
    "bio": [
      "Earned a master’s degree in American history at the University of Chicago before building a career in teaching and historical preservation."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "National Alumnae Association of Spelman College: Past presidents",
        "url": "https://reed-round-wfsj.squarespace.com/past-presidents"
      },
      {
        "title": "Georgia Historic Preservation Division: Ernestine Erskine Brazeal’s teaching and historical work, April 2006",
        "url": "https://dlg.usg.edu/record/dlg_ggpd_i-ga-bn200-ph5-bp1-br4-b6-s1-belec-p-btext"
      },
      {
        "title": "Auburn Avenue Research Library: Taronda Spencer’s account of Brazeal’s archival work",
        "url": "https://dlg.usg.edu/record/aarl_afpc_spencertarondaelise20130601"
      },
      {
        "title": "Atlanta University Center: Ernestine Brazeal, “The State of Spelman College,” archival manuscript description",
        "url": "https://findingaids.auctr.edu/repositories/2/archival_objects/41712"
      }
    ],
    "showSources": true
  },
  {
    "id": "irene-carolyn-dobbs-jackson",
    "name": "Irene Carolyn Dobbs Jackson",
    "years": "February 16, 1908 – January 19, 1999",
    "image": {
      "url": "images/people/Irene Carolyn Dobbs Jackson.jpg",
      "alt": "Portrait of Irene Carolyn Dobbs Jackson",
      "sourceUrl": "https://dlg.usg.edu/record/aarl_afpc_jacksonirenecarolyndobbs19990123"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated as Spelman College’s valedictorian in 1929. Later taught French, Latin, and music in a career spanning several universities."
      }
    ],
    "legacy": [
      "Graduated as Spelman’s valedictorian in 1929 and returned to teach French. Also sang in the college’s Glee Club during her student years.",
      "Taught French, Latin, and music during a 50-year educational career that included Spelman, Clark College, Atlanta University, Jackson State, and North Carolina Central University.",
      "Spent the final 19 years of her teaching career as chair of Foreign Languages at North Carolina Central University."
    ],
    "bio": [
      "Pursued advanced study in France at the University of Toulouse, earning a doctorate in French before resuming her teaching in Atlanta.",
      "Challenged the exclusion of Black residents from Atlanta’s main public library by applying for a library card in 1959. Her successful application helped open access to the previously segregated library.",
      "Continued her work as a language scholar and educator across several historically Black institutions, combining classroom teaching with academic leadership."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Auburn Avenue Research Library: Irene Carolyn Dobbs Jackson funeral program and teaching career",
        "url": "https://dlg.usg.edu/record/aarl_afpc_jacksonirenecarolyndobbs19990123"
      },
      {
        "title": "Westside Future Fund: Irene Dobbs Jackson’s education and library integration",
        "url": "https://www.westsidefuturefund.org/the-woman-behind-a-family-of-history-makers-the-life-of-dr-irene-dobbs-jackson/"
      },
      {
        "title": "Georgia Tech: Auburn Avenue Research Library and Irene Dobbs Jackson",
        "url": "https://leading-edge.iac.gatech.edu/building-memories/auburn-avenue-research-library/"
      },
      {
        "title": "Irene Dobbs Jackson: Letter from France, May 1957, with her French-teaching history",
        "url": "https://kinginstitute.stanford.edu/king-papers/documents/irene-dobbs-jackson"
      },
      {
        "title": "Spelman College Glee Club: The Dobbs Girls, June 2017 newsletter",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/academics/music/2017-06-newsletter.pdf"
      }
    ],
    "showSources": true
  },
  {
    "id": "louisa-georgia-jackson-williams",
    "name": "Louisa Georgia Jackson Williams",
    "years": "October 11, 1942 – May 19, 2021",
    "image": {
      "url": "images/people/Louisa Georgia Jackson Williams.jpg",
      "alt": "Portrait of Louisa Georgia Jackson Williams",
      "sourceUrl": "https://www.carlmwilliams.com/obituaries/louisa-jackson-williams"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1964 with a bachelor’s degree in psychology."
      }
    ],
    "legacy": [
      "Sang in the Spelman College Glee Club while studying psychology.",
      "Maintained her connection to Spelman as an alumna and supporter of the college’s educational work."
    ],
    "bio": [
      "Began teaching in Atlanta Public Schools after college and spent 35 years in the Atlanta, Kalamazoo, Michigan, and Downingtown, Pennsylvania, school systems.",
      "Was selected Teacher of the Year at West Bradford Elementary School in Downingtown. Continued her classroom career until retirement in 1998.",
      "Returned to Atlanta and participated in the Magnolia Links, supporting the organization’s community-service work.",
      "Served on the Diaconate of First Congregational Church, where she had been an active member since childhood."
    ],
    "burialLocation": "https://maps.app.goo.gl/YH4X5VTcG5z3pFK6A",
    "sources": [
      {
        "title": "Carl M. Williams Funeral Directors: Louisa Georgia Jackson Williams’s education and teaching career",
        "url": "https://www.carlmwilliams.com/obituaries/louisa-jackson-williams"
      },
      {
        "title": "Spelman College: 2008–2009 philanthropy report, alumnae support",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/giving/philanthropy-report-2008-09.pdf"
      },
      {
        "title": "Spelman Messenger: Summer/Fall 2021, class of 1964 remembrance",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/spelman-messenger/spelman-messenger-fall-2021.pdf"
      }
    ],
    "showSources": true
  },
  {
    "id": "marguerite-f-simon",
    "name": "Marguerite F. Simon",
    "years": "October 30, 1912 – April 25, 2014",
    "image": {
      "url": "images/people/Marguerite F. Simon portrait.jpg",
      "alt": "Portrait of Marguerite F. Simon",
      "sourceUrl": "https://dlg.usg.edu/record/aarl_afpc_simonmargueritef20140503"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1935. Taught physical education there from 1943 to 1980."
      }
    ],
    "legacy": [
      "Graduated in biology in 1935. Served as class president in her sophomore and senior years, participated in the Athletic Council, and played saxophone in the campus orchestra.",
      "Taught health and physical education at Spelman from 1943 to 1980. Her classes included tumbling, volleyball, bowling, tennis, and archery.",
      "Advocated for student health and recreation and helped get Read Hall built. Dedicated in 1951, the building housed physical education and recreation facilities. Its gymnasium was later named in her honor.",
      "Served as historian of the National Alumnae Association of Spelman College and continued volunteering and mentoring after retirement.",
      "The class of 1949 established the Marguerite Simon Endowed Scholarship in 1985. Received Spelman’s Founders Spirit Award in 1988."
    ],
    "bio": [
      "Taught in Evergreen, Alabama, Milledgeville, Georgia, and Atlanta before joining Spelman’s faculty. Earned a master’s degree in physical education at the University of Colorado.",
      "Served First Congregational Church as a trustee, Sunday School teacher, and superintendent.",
      "Tutored at Lena Jean Campbell Elementary School and volunteered with Community Friendship, which supported people with mental illness. Also served on the supervisory committee of the Atlanta Teachers Federal Credit Union."
    ],
    "burialLocation": "https://maps.app.goo.gl/mTMYnRcKbYXN3o7f9",
    "sources": [
      {
        "title": "Auburn Avenue Research Library: Marguerite F. Simon’s teaching and community service",
        "url": "https://dlg.usg.edu/record/aarl_afpc_simonmargueritef20140503"
      },
      {
        "title": "Spelman College: History and Traditions, Read Hall and the Marguerite Simon Gymnasium",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/alumnae/spelman-history-and-traditions-brochure.pdf"
      },
      {
        "title": "Carl M. Williams Funeral Directors: Marguerite F. Simon remembrance",
        "url": "https://www.carlmwilliams.com/obituaries/marguerite-simon"
      }
    ],
    "showSources": true
  },
  {
    "id": "vashti-elizabeth-calanthe-scott-ellis",
    "name": "Vashti Elizabeth Calanthe Scott-Ellis",
    "years": "April 20, 1906 – March 25, 1995",
    "image": {
      "url": "images/people/Vashti Elizabeth Calanthe Scott-Ellis.jpg",
      "alt": "Portrait of Vashti Elizabeth Calanthe Scott-Ellis",
      "sourceUrl": "https://dlg.usg.edu/record/aarl_afpc_scottellisvashtielizabethcalanthe19950330"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman Seminary in 1925. Received its Lincoln Medal for writing."
      }
    ],
    "legacy": [
      "Won Spelman’s Lincoln Medal for her essay on Abraham Lincoln while a student at the seminary.",
      "With her sisters Esther and Ruth, established a writing award at Spelman in memory of their parents, Reverend William Alexander Scott and Nancy Emmeline Scott."
    ],
    "bio": [
      "Taught at Nelson Merry College in Tennessee before joining her family’s Atlanta Daily World newspaper in 1932.",
      "Worked on the editorial staff and led proofreading. Wrote the advice column “Eleanor” and the parenting column “Majoring with Minors.”",
      "Wrote poetry addressing segregation and community life. Her 1960 poem “Jim Crow,” dedicated to Martin Luther King Sr. and Martin Luther King Jr., challenged racial discrimination.",
      "Established the Door of Hope in Atlanta to assist unmarried mothers. Also served as a PTA president at E. R. Carter Elementary School and assisted with Sunday School at Ebenezer Baptist Church."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Auburn Avenue Research Library: Vashti Scott-Ellis funeral program, biography, and original poems",
        "url": "https://dlg.usg.edu/record/aarl_afpc_scottellisvashtielizabethcalanthe19950330"
      },
      {
        "title": "Maria Odum-Hinmon, University of Maryland: The Cautious Crusader, research on Scott-Ellis’s editorial work",
        "url": "https://api.drum.lib.umd.edu/server/api/core/bitstreams/8698a0d7-449f-4e6a-9284-448a4aefae13/content"
      }
    ],
    "showSources": true
  },
  {
    "id": "dorothy-alexander-brooks",
    "name": "Dorothy Alexander Brooks",
    "years": "1941 – 2012",
    "image": {
      "url": "images/people/Dorothy Alexander Brooks.jpg",
      "alt": "Portrait of Dorothy Alexander Brooks",
      "sourceUrl": "https://dlg.usg.edu/record/aarl_afpc_brooksdorothyalexander20120128"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1962 with a degree in social science and education."
      }
    ],
    "legacy": [
      "Graduated from Spelman in 1962 with an undergraduate degree in social science and education. Later earned a master’s degree at Howard University.",
      "Maintained membership in the Spelman College Alumnae Association."
    ],
    "bio": [
      "Worked in federal government for 25 years, including service as special assistant to a regional administrator of the U.S. Department of Housing and Urban Development.",
      "Became the first woman to direct a Fair Housing and Equal Opportunity office in Louisville, Kentucky, and later served on the board of Metro Fair Housing.",
      "Wrote on racism and other public issues, including an article published in USA Today in 1992 following the Rodney King incident.",
      "With her sister Alvia, established a publishing venture in 1983 to produce their father’s collection of quotations and poems, The Things I Say to Me I Say to You.",
      "Volunteered with Friendship Baptist Church’s tutorial program, served on the Alliance Theatre board, and participated in the Atlanta Alumnae Chapter of Delta Sigma Theta and the Atlanta Chapter of Girl Friends."
    ],
    "burialLocation": "https://maps.app.goo.gl/AAsqMQcgpFBsXgNk7",
    "sources": [
      {
        "title": "Auburn Avenue Research Library: Dorothy Alexander Brooks’s federal service, writing, and community work",
        "url": "https://dlg.usg.edu/record/aarl_afpc_brooksdorothyalexander20120128"
      },
      {
        "title": "Spelman College: 2015 philanthropy report, class of 1962 remembrance",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/giving/2015_philanthropy_report.pdf"
      }
    ],
    "showSources": true
  },
  {
    "id": "virgil-hall-hodges",
    "name": "Virgil Hall Hodges",
    "years": "December 6, 1936 – March 13, 2014",
    "image": {
      "url": "images/people/Virgil Hall Hodges.jpg",
      "alt": "Portrait of Virgil Hall Hodges",
      "sourceUrl": "https://dlg.usg.edu/record/aarl_afpc_hodgesvirgilhall20140321"
    },
    "connections": [
      {
        "institutionId": "morris",
        "label": "Graduated from Morris Brown College in 1958. Later served on its Board of Trustees."
      }
    ],
    "legacy": [
      "Graduated magna cum laude from Morris Brown College in 1958 and played football for the college. He entered its Sports Hall of Fame in 1991.",
      "Returned to Atlanta after his career in New York and served as a Morris Brown trustee. The college’s 2012–2013 catalog records his board membership.",
      "Co-founded the Richard Allen Classic Group, whose work supported education and community institutions."
    ],
    "bio": [
      "Began teaching sociology and coaching football at Philander Smith College in 1959. He later worked with the New York City Youth Board and directed the Coney Island Family Center, an antipoverty agency.",
      "Led drug rehabilitation centers at Mount Morris and Arthur Kill before moving into statewide employment and job-training administration.",
      "Served as deputy commissioner of the New York State Department of Labor from 1981 to 1991, overseeing unemployment insurance, employment services, and workforce training.",
      "Directed the New York State Martin Luther King Jr. Commission and Institute for Nonviolence. In Atlanta, he also served on the King Center’s advisory board and South-View Cemetery Association’s board.",
      "With his wife Verna, established a scholarship in their daughter Ruth-Ercile’s memory and helped recipients meet professional mentors."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Auburn Avenue Research Library: Virgil Hall Hodges funeral program",
        "url": "https://dlg.usg.edu/record/aarl_afpc_hodgesvirgilhall20140321"
      },
      {
        "title": "Morris Brown College: 2012–2013 Board of Trustees",
        "url": "https://morrisbrown.edu/wp-content/uploads/2019/04/MBC-Catalog-2014.pdf"
      },
      {
        "title": "Congressional Record: Recognizing Virgil Hall Hodges, December 2, 2013",
        "url": "https://www.govinfo.gov/content/pkg/CREC-2013-12-02/pdf/CREC-2013-12-02-pt1-PgE1764-3.pdf"
      },
      {
        "title": "The Atlanta Journal-Constitution: Virgil Hall Hodges remembrance",
        "url": "https://www.ajc.com/news/local-obituaries/virgil-hall-hodges-former-football-coach-and-executive-was-connector-people/GWhggzxmldCjAzmL23WD6K/"
      }
    ],
    "showSources": true
  },
  {
    "id": "rudolph-smith",
    "name": "Rudolph Smith",
    "years": "Died May 19, 2021",
    "image": {
      "url": "images/people/Rudolph Smith.jpg",
      "alt": "Portrait of Rudolph Smith",
      "sourceUrl": "https://www.ajc.com/news/obituaries/smith-rudolph/PDL5ESLTFNDPXBFIEBASXMT3RA/"
    },
    "connections": [
      {
        "institutionId": "morris",
        "label": "Graduated magna cum laude from Morris Brown College in 1961."
      }
    ],
    "legacy": [
      "Graduated from Morris Brown College in 1961 and earned a Master of Divinity from the Interdenominational Theological Seminary in 1964.",
      "The Richardson Ecumenical Fellowship at the Interdenominational Theological Center established a scholarship bearing his name."
    ],
    "bio": [
      "Founded Community Church of God in southwest Atlanta in 1966 and led the congregation for 32 years. The church moved to Cascade Avenue in 1970 and dedicated a new sanctuary in 1980.",
      "During his pastorate, the church opened a food pantry in 1983 and acquired the neighboring building that became VICARS, Volunteers in Community and Related Services.",
      "Helped found Atlanta’s Concerned Black Clergy and worked in local, statewide, and national Church of God leadership.",
      "Directed the National Association of the Church of God’s In-Service Training Institute for 20 years and taught in the program for more than four decades.",
      "Wrote People of Color in the Bible and Stewardship More than Money, along with contributions to Christian journals and magazines."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "The Atlanta Journal-Constitution: Rudolph Smith obituary",
        "url": "https://www.ajc.com/news/obituaries/smith-rudolph/PDL5ESLTFNDPXBFIEBASXMT3RA/"
      },
      {
        "title": "Community Church: History of the congregation and its outreach",
        "url": "https://ccogatl.org/history/"
      },
      {
        "title": "Rudolph Smith: Stewardship — More Than Money (2013), book and author information",
        "url": "https://www.booktopia.com.au/stewardship-rudolph-smith/book/9781628393491.html"
      }
    ],
    "showSources": true
  },
  {
    "id": "celestine-camp-patty",
    "name": "Celestine Camp Patty",
    "years": "April 26, 1952 – January 14, 2015",
    "image": {
      "url": "images/people/Celestine Camp Patty.jpg",
      "alt": "Portrait of Celestine Camp Patty",
      "sourceUrl": "https://www.carlmwilliams.com/obituaries/celestine-patty"
    },
    "connections": [
      {
        "institutionId": "morris",
        "label": "Graduated from Morris Brown College in 1972 with a bachelor’s degree in interior design."
      }
    ],
    "legacy": [
      "Studied interior design at Morris Brown College and graduated in 1972.",
      "Performed with the Morris Brown Marching Wolverines from 1969 to 1972."
    ],
    "bio": [
      "Worked as a designer and window dresser for Rich’s downtown department store and Sears and Roebuck. She later spent more than 15 years with New York Life Insurance Company.",
      "Contributed to Atlanta’s musical life as a member of the Atlanta Jazz Chorus from its beginning and as an alto singer at First Congregational Church.",
      "Performed with the church’s Chancel Choir, Voices of Faith, and Bell Ringers, and served as its Music Ministry librarian.",
      "Served on the Church Council and worked for almost 15 years as the congregation’s sexton, first part time and later full time."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Carl M. Williams Funeral Directors: Celestine Camp Patty obituary",
        "url": "https://www.carlmwilliams.com/obituaries/celestine-patty"
      }
    ],
    "showSources": true
  },
  {
    "id": "hank-aaron",
    "name": "Hank Aaron",
    "years": "February 5, 1934 – January 22, 2021",
    "image": {
      "url": "images/people/Hank Aaron.jpg",
      "alt": "Portrait of Hank Aaron",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hank_Aaron_1974.jpg",
      "license": "Public domain",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "medicine",
        "label": "Supported Morehouse School of Medicine with a $3 million gift alongside Billye Aaron in 2015."
      }
    ],
    "legacy": [
      "Hank and Billye Aaron announced a $3 million gift in September 2015 to expand the Hugh Gloster Medical Education Building and create the Billye Suber Aaron Student Pavilion.",
      "The gift supported the medical school’s academic facilities expansion, providing space for the education of future physicians and other health professionals."
    ],
    "bio": [
      "Built a Hall of Fame baseball career with the Milwaukee and Atlanta Braves and the Milwaukee Brewers. In 1974, he surpassed Babe Ruth’s career home-run record despite racist threats and harassment.",
      "With Billye Aaron, founded the Hank Aaron Chasing the Dream Foundation to help young people pursue education and develop their talents through grants and scholarships.",
      "The foundation supported children’s instruction and college education, including students attending historically Black colleges and universities.",
      "Used his public standing to advocate for civil rights and support the NAACP. He received the Presidential Medal of Freedom in 2002 for his achievements and humanitarian work."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Morehouse School of Medicine: Hank and Billye Aaron’s $3 million gift",
        "url": "https://www.msm.edu/RSSFeedArticles/September2015/HankBillyeAaronStudentPavilion.php"
      },
      {
        "title": "National Baseball Hall of Fame: Hank’s Giving",
        "url": "https://baseballhall.org/discover-more/stories/support/hank-aaron-continues-legacy-through-giving"
      },
      {
        "title": "National Baseball Hall of Fame: Hank’s Honor",
        "url": "https://baseballhall.org/discover/shortstops-hank-aaron-presidential-medal-of-freedom"
      },
      {
        "title": "DeKalb History Center: South-View Cemetery tour",
        "url": "https://dekalbhistory.org/programs/dekalb-traveler-south-view-cemetery/"
      }
    ],
    "showSources": true
  },
  {
    "id": "john-lewis",
    "name": "John Lewis",
    "years": "February 21, 1940 – July 17, 2020",
    "image": {
      "url": "images/people/John Lewis.jpg",
      "alt": "Portrait of John Lewis",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:John_Lewis-2006_(cropped).jpg",
      "license": "Public domain",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "medicine",
        "label": "Delivered Morehouse School of Medicine’s 2017 commencement address and advocated for affordable healthcare."
      }
    ],
    "legacy": [
      "Addressed Morehouse School of Medicine’s graduating class on May 20, 2017. He spoke about growing up without access to preventive care and urged graduates to help people in need.",
      "Called affordable healthcare a right and encouraged the school’s future health professionals to serve their communities.",
      "Sent a welcome message to incoming graduate students in 2020, emphasizing the need for healthcare leaders who would work for equality and diversity."
    ],
    "bio": [
      "Helped organize Nashville’s student sit-ins and joined the 1961 Freedom Rides challenging segregated interstate travel.",
      "Chaired the Student Nonviolent Coordinating Committee from 1963 to 1966 and spoke at the 1963 March on Washington.",
      "Helped lead the March 7, 1965 voting-rights march in Selma, where state troopers attacked peaceful demonstrators on the Edmund Pettus Bridge. The violence drew national attention to the campaign for voting rights.",
      "Directed the Voter Education Project, working to register voters across the South, before serving on the Atlanta City Council and representing Georgia’s Fifth District in Congress from 1987 until 2020.",
      "As a member of Congress, continued advocating for voting rights, civil rights, and underserved communities."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Morehouse School of Medicine: Class of 2017 commencement and John Lewis’s address",
        "url": "https://www.msm.edu/RSSFeedArticles/May2017/commencementscholarshipgift.php"
      },
      {
        "title": "Morehouse School of Medicine: 2020 graduate orientation program, welcome from John Lewis",
        "url": "https://web.msm.edu/Education/GEBS/documents/GEBS_OrientationProgram_20_r8.pdf"
      },
      {
        "title": "U.S. House of Representatives: John R. Lewis biography and congressional service",
        "url": "https://history.house.gov/People/Detail/16948"
      },
      {
        "title": "SNCC Digital Gateway: John Lewis",
        "url": "https://snccdigital.org/people/john-lewis/"
      }
    ],
    "showSources": true
  }
];

const TIMELINES = [
  {
    "institutionId": "spelman",
    "entries": [
      {
        "id": "ruby-spelman-graduation",
        "personId": "Ruby-Doris-Smith-Robinson",
        "sortYear": 1965,
        "displayDate": "1965",
        "title": "Ruby Doris Smith-Robinson"
      },
      {
        "id": "ludie-spelman-graduation",
        "personId": "Ludie-Clay-Andrews",
        "sortYear": 1906,
        "displayDate": "1906",
        "title": "Ludie Clay Andrews"
      },
      {
        "id": "mattiwilda-dobbs-spelman",
        "personId": "mattiwilda-dobbs",
        "sortYear": 1946,
        "displayDate": "1946",
        "title": "Mattiwilda Dobbs"
      },
      {
        "id": "freddye-scarborough-henderson-spelman",
        "personId": "freddye-scarborough-henderson",
        "sortYear": 1953,
        "displayDate": "By 1953",
        "title": "Freddye Scarborough Henderson"
      },
      {
        "id": "bazoline-estelle-usher-spelman",
        "personId": "bazoline-estelle-usher",
        "sortYear": 1954,
        "displayDate": "c. 1954",
        "title": "Bazoline Estelle Usher"
      },
      {
        "id": "ernestine-erskine-brazeal-spelman",
        "personId": "ernestine-erskine-brazeal",
        "sortYear": 1928,
        "displayDate": "1928",
        "title": "Ernestine Erskine Brazeal"
      },
      {
        "id": "irene-carolyn-dobbs-jackson-spelman",
        "personId": "irene-carolyn-dobbs-jackson",
        "sortYear": 1929,
        "displayDate": "1929",
        "title": "Irene Carolyn Dobbs Jackson"
      },
      {
        "id": "louisa-georgia-jackson-williams-spelman",
        "personId": "louisa-georgia-jackson-williams",
        "sortYear": 1964,
        "displayDate": "1964",
        "title": "Louisa Georgia Jackson Williams"
      },
      {
        "id": "marguerite-f-simon-spelman",
        "personId": "marguerite-f-simon",
        "sortYear": 1935,
        "displayDate": "1935",
        "title": "Marguerite F. Simon"
      },
      {
        "id": "vashti-elizabeth-calanthe-scott-ellis-spelman",
        "personId": "vashti-elizabeth-calanthe-scott-ellis",
        "sortYear": 1925,
        "displayDate": "1925",
        "title": "Vashti Elizabeth Calanthe Scott-Ellis"
      },
      {
        "id": "dorothy-alexander-brooks-spelman",
        "personId": "dorothy-alexander-brooks",
        "sortYear": 1962,
        "displayDate": "1962",
        "title": "Dorothy Alexander Brooks"
      }
    ]
  },
  {
    "institutionId": "medicine",
    "entries": [
      {
        "id": "hank-aaron-medicine",
        "personId": "hank-aaron",
        "sortYear": 2015,
        "displayDate": "2015",
        "title": "Hank Aaron"
      },
      {
        "id": "john-lewis-medicine",
        "personId": "john-lewis",
        "sortYear": 2017,
        "displayDate": "2017",
        "title": "John Lewis"
      },
      {
        "id": "asa-g-yancey-sr-medicine",
        "personId": "asa-g-yancey-sr",
        "sortYear": 1984,
        "displayDate": "1984",
        "title": "Asa G. Yancey Sr."
      }
    ]
  },
  {
    "institutionId": "morehouse",
    "entries": [
      {
        "id": "samuel-archer-morehouse",
        "personId": "samuel-archer",
        "sortYear": 1931,
        "displayDate": "1931",
        "title": "Samuel Archer"
      },
      {
        "id": "william-holmes-borders-morehouse",
        "personId": "william-holmes-borders",
        "sortYear": 1929,
        "displayDate": "1929",
        "title": "William Holmes Borders"
      },
      {
        "id": "jesse-b-blayton-morehouse",
        "personId": "jesse-b-blayton",
        "sortYear": 1925,
        "displayDate": "1925",
        "title": "Jesse B. Blayton"
      },
      {
        "id": "alfred-daniel-king-morehouse",
        "personId": "alfred-daniel-king",
        "sortYear": 1959,
        "displayDate": "1959",
        "title": "Alfred Daniel King"
      },
      {
        "id": "martin-luther-king-sr-morehouse",
        "personId": "martin-luther-king-sr",
        "sortYear": 1930,
        "displayDate": "1930",
        "title": "Martin Luther King Sr."
      },
      {
        "id": "samuel-woodrow-williams-morehouse",
        "personId": "samuel-woodrow-williams",
        "sortYear": 1946,
        "displayDate": "1946",
        "title": "Samuel Woodrow Williams"
      },
      {
        "id": "asa-g-yancey-sr-morehouse",
        "personId": "asa-g-yancey-sr",
        "sortYear": 1937,
        "displayDate": "1937",
        "title": "Asa G. Yancey Sr."
      }
    ]
  },
  {
    "institutionId": "clark",
    "entries": [
      {
        "id": "horace-mann-bond-clark",
        "personId": "horace-mann-bond",
        "sortYear": 1957,
        "displayDate": "1957",
        "title": "Horace Mann Bond"
      },
      {
        "id": "ariel-serena-hedges-bowen-clark",
        "personId": "ariel-serena-hedges-bowen",
        "sortYear": 1895,
        "displayDate": "1895",
        "title": "Ariel Serena Hedges Bowen"
      },
      {
        "id": "grace-towns-hamilton-clark",
        "personId": "grace-towns-hamilton",
        "sortYear": 1927,
        "displayDate": "1927",
        "title": "Grace Towns Hamilton"
      },
      {
        "id": "adrienne-mcneil-herndon-clark",
        "personId": "adrienne-mcneil-herndon",
        "sortYear": 1890,
        "displayDate": "1890",
        "title": "Adrienne McNeil Herndon"
      },
      {
        "id": "jesse-b-blayton-clark",
        "personId": "jesse-b-blayton",
        "sortYear": 1930,
        "displayDate": "1930",
        "title": "Jesse B. Blayton"
      },
      {
        "id": "virginia-lacy-jones-clark",
        "personId": "virginia-lacy-jones",
        "sortYear": 1945,
        "displayDate": "1945",
        "title": "Virginia Lacy Jones"
      },
      {
        "id": "duke-pearson-clark",
        "personId": "duke-pearson",
        "sortYear": 1971,
        "displayDate": "1971",
        "title": "Duke Pearson"
      },
      {
        "id": "donald-reeves-clark",
        "personId": "donald-reeves",
        "sortYear": 1937,
        "displayDate": "1937",
        "title": "Donald Reeves"
      },
      {
        "id": "bazoline-estelle-usher-clark",
        "personId": "bazoline-estelle-usher",
        "sortYear": 1906,
        "displayDate": "1906",
        "title": "Bazoline Estelle Usher"
      },
      {
        "id": "dinah-watts-pace-clark",
        "personId": "dinah-watts-pace",
        "sortYear": 1883,
        "displayDate": "1883",
        "title": "Dinah Watts Pace"
      }
    ]
  },
  {
    "institutionId": "morris",
    "entries": [
      {
        "id": "alice-dugged-cary-morris",
        "personId": "alice-dugged-cary",
        "sortYear": 1886,
        "displayDate": "1886",
        "title": "Alice Dugged Cary"
      },
      {
        "id": "alonzo-herndon-morris",
        "personId": "alonzo-herndon",
        "sortYear": 1948,
        "displayDate": "1948",
        "title": "Alonzo Herndon"
      },
      {
        "id": "alberta-williams-king-morris",
        "personId": "alberta-williams-king",
        "sortYear": 1938,
        "displayDate": "1938",
        "title": "Alberta Williams King"
      },
      {
        "id": "henry-mcneal-turner-morris",
        "personId": "henry-mcneal-turner",
        "sortYear": 1900,
        "displayDate": "1900",
        "title": "Henry McNeal Turner"
      },
      {
        "id": "virgil-hall-hodges-morris",
        "personId": "virgil-hall-hodges",
        "sortYear": 1958,
        "displayDate": "1958",
        "title": "Virgil Hall Hodges"
      },
      {
        "id": "rudolph-smith-morris",
        "personId": "rudolph-smith",
        "sortYear": 1961,
        "displayDate": "1961",
        "title": "Rudolph Smith"
      },
      {
        "id": "celestine-camp-patty-morris",
        "personId": "celestine-camp-patty",
        "sortYear": 1972,
        "displayDate": "1972",
        "title": "Celestine Camp Patty"
      }
    ]
  }
];
