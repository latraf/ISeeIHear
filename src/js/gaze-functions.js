/* webgazerjs.js (chris) */

webgazer.setGazeListener(function(data, elapsedTime) {
	if(data==null) return;

	var x_prediction = data.x, y_prediction = data.y;
	console.log('x: ' + x_prediction + 'y: ' + y_prediction);
}).begin();