var User = require('../datasources/users');

// console.log(User.getById(1,(err,res) => console.log(err,res)))
let t = async () => {
	let tt = await User.getById(1)
	console.log(tt)

};
t();

exports.all = function (req, res) {
  Users.all(function (err, data) {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(data);
  })
}

exports.getById = function (req, res) {
	var id = req.params.id;
  	Users.getById(id, function (err, data) {
    	if (err) {
    		console.log(err);
      		return res.sendStatus(500);
    	}
    	res.send(data);
  	})
}