const sourceLink = require('../config').sourceLink;
// const request = require('request');
const rp = require('request-promise');
const utils = require('./utils')

storeFilePath = `${__dirname}/usersStore.json`;
class User{	


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

	getById (id) {
	 	return rp({uri: sourceLink + 'users/' + id, json: true}).then(res => res.data);
	}

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


	getByPageNumber (page) {
	 	return rp({uri: sourceLink + 'users?page=' + page, json: true});
	}

	clearStore(){
		return utils.writeFile(storeFilePath, '{"data":[]}');
	}

	async appendUserToFile(users){
		let usersStore = await utils.readFile(storeFilePath);
		usersStore = JSON.parse(usersStore);
		usersStore.data.push(...users);
		await utils.writeFile(storeFilePath, JSON.stringify(usersStore));
	}
}

module.exports = new User();