// background.js

angular.module('ISeeIHear', ['ngMaterial', 'ngMessages'])


// var newModality = '';

.controller('BgCtrl', function($scope) {
	
	

	// insert tutorials part in this button
	$scope.howTo = function() {
		alert("How To App 101 Button is clicked!");
	}

	// save settings in variables
	$scope.saveSettings = function() {

		// how to use chrome.storage.sync.get and chrome.storage.sync.set
		chrome.storage.sync.get('opacity', function(settings) {
			var newOpacity = 0;
			newOpacity = parseInt($scope.opacity);
			if(newOpacity) {
				chrome.storage.sync.set({'opacity': newOpacity});
				// alert(settings.opacity);
			}
		});

		chrome.storage.sync.get('modality', function(settings) {
			var newModality = $scope.modality;
			if(newModality != undefined) {
				chrome.storage.sync.set({'modality':  newModality});
			}
		});

		alert($scope.opacity + "\n" + $scope.modality);

		// Note: naseset naman 'yung opacity sa storage kaso hindi nagrereflect sa UI kapag sinasarado 'yung background.html
		// Note: previous values ang lumalabas kapag napress ang save settings button naooverwrite lang siya if you press the save setting button again
	}
	
	// edit bookmark
	$scope.editBookmarks = function() {
		alert("Edit Bookmark Button is clicked!");	
	}

});