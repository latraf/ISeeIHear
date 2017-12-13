// background.js

angular.module('ISeeIHear', ['ngMaterial', 'ngMessages'])

.controller('BgCtrl', function($scope) {
	
	var SO = 0, MO, newOpacity = 0;
	chrome.storage.local.get('opacity', function(settings) {
		$('#storageO').text("Saved Opacity: " + settings.opacity);
	});

	chrome.storage.local.get('modality', function(settings) {
		$('#storageM').text("Saved Modality: " + settings.modality);
	});

	// insert tutorials part in this button
	$scope.howTo = function() {
		alert("How To App 101 Button is clicked!");
	}

	// save settings in variables
	$scope.saveSettings = function() {

		// how to use chrome.storage.sync.get and chrome.storage.sync.set
		chrome.storage.local.get('opacity', function(settings) {
			newOpacity = parseInt($scope.settings.opacity);
			// if newOpacity is != 0
			if(newOpacity) {
				chrome.storage.local.set({'opacity': newOpacity});
			}
		});

		chrome.storage.local.get('modality', function(settings) {
			var newModality = $scope.settings.modality;
			// if newModality has a value
			if(newModality != undefined) {
				chrome.storage.local.set({'modality':  newModality});
			}
		});

		// Note: naseset naman 'yung opacity sa storage kaso hindi nagrereflect sa UI kapag sinasarado 'yung background.html 
		// 	Resolved: (?) Kasi narereflect siya sa UI pero hindi mismo dun sa options hays :(
		// Note: previous values ang lumalabas kapag napress ang save settings button naooverwrite lang siya if you press the save setting button again
		// Note: So it means na gumagana 'yung chrome storage :)
	}
	
	// edit bookmark
	$scope.editBookmarks = function() {
		alert("Edit Bookmark Button is clicked!");	
	}	
	
});