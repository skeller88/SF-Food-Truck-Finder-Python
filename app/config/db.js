// Use promised-mongo to make refactoring to promises seamless in the future,
// and because promised-mongo makes connection pooling and sharing the 'db'
// object across modules very easy and clean.
var pmongo = require('promised-mongo');

var collections = ['foodtrucks'];
var databaseName = 'foodtrucks';
var connectionString = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017';
connectionString = connectionString + '/' + databaseName;

console.log('Connecting to ', connectionString);
module.exports = pmongo(connectionString, collections);
