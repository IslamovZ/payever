const rp = require('request-promise');
const utils = require('./utils')

class Avatar{
	checkExist(userId){
		let path = this._getAvatarsPath(userId);
		return utils.existsFile(path);
	}

	downloadFromHost(userId, link){
		let path = this._getAvatarsPath(userId);
		return rp({uri:link}).then(res => utils.writeFile(path, res));
	}

	async getByUserId(userId){
		let path = this._getAvatarsPath(userId);
		let avatar = await utils.readFile(path);
		avatar = Buffer.from(avatar).toString('base64');
		return avatar;
	}

	deleteByUserId(userId){
		let path = this._getAvatarsPath(userId);
		return utils.unlink(path);
	}

	_getAvatarsPath(userId){
		return `${__dirname}/images/${userId}`;
	}
}

module.exports = new Avatar();