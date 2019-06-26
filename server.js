var express = require('express');
var fs = require('fs');

var usersController = require('./controllers/users');


var app = express();

app.get('/api/user/:id', usersController.getById);

app.get('/api/user/:id/avatar', usersController.getAvatar);

app.delete('/api/user/:id/avatar', function(req, res){
	const id = req.params.id;
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



