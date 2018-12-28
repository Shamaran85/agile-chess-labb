# The simple realtime API - Client side
The simple realtime API is based on Nodejs, Expressjs, MongoDB, Socket.io and JWT. You may want to view the online demo [here](https://nguyenkhois.github.io/api-socketio-mongodb/client/dist/).

Server side
* Nodejs
* Expressjs
* MongoDB version 4 on AWS (or mLab version 3 on Heroku)
* Socker.io
* JWT
* Docker on AWS

Client side:
* React
* RxJS

Hosting:
* Amazon Web Service (AWS)
* Heroku

## Feature
* Using access token (JWT) for all client requests.
* Supported methods are only GET, POST and PUT.
* It returns `insertedId` when you insert new data into the database via this API.
* The API is hosted both at:
    * http://aws.vlexikon.com:1600/ (It's always ready to use.)
    * https://gsockapi.herokuapp.com/ -> With SSL (You may wait for a while when you access this API in the first time.)

* You must have __ACCESS TOKEN__ for all requests. :-)

|Entry point|Supported method|Description|
|---|---|---|
|`/users`|GET, POST|Get the user list or insert a new user.|
|`/users/:id`|GET, PUT|Get or edit the specific user information by id.|
|`/events`|GET, POST|Get the event list or insert a new event.|
|`/events/:id`|GET, PUT|Get or edit the specific event information by its id.|

* The realtime data are emited whenever you make a change in database via these events:
	* `userList` - It returns the current user list.
	* `eventList` - It returns the current event list.

## Using
You may want to use [Insomnia](https://insomnia.rest/) for your test. It makes your life easier. ;-)

* View `/src/config/index.js` file if you want to know about the API config.
* Open the web browser console to view the results.
* Run `npm i` to install all needed dependencies.
* Run `npm start` to start your local web server at `http://localhost:9000`.