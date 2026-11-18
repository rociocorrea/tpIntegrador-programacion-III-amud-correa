import connection from "../database/db.js";

const selectAllProducts = () => {
    return connection.query("SELECT * FROM products");
};

export default {
    selectAllProducts
}