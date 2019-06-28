const express = require('express');
const fs = require('fs');
const usersController = require('./controllers/users');
const app_port = require('./config').app_port;

const app = express();

app.get('/api/user/:id', usersController.getById);
app.get('/api/user/:id/avatar', usersController.getAvatar);
app.delete('/api/user/:id/avatar', usersController.deleteAvatar);
 
app.listen(app_port, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log(`🚀 app running at http://localhost:${app_port}`)
});
