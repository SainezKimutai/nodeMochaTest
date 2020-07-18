const Secret = require('../config/dev').Secret;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../api/users/users.model').User;
const mailService = require('./mail.service');

// Authenticate Users
async function authenticate(userParam) {

    var password = userParam.password;

    const user = await User.findOne({ email : userParam.email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const {password, ...userWithoutPassword } = user.toObject();
        const token = jwt.sign({ sub: user.id }, Secret);
        return {
            ...userWithoutPassword,
            token
        };
    }
}

// Create New User
async function create(userParam){
    console.log(userParam);
    // Check Id user existes
    if (await User.findOne({ email: userParam.email })) {
        return;
    }

    let user = new User(userParam);

    // Save User
    await user.save();

    return User.findOne({ email: user.email});

}


// Get All Users
async function getAll() {
    return await User.find({});
}


// Get One User
async function getOne(_id) {
    return User.findById(_id);
}

// Get By email
async function getOneByEmail(reqParam) {
    return await User.findOne({email: reqParam.email});
}

// Update a User
async function update(id, userParam) {
    let user = await User.findById(id);

    // Validate
    if (!user) throw 'User not Found';

    // Copy userParam
    Object.assign(user, userParam);

    await user.save();

    return User.findById(id);

}



//Delete a user
async function _delete(id) {
    await User.deleteOne({_id: id});
}






// export all of those functions in order to access them outside of this file

module.exports = { authenticate, create, getAll, getOne, getOneByEmail, update, delete: _delete};
