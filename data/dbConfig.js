const knex = require("knex");
const config = require("../knexfile.js");
// process.env.DB_ENV ||
const environment = "testing";

module.exports = knex(config[environment]);
