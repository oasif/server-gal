var express = require('express');
var router = express.Router();
const artController = require('../controllers/art.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

var multer  = require('multer');
var Art = require('../models/art.model');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

// router.post('/addart', artController.artAdd);
router.post('/addart', upload.single('file'), function(req, res, next) {
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        req.body.imageLink = 'http://localhost:4000/images/' + req.file.filename;
        Art.create(req.body, function (err, art) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(art);
        });
    }
});

router.post('/edit', artController.editArt);

router.post('/like', artController.likeArt);
router.post('/unlike', artController.unlikeArt);
router.post('/favorite', artController.favoriteArt);
router.post('/unfavorite', artController.unfavoriteArt);

router.get('/getarts', artController.getArts);
router.delete('/:id',authorize(Role.creator), artController.deleteArt);
router.get('/getPicture:id', artController.getPicture);
router.get('/getArtistPictures:artist', artController.getArtistPictures);
router.get('/getSearch:word', artController.getSearch);

//TODO: notice this new route.It retrieves all students enrolled in a given art.
router.get('/getstudents:id',authorize(Role.creator), artController.getEnrolledStudents);


module.exports = router;
