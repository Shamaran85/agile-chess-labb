const { express, server, app, io, MongoClient, jwt, // Import system packages
    webServer, dbServer, // Import custom configs
    userArgs, eventArgs, privateKey // Import custom arguments
} = require('./config');

const cors = require('cors');

const { getUsers, searchUser, insertUser, updateUser, // Import the user route functions
    getEvents, searchEvent, insertEvent, updateEvent // Import the event route functions
} = require('./routes');

// Server listening port
server.listen(webServer.port, () => {
    console.log(`Express server with Socket.io is listening on port ${webServer.port}!`);
    console.log(`View your local API at\x1b[36m http://localhost:${webServer.port}\x1b[0m`);
});

app.use(cors());// Using CORS
app.use(express.json()); // Using for POST - Getting body.data

// ---------- CONNECTION CONTROL -----------
io.on('connection', (socket) => {
    console.log('A user is connected');

    // Check if the connection is broken from the client
    socket.on('disconnect', () => {
        console.log('A user is disconnected');
    });

    // Listen to receiving data from the client
    socket.on('clientInfo', function (data) {
        console.log(data);
        socket.emit('message', { text: 'I hear you client' }); // Answer the client
    });

    // Listen for new Chat Messages
    socket.on("message", function (msg) {
        io.emit("message", msg);
    });

    // Emit data direct when the client has connected successfully
    MongoClient.connect(dbServer.uri, { useNewUrlParser: true }, (err, client) => {
        if (!err) {
            const dbo = client.db(dbServer.database);

            getCurrentUserListAndEmit(socket, dbo, userArgs);
            getCurrentEventListAndEmit(socket, dbo, eventArgs);

            client.close();
        } else {
            console.error('Can not connect to the database server')
        }
    });
})
//--------- END CONNECTION CONTROL ---------

// ---------- BEGIN OF ROUTE DEFINITION -------------
// App route
/* app.get('/', function (req, res, next) {
    res.status(200)
        .sendFile(__dirname + webServer.rootDir + '/' + webServer.defaultPage);
}); */

// Token route
/* app.get('/token', function(req, res){
    var token = jwt.sign({ appname: "chess" }, privateKey);
    res.status(200).send(token);
}); */

// User routes
app.get('/users', getUsers);
app.get('/users/:id', searchUser);
app.post('/users', insertUser);
app.put('/users/:id', updateUser);

// Event routes
app.get('/events', getEvents);
app.get('/events/:id', searchEvent);
app.post('/events', insertEvent);
app.put('/events/:id', updateEvent);
//------------ END OF ROUTE DEFINITION --------------

//--------------- FUNCTIONS -----------------
function getCurrentUserListAndEmit(socket, dbo, userArgs) {
    try {
        dbo.collection(userArgs.collection)
            .find({}).toArray((err, users) => {
                if (!err) {
                    socket.emit(userArgs.ioEvent, users);
                } else {
                    console.error(err);
                }
            });
    } catch (err) {
        console.error('Error in getCurrentUserListAndEmit');
    }
}

function getCurrentEventListAndEmit(socket, dbo, eventArgs) {
    try {
        dbo.collection(eventArgs.collection)
            .find({}).toArray((err, events) => {
                if (!err) {
                    socket.emit(eventArgs.ioEvent, events);
                } else {
                    console.error(err);
                }
            });
    } catch (err) {
        console.error('Error in getCurrentEventListAndEmit');
    }
}
//------------- END FUNCTIONS ---------------
