const express = require('express');
const cors = require('cors')
const uploadroute = require('./routes/upload')
const app = express()
const port = 4000

app.use(cors({
    origin: "https://mhealth-pwa.vercel.app",
    methods: "POST",
    optionsSuccessStatus: 200
}))
app.use('/upload', uploadroute)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})