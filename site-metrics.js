var curry    = require('curry')
  , parallel = require('parallel-commands')
  , request  = require('request')

var get = curry(function(route, callback, portal) {
  var url = 'https://' + portal + route;
  console.log(url);
  request(url, function(error, response, body) {
    if (error) {
      throw error
    } else {
      callback(JSON.parse(body))
    }
  })
})

// get('/api/site_metrics.json?start=1375315200000&end=1376438399999', function(a) { console.log(a) }, 'data.oregon.gov')

module.exports.series = function(start, end){
  return get('/api/site_metrics.json?start=' + start + '&end=' + end)
}

module.exports.topDatasets = function(start, end){
  return get('/api/site_metrics.json?method=top&top=DATASETS&start=' + start + '&end=' + end)
}

module.exports.topReferrers = function(start, end){
  return get('/api/site_metrics.json?method=top&top=REFERRERS&start=' + start + '&end=' + end)
}

module.exports.topSearches = function(start, end){
  return get('/api/site_metrics.json?method=top&top=SEARCHES&start=' + start + '&end=' + end)
}

module.exports.topEmbeds = function(start, end){
  return get('/api/site_metrics.json?method=top&top=EMBEDS&start=' + start + '&end=' + end)
}

module.exports.portals = [
  'data.colorado.gov',
  'data.nola.gov'
];
[
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

var socrata = module.exports

var commands = parallel(module.exports.portals.map(function(portal) {
  return socrata.series('1375315200000', '1376438399999')(function(body){
    console.log(body)
  })
}))

commands.execute()
