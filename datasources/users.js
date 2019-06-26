const sourceLink = require('../config').sourceLink;
const request = require('request');
const rp = require('request-promise');

class User{
	getByPageNumber (page, cb) {
		try{
			request(sourceLink + 'users?'+page, { json: true }, (err, res, body) => {
				cb(err, body);
			});
		}catch(err){
	        cb(err);
	    }
	}

	async getById (id, cb) {
		// try{
		// 	request(sourceLink + 'users/' + id, { json: true }, (err, res, body) => {
		// 		cb(err, body);
		// 	});
		// }catch(err){
	 //        cb(err);
	 //    }

	 	return rp({uri: sourceLink + 'users/' + id, json: true})
	}
}

module.exports = new User();