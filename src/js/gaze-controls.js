/* gaze-controls.js (insert.js kay chris) */

// chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';

/* HIGHLIGHTING OF LINKS, BUTTONS, AND TEXTBOXES 

$('a').addClass('selectLinks');
$('button').addClass('selectBtns');
$('input').addClass('selectInputs');

$('body').append('<style>.selectLinks {color: white!important;background: violet!important;} .selectBtns {color: white!important;background: orange!important;} .selectInputs {color: white!important;background: black!important;}</style>');

/* END */

/* ARRROWS AND BUTTONS FOR GAZE UI */

// create arrows
var arrow_up = document.createElement('div');
var arrow_down = document.createElement('div');
var arrow_right = document.createElement('div');
var arrow_left = document.createElement('div');

// create buttons
var click_btn = document.createElement('div');
var focus_btn = document.createElement('div');
var press_btn = document.createElement('div');
var open_btn = document.createElement('div');

arrow_up.setAttribute('id', 'arrow_up');
arrow_down.setAttribute('id', 'arrow_down');
arrow_left.setAttribute('id', 'arrow_left');
arrow_right.setAttribute('id','arrow_right');

click_btn.setAttribute('id', 'click_btn');
focus_btn.setAttribute('id', 'focus_btn');
press_btn.setAttribute('id', 'press_btn');
open_btn.setAttribute('id', 'open_btn');

arrow_up.setAttribute('class', 'arrows');
arrow_down.setAttribute('class', 'arrows');
arrow_left.setAttribute('class', 'arrows');
arrow_right.setAttribute('class', 'arrows');

click_btn.setAttribute('class', 'gaze_btns');
focus_btn.setAttribute('class', 'gaze_btns');
press_btn.setAttribute('class', 'gaze_btns');
open_btn.setAttribute('class', 'gaze_btns');

// append arrows into body of every website
document.body.appendChild(arrow_up);
document.body.appendChild(arrow_down);
document.body.appendChild(arrow_left);
document.body.appendChild(arrow_right);

// append buttons into main_frame
document.body.appendChild(click_btn);
document.body.appendChild(focus_btn);
document.body.appendChild(press_btn);
document.body.appendChild(open_btn);

/* END */

/* GAZE SCROLL UP AND DOWN */

var scrolled=0, scroll_var=300;

$(document).ready(function() {
	$("#arrow_down").on("click", function() {
		scrolled=scrolled+scroll_var;
       
		$("html, body").animate({
			scrollTop: scrolled
		});
	});

	$("#arrow_up").on("click", function() {
		scrolled=scrolled-scroll_var;
				
		$("html, body").animate({
			scrollTop: scrolled
		});
	});

});