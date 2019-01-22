import myFetch from './myFetch.js';

describe.skip('mocking',()=>{
	it('fetches single post',()=>{
		const url = 'http://localhost/fancy/wp-json/wp/v2/posts/618';
		return expect( myFetch(url) ).resolves.toHaveProperty( 'id', 618 );
	})

	it('fetches many posts',done=>{
		expect.assertions(1);

		const url = 'http://localhost/fancy/wp-json/wp/v2/posts';
		const postsPromise = myFetch(url).then(posts=>{
			expect(posts.length).toBeGreaterThan(0);
			done();
		});

		return 
	})
})