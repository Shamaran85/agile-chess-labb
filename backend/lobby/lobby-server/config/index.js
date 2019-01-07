const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

const dbServer = require('./database');
const headers = require('./header');
const webServer = require('./webserver');

const userArgs = {
    collection: "users",
    ioEvent: "userList"
};
const eventArgs = {
    collection: "events",
    ioEvent: "eventList"
};

const privateKey = "txtPrivateKey";

module.exports = {
    express,
    app,
    server,
    io,
    MongoClient,
    ObjectID,
    jwt,
    privateKey,
    webServer,
    dbServer,
    headers,
    userArgs,
    eventArgs
}