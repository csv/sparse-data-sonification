var master = new webkitAudioContext // require('web-audio-api').AudioContext()
var jsynth = require('jsynth')
var tau = Math.PI * 2

var sineGenerator = function (time, index, input){
  return Math.sin(time * tau * 440)
}

var synth = jsynth(master, sineGenerator); // returns a web audio node
synth.connect(master.destination)
