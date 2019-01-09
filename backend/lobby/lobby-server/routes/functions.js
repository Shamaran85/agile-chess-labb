function getAccessToken(req){
    // Get Authorization property in headers object
    const headerAuthorization = req.headers['authorization'];
    if (headerAuthorization !== undefined){
        const bearer = headerAuthorization.split(' ');
        return bearer.length > 0 ? bearer[1] : null;
    }

    return null;
}

function checkObject(inObject) {
    return new Promise((resolve, reject) => {
        if (Object.keys(inObject).length > 0) {
            Object.keys(inObject).forEach((key) => {
                if (key === ''){
                    reject(Error(`A property is empty`))
                    return;
                } else if (inObject[key] === undefined || inObject[key] === '') {
                    reject(Error(`Value of property ${key} is empty`))
                    return;
                }

                resolve(true);
            });
        } else {
            reject(Error('Object is empty'));
        }
    });
}

module.exports = {
    getAccessToken,
    checkObject
}