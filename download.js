var curry    = require('curry')
  , parallel = require('parallel-commands')
  , request  = require('request')

var get = curry(function(route, callback, portal) {
  request('https://' + portal + route, function(error, response, body) {
    if (error) {
      throw error
    } else {
      callback(JSON.parse(body))
    }
  })
})

get('/api/site_metrics.json?start=1375315200000&end=1376438399999', function(a) { console.log(a) }, 'data.oregon.gov')
