const { Place } = require('../models');

const getAllPlaces = async (req, res) => {
    try {
        const { _id: owner } = req.user;
        const places = await Place.find({owner});
        return res.status(200).json(places);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}

const getPlaceById = async (req, res) => {
    const placeId = req.params.id;
    try{
        const place = await Place.findById(placeId);
        if (!place) {
        return res.status(404).json({message: `Place with id: ${placeId} not found`})
        }
        return res.status(200).json(place);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}

const createPlace = async (req, res) => {
    try {
        const { _id: owner } = req.user;
        const data = req.body;
        const place = await Place.create({...data, owner });

        if (!place) {
        return res.status(404).json({message: 'Place not created'})
        }

        return res.status(201).json({ place });
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}

const updatedPlace = async (req, res) => {
    try{
    const placeId = req.params.id;
    const {country, places, date, overview, isVisited} = req.body;
    const updatedPlace = await Place.findByIdAndUpdate(placeId, { country, places, date, overview, isVisited }, { new: true });
    if (!updatedPlace) {
    return res.status(404).json({message: 'Place not updated'})
    }
    return res.status(200).json(updatedPlace);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}

const deletePlace = async (req, res) => {
    try {
        const placeId = req.params.id;
        const place = await Place.findByIdAndDelete(placeId);
        if (!place) {
        return res.status(404).json({message: 'Place not deleted'})
        }
        console.log(place);
        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

module.exports = { getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace };
