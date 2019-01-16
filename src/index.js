//import {createMap,createInfoWindow,createMarker} from './components/functions.js';
import {markets} from './components/places.js';
import {difference} from 'lodash';

class Start{
	constructor( places ){
		this.index = 0;
		this.init = this.init.bind(this);
		this.checkResults = this.checkResults.bind(this);
		//this.geocodePlace = this.geocodePlace.bind(this);

		this.places = [];
		this.originalPlaces = places;
		this.placeResults = [];
	}


	init(){
		let iterator = this.chunkifyPlaces(this.originalPlaces);
		//let results;

		do{
			let results = iterator.next();
			this.places = results.value;

			console.log( results, this.places );
		}while( !results.done );

		//yield this.geocodePlace( this.checkResults );;
	}

	* chunkifyPlaces( places ){
		let chunkIndex = 0;
		let chunkSize = 10;
		let startIndex = 0;
		let endIndex=10;

		while( startIndex<=places.length-1 ){
			yield places.slice( startIndex, endIndex );

			startIndex = chunkSize * chunkIndex++;
			endIndex = chunkSize * chunkIndex+1;
		}

		return false
	}


	geocodePlace( completionCallback ){
		if( !completionCallback ){
			console.log('add geocode callback');
		}

		if( this.index>=this.places.length  ){
			this.showResults();
			return false;
		}

		let place = this.places[ this.index ];
		let options = {
			address : place+' New York, USA',
			region : 'US'
		}

		let geocoder = new window.google.maps.Geocoder();

		geocoder.geocode( options, completionCallback )
	}


	checkResults( results, status ){
		if( status==='OK' ){
			this.placeResults.push({
				name : this.places[this.index],
				placeId : results[0].place_id,
				latLng : {
					lat : results[0].geometry.location.lat(),
					lng : results[0].geometry.location.lat(),
				}
			})
		}else{
			console.log('error',status)
		}

		this.recurse();
	}


	recurse(){
		this.index++
		this.geocodePlace( this.checkResults );
	}


	removeDay( place ){
		let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

		place = difference( place.split(' '), days );

		return place.join(' ');
	}


	showResults(){
		console.log( this.placeResults, JSON.stringify(this.placeResults) );

	}
}


const start = new Start( markets );

window.initMap = start.init;





/*

function init() {
	const google = window.google;
	const map = createMap( 
		google, 
		document.getElementById('map'), 
		{ lat : 40.701896845000306, lng:-73.90824226899952 },
		10,
		'roadmap'
	);
	
	

	map.addListener('click',function(event){
		let marker = createMarker( google, map, event.latLng, 'A' );
		marker.addListener('click',()=>{
			let html = '<div>Hello worldly</div>';
			let infoWindow = createInfoWindow( google, html );

			infoWindow.open(map,marker);
		})
	})
	
}

window.initMap = init;

*/