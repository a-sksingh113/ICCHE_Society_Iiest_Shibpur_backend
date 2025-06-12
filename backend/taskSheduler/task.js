const Volunteer = require("../models/volunteerModel");
const Alumni = require("../models/alumniModel");
const Student = require("../models/studentModel");
const TransitionFlag = require("../models/transitionFlagModel");

exports.runTransition = async (req, res) => {
  const transitionDateStr = new Date().toISOString().split('T')[0]; 

  try {
    const alreadyTransitioned = await TransitionFlag.findOne({ date: transitionDateStr });

    if (alreadyTransitioned) {
      return res.status(409).json({ message: `Transition already done for ${transitionDateStr}` });
    }

    // 1. Move 4th year volunteers to Alumni
    const fourthYears = await Volunteer.find({ year: '4' });

    for (const student of fourthYears) {
      const alumniData = {
        fullName: student.fullName,
        email: student.email,
        contactNumber: student.contactNumber,
        enrollmentNo: student.enrollmentNo,
        gender: student.gender,
        department: student.department,
        graduationYear: '2025',
        company: '',
        address: student.address || '',
        coverImageURL: student.coverImageURL || "/uploads/default.png"
      };

      await new Alumni(alumniData).save();
      await Volunteer.deleteOne({ _id: student._id });
    }

    // 2. Promote remaining volunteers
    await Volunteer.updateMany({ year: '3' }, { $set: { year: '4' } });
    await Volunteer.updateMany({ year: '2' }, { $set: { year: '3' } });
    await Volunteer.updateMany({ year: '1' }, { $set: { year: '2' } });

    // 3. Promote students from class 1 to class 9
    for (let i = 9; i >= 1; i--) {
      const currentClass = i.toString();
      const nextClass = (i + 1).toString();
      await Student.updateMany({ studentClass: currentClass }, { $set: { studentClass: nextClass } });
    }

    // 4. Save the transition flag
    await new TransitionFlag({ date: transitionDateStr, completed: true }).save();

    res.status(200).json({ message: `Transition successful for ${transitionDateStr}` });
  } catch (error) {
    console.error("Error in transition:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
