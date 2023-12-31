const express = require("express");
const cors = require('cors')

const bodyParser = require("body-parser");
const { checkAuth } = require('./middleware');
const { login, register, logout, current, getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace } = require('./controllers');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/login", login);

app.post("/register", register);

app.use(checkAuth);

app.get("/current", current);

app.post("/logout", logout);

app.get("/places",  getAllPlaces);

app.get("/places/:id",  getPlaceById);

app.post("/places",  createPlace);

app.put("/places/:id",  updatedPlace)

app.delete("/places/:id",  deletePlace)

module.exports = app;
