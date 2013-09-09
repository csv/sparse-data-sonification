var master = new webkitAudioContext // require('web-audio-api').AudioContext()
var jsynth = require('jsynth')
var request = require('browser-request')
var tau = Math.PI * 2

function instrument(data,field) {
  return function (time, index, input){
    var i = index % data.length
    // var freq = Math.pow(2, Math.round(data[i][field] * 1e4))
    console.log(data[i][field] * 1e8)
    return Math.sin(time * tau * freq)
  }
}

request('ferry.smooth.json', function(err, res, body){
  var data = JSON.parse(body).map(function(x) { return x[0]})

  var synth = jsynth(master, instrument(data,'Downtown.Passengers'))
  synth.connect(master.destination)
})
