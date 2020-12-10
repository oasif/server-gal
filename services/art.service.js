const db = require('../_helpers/database');
const mongoose = require("mongoose");
const Art = db.Art;
const User = db.User;


module.exports = {
    getAllArts,
    addArt,
    deleteArt,
    getEnrolledStudents,
    getPicture,
    getArtistPictures,
    favorited,
    unfavorited,
    like,
    unlike,
    edit,
    getSearch
}


async function getAllArts() {

    return await Art.find().populate({path:'createdBy',select:'username'});
}

async function deleteArt(id) {
     return await Art.deleteOne({"_id":id});
}
async function getPicture(id) {
    console.log("We're in here, the id is "+ id);
    const test = await Art.find({"_id":id});
    console.log("The response is " + test);
    return test;


}


    //const test = await Art.find({"_id":id});
  //  return await Art.updateOne({_id:id}, {$push: {likeTotal: likeTotal +1}}, {$push: {liked: true}});


async function favorited(req) {
    //const test = await Art.find({"_id":id});
    
    return await Art.updateOne({_id:req.body.artID}, {favorited: true});

   


}

async function like(req) {
    const test = await Art.find({"_id":req.body.artID});
    console.log(test);

    return await Art.update({_id:req.body.artID},  {"likeTotal": req.body.value, "liked": true});

}
async function unlike(req) {
    const test = await Art.find({"_id":req.body.artID});
    console.log(test);
    return await Art.update({_id:req.body.artID},   {"likeTotal": req.body.value, "liked": false});

}
async function edit(req) {
    const test = await Art.find({"_id":req.body._id});
    console.log(req.body);
    console.log("Helloooooo");
    //Art.update({_id:req.body._id},  {pieceInfo: req.body.pieceInfo}, {imageLink: req.body.imageLink});
    return await Art.updateOne({_id:req.body._id}, { "pieceInfo" : req.body.pieceInfo, "imageLink": req.body.imageLink,  "tags": req.body.tags,  "medium": req.body.medium, "pieceName": req.body.pieceName });
   // {medium: req.body.medium},{ pieceName: req.body.pieceName}
  // return await Art.update({_id:req.body._id},  {pieceInfo: req.body.pieceInfo}, {imageLink: req.body.imageLink},{medium: req.body.medium}, tags: req.body.tags} );

}
async function unfavorited(req) {
    //const test = await Art.find({"_id":id});
    
    return await Art.updateOne({_id:req.body.artID}, {favorited: false});

   


}

async function getArtistPictures(artist) {
    console.log("We're in here, the artist name is "+ artist);
    const test = await Art.find({'artistName':artist});
    console.log("The response is " + test);
    return test;


}
async function getSearch(word) {
    console.log("We're in here, the word is "+ word);
    const test = await Art.find({'tags':word});
    console.log("The response is " + test);
    return test;


}

//TODO: notice this new function.
async function getEnrolledStudents(id) {
    const hi =  await User.find({'arts': mongoose.Types.ObjectId(id), role:'Student'}).select('-hash -arts');
   // console.log(hi);
    return hi;
}

async function addArt(req) {

    let art = req.body;
    console.log(art);
    // validate
    
     if(!req.user.sub){
        throw 'Error with the user submitting request. User information missing. Malformed request.';
    }
    //populate missing fields in the art object
    art.createdBy = req.user.sub;
    art.createdDate =  Date.now();

    art = new Art(art);


    // save user
    await art.save();
}
