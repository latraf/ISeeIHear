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

// append buttons into main_frame
document.body.appendChild(click_btn);
document.body.appendChild(focus_btn);
document.body.appendChild(press_btn);
document.body.appendChild(open_btn);

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
		$('a').addClass('selectLinks');
		collectLinks();
	});

	// press buttons
	// :button selects <button> elements and <input> elements with type="button"
	$("#press_btn").on("click", function() {
		$('button:visible').addClass('selectBtns');
		$('input[value]').addClass('selectBtns');
		$('a[class*="btn"]').addClass('selectBtns');
		$('a[class*="button"]').addClass('selectBtns');
		$('input[type="submit"]').addClass('selectBtns');
		$('input[type="reset"]').addClass('selectBtns');
		$('input[type="button"]').addClass('selectBtns');
		collectButtons();
	});

	// focus form fields
	$("#focus_btn").on("click", function() {
		$('input:not(value)').addClass('selectInputs');
		$('input[type="text"]').addClass('selectInputs');
		$('input[type="password"]').addClass('selectInputs');
		$('div[role="textbox"]').addClass('selectInputs');
		collectFields();
	});

	// // open link to new window
	// $("#open_btn").on("click", function() {


	// });
});

/* 	collectLinks() gets all anchor tags and puts it in an array 
		To Do More:
			- display links to click
			- click specific link according on user's preference
*/
function collectLinks() {
	var link_arr = document.links;

	// for(var i=0; i<link_arr.length; ++i) {
	// 	console.log(link_arr[i].href);
	// }
}

/* 	collectButtons() gets all elements with button tag and puts it in an array
		To Do More:
			- display filtered buttons to press
			- press specific buttons according on user's preference
			- merge button_arr1 and button_arr2
*/
function collectButtons() {
	var button_arr1 = $('button:visible').toArray();
	var button_arr2 = $('input[value]').toArray();

	// for(var i=0; i<button_arr.length; ++i) {
	// 	console.log(button_arr[i].textContent);
	// 	console.log('type: ' + button_arr[i].getAttribute("type"));
	// 	console.log('value: ' + button_arr[i].getAttribute("value"));
	// }
}

/*	collectFields() gets all elements with input tags and puts it in an array
		To Do More:
			- display input fields to focus on
			- click specific input fields according on user's preference 
			- merge button_arr1 and button_arr2
*/
function collectFields() {
		var field_arr1 = $('input:not(value)').toArray();
		var field_arr2 = $('input[type="text"]').toArray();
		var field_arr3 = $('input[type="password"]').toArray();
		var field_arr4 = $('div[role="textbox"]').toArray();
}

/* END */ 