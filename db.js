var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.MONGO_DB);

module.exports = db;