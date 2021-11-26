const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.NODE_ENV === 'production' ? process.env.PROD_HOST : process.env.DEV_HOST,
    user: process.env.NODE_ENV === 'production' ? process.env.PROD_USER : process.env.DEV_USER,
    password: process.env.NODE_ENV === 'production' ? process.env.PROD_PASS : process.env.DEV_PASS,
    database: process.env.NODE_ENV === 'production' ? process.env.PROD_DB : process.env.DEV_DB,
});

connection.connect((err) => {
    if (err) {
        console.log("Koneksi DB Error!" + err.stack);
        return
    }
    console.log("Koneksi DB Berhasil");
})

module.exports = connection