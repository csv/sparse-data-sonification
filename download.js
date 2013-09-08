var metrics = require('./site-metrics')
  , fs       = require('fs')

function write (filename) {
  return function(body) {
    fs.writeFile('data/' + filename, JSON.stringify(body))
  }
}

metrics.portals.map(function(portal) {
  var day = new Date('2010-01-01')
//var day = new Date('2013-09-06')
  while (day <= new Date()) {
    var identifier = [day.getFullYear(), day.getMonth(), day.getDate(), portal].join('-')

    metrics.daily.site(portal, day, write('site-' + identifier))

    metrics.daily.top('DATASETS', portal, date, write('top-datasets-' + identifier))
    metrics.daily.top('REFERRERS', portal, date, write('top-referrers-' + identifier))
    metrics.daily.top('EMBEDS', portal, date, write('top-embeds-' + identifier))
    metrics.daily.top('SEARCHES', portal, date, write('top-searches-' + identifier))

    day.setDate(day.getDate() + 1)
  }
})
