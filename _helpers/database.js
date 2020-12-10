//TODO: don't forget about the database renaming trick from the video. You can simply change the name to start from scratch.
const config = require('../config.json');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

module.exports = {
    User: require('../models/user.model'),
    Art: require('../models/art.model'),
    Attendance: require('../models/attendance.model')
    };
