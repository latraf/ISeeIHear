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

	/* 
		- puts recognized word in textbox when start button is clicked
		- is only done once so after calling functions in the switchcase, the recognizer stops so that
			it can be started again in recognizer.onend()
	*/
	recognizer.onresult = function(event) {
		console.log('onresult');

		for(var i=event.resultIndex; i<event.results.length; i++) {
			if(event.results[i].isFinal) voice_input.value = event.results[i][0].transcript;
			else voice_input.value += event.results[i][0].transcript;
		}

		/* when user says the keyword, it calls the corresponding function */
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

	/* after calling recognizer.stop() above, it will go here to start the recognizer and check if the 
			toggle for each function is true, if true it will set the said toggle to false,
			else, it will empty the textbox.
	*/
	recognizer.onend = function(event) {
		getData(function(data) {

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
			else if(prev_toggle) {
				recognizer.start();
				console.log('onend prev');
				prev_toggle=false;
			}
			else if(next_toggle) {
				recognizer.start();
				console.log('onend next');
				next_toggle=false;
			}
			// when voice_end_btn is clicked/data['voice_toggle'] is false
			else if(!data['voice_toggle']) {}
			else {
				recognizer.start();
				console.log('else');
				text.value='';
			}
		});
	}

	/* voice_toggle is for making sure that voice recognition is still running even if 
			the webpage is reloaded. */
	voice_start_btn.addEventListener('click', function() {
		console.log('start voice recognition');
		var data = { 'voice_toggle' : true };
		setData(data);

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
		var data = { 'voice_toggle' : false };
		setData(data);

		recognizer.stop();
		console.log('recog stopped');
		voice_input.value = 'VOICE RECOGNITION STOPPED';
	});


}

/* upon every reload if a webpage, it checks voice_toggle,
		if true, it clicks the start button thus starting voice recognition
*/
$(document).ready(function() {
	getData(function(data) {
		console.log('voice toggle: ' + data['voice_toggle']);
		if(data['voice_toggle']) voice_start_btn.click();
	});
});


/* VOICE INDIVIDUAL FUNCTIONALITIES */

var scrolled=0, scroll_var=300;
var up_toggle=false, down_toggle=false, prev_toggle=false, next_toggle=false;
var click_toggle=false, focus_toggle=false, press_toggle=false;


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
	setTimeout(function() {voice_input.value='';}, 3000);

}

function scrollDown() {
	console.log('down');
	down_toggle=true;
	scrolled+=scroll_var;
	$('html, body').animate({ scrollTop: scrolled });
	setTimeout(function() {voice_input.value='';}, 3000);
}

function previousPage() {
	console.log('prev');
	prev_toggle=true;
	window.history.back();
	// setTimeout(function() {voice_input.value='';}, 3000);
	var data = { 'voice_toggle' : true };
	setData(data);
}

function nextPage() {
	console.log('next');
	next_toggle=true;
	window.history.forward();
	// setTimeout(function() {voice_input.value='';}, 3000);
	var data = { 'voice_toggle' : true };
	setData(data);
}

var link_labels = [];

function clickButton() {
	link_labels = createLabelArray(link_arr);
	console.log(link_labels);
	click_toggle=!click_toggle;
	if(click_toggle) {
		highlightLinks();
		collectLinks();
		addLabels(link_arr, link_labels);
	}
	else {
		removeLinks();
		removeLabels();
	}
}

function focusButton() {
	focus_toggle=!focus_toggle;
	if(focus_toggle) {
		highlightFields();
		collectFields();
	}
	else removeFields();
}

function pressButton() {
	press_toggle=!press_toggle;
	if(press_toggle) {
		highlightButtons();
		collectButtons();
	}
	else removeButtons();
}

function openButton() {

}








/* HIGHLIGHTING AND COLLECTING SELECTED DOM ELEMENTS */

function highlightLinks() {
	$('a:visible').addClass('selectLinks');
}


function highlightButtons() {
	$('button:visible').addClass('selectBtns');
	$('input[value]').addClass('selectBtns');
	$('a[class*="btn"]').addClass('selectBtns');
	$('a[class*="button"]').addClass('selectBtns');
	$('input[type="submit"]').addClass('selectBtns');
	$('input[type="reset"]').addClass('selectBtns');
	$('input[type="button"]').addClass('selectBtns');
}


function highlightFields() {
	$('input[type="text"]').addClass('selectInputs');
	$('input[type="search"]').addClass('selectInputs');
	$('input[type="email"]').addClass('selectInputs');
	$('input[type="password"]').addClass('selectInputs');
	$('div[role="textbox"]').addClass('selectInputs');
}



var link_arr = [], button_arr = [], field_arr = [];


function collectLinks() {
	link_arr = $('a:visible').toArray();

	for(var i=0; i<link_arr.length; i++) {
		var box = link_arr[i].getBoundingClientRect();

		if(box.width===0 && box.height===0) {
			link_arr.splice(i, 1);
		}
	}
	console.log(link_arr.length);
}


function collectButtons() {
	var temp_arr = [];

	var button_arr1 = $('button:visible').toArray();
	var button_arr2 = $('input[value], input[type="submit"], input[type="reset"], input[type="button"]').toArray();
	var button_arr3 = $('a[class*="btn"], a[class*="button"]').toArray();

	temp_arr = addToArray(temp_arr, button_arr1, button_arr1.length);
	temp_arr = addToArray(temp_arr, button_arr2, button_arr2.length);
	temp_arr = addToArray(temp_arr, button_arr3, button_arr3.length);

	button_arr = jQuery.unique(temp_arr);

	for(var i=0; i<button_arr.length; i++) {
		var box = button_arr[i].getBoundingClientRect();

		if(box.width===0 && box.height===0) {
			button_arr.splice(i, 1);
		}
	}
	console.log(button_arr.length);
}


function collectFields() {
	var temp_arr = [];

	var field_arr1 = $('input:not(value), input[type="text"], input[type="password"]').toArray();
	var field_arr2 = $('div[role="textbox"]').toArray();

	temp_arr = addToArray(temp_arr, field_arr1, field_arr1.length);
	temp_arr = addToArray(temp_arr, field_arr2, field_arr2.length);
	
	// field_arr = jQuery.unique(temp_arr);
	field_arr = temp_arr;
	
	for(var i=0; i<field_arr.length; i++) {
		var box = field_arr[i].getBoundingClientRect();

		if(box.width===0 && box.height===0) {
			field_arr.splice(i, 1);
		}
	}
	console.log(field_arr.length);
}


function addToArray(orig_array, array, array_length) {
	var temp_array = orig_array;

	for(var i=0, j=array_length; i<j; i++) 
		temp_array.push(array[i]);

	return temp_array;
}


function removeLinks() {
	for(var i=0; i<link_arr.length; i++)
		link_arr[i].classList.remove('selectLinks');
}

function removeButtons() {
	for(var i=0; i<button_arr.length; i++)
		button_arr[i].classList.remove('selectBtns');
}

function removeFields() {
	for(var i=0; i<field_arr.length; i++)
		field_arr[i].classList.remove('selectInputs');
}







/* ADDING LABELS TO SELECTED DOM ELEMENTS */ 

function getCoordinates(element) {
	
	if(element == null) console.log('element is null');
	else {
		var box = element.getBoundingClientRect();
		var top_coordinate = box.top + pageYOffset;
		var left_coordinate = box.left + pageXOffset;
		var width = box.width;
		var height = box.height;
		var bottom_coordinate = box.bottom + pageYOffset;
		var right_coordinate = box.right + pageXOffset;

		return {
			top: top_coordinate,
			left: left_coordinate,
			right: right_coordinate,
			bottom: bottom_coordinate,
			width: width,
			height: height
		}
	}
}


function createLabelArray(array) {
	var length = array.length;
	var label_arr = [];

	for(var i=0; i<length; i++) {
		var label_div = document.createElement('div');

		label_div.setAttribute('class', 'label');
		label_div.innerHTML = i;
		label_arr.push(label_div);
	}

	return label_arr;
}


function addLabels(array, label_array) {
	var length = array.length;

	for(var i=0; i<length; i++) {
		// console.log(i);
		var coordinates = getCoordinates(array[i]);
		var x = coordinates.right;
		var y = coordinates.top;

		// document.body.appendChild(label_array[i]);
		console.log(label_array[i]);

		label_array[i].style.position = 'absolute';
		label_array[i].style.left = x + 'px';
		label_array[i].style.top = y + 'px';
		label_array[i].style.visibility = 'visible';
		// console.log(label_array[i].style.left + " " + label_array[i].style.top);

	}
}

function removeLabels() {
	$('.label').remove();
}