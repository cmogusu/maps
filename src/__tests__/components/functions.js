import GeocodePlaces from '../../components/geocodePlaces.js';
import {markets} from '../../components/places.js';


describe('Setting necessary variables',()=>{
	let geocodePlaces;

	beforeAll(()=>{
		geocodePlaces = new GeocodePlaces();
	});


	test( 'Set start index', ()=>{
		geocodePlaces.setStart( 10 );
		expect( geocodePlaces.getStart() ).toBe( 10 );
	});
});

describe('Testing Geocoder',()=>{
	let geocodePlaces;

	beforeAll(()=>{
		geocodePlaces = new GeocodePlaces();
	})

	test( 'Addding places as a value other than array',()=>{
		function addStringPlaces(){
			geocodePlaces.setPlaces('places');
		}

		function addObjectPlaces(){
			geocodePlaces.setPlaces('places');
		}

		expect( addStringPlaces ).toThrow();
		expect( addObjectPlaces ).toThrow();
	});

	test( 'Add real places',()=>{
		let theMarkets = geocodePlaces.setPlaces( markets );

		expect( typeof theMarkets ).toBe( 'object' );
	})

	test( 'Geocode without geocoder',()=>{
		geocodePlaces.setPlaces( markets );

		let geocode = ()=>{
			geocodePlaces.geocodePlace();
		}

		expect( geocode ).toThrow();
	});

	test( 'run one place', ()=>{
		let mockGeocoder = {
			geocode : jest.fn(),
		}

		geocodePlaces.setEnd( 1 );
		geocodePlaces.setGeocoder( mockGeocoder );
		geocodePlaces.geocodePlace();

		expect( mockGeocoder.geocode.mock.calls.length ).toBe(1);
		expect( typeof mockGeocoder.geocode.mock.calls[0][1] ).toBe( 'function' );
	})

	test('test 9 times',()=>{
		let mockProcessResults = jest.fn((options, callback)=>{
			let results = [{
				place_id : 'thePlaceId',
				geometry : {
					location : {
						lat : ()=>50.345,
						lng : ()=> 23.323,
					}
				}
			}];

			callback( results, 'OK' );
		});

		let mockGeocoder = { geocode : mockProcessResults };

		geocodePlaces.setEnd(9);
		geocodePlaces.setGeocoder( mockGeocoder );
		geocodePlaces.geocodePlace();

		expect( mockProcessResults.mock.calls.length ).toBe(9+1);
	})


	test('test 12 times',()=>{
		let mockProcessResults = jest.fn((options, callback)=>{
			let results = [{
				place_id : 'thePlaceId',
				geometry : {
					location : {
						lat : ()=>50.345,
						lng : ()=> 23.323,
					}
				}
			}];

			callback( results, 'OK' );
		});

		let mockGeocoder = { geocode : mockProcessResults };

		geocodePlaces.setEnd(12);
		geocodePlaces.setGeocoder( mockGeocoder );
		geocodePlaces.geocodePlace();

		expect( mockProcessResults.mock.calls.length ).toBe(3);
	});

});