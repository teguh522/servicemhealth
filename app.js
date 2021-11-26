require('dotenv').config();
const express = require('express');
const cors = require('cors')
// const cron = require('node-cron');
const uploadroute = require('./routes/upload')
const adminroute = require('./routes/adminroute');
const connection = require('./config/database');
// const sendemail = require('./handlers/sendemail');


const app = express()
const port = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? "https://bundaqita.com" : "*",
    methods: "POST,GET,DELETE",
    optionsSuccessStatus: 200
}))
app.use(express.static(__dirname + '/public'));

// cron.schedule('*/2 * * * *', () => {
//     // sendemail().catch(console.error)

// }, {
//     scheduled: true,
//     timezone: "Asia/Jakarta"
// });


app.get('/', (req, res) => {
    res.json("Hello!!!")
})

app.get('/status', (req, res) => {
    connection.connect((err) => {
        if (err) {
            res.json(err)
            return
        }
        res.json({
            prod: process.env.NODE_ENV,
            host: process.env.NODE_ENV === 'production' ? process.env.PROD_HOST : process.env.DEV_HOST,
            user: process.env.NODE_ENV === 'production' ? process.env.PROD_USER : process.env.DEV_USER,
            password: process.env.NODE_ENV === 'production' ? process.env.PROD_PASS : process.env.DEV_PASS,
            database: process.env.NODE_ENV === 'production' ? process.env.PROD_DB : process.env.DEV_DB,
            status: "Koneksi DB Berhasil"
        })
    })

})

app.use('/adminroute', adminroute)


app.use('/upload', uploadroute)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})