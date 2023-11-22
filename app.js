const express = require("express");
const cors = require('cors')

const bodyParser = require("body-parser");
const { checkAuth } = require('./middleware');
const { login, register, getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace } = require('./controllers');

const app = express();

app.use(cors())

app.use(bodyParser.json());


app.post("/login", login);

app.post("/register", register);

app.get("/places",  getAllPlaces);

app.get("/places/:id", checkAuth, getPlaceById);

app.post("/places", checkAuth, createPlace);

app.put("/places/:id", checkAuth, updatedPlace)

app.delete("/places/:id", checkAuth, deletePlace)

module.exports = app;
