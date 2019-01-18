import GeocodePlaces from 'GeocodePlaces.js';
import {markets} from 'places.js';


class RunGeocode{
	constructor(){

		this.gp = new GeocodePlaces();
		window.initMap = this.init.bind(this);
	}

	fetchGmaps(){
		fetch()
	}

}

runGeocode = new RunGeocode();
