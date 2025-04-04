require('dotenv').config();
const express = require('express')
const connectDB = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const {logRequest} = require("./middleware/logMiddleware");
const cors = require('cors');
const checkForAuthenticationCookie = require("./middleware/authMiddleware");
const { authorizeRoles } = require("./middleware/roleMiddleware");


const adminsRoute = require('./routes/adminsRoute');
const studentRoute = require('./routes/studentRoute');
const volunteerRoute = require('./routes/volunteerRoute');
const alumniRoute = require('./routes/alumniRoute');
const festivalRoute = require('./routes/festivalRoute');
const activitiesRoute = require('./routes/activitiesRoute');
const farewellRoute = require('./routes/farewellRoute');
const inductionRoute = require('./routes/inductionRoute')
const donationRoute = require('./routes/donationRoute');
const galleryRoute = require('./routes/galleryRoute')
const homeImageRoute = require('./routes/homeImageRoute')
const feedbackRoute = require('./routes/feedbackRoute')
const notificationRoute = require('./routes/notificationRoute')
const classroomRoute = require('./routes/classroomRoute')

const app = express();
PORT = process.env.PORT || 8001;
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logRequest);

app.use(cors({
    origin: process.env.FRONTEND_URL,  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials:true                                                 
  }));

app.use('/api/admin',adminsRoute);
app.use('/api/students',studentRoute);
app.use('/api/volunteers',volunteerRoute);
app.use('/api/alumni',alumniRoute);
app.use('/api/events',festivalRoute,activitiesRoute,farewellRoute,inductionRoute);
app.use('/api/donation-drive',donationRoute);
app.use('/api/gallery', galleryRoute);
app.use('/api/homePageImage',homeImageRoute)
app.use('/api/feedback',feedbackRoute);
app.use('/api/notification',notificationRoute)
app.use('/api/classroom',classroomRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});