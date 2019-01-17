import {difference,uniq,isArray} from 'lodash';

class GeocodePlaces{
	constructor( geocoder ){
		this.setStart(0);
		this.setEnd(10);
		this.setPlaces([]);
		this.placeResults = []

		if( geocoder ){
			this.setGeocoder(geocoder);
		}

		
		this.init = this.init.bind(this);
		this.geocodePlace = this.geocodePlace.bind(this);
		this.processResults = this.processResults.bind(this);

		window.initMap = this.init;
	}


	setPlaces( places ){
		if( !isArray(places) ){
			throw 'Places should be array. ' + typeof places + ' was set';
		}

		places = places.map( this.removeDay );
		this.places = uniq( places );

		return this.places;
	}

	getPlaces(){
		return this.places;
	}

	setStart( start ){
		return this.index = start;
	}


	getStart(){
		return this.index;
	}


	setEnd( end ){
		return this.fetchLimit = end;
	}


	getEnd(){
		return this.fetchLimit;
	}


	setGeocoder( geocoder ){
		this.geocoder = geocoder;
	}


	init(){
		this.setGeocoder( new window.google.maps.Geocoder() );
		this.geocodePlace();
	}


	geocodePlace(){
		let limit = this.fetchLimit ? this.fetchLimit : Number.MAX_SAFE_INTEGER;

		if( this.index>this.places.length-1 || this.index>limit ){
			this.showResults();

			return false;
		}


		let place = this.places[this.index]
		let options = {
			address : place + ' New York, USA',
			region : 'US'
		};

		if( !this.geocoder ){
			throw 'Geocoder not set up';
		}

		this.geocoder.geocode( options, this.processResults );
	}


	processResults( results, status ){
		if( status==='OK' ){
			this.placeResults.push({
				name : this.places[this.index],
				placeId : results[0].place_id,
				latLng : {
					lat : results[0].geometry.location.lat(),
					lng : results[0].geometry.location.lng(),
				}
			})
			
			//console.log( 'geocoded index ' + this.index );

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

export default GeocodePlaces;