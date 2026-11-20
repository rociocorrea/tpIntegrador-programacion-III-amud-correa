import connection from "../database/db.js";

const selectAllProducts = () => {
    return connection.query("SELECT * FROM products");
};

const selectProductById = (id) => {
    return connection.query(`SELECT * from products WHERE products.id = ?`, [id]);
};

const insertProduct = (category, image, name, price) => {
    return connection.query(`INSERT into products (category, image, name, price) VALUES (?, ?, ?, ?)`, [category, image, name, price]);
};

const updateProduct = (id, category, image, name, price, active) => {
    return connection.query(`UPDATE products SET category = ?, image = ?, name = ?, price = ?, active = ? WHERE products.id = ?`, 
        [category, image, name, price, active, id]);
}

const deleteProductById = (id) => {
    return connection.query(`UPDATE products SET active = 0 WHERE products.id = ?`, [id]);
};

export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProductById, 
}