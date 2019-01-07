const userRoutes = require('./user');
const eventRoutes = require('./event');

module.exports = {
    ...userRoutes,
    ...eventRoutes
}