const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document

const schema = new Schema({
    pieceName :{type: String, required: true},
    // image stuff
    tags: [{type: String, required: true}],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    artistName : {type: String, required: false},
    favorited: {type: Boolean, required: false},
    medium : {type: String, required: true},
    pieceInfo: {type: String, required: true},
    dateCreated: { type: Date, default: Date.now },
    imageLink: {type: String, required: true},
    liked: {type: Boolean, default: false},
    likeTotal: {type: Number,default: 0},
});

schema.index({artNumber:1, artDeptCode:1}, { unique: false });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Art', schema);
