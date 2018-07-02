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

var main_frame = document.createElement( 'div' );
main_frame.setAttribute('class', 'main_frame');

var div = document.createElement('div');
// var btnForm = document.createElement('form');
// var btn = document.createElement('input');

// append elements into the main_frame
document.body.appendChild( main_frame);
main_frame.appendChild(div);
// div.appendChild(btnForm);
// btnForm.appendChild( btn );

//set attributes for div
// div.id = 'myDivId';
div.setAttribute('id', 'myDivId');
//set attributes for btnForm
// btnForm.setAttribute('id', 'myButtonFormId');
// btnForm.action = '';

//set attributes for btn
//"btn.removeAttribute( 'style' );
// btn.setAttribute('id', 'myButtonId');
// btn.type = 'button';
// btn.value = 'hello';
// btn.style.position = 'absolute';
// btn.style.top = '50%';
// btn.style.left = '50%';

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

// append arrows into main_frame
main_frame.appendChild(arrow_up);
main_frame.appendChild(arrow_down);
main_frame.appendChild(arrow_left);
main_frame.appendChild(arrow_right);

// append buttons into main_frame
main_frame.appendChild(click_btn);
main_frame.appendChild(focus_btn);
main_frame.appendChild(press_btn);
main_frame.appendChild(open_btn);