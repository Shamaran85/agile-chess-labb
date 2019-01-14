// Error handling middleware
function errorHandling(err, req, res, next) {
    const errorCode = err.message;

    switch (errorCode) {
        // Access token
        case "a001":
            res.status(403)
                .json({ status: false, message: 'Access token is invalid' });
            break;

        // Database server
        case "d001":
            res.status(500)
                .json({ status: false, message: 'Can not connect to the database server' });
            break;

        // User
        case "u001":
            res.status(400)
                .json({ status: false, message: 'User ID is invalid' });
            break;
        
        // Event
        case "e001":
            res.status(400)
                .json({ status: false, message: 'Event ID is invalid' });
            break;

        default:
            res.status(500)
                .json({ status: false, message: 'Error is found and the process is interrupted' });
            break;
    }
}

module.exports = {
    errorHandling
}