const usersController = require('../users');
const Avatar = require('../../datasources/Avatar');
jest.mock('../../datasources/Avatar');


describe('testing controllers.users.deleteAvatar', () => {

	it('testing successful when file exists', async () => {
		Avatar.deleteByUserId.mockImplementation(()=>true);
		let res = {};
		res.status = (status) => {
			res.status = status;
			return res;
		}
		res.send = (result) => {
			res.result = result;
		}

		usersController.deleteAvatar({params:{id:1}}, res);
	})
})
//and etc.