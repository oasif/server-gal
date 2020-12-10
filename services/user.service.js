const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    authenticate,
    getAllUsers,
    getById,
    addUser,
    registerArt

}

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }

}

async function getAllUsers() {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
    return await User.find().select('-hash');
}



async function getById(id) {

    return await User.find({_id:id});
}

//TODO: finish this function. Here you should insert the art 'id' into the User document.
// Useful Hint: Recall that JWT token already contains user id and with each client request the 'req' object is modified to include user id in req.user.sub
async function registerArt(req){
    //TODO: Do not allow students to register more than five art.
    //TODO: On the angular side you will need to hide the 'add' button from the creators,
    // however, you should still block them from adding arts here as well.
    console.log(req);
    console.log(req.User);
    const user = await User.findOne({_id:req.user.sub});
    if(user.arts.length < 5){
        //
        console.log("We made it, the art we are add is "+ req.body.artid);
        if (await User.findOne({ arts: req.body.artid})) {
            throw 'User has already signed up ';
        }
        else{
        return await User.updateOne({_id:req.user.sub}, {$push: {arts:req.body.artid}})
        } // User is the user database, try 
    }
    else{
        throw ' Art limit of 5 has been reached ';

    }
    //TODO: send a message to users if the limit is reached.
}

async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}

