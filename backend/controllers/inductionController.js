const FresherInduction = require('../models/fresherInductionModel');


const getAllFreshersInductions = async (req, res) => {
    try {
        const fresherInductions = await FresherInduction.find();
        res.status(200).json(fresherInductions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching fresher inductions", error });
    }
};


const getFreshersInductionById = async (req, res) => {
    try {
        const fresherInduction = await FresherInduction.findById(req.params.id);
        if (!fresherInduction) {
            return res.status(404).json({ message: "Fresher Induction not found" });
        }
        res.status(200).json(fresherInduction);
    } catch (error) {
        res.status(500).json({ message: "Error fetching fresher induction", error });
    }
};

const handleAddFresherInduction = async (req, res) => {
    try {
        const { title, description, date, venue, chiefGuest, fresherPresent, volunteerPresent } = req.body;
        const coverImageURL = req.file ? req.file.path : "/uploads/default.png";
        const newInduction = new FresherInduction({
            title,
            description,
            date,
            venue,
            chiefGuest,
            fresherPresent,
            volunteerPresent,
            coverImageURL,
        });

        await newInduction.save();
        res.status(201).json({ message: "Fresher Induction added successfully", data: newInduction });
    } catch (error) {
        res.status(500).json({ message: "Error adding fresher induction", error });
    }
};

const handleUpdateFresherInduction = async (req, res) => {
    try {
        const { title, description, date, venue, chiefGuest, fresherPresent, volunteerPresent } = req.body;
        const updateData = {title, description, date, venue, chiefGuest, fresherPresent, volunteerPresent};
        if (req.files["coverImageURL"]) {
            updateData.coverImageURL = req.files["coverImageURL"][0].path;
        }


        const updatedInduction = await FresherInduction.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedInduction) {
            return res.status(404).json({ message: "Fresher Induction not found" });
        }
        res.status(200).json({ message: "Fresher Induction updated successfully", data: updatedInduction });
    } catch (error) {
        res.status(500).json({ message: "Error updating fresher induction", error });
    }
};


const handleDeleteFresherInduction = async (req, res) => {
    try {
        const deletedInduction = await FresherInduction.findByIdAndDelete(req.params.id);
        if (!deletedInduction) {
            return res.status(404).json({ message: "Fresher Induction not found" });
        }
        res.status(200).json({ message: "Fresher Induction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting fresher induction", error });
    }
};

module.exports = {
    getAllFreshersInductions,
    getFreshersInductionById,
    handleAddFresherInduction,
    handleUpdateFresherInduction,
    handleDeleteFresherInduction
};
