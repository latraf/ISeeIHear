$(document).ready(function() {
	$('.arrows').removeClass('arrows');
	$('.gaze_btns').removeClass('.gaze_btns');
	$('.gaze_btns').removeAttr('id');

	$('#arrow_up:not(.arrows)').remove();
	$('#arrow_down:not(.arrows)').remove();
	$('#arrow_left:not(.arrows)').remove();
	$('#arrow_right:not(.arrows)').remove();

	$('#click_btn:not(.gaze_btns)').remove();
	$('#focus_btn:not(.gaze_btns)').remove();
	$('#press_btn:not(.gaze_btns)').remove();
	$('#open_btn:not(.gaze_btns)').remove();
});