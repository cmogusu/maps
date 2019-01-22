export const createMap = (google, domElement, theCenter, zoom = 10, mapTypeId = 'roadmap') => {
  const center = theCenter || {
    lat: 40.701896845000306,
    lng: -73.90824226899952,
  };

  return new google.maps.Map(domElement, {
    zoom,
    center,
    mapTypeId,
  });
};


export const createInfoWindow = (google, html) => {
  const options = {
    content: html,
    pixelOffset: 0,
    maxWidth: 200,
  };

  return new google.maps.InfoWindow(options);
};


export const createMarker = (google, map, position, label, title = 'Point of Interest') => new google.maps.Marker({
  map, position, label, title,
});


export const loadScript = (script) => {
  const theScript = document.createElement('script');
  theScript.setAttribute('src', script);
  document.head.appendChild(theScript);
};


export const createMapsReadyEvent = () => {
  window.initMap = () => {
    const mapsReadyEvent = new Event('mapsReady');
    window.dispatchEvent(mapsReadyEvent);
  };
};
