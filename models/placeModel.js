const { model, Schema } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const placeSchema = new Schema({
    country: {
        type: String,
        required: [true, "Country is required"]
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
    },
    image: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "places",
        require: true
    }

}, { versionKey: false, timestamps: true })

placeSchema.post("save", handleMongooseError);

const Place = model('Places', placeSchema);

module.exports = Place;
