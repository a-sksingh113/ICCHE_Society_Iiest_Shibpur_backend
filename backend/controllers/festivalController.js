const Festival = require('../models/festivalModel')
const handleAddFestival = async (req, res) => {
    try {
        const { title, description, venue, date, studentsPresent, volunteersPresent } = req.body;
        const coverImageURL = req.files["coverImageURL"] ? req.files["coverImageURL"][0].path : null;
        const photos = req.files["photos"] ? req.files["photos"].map(file => file.path) : [];
        const videos = req.files["videos"] ? req.files["videos"].map(file => file.path) : [];
        if (!coverImageURL) {
            return res.status(400).json({ success: false, message: "Cover image is required" });
        }
        const festival = new Festival({
            title,
            description,
            venue,
            date,
            coverImageURL,
            photos,
            videos,
            studentsPresent: studentsPresent || 0,
            volunteersPresent: volunteersPresent || 0
        });
        await festival.save();
        res.status(201).json({ success: true, message: "Festival added successfully", data: festival });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const handleUpdateFestival = async (req, res) => {
    try {
        const { title, description, venue, studentsPresent, volunteersPresent } = req.body;
        const updateData = { title, description, venue, studentsPresent, volunteersPresent };
        if (req.files["coverImageURL"]) {
            updateData.coverImageURL = req.files["coverImageURL"][0].path; }
        if (req.files["photos"]) {
            updateData.photos = req.files["photos"].map(file => file.path); }
        if (req.files["videos"]) {
            updateData.videos = req.files["videos"].map(file => file.path); }
        const updatedFestival = await Festival.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedFestival) {
            return res.status(404).json({ success: false, message: "Festival not found" }); }
        res.status(200).json({ success: true, message: "Festival updated successfully", data: updatedFestival });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
}
};

const handleDeleteFestival = async (req, res) => {
    try {
        const festival = await Festival.findByIdAndDelete(req.params.id);
        if (!festival) {
            return res.status(404).json({ success: false, message: "Festival not found" });
        }
        res.status(200).json({ success: true, message: "Festival deleted successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllFestivals = async (req, res) => {
    try {
        const festivals = await Festival.find();
        res.status(200).json({ success: true, data: festivals });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getFestivalById = async (req, res) => {
    try {
        const festival = await Festival.findById(req.params.id);
        if (!festival) {
            return res.status(404).json({ success: false, message: "Festival not found" });
        }
        res.status(200).json({ success: true, data: festival });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    handleAddFestival,
    handleUpdateFestival,
    handleDeleteFestival,
    getAllFestivals,
    getFestivalById,
}