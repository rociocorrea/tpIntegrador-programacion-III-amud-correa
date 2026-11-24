import connection from "../database/db.js";


const selectUser = (email, password) => {
    return connection.query("SELECT * FROM users where email = ? and password = ?", [email, password]);
}

export default{
    selectUser
}

