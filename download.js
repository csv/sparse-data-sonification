var metrics = require('./site-metrics')
  , fs       = require('fs')

function write (filename) {
  return function(body) {
    fs.writeFile('data/' + filename, JSON.stringify(body))
  }
}

var portals = [
  'data.austintexas.gov',
  'data.cityofnewyork.us',
  'data.hawaii.gov',
  'explore.data.gov',
  'bronx.lehman.cuny.edu',
  'data.sfgov.org',
  'data.baltimorecity.gov',
  'data.oregon.gov',
  'data.raleighnc.gov',
  'finances.worldbank.org',
  'data.ok.gov',
  'data.seattle.gov',
  'data.montgomerycountymd.gov'
]

portals.map(function(portal) {
  var day = new Date('2010-01-01')
  var day = new Date('2013-09-06')
  while (day <= new Date()) {
    var identifier = [day.getFullYear(), day.getMonth() + 1, day.getDate(), portal].join('-')

    metrics.daily.site(portal, day, write('site-' + identifier))

    metrics.daily.top('DATASETS', portal, date, write('top-datasets-' + identifier))
    metrics.daily.top('REFERRERS', portal, date, write('top-referrers-' + identifier))
    metrics.daily.top('EMBEDS', portal, date, write('top-embeds-' + identifier))
    metrics.daily.top('SEARCHES', portal, date, write('top-searches-' + identifier))

    day.setDate(day.getDate() + 1)
  }
})
