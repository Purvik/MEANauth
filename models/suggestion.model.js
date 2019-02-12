const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
    title : { type: String },
    description : { type : String },
    status : { type : String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
