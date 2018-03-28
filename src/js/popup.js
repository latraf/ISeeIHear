// popup.js

var opacity = 0;

$(function() {
	$("#slider").slider({
		value:25,
		min: 25,
		max: 100,
		step: 25,
		slide: function(event,ui) {
	    	$("#amount").val(ui.value);
	  	}
	});
	$("#amount").val($("#slider").slider("value"));
	opacity = $("#amount").val($("#slider").slider("value"));
});



$(function() {
	$(".modality").checkboxradio({
		icon: false
	});
});

$(document).ready(function() {
	$(".saveBtn").click(function() {
		console.log(opacity);
	});	
});
