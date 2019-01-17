import {createMap, createMarker} from './components/functions.js';
import {markets} from './components/marketsData.js';


class Start{
	constructor(){
		this.markers = [];
	}


	init(){
		let google = window.google;
		let mapElement = document.getElementById('map');

		let map = createMap( google, mapElement )

		createMarker( google, map, markets[0].latLng, 'a', markets[0].name );
		map.panTo(markets[0].latLng);

		console.log(markets.map( market=>market.latLng ));
		/*
		this.markers = markets.map( (market,index)=>
			createMarker( google, map, market.latLng, index, market.name )
		)
		*/
	}
}


const start = new Start();
window.initMap = start.init;
