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

arrow_up.setAttribute('class', 'arrows');
arrow_down.setAttribute('class', 'arrows');
arrow_left.setAttribute('class', 'arrows');
arrow_right.setAttribute('class', 'arrows');

click_btn.setAttribute('class', 'gaze_btns');
focus_btn.setAttribute('class', 'gaze_btns');
press_btn.setAttribute('class', 'gaze_btns');
open_btn.setAttribute('class', 'gaze_btns');

arrow_up.setAttribute('id', 'arrow_up');
arrow_down.setAttribute('id', 'arrow_down');
arrow_left.setAttribute('id', 'arrow_left');
arrow_right.setAttribute('id','arrow_right');

click_btn.setAttribute('id', 'click_btn');
focus_btn.setAttribute('id', 'focus_btn');
press_btn.setAttribute('id', 'press_btn');
open_btn.setAttribute('id', 'open_btn');

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





/* FOR BRANCH gazeButtons1 */

// next and previous for every gaze button
var click_next = document.createElement('div');
var click_prev = document.createElement('div');
var click_center = document.createElement('div');
var focus_next = document.createElement('div');
var focus_prev = document.createElement('div');
var focus_center = document.createElement('div');
var press_next = document.createElement('div');
var press_prev = document.createElement('div');
var press_center = document.createElement('div');
var open_next = document.createElement('div');
var open_prev = document.createElement('div');
var open_center = document.createElement('div');

click_next.setAttribute('class', 'gaze_btns1');
click_prev.setAttribute('class', 'gaze_btns1');
focus_next.setAttribute('class', 'gaze_btns1');
focus_prev.setAttribute('class', 'gaze_btns1');
press_next.setAttribute('class', 'gaze_btns1');
press_prev.setAttribute('class', 'gaze_btns1');
open_next.setAttribute('class', 'gaze_btns1');
open_prev.setAttribute('class', 'gaze_btns1');

click_center.setAttribute('class', 'center_btns');
focus_center.setAttribute('class', 'center_btns');
press_center.setAttribute('class', 'center_btns');
open_center.setAttribute('class', 'center_btns');

click_next.classList.add('gaze_next');
click_prev.classList.add('gaze_prev');
focus_next.classList.add('gaze_next');
focus_prev.classList.add('gaze_prev');
press_next.classList.add('gaze_next');
press_prev.classList.add('gaze_prev');
open_next.classList.add('gaze_next');
open_prev.classList.add('gaze_prev');

click_next.setAttribute('id', 'click_next');
click_prev.setAttribute('id', 'click_prev');
focus_next.setAttribute('id', 'focus_next');
focus_prev.setAttribute('id', 'focus_prev');
press_next.setAttribute('id', 'press_next');
press_prev.setAttribute('id', 'press_prev');
open_next.setAttribute('id', 'open_next');
open_prev.setAttribute('id', 'open_prev');

click_center.setAttribute('id', 'click_center');
focus_center.setAttribute('id', 'focus_center');
press_center.setAttribute('id', 'press_center');
open_center.setAttribute('id', 'open_center');

// append gazeButtons1 into body
document.body.appendChild(click_next);
document.body.appendChild(click_prev);
document.body.appendChild(focus_next);
document.body.appendChild(focus_prev);
document.body.appendChild(press_next);
document.body.appendChild(press_prev);
document.body.appendChild(open_next);
document.body.appendChild(open_prev);

document.body.appendChild(click_center);
document.body.appendChild(focus_center);
document.body.appendChild(press_center);
document.body.appendChild(open_center);

/* END */





/* INDIVIDUAL FUNCTIONALITIES ON UI ELEMENTS */

var scrolled=0, scroll_var=300;

$(document).ready(function() {

	// scroll down
	$("#arrow_down").on("click", function() {
		scrolled=scrolled+scroll_var;
       
		$("html, body").animate({
			scrollTop: scrolled
		});
	});

	// scroll up
	$("#arrow_up").on("click", function() {
		scrolled=scrolled-scroll_var;
				
		$("html, body").animate({
			scrollTop: scrolled
		});
	});

	// back page
	$("#arrow_left").on("click", function() {
		window.history.back();
	});

	// forward page
	$("#arrow_right").on("click", function() {
		window.history.forward();
	});

	// click links 
	$("#click_btn").on("click", function() {
		highlightLinks();
		collectLinks();
		pickLinks();
	});

	// press buttons
	$("#press_btn").on("click", function() {
		highlightButtons();
		collectButtons();
		pickButtons();
	});

	// focus form fields
	$("#focus_btn").on("click", function() {
		highlightFields();
		collectFields();
		pickFields();
	});

	// // open links to new window
	// $("#open_btn").on("click", function() {


	// });
});

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
	$('input:not(value)').addClass('selectInputs');
	$('input[type="text"]').addClass('selectInputs');
	$('input[type="password"]').addClass('selectInputs');
	$('div[role="textbox"]').addClass('selectInputs');
}

var link_arr = [], button_arr = [], field_arr = [];

/* 	collectLinks() gets all anchor tags and puts it in an array 
**		To Do More:
**		- display links to click
**		- click specific link according on user's preference
*/
function collectLinks() {
	link_arr = $('a:visible').toArray();
	// for(var i=0; i<link_arr.length; ++i) {
	// 	console.log(link_arr[i].href);
	// }
	console.log("Link Array: ");
	console.log(link_arr);
}

/* 	collectButtons() gets all elements with button tag and puts it in an array
**		To Do More:
**		- display filtered buttons to press
**		- press specific buttons according on user's preference
**		- subtract array of fields in array of buttons
*/
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
	console.log("Button Array: ");
	console.log(button_arr);
}

/*	collectFields() gets all elements with input tags and puts it in an array
**		To Do More:
**		- display input fields to focus on
**		- click specific input fields according on user's preference 
*/
function collectFields() {
	var temp_arr = [];

	var field_arr1 = $('input:not(value), input[type="text"], input[type="password"]').toArray();
	var field_arr2 = $('div[role="textbox"]').toArray();

	temp_arr = addToArray(temp_arr, field_arr1, field_arr1.length);
	// console.log("field_arr1: " + field_arr1.length);
	temp_arr = addToArray(temp_arr, field_arr2, field_arr2.length);
	// console.log("field_arr2: " + field_arr2.length);

	field_arr = jQuery.unique(temp_arr);
	console.log("Field Array: ");
	console.log(field_arr);
}

function addToArray(orig_array, array, array_length) {

	var temp_array = orig_array;
	for(var i=0, j=array_length; i<j; i++) {
		temp_array.push(array[i]);
	}

	return temp_array;
}





/* FOR BRANCH gazeButtons1 */

function pickLinks() {
	console.log("links");
	var i=0;

	$('#click_next').on('click', function() {
		if(i==0) {
			console.log("click next if " + i);
			link_arr[i].classList.add('selected');
			i++;
		}
		else if(i>0 && i<link_arr.length) {
			console.log("click next elseif " + i);
			link_arr[i-1].classList.remove('selected');
			link_arr[i].classList.add('selected');
			i++;
		}
		else {
			alert("end of the list");
		}
	});

	$('#click_prev').on('click', function() {
		if(i==(link_arr.length-1)) {
			console.log("click prev if " + i);
			link_arr[i].classList.add('selected');
			i--;
		}
		else if(i>0 && i<link_arr.length) {
			i--;
			console.log("click prev elseif " + i);
			link_arr[i+1].classList.remove('selected');
			link_arr[i].classList.add('selected');
		}
		else {
			alert("start of the list");
		}
	});

	$('#click_center').on('click', function() {
		console.log("click link")
		var coor = getCoordinates(link_arr[i]);
		console.log(coor);
		link_arr[i].click();
	});
}


function pickButtons() {
	console.log("buttons");	
	var i=0;

	$('#press_next').on('click', function() {
		if(i==0) {
			console.log("press next if " + i);
			button_arr[i].classList.add('selected');
			i++;
		}
		else if(i>0 && i<button_arr.length) {
			console.log("press next elseif " + i);
			button_arr[i-1].classList.remove('selected');
			button_arr[i].classList.add('selected');
			i++;
		}
		else {
			alert("end of the list");
		}
	});

	$('#press_prev').on('click', function() {
		if(i==(button_arr.length-1)) {
			console.log("press prev if " + i);
			button_arr[i].classList.add('selected');
			i--;
		}
		else if(i>0 && i<button_arr.length) {
			i--;
			console.log("press prev elseif " + i);
			button_arr[i+1].classList.remove('selected');
			button_arr[i].classList.add('selected');
		}
		else {
			alert("start of the list");
		}
	});

	$('#press_center').on('click', function() {
		console.log("press button")
		var coor = getCoordinates(button_arr[i]);
		console.log(coor);
		button_arr[i].click();
	});
}


function pickFields() {
	console.log("fields");

	var i=0;

	$('#focus_next').on('click', function() {
		if(i==0) {
			console.log("focus next if " + i);
			field_arr[i].classList.add('selected');
			i++;
		}
		else if(i>0 && i<field_arr.length) {
			console.log("focus next elseif " + i);
			field_arr[i-1].classList.remove('selected');
			field_arr[i].classList.add('selected');
			i++;
		}
		else {
			alert("end of the list");
		}
	});

	$('#focus_prev').on('click', function() {
		if(i==(field_arr.length-1)) {
			console.log("focus prev if " + i);
			field_arr[i].classList.add('selected');
			i--;
		}
		else if(i>0 && i<field_arr.length) {
			i--;
			console.log("focus prev elseif " + i);
			field_arr[i+1].classList.remove('selected');
			field_arr[i].classList.add('selected');
		}
		else {
			alert("start of the list");
		}
	});

	$('#focus_center').on('click', function() {
		console.log("focus button")
		field_arr[i].focus();
	});
}


function getCoordinates(element) {
	var box = element.getBoundingClientRect();
	var top_coordinate = box.top + pageYOffset;
	var left_coordinate = box.left + pageXOffset;

	return {
		top: top_coordinate,
		left: left_coordinate
	}
}


/* END */