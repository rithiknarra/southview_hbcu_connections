/* School metadata. Images are bundled official institutional marks; see images/schools/SOURCES.md.
   color: a deep version of the school's color, dark enough for white text; used on timeline and profile headers. */
const INSTITUTIONS = [
 {id:'spelman',image:'images/schools/spelman.png',founded:1881,color:'#1b3a73',foundingNote:'Spelman College is a historically Black women’s college located in Atlanta, Georgia. Founded in 1881, it has a long tradition of educating and empowering Black women through the liberal arts and sciences. With a focus on academic excellence, leadership, and service, Spelman prepares students to make meaningful contributions to their communities and the world.',foundingSource:'https://www.spelman.edu/about/history-in-brief.html',name:'Spelman College'},
 {id:'morehouse',image:'images/schools/morehouse.svg',founded:1867,color:'#6b1f2a',foundingNote:'Morehouse College is a historically Black liberal arts college for men located in Atlanta, Georgia. Founded in 1867 as Augusta Institute, it has a long tradition of educating Black men and developing their intellectual abilities and character. With an emphasis on academic achievement, leadership, and service, Morehouse prepares students to contribute to their professions, strengthen their communities, and engage with the wider world.',foundingSource:'https://morehouse.edu/about/our-history/',name:'Morehouse College'},
 {id:'clark',image:'images/schools/clark.svg',founded:1988,color:'#9b1b30',foundingNote:'Clark Atlanta University is a historically Black university located in Atlanta, Georgia. Established in 1988 through the consolidation of Atlanta University, founded in 1865, and Clark College, founded in 1869, it carries forward a rich legacy of Black higher education. Through teaching, research, and service, Clark Atlanta prepares students to become leaders, advance knowledge, and help address challenges in their communities and beyond.',foundingSource:'https://www.cau.edu/about/history',name:'Clark Atlanta University'},
 {id:'morris',image:'images/schools/morris.png',founded:1881,color:'#4a2c6d',foundingNote:'Morris Brown College is a historically Black liberal arts college located in Atlanta, Georgia. Founded in 1881 by the African Methodist Episcopal Church, it has a long tradition of expanding access to higher education and supporting students in a nurturing environment. With a commitment to academic achievement, personal growth, and public service, Morris Brown prepares students to pursue meaningful careers and make positive contributions to society.',foundingSource:'https://morrisbrown.edu/history/',name:'Morris Brown College'},
 {id:'medicine',image:'images/schools/medicine.png',founded:1975,color:'#003b5c',foundingNote:'Morehouse School of Medicine is a historically Black medical school located in Atlanta, Georgia. Founded in 1975 as a medical education program at Morehouse College, it became an independent institution in 1981. Through education, research, and community service, the school prepares healthcare professionals and scientists to improve health, expand access to care, and advance health equity, with particular attention to underserved communities.',foundingSource:'https://www.msm.edu/about_us/msm-history.php',name:'Morehouse School of Medicine'},
];
/* Profiles for timeline cards.
   bio and legacy: arrays of strings, one string per bullet point.
   Optional image: {url:'assets/portrait.jpg', alt:'Portrait of ...', credit:'...'}.
   connections: {institutionId:'spelman',label:'Graduate, class of 19XX'}.
   burialLocation: optional Google Maps URL string; omit or leave empty when unknown.
   sources: [{title:'Archive record',url:'https://...'}]. */
const PEOPLE = [{id:'Ruby-Doris-Smith-Robinson',name:'Ruby Doris Smith-Robinson',years:'April 25, 1942 – October 7, 1967',image:{url:'images/ruby-doris-smith-robinson.jpg',alt:'Portrait of Ruby Doris Smith-Robinson'},connections:[{institutionId:'spelman',label:'Graduated from Spelman College in 1965 with a degree in physical education.'}],bio:[
  "Born April 25, 1942, in Atlanta, Georgia.",
  "Grew up under segregation and developed a strong commitment to racial equality.",
  "Participated in the 1961 Freedom Rides and endured imprisonment for her activism.",
  "Married Clifford Robinson; together they had a son, Kenneth Toure.",
  "Helped manage the Student Nonviolent Coordinating Committee (SNCC) and became its executive secretary in 1966.",
  "Died of cancer on October 7, 1967, at age 25, leaving a legacy of courage and dedication to civil rights."
],legacy:[
  "Became involved in the Atlanta Student Movement in 1960 while attending Spelman College.",
  "Helped organize sit-ins and took part in protests against segregation at Atlanta businesses.",
  "Returned to Spelman after her civil rights work interrupted her studies.",
  "Earned a bachelor’s degree in physical education in 1965, according to the Atlanta University Center archives.",
  "Helped advance the Civil Rights Movement as part of Spelman’s tradition of student activism."
]},
{
  "id": "Ludie-Clay-Andrews",
  "name": "Ludie Clay Andrews",
  "image": {
    "url": "images/ludie-clay-andrews.jpg",
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
  ]
}
];
   /* Institution timelines. Add more objects to populate other schools.
   Each entry references a PEOPLE id; sortYear controls chronological order.
   displayDate can be a year, a date range, or an approximate date.
   sortYear is required and determines the exact proportional timeline position.
   Person entries use personId. Event entries can omit personId and use title,
   summary, details, and sources. Add data here and reload, or use
   southViewHistory.addEntry(institutionId, entry) for immediate in-page updates. */
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
      }
    ]
  }
];
