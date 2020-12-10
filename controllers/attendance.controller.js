const attendanceService = require('../services/attendance.service')

module.exports = {
    createAttendance,
    attend,
    deleteAttendance,
    getAttendances,
    studentGetAttendances,
   
};


function createAttendance(req, res, next) {

    //TODO: handle requests that create new attendance objects.
    console.log(req.body);
    attendanceService.createAttendance(req)
    .then((message) => res.json(message))
    .catch(err => next(err));


}

function attend(req,res,next){

    
    attendanceService.attend(req)
    .then((message) => res.json(message))
    .catch(err => next(err));
    //TODO: handle students requests for tracking their attendance via accessCode.

}


//TODO (optional/bonus): handle requests for deleting attendance objects.
function deleteAttendance(req,res,next){


}


//TODO: here you handle creators request to retrieve a list of attendances for a given art.
function getAttendances(req,res,next){
    attendanceService.getAttendances(req.params.id).then(attendances => {console.log('# of attendances sent:', attendances.length);
    res.json(attendances)}).catch(err => next(err));
}


//TODO: here students request their progress for a given art
function studentGetAttendances(req,res,next){


    //TODO: on the front end students expect a simple JSON with two fields: 'sartTime' (Date), 'missed' (Boolean). Your job is to produce such request.  Hint: Unfortunately, .map(...) doesn't seem to working too well with node so you are better off using "array.forEach( (entry)=> {...});" Hint2: if you want to add something to an array object you can "arrayObj.push(someItem);"

    attendanceService.studentGetAttendances(req.params.id).then(attendances => {console.log('# of attendances sent:', attendances.length)



        //TODO: result should be an array of simple JSONs that contain 'sartTime' (Date), 'missed' (Boolean).

        // console.log('modified attendances:', modified);
        res.json(attendances)}).catch(err => next(err));
}
