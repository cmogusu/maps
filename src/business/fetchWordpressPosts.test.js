import fetchWordpressPosts from './fetchWordpressPosts.js';
jest.mock('./myFetch.js');

describe('fetchWordpressPosts',()=>{
	it('lives',()=>{
		return fetchWordpressPosts().then( postIds=>{
			console.log(postIds);
			expect( postIds.length ).toBeGreaterThan( 1 );
		})
		
	})
});