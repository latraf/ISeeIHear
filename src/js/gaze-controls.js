/* gaze-controls.js (insert.js kay chris) */
console.log('gc on');

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
// document.body.appendChild(click_btn);
// document.body.appendChild(focus_btn);
// document.body.appendChild(press_btn);
// document.body.appendChild(open_btn);	

/* END */

var arrow_up_box = document.createElement('div');
var arrow_down_box = document.createElement('div');
var arrow_right_box = document.createElement('div');
var arrow_left_box = document.createElement('div');

arrow_up_box.setAttribute('id', 'arrow_up_box');
arrow_down_box.setAttribute('id', 'arrow_down_box');
arrow_right_box.setAttribute('id', 'arrow_right_box');
arrow_left_box.setAttribute('id', 'arrow_left_box');

arrow_up_box.setAttribute('class', 'horizontal_box');
arrow_down_box.setAttribute('class', 'horizontal_box');
arrow_right_box.setAttribute('class', 'vertical_box');
arrow_left_box.setAttribute('class', 'vertical_box');

// arrow_up_box.id = 'arrow_up_box';
// arrow_up_box.width = '50px';
// arrow_up_box.height = '50px';
// arrow_up_box.style.position = 'fixed';
// arrow_up_box.style.top = '150px';
// arrow_up_box.style.left = '150px';
// arrow_up_box.style.right = '150px';
// arrow_up_box.style.border = '10px dashed transparent';
// arrow_up_box.style.margin = '10px auto';
// // arrow_up_box.style.outline = '1px';
// arrow_up_box.backgroundColor = 'blue';

document.body.appendChild(arrow_up_box);
document.body.appendChild(arrow_down_box);
document.body.appendChild(arrow_right_box);
document.body.appendChild(arrow_left_box);



function setData(data) {
	chrome.storage.local.set(data, function() {
		console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}






/* INDIVIDUAL FUNCTIONALITIES ON UI ELEMENTS */

var toggled=false;
// var scrolled=0, scroll_var=300;

$(document).ready(function() {
	// $('#click_btn').on('click', function() {
	// 	toggled=!toggled;
	// 	if(toggled) clickButton();
	// 	else removeLinks();
	// });

	// $('#press_btn').on('click', function() {
	// 	toggled=!toggled;
	// 	if(toggled) pressButton();
	// 	else removeButtons();
	// });

	// $('#focus_btn').on('click', function() {
	// 	toggled=!toggled;
	// 	if(toggled) focusButton();
	// 	else removeFields();
	// });	

	getPosition();
});

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
	if (document.readyState == "complete") {}
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
	$('input[type="search"]').addClass('selectInputs');
	$('input[type="email"]').addClass('selectInputs');
	$('input[type="password"]').addClass('selectInputs');
	$('div[role="textbox"]').addClass('selectInputs');
}







var link_arr = [], button_arr = [], field_arr = [];

/* 	collectLinks() gets all anchor tags and puts it in an array */
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

/* 	collectButtons() gets all elements with button tag and puts it in an array */
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

/*	collectFields() gets all elements with input tags and puts it in an array */
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






function getPosition() {
	var data = {};
	var arrow_arr = ['arrow_down', 'arrow_up', 'arrow_left', 'arrow_right'];

	arrow_arr.forEach(function(arrow) {
		console.log(document.getElementById(arrow));

		if(document.getElementById(arrow)) {
      var box = document.getElementById(arrow).getBoundingClientRect();
      var x = box.x, y = box.y;

      // console.log('x: ' + x + ' y: ' + y);
      // console.log('x: ' + x + ' y: ' + y);
      // console.log(arrow + ': width: ' + box.width + ' height: '+ box.height);

      var arrow_coordinates = {
      	'x' 			: x, 
      	'y' 			: y,
      	'width' 	: box.width,
      	'height' 	: box.height
      };
      data[arrow] = arrow_coordinates;
		}
	});
	console.log(data);
	setData(data);
}