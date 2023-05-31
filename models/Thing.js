const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description:{type: String, required: true},
    imageUrl: {type: String},
    price:{type: Number, required:true},
    userId:{type: String}

});

module.exports= mongoose.model('Thing', thingSchema);