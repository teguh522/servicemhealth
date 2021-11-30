const router = require('express').Router()
const connection = require('../config/database')
const fs = require('fs')
const multer = require('multer');
const path = require('path')
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})
router.route('/prokes').get((req, res) => {
    connection.query('SELECT * from prokes order by id desc limit 500', (err, result, fields) => {
        if (err) res.status(400).json({ message: err })
        res.json(result)
    })
})
    .delete((req, res) => {
        connection.query('select * from prokes where id=?', req.query.id, (err, result) => {
            if (err) res.status(400).json({ message: err })
            fs.unlink(`public/images/${result[0].gambar}`, (err) => {
                if (err) return console.log(err);
            })
            connection.query('delete from prokes where id=?', result[0].id, (err, hasil) => {
                res.status(200)
            })

        })
    })
    .post(imageUpload.single('image'), (req, res) => {
        connection.query('insert into prokes(judul,deskripsi,gambar,urlvideo) value(?,?,?,?)',
            [req.body.judul, req.body.deskripsi, req.file.filename, req.body.urlvideo], (err, result) => {
                if (err) res.status(400).json({ message: err })
                res.status(200).json("berhasil")
            })
    }, (error, req, res, next) => {
        res.status(400).send({ code: 400, error: error.message })
    })
router.route('/prokes/:id').get((req, res) => {
    connection.query('SELECT * from prokes where id=?', req.params.id, (err, result, fields) => {
        if (err) res.status(400).json({ message: err })
        res.json(result)
    })
})

router.route('/rujukan').post((req, res) => {
    connection.query('insert into rujukan(authPasien,authPks,catatan) value(?,?,?)',
        [req.body.authPasien, req.body.authPks, req.body.catatan], (err, result) => {
            if (err) res.status(400).json({ message: err })
            res.status(200).json("berhasil")
        })
})

module.exports = router