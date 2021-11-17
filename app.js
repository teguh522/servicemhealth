const express = require('express');
const cors = require('cors')
const uploadroute = require('./routes/upload')
const app = express()
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "https://mhealth-pwa.vercel.app",
    methods: "POST,GET",
    optionsSuccessStatus: 200
}))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.json("Hello!!!")
})


app.use('/upload', uploadroute)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})