const { login, register, logout, current } = require('./auth');
const { getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace } = require('./places');

module.exports = { login, register, logout, current, getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace };