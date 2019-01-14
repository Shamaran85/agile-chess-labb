const { express, server, app, io, MongoClient, jwt, // Import system packages
    webServer, dbServer, // Import custom configs
    userArgs, eventArgs, privateKey // Import custom arguments
} = require('./config');

const cors = require('cors');

const { getUsers, searchUser, insertUser, updateUser, checkLoginInfo, checkUserExist, // Import the user route functions
    getEvents, searchEvent, insertEvent, updateEvent // Import the event route functions
} = require('./routes');

const mw = require('./middleware');

// Server listening port
server.listen(webServer.port, () => {
    console.log(`Express server with Socket.io is listening on port ${webServer.port}!`);
    console.log(`View your local API at\x1b[36m http://localhost:${webServer.port}\x1b[0m`);
});

app.use(cors());// Using CORS
app.use(express.json()); // Using for POST - Getting body.data

// ---------- CONNECTION CONTROL -----------
io.use((socket, next) => {
    // Connection authentication checking
    const handshake = socket.handshake;

    if (handshake.query && handshake.query.token) {
        const clientAccessToken = handshake.query.token;
        jwt.verify(clientAccessToken, privateKey, (err, decoded) => {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {
    // Authenticated connection tasks are here
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
    socket.on("chat", function (msg) {
        io.emit("chat", msg);
    });

    socket.on('room', payload => {
        const { id } = payload;
        socket.join(+id);
    })
    socket.on('move', (move) => {
        console.log("move", +move.roomId);
        io.to((+move.roomId)).emit('move', move)
    })

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


// App route
app.get('/', function (req, res, next) {
    res.status(200)
        .sendFile(__dirname + webServer.rootDir + '/' + webServer.defaultPage);
});


// ------ AUTHENTICATION ------
// Using checkAuth middleware
app.use(mw({ mwid: 'checkAuth' }));
// ------ END AUTHENTICATION ------


// ---------- BEGIN OF ROUTE DEFINITION -------------
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

// Login system
app.post('/auth', checkLoginInfo);
app.post('/checkuser', checkUserExist);
//------------ END OF ROUTE DEFINITION --------------

//--------------- FUNCTIONS -----------------
function getCurrentUserListAndEmit(socket, dbo, userArgs) {
    try {
        dbo.collection(userArgs.collection)
            .find({}, { projection: { password: 0 } }).toArray((err, users) => {
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

// Using errorHandling middleware
app.use(mw({ mwid: 'errorHandling' }));