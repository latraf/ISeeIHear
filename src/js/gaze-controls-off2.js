$(document).ready(function() {
	console.log('gc off');

	$('.arrows').removeClass('arrows');
	$('.gaze_btns').removeClass('gaze_btns');
	$('.gaze_btns').removeAttr('id');

	$('.selectLinks').removeClass('selectLinks');
	$('.selectBtns').removeClass('selectBtns');
	$('.selectInputs').removeClass('selectInputs');

	// webgazer.pause();
	// console.log('wg off');
});