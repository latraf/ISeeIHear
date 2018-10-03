// alert('voice');
console.log('voice');


/* CHROME STORAGE GETTER/SETTER */
function setData(data) {
	chrome.storage.local.set(data, function() {
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

/* VOICE UI */

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


/* VOICE RECOGNITION */
/* reference: https://www.sitepoint.com/introducing-web-speech-api/ */
window.SpeechRecognition = window.SpeechRecognition  || window.webkitSpeechRecognition || null;

if(window.SpeechRecognition !== null) {
	console.log('has speech recog yaaay');

	var recognizer = new window.SpeechRecognition();
	// var text = document.getElementById('voice_input');

	// recognizer.continuous = true;
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

		console.log('recognized: ' + voice_input.value);
		switch(voice_input.value) {
			case 'scroll up': scrollUp();
												recognizer.stop();
												console.log('stop');
												break;
			case 'scroll down': scrollDown();
												recognizer.stop();
												console.log('stop');
												break;
			case 'previous': previousPage();
												break;
			case 'next': nextPage();
												break;																								
			case 'click': clickButton();
												break;
			case 'focus': focusButton();
												break;
			case 'press': pressButton();
												break;
			case 'open': openButton();
												break;												
		}		
	}

	recognizer.onend = function(event) {
		console.log('onend');
		if(up_toggle) {
			recognizer.start();
			console.log('onend up');
			up_toggle=false;
		}
		else if(down_toggle) {
			recognizer.start();
			console.log('onend down');
			down_toggle=false;
		}
	}

	voice_start_btn.addEventListener('click', function() {
		console.log('start voice recognition');

		try {
			recognizer.start();
			console.log('recog starting');
		}
		catch(ex) {
			console.log(ex.message);
		}
	});


	voice_stop_btn.addEventListener('click', function() {
		console.log('stop voice recognition');

		recognizer.stop();
		console.log('recog stopped');
		voice_input.value = 'VOICE RECOGNITION STOPPED';
		
	});

}

var scrolled=0, scroll_var=300;
var up_toggle=false, down_toggle=false;

/* VOICE INDIVIDUAL FUNCTIONALITIES */

function scrollUp() {
	console.log('up');
	up_toggle=true;
	if(scrolled===0) {
		alert('on top of webpage');
	}
	else if(scrolled>0) {
		scrolled-=scroll_var;
	}
	else {
		console.log('negative');
		scrolled=0;
	}

	$('html, body').animate({ scrollTop: scrolled });
	setTimeout(function() {voice_input.value='';}, 1000);

}

function scrollDown() {
	console.log('down');
	down_toggle=true;
	scrolled+=scroll_var;
	$('html, body').animate({ scrollTop: scrolled });
	setTimeout(function() {voice_input.value='';}, 1000);
}

function previousPage() {

}

function nextPage() {

}

function clickButton() {

}

function focusButton() {

}

function pressButton() {

}

function openButton() {

}