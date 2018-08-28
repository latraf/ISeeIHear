/* webgazerjs.js (chris) */

function setData(data) {
	chrome.storage.local.set(data, function() {
		console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

$(document).ready(function() { console.log('on'); });

var scrolled=0, scroll_var=300;
var toggled=false;

var data = { 'scrolled' : scrolled };
setData(data);
webgazer
	.setRegression('ridge')
	.setTracker('clmtracker')
	.setGazeListener(function(wg_data, elapsedTime) {
		// console.log('wg on');
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
				// alert('hello');
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
		getData(function(data) {
			var scrolled_data = data['scrolled'];
			scrolled_data+=scroll_var;
			$('html, body').animate({ scrollTop: scrolled_data });
	 		console.log('DOWN' + scrolled_data);
	 		var data = { 'scrolled' : scrolled_data }
	 		setData(data);
		});
	}
}

function scrollUp(toggled) {
	if(!toggled) {
		getData(function(data) {
			var scrolled_data = data['scrolled'];
			scrolled_data-=scroll_var;
		 	$('html, body').animate({ scrollTop: scrolled_data });
		 	console.log('UP' + scrolled_data);
		 	var data = { 'scrolled' : scrolled_data }
		 	setData(data);
		});
	}
}

function previousPage() {
	window.history.back();
 	console.log('LEFT');
}

function nextPage() {
	window.history.forward();
 	console.log('RIGHT');
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