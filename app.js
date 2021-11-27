require('dotenv').config();
const express = require('express');
const cors = require('cors')
// const cron = require('node-cron');
const uploadroute = require('./routes/upload')
const adminroute = require('./routes/adminroute');
const telekonsultasi = require('./routes/telekonsultasi');
// const sendemail = require('./handlers/sendemail');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/adminroute', adminroute)
app.use('/telekonsultasi', telekonsultasi)


app.use('/upload', uploadroute)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})