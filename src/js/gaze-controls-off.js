
$(document).ready(function() {
	// $('.arrows').removeClass('arrows');
	// $('.gaze_btns').removeClass('.gaze_btns');
	// $('.gaze_btns').removeAttr('id');
	console.log('gc off');
	$('div#arrow_up:lt(-1)').remove();
	$('div#arrow_down:lt(-1)').remove();
	$('div#arrow_left:lt(-1)').remove();
	$('div#arrow_right:lt(-1)').remove();

	$('div#click_btn:lt(-1)').remove();
	$('div#focus_btn:lt(-1)').remove();
	$('div#press_btn:lt(-1)').remove();
	$('div#open_btn:lt(-1)').remove();
});

// $('div#open_btn:not(.gaze_btns)').remove();
// $('div#arrow_down:not(.arrows)').remove();