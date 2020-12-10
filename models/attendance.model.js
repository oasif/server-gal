const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document

const schema = new Schema({
    //TODO: need to define the following in this schema:
    // -'prof' -- the author of the attendance tracker),
    // -'art' -- object ID of the art for which this attendance is going to count
    // -'startTime -- date for when this starts
    // -'duration' -- minutes after which the accessCode is considered expired
    // - 'accessCode' -- has to be unique
   // prof: { type: String, required: true },
    art: { type: String, required: true },
    startTime: { type: Date, default: Date.now,  required: true },
    //startTimeHourMinute: { type: Time,  required: true },
    
    duration: { type: Number,  required: true},
    accessCode: {type: Number,  required: true },
    students: [{ type:  Schema.Types.ObjectId, ref: 'User' }]

    //TODO: modify to keep a list of users that have attended the attendance.
    // Hint:https://mongoosejs.com/docs/populate.html#deep-populate


});

//this makes startTime and art object id unique because it makes no sense to have two identical attendance tracker documents.
schema.index({startTime:1, art:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Attendance', schema);
