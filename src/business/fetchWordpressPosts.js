import myFetch from './myFetch.js'

function fetchWordpressPosts(){
	const url = 'http://localhost/fancy/wp-json/wp/v2/posts'

	return myFetch(url).then( posts=>posts.map(post=>post.id) );
}

export default fetchWordpressPosts;