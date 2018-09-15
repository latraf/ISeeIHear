/* webgazerjs.js (chris) */

function setData(data) {
	chrome.storage.local.set(data, function() {
		// console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

$(document).ready(function() {
	if (document.readyState == "complete") {
		console.log('webgazer resumed'); 
		webgazer.resume();
	}
});

var scrolled=0, scroll_var=300, count=0;
var toggled=false;

var link_selected, button_selected, field_selected, index=0;

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
			else if ((arrow_up.x<x_prediction && x_prediction<(arrow_up.x+100)) && (arrow_up.y<y_prediction && y_prediction<(arrow_up.y+100))) {
				scrollUp(toggled);

				if(data['click_btn_toggled'] && !data['press_btn_toggled'] && !data['focus_btn_toggled']) {
					console.log('select link');
					link_selected.click();
					link_selected.classList.remove('selected');
					index=0;
				}
				else if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {
					console.log('select field');
				}
				else if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {
					console.log('select button');
				}

			}
			else if((arrow_left.x<x_prediction && x_prediction<(arrow_left.x+100)) && (arrow_left.y<y_prediction && y_prediction<(arrow_left.y+100))) {
				previousPage(toggled);
				

				if(data['click_btn_toggled'] && !data['press_btn_toggled'] && !data['focus_btn_toggled']) {
					// put code in pickLinks() in a separate function, put it here and on the right arrow below
					var length=link_arr.length;
					if(index==0) {
						index--;
						link_selected.classList.remove('selected');
						link_selected=link_arr[index];
						link_selected.classList.add('selected');
						console.log(index);
					}
					else if(index>0 && index<length) {
						index--;
						link_selected.classList.remove('selected');
						link_selected=link_arr[index];
						link_selected.classList.add('selected');
						console.log(index);	
					}
					else {
						// console.log(link_selected);
						index=0;
						link_selected=link_arr[index];
						console.log(index);
						// console.log(link_selected);
						alert('start of the list');
					}
				}
				else if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {

				}
				else if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {

				}
			}
			else if((arrow_right.x<x_prediction && x_prediction<(arrow_right.x+100)) && (arrow_right.y<y_prediction && y_prediction<(arrow_right.y+100))) {			
				nextPage(toggled);
				if(data['click_btn_toggled'] && !data['press_btn_toggled'] && !data['focus_btn_toggled']) {
					// put code in pickLinks() in a separate function and put it here
					var length=link_arr.length;
						// make sure na once lang ang pagnext sa array
						if(index==0) {
							index++;
							link_selected.classList.remove('selected');
							link_selected=link_arr[index];
							link_selected.classList.add('selected');
							console.log(index);
						}
						else if(index>0 && index<length) {
							index++;
							link_selected.classList.remove('selected');
							link_selected=link_arr[index];
							link_selected.classList.add('selected');
							console.log(index);
						}
						else {
							// console.log(link_selected);
							index=length-1;
							link_selected=link_arr[index];
							console.log(index);
							// console.log(link_selected);
							alert('end of the list');
						}
				}
				else if(data['focus_btn_toggled'] && !data['click_btn_toggled'] && !data['press_btn_toggled']) {

				}
				else if(data['press_btn_toggled'] && !data['click_btn_toggled'] && !data['focus_btn_toggled']) {

				}
			}
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
					hideGazeButtons();
					showArrows();
					removeLinks();
					removeFields();
					removeButtons();
					$('.selected').removeClass('selected');
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
	console.log('webgazer paused');
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
	// if gaze buttons are shown they will serve as navigation arrows
	else {
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
	// if gaze buttons are shown they will serve as navigation arrows
	else {
	}
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
				hideGazeButtons();
				hideGazeArrows();
				hideGazeCenterButtons();
				document.getElementById('click_btn').style.opacity='0.5';
				document.getElementById('click_prev').style.opacity='1';
				document.getElementById('click_next').style.opacity='1';
				document.getElementById('click_center').style.opacity='1';
				highlightLinks();
				collectLinks();
				link_selected=link_arr[index];
				link_selected.classList.add('selected');
				console.log('link selected');
			}
			else if(data['press_btn_toggled'] || data['focus_btn_toggled']) {
				// alert('click - i cant');
				console.log('click - i cant');
				data['click_btn_toggled'] = false;
			}
			else if(!data['click_btn_toggled']) {
				console.log('click - off');
				showGazeButtons();
				// showGazeArrows();
				// showGazeCenterButtons();
				$('.selected').removeClass('selected');
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
				hideGazeButtons();
				hideGazeArrows();
				hideGazeCenterButtons();
				document.getElementById('press_btn').style.opacity='0.5';
				document.getElementById('press_prev').style.opacity='1';
				document.getElementById('press_next').style.opacity='1';
				document.getElementById('press_center').style.opacity='1';
				highlightButtons();
				collectButtons();
				button_selected=button_arr[index];
				button_selected.classList.add('selected');
				console.log('button selected');
			}
			else if(data['click_btn_toggled'] || data['focus_btn_toggled']) {
				// alert('press - i cant');
				console.log('press - i cant');
				data['press_btn_toggled'] = false;
			}
			else if(!data['press_btn_toggled']) {
				console.log('press - off');
				showGazeButtons();
				// showGazeArrows();
				// showGazeCenterButtons();
				$('.selected').removeClass('selected');
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
				hideGazeButtons();
				hideGazeArrows();
				hideGazeCenterButtons();
				document.getElementById('focus_btn').style.opacity='0.5';
				document.getElementById('focus_prev').style.opacity='1';
				document.getElementById('focus_next').style.opacity='1';
				document.getElementById('focus_center').style.opacity='1';
				highlightFields();
				collectFields();
				field_selected=field_arr[index];
				field_selected.classList.add('selected');
				console.log('field selected');
			}
			else if(data['click_btn_toggled'] || data['press_btn_toggled']) {
				// alert('focus - i cant');
				console.log('focus - i cant');	
				data['focus_btn_toggled'] = false;
			}
			else if(!data['focus_btn_toggled']) {
				console.log('focus - off');	
				showGazeButtons();
				// showGazeArrows();
				// showGazeCenterButtons();
				$('.selected').removeClass('selected');
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
	// console.log(findIndex(link_arr[0].href));
	// console.log(findIndex(link_arr[].href));
	// selected = link_arr[0];
	// console.log(link_arr.indexOf(selected));

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

function showGazeArrows() {
	document.getElementById('click_prev').style.opacity='1';
	document.getElementById('click_next').style.opacity='1';

	document.getElementById('press_prev').style.opacity='1';
	document.getElementById('press_next').style.opacity='1';

	document.getElementById('focus_prev').style.opacity='1';
	document.getElementById('focus_next').style.opacity='1';

	document.getElementById('open_prev').style.opacity='1';
	document.getElementById('open_next').style.opacity='1';
}

function hideGazeArrows() {
	document.getElementById('click_prev').style.opacity='0';
	document.getElementById('click_next').style.opacity='0';

	document.getElementById('press_prev').style.opacity='0';
	document.getElementById('press_next').style.opacity='0';

	document.getElementById('focus_prev').style.opacity='0';
	document.getElementById('focus_next').style.opacity='0';

	document.getElementById('open_prev').style.opacity='0';
	document.getElementById('open_next').style.opacity='0';
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









/* FOR BRANCH gazeButtons1 */