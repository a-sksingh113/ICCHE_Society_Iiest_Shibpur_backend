const Alumni = require("../models/alumniModel");
const handleAddAlumni = async (req, res) => {
    try {
        const { fullName, email, contactNumber, enrollmentNo, gender, department, graduationYear, company, address } = req.body;
        const coverImageURL = req.files["coverImageURL"] ? req.files["coverImageURL"][0].path : "/uploads/default.png";
        if (!fullName || !email || !contactNumber || !enrollmentNo || !gender || !department || !graduationYear) {
            return res.status(400).json({ message: "All required fields must be filled!" });
        }
        const existingAlumni = await Alumni.findOne({ enrollmentNo });
        if (existingAlumni) {
            return res.status(400).json({ message: "Alumni with this Enrollment No already exists!" });
        }

        const newAlumni = new Alumni({
            fullName,
            email,
            contactNumber,
            enrollmentNo,
            gender,
            department,
            graduationYear,
            company: company || null,
            address: address || null,
            coverImageURL,
        });

        await newAlumni.save();
        res.status(201).json({ message: "Alumni added successfully", alumni: newAlumni });
    } catch (error) {
        res.status(500).json({ message: "Failed to add alumni", error: error.message });
    }
};


const handleUpdateAlumni = async (req, res) => {
    try {
        const {email, contactNumber, company, address } = req.body;
        const coverImageURL = req.file ? req.file.path : null;

        const alumni = await Alumni.findById(req.params.id);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }

       
        alumni.email = email || alumni.email;
        alumni.contactNumber = contactNumber || alumni.contactNumber;
        alumni.company = company || alumni.company;
        alumni.address = address || alumni.address;
        if (coverImageURL) {
            alumni.coverImageURL = coverImageURL;
        }

        await alumni.save();
        res.status(200).json({ message: "Alumni updated successfully", alumni });
    } catch (error) {
        res.status(500).json({ message: "Failed to update alumni", error: error.message });
    }
};

const handleDeleteAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.findByIdAndDelete(req.params.id);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json({ message: "Alumni deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete alumni", error: error.message });
    }
};


const getAllAlumni = async (req, res) => {
    try {
        const { fullName, enrollmentNo,department } = req.query;
        let filter = {};
       // GET /api/volunteers?name=Satish
        if (fullName) {
            filter.fullName = { $regex: fullName, $options: "i" }; // Case-insensitive partial match
        }
        //GET /api/volunteers?enrollmentNo=2023ITB104
        if (enrollmentNo) {
            filter.enrollmentNo = enrollmentNo; // Exact match
        }

        if (department) {
            filter.department = department; // Exact match
        }
        //GET /api/volunteers?name=Satish&enrollmentNo=2023ITB104
        const alumniList = await Alumni.find(filter);
        res.status(200).json(alumniList);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch alumni", error: error.message });
    }
};
const getAlumniById = async (req, res) => {
    try {
        const alumni = await Alumni.findById(req.params.id);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch alumni details", error: error.message });
    }
};
module.exports = { handleAddAlumni, getAllAlumni, getAlumniById, handleUpdateAlumni, handleDeleteAlumni };