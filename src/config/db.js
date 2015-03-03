var pmongo = require('promised-mongo');

var collections = ['foodtrucks'];
var databaseName = 'foodtrucks';
var connectionString = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017';
connectionString = connectionString + '/' + databaseName;

console.log('Connecting to ', connectionString);
module.exports = pmongo(connectionString, collections);
