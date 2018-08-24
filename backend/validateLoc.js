const { geocode } = require('./geocode.js');

exports.validateLoc = function(loc) {
	let newLoc;
	return new Promise((resolve, reject) => {
		if(typeof(loc)=="object") {
		 	newLoc = loc;
			resolve(newLoc);
		}
		else{
			// we've got a postcode rather than a location
			// find the location from the postcode :/
			geocode(loc).then(function(res){
				newLoc = {lat: res[0].latitude, lon: res[0].longitude};
				resolve(newLoc);
			});
		}
	});
}