var User = require(process.env.NODE_PATH + '/models/user');

function isObjectId(id) {
    return User.ObjectId.isValid(id);
}

function createUser(user, callback) {
    var newUser = new User(user);
    newUser["local.password"] = newUser.generateHash(newUser.local.password);
    newUser.save(callback);
}

/**
 * Get user from database and call callback
 * @param  {Object}   query    Query
 * @param  {Function} callback Function to call after execution
 */
function retrieveUser(query, callback) {
    User.findOne(query, callback);
}

/**
 * Update user data
 * @param  {Object}   query    Query to find user
 * @param  {Object}   newData  New data
 * @param  {Function} callback Function to call after execution
 */
function updateUser(query, newData, callback) {
    User.findOneAndUpdate(query, newData, callback);
}

/**
 * [deleteUser description]
 * @param  {[type]}   query    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function deleteUser(query, callback) {
    User.findOneAndRemove(query, callback);
}

module.exports.createUser = createUser;
module.exports.retrieveUser = retrieveUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
