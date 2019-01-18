export const timer = (callback)=>{
	console.log('We are off...!')
	setTimeout(()=>{
		console.log('finished')			
		callback('doggy');
	},10000)
}