
fetch('http://magicseaweed.com/api/cbde93d511fcc91658eea0a8c1ef1cd0/forecast/?spot_id=1', {
	headers: {
		'Content-Type': 'application/json'
	},
	mode: 'no-cors'
})

	.then(res => res.json())
	.then(json => console.log(json))
