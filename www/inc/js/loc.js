(function () {

	//Parse localstorage items naar leesbare arrays, voeg ze vervolgens samen
    var lat = JSON.parse(localStorage.getItem('latitude') || "[]");
    var lon = JSON.parse(localStorage.getItem('longitude') || "[]");
    var position;
    // position.lat

    function initCoords() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveLocation);
            createLatLong()
        } else {
            showError("Your browser does not support Geolocation!");
        }
    }

    function saveLocation(position) {
    	position = position.coords;
    }

    function createLatLong(position) {
        var lat2 = position.coords.latitude;
        var long2 = position.coords.longitude;
        var result;

        for (var i = 0; i < lat.length; i++) {
        	result = getDistance(lat[i], lon[i], lat2, long2);
		}
 
        // 1.0 = 1km, 0,5 = 500m. Als afstand minder dan 500m is, dan ben je dichterbij.
    	if (result < 0.2 ) { // kleiner 10 meter
    		alert("Je bent op locatie! Zet je geluid uit.");
    		onLocation(position);
    	} else setTimeout(initCoords, 15000); //15000 = timeout in MS, omzetten naar var
    }

    function onLocation(position) {
    	var lat2 = position.coords.latitude;
        var long2 = position.coords.longitude;
        var result;
        var intervalLoop;

        onLocation(position);
		intervalLoop = setInterval(function() {
			for (var i = 0; i < lat.length; i++) {
	        	result = getDistance(lat[i], lon[i], lat2, long2);
	          	console.log("TEST ONLOCATION" + result)
			}

   			if ( result > 0.01 ) // kleiner 10 meter
   				
    			alert("Je bent weg van je locatie! Geluid kan weer aan.");
    		}
   		}, 15000);

    	

    }

    function getDistance(lat, lon, lat2, long2) {
        var R = 6371;
        var dLat = (lat2 - lat) * Math.PI / 180;
        var dLon = (long2 - lon) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    
    initCoords();

})();