// popup.js

angular.module('ISeeIHear', ['ngMaterial', 'ngMessages'])

.controller('BgCtrl', function($scope) {

var newOpacity = 0;

	function getKey(key, callback) {
		chrome.storage.local.get(key, function(data) {
			var value = data[key];
			callback(value);
		});
	}

	// $scope.settings = {
	// 		opacity: 50,
	// 		modality: "Both"
	// };
	
	console.log("Saved Settings:");
	getKey('opacity', function(data) {
		console.log("[getKey] Opacity: " + data);
	});

	getKey('modality', function(data) {
		console.log("[getKey] Modality: " + data);
	});

	// insert tutorials part in this button
	$scope.howTo = function() {
		alert("How To App 101 Button is clicked!");
	}

	// save settings in variables
	$scope.saveSettings = function() {

		console.log("SAVED BUTTON");
		newOpacity = parseInt($scope.settings.opacity);
		// if newOpacity is != 0
		if(newOpacity) {
			chrome.storage.local.set({'opacity': newOpacity});
		}

		var newModality;
		newModality = $scope.settings.modality;
		// if newModality has a value
		if(newModality != undefined) {
			chrome.storage.local.set({'modality':  newModality});
		}
		console.log("Newly Saved Settings:");
		getKey('opacity', function(data) {
			console.log("[getKey] Opacity " + data);
		});

		getKey('modality', function(data) {
			console.log("[getKey] Modality " + data);
		});

		alert("Opacity: " + newOpacity + "\nModality: " + newModality + "\n\nSettings saved!");

		// Note: gumagana 'yung chrome storage pero hindi nagrereflect sa UI kapag sinasarado 'yung background.html
	}
	
	// edit bookmark
	$scope.editBookmarks = function() {
		alert("Edit Bookmark Button is clicked!");	
	}	
	
});