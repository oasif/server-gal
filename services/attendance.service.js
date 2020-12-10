

const db = require('../_helpers/database');
const mongoose = require("mongoose");
const artService = require('./art.service');
const User = db.User;
const Art = db.Art;
const Attendance = db.Attendance;


module.exports = {
    studentGetAttendances,
    getAttendances,
    deleteAttendance,
    attend,
    createAttendance
}



//TODO: you need to produce an array of JSONs with 'sartTime' (Date), 'missed' (Boolean). It is up to you whether to do it here or in the controller.
async function studentGetAttendances(id) {
    console.log("We're in here");
    const test = await Attendance.find({'art':mongoose.Types.ObjectId(id)});
    console.log("The response is " + test);
    return test;


}

//TODO: here you provide a list of attendances for a given art ID.
// Remember that on the Angular side the component wants to display  'username', 'firstName', 'lastName', 'attendanceRate', 'id'. Hint: use Mongoose's .populate({path:'...', select:'field1 field2 field3'});
async function getAttendances(id) {
    
    const test = await Attendance.find({'art':mongoose.Types.ObjectId(id)});
    console.log("The response is " + test);
    return test;
    //return await Attendance.find({'_id': req.body.artid}).select('-hash -attendances');

}

//TODO (optional/bonus): delete an attendance object. The req object will contain the id of the attendance object.
async function deleteAttendance(req) {


}



// TODO: handle students requests to 'attend'
//  Here you receive 'accessCode' and user's
//  ObjectId in 'req.user.sub' you must deal
//  with the following cases (in addition to the positive one):
//  -- invalid access code,
//  -- expired access code,
//  -- used access code (already attended),
//  -- not enrolled in the art Hint: use
//  'new Date(...).getTime()' to measure expiration.
//  Keep in mind that that getTime() return milliseconds
//  and we want to measure difference in minutes.
async function attend(req) {

    console.log("The access code is: " + req.body.accessCode );
    console.log("The user is " + req.user.sub);
    const user = await User.findOne({_id:req.user.sub}); // the user is registered for the art
    const attendance = await Attendance.findOne({accessCode:req.body.accessCode}); // find the Attanced object that matches the code 
    if(attendance == null){
        throw  "Invalid  access code,  inncorect number";
    }
    const art = await Art.findOne({_id: attendance.art});
    if(art == null){
        throw  "Invalid  access code, couldn't find art";
    }
    console.log("We got here", art._id);

    console.log("We got here",user.arts[3] );
    var i;
    var check = false;
    for(i =0; i<5; i++){
        var c = user.arts[i];
        c = String(c);
        if(c.localeCompare(art._id) == 0){
            console.log("The user is registered");
            check = true;
            break;
        }
    }
    if(check == false){
        throw  "The user is not registered for the art";
    }
    console.log(attendance.students.size);
    console.log(attendance.students.length);
    for(i =0; i<attendance.students.length; i++){
        console.log(attendance.students[i]);
        if(String(attendance.students[i]).localeCompare(user._id) == 0){
            throw "The user has already attended the art";
            
        }
    }
    var date = attendance.startTime; // some mock date
    var milliseconds = date.getTime()  ;
    milliseconds = milliseconds + attendance.duration;
    var currDate = new Date();
    var curr =  currDate.getTime(); 
    console.log("The code time is " + milliseconds);
    console.log("The current time is " + curr);
    if( milliseconds - curr < 0){
        throw "The code has expired";
    }
    return await Attendance.updateOne({accessCode:req.body.accessCode}, {$push: {students:req.user.sub}})
    

}


// TODO: here you need to process creator requests to create new attendance objects.
//  Hint: you can retrieve creator's ObjectId via 'req.user.sub' and use it to fill the missing field in the request body.
async function createAttendance(req) {
    
    let attendance = req.body

    // validate
    /*if (await Attendance.findOne({ artNumber: art.artNumber, artDept: art.artDept  })) {
        throw 'Art "' + art.artDept + art.artNumber +'" already exists';
    }*/
   
    if(req == null){
        throw 'Error with the user submitting request. User information missing. Malformed request.';
    }
    //populate missing fields in the art object
    console.log("The user is " + req.user.sub);
    console.log("got to here");
    attendance = new Attendance(attendance);
    //attendance.prof = req.user.sub;
    console.log("got to here2");
    console.log(attendance);

    // save user
    await attendance.save();
    console.log("got to here3");


}
