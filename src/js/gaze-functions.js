/* webgazerjs.js (chris) */

function setData(data) {
	chrome.storage.local.set(data, function() {});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

window.onbeforeunload = function() {
	webgazer.pause();
	console.log('webgazer paused');
	// window.localStorage.clear(); //Comment out if you want to save data across different sessions	
	return;
}

$(document).ready(function() {
	if (document.readyState == "complete") {
		console.log('webgazer resumed'); 
		webgazer.resume();
	}
});

var scrolled=0, scroll_var=300, count=0;
var toggled=false;

var data = { 'scrolled' : scrolled, 'arrow_to_buttons' : false };
setData(data);

webgazer
	.setRegression('ridge')
	.setTracker('clmtracker')
	.setGazeListener(function(wg_data, elapsedTime) {
		if(wg_data==null) {
			// console.log('null'); 
			return;
		}

		var x_prediction = wg_data.x, y_prediction = wg_data.y;
		// createNumPad();

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

			var one = data['one'], two = data['two'], three = data['three'], four = data['four'], 
				five = data['five'], six = data['six'], seven = data['seven'], eight = data['eight'], 
				nine = data['nine'], zero = data['zero'], clear = data['clear'];

			

			if(data['gaze_calibrated']) {
				/* IF USER GAZES ON ARROWS */
				if ((arrow_down.x<x_prediction && x_prediction<(arrow_down.x+100)) && (arrow_down.y<y_prediction && y_prediction<(arrow_down.y+100)))
					scrollDown(toggled);
				else if ((arrow_up.x<x_prediction && x_prediction<(arrow_up.x+100)) && (arrow_up.y<y_prediction && y_prediction<(arrow_up.y+100))) {
					scrollUp(toggled);
					if(toggled) {
						if(data['click_btn_toggled'] && !data['press_btn_toggled'] && !data['focus_btn_toggled']) {
							var label_num = $('#click_input').val();
							if(label_num) link_arr[label_num].click();
							else alert('click - no input');
						}
						else if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {
							var label_num = $('#focus_input').val();
							if(label_num) field_arr[label_num].focus();
							else alert('focus - no input');
						}
						else if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {
							var label_num = $('#press_input').val();
							if(label_num) button_arr[label_num].click();
							else alert('press - no input');
						}
					}
				}
				else if((arrow_left.x<x_prediction && x_prediction<(arrow_left.x+100)) && (arrow_left.y<y_prediction && y_prediction<(arrow_left.y+100)))
					previousPage(toggled);
				else if((arrow_right.x<x_prediction && x_prediction<(arrow_right.x+100)) && (arrow_right.y<y_prediction && y_prediction<(arrow_right.y+100)))
					nextPage(toggled);
				/* IF USER GAZES ON THE TOGGLE BUTTON */
				else if((toggle_btn.x<x_prediction && x_prediction<(toggle_btn.x+100)) && (toggle_btn.y<y_prediction && y_prediction<(toggle_btn.y+100))) {
					toggled=!toggled;
					if(toggled) {
						$('div#toggle_btn:lt(-1)').remove();
						showGazeButtons();
						hideArrows();
						$('#toggle_btn').css({ 'bottom' : 'initial', 'top' : 0, 'left' : toggle_btn.x, 'top' : arrow_up.y });
						data['toggle_btn'] = { 'x' : toggle_btn.x, 'y' : arrow_up.y }
						setData(data);
					}
					else {
						$('div#toggle_btn:lt(-1)').remove();
						hideGazeUI();
						showArrows();
						removeLinks(); removeFields(); removeButtons(); removeLabels();
						$('.selected').removeClass('selected');
						$('.num_div').css('opacity', 0);
						$('#toggle_btn').css({ 'top' : 'initial', 'bottom' : 0, 'left' : toggle_btn.x, 'top' : arrow_down.y });
						data['toggle_btn'] = { 'x' : toggle_btn.x, 'y' : arrow_down.y }
						var data = {
							'click_btn_toggled' : false, 
							'press_btn_toggled' : false, 
							'focus_btn_toggled' : false 
						};
						setData(data);
					}
				}
				/* IF USER GAZES ON GAZE BUTTONS */
				else if((click_btn.x<x_prediction && x_prediction<(click_btn.x+100)) && (click_btn.y<y_prediction && y_prediction<(click_btn.y+100))) {
					// if toggle button is toggled
					if(toggled) {
						console.log('CLICK');
						data['arrow_to_buttons']=!data['arrow_to_buttons'];
						setData(data);

						// if gaze is within the area of click button
						if(data['arrow_to_buttons']) clickButton();
						else {
							removeLinks();
							hideGazeUI();
							showGazeButtons();
						}
					}
				}
				else if((press_btn.x<x_prediction && x_prediction<(press_btn.x+100)) && (press_btn.y<y_prediction && y_prediction<(press_btn.y+100))) {
					if(toggled) {
						console.log('PRESS');
						data['arrow_to_buttons']=!data['arrow_to_buttons'];
						setData(data);

						if(data['arrow_to_buttons']) pressButton();
						else {
							removeButtons();
							hideGazeUI();
							showGazeButtons();
						}
					}
				}
				else if((focus_btn.x<x_prediction && x_prediction<(focus_btn.x+100)) && (focus_btn.y<y_prediction && y_prediction<(focus_btn.y+100))) {
					if(toggled) {
						console.log('FOCUS');
						data['arrow_to_buttons']=!data['arrow_to_buttons'];
						setData(data);
						
						if(data['arrow_to_buttons']) focusButton();
						else {
							removeFields();
							hideGazeUI();
							showGazeButtons();
						}
					}
				}
				else if((open_btn.x<x_prediction && x_prediction<(open_btn.x+100)) && (open_btn.y<y_prediction && y_prediction<(open_btn.y+100))) {
					if(toggled) {
						console.log('OPEN');
					}
				}
				/* IF USER GAZES ON KEYPAD DIVS */
				else if((one.x<x_prediction && x_prediction<(one.x+30)) && (one.y<y_prediction && y_prediction<(one.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(1);
						else count_num=0;
					}
				}
				else if((two.x<x_prediction && x_prediction<(two.x+30)) && (two.y<y_prediction && y_prediction<(two.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(2);
						else count_num=0;
					}
				}
				else if((three.x<x_prediction && x_prediction<(three.x+30)) && (three.y<y_prediction && y_prediction<(three.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(3);
						else count_num=0;
					}
				}
				else if((four.x<x_prediction && x_prediction<(four.x+30)) && (four.y<y_prediction && y_prediction<(four.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(4);
						else count_num=0;
					}
				}
				else if((five.x<x_prediction && x_prediction<(five.x+30)) && (five.y<y_prediction && y_prediction<(five.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(5);
						else count_num=0;
					}
				}
				else if((six.x<x_prediction && x_prediction<(six.x+30)) && (six.y<y_prediction && y_prediction<(six.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(6);
						else count_num=0;
					}
				}
				else if((seven.x<x_prediction && x_prediction<(seven.x+30)) && (seven.y<y_prediction && y_prediction<(seven.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(7);
						else count_num=0;
					}
				}
				else if((eight.x<x_prediction && x_prediction<(eight.x+30)) && (eight.y<y_prediction && y_prediction<(eight.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(8);
						else count_num=0;
					}
				}
				else if((nine.x<x_prediction && x_prediction<(nine.x+30)) && (nine.y<y_prediction && y_prediction<(nine.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(9);
						else count_num=0;
					}
				}
				else if((zero.x<x_prediction && x_prediction<(zero.x+30)) && (zero.y<y_prediction && y_prediction<(zero.y+30))) {
					var count_num=0;
					if(toggled) {
						count_num++;
						if(count_num==1) printNum(0);
						else count_num=0;
					}
				}
				else if((clear.x<x_prediction && x_prediction<(clear.x+30)) && (clear.y<y_prediction && y_prediction<(clear.y+30)))
					// function for clearing the textbox of a particular gaze function 
					if(toggled) clearInput();
			}
		});	
	})
	.begin()
	.showPredictionPoints(true);





/* ARROW FUNCTIONS */

function scrollDown(toggled) {
	if(!toggled) {
		document.getElementById('arrow_down').style.opacity='0.5';
		getData(function(data) {
			var scrolled_data = data['scrolled'];
			scrolled_data+=scroll_var;
			setTimeout(function() {
				// console.log('wait');
				$('html, body').animate({ scrollTop: scrolled_data });
		 		var data = { 'scrolled' : scrolled_data }
		 		setData(data);
				document.getElementById('arrow_down').style.opacity='1';
			}, 1000);
		});
	}
}

function scrollUp(toggled) {
	if(!toggled) {
		document.getElementById('arrow_up').style.opacity='0.5';
		getData(function(data) {
			var scrolled_data = data['scrolled'];
			scrolled_data-=scroll_var;
			setTimeout(function() {
				// console.log('wait');
		 		$('html, body').animate({ scrollTop: scrolled_data });
		 		var data = { 'scrolled' : scrolled_data }
		 		setData(data);
		 		document.getElementById('arrow_up').style.opacity='1';
		 	}, 1000);
		});
	}
}

function previousPage(toggled) {
	// if arrows are shown
	var count=0;	// makes sure na once lang magbback page
	if(!toggled) {
		document.getElementById('arrow_left').style.opacity='0.5';
		count++;
		if(count==1) window.history.back();
		else count=0;
		setTimeout(function() {	
			document.getElementById('arrow_left').style.opacity='1';
		}, 1000);
	}
}

function nextPage() {
	// if arrows are shown
	var count=0;	// makes sure na once lang magfforward page
	if(!toggled) {
		document.getElementById('arrow_right').style.opacity='0.5';
		count++;
		if(count==1) window.history.forward();
		else count=0;
		setTimeout(function() {
			document.getElementById('arrow_right').style.opacity='1';
		}, 1000);
	}
}




/* GAZE BUTTON FUNCTIONS */

var data = {
	'click_btn_toggled' : false, 
	'press_btn_toggled' : false, 
	'focus_btn_toggled' : false 
};
setData(data);



function clickButton() {
	if (document.readyState == "complete") {
		var link_labels = [];
		link_labels = createLabelArray(link_arr);

		getData(function(data) {
			data['click_btn_toggled']=!data['click_btn_toggled'];

			if(data['click_btn_toggled'] && !data['press_btn_toggled'] && !data['focus_btn_toggled']) {
				console.log('click - on');
				hideGazeButtons();
				document.getElementById('click_btn').style.opacity='0.5';
				document.getElementById('click_center').style.opacity='1';
				document.getElementById('click_input').style.opacity='1';
				highlightLinks();
				addLabels(link_arr, link_labels);
				collectLinks();
				showNumPad();
			}
			else if(data['press_btn_toggled'] || data['focus_btn_toggled']) {
				console.log('click - i cant');
				data['click_btn_toggled'] = false;
			}
			else if(!data['click_btn_toggled']) {
				console.log('click - off');
				showGazeButtons();
				removeLabels();
				hideNumPad();
			}

			setData(data);
		});
	}
	else alert('page not loaded yet!');
}


function pressButton() {
	if (document.readyState == "complete") {
		var button_labels = [];
		button_labels = createLabelArray(button_arr);

		getData(function(data) {
			data['press_btn_toggled']=!data['press_btn_toggled'];

			if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {
				console.log('press - on');
				hideGazeButtons();
				document.getElementById('press_btn').style.opacity='0.5';
				document.getElementById('press_center').style.opacity='1';
				document.getElementById('press_input').style.opacity='1';
				highlightButtons();
				addLabels(button_arr, button_labels);
				collectButtons();
				showNumPad();
			}
			else if(data['click_btn_toggled'] || data['focus_btn_toggled']) {
				console.log('press - i cant');
				data['press_btn_toggled'] = false;
			}
			else if(!data['press_btn_toggled']) {
				console.log('press - off');
				showGazeButtons();
				removeLabels();
				hideNumPad();
			}

			setData(data);
		});
	}
	else alert('page not loaded yet!');
}


function focusButton() {
	if (document.readyState == "complete") {
		var field_labels = [];
		field_labels = createLabelArray(field_arr);

		getData(function(data) {
			data['focus_btn_toggled']=!data['focus_btn_toggled'];

			if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {
				console.log('focus - on');	
				hideGazeButtons();
				document.getElementById('focus_btn').style.opacity='0.5';
				document.getElementById('focus_center').style.opacity='1';
				document.getElementById('focus_input').style.opacity='1';
				highlightFields();
				addLabels(field_arr, field_labels);
				collectFields();
				showNumPad();
			}
			else if(data['click_btn_toggled'] || data['press_btn_toggled']) {
				console.log('focus - i cant');	
				data['focus_btn_toggled'] = false;
			}
			else if(!data['focus_btn_toggled']) {
				console.log('focus - off');	
				showGazeButtons();
				removeLabels();
				hideNumPad();
			}

			setData(data);
		});
	}
	else alert('page not loaded yet!');
}


function openButton() {
	if (document.readyState == "complete") {}
	else alert('page not loaded yet!');
}




/* HIGHLIGHT AND COLLECTION OF DOM ELEMENTS FOR GAZE BUTTONS */

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





function hideGazeUI() {
	hideGazeButtons();
	hideGazeCenterButtons();
	hideGazeTextboxes();
}

function showGazeButtons() {
	document.getElementById('click_btn').style.opacity='1';
	document.getElementById('press_btn').style.opacity='1';
	document.getElementById('focus_btn').style.opacity='1';
	document.getElementById('open_btn').style.opacity='1';
}

function hideGazeButtons() {
	document.getElementById('click_btn').style.opacity='0';
	document.getElementById('press_btn').style.opacity='0';
	document.getElementById('focus_btn').style.opacity='0';
	document.getElementById('open_btn').style.opacity='0';
}

function showArrows() {
	document.getElementById('arrow_up').style.opacity='1';
	document.getElementById('arrow_down').style.opacity='1';
	document.getElementById('arrow_left').style.opacity='1';
	document.getElementById('arrow_right').style.opacity='1';
}

function hideArrows() {
	document.getElementById('arrow_up').style.opacity='0';
	document.getElementById('arrow_down').style.opacity='0';
	document.getElementById('arrow_left').style.opacity='0';
	document.getElementById('arrow_right').style.opacity='0';
}

function showGazeCenterButtons() {
	document.getElementById('click_center').style.opacity='1';
	document.getElementById('press_center').style.opacity='1';
	document.getElementById('focus_center').style.opacity='1';
	document.getElementById('open_center').style.opacity='1';
}

function hideGazeCenterButtons() {
	document.getElementById('click_center').style.opacity='0';
	document.getElementById('press_center').style.opacity='0';
	document.getElementById('focus_center').style.opacity='0';
	document.getElementById('open_center').style.opacity='0';
}

function showGazeTextboxes() {
	document.getElementById('click_input').style.opacity='1';
	document.getElementById('press_input').style.opacity='1';
	document.getElementById('focus_input').style.opacity='1';
	document.getElementById('open_input').style.opacity='1';
}

function hideGazeTextboxes() {
	document.getElementById('click_input').style.opacity='0';
	document.getElementById('press_input').style.opacity='0';
	document.getElementById('focus_input').style.opacity='0';
	document.getElementById('open_input').style.opacity='0';
}

function showNumPad() {
	$('.num_div').css('opacity', 1);
}

function hideNumPad() {
	$('.num_div').css('opacity', 0);
}




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

function setCoordinates(element, x, y, x_add, y_add) {
	element.style.position = 'absolute';
	element.style.left = (x+x_add) + 'px';
	element.style.top = (y+y_add) + 'px';
	element.style.visibility = 'visible';

	return element;
}



/* LABELS FOR EVERY HIGHLIGHTED ELEMENT ON DOM */

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

		document.body.appendChild(label_array[i]);

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


/* FOR THE KEYPAD - LABEL SELECTION */

function printNum(number) {
	// console.log(document.getElementById('one').innerHTML);

	getData(function(data) {
		// if click gaze button is toggled put input in 'click_input'
		if(data['click_btn_toggled'] && !data['focus_btn_toggled'] && !data['press_btn_toggled']) {
			var click_input = document.getElementById('click_input');
			click_input.value = click_input.value + number;
		}
		// if focus gaze button is toggled put input in 'focus_input'
		else if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {
			var focus_input = document.getElementById('focus_input');
			focus_input.value = focus_input.value + number;
		}
		// if press gaze button is toggled put input in 'press_input'
		else if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {
			var press_input = document.getElementById('press_input');
			press_input.value = press_input.value + number;
		}
	
	});


}

// function for clearing the textbox of a particular gaze function 
function clearInput() {
	getData(function(data) {
		// if click gaze button is toggled clear 'click_input'
		if(data['click_btn_toggled'] && !data['focus_btn_toggled'] && !data['press_btn_toggled']) {
			var click_input = document.getElementById('click_input');
			click_input.value = "";

		}
		// if focus gaze button is toggled clear 'focus_input'
		else if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {
			var focus_input = document.getElementById('focus_input');
			focus_input.value = "";
		}
		// if press gaze button is toggled clear 'press_input'
		else if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {
			var press_input = document.getElementById('press_input');
			press_input.value = "";
		}
	});
}