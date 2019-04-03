const env = require('../common/Environment');

let connection = {
    host    : env.database.host,
    port    : env.database.port,
    database: "blsi",
    username: env.database.username,
    password: env.database.password,
    dialect : "mysql",
    location: "./data/blsi.db"
};

module.exports = connection;