const config = {
    username: "admin",
    password: "123",
    address: "192.168.47.130",
    port: 27018,
    database: "chessdb"
};

module.exports = {
    uri: `mongodb://${config.username}:${config.password}@${config.address}:${config.port}`,
    database: config.database
};
