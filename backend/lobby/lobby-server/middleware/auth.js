const { jwt, privateKey } = require('../config');
const { getAccessToken } = require('../functions');

function checkAuth(req, res, next) {
    const token = getAccessToken(req);

    jwt.verify(token, privateKey, function (err) {
        if (!err) {
            //console.log('Access token is valid'); // Using only for testing
            next();
        } else {
            //console.error('Access token is invalid'); // Using only for testing
            next(Error("a001")); // Custom authentication code - Token is invalid
        }
    });
}

module.exports = {
    checkAuth
}