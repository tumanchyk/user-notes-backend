const { model, Schema } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const placeSchema = new Schema({
    country: {
        type: String,
        required: [true, "Task description is required"]
    },
    places:{
        type: String,
    },
    date:{
        type: String,
    },
    overview:{
        type: String,
    },
    isVisited: {
        type: Boolean,
        default: false
    }
})

placeSchema.post("save", handleMongooseError);

const Place = model('Places', placeSchema);

module.exports = Place;
