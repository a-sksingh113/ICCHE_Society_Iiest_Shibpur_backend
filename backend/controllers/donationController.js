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
        const { title, description, date, location, studentsReceived, parentsReceived } = req.body;
        const coverImageURL = req.files?.coverImageURL?.[0]?.path || "";
      const photos = req.files?.photos?.map(file => file.path) || [];
      const videos = req.files?.videos?.map(file => file.path) || [];

      if(!title ||  !description || !date || !location ||  !studentsReceived ||  !parentsReceived ){
        return res.status(400).json({ message: "Please fill all fields" });
      }
        const newDonation = new ClothDonation({
            title,
            description,
            date,
            location: JSON.parse(location), // Ensure location is passed as a stringified object
            studentsReceived,
            parentsReceived,
            coverImageURL,
            photos, 
            videos,
        });

        await newDonation.save();
        res.status(201).json({ message: "Cloth donation added successfully", donation: newDonation });
    } catch (error) {
        res.status(500).json({ message: "Error adding donation", error });
    }
};

const handleUpdateClothDonation = async (req, res) => {
    try {
        const { title, description, date, location, studentsReceived, parentsReceived } = req.body;
        const updateData = {
            title,
            description,
            date,
            location: JSON.parse(location), // Ensure location is parsed
            studentsReceived,
            parentsReceived
        };

        if (req.files["coverImageURL"]) {
            updateData.coverImageURL = req.files["coverImageURL"][0].path;
        }
        if (req.files["photos"]) {
            updateData.photos = req.files["photos"].map(file => file.path);
        }
        if (req.files["videos"]) {
            updateData.videos = req.files["videos"].map(file => file.path);
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
