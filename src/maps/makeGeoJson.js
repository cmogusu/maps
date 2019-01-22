import { makeGeoJSON } from 'make-geo-json';


function makeGeoJson( data ){
	return makeGeoJSON({
		type: 'string',
		poly : data,
	})
}

export default makeGeoJson;

