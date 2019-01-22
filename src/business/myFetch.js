function myFetch( url ){
	let data = '';
	const options = {
		method : 'GET',
	}

	return window.fetch(url).then(response=>{
		console.log('response');
		return response.json()
	})
	.catch( err => {
		return err;
	});
}


export default myFetch;