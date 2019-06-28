const cron = require('node-cron');
const User = require('./datasources/User');

let page = 1;

const task = cron.schedule('* * * * *', async () => {
	try{
		if(page == 1){
			await User.clearStore();
		}

		let usersPage = await User.getByPageNumber(page);
		if(!usersPage || !usersPage.data){
			throw new Error('Something bad has happened!')
		}

		if (!usersPage.data.length && page == usersPage.total_pages + 1){
			console.log('Cron task already scraped all users!');
			task.destroy();
		}
		await User.appendUserToFile(usersPage.data);
		page++;
	}catch(err){
		console.error(err);
		task.destroy();
	}
});
