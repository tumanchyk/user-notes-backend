const { login, register } = require('./auth');
const { getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace } = require('./places');

module.exports = { login, register, getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace };