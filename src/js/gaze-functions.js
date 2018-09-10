/* webgazerjs.js (chris) */

function setData(data) {
	chrome.storage.local.set(data, function() {
		// console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

// $(document).ready(function() { console.log('on'); });

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
				previousPage(toggled);
			else if((arrow_right.x<x_prediction && x_prediction<(arrow_right.x+100)) && (arrow_right.y<y_prediction && y_prediction<(arrow_right.y+100)))
				nextPage(toggled);
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
					// setTimeout(function() {
						console.log('CLICK');
						data['arrow_to_buttons']=!data['arrow_to_buttons'];
						setData(data);
						// console.log('data: ' + data['arrow_to_buttons']);
					// }, 1000);
						if(data['arrow_to_buttons']) clickButton();
						else removeLinks();
				}
			}
			else if((press_btn.x<x_prediction && x_prediction<(press_btn.x+100)) && (press_btn.y<y_prediction && y_prediction<(press_btn.y+100))) {
				if(toggled) {
					// setTimeout(function() {
						console.log('PRESS');
						data['arrow_to_buttons']=!data['arrow_to_buttons'];
						setData(data);
						// console.log('data: ' + data['arrow_to_buttons']);
					// }, 1000);
						if(data['arrow_to_buttons']) pressButton();
						else removeButtons();
				}
			}
			else if((focus_btn.x<x_prediction && x_prediction<(focus_btn.x+100)) && (focus_btn.y<y_prediction && y_prediction<(focus_btn.y+100))) {
				if(toggled) {
					// setTimeout(function() {
						console.log('FOCUS');
						data['arrow_to_buttons']=!data['arrow_to_buttons'];
						setData(data);
						// console.log('data: ' + data['arrow_to_buttons']);
					// }, 1000);
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
	if(!toggled) {
		document.getElementById('arrow_left').style.opacity='0.5';
		setTimeout(function() {
			// console.log('wait');
			window.history.back();
			document.getElementById('arrow_left').style.opacity='1';
		}, 1000);
	}
	// if gaze buttons are shown they will serve as navigation arrows
	else {
	}
}

function nextPage() {
	// if arrows are shown
	if(!toggled) {
		document.getElementById('arrow_right').style.opacity='0.5';
		setTimeout(function() {
			// console.log('wait');
			window.history.forward();
			document.getElementById('arrow_right').style.opacity='1';
		}, 1000);
	}
	// if gaze buttons are shown they will serve as navigation arrows
	else {
	}
}

function showGazeButtons() {
	document.getElementById('click_btn').style.opacity='1';
	document.getElementById('press_btn').style.opacity='1';
	document.getElementById('focus_btn').style.opacity='1';
	document.getElementById('open_btn').style.opacity='1';

	document.getElementById('click_prev').style.opacity='1';
	document.getElementById('click_next').style.opacity='1';
	document.getElementById('click_center').style.opacity='1';

	document.getElementById('press_prev').style.opacity='1';
	document.getElementById('press_next').style.opacity='1';
	document.getElementById('press_center').style.opacity='1';

	document.getElementById('focus_prev').style.opacity='1';
	document.getElementById('focus_next').style.opacity='1';
	document.getElementById('focus_center').style.opacity='1';

	document.getElementById('open_prev').style.opacity='1';
	document.getElementById('open_next').style.opacity='1';
	document.getElementById('open_center').style.opacity='1';

	document.getElementById('arrow_down').style.opacity='0';
	document.getElementById('arrow_up').style.opacity='0';
}

function hideGazeButtons() {
	document.getElementById('click_btn').style.opacity='0';
	document.getElementById('press_btn').style.opacity='0';
	document.getElementById('focus_btn').style.opacity='0';
	document.getElementById('open_btn').style.opacity='0';

	document.getElementById('click_prev').style.opacity='0';
	document.getElementById('click_next').style.opacity='0';
	document.getElementById('click_center').style.opacity='0';

	document.getElementById('press_prev').style.opacity='0';
	document.getElementById('press_next').style.opacity='0';
	document.getElementById('press_center').style.opacity='0';

	document.getElementById('focus_prev').style.opacity='0';
	document.getElementById('focus_next').style.opacity='0';
	document.getElementById('focus_center').style.opacity='0';

	document.getElementById('open_prev').style.opacity='0';
	document.getElementById('open_next').style.opacity='0';
	document.getElementById('open_center').style.opacity='0';

	document.getElementById('arrow_down').style.opacity='1';
	document.getElementById('arrow_up').style.opacity='1';
}





var data = {
	'click_btn_toggled' : false, 
	'press_btn_toggled' : false, 
	'focus_btn_toggled' : false 
};
setData(data);

function clickButton() {
	if (document.readyState == "complete") {
		getData(function(data) {
			data['click_btn_toggled']=!data['click_btn_toggled'];

			console.log('click: ' + data['click_btn_toggled']);
			console.log('press: ' + data['press_btn_toggled']);
			console.log('focus: ' + data['focus_btn_toggled']);

			if(data['click_btn_toggled'] && !data['press_btn_toggled'] && !data['focus_btn_toggled']) {
				console.log('click - on');
				document.getElementById('click_btn').style.opacity='0.5';
				highlightLinks();
				collectLinks();
			}
			else if(data['press_btn_toggled'] || data['focus_btn_toggled']) {
				alert('click - i cant');
				console.log('click - i cant');
				data['click_btn_toggled'] = false;
			}
			else if(!data['click_btn_toggled']) {
				console.log('click - off');
				document.getElementById('click_btn').style.opacity='1';
			}

			setData(data);
		});
	}
	else alert('page not loaded yet!');
}


function pressButton() {
	if (document.readyState == "complete") {
		getData(function(data) {
			data['press_btn_toggled']=!data['press_btn_toggled'];

			console.log('click: ' + data['click_btn_toggled']);
			console.log('press: ' + data['press_btn_toggled']);
			console.log('focus: ' + data['focus_btn_toggled']);

			if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {
				console.log('press - on');
				document.getElementById('press_btn').style.opacity='0.5';
				highlightButtons();
				collectButtons();
			}
			else if(data['click_btn_toggled'] || data['focus_btn_toggled']) {
				alert('press - i cant');
				console.log('press - i cant');
				data['press_btn_toggled'] = false;
			}
			else if(!data['press_btn_toggled']) {
				console.log('press - off');
				document.getElementById('press_btn').style.opacity='1';
			}

			setData(data);
		});
	}
	else alert('page not loaded yet!');
}


function focusButton() {
	if (document.readyState == "complete") {
		getData(function(data) {
			data['focus_btn_toggled']=!data['focus_btn_toggled'];

			console.log('click: ' + data['click_btn_toggled']);
			console.log('press: ' + data['press_btn_toggled']);
			console.log('focus: ' + data['focus_btn_toggled']);

			if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {
				console.log('focus - on');	
				document.getElementById('focus_btn').style.opacity='0.5';	
				highlightFields();
				collectFields();
			}
			else if(data['click_btn_toggled'] || data['press_btn_toggled']) {
				alert('focus - i cant');
				console.log('focus - i cant');	
				data['focus_btn_toggled'] = false;
			}
			else if(!data['focus_btn_toggled']) {
				console.log('focus - off');	
				document.getElementById('focus_btn').style.opacity='1';
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