const { io, MongoClient, ObjectID, jwt,
    privateKey, dbServer, headers, userArgs,
} = require('../config');

const { getAccessToken, checkObject } = require('./functions');

// USING FOR THE USER ROUTES
function getUsers(req, res) {
    const token = getAccessToken(req);

    jwt.verify(token, privateKey, function (err) {
        if (!err) {
            // Token is valid
            MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
                if (!err) {
                    const dbo = client.db(dbServer.database);

                    dbo.collection(userArgs.collection)
                        .find({}, { projection: { password: 0 }}).toArray((err, results) => {
                            if (!err) {
                                res.set(headers.getHeader)
                                    .status(200)
                                    .json(results);
                            } else {
                                res.status(500).end();
                            }
                        });

                    client.close();
                } else {
                    res.status(500)
                        .json({ status: 'Can not connect to the database server' });
                }
            });
        } else {
            // Token is not valid
            res.status(403)
                .json({ status: 'Access token is not valid' });
        }
    });

}

function searchUser(req, res) {
    const seekingUserId = req.params.id;
    const token = getAccessToken(req);

    jwt.verify(token, privateKey, function (err) {
        if (!err) {
            // Token is valid
            //  Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
            if (seekingUserId.length === 24) {
                MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
                    if (!err) {
                        const dbo = client.db(dbServer.database);

                        dbo.collection(userArgs.collection)
                            .find({ _id: new ObjectID(seekingUserId) }, { projection: { password: 0 }})
                            .limit(1)
                            .toArray((err, userInfo) => {
                                if (!err) {
                                    res.set(headers.getHeader)
                                        .status(200)
                                        .json(userInfo[0]);
                                } else {
                                    res.status(500).end();
                                }
                            });

                        client.close();
                    } else {
                        res.status(500)
                            .json({ status: 'Can not connect to the database server' });
                    }
                });
            } else {
                res.status(400).end();
            }
        } else {
            // Token is not valid
            res.status(403)
                .json({ status: 'Access token is not valid' });
        }
    });
}

function insertUser(req, res) {
    const token = getAccessToken(req);

    jwt.verify(token, privateKey, function (err) {
        if (!err) {
            // Token is valid
            MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
                if (!err) {
                    // Create dbo for database
                    const dbo = client.db(dbServer.database);

                    // Insert a new user and return the inserted user _id
                    dbo.collection(userArgs.collection)
                        .insertOne({ ...req.body }, function (err, result) {
                            if (!err) {
                                res.set(headers.changeDataHeader)
                                    .status(200)
                                    .json({ insertedId: result.insertedId });
                            } else {
                                res.status(500).end();
                            }
                        });

                    // Get the latest user list in database and emit data to all the clients
                    getLastUserListAndEmit(io, dbo, userArgs, res);

                    client.close();
                } else {
                    res.status(500)
                        .json({ status: 'Can not connect to the database server' });
                }
            });
        } else {
            // Token is not valid
            res.status(403)
                .json({ status: 'Access token is not valid' });
        }
    });
}

function updateUser(req, res) {
    const seekingObjectId = req.params.id;
    const token = getAccessToken(req);

    jwt.verify(token, privateKey, function (err) {
        if (!err) {
            // Token is valid
            if (seekingObjectId.length === 24) {
                MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
                    if (!err) {
                        const dbo = client.db(dbServer.database);

                        dbo.collection(userArgs.collection)
                            .updateOne(
                                { _id: new ObjectID(seekingObjectId) },
                                { $set: { ...req.body } }
                            )
                            .then(() => res.set(headers.changeDataHeader).status(200).end())
                            .catch(() => res.status(500).end());

                        getLastUserListAndEmit(io, dbo, userArgs, res);

                        client.close();
                    } else {
                        res.status(500)
                            .json({ status: 'Can not connect to the database server' });
                    }
                });
            } else {
                res.status(400).end();
            }
        } else {
            // Token is not valid
            res.status(403)
                .json({ status: 'Access token is not valid' });
        }
    });
}

function getLastUserListAndEmit(io, dbo, userArgs, res) {
    try {
        dbo.collection(userArgs.collection)
            .find({}, { projection: { password: 0 }}).toArray((err, results) => {
                if (!err) {
                    io.emit(userArgs.ioEvent, results);
                } else {
                    res.status(500).end();
                }
            });
    } catch (err) {
        res.status(500).end();
    }
}

/**
 * Check the user login information by their username and password
 * This route is an one more step to protect the database
 */
function checkLoginInfo(req, res) {
    const seekingInfo = req.body || {};

    // Checking for input data
    checkObject(seekingInfo)
        .then(() => {
            if (seekingInfo.username !== undefined &&
                seekingInfo.password !== undefined &&
                seekingInfo.username.length > 0 &&
                seekingInfo.password.length > 0) {

                queryUserInfo(req, res, { username: seekingInfo.username, password: seekingInfo.password });
            } else {
                res.status(500)
                    .json({ status: 'Input data is invalid' });
            }
        })
        .catch((err) => {
            res.status(500)
                .json({ status: false, message: err.message });
        });
}

// Check if a user exists with their information (Ex: username)
function checkUserExist(req, res) {
    const seekingInfo = req.body || {};

    // Checking for input data
    checkObject(seekingInfo)
        .then(() => queryUserInfo(req, res, seekingInfo))
        .catch((err) => {
            res.status(500)
                .json({ status: false, message: err.message });
        });
}

/**
 * Query the user information
 * @param {*} res : httpRequest
 * @param {*} seekingQuery = { JSON }
 */
function queryUserInfo(req, res, seekingQuery) {
    const token = getAccessToken(req);

    jwt.verify(token, privateKey, function (err) {
        if (!err) {
            // Token is valid
            MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
                if (!err) {
                    const dbo = client.db(dbServer.database);

                    dbo.collection(userArgs.collection)
                        .find(seekingQuery, { projection: { _id: 1 }})
                        .limit(1)
                        .toArray((err, userInfo) => {
                            if (!err) {
                                if (userInfo.length > 0) {
                                    // The user is matched
                                    res.set(headers.getHeader)
                                        .status(200)
                                        .json({
                                            status: true,
                                            message: "The user information is matched",
                                            _id: userInfo[0]._id
                                        });
                                } else {
                                    // The user is not matched
                                    res.set(headers.getHeader)
                                        .status(200)
                                        .json({
                                            status: false,
                                            message: "The user information is not matched"
                                        });
                                }
                            } else {
                                res.status(500).end();
                            }
                        });

                    client.close();
                } else {
                    res.status(500)
                        .json({ status: 'Can not connect to the database server' });
                }
            });
        } else {
            // Token is not valid
            res.status(403)
                .json({ status: 'Access token is not valid' });
        }
    });
}

module.exports = {
    getUsers,
    searchUser,
    insertUser,
    updateUser,
    checkLoginInfo,
    checkUserExist
}
