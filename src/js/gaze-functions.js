/* webgazerjs.js (chris) */

function setData(data) {
	chrome.storage.local.set(data, function() {
		console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

// $(document).ready(function() { console.log('on'); });

var scrolled=0, scroll_var=300;
var toggled=false;

var data = { 'scrolled' : scrolled, 'arrow_to_buttons' : false };
setData(data);
webgazer
	.setRegression('ridge')
	.setTracker('clmtracker')
	.setGazeListener(function(wg_data, elapsedTime) {
		if(wg_data==null) {
			console.log('null'); 
			return;
		}

		var x_prediction = wg_data.x, y_prediction = wg_data.y;

		getData(function(data) {
			var arrow_down = data['arrow_down'];
			var arrow_up = data['arrow_up'];
			var arrow_left = data['arrow_left'];
			var arrow_right = data['arrow_right'];
			var toggle_btn = data['toggle_btn'];

			var click_btn = data['click_btn'];
			var press_btn = data['press_btn'];
			var focus_btn = data['focus_btn'];
			var open_btn = data['open_btn'];

			if ((arrow_down.x<x_prediction && x_prediction<(arrow_down.x+100)) && (arrow_down.y<y_prediction && y_prediction<(arrow_down.y+100)))
				scrollDown(toggled);
			else if ((arrow_up.x<x_prediction && x_prediction<(arrow_up.x+100)) && (arrow_up.y<y_prediction && y_prediction<(arrow_up.y+100)))
				scrollUp(toggled);
			else if((arrow_left.x<x_prediction && x_prediction<(arrow_left.x+100)) && (arrow_left.y<y_prediction && y_prediction<(arrow_left.y+100)))
				previousPage();
			else if((arrow_right.x<x_prediction && x_prediction<(arrow_right.x+100)) && (arrow_right.y<y_prediction && y_prediction<(arrow_right.y+100)))
				nextPage();
			else if((toggle_btn.x<x_prediction && x_prediction<(toggle_btn.x+100)) && (toggle_btn.y<y_prediction && y_prediction<(toggle_btn.y+100))) {
				toggled=!toggled;
				if(toggled) {
					$('div#toggle_btn:lt(-1)').remove();
					showGazeButtons();
					$('#toggle_btn').css({ 'bottom' : 'initial', 'top' : 0, 'left' : toggle_btn.x, 'top' : arrow_up.y });
					data['toggle_btn'] = { 'x' : toggle_btn.x, 'y' : arrow_up.y }
					setData(data);
				}
				else {
					$('div#toggle_btn:lt(-1)').remove();
					hideGazeButtons();
					$('#toggle_btn').css({ 'top' : 'initial', 'bottom' : 0, 'left' : toggle_btn.x, 'top' : arrow_down.y });
					data['toggle_btn'] = { 'x' : toggle_btn.x, 'y' : arrow_down.y }
					setData(data);
				}
			}
			else if((click_btn.x<x_prediction && x_prediction<(click_btn.x+100)) && (click_btn.y<y_prediction && y_prediction<(click_btn.y+100))) {
				if(toggled) {
					console.log('CLICK');
					data['arrow_to_buttons']=!data['arrow_to_buttons'];
					setData(data);
					console.log('data: ' + data['arrow_to_buttons']);
					if(data['arrow_to_buttons']) clickButton();
					else removeLinks();
				}
			}
			else if((press_btn.x<x_prediction && x_prediction<(press_btn.x+100)) && (press_btn.y<y_prediction && y_prediction<(press_btn.y+100))) {
				if(toggled) {
					console.log('PRESS');
					data['arrow_to_buttons']=!data['arrow_to_buttons'];
					setData(data);
					console.log('data: ' + data['arrow_to_buttons']);
					if(data['arrow_to_buttons']) pressButton();
					else removeButtons();
				}
			}
			else if((focus_btn.x<x_prediction && x_prediction<(focus_btn.x+100)) && (focus_btn.y<y_prediction && y_prediction<(focus_btn.y+100))) {
				if(toggled) {
					console.log('FOCUS');
					data['arrow_to_buttons']=!data['arrow_to_buttons'];
					setData(data);
					console.log('data: ' + data['arrow_to_buttons']);
					if(data['arrow_to_buttons']) focusButton();
					else removeFields();
				}
			}
			else if((open_btn.x<x_prediction && x_prediction<(open_btn.x+100)) && (open_btn.y<y_prediction && y_prediction<(open_btn.y+100))) {
				if(toggled) {
					console.log('OPEN');
				}
			}
		});	
	})
	.begin()
	.showPredictionPoints(true);


window.onbeforeunload = function() {
	webgazer.pause(); 
	// window.localStorage.clear(); //Comment out if you want to save data across different sessions	
	return;
}





function scrollDown(toggled) {
	if(!toggled) {
		document.getElementById('arrow_down').style.opacity='40';
		setTimeout(function(){
			console.log('wait');
			getData(function(data) {
				var scrolled_data = data['scrolled'];
				scrolled_data+=scroll_var;
				$('html, body').animate({ scrollTop: scrolled_data });
		 		var data = { 'scrolled' : scrolled_data }
		 		setData(data);
			});
			document.getElementById('arrow_down').style.opacity='100';
		}, 1000);
		
			// alert('scroll down');

	}
}

function scrollUp(toggled) {
	if(!toggled) {
		getData(function(data) {
			var scrolled_data = data['scrolled'];
			scrolled_data-=scroll_var;
		 	$('html, body').animate({ scrollTop: scrolled_data });
		 	var data = { 'scrolled' : scrolled_data }
		 	setData(data);
		});
	}
}

function previousPage() {
	window.history.back();
}

function nextPage() {
	window.history.forward();
}

function showGazeButtons() {
	document.getElementById('click_btn').style.opacity='100';
	document.getElementById('press_btn').style.opacity='100';
	document.getElementById('focus_btn').style.opacity='100';
	document.getElementById('open_btn').style.opacity='100';

	document.getElementById('arrow_down').style.opacity='0';
	document.getElementById('arrow_up').style.opacity='0';
}

function hideGazeButtons() {
	document.getElementById('click_btn').style.opacity='0';
	document.getElementById('press_btn').style.opacity='0';
	document.getElementById('focus_btn').style.opacity='0';
	document.getElementById('open_btn').style.opacity='0';

	document.getElementById('arrow_down').style.opacity='100';
	document.getElementById('arrow_up').style.opacity='100';
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





// var width = 320;
// var height = 240;
// var topDist = '0px';
// var leftDist = '0px';

// function setup() {

// 	var video = document.getElementById('webgazerVideoFeed');

// 	video.style.display = 'block';
// 	video.style.position = 'absolute';
// 	video.style.top = topDist;
// 	video.style.left = leftDist;
// 	video.width = width;
// 	video.height = height;
// 	video.style.margin = '0px';

// 	webgazer.params.imgWidth = width;
// 	webgazer.params.imgHeight = height;

// 	var overlay = document.createElement('canvas');

// 	overlay.id = 'overlay';
// 	overlay.style.position = 'absolute';
// 	overlay.width = width;
// 	overlay.height = height;
// 	overlay.style.top = topDist;
// 	overlay.style.left = leftDist;
// 	overlay.style.margin = '0px';

// 	document.body.appendChild(overlay);

// 	var cl = webgazer.getTracker().clm;

// 	function drawLoop() {
// 		requestAnimFrame(drawLoop);
// 		overlay.getContext('2d').clearRect(0,0,width,height);

// 		if (cl.getCurrentPosition()) {
// 			cl.draw(overlay);
// 		}
// 	}

// 	drawLoop();
// }

