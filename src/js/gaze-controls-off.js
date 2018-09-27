$(document).ready(function() {
	console.log('gc off');

	// $('.arrows').removeClass('.arrows');
	// $('.gaze_btns').removeClass('.gaze_btns');
	// $('.gaze_btns').removeAttr('id');

	$('div#arrow_up').not('.arrows').remove();
	$('div#arrow_down').not('.arrows').remove();
	$('div#arrow_left').not('.arrows').remove();
	$('div#arrow_right').not('.arrows').remove();

	$('div#arrow_up:lt(-1)').remove();
	$('div#arrow_down:lt(-1)').remove();
	$('div#arrow_left:lt(-1)').remove();
	$('div#arrow_right:lt(-1)').remove();

	$('div#click_btn').not('.gaze_btns').remove();
	$('div#focus_btn').not('.gaze_btns').remove();
	$('div#press_btn').not('.gaze_btns').remove();
	$('div#open_btn').not('.gaze_btns').remove();

	$('div#click_btn:lt(-1)').remove();
	$('div#focus_btn:lt(-1)').remove();
	$('div#press_btn:lt(-1)').remove();
	$('div#open_btn:lt(-1)').remove();

	$('.selectLinks').removeClass('selectLinks');
	$('.selectBtns').removeClass('selectBtns');
	$('.selectInputs').removeClass('selectInputs');

	$('.calibration_btn:lt(-15)').remove();

	// webgazer.pause();
	// console.log('wg off');
});

// $('div#open_btn:not(.gaze_btns)').remove();
// $('div#arrow_down:not(.arrows)').remove();