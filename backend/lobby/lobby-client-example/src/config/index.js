const socketAPI = {
    //address: 'http://aws.vlexikon.com:1600', //MongoDB version 4.1.6
    address: 'https://gsockapi.herokuapp.com', // MongoDB version 3.6.9
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBuYW1lIjoiY2hlc3MiLCJpYXQiOjE1NDU5MDYzMTh9.Jkyy-52zyb7K3xJz4-K3Fr2GmM0dHrxjFThoUTmx4t4'
};

const userArgs = {
    collection: "users",
    ioEvent: "userList",
    fetchUrl: `${socketAPI.address}/users`
};
const eventArgs = {
    collection: "events",
    ioEvent: "eventList",
    fetchUrl: `${socketAPI.address}/events`
};

module.exports = {
    socketAPI,
    userArgs,
    eventArgs
}