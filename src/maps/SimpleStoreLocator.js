import {createMap, createMarker} from '../business/functions.js';
import {markets} from '../business/marketsData.js';


class SimpleStoreLocator{
	constructor(){
		this.markers = [];

		window.initMap = this.init.bind(this);
	}


	init(){
		console.log('we are in init');
		let google = window.google;
		let mapElement = document.getElementById('map');

		let map = createMap( google, mapElement )
		
		this.markers = markets.slice(0,5).map( (market,index)=>
			createMarker( google, map, market.latLng, ''+index, market.name )
		)
	}
}

export default SimpleStoreLocator;