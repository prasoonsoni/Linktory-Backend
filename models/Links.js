const mongoose = require('mongoose');
const {Schema} = mongoose;

const LinkSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    username:{
        type:String,
        required:true
    },
    links:{
        type:[{name:String,link:String}]
    }
});

module.exports = mongoose.model("Links", LinkSchema);