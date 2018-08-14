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
webgazer.setGazeListener(function(data, elapsedTime) {
	// console.log('wg on');
	if(data==null) return;

	var x_prediction = data.x, y_prediction = data.y;
	console.log('x: ' + x_prediction + ' y: ' + y_prediction);

	getData(function(data) {
		// var arrow_down_x = data['arrow_down_x'];
		// var arrow_down_y = data['arrow_down_y'];

		// var arrow_up_x = data['arrow_up_x'];
		// var arrow_up_y = data['arrow_up_y'];

		// var arrow_left_x = data['arrow_left_x'];
		// var arrow_left_y = data['arrow_left_y'];

		// var arrow_right_x = data['arrow_right_x'];
		// var arrow_right_y = data['arrow_right_y'];

		// if((arrow_down_x < x_prediction || x_prediction < (arrow_down_x+100)) && (arrow_down_y < y_prediction || y_prediction < (arrow_down_y+100)))
		// 	console.log('within range');
		// if(arrow_down_y < y_prediction || y_prediction < arrow_down_y)
		// 	console.log('within range y');
	});	
}).begin().showPredictionPoints(true);