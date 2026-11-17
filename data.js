/* School information. Person profiles and timeline entries come from the Google Sheet. */
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
    "id": "atlanta",
    "image": "images/schools/atlanta-university-emblem.jpg",
    "shortMark": "AU",
    "founded": 1865,
    "color": "#6d365c",
    "foundingNote": "Atlanta University was founded in 1865 to educate formerly enslaved people. It became a center for graduate education and research. In 1988, Atlanta University merged with Clark College to form Clark Atlanta University. This timeline follows its students, faculty, and other connected people, including later milestones in their lives.",
    "foundingSource": "https://www.cau.edu/about/history",
    "name": "Atlanta University"
  },
  {
    "id": "clark",
    "image": "images/schools/clark.svg",
    "founded": 1988,
    "color": "#9b1b30",
    "foundingNote": "Clark Atlanta University was established in 1988 through the merger of Atlanta University and Clark College. This timeline includes people connected to Clark College and its earlier name, Clark University. Explore Atlanta University separately for its students and faculty.",
    "foundingSource": "https://www.cau.edu/about/history",
    "name": "Clark Atlanta University",
    "timelineStart": 1869,
    "timelineStartLabel": "Clark College"
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
