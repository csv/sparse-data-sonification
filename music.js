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

/*
var master = new (webkitAudioContext || AudioContext) // require('web-audio-api').AudioContext()
var jsynth = require('jsynth')
var request = require('browser-request')
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

console.log(tones)
var tuned = tune(tones, {tempo: 8});

function instrument(data,field) {
  return function (time, index, input){
    var i = index % data.length
    var x = tuned(Math.round(data[i][field] * 1e8))
    console.log(x)
    return x
  }
}

request('ferry.smooth.json', function(err, res, body){
  var data = JSON.parse(body).map(function(x) { return x[0]})

  var synth = jsynth(master, instrument(data,'Downtown.Passengers'))
  synth.connect(master.destination)
})
*/
