const { io, MongoClient, ObjectID, dbServer, headers, eventArgs } = require('../config');
    
// USING FOR THE EVENT ROUTES
function getEvents(req, res, next) {
    MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
        if (!err) {
            const dbo = client.db(dbServer.database);

            dbo.collection(eventArgs.collection)
                .find({}).toArray((err, results) => {
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
            next(Error("d001")); // Can not connect to the database server
        }
    });
}

function searchEvent(req, res, next) {
    const seekingObjectId = req.params.id;

    //  Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
    if (seekingObjectId.length === 24) {
        MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
            if (!err) {
                const dbo = client.db(dbServer.database);

                dbo.collection(eventArgs.collection)
                    .find({ _id: new ObjectID(seekingObjectId) })
                    .limit(1)
                    .toArray((err, eventInfo) => {
                        if (!err) {
                            res.set(headers.getHeader)
                                .status(200)
                                .json(eventInfo[0]);
                        } else {
                            res.status(500).end();
                        }
                    });

                client.close();
            } else {
                next(Error("d001")); // Can not connect to the database server
            }
        });
    } else {
        next(Error("e001")); // Event ID is invalid
    }
}

function insertEvent(req, res, next) {
    MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
        if (!err) {
            const dbo = client.db(dbServer.database);

            // Insert a new user and return the inserted user _id
            dbo.collection(eventArgs.collection)
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
            getLastEventListAndEmit(io, dbo, eventArgs, res);

            client.close();
        } else {
            next(Error("d001")); // Can not connect to the database server
        }
    });
}

function updateEvent(req, res, next) {
    const seekingObjectId = req.params.id;

    if (seekingObjectId.length === 24) {
        MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
            if (!err) {
                const dbo = client.db(dbServer.database);

                dbo.collection(eventArgs.collection)
                    .updateOne(
                        { _id: new ObjectID(seekingObjectId) },
                        { $set: { ...req.body } }
                    )
                    .then(() => res.set(headers.changeDataHeader).status(200).end())
                    .catch(() => res.status(500).end());

                getLastEventListAndEmit(io, dbo, eventArgs, res);

                client.close();
            } else {
                next(Error("d001")); // Can not connect to the database server
            }
        });
    } else {
        next(Error("e001")); // Event ID is invalid
    }
}

function getLastEventListAndEmit(io, dbo, eventArgs, res) {
    try {
        dbo.collection(eventArgs.collection)
        .find({}).toArray((err, results) => {
            if (!err) {
                io.emit(eventArgs.ioEvent, results);
            } else {
                res.status(500).end();
            }
        });
    } catch(err) {
        res.status(500).end();
    }
}

module.exports = {
    getEvents,
    searchEvent,
    insertEvent,
    updateEvent
}
