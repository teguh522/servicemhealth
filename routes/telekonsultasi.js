const router = require('express').Router()
const connection = require('../config/database')

router.route('/isichat').get((req, res) => {
    connection.query('SELECT * FROM chatting limit 1000', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.json(rows)
        }
    })
}).post((req, res) => {
    const { authBidan, authPasien, isichat, chatfrompasien } = req.body
    connection.query('INSERT INTO chatting(authBidan,authPasien,isichat,chat_from_pasien) values(?,?,?,?)',
        [authBidan, authPasien, isichat, chatfrompasien], (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.json(rows)
            }
        })
})
router.route('/isichat/:pasien').get((req, res) => {
    connection.query('SELECT * FROM chatting where authPasien=? order by id asc limit 1000',
        req.params.pasien, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.json(rows)
            }
        })
})

router.route('/isichat/:pasien/:bidan').put((req, res) => {
    connection.query('UPDATE chatting SET is_new=? where authPasien=? and authBidan=?',
        [req.body.is_new, req.params.pasien, req.params.bidan], (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                res.json(rows)
            }
        })

})


module.exports = router