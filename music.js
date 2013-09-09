var master = new webkitAudioContext // require('web-audio-api').AudioContext()
var jsynth = require('jsynth')
var request = require('browser-request')
var tau = Math.PI * 2

function instrument(data,field) {
  return function (time, index, input){
    var i = Math.round(time * 10000)
    var freq = 440 * data[i][field] * 1e8
    console.log(freq)
    return freq
  }
}

// var synth = jsynth(master, sineGenerator); // returns a web audio node
// synth.connect(master.destination)

request('ferry.smooth.json', function(err, res, body){
  var data = JSON.parse(body).map(function(x) { return x[0]})

  var synth = jsynth(master, instrument(data,'Downtown.Passengers'))
  synth.connect(master.destination)
})
