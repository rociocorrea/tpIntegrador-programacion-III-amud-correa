import connection from "../database/db.js";

const selectAllProducts = () => {
    return connection.query("SELECT * FROM products");
};

const selectProductById = (id) => {
    return connection.query(`SELECT * from products WHERE products.id = ?`, [id]);
};

export default {
    selectAllProducts,
    selectProductById
}