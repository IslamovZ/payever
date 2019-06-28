const User = require('../datasources/User');
const Avatar = require('../datasources/Avatar');

//old version using callback function
// exports.getById = function (req, res) {
// 	var id = req.params.id;
//   	Users.getById(id, function (err, data) {
//     	if (err) {
//     		console.log(err);
//       		return res.sendStatus(500);
//     	}
//     	res.send(data);
//   	})
// }

//new version using promises
exports.getById = async function (req, res) {
  try{
    const id = req.params.id;
    let user = await User.getById(id);
    return res.status(200).send(user);
  }catch(err){
    logErr(err);
    return res.sendStatus(500);
  }
}

exports.getAvatar = async function(req, res){
  try{
    var userId = req.params.id;
    let checkExist = await Avatar.checkExist(userId);
    if(!checkExist){
      let user = await User.getById(userId);
      await Avatar.downloadFromHost(userId, user.avatar);
    }
    let avatar = await Avatar.getByUserId(userId);
    return res.status(200).send(avatar);
  }catch(err){
    logErr(err);
    return res.sendStatus(500);
  }
}

exports.deleteAvatar = async function(req, res){
  try{
    var userId = req.params.id;
    await Avatar.deleteByUserId(userId);
    return res.status(200).send('Avatar has been deleted!')
  }catch(err){
    if(err.code == 'ENOENT') {
      return res.status(200).send("Avatar doesn't exist!");
    }
    logErr(err);
    return res.sendStatus(500);
  }
}


//function for logging errors. it must be implemented in another file
function logErr(err){
  console.error(err);
}