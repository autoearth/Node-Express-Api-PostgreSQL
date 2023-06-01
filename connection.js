const {Client} = require("pg");
const client = new Client({
    user:'postgres', // default postgres
    host:'localhost', //localhost
    database:'postgres', // `my_todos_db`
    password:'password', //added during PostgreSQL and pgAdmin installation
    port:'5432' //default port
});

module.exports = client;