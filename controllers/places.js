const { Place } = require('../models');
const cloudinary = require('../helpers/cloudinary')
const fs = require('fs/promises');

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
        const { path: oldPath } = req.file;
        const { _id: owner } = req.user;
        const data = req.body;
        const fileData = await cloudinary.uploader.upload(oldPath, { folder: "media" });
        await fs.unlink(oldPath);
        const place = await Place.create({...data, owner, image: fileData.url });

        if (!place) {
        return res.status(404).json({message: 'Place not created'})
        }
        if (!fileData || !fileData.url) {
            throw new Error("Image upload to Cloudinary failed");
        }

        return res.status(201).json({ place });
    } catch (err) {
          console.error("Error creating place:", err);

        // Log more specific error details
        if (err.response) {
            // Cloudinary or external API error
            console.error("Cloudinary Error:", err.response.data);
            return res.status(500).json({ error: "Cloudinary error", details: err.response.data });
        } else if (err.request) {
            // Request was made, but no response
            console.error("No response received from Cloudinary");
            return res.status(500).json({ error: "No response from Cloudinary" });
        } else {
            // Internal server error or some other error
            console.error("Server error:", err.message);
            return res.status(500).json({ error: "Server error", message: err.message });
        }
    }
}

const updatedPlace = async (req, res) => {
    try{
    const placeId = req.params.id;
    const { country, places, date, overview, isVisited } = req.body;
    const { path: oldPath } = req.file;
    const fileData = await cloudinary.uploader.upload(oldPath, { folder: "media" });
    await fs.unlink(oldPath);
    const updatedPlace = await Place.findByIdAndUpdate(placeId, { country, places, date, overview, isVisited, image: fileData.url }, { new: true });
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
       return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

module.exports = { getAllPlaces, getPlaceById, createPlace, updatedPlace, deletePlace };
