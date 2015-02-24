var mongoose = require('mongoose');

var CONNECTION_STRING = 'mongodb://127.0.0.1:27017/foodtrucks';

if (process.env.NODE_ENV === 'production') {
    var connectionString = '';
} else {
    var connectionString = CONNECTION_STRING;
}

exports.connect = function() {
    mongoose.connect(CONNECTION_STRING);

    var db = mongoose.connection;

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    db.on('error', console.error.bind(console, 'connection error:'));
};