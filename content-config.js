/* Public, read-only Final Website tab. Never put Google credentials in this file. */
window.SOUTHVIEW_CONTENT_CONFIG = {
  csvUrl: 'https://docs.google.com/spreadsheets/d/1L8A5vvuU3bUk8sq8bk_3koTH5QejEJ-VgaYrUnA-HDo/gviz/tq?tqx=out:csv&headers=1&sheet=Final%20Website',
  yearBefore: 2026,
  // All profiles are maintained in the sheet; unchecked or deleted rows stay off the site.
  sheetOwnsProfiles: true,
  reviewedPortraits: {
    'john henry lewis': {
      url: 'images/people/John Henry Lewis - AUC circa 1925.png',
      alt: 'John Henry Lewis, front-center in a Morris Brown faculty portrait, circa 1925',
      sourceUrl: 'https://radar.auctr.edu/faculty-john-h-lewis-circa-1925',
      license: 'No Copyright — United States',
      licenseUrl: 'https://rightsstatements.org/vocab/NoC-US/1.0/',
      credit: 'Morris Brown College Photographs, auc.067.0361. Atlanta University Center Robert W. Woodruff Library. AI-assisted crop.',
      caption: 'AUC Woodruff Library, circa 1925',
      attributionRequired: false,
      fit: 'contain'
    },
    'henry james charles bowden': {
      url: 'images/people/Henry James Charles Bowden - Morehouse Tiger 1925.png',
      alt: 'Henry James Charles Bowden in The Morehouse Tiger, 1925',
      sourceUrl: 'https://static1.squarespace.com/static/540a843be4b0387389f2bc62/t/624694ee5873035a2568d5e7/1648792827403/PoloRLExclusivelyforMorehouseAndSpelmanColleges.pdf#page=8',
      license: 'Public domain (United States)',
      licenseUrl: 'https://www.copyright.gov/what-is-copyright/',
      credit: 'The Morehouse Tiger, 1925. AI-assisted crop of the reproduced yearbook portrait.',
      caption: 'The Morehouse Tiger, 1925',
      attributionRequired: false,
      fit: 'contain'
    }
  },
  timeoutMs: 15000
};
