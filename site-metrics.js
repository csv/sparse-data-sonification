var request  = require('request')

var get = function(portal, route, callback) {
  var url = 'https://' + portal + route + '&$$app_token=' + 'gTddlqVLsV4DkBlXnDSwnTazB';
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
module.exports.raw.top = function(topType, portal, start, end, callback) {
  get(portal, '/api/site_metrics.json?method=top&top=' + topType + '&start=' + start + '&end=' + end, callback)
}

function startEnd(day) {
  date = new Date(day)
  var isoDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
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
module.exports.daily.top = function(topType, portal, date, callback) {
  var day = startEnd(date)
  module.exports.raw.top(topType, portal, day.start, day.end, function(body) {
    var reshapedBody = reshapeTop(day.isoDate, portal, body)
    callback(reshapedBody)
  })
}

function reshapeTop(isoDate, portal, body) {
  var output = []
  for (key in body) {
    output.push({"date":isoDate,"portal":portal,"view-id":key,"count":body[key]})
  }
  return output
}
