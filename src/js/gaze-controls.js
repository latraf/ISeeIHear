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





/* FOR BRANCH gazeButtons2 */

var click_center = document.createElement('div');
var focus_center = document.createElement('div');
var press_center = document.createElement('div');
var open_center = document.createElement('div');

var click_input = document.createElement('input');
var focus_input = document.createElement('input');
var press_input = document.createElement('input');
var open_input = document.createElement('input');

var click_btn2 = document.createElement('div');
var focus_btn2 = document.createElement('div');
var press_btn2 = document.createElement('div');
var open_btn2 = document.createElement('div');

click_center.setAttribute('class', 'center_btns');
focus_center.setAttribute('class', 'center_btns');
press_center.setAttribute('class', 'center_btns');
open_center.setAttribute('class', 'center_btns');

click_center.setAttribute('id', 'click_center');
focus_center.setAttribute('id', 'focus_center');
press_center.setAttribute('id', 'press_center');
open_center.setAttribute('id', 'open_center');

click_input.setAttribute('class', 'inputs');
focus_input.setAttribute('class', 'inputs');
press_input.setAttribute('class', 'inputs');
open_input.setAttribute('class', 'inputs');

click_input.setAttribute('id', 'click_input');
focus_input.setAttribute('id', 'focus_input');
press_input.setAttribute('id', 'press_input');
open_input.setAttribute('id', 'open_input');

click_input.type = 'text';
focus_input.type = 'text';
press_input.type = 'text';
open_input.type = 'text';

click_btn2.setAttribute('class', 'center_btns');
focus_btn2.setAttribute('class', 'center_btns');
press_btn2.setAttribute('class', 'center_btns');
open_btn2.setAttribute('class', 'center_btns');

click_btn2.setAttribute('id', 'click_btn2');
focus_btn2.setAttribute('id', 'focus_btn2');
press_btn2.setAttribute('id', 'press_btn2');
open_btn2.setAttribute('id', 'open_btn2');

document.body.appendChild(click_center);
document.body.appendChild(focus_center);
document.body.appendChild(press_center);
document.body.appendChild(open_center);

document.body.appendChild(click_input);
document.body.appendChild(focus_input);
document.body.appendChild(press_input);
document.body.appendChild(open_input);

document.body.appendChild(click_btn2);
document.body.appendChild(focus_btn2);
document.body.appendChild(press_btn2);
document.body.appendChild(open_btn2);

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
		pickLinks();
	}
	else alert('page not loaded yet!');
}

function pressButton() {
	if (document.readyState == "complete") {
		highlightButtons();
		collectButtons();
		pickButtons();
	}
	else alert('page not loaded yet!');
}

function focusButton() {
	if (document.readyState == "complete") {
		highlightFields();
		collectFields();
		pickFields();
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

var link_arr = [], button_arr = [], field_arr = [];

/* 	collectLinks() gets all anchor tags and puts it in an array */
function collectLinks() {
	link_arr = $('a:visible').toArray();

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
	var temp_arr = [];

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
	var temp_arr = [];

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





/* FOR BRANCH gazeButtons2 */

function getCoordinates(element) {
	
	if(element == null) {
		alert('element is null');
	}
	else{
		var box = element.getBoundingClientRect();
		var top_coordinate = box.top + pageYOffset;
		var left_coordinate = box.left + pageXOffset;
		var width = box.width;
		var height = box.height;
		var bottom_coordinate =box.bottom + pageYOffset;
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

function addLabels(array, label_array, color) {
	var length = array.length;

	for(var i=0; i<length; i++) {
		console.log(i);
		var coordinates = getCoordinates(array[i]);
		var x = coordinates.right;
		var y = coordinates.top;

		document.body.appendChild(label_array[i]);

		label_array[i].style.position = 'absolute';
		label_array[i].style.left = x + 'px';
		label_array[i].style.top = y + 'px';
		label_array[i].style.visibility = 'visible';
		console.log(label_array[i].style.left + " " + label_array[i].style.top);

	}
}

function pickLinks() {
	console.clear();
	console.log('links');

	var link_labels = [];

	link_labels = createLabelArray(link_arr);
	console.log(link_labels);

	$('#click_center').on('click', function() {
		// console.log('click center');
		addLabels(link_arr, link_labels);
		console.log(link_arr);
	});


	$('#click_btn2').on('click', function() {
		var label_num = $('#click_input').val();
		if(label_num.length != 0) {
			console.log(label_num);
			link_arr[label_num].classList.remove('selectLinks');
			link_arr[label_num].classList.add('selected');
			console.log(link_arr[label_num]);

			setTimeout(function () {
				console.log('clicked');
				link_arr[label_num].click();
			}, 3000);
		}
		else alert('no input');
	});
}

function pickButtons() {
	console.clear();
	console.log('buttons');

	var button_labels = [];

	button_labels = createLabelArray(button_arr);
	console.log(button_labels);

	$('#press_center').on('click', function() {
		// console.log('click center');
		addLabels(button_arr, button_labels);
		console.log(button_arr);
	});

	$('#press_btn2').on('click', function() {
		var label_num = $('#press_input').val();
		if(label_num.length != 0) {
			console.log(label_num);
			button_arr[label_num].classList.remove('selectBtns');
			button_arr[label_num].classList.add('selected');
			console.log(button_arr[label_num]);

			setTimeout(function () {
				console.log('clicked');
				button_arr[label_num].click();
			}, 3000);
		}
		else alert('no input');
	});
}

function pickFields() {
	console.clear();
	console.log('fields');

	var field_labels = [];

	field_labels = createLabelArray(field_arr);
	console.log(field_labels);

	$('#focus_center').on('click', function() {
		// console.log('click center');
		addLabels(field_arr, field_labels);
		console.log(field_arr);
	});

	$('#focus_btn2').on('click', function() {
		var label_num = $('#focus_input').val();
		if(label_num.length != 0) {
			console.log(label_num);
			field_arr[label_num].classList.remove('selectInputs');
			field_arr[label_num].classList.add('selected');
			console.log(field_arr[label_num]);

			setTimeout(function () {
				console.log('focused');
				field_arr[label_num].classList.remove('selected');
				field_arr[label_num].focus();
				field_arr[label_num].classList.add('selectInputs');
			}, 3000);
		}
		else alert('no input');
	});
}