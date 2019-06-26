const sourceLink = require('../config').sourceLink;
// const request = require('request');
const rp = require('request-promise');

class User{	
	//old version  with try-catch for catch developers errors and callback 
	// getByPageNumber (page, cb) {
	// 	try{
	// 		request(sourceLink + 'users?'+page, { json: true }, (err, res, body) => {
	// 			cb(err, body);
	// 		});
	// 	}catch(err){
	//         cb(err);
	//     }
	// }

	async getByPageNumber (page) {
	 	return rp({uri: sourceLink + 'users?' + page, json: true}).then(res => res.data);
	}

	//old version  with try-catch for catch developers errors and callback 
	// async getById (id, cb) {
	// 	try{
	// 		request(sourceLink + 'users/' + id, { json: true }, (err, res, body) => {
	// 			cb(err, body);
	// 		});
	// 	}catch(err){
	//         cb(err);
	//     }

	//  	return rp({uri: sourceLink + 'users/' + id, json: true})
	// }

	async getById (id) {
	 	return rp({uri: sourceLink + 'users/' + id, json: true}).then(res => res.data);
	}
}

module.exports = new User();