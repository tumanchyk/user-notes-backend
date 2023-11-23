const { login, register, logout } = require('./auth');
const { getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace } = require('./places');

module.exports = { login, register, logout, getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace };