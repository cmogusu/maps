export const createMap = function( google, domElement, center, zoom=10, mapTypeId='roadmap' ){
	center = center ? center : {
		lat: 40.701896845000306,
		lng: -73.90824226899952
	}

	return new google.maps.Map( domElement, {
		zoom,
		center,
		mapTypeId
	})
}


export const createInfoWindow = function( google, html ){
	const options = {
		content : html,
		pixelOffset : 0,
		maxWidth : 200,
	};

  return new google.maps.InfoWindow( options );
}


export const createMarker = function( google, map, position, label, title="Point of Interest" ){
  return new google.maps.Marker({ map, position, label, title })
}