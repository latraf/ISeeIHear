// alert('voice');
console.log('voice');

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';

var voice_input = document.createElement('input');
var voice_start_btn = document.createElement('button');
var voice_stop_btn = document.createElement('button');

voice_input.setAttribute('id', 'voice_input');
voice_input.type = 'text';
voice_input.disabled = true;

voice_start_btn.setAttribute('id', 'voice_start_btn');
voice_start_btn.setAttribute('class', 'voice_btn');

voice_stop_btn.setAttribute('id', 'voice_stop_btn');
voice_stop_btn.setAttribute('class', 'voice_btn');

document.body.appendChild(voice_input);
document.body.appendChild(voice_start_btn);
document.body.appendChild(voice_stop_btn);

/* reference: https://www.sitepoint.com/introducing-web-speech-api/ */
window.SpeechRecognition = window.SpeechRecognition  || window.webkitSpeechRecognition || null;

if(window.SpeechRecognition !== null) {
	console.log('has speech recog yaaay');

	var recognizer = new window.SpeechRecognition();
	// var text = document.getElementById('voice_input');

	recognizer.continuous = true;
	// recognizer.start();

	// text.value = '';

	// for(var i=event.resultIndex; i<event.results.length; i++) {
	// 	text.value = event.results[i][0].transcript;
	// }
	// recognizer.onstart = function(event) {
	// 	voice_input.value = 'onstart';
	// 	console.log(event.resultIndex);
	// 	// recognizer.start();
	// 	// console.log(event.results.length);
	// }

	recognizer.onresult = function(event) {
		console.log('onresult');


		for(var i=event.resultIndex; i<event.results.length; i++) {
			if(event.results[i].isFinal) {
				voice_input.value = event.results[i][0].transcript;
			}
			else {
				voice_input.value += event.results[i][0].transcript
			}
		}

		if(voice_input.value) console.log('recognized: ' + voice_input.value);

	// 	recognizer.start();
	}

	voice_start_btn.addEventListener('click', function() {
		console.log('activate voice recognition');

		try {
			recognizer.start();
			console.log('recog starting');
		}
		catch(ex) {
			console.log(ex.message);
		}
	});

}

