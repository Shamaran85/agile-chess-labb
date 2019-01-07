const webServer = {
    rootDir: '/www',
    defaultPage: 'index.html',
    port: process.env.PORT || 1600
};

module.exports = {
    ...webServer
}