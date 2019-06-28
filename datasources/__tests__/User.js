const User = require('../User');
let rp = require('request-promise');

jest.mock('request-promise');


test('testing datasources.User.getById', async () => {
	rp.mockResolvedValue(mockGetByIdResponse);
	let user = await User.getById(1);
	expect(user).toEqual(mockGetByIdResponse.data);
});

test('testing datasources.User.getByPageNumber', async () => {
	rp.mockResolvedValue(mockGetByPageNumberResponse);
	let userPage = await User.getByPageNumber(1);
	expect(userPage).toEqual(mockGetByPageNumberResponse);
});



const mockGetByIdResponse = {
	data: {
		id:1,
		email:"george.bluth@reqres.in",
		first_name:"George",
		last_name:"Bluth",
		avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
	}
};

module.exports.mockGetByIdResponse = mockGetByIdResponse;

const mockGetByPageNumberResponse = { 
	page: 1,
	per_page: 3,
	total: 12,
	total_pages: 4,
	data: [ { id: 1,
		email: 'george.bluth@reqres.in',
		first_name: 'George',
		last_name: 'Bluth',
		avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' }]
};

module.exports.mockGetByPageNumberResponse = mockGetByPageNumberResponse;