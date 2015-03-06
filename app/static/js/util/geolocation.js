function defaultError(error) {
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

function defaultSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log('Latitude:', latitude, 'Longitude:', longitude);
}

function geolocation(success, error) {
    if (navigator.geolocation) {
        var error = error || defaultError;
        var success = success || defaultSuccess;

        navigator.geolocation.getCurrentPosition(
            success, error);
    } else {
        console.log('Geolocation is not supported by this browser. You need' +
            ' a different browser to use this app.');
    }
}