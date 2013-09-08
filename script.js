var master = new webkitAudioContext();

var jsynth = require('jsynth')
  , tau = Math.PI * 2
  , frequency = 555
;

var sineGenerator = function (time, index, input){
  return Math.sin(time * tau * frequency)
}

var synth = jsynth(master, sineGenerator); // returns a web audio node

synth.connect(master.destination)
