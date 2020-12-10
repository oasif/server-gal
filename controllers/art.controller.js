const artService = require('../services/art.service')

module.exports = {
    artAdd,
    editArt,
    getArts,
    deleteArt,
    getEnrolledStudents,
    getPicture,
    getArtistPictures,
    likeArt,
    unlikeArt,
    favoriteArt,
    unfavoriteArt,
    getSearch,
};


function artAdd(req, res, next) {

    artService.addArt(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}

function likeArt(req, res, next) {

    artService.like(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function unlikeArt(req, res, next) {

    artService.unlike(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function favoriteArt(req, res, next) {
    //console.log("HIIIIIIII");
   // console.log("We're in here, the id is "+req.body.artid);
    //req.user.sub
   artService.favorited(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function unfavoriteArt(req, res, next) {

    artService.unfavorited(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function editArt(req, res, next) {

    artService.edit(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function getPicture(req,res,next){
    console.log('THe params are ',req.params);
    artService.getPicture(req.params.id).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}
function getArtistPictures(req,res,next){
    console.log('THe params are ',req.params);
    artService.getArtistPictures(req.params.artist).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}
function getSearch(req,res,next){
    console.log('THe params are ',req.params);
    artService.getSearch(req.params.word).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}
function getArts(req,res,next){
    console.log('GetArts()',req.body);
    artService.getAllArts(req).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}


//TODO: notice this new function.
function getEnrolledStudents(req,res,next){

    artService.getEnrolledStudents(req.params.id).then(students => {console.log('# of Students sent:', students.length);
        res.json(students)}).catch(err => next(err));
}

function deleteArt(req,res,next){
    console.log('DeleteArt()',req.params);
    artService.deleteArt(req.params.id).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}
