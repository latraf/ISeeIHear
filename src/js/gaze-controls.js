/* gaze-controls.js (insert.js kay chris) */

chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);

// selecting links
$('a').addClass('selectLinks');
$('button').addClass('selectBtns');
$('input').addClass('selectInputs');

$('body').append('<style>.selectLinks {color: white!important;background: violet!important;} .selectBtns {color: white!important;background: orange!important;} .selectInputs {color: white!important;background: black!important;}</style>');

var main_frame = document.createElement( 'div' );
main_frame.setAttribute("id", "main_frame");


var div = document.createElement( 'div' );
var btnForm = document.createElement( 'form' );
var btn = document.createElement( 'input' );

//append all elements
document.body.appendChild( main_frame);
main_frame.appendChild(div);
div.appendChild( btnForm );
btnForm.appendChild( btn );
//set attributes for div
// div.id = 'myDivId';
div.setAttribute("id", "myDivId");

//set attributes for btnForm
btnForm.setAttribute("id", "myButtonFormId");
btnForm.action = '';

//set attributes for btn
//"btn.removeAttribute( 'style' );
btn.setAttribute("id", "myButtonId");
btn.type = "button";
btn.value = "hello";
// btn.style.position = 'absolute';
// btn.style.top = '50%';
// btn.style.left = '50%';