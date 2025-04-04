const ClothDonation = require("../models/donationModel");

const getAllClothDonations = async (req, res) => {
    try {
        const donations = await ClothDonation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donations", error });
    }
};


const getClothDonationById = async (req, res) => {
    try {
        const donation = await ClothDonation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donation", error });
    }
};


const handleAddClothDonation = async (req, res) => {
    try {
        const { title, description, date, location,volunteerPresent, studentsReceived, parentsReceived } = req.body;
        const coverImageURL = req.file ? req.file.path : "/uploads/default.png";

      if(!title ||  !description || !date || !location || !volunteerPresent ||  !studentsReceived ||  !parentsReceived ){
        return res.status(400).json({ message: "Please fill all fields" });
      }

    
        const newDonation = new ClothDonation({
            title,
            description,
            date,
            location ,
            volunteerPresent,
            studentsReceived,
            parentsReceived,
            coverImageURL,
        });

        await newDonation.save();
        res.status(201).json({ message: "Cloth donation added successfully", donation: newDonation });
    } catch (error) {
        console.error("Error adding donation:", error); // Log full error in console
        res.status(500).json({ message: "Error adding donation", error: error.message || error });
    }
    
};

const handleUpdateClothDonation = async (req, res) => {
    try {
        const { title, description, date, location, studentsReceived, parentsReceived } = req.body;
        const updateData = {
            title,
            description,
            date,
            location, 
            studentsReceived,
            parentsReceived
        };

        if (req.files["coverImageURL"]) {
            updateData.coverImageURL = req.files["coverImageURL"][0].path;
        }
        const updatedDonation = await ClothDonation.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedDonation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        res.status(200).json({ message: "Donation updated successfully", donation: updatedDonation });
    } catch (error) {
        res.status(500).json({ message: "Error updating donation", error });
    }
};

const handleDeleteClothDonation = async (req, res) => {
    try {
        const donation = await ClothDonation.findByIdAndDelete(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        res.status(200).json({ message: "Donation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting donation", error });
    }
};

module.exports = {
    getAllClothDonations,
    getClothDonationById,
    handleAddClothDonation,
    handleUpdateClothDonation,
    handleDeleteClothDonation,
}
