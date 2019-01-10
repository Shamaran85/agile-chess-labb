# The simple realtime API - Server side
The simple realtime API is based on Nodejs, Expressjs, MongoDB, Socket.io and JWT.

Server side
* Nodejs
* Expressjs
* MongoDB version 4
* Socket.io
* JWT

Hosting:
* Docker
* Amazon Web Service (AWS)

## Feature
* Using access token (JWT) for all client requests.
* Supported methods are only GET, POST and PUT.
* It returns `insertedId` when you insert new data into the database via this API.
* The API is hosted at [http://aws.vlexikon.com:1600/](http://aws.vlexikon.com:1600/)

* You must have __ACCESS TOKEN__ for all requests. :-)

|Entry point|Supported method|Description|
|---|---|---|
|__User__|
|`/users`|GET, POST|Get the user list or insert a new user.|
|`/users/:id`|GET, PUT|Get or edit the specific user information by id.|
|__Event - Game__|
|`/events`|GET, POST|Get the event list or insert a new event.|
|`/events/:id`|GET, PUT|Get or edit the specific event information by its id.|
|__Login system__|
|`/auth`|POST||
|`/checkuser`|POST||

* The realtime data are emited whenever you make a change in database via these events:
	* `userList` - It returns the current user list.
	* `eventList` - It returns the current event list.

## Using
* Installed MongoDB is the first requirement.
* Create a new database with this name `chessdb`.
* Change the API configs at:
    * `/config/database.js`: for database MongoDB.
    * `/config/webserver.js`: for Expressjs server.
* Run `npm i` to install all needed dependencies.

You may want to use [Insomnia](https://insomnia.rest/) for your test. It makes your life easier. ;-)

## Tested
* mLab on Heroku (MongoDB 3.6.9).
* MongoDB 4.1.6 on AWS.