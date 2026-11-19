import connection from "../database/db.js";

const selectAllProducts = () => {
    return connection.query("SELECT * FROM products");
};

const selectProductById = (id) => {
    return connection.query(`SELECT * from products WHERE products.id = ? AND active = 1`, [id]);
};

const deleteProductById = (id) => {
    return connection.query(`UPDATE products SET active = 0 WHERE products.id = ?`, [id]);
};

export default {
    selectAllProducts,
    selectProductById,
    deleteProductById
}