/*
var master = new (webkitAudioContext || AudioContext)
var jsynth = require('jsynth')
var tune = require('tune')
var teoria = require('teoria')

var tones = []
var notes = ['first', 'second', 'third', 'fourth', 'fifth']
notes.map(function(i) {
  var scale = teoria.note('a').scale('lydian')
  var scaleNote = scale.get(i)
  var newNote = teoria.note(scaleNote.toString())
  var newScale = newNote.scale('lydian').simple()
  newScale.map(function(n){ tones.push(n.toUpperCase()) })
})

var tuned = tune(tones, {tempo: 8});

var synth = jsynth(master, function(t) {
  return tuned(t * 2)
})
synth.connect(master.destination)
*/

var master = new (webkitAudioContext || AudioContext) // require('web-audio-api').AudioContext()
var jsynth = require('jsynth')
var request = require('browser-request')

function instrument(data,field) {
  return function (time, index, input){
    var i = index % data.length
    Math.round(data[i][field] * 1e7)
/*
    var freq = 110 * Math.pow(2, 3) // Math.round(Math.log(data[i][field] * 1e9)) - 4)
    console.log(freq)
*/
  var freq = 880
    return Math.sin(2 * Math.PI * time * freq)
  }
}

request('ferry.smooth.json', function(err, res, body){
  var data = JSON.parse(body).map(function(x) { return x[0]})

  var synth = jsynth(master, instrument(data,'Downtown.Passengers'))
  synth.connect(master.destination)
})
