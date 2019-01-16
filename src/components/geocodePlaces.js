//import {createMap,createInfoWindow,createMarker} from './components/functions.js';
import {markets} from './components/places.js';
import {difference,uniq} from 'lodash';

class Start{
	constructor( places, start, end ){
		this.index = start;
		this.fetchLimit = end;
		this.init = this.init.bind(this);
		this.geocodePlace = this.geocodePlace.bind(this);
		this.processResults = this.processResults.bind(this);

		this.places = places;
		this.placeResults = [];
	}


	init(){
		this.places = this.places.map( this.removeDay );
		this.places = uniq( this.places );
		
		this.geocoder = new window.google.maps.Geocoder();
		this.geocodePlace();
	}


	geocodePlace(){
		let limit = this.fetchLimit ? this.fetchLimit : Number.MAX_SAFE_INTEGER;

		if( this.index>this.places.length-1 || this.index>limit ){
			this.showResults();
			console.log('finished');
			return false;
		}


		let place = this.places[this.index]
		let options = {
			address : place + ' New York, USA',
			region : 'US'
		};

		
		setTimeout( ()=>{
			let dummyResults = [{
				place_id : 'erjekwe',
				geometry : {
					location : {
						lat : ()=> 30,
						lng : ()=> 50
					}
				}
			}];

			this.processResults( dummyResults, 'OK' )
		},500)
		
		
		//this.geocoder.geocode( options, this.processResults );
	}


	processResults( results, status ){
		if( status==='OK' ){
			this.placeResults.push({
				name : this.places[this.index],
				placeId : results[0].place_id,
				latLng : {
					lat : results[0].geometry.location.lat(),
					lng : results[0].geometry.location.lat(),
				}
			})
			
			console.log( 'geocoded index ' + this.index );

			this.index++;

			if( this.index>0 && this.index%10===0 ){
				this.wait( 10 )
				return false;
			}

			this.geocodePlace();	
		}else if( status==="OVER_QUERY_LIMIT" ){
			this.wait( 20 )
		}else{
			console.log('error',status)
		}
	}

	wait( seconds ){
		this.showResults();
		console.log('sleeping for '+ seconds +' secs');
		setTimeout(()=>{ 
			this.geocodePlace()
		}, seconds * 1000 );
	}


	removeDay( place ){
		let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

		place = difference( place.split(' '), days );

		return place.join(' ');
	}


	showResults(){
		console.log( JSON.stringify(this.placeResults) );
	}
}


const start = new Start( markets, 0,1 );
window.initMap = start.init;
