$(document).ready(function() {
	console.log('gc off');

	$('.arrows').remove();
	$('.gaze_btns').remove();
	// $('.gaze_btns').removeAttr('id');

	$('.selectLinks').removeClass('selectLinks');
	$('.selectBtns').removeClass('selectBtns');
	$('.selectInputs').removeClass('selectInputs');
	$('div#toggle_btn').remove();

	// webgazer.clearGazeListener();
	webgazer.end();
	// console.log('wg off');
});