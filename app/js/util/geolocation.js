function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            error = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            error = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            error = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            error = "An unknown error occurred.";
            break;
    }

    console.log(error);
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(latitude, longitude);
}

module.exports = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log('Geolocation is not supported by this browser. You need' +
            ' a different browser to use this app.');
    }
};