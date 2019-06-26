var express = require('express');
var fs = require('fs');

var usersController = require('./controllers/users');


var app = express();

app.get('/api/user/:id', usersController.getById);

app.get('/api/user/:id/avatar', function(req, res){
	var id = req.params.id;
	rp.get('https://reqres.in/api/users/'+id)
		.then(function(data) {
			data = JSON.parse(data);
			var path = __dirname +'/images/'+ id;
			if (fs.existsSync(path)) {
				fs.readFile(path, 'base64', function(err, avatar) {
			   		if (err) {
				       	logErr(err);
						return res.status(400).send(err);
			   		}
					return res.status(200).send(avatar);
				});
			} else {
				rp(data.data.avatar)
					.then(function(avatar){
						fs.writeFile(path, avatar, function(err) {
				   			if(err) {
								logErr(err);
								return res.status(400).send(err);
				   			}
							avatar = Buffer.from(avatar).toString('base64');
							return res.status(200).send(avatar);
						}); 
					})
					.catch(function(err){
						logErr(err);
						return res.status(400).send(err);
					});

			}
		
			
		})
		.catch(function(err){
			logErr(err);
			return res.status(400).send(err);
		});
});

app.delete('/api/user/:id/avatar', function(req, res){
	var id = req.params.id;
	var path = __dirname +'/images/'+ id;
	fs.unlink(path, function(err) {
	    if(err && err.code == 'ENOENT') {
	        return res.status(200).send("File doesn't exist!");
	    } else if (err) {
	        logErr(err);
			return res.status(400).send(err);
	    } else {
	        return res.status(200).send('File deleted');
	    }
	});
});
 
app.listen(3000);



//function for logging errors
function logErr(err){
	console.error(err);
}