const sourceLink = require('../config').sourceLink;
const rp = require('request-promise');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const existsFile = promisify(fs.exists);


class Avatar{
	checkExist(userId){
		let path = this._getAvatarsPath(userId);
		return existsFile(path);
	}

	downloadFromRest(userId, link){
		let path = this._getAvatarsPath(userId);
		return rp({uri:link}).then(res => writeFile(path, res));
	}

	async getAvatar(userId){
		let path = this._getAvatarsPath(userId);
		let avatar = await readFile(path);
		avatar = Buffer.from(avatar).toString('base64');
		return avatar;
	}

	_getAvatarsPath(userId){
		return __dirname+'/images/' + userId;
	}
}

module.exports = new Avatar();
