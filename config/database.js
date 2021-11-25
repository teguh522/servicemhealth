const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: '83.136.216.1',
    user: 'u5582922_mhealth',
    password: 'B1smillah*#',
    database: 'u5582922_mhealth'
});

connection.connect((err) => {
    if (err) {
        console.log("Koneksi DB Error!" + err.stack);
        return
    }
    console.log("Koneksi DB Berhasil");
})

module.exports = connection