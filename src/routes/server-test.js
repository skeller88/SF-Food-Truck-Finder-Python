// For use in server testing only.
exports.testResponse = 'This is a test response.';
exports.testRoute = function(req, res, next) {
    res.status(200).send(exports.testResponse);
};