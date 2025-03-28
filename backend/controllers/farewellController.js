const Farewell = require('../models/farewellModel');


const getAllFarewell = async (req, res) => {
    try {
        const farewells = await Farewell.find();
        res.status(200).json(farewells);
    } catch (error) {
        res.status(500).json({ message: "Error fetching farewells", error });
    }
};

const getFarewellById = async (req, res) => {
    try {
        const farewell = await Farewell.findById(req.params.id);
        if (!farewell) {
            return res.status(404).json({ message: "Farewell not found" });
        }
        res.status(200).json(farewell);
    } catch (error) {
        res.status(500).json({ message: "Error fetching farewell", error });
    }
};

const handleAddFarewell = async (req, res) => {
    try {
        const { title, description, date, venue, finalYearStudentsPresent, juniorPresent } = req.body;
        const coverImageURL = req.file ? req.file.path : "/uploads/default.png";
        const photos = req.files?.photos?.map(file => file.path) || [];
        const videos = req.files?.videos?.map(file => file.path) || [];

        const newFarewell = new Farewell({
            title,
            description,
            date,
            venue,
            finalYearStudentsPresent,
            juniorPresent,
            coverImageURL ,
            photos ,
            videos, 
        });

        await newFarewell.save();
        res.status(201).json({ message: "Farewell added successfully", farewell: newFarewell });
    } catch (error) {
        res.status(500).json({ message: "Error adding farewell", error });
    }
};


const handleUpdateFarewell = async (req, res) => {
    try {
        const { title, description,venue, finalYearStudentsPresent, juniorPresent } = req.body;
        const updateData = {
            title,
            description,
            venue,
            finalYearStudentsPresent,
            juniorPresent
        };

        // If new files are uploaded, update them
        if (req.files["coverImageURL"]) {
            updateData.coverImageURL = req.files["coverImageURL"][0].path;
        }
        if (req.files["photos"]) {
            updateData.photos = req.files["photos"].map(file => file.path);
        }
        if (req.files["videos"]) {
            updateData.videos = req.files["videos"].map(file => file.path);
        }

        const updatedFarewell = await Farewell.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedFarewell) {
            return res.status(404).json({ message: "Farewell not found" });
        }

        res.status(200).json({ message: "Farewell updated successfully", farewell: updatedFarewell });
    } catch (error) {
        res.status(500).json({ message: "Error updating farewell", error });
    }
};


const handleDeleteFarewell = async (req, res) => {
    try {
        const farewell = await Farewell.findByIdAndDelete(req.params.id);
        if (!farewell) {
            return res.status(404).json({ message: "Farewell not found" });
        }
        res.status(200).json({ message: "Farewell deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting farewell", error });
    }
};

module.exports = {
    getAllFarewell,
    getFarewellById,
    handleAddFarewell,
    handleUpdateFarewell,
    handleDeleteFarewell,
}
