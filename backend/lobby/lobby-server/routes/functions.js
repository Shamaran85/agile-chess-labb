function getAccessToken(req){
    // Get Authorization property in headers object
    const headerAuthorization = req.headers['authorization'];
    if (headerAuthorization !== undefined){
        const bearer = headerAuthorization.split(' ');
        return bearer.length > 0 ? bearer[1] : null;
    }

    return null;
}

module.exports = {
    getAccessToken
}