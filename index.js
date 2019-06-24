var express = require('express');
var request = require('request');
var rp = require('request-promise');
var fs = require('fs');


var app = express();

app.get('/api/users/:id', function (req, res) {
var id = req.params.id;
rp.get('https://reqres.in/api/users/'+id)
.then(function(data) {
res.status(200).send(data);
})
.catch(function(err){
res.status(400).send(err);
logErr(err);
return;
});
});

app.get('/api/users/:id/avatar', function(req, res){
var id = req.params.id;
rp.get('https://reqres.in/api/users/'+id)
.then(function(data) {
data = JSON.parse(data);
var path = __dirname +'/images/'+ id;

if (fs.existsSync(path)) {
console.log('get from fs')
fs.readFile(path, function(err, avatar) {
   if (err) {
       logErr(err);
return res.status(400).send(err);
   }
return res.status(200).send(avatar);
});
}
console.log('else')

rp(data.data.avatar)
.then(function(avatar){
fs.writeFile(path, avatar, function(err) {
   if(err) {
logErr(err);
return res.status(400).send(err);
   }
return res.status(200).send(avatar);
}); 
})
.catch(function(err){
res.status(400).send(err);
logErr(err);
return;
});
})
.catch(function(err){
res.status(400).send(err);
logErr(err);
return;
});

});
 
app.listen(3000);



//function for logging errors
function logErr(err){
console.log(err)
}