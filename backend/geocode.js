var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyAwUwpxWb97C-9m2A0lzywCXBiSRN84dDc', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

exports.geocode = function(pcode) {
	return geocoder.geocode(pcode).then(function(res) {
		//console.log("geocoded postcode");
		//console.log(res);
    	return res;
  	})
  	.catch(function(err) {
	    return err;
  	});
}