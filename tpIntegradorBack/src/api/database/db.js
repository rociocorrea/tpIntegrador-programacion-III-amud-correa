import mysql2 from "mysql2/promise"

import environment from "../config/environments.js";

const { database } = environment;

const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;