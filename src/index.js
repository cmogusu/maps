import React from 'react';

export const Br = ()=>{
	return <br />;
}

export const Span = ({word})=>{
  return (
  	<React.Fragment>
    	<span className="absolute bottom left right z-index-1 opacity-8">word of the day : {word}</span>
    	<Br/>
    </React.Fragment>
  )
}

/*
import {createMap, createMarker} from './business/functions.js';
import {markets} from './business/marketsData.js';


class Start{
	constructor(){
		this.markers = [];

		window.initMap = this.init.bind(this);
		console.log('hello world')
	}


	init(){
		let google = window.google;
		let mapElement = document.getElementById('map');

		let map = createMap( google, mapElement )
		
		this.markers = markets.slice(0,5).map( (market,index)=>
			createMarker( google, map, market.latLng, ''+index, market.name )
		)
	}
}

new Start();

*/