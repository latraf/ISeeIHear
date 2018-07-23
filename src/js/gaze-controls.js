/* gaze-controls.js (insert.js kay chris) */

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';

/* ARRROWS AND BUTTONS FOR GAZE UI */

// create arrows
var arrow_up = document.createElement('div');
var arrow_down = document.createElement('div');
var arrow_right = document.createElement('div');
var arrow_left = document.createElement('div');

// create buttons
var click_btn = document.createElement('div');
var focus_btn = document.createElement('div');
var press_btn = document.createElement('div');
var open_btn = document.createElement('div');

arrow_up.setAttribute('id', 'arrow_up');
arrow_down.setAttribute('id', 'arrow_down');
arrow_left.setAttribute('id', 'arrow_left');
arrow_right.setAttribute('id','arrow_right');

click_btn.setAttribute('id', 'click_btn');
focus_btn.setAttribute('id', 'focus_btn');
press_btn.setAttribute('id', 'press_btn');
open_btn.setAttribute('id', 'open_btn');

arrow_up.setAttribute('class', 'arrows');
arrow_down.setAttribute('class', 'arrows');
arrow_left.setAttribute('class', 'arrows');
arrow_right.setAttribute('class', 'arrows');

click_btn.setAttribute('class', 'gaze_btns');
focus_btn.setAttribute('class', 'gaze_btns');
press_btn.setAttribute('class', 'gaze_btns');
open_btn.setAttribute('class', 'gaze_btns');

// append arrows into body of every website
document.body.appendChild(arrow_up);
document.body.appendChild(arrow_down);
document.body.appendChild(arrow_left);
document.body.appendChild(arrow_right);

// append buttons into body of every website
document.body.appendChild(click_btn);
document.body.appendChild(focus_btn);
document.body.appendChild(press_btn);
document.body.appendChild(open_btn);

/* END */

/* INDIVIDUAL FUNCTIONALITIES ON UI ELEMENTS */

var scrolled=0, scroll_var=300;

$(document).ready(function() {

	$('#arrow_down').on('click', scrollDown);
	$('#arrow_up').on('click', scrollUp);
	$('#arrow_left').on('click', previousPage);
	$('#arrow_right').on('click', nextPage);

	$('#click_btn').on('click', clickButton);
	$('#press_btn').on('click', pressButton);
	$('#focus_btn').on('click', focusButton);
	// $('#open_btn').on('click', openButton);

});

function scrollDown() {
	if (document.readyState == "complete") {
		scrolled=scrolled+scroll_var;

		$('html, body').animate({
			scrollTop: scrolled
		});
	}
	else alert('page not loaded yet!');
	
}

function scrollUp() {
	if (document.readyState == "complete") {
		scrolled=scrolled-scroll_var;
					
		$('html, body').animate({
			scrollTop: scrolled
		});
	}
	else alert('page not loaded yet!');
}

function previousPage() {
	if (document.readyState == "complete")
		window.history.back();
	else alert('page not loaded yet!');

}

function nextPage() {
	if (document.readyState == "complete")
		window.history.forward();
	else alert('page not loaded yet!');
}

function clickButton() {
	if (document.readyState == "complete") {
		highlightLinks();
		collectLinks();
	}
	else alert('page not loaded yet!');
}

function pressButton() {
	if (document.readyState == "complete") {
		highlightButtons();
		collectButtons();
	}
	else alert('page not loaded yet!');
}

function focusButton() {
	if (document.readyState == "complete") {
	highlightFields();
	collectFields();
	}
	else alert('page not loaded yet!');
}

function openButton() {
	if (document.readyState == "complete") {
	}
	else alert('page not loaded yet!');
}

/* END */





/* highlightLinks() */
function highlightLinks() {
	$('a:visible').addClass('selectLinks');
}

/* highlightButtons() */
function highlightButtons() {
	$('button:visible').addClass('selectBtns');
	$('input[value]').addClass('selectBtns');
	$('a[class*="btn"]').addClass('selectBtns');
	$('a[class*="button"]').addClass('selectBtns');
	$('input[type="submit"]').addClass('selectBtns');
	$('input[type="reset"]').addClass('selectBtns');
	$('input[type="button"]').addClass('selectBtns');
}

/* highlightFields() */
function highlightFields() {
	$('input[type="text"]').addClass('selectInputs');
	$('input[type="password"]').addClass('selectInputs');
	$('div[role="textbox"]').addClass('selectInputs');
}

/* 	collectLinks() gets all anchor tags and puts it in an array */
function collectLinks() {
	var link_arr = $('a:visible').toArray();

	for(var i=0; i<link_arr.length; i++) {
		var box = link_arr[i].getBoundingClientRect();
		console.log(box);
		if(box.width===0 && box.height===0) {
			link_arr.splice(i, 1);
		}
	}

	// console.log(link_arr);
	console.log(link_arr.length);
}

/* 	collectButtons() gets all elements with button tag and puts it in an array */
function collectButtons() {
	var button_arr = [], temp_arr = [];

	var button_arr1 = $('button:visible').toArray();
	var button_arr2 = $('input[value], input[type="submit"], input[type="reset"], input[type="button"]').toArray();
	var button_arr3 = $('a[class*="btn"], a[class*="button"]').toArray();

	temp_arr = addToArray(temp_arr, button_arr1, button_arr1.length);
	// console.log("button_arr1: " + button_arr1.length);
	temp_arr = addToArray(temp_arr, button_arr2, button_arr2.length);
	// console.log("button_arr2: " + button_arr2.length);
	temp_arr = addToArray(temp_arr, button_arr3, button_arr3.length);
	// console.log("button_arr3: " + button_arr3.length);

	button_arr = jQuery.unique(temp_arr);

	for(var i=0; i<button_arr.length; i++) {
		var box = button_arr[i].getBoundingClientRect();
		console.log(box);
		if(box.width===0 && box.height===0) {
			button_arr.splice(i, 1);
		}
	}

	// console.log("Button Array: ");
	// console.log(button_arr);
	console.log(button_arr.length);
}

/*	collectFields() gets all elements with input tags and puts it in an array */
function collectFields() {
	var field_arr = [], temp_arr = [];

	var field_arr1 = $('input:not(value), input[type="text"], input[type="password"]').toArray();
	var field_arr2 = $('div[role="textbox"]').toArray();

	temp_arr = addToArray(temp_arr, field_arr1, field_arr1.length);
	// console.log("field_arr1: " + field_arr1.length);
	temp_arr = addToArray(temp_arr, field_arr2, field_arr2.length);
	// console.log("field_arr2: " + field_arr2.length);
	
	field_arr = jQuery.unique(temp_arr);
	
	for(var i=0; i<field_arr.length; i++) {
		var box = field_arr[i].getBoundingClientRect();
		console.log(box);
		if(box.width===0 && box.height===0) {
			field_arr.splice(i, 1);
		}

		console.log(field_arr[i]);
	}
	
	// console.log("Field Array: ");
	console.log(field_arr);
	console.log(field_arr.length);
}

function addToArray(orig_array, array, array_length) {

	var temp_array = orig_array;
	for(var i=0, j=array_length; i<j; i++) {
		temp_array.push(array[i]);
	}

	return temp_array;
}