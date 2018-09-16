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

click_btn.style.opacity='0';
focus_btn.style.opacity='0';
press_btn.style.opacity='0';
open_btn.style.opacity='0';

click_btn.prepend('Click!');
focus_btn.prepend('Focus!');
press_btn.prepend('Press!');
open_btn.prepend('Open!');

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






function setData(data) {
	chrome.storage.local.set(data, function() {});
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
	setPosition();
	createPoints();
	$('.calibration_btn:lt(-12)').remove();
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
			toggle_btn.style.opacity = '0';
			
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
				if (points_calibrated >= 12){ // last point is calibrated
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
});


function setPosition() {
	var data = {};
	var element_arr = ['arrow_down', 'arrow_up', 'arrow_left', 'arrow_right', 'toggle_btn', 'click_btn', 'press_btn', 'focus_btn', 'open_btn'];

	element_arr.forEach(function(element) {
		// console.log(document.getElementById(element));

		if(document.getElementById(element)) {
      var box = document.getElementById(element).getBoundingClientRect();
      var element_coordinates = { 'x' : box.x, 'y' : box.y, 'height' : box.height, 'width' : box.width };
      data[element] = element_coordinates;
		}
	});
	setData(data);
}

var point_arr = [];

function createPoints() {
	var points_length = 12;
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
		// console.log(document.getElementById(bounding_box));

		if(document.getElementById(bounding_box)) {
      var box = document.getElementById(bounding_box).getBoundingClientRect();

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
	$('.arrows').css('opacity', 1);
	$('#toggle_btn').css('opacity', 1);
	toggle_btn.style.display = 'block';
}






/* FOR BRANCH gazeButtons2 */

function getCoordinates(element) {
	
	if(element == null) alert('element is null');
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

function createNumPad(textbox, class_name) {
	console.log('num pad');

	var length = 12, num_rows = 4, num_cols = 3;
	var num_arr = new Array(num_rows);

	for(var i=0; i<num_rows; i++) {
		num_arr[i] = new Array(num_cols);

		for(var j=0; j<num_cols; j++) {
			var num_div = document.createElement('div');
			num_div.setAttribute('class', 'num_div');
			num_div.classList.add(class_name);
			
			num_arr[i][j] = num_div;
			document.body.appendChild(num_arr[i][j]);
		}
	}
	console.log(num_arr);
	displayNumPad(num_arr, textbox);
}

function displayNumPad(array, textbox) {
	var num_rows = 4, num_cols = 3;
	var coordinates = getCoordinates(textbox);

	var x = coordinates.left;
	var y = coordinates.top;
	// console.log(coordinates);

	// 1, 2, 3
	array[0][0] = setCoordinates(array[0][0], x, y, 20, -80);
	array[0][1] = setCoordinates(array[0][1], x, y, 40, -80);
	array[0][2] = setCoordinates(array[0][2], x, y, 60, -80);

	array[0][0].innerHTML = 1;
	array[0][1].innerHTML = 2;
	array[0][2].innerHTML = 3;

	// 4, 5, 6
	array[1][0] = setCoordinates(array[1][0], x, y, 20, -60);
	array[1][1] = setCoordinates(array[1][1], x, y, 40, -60);
	array[1][2] = setCoordinates(array[1][2], x, y, 60, -60);

	array[1][0].innerHTML = 4;
	array[1][1].innerHTML = 5;
	array[1][2].innerHTML = 6;

	// 7, 8, 9
	array[2][0] = setCoordinates(array[2][0], x, y, 20, -40);
	array[2][1] = setCoordinates(array[2][1], x, y, 40, -40);
	array[2][2] = setCoordinates(array[2][2], x, y, 60, -40);

	array[2][0].innerHTML = 7;
	array[2][1].innerHTML = 8;
	array[2][2].innerHTML = 9;

	// 0 
	array[3][0] = setCoordinates(array[3][0], x, y, 40, -20);
	array[3][1] = setCoordinates(array[3][1], x, y, 60, -20);

	array[3][0].innerHTML = 0;
	array[3][1].innerHTML = '<<';

	array[3][1].classList.add('backspace');

}

function setCoordinates(element, x, y, x_add, y_add) {
	element.style.position = 'absolute';
	element.style.left = (x+x_add) + 'px';
	element.style.top = (y+y_add) + 'px';
	element.style.visibility = 'visible';

	return element;
}

function addLabels(array, label_array) {
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

	$('#click_center').on('click', function() {
		addLabels(link_arr, link_labels);
	});


	$('#click_btn2').on('click', function() {
		var label_num = $('#click_input').val();
		if(label_num.length != 0) {
			link_arr[label_num].classList.remove('selectLinks');
			link_arr[label_num].classList.add('selected');

			setTimeout(function () {
				console.log('clicked');
				link_arr[label_num].classList.remove('selected');
				link_arr[label_num].click();
				link_arr[label_num].classList.add('selectLinks');
			}, 3000);
		}
		else alert('no input');
	});

	click_input.onfocus = function() {
		createNumPad(click_btn2, 'click_num_divs');
		$('.click_num_divs').on('click', function() {
			console.log(this.innerHTML);
			click_input.value = click_input.value + this.innerHTML;
		});

		$('.backspace').on('click', function() {
			click_input.value = "";
		});
	};
}

function pickButtons() {
	console.clear();
	console.log('buttons');

	var button_labels = [];

	button_labels = createLabelArray(button_arr);

	$('#press_center').on('click', function() {
		addLabels(button_arr, button_labels);
	});

	$('#press_btn2').on('click', function() {
		var label_num = $('#press_input').val();
		if(label_num.length != 0) {
			button_arr[label_num].classList.remove('selectBtns');
			button_arr[label_num].classList.add('selected');

			setTimeout(function () {
				console.log('pressed');
				button_arr[label_num].classList.remove('selected');
				button_arr[label_num].click();
				button_arr[label_num].classList.add('selectBtns');
			}, 3000);
		}
		else alert('no input');
	});

	press_input.onfocus = function() {
		createNumPad(press_btn2, 'press_num_divs');

		$('.press_num_divs').on('click', function() {
			console.log(this.innerHTML);
			press_input.value = press_input.value + this.innerHTML;
		});

		$('.backspace').on('click', function() {
			press_input.value = "";
		});
	};
}

function pickFields() {
	console.clear();
	console.log('fields');

	var field_labels = [];

	field_labels = createLabelArray(field_arr);

	$('#focus_center').on('click', function() {
		addLabels(field_arr, field_labels);
	});

	$('#focus_btn2').on('click', function() {
		var label_num = $('#focus_input').val();
		if(label_num.length != 0) {
			field_arr[label_num].classList.remove('selectInputs');
			field_arr[label_num].classList.add('selected');

			setTimeout(function () {
				console.log('focused');
				field_arr[label_num].classList.remove('selected');
				field_arr[label_num].focus();
				field_arr[label_num].classList.add('selectInputs');
			}, 3000);
		}
		else alert('no input');
	});

	focus_input.onfocus = function() {
		createNumPad(focus_btn2, 'focus_num_divs');

		$('.focus_num_divs').on('click', function() {
			console.log(this.innerHTML);
			focus_input.value = focus_input.value + this.innerHTML;
		});

		$('.backspace').on('click', function() {
			focus_input.value = "";
		});
	};
}