const myFetch = jest.fn(url=>{
	const postIdPattern = /(\/\d+)$/;
	const hasPostId = url.match( postIdPattern );
	let postData;
	
	if( hasPostId ){
		postData = { id:hasPostId[1]	}
	}else{
		postData = [{id:8332}, {id:602}, {id:568}, {id:561}, {id:505}, {id:484}, {id:460}, {id:197}, {id:200}];
	};

	return Promise.resolve(postData);
})


export default myFetch;