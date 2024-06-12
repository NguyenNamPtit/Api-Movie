const mongoose = require('mongoose')
const filmSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        image: {type: String, required: true},
        date: {type: Date, required: true},
        rating: {type: Number, required: true},
        author: {type: String, require:true},
        video: {type: Buffer, required: true},
        description: {type: String, required:true}
    },
    {
        timestamps: true,
    }
);

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;