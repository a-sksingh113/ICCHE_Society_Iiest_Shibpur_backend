const cron = require('node-cron');
const Volunteer = require("../models/volunteerModel");
const Alumni = require("../models/alumniModel");

cron.schedule('0 0 * * *', async () => {
  const today = new Date();
  const transitionDate = new Date('2025-06-3');

  if (today >= transitionDate) {
    try {
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
      await Volunteer.updateMany({ year: '3' }, { $set: { year: '4' } });
      await Volunteer.updateMany({ year: '2' }, { $set: { year: '3' } });
      await Volunteer.updateMany({ year: '1' }, { $set: { year: '2' } });

       // --- Promote Students up to Class 9 ---
    for (let i = 9; i >= 1; i--) {
        const currentClass = i.toString();
        const nextClass = (i + 1).toString();
        await Student.updateMany({ studentClass: currentClass }, { $set: { studentClass: nextClass } });
      }
      

      console.log(`Volunteer transition successful on ${today.toDateString()}`);
    } catch (err) {
      console.error('Error in year transition:', err);
    }
  }
});
