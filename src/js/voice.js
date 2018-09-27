// alert('voice');
console.log('voice');

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';

var voice_input = document.createElement('input');
var voice_btn = document.createElement('button');

voice_input.setAttribute('id', 'voice_input');
voice_input.type = 'text';
voice_input.disabled = true;

voice_btn.setAttribute('id', 'voice_btn');

document.body.appendChild(voice_btn);
document.body.appendChild(voice_input);

/* reference: https://www.sitepoint.com/introducing-web-speech-api/ */
window.SpeechRecognition = window.SpeechRecognition  || window.webkitSpeechRecognition || null;

if(window.SpeechRecognition !== null) {
	console.log('has speech recog yaaay');

	var recognizer = new window.SpeechRecognition();
	var text = document.getElementById('voice_input');

	recognizer.continuous = true;

	// recognizer.onstart = function(event) {
	// 	text.value = '';

	// 	for(var i=event.resultIndex; i<event.results.length; i++) {
	// 		text.value = event.results[i][0].transcript;
	// 	}

	// 	recognizer.start();
	// }

}

