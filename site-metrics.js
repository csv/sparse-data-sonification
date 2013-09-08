var request  = require('request')
  , fs       = require('fs')

var get = function(portal, route, callback) {
  var url = 'https://' + portal + route;
  request(url, function(error, response, body) {
    if (error) {
      throw error
    } else {
      callback(JSON.parse(body))
    }
  })
}

module.exports.raw = {}

module.exports.raw.site = function(portal, start, end, callback){
  var route = '/api/site_metrics.json?start=' + start + '&end=' + end;
  get(portal, route, callback)
}

module.exports.raw.topDatasets = function(portal, start, end, callback){
  get(portal, '/api/site_metrics.json?method=top&top=DATASETS&start=' + start + '&end=' + end, callback)
}

module.exports.raw.topReferrers = function(portal, start, end, callback){
  get(portal, '/api/site_metrics.json?method=top&top=REFERRERS&start=' + start + '&end=' + end, callback)
}

module.exports.raw.topSearches = function(portal, start, end, callback){
  get(portal, '/api/site_metrics.json?method=top&top=SEARCHES&start=' + start + '&end=' + end, callback)
}

module.exports.raw.topEmbeds = function(portal, start, end, callback){
  get(portal, '/api/site_metrics.json?method=top&top=EMBEDS&start=' + start + '&end=' + end, callback)
}

function startEnd(day) {
  date = new Date(day)
  var isoDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  var start = new Date(isoDate).getTime()
  var end = start + 24 * 3600 * 1000
  return {"start":start,"end":end,"isoDate":isoDate}
}

module.exports.daily = {}
module.exports.daily.site = function(portal, date, callback) {
  var day = startEnd(date)
  module.exports.raw.site(portal, day.start, day.end, function(body){
    body.date = day.isoDate
    body.portal = portal
    callback(body)
  })
}


module.exports.portals = [
  'data.colorado.gov',
  'data.nola.gov',
  'healthmeasures.aspe.hhs.gov',
  'data.cityofchicago.org',
  'data.wa.gov',
  'opendata.go.ke',
  'data.austintexas.gov',
  'data.cityofnewyork.us',
  'info.samhsa.gov',
  'data.taxpayer.net',
  'data.cityofmadison.com',
  'data.slcgov.com',
  'data.illinois.gov',
  'data.somervillema.gov',
  'iranhumanrights.socrata.com',
  'data.hawaii.gov',
  'data.maryland.gov',
  'data.ny.gov',
  'data.mo.gov',
  'data.nfpa.org',
  'nmfs.socrata.com',
  'data.govloop.com',
  'data.sunlightlabs.com',
  'electionsdata.kingcounty.gov',
  'data.undp.org',
  'deleon.socrata.com',
  'data.energystar.gov',
  'explore.data.gov',
  'data.weatherfordtx.gov',
  'bronx.lehman.cuny.edu',
  'data.sfgov.org',
  'data.edmonton.ca',
  'data.consumerfinance.gov',
  'www.metrochicagodata.org',
  'data.kingcounty.gov',
  'data.baltimorecity.gov',
  'health.data.ny.gov',
  'dati.lombardia.it',
  'datacatalog.cookcountyil.gov',
  'www.opendatanyc.com',
  'cookcounty.socrata.com',
  'data.oregon.gov',
  'data.oaklandnet.com',
  'data.raleighnc.gov',
  'finances.worldbank.org',
  'data.honolulu.gov',
  'opendata.socrata.com',
  'data.cityofboston.gov',
  'data.ok.gov',
  'data.cms.gov',
  'data.snostat.org',
  'www.halifaxopendata.ca',
  'data.wellingtonfl.gov',
  'gettingpastgo.socrata.com',
  'www.data.act.gov.au',
  'data.redmond.gov',
  'data.seattle.gov',
  'data.montgomerycountymd.gov',
  'data.acgov.org',
  'data.medicare.gov'
]

module.exports.portals = [
  'data.oregon.gov'
]

var socrata = module.exports


function write (filename) {
  return function(body) {
    console.log(body)
    fs.writeFile('data/' + filename, JSON.stringify(body))
  }
}


socrata.portals.map(function(portal) {
//socrata.series(portal, 'DAILY', '1375315200000', '1376438399999', write(portal))
//socrata.topDatasets(portal, '1375315200000', '1376438399999', write(portal))
  var day = new Date('2010-01-01')
  var day = new Date('2013-09-05')
  while (day <= new Date()) {
    socrata.daily.site(portal, day, write([day.getFullYear(), day.getMonth(), day.getDate(), portal].join('-')))
    day.setDate(day.getDate() + 1)
  }
})
