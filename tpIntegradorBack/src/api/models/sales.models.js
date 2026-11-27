import connection from "../database/db.js";

const insertSale = (date, totalPrice, userName) => {
    return connection.query(`INSERT into sales (date, total_price, user_name) VALUES (?, ?, ?)`, [date, totalPrice, userName]);
};

const insertProductSale = (idProduct, idSale) => {
    return connection.query(`INSERT into product_sales (product_id, sale_id) VALUES (?, ?)`, [idProduct, idSale]);
};

export default {
    insertSale,
    insertProductSale
}