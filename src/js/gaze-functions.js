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

webgazer
	.setRegression('ridge')
	.setTracker('clmtracker')
	.setGazeListener(function(data, elapsedTime) {
		// console.log('wg on');
		if(data==null) return;

		var x_prediction = data.x, y_prediction = data.y;
		// console.log('x: ' + x_prediction + ' y: ' + y_prediction);
		// console.log(elapsedTime);

		getData(function(data) {
				var arrow_down = data['arrow_down'];
				var arrow_up = data['arrow_up'];
				var arrow_left = data['arrow_left'];
				var arrow_right = data['arrow_right'];


				if ((arrow_down.x<x_prediction && x_prediction<(arrow_down.x+100)) && (arrow_down.y<y_prediction && y_prediction<(arrow_down.y+100))) {

					scrolled+=scroll_var;
					console.log('x_prediction: ' + x_prediction + ' y_prediction: ' + y_prediction);
					console.log('arrow_down x: ' + arrow_down.x + ' arrow_down y: ' + arrow_down.y);
				 	console.log('DOWN');

				 	$('html, body').animate({ scrollTop: scrolled });
				}
				else if ((arrow_up.x<x_prediction && x_prediction<(arrow_up.x+100)) && (arrow_up.y<y_prediction && y_prediction<(arrow_up.y+100))) {
					scrolled-=scroll_var;
					console.log('x_prediction: ' + x_prediction + ' y_prediction: ' + y_prediction);
					console.log('arrow_up x: ' + arrow_up.x + ' arrow_up y: ' + arrow_up.y);
				 	console.log('UP');

				 	$('html, body').animate({ scrollTop: scrolled });
				}
				else if((arrow_left.x<x_prediction && x_prediction<(arrow_left.x+100)) && (arrow_left.y<y_prediction && y_prediction<(arrow_left.y+100))) {
					window.history.back();
					console.log('x_prediction: ' + x_prediction + ' y_prediction: ' + y_prediction);
					console.log('arrow_left x: ' + arrow_left.x + ' arrow_left y: ' + arrow_left.y);
				 	console.log('LEFT');
				}
				else if((arrow_right.x<x_prediction && x_prediction<(arrow_right.x+100)) && (arrow_right.y<y_prediction && y_prediction<(arrow_right.y+100))) {
					window.history.forward();
					console.log('x_prediction: ' + x_prediction + ' y_prediction: ' + y_prediction);
					console.log('arrow_right x: ' + arrow_right.x + ' arrow_right y: ' + arrow_right.y);
				 	console.log('RIGHT');
				}
		});	
	})
	.begin()
	.showPredictionPoints(true);

var width = 320;
var height = 240;
var topDist = '0px';
var leftDist = '0px';


    
var setup = function() {

	var video = document.getElementById('webgazerVideoFeed');

	video.style.display = 'block';
	video.style.position = 'absolute';
	video.style.top = topDist;
	video.style.left = leftDist;
	video.width = width;
	video.height = height;
	video.style.margin = '0px';

	webgazer.params.imgWidth = width;
	webgazer.params.imgHeight = height;

	var overlay = document.createElement('canvas');

	overlay.id = 'overlay';
	overlay.style.position = 'absolute';
	overlay.width = width;
	overlay.height = height;
	overlay.style.top = topDist;
	overlay.style.left = leftDist;
	overlay.style.margin = '0px';

	document.body.appendChild(overlay);

	var cl = webgazer.getTracker().clm;

	function drawLoop() {
		requestAnimFrame(drawLoop);
		overlay.getContext('2d').clearRect(0,0,width,height);

		if (cl.getCurrentPosition()) {
			cl.draw(overlay);
		}
	}

	drawLoop();
};