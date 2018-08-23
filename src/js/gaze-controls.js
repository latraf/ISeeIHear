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

document.body.appendChild(arrow_up_box);
document.body.appendChild(arrow_down_box);
document.body.appendChild(arrow_right_box);
document.body.appendChild(arrow_left_box);

var toggle_btn = document.createElement('div');
var toggle_btn_box = document.createElement('div');

toggle_btn.setAttribute('id', 'toggle_btn');
toggle_btn_box.setAttribute('id', 'toggle_btn_box');

document.body.appendChild(toggle_btn);
document.body.appendChild(toggle_btn_box);

var calibration_div = document.createElement('div');
calibration_div.setAttribute('class', 'calibration_div');
document.body.appendChild(calibration_div);







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
var points_calibrated=0, calibration_points = {};

$(document).ready(function() {
	/* pre data collection */
	setArrowPosition();
	createPoints();
	$('.calibration_btn:lt(-15)').remove();
	setBoxCoordinates();
	$('#toggle_btn:lt(-1)').remove();

	/* data collection */
	// 1. show help modal
	// insert help modal code here

	getData(function(data) {
		// alert(data['gaze_calibrated']);
		if(!data['gaze_calibrated']) {
			
			// 2. hide arrows, show data points
			plotPoints();
			$('#toggle_btn:lt(-1)').remove();
			hideArrows();
			
			// 3. collect data by clicking the points 
			// source: https://github.com/brownhci/WebGazer/blob/master/www/js/calibration.js
			$('.calibration_btn').on('click', function() {

				var id = $(this).attr('id');
				if (!calibration_points[id]) { // initialises if not done
					calibration_points[id]=0;
				}

				calibration_points[id]++; // increments values

				if (calibration_points[id]==5) { // turns yellow after 5 clicks
					$(this).css('background-color','yellow');
					$(this).prop('disabled', true); 
					points_calibrated++;
				} 
				else if (calibration_points[id]<5) {
					// gradually increase the opacity of calibration points when clicked
					var opacity = 0.2*calibration_points[id]+0.2;
					$(this).css('opacity',opacity);
				}

				// 4. after clicking all data points, hide points, show arrows
				if (points_calibrated >= 15){ // last point is calibrated
					alert('data collected');
					$(".calibration_btn").hide();
					showArrows();
					var data = { 'gaze_calibrated' : true };
					setData(data);
					alert('Webgazer Calibrated');
				}
			});
		}

	});

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

	
});











function setArrowPosition() {
	var data = {};
	var arrow_arr = ['arrow_down', 'arrow_up', 'arrow_left', 'arrow_right', 'toggle_btn'];

	arrow_arr.forEach(function(arrow) {
		console.log(document.getElementById(arrow));

		if(document.getElementById(arrow)) {
      var box = document.getElementById(arrow).getBoundingClientRect();
      // var x = box.x, y = box.y;

      var arrow_coordinates = { 'x' : box.x, 'y' : box.y, 'height' : box.height, 'width' : box.width };
      data[arrow] = arrow_coordinates;
		}
	});
	setData(data);

	// var box2 = arrow_up_box.getBoundingClientRect();
}

var point_arr = [];

function createPoints() {
	var points_length = 15;
	for(var i=0; i<points_length; i++) {
		var point =  document.createElement('input');
		var id = 'Pt' + (i+1);
		// console.log(id);
		point.setAttribute('type', 'button');
		point.setAttribute('class', 'calibration_btn');
		point.setAttribute('id', id);

		point.style.width = '20px';
		point.style.height = '20px';

		point_arr.push(point);
		calibration_div.appendChild(point);
	}
}

function setBoxCoordinates() {
	var data = {};
	var box_arr = ['arrow_up_box', 'arrow_down_box', 'arrow_left_box', 'arrow_right_box', 'toggle_btn_box'];

	box_arr.forEach(function(bounding_box) {
		console.log(document.getElementById(bounding_box));

		if(document.getElementById(bounding_box)) {
      var box = document.getElementById(bounding_box).getBoundingClientRect();
      // var x = box.x, y = box.y;

      var box_data = { 
      	'x' : box.x, 
      	'y' : box.y,
      	'height' : box.height,
      	'width' : box.width 
      };
      data[bounding_box] = box_data;
		}
	});
	setData(data);
	// console.log(data);
}

function plotPoints() {
	var box_data;
	var left_coor = {}, right_coor = {}, top_coor = {}, bottom_coor = {}, center_coor = {};
	getData(function(data) {
		box_data = data['arrow_left_box'];
		arrow_data = data['arrow_left'];

		left_coor = { 'x' : arrow_data.x, 'y'	: (arrow_data.y+(arrow_data.height/2))-10 };
		top_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : box_data.y };
		bottom_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : (box_data.y+box_data.height) };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt1')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt2')	setPointCoordinates(point, top_coor.x, top_coor.y);
			if(point.id === 'Pt3') 	setPointCoordinates(point, bottom_coor.x, bottom_coor.y);
		});


		box_data = data['arrow_right_box'];
		arrow_data = data['arrow_right'];

		right_coor = { 'x' : (box_data.x+box_data.width)-30, 'y' : (arrow_data.y+(arrow_data.height/2))-10 };
		top_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : box_data.y };
		bottom_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : (box_data.y+box_data.height) };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt4')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt5')	setPointCoordinates(point, top_coor.x, top_coor.y);
			if(point.id === 'Pt6') 	setPointCoordinates(point, bottom_coor.x, bottom_coor.y);
		});


		box_data = data['arrow_up_box'];
		arrow_data = data['arrow_up'];

		left_coor = { 'x' : box_data.x, 'y'	: (box_data.y+arrow_data.height) };
		right_coor = { 'x' : (box_data.x+box_data.width)-10, 'y'	: (box_data.y+arrow_data.height) };
		center_coor = { 'x' : (arrow_data.x+(arrow_data.width/2))-10, 'y' : (box_data.y+arrow_data.height) };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt7')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt8')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt9')	setPointCoordinates(point, center_coor.x, center_coor.y);
		});


		box_data = data['arrow_down_box'];
		arrow_data = data['arrow_down'];

		left_coor = { 'x' : box_data.x, 'y'	: box_data.y };
		right_coor = { 'x' : (box_data.x+box_data.width)-10, 'y'	: box_data.y };
		center_coor = { 'x' : (arrow_data.x+(arrow_data.width/2))-10, 'y' : box_data.y };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt10')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt11')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt12')	setPointCoordinates(point, center_coor.x, center_coor.y);
		});


		box_data = data['toggle_btn_box'];
		arrow_data = data['toggle_btn'];

		left_coor = { 'x' : arrow_data.x-70, 'y'	: (arrow_data.y+(arrow_data.height/2))-10 };
		right_coor = { 'x' : (arrow_data.x+arrow_data.width)+50, 'y'	: (arrow_data.y+(arrow_data.height/2))-10 };
		center_coor = { 'x' : (arrow_data.x+(arrow_data.width/2))-10, 'y' : arrow_data.y-50 };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt13')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt14')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt15')	setPointCoordinates(point, center_coor.x, center_coor.y);
		});
	});
}

function setPointCoordinates(point, x, y) {
	point.style.left = x+'px';
	point.style.top = y+'px';
}

function hideArrows() {
	$('.arrows').css('opacity', 0);
	$('#toggle_btn').css('opacity', 0);
	toggle_btn.style.display = 'none';
}

function showArrows() {
	$('.arrows').css('opacity', 100);
	$('#toggle_btn').css('opacity', 100);
	toggle_btn.style.display = 'block';
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






