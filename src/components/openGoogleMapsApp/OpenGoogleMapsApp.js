export function openGoogleMapsApp(latitude, longitude) {
    let url;

    if ((navigator.platform.indexOf("iPhone") !== -1) ||
        (navigator.platform.indexOf("iPad") !== -1) ||
        (navigator.platform.indexOf("iPod") !== -1)) {
              url = `comgooglemaps://?q=${latitude},${longitude}&center=${latitude},${longitude}`;
    } else {
         url = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
    }

    try {
        window.location.href = url;
    } catch(err) {
        window.open(`https://www.google.com/maps/?q=${latitude},${longitude}`, '_blank');
    }
}
