(function() {

	var storedPositions = {

		lat:JSON.parse(localStorage.getItem('latitude') || "[]"),
		lon:JSON.parse(localStorage.getItem('longitude') || "[]")
	
	}

	var intervalTimers = {

		leftLocation:null,
		onLocation:null,
		geoCheck:null
	}

	var currentPosition = {}

	var controller = {

		init:function() {
			var self = this;
			this.initCoords();
			
			intervalTimers.geoCheck = setInterval(function() {
		    if(currentPosition.lat != 'undefined' && currentPosition.long != 'undefined') {
		     clearInterval(intervalTimers.geoCheck);
		     self.onLocation();
		    		}
				}, 1000);
		},

		initCoords:function() {
			if (navigator.geolocation) {
            	navigator.geolocation.getCurrentPosition(this.saveCurrentLocation);
        	} else {
            	showError("Your browser does not support Geolocation!");
        	}
		},

		saveCurrentLocation:function(position) {
			currentPosition.lat = position.coords.latitude;
			currentPosition.lon = position.coords.longitude;
		},

		getDistance:function(currentLat, currentLon, storedLat, storedLon) {
			var R = 6371;
	        var dLat = (currentLat - storedLat) * Math.PI / 180;
	        var dLon = (currentLon - storedLon) * Math.PI / 180;
	        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(storedLat * Math.PI / 180) * Math.cos(currentLat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	        var d = R * c;
	        return d;
		},

		onLocation:function() {
	        var result;
	        var self = this;
	        var locNotify = document.getElementById("geolocatie");

	        intervalTimers.onLocation = setInterval(function() {

		        for (var i = 0; i < storedPositions.lat.length; i++) {
		        	result = self.getDistance(storedPositions.lat[i], storedPositions.lon[i], currentPosition.lat, currentPosition.lon);

		        	 // 1.0 = 1km, 0,5 = 500m. Als afstand minder dan 500m is, dan ben je dichterbij.
			    	if (result < 0.2 ) { // kleiner 200 meter
			    		console.log("Je bent op locatie!");
			    		alert("You just entered a location. Put your phone on silent!")
			    		clearInterval(intervalTimers.onLocation);
			    		geolocatie.innerHTML = "You just entered a location!";
			    		self.checkIfLeftLocation(storedPositions.lat[i], storedPositions.lon[i]);
			    		break;
			    	} 
				}      
		    }, 5000);
		},

		checkIfLeftLocation:function(locationLat, locationLon) {
	        var result;
	        var self = this;
	        var locNotify = document.getElementById("geolocatie");
	        console.log(locationLat + " " + locationLon);

			intervalTimers.leftLocation = setInterval(function() {
				
	        	result = self.getDistance(locationLat, locationLon, currentPosition.lat, currentPosition.lon);
				if ( result > 0.01 ) { // kleiner 10 meter
		    		console.log("You left the location.");
		    		alert("You just left your location. Put your volume back on!")
		    		clearInterval(intervalTimers.leftLocation);
					geolocatie.innerHTML = "You just left the previous location!";
		    		self.onLocation();
		    	} else { 
		    		console.log("You're still in the same location");
		    		geolocatie.innerHTML = "You're still on the same location!";
		    	}


	   		}, 10000);
		},


	}

	controller.init();

})();