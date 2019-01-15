const { checkAuth } = require('./auth');
const { errorHandling } = require('./error-handling');

module.exports = function (options = { mwid: ''}) {
    switch (options.mwid) {
        case "checkAuth":
            return checkAuth;

        case "errorHandling":
            return errorHandling;
    
        default:
            return;
    }
}