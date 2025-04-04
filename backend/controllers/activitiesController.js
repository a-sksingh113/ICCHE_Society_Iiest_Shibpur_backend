const Activity = require('../models/activitiesModels');
const Program  = require('../models/activitiesProgramModel');

const handleAddActivities = async (req, res) => {
    try {
      const { title, description, activityType, date, chiefGuest, venue, studentsPresent, volunteersPresent } = req.body;
      const coverImageURL = req.file ? req.file.path : "/uploads/default.png";
  
      const newActivity = new Activity({
        title,
        description,
        activityType,
        date,
        chiefGuest,
        venue,
        coverImageURL,
        studentsPresent,
        volunteersPresent,
      });
  
      await newActivity.save();
      res.status(201).json({ success: true, message: "Activity added successfully", data: newActivity });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const handleUpdateActivities = async (req, res) => {
    try {
        const { title, description, activityType, date, chiefGuest, venue, studentsPresent, volunteersPresent } = req.body;
      const updatedData = {title, description, activityType, chiefGuest, venue, studentsPresent, volunteersPresent};
      if (req.files?.coverImageURL) updatedData.coverImageURL = req.files.coverImageURL[0].path;
     
  
      const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      if (!updatedActivity) return res.status(404).json({ error: "Activity not found" });
      res.status(200).json(updatedActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const getAllActivities = async (req, res) => {
  try {
    const { title } = req.query; // Extract search query
    let filter = {};

 // GET /api/events/activities?name=sports day
    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    const activities = await Activity.find(filter).populate("programs");
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate("programs");
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const handleDeleteActivities = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleAddProgram = async (req, res) => {
    try {
      const { title, description, participants, winners } = req.body;
      const coverImageURL = req.file ? req.file.path : "/uploads/default.png";
      const photos = req.files?.photos?.map(file => file.path) || [];
      const videos = req.files?.videos?.map(file => file.path) || [];
  
      const newProgram = new Program({
        activity: req.params.id,
        title,
        description,
        coverImageURL,
        videos,
        photos,
        participants,
        winners,
      });
  
      await newProgram.save();
      await Activity.findByIdAndUpdate(req.params.id, { $push: { programs: newProgram._id } });
  
      res.status(201).json({ success: true, message: "Program added successfully", data: newProgram });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const handleUpdateProgram = async (req, res) => {
    try {
      const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProgram) return res.status(404).json({ error: "Program not found" });
      res.status(200).json({ success: true, message: "Program updated successfully", data: updatedProgram });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const handleDeleteProgram = async (req, res) => {
    try {
      await Program.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Program deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


const getAllPrograms = async (req, res) => {
  try {
    const { title } = req.query; // Extract search query
    const filter = { activity: req.params.id };
 // GET /api/events/activities/:id/programs/?name=tug of war
    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }
    const programs = await Program.find(filter);
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    handleAddActivities,
    handleUpdateActivities,
    handleDeleteActivities,
    getAllActivities,
    getActivityById,
    handleAddProgram,
    handleUpdateProgram,
    handleDeleteProgram,
    getAllPrograms,
    getProgramById,
}


