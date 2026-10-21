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
    "foundingNote": "Clark Atlanta University is a historically Black university located in Atlanta, Georgia. Established in 1988 through the consolidation of Atlanta University, founded in 1865, and Clark College, founded in 1869, it carries forward a rich legacy of Black higher education. Through teaching, research, and service, Clark Atlanta prepares students to become leaders, advance knowledge, and help address challenges in their communities and beyond.",
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
      "alt": "Portrait of Ruby Doris Smith-Robinson"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1965 with a degree in physical education."
      }
    ],
    "bio": [
      "Born April 25, 1942, in Atlanta, Georgia.",
      "Grew up under segregation and developed a strong commitment to racial equality.",
      "Participated in the 1961 Freedom Rides and endured imprisonment for her activism.",
      "Married Clifford Robinson; together they had a son, Kenneth Toure.",
      "Helped manage the Student Nonviolent Coordinating Committee (SNCC) and became its executive secretary in 1966.",
      "Died of cancer on October 7, 1967, at age 25, leaving a legacy of courage and dedication to civil rights."
    ],
    "legacy": [
      "Became involved in the Atlanta Student Movement in 1960 while attending Spelman College.",
      "Helped organize sit-ins and took part in protests against segregation at Atlanta businesses.",
      "Returned to Spelman after her civil rights work interrupted her studies.",
      "Earned a bachelor’s degree in physical education in 1965, according to the Atlanta University Center archives.",
      "Helped advance the Civil Rights Movement as part of Spelman’s tradition of student activism."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Ruby Doris Smith-Robinson - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Ruby_Doris_Smith-Robinson"
      }
    ]
  },
  {
    "id": "Ludie-Clay-Andrews",
    "name": "Ludie Clay Andrews",
    "image": {
      "url": "images/people/Ludie Clay Andrews.jpg",
      "alt": "Portrait of Ludie Clay Andrews"
    },
    "years": "March 3, 1874 – January 6, 1969",
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated in 1906 from the nursing training program at Spelman Seminary, now Spelman College."
      }
    ],
    "legacy": [
      "Graduated in 1906 from the nursing training program at MacVicar Hospital at Spelman Seminary, now Spelman College.",
      "Later served as superintendent of MacVicar Hospital, providing care to the college community.",
      "Taught health education in the Spelman-Morehouse summer school.",
      "Connected Spelman’s early nursing program to expanded professional opportunities for Black women and improved healthcare for Black communities."
    ],
    "bio": [
      "Nurse and educator from Milledgeville, Georgia, where she graduated from Eddy High School.",
      "After graduating in 1906, led Lula Grove Hospital and Training School and trained student nurses.",
      "Later led Grady Hospital’s segregated Black department and organized its Municipal Training School for Colored Nurses in 1914.",
      "Fought for about a decade to open Georgia’s nursing registration process to Black nurses, pursuing legal action at her own expense.",
      "Refused an individual license when other qualified Black nurses were still excluded.",
      "Helped win access to the state licensing examination for Black nursing graduates and became Georgia’s first Black registered nurse in 1920.",
      "Trained nurses, promoted public health, and challenged racial discrimination in healthcare.",
      "Died January 6, 1969, following a house fire; buried at South-View Cemetery."
    ],
    "sources": [
      {
        "title": "Ludie Clay Andrews - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Ludie_Clay_Andrews"
      },
      {
        "title": "Ludie Clay Andrews - Georgia Women of Achievement",
        "url": "https://www.georgiawomen.org/ludie-clay-andrews"
      }
    ],
    "burialLocation": ""
  },
  {
    "id": "samuel-archer",
    "name": "Samuel Archer",
    "years": "December 23, 1870 - January 15, 1941",
    "image": {
      "url": "images/people/Samuel Archer.jpg",
      "alt": "Portrait of Samuel Archer"
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Served as the fifth president of Morehouse College from 1931 to 1937. Also worked at the college as an educator and coach."
      }
    ],
    "bio": [
      "Born in Chesterfield, Virginia; studied at Colgate University, where he played football.",
      "Taught mathematics and worked in several leadership roles at Morehouse over a career of more than three decades.",
      "Coached the college's football team during two periods, beginning in 1905."
    ],
    "legacy": [
      "Became president in 1931 and led the college during the Great Depression.",
      "Combined academic leadership, teaching, and athletics in his work with Morehouse students.",
      "His coaching tenure began when the institution was still called Atlanta Baptist College."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Samuel Archer - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Samuel_Archer"
      }
    ]
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
        "label": "Joined Atlanta University in 1957 and served as a dean and researcher. Atlanta University later became part of Clark Atlanta University."
      }
    ],
    "bio": [
      "Historian, educator, and college administrator born in Nashville, Tennessee.",
      "Served as founding president of Fort Valley State College and as the first Black president of Lincoln University in Pennsylvania.",
      "Contributed historical research to the legal campaign that culminated in Brown v. Board of Education."
    ],
    "legacy": [
      "Served as dean of Atlanta University's School of Education and later directed its Bureau of Educational and Social Research.",
      "Challenged claims of racial inferiority in educational testing through historical and social research.",
      "Retired from Atlanta University in 1971; his service preceded the 1988 formation of Clark Atlanta University."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Horace Mann Bond - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Horace_Mann_Bond"
      },
      {
        "title": "Horace Mann Bond - New Georgia Encyclopedia",
        "url": "https://www.georgiaencyclopedia.org/articles/education/horace-mann-bond-1904-1972/"
      }
    ]
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
        "label": "Graduated from Morehouse College with a bachelor's degree in 1929."
      }
    ],
    "bio": [
      "Born in Macon, Georgia, into a family of Baptist ministers.",
      "Continued his education at Garrett Theological Seminary and Northwestern University.",
      "Led Atlanta's Wheat Street Baptist Church for more than fifty years and took part in the city's civil-rights movement."
    ],
    "legacy": [
      "His Morehouse education preceded a career combining ministry and civic leadership.",
      "Helped lead Atlanta's 1957 bus-desegregation campaign.",
      "Developed housing, social-service, and economic initiatives through Wheat Street Baptist Church."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "William Holmes Borders - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/William_Holmes_Borders"
      },
      {
        "title": "Borders - Stanford King Institute",
        "url": "https://kinginstitute.stanford.edu/borders-william-holmes-sr"
      }
    ]
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
        "label": "Became a professor of music at Clark University in 1895. Clark University later became Clark College, a predecessor of Clark Atlanta University."
      }
    ],
    "bio": [
      "Writer, musician, and temperance activist born in Newark, New Jersey.",
      "Moved to Atlanta with her husband, theologian John W. E. Bowen, in 1893.",
      "Performed as a singer, pianist, and organist and wrote about music and community life."
    ],
    "legacy": [
      "Taught music at Clark University beginning in 1895.",
      "Connected musical education with women's organizing and public service.",
      "Her college affiliation belongs to Clark University's pre-merger history, not to the institution founded in 1988."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Ariel Serena Hedges Bowen - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Ariel_Serena_Hedges_Bowen"
      }
    ]
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
      "Educator and librarian born in New London, Indiana; graduated from Wilberforce University in 1881.",
      "Taught in Kansas and Missouri before moving to Atlanta.",
      "Became the first librarian of Atlanta's Auburn Carnegie Library in 1921."
    ],
    "legacy": [
      "Helped lead Morris Brown during the institution's early years.",
      "Also served as the first principal of Atlanta's Mitchell Street School beginning in 1887.",
      "Expanded educational and library access for Black Atlantans under segregation."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Alice Dugged Cary - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Alice_Dugged_Cary"
      }
    ]
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
        "label": "Graduated from Spelman College in 1946 with a bachelor’s degree in music."
      }
    ],
    "bio": [
      "Broke racial barriers in international opera, becoming the first Black singer to perform at Milan’s La Scala in 1953.",
      "Refused to perform for segregated audiences.",
      "Helped prepare future generations of performers through teaching at the University of Texas and Howard University."
    ],
    "legacy": [
      "Earned her bachelor’s degree in music from Spelman in 1946.",
      "Developed her voice under Spelman instructors Naomi Maise and Willis Laurence James.",
      "Was one of six Dobbs sisters who graduated from Spelman.",
      "Received an honorary doctorate in fine arts from Spelman in 1979."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Mattiwilda Dobbs - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Mattiwilda_Dobbs"
      },
      {
        "title": "Mattiwilda Dobbs Janzon — The HistoryMakers",
        "url": "https://thehistorymakers.org/biography/mattiwilda-dobbs-janzon-40"
      },
      {
        "title": "The Dobbs Girls — Spelman Glee Club newsletter, June 2017",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/academics/music/2017-06-newsletter.pdf"
      },
      {
        "title": "The legend of Mattiwilda Dobbs — Atlanta Journal-Constitution",
        "url": "https://images.ajc.com/news/atlanta-news/the-legend-of-mattiwilda-dobbs/HUWHVUYVRJAFLHWEJTPWFSR6XI/"
      },
      {
        "title": "South-View Bench by the Road — Toni Morrison Society",
        "url": "https://www.tonimorrisonsociety.org/twenty-third-bench-by-the-road.php"
      }
    ]
  },
  {
    "id": "grace-towns-hamilton",
    "name": "Grace Towns Hamilton",
    "years": "February 10, 1907 - June 17, 1992",
    "image": null,
    "connections": [
      {
        "institutionId": "clark",
        "label": "Earned a bachelor's degree from Atlanta University in 1927 and later taught at Clark College. Both are predecessors of Clark Atlanta University."
      }
    ],
    "bio": [
      "Educator, civic leader, and Georgia legislator who grew up on the Atlanta University campus.",
      "Earned a master's degree in psychology from Ohio State University in 1929.",
      "Became the first Black woman elected to the Georgia General Assembly in 1965."
    ],
    "legacy": [
      "Her education and early teaching career connected her to both Atlanta University and Clark College.",
      "Led the Atlanta Urban League and worked on housing, employment, and voting rights.",
      "Her career linked university education with public service and political representation."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Grace Towns Hamilton - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Grace_Towns_Hamilton"
      }
    ]
  },
  {
    "id": "freddye-scarborough-henderson",
    "name": "Freddye Scarborough Henderson",
    "years": "February 18, 1917 - January 19, 2007",
    "image": {
      "url": "images/people/Freddye Scarborough Henderson.png",
      "alt": "Portrait of Freddye Scarborough Henderson"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Taught home economics, textiles, fashion design, applied art, and personality development at Spelman for eleven years, after an invitation from President Florence Read."
      }
    ],
    "bio": [
      "Born in Franklinton, Louisiana; graduated from Southern University in 1937.",
      "Worked as a fashion designer, teacher, columnist, and business owner.",
      "Co-founded Henderson Travel Service with her husband in Atlanta in 1955, expanding travel opportunities for Black Americans."
    ],
    "legacy": [
      "Her funeral program documents eleven years of teaching at Spelman but does not supply exact appointment dates.",
      "The timeline uses 'By 1953' because Florence Read, who invited her to teach, retired that year; it is not an asserted hiring date.",
      "Her work connected education, design, entrepreneurship, and international travel."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Freddye Scarborough Henderson - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Freddye_Scarborough_Henderson"
      },
      {
        "title": "Henderson funeral program - Digital Library of Georgia",
        "url": "https://dlg.usg.edu/record/aarl_afpc_hendersonfreddyescarborough20070124"
      },
      {
        "title": "Florence Read - Spelman College",
        "url": "https://www.spelman.edu/leadership/presidents-office/past-presidents/florence-read.html"
      }
    ],
    "researchNote": "Exact Spelman service dates remain unverified; bounded date is explicitly labeled."
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
        "label": "Graduated from Atlanta University's Normal Department in 1890 and later taught at the university, a predecessor of Clark Atlanta University."
      }
    ],
    "bio": [
      "Educator, actress, and civic activist born in Augusta, Georgia.",
      "Performed under the stage name Anne Du Bignon and developed a strong interest in drama and public speaking.",
      "Married businessman Alonzo Herndon and helped plan the family's Atlanta home."
    ],
    "legacy": [
      "Graduated with distinction in oratory and later joined Atlanta University's faculty.",
      "Taught drama and elocution and worked alongside W. E. B. Du Bois.",
      "Her teaching career supported artistic and intellectual opportunities for Black students."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Adrienne McNeil Herndon - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Adrienne_McNeil_Herndon"
      },
      {
        "title": "Herndon Home nomination - National Park Service",
        "url": "https://npgallery.nps.gov/pdfhost/docs/NHLS/Text/00000261.pdf"
      }
    ]
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
        "label": "Alonzo Herndon Stadium at Morris Brown College was named in his honor. The stadium opened in 1948, after his death."
      }
    ],
    "bio": [
      "Born into slavery in Walton County, Georgia; became a barber, property owner, and entrepreneur in Atlanta.",
      "Founded the business that became Atlanta Life Insurance Company in 1905.",
      "Became one of the city's most prominent Black business leaders and philanthropists."
    ],
    "legacy": [
      "Morris Brown's stadium commemorated his name and the Herndon family's support of education.",
      "The 1948 timeline entry records the stadium's opening, not attendance or a donation made by Herndon during his lifetime.",
      "His wife Adrienne and son Norris were associated with Atlanta University; those affiliations are distinct from his own commemorative connection."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Alonzo Herndon - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Alonzo_Herndon"
      },
      {
        "title": "Herndon Stadium - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Herndon_Stadium"
      }
    ]
  },
  {
    "id": "jesse-b-blayton",
    "name": "Jesse B. Blayton",
    "years": "December 6, 1897 - September 7, 1977",
    "image": {
      "url": "images/people/Jesse B. Blayton.png",
      "alt": "Portrait of Jesse B. Blayton",
      "credit": "Photo courtesy of Auburn Avenue Research Library on African American Culture and History, Fulton County Library System.",
      "attributionRequired": true
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Taught accounting at Morehouse College from 1925 to 1930."
      },
      {
        "institutionId": "clark",
        "label": "Began teaching accounting at Atlanta University in 1930. Atlanta University later became part of Clark Atlanta University."
      }
    ],
    "bio": [
      "Accountant, educator, entrepreneur, and radio pioneer born in Oklahoma.",
      "Became Georgia's first Black certified public accountant in 1928.",
      "Purchased Atlanta radio station WERD in 1949, making it the first Black-owned and Black-programmed radio station in the United States."
    ],
    "legacy": [
      "Mentored Black accounting students at Morehouse and Atlanta University.",
      "Helped expand entry into a profession that had excluded many African Americans.",
      "WERD provided a platform for Black cultural life and civil-rights organizing."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Jesse B. Blayton - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Jesse_B._Blayton"
      }
    ]
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
      "Librarian and educator born in Cincinnati, Ohio.",
      "Earned a doctorate in library science at the University of Chicago in 1945.",
      "Worked to expand library services and professional opportunities for African Americans."
    ],
    "legacy": [
      "Helped plan Atlanta University's library school, which opened in 1941.",
      "Led the School of Library Service for thirty-six years and helped train approximately 1,800 Black librarians.",
      "Later served as the first director of the Atlanta University Center's Robert W. Woodruff Library."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Virginia Lacy Jones - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Virginia_Lacy_Jones"
      }
    ]
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
        "label": "Earned a bachelor's degree at Morris Brown College in 1938."
      }
    ],
    "bio": [
      "Atlanta educator, church musician, and community leader.",
      "Married Martin Luther King Sr. and raised three children, including Martin Luther King Jr.",
      "Served for many years as organist and choir leader at Ebenezer Baptist Church."
    ],
    "legacy": [
      "Continued her education at Morris Brown while raising a family and serving her church.",
      "Helped sustain the religious and community institutions that shaped Atlanta's civil-rights leadership.",
      "Was killed while playing the organ at Ebenezer Baptist Church in 1974."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Alberta Williams King - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Alberta_Williams_King"
      }
    ]
  },
  {
    "id": "alfred-daniel-king",
    "name": "Alfred Daniel King",
    "years": "July 30, 1930 - July 21, 1969",
    "image": null,
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Graduated from Morehouse College in 1959."
      }
    ],
    "bio": [
      "Baptist minister and civil-rights activist, usually known as A. D. King.",
      "Served congregations in Georgia, Alabama, and Kentucky.",
      "Participated in campaigns for desegregation and fair housing alongside other civil-rights leaders."
    ],
    "legacy": [
      "His Morehouse education preceded his first full-time pastorate in Newnan, Georgia.",
      "Helped organize the Birmingham movement while serving First Baptist Church of Ensley.",
      "Returned to Atlanta to serve at Ebenezer Baptist Church after the assassination of his brother Martin Luther King Jr."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Alfred Daniel King - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Alfred_Daniel_King"
      }
    ]
  },
  {
    "id": "martin-luther-king-jr",
    "name": "Martin Luther King Jr.",
    "years": "January 15, 1929 - April 4, 1968",
    "image": {
      "url": "images/people/Martin Luther King Jr..jpg",
      "alt": "Portrait of Martin Luther King Jr.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Martin_Luther_King,_Jr._and_Lyndon_Johnson_(cropped).jpg",
      "license": "Public domain",
      "licenseUrl": "",
      "attributionRequired": false
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Graduated from Morehouse College in 1948 with a bachelor's degree in sociology."
      }
    ],
    "bio": [
      "Atlanta-born Baptist minister and leader of the modern civil-rights movement.",
      "Helped lead the Montgomery bus boycott and co-founded the Southern Christian Leadership Conference.",
      "Received the Nobel Peace Prize in 1964 and was assassinated in Memphis in 1968."
    ],
    "legacy": [
      "Entered Morehouse in 1944 at age fifteen.",
      "Identified Morehouse president Benjamin E. Mays as an important mentor.",
      "His studies at Morehouse helped shape a career in ministry and nonviolent civil-rights leadership."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Martin Luther King Jr. - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr."
      },
      {
        "title": "South-View Cemetery - former interments",
        "url": "https://en.wikipedia.org/wiki/South-View_Cemetery"
      }
    ]
  },
  {
    "id": "martin-luther-king-sr",
    "name": "Martin Luther King Sr.",
    "years": "December 19, 1899 - November 11, 1984",
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
        "label": "Earned a Bachelor of Theology from Morehouse College in 1930 and later served as a trustee."
      }
    ],
    "bio": [
      "Baptist minister and civil-rights leader born in Stockbridge, Georgia.",
      "Led Atlanta's Ebenezer Baptist Church and advocated for voting rights and equal treatment.",
      "Father of Christine King Farris, Martin Luther King Jr., and Alfred Daniel King."
    ],
    "legacy": [
      "Began theological study at Morehouse in 1925 while working to support his family.",
      "Completed his theology degree in 1930.",
      "Maintained a long association with the college through service on its board of trustees."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Martin Luther King Sr. - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Martin_Luther_King_Sr."
      },
      {
        "title": "King at Morehouse — Morehouse College (father, Class of 1930)",
        "url": "https://morehouse.edu/academics/centers-and-institutes/martin-luther-king-jr-collection/king-at-morehouse"
      }
    ]
  },
  {
    "id": "duke-pearson",
    "name": "Duke Pearson",
    "years": "August 17, 1932 - August 4, 1980",
    "image": null,
    "connections": [
      {
        "institutionId": "clark",
        "label": "Attended Clark College and returned as a teacher in 1971. Clark College later became part of Clark Atlanta University."
      }
    ],
    "bio": [
      "Atlanta-born jazz pianist, composer, arranger, and producer, born Columbus Calvin Pearson Jr.",
      "Worked with leading jazz musicians and became an important arranger and producer for Blue Note Records.",
      "Led recording ensembles and composed music performed by other jazz artists."
    ],
    "legacy": [
      "Studied at Clark College while developing his skills as an instrumentalist.",
      "Returned to Clark as a teacher after leaving his Blue Note position in 1971.",
      "Brought professional performance and recording experience into music education."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Duke Pearson - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Duke_Pearson"
      }
    ]
  },
  {
    "id": "donald-reeves",
    "name": "Donald Reeves",
    "years": "July 31, 1911 - January 3, 1973",
    "image": null,
    "connections": [
      {
        "institutionId": "clark",
        "label": "Graduated from Clark College, where he played baseball, basketball, and football. Clark College later became part of Clark Atlanta University."
      }
    ],
    "bio": [
      "Professional Negro-league baseball player known as 'Soup' Reeves.",
      "Played for the Atlanta Black Crackers, Indianapolis ABCs, and Chicago American Giants.",
      "Was selected for the 1940 East-West All-Star Game and later worked as a teacher in Atlanta."
    ],
    "legacy": [
      "Played baseball, basketball, and football at Clark College, a predecessor of Clark Atlanta University.",
      "His college athletic career preceded his professional baseball debut.",
      "The exact graduation year is not verified; 'By 1937' marks the documented transition to professional baseball."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Donald Reeves - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Donald_Reeves"
      },
      {
        "title": "Donald Reeves - Baseball Reference Bullpen",
        "url": "https://www.baseball-reference.com/bullpen/Donald_Reeves"
      }
    ]
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
        "label": "Turner Theological Seminary was named in his honor in 1900. At the time, the seminary was part of Morris Brown College."
      }
    ],
    "bio": [
      "African Methodist Episcopal bishop, minister, and political leader born in South Carolina.",
      "Served as a chaplain during the Civil War and organized AME congregations in Georgia after emancipation.",
      "Was elected to the Georgia legislature during Reconstruction and advocated for Black civil and political rights."
    ],
    "legacy": [
      "Morris Brown established a theology department in 1894.",
      "The department became Turner Theological Seminary in 1900 in recognition of Bishop Turner.",
      "The seminary remained affiliated with Morris Brown until the 1950s; its later independent history is distinct from the college."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Henry McNeal Turner - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Henry_McNeal_Turner"
      },
      {
        "title": "Turner Theological Seminary - institutional history",
        "url": "https://www.turnerseminary.org/ourhistory"
      }
    ]
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
        "label": "Graduated from Atlanta University in 1906 and completed a master's degree there in 1937."
      },
      {
        "institutionId": "spelman",
        "label": "Taught at Spelman College for three years after retiring from Atlanta's public schools in 1954."
      }
    ],
    "bio": [
      "Educator born in Walnut Grove, Georgia, who worked in schools for more than fifty years.",
      "Became a senior administrator of education for Black children in the Atlanta school system.",
      "Organized Girl Scout troops for Black girls in Atlanta in 1943."
    ],
    "legacy": [
      "Studied at Atlanta University, where W. E. B. Du Bois was among her teachers.",
      "Also consulted and taught at Atlanta University during summer breaks.",
      "Continued teaching at Spelman after her public-school retirement; the timeline marks that transition approximately."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Bazoline Estelle Usher - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Bazoline_Estelle_Usher"
      }
    ]
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
        "label": "Graduated from Atlanta University in 1883 with training in education. The institution is a predecessor of Clark Atlanta University."
      }
    ],
    "bio": [
      "Born enslaved near Athens, Georgia; pursued education after emancipation.",
      "Became an educator and established schools for Black children in Covington, Georgia.",
      "Operated the Covington Colored Children's Orphanage and the Reed Home and School for decades."
    ],
    "legacy": [
      "Applied her Atlanta University training to teaching and the care of children.",
      "Raised funds through public speaking and educational networks.",
      "Employed other Atlanta University graduates in her school and orphanage."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Dinah Watts Pace - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Dinah_Watts_Pace"
      }
    ]
  },
  {
    "id": "samuel-woodrow-williams",
    "name": "Samuel Woodrow Williams",
    "years": "February 12, 1912 - October 10, 1970",
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
        "label": "Graduated from Morehouse College in 1937. Joined its faculty in 1946 and chaired the Department of Philosophy and Religion."
      }
    ],
    "bio": [
      "Baptist minister, philosopher, and civil-rights leader born in Arkansas.",
      "Studied at Morehouse and Howard University.",
      "Served as pastor of Atlanta's Friendship Baptist Church and held leadership roles in the NAACP and civic organizations."
    ],
    "legacy": [
      "Taught and mentored future leaders including Martin Luther King Jr., Samuel DuBois Cook, and Maynard Jackson.",
      "Linked philosophical and religious teaching with campaigns against segregation.",
      "Helped support the Atlanta Student Movement and efforts to improve public institutions."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Samuel Woodrow Williams - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Samuel_Woodrow_Williams"
      },
      {
        "title": "Auburn Avenue Research Library history - Georgia Tech",
        "url": "https://leading-edge.iac.gatech.edu/building-memories/auburn-avenue-research-library/"
      },
      {
        "title": "From Samuel W. Williams — Stanford King Institute (A.B., Morehouse, 1937)",
        "url": "https://kinginstitute.stanford.edu/king-papers/documents/samuel-w-williams"
      }
    ]
  },
  {
    "id": "asa-g-yancey-sr",
    "name": "Asa G. Yancey Sr.",
    "years": "August 19, 1916 - March 10, 2013",
    "image": {
      "url": "images/people/Asa G. Yancey Sr..jpg",
      "alt": "Portrait of Asa G. Yancey Sr."
    },
    "connections": [
      {
        "institutionId": "morehouse",
        "label": "Graduated from Morehouse College with a Bachelor of Science degree in 1937."
      }
    ],
    "bio": [
      "Atlanta-born surgeon who earned his medical degree at the University of Michigan in 1941.",
      "Trained under surgeon Charles R. Drew and served in the U.S. Army Medical Corps.",
      "Led surgical services and medical education at institutions including Tuskegee and Grady Memorial Hospital."
    ],
    "legacy": [
      "His Morehouse education preceded a pioneering career in surgery and medical training.",
      "Became the first Black member of Emory University's medical faculty in 1964.",
      "Helped create accredited surgical-training opportunities for Black physicians."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Asa G. Yancey Sr. - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Asa_G._Yancey_Sr."
      }
    ]
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
        "label": "Graduated from Spelman College in 1928. Later taught history and served as the college’s alumnae secretary."
      }
    ],
    "legacy": [
      "Taught history at Spelman College.",
      "Served as Spelman’s alumnae secretary from 1943 to 1976.",
      "Returned after retirement to help prepare for Spelman’s centennial.",
      "Helped collect and preserve publications, photographs, and artifacts that became the foundation of the Spelman College Archives."
    ],
    "bio": [
      "Helped preserve Black women’s educational history through her work collecting historical records and photographs.",
      "Alongside her husband, Morehouse educator Brailsford Reese Brazeal, welcomed students into their home for mentoring and gatherings with educators."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Taronda Elise Spencer memorial program — Digital Library of Georgia",
        "url": "https://dlg.usg.edu/record/aarl_afpc_spencertarondaelise20130601"
      },
      {
        "title": "Reflections, April 2006, pages 2–3 — Georgia Historic Preservation Division",
        "url": "https://georgiawildlife.com/sites/default/files/hpd/pdf/AfricanAmericanHistoricPlaces/April%202006.pdf"
      },
      {
        "title": "Brailsford Reese Brazeal family burial record",
        "url": "https://peoplelegacy.com/dr_brailsford_reese_brazeal-5q1H7g1"
      }
    ]
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
        "label": "Graduated from Spelman College in 1929. Later taught French, Latin, and music at the college."
      }
    ],
    "legacy": [
      "Graduated as valedictorian of Spelman’s Class of 1929.",
      "Taught French, Latin, and music at Spelman during her teaching career.",
      "Was the first of six Dobbs sisters to graduate from Spelman."
    ],
    "bio": [
      "Helped desegregate Atlanta’s public library in 1959 by becoming its first Black library-card holder.",
      "Educated generations of students during a 50-year teaching career across several historically Black institutions.",
      "Led the Department of Foreign Languages at North Carolina Central University during the final 19 years of her career."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Irene Carolyn Dobbs Jackson funeral program — Digital Library of Georgia",
        "url": "https://dlg.usg.edu/record/aarl_afpc_jacksonirenecarolyndobbs19990123"
      },
      {
        "title": "The Dobbs Girls — Spelman Glee Club newsletter, June 2017",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/academics/music/2017-06-newsletter.pdf"
      },
      {
        "title": "The Life of Dr. Irene Dobbs Jackson — Westside Future Fund",
        "url": "https://www.westsidefuturefund.org/the-woman-behind-a-family-of-history-makers-the-life-of-dr-irene-dobbs-jackson/"
      }
    ]
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
        "label": "Graduated from Spelman College in 1964 with a Bachelor of Arts in Psychology."
      }
    ],
    "legacy": [
      "Earned a Bachelor of Arts in Psychology from Spelman in 1964.",
      "Participated in the college Glee Club.",
      "Supported Spelman through philanthropic giving."
    ],
    "bio": [
      "Educated children for approximately 35 years in Atlanta, Kalamazoo, Michigan, and Downingtown, Pennsylvania.",
      "Earned Teacher of the Year recognition at West Bradford Elementary School.",
      "Contributed to community service through the Magnolia Links and served on the diaconate of First Congregational Church."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Louisa Georgia (Jackson) Williams obituary — Carl M. Williams Funeral Directors",
        "url": "https://www.carlmwilliams.com/obituaries/louisa-jackson-williams"
      },
      {
        "title": "Spelman philanthropy report, 2008–09",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/giving/philanthropy-report-2008-09.pdf"
      }
    ]
  },
  {
    "id": "marguerite-f-simon",
    "name": "Marguerite F. Simon",
    "years": "Died April 25, 2014",
    "image": {
      "url": "images/people/Marguerite F. Simon portrait.jpg",
      "alt": "Portrait of Marguerite F. Simon",
      "sourceUrl": "https://dlg.usg.edu/record/aarl_afpc_simonmargueritef20140503"
    },
    "connections": [
      {
        "institutionId": "spelman",
        "label": "Graduated from Spelman College in 1935. Later returned as a professor of physical education."
      }
    ],
    "legacy": [
      "Graduated from Spelman College in 1935.",
      "Returned to Spelman as a professor of physical education, promoting students’ health and physical development."
    ],
    "bio": [
      "Devoted her career to physical education and the well-being of generations of students.",
      "Was a longtime member of Atlanta’s First Congregational Church."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Marguerite F. Simon obituary",
        "url": "https://www.carlmwilliams.com/obituaries/marguerite-simon"
      },
      {
        "title": "Spelman philanthropy report, 2010–11",
        "url": "https://www.spelman.edu/_1_Docs-and-Files/giving/philanthropy-report-2010-2011.pdf"
      },
      {
        "title": "Marguerite F. Simon funeral program — Digital Library of Georgia",
        "url": "https://dlg.usg.edu/record/aarl_afpc_simonmargueritef20140503"
      }
    ]
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
        "label": "Graduated from Spelman Seminary in 1925."
      }
    ],
    "legacy": [
      "Graduated from Spelman Seminary in 1925.",
      "Received the Lincoln Medal for writing for her essay on President Lincoln.",
      "Established a writing award at Spelman with her sisters Esther and Ruth in memory of their parents."
    ],
    "bio": [
      "Joined her family in publishing the Atlanta Daily World in 1932 and served on its editorial staff.",
      "Wrote the advice column “Eleanor” and the parenting column “Majoring with Minors,” as well as poems and short stories.",
      "Founded the Door of Hope in Atlanta to help unmarried mothers.",
      "Served as PTA president at E. R. Carter Elementary School and as a Sunday School assistant at Ebenezer Baptist Church."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Vashti Scott-Ellis funeral program — Digital Library of Georgia",
        "url": "https://dlg.usg.edu/record/aarl_afpc_scottellisvashtielizabethcalanthe19950330"
      }
    ]
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
        "label": "Graduated from Spelman College in 1962 with a degree in Social Science and Education."
      }
    ],
    "legacy": [
      "Earned an undergraduate degree in Social Science and Education from Spelman College as a member of the Class of 1962.",
      "Remained connected to the college through the Spelman College Alumnae Association."
    ],
    "bio": [
      "Worked in federal government for 25 years, including service with the U.S. Department of Housing and Urban Development.",
      "Directed a Fair Housing and Equal Opportunity office in Louisville, Kentucky.",
      "Received recognition from the NAACP and federal agencies for her work on behalf of the rights and welfare of others.",
      "Volunteered with the Friendship Baptist Church tutorial program and participated in civic organizations, including Delta Sigma Theta and the Atlanta Chapter of Girl Friends."
    ],
    "burialLocation": "",
    "sources": [
      {
        "title": "Dorothy Alexander Brooks funeral program — Digital Library of Georgia",
        "url": "https://dlg.usg.edu/record/aarl_afpc_brooksdorothyalexander20120128"
      }
    ]
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
    "entries": []
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
        "id": "martin-luther-king-jr-morehouse",
        "personId": "martin-luther-king-jr",
        "sortYear": 1948,
        "displayDate": "1948",
        "title": "Martin Luther King Jr."
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
        "displayDate": "By 1937",
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
      }
    ]
  }
];
