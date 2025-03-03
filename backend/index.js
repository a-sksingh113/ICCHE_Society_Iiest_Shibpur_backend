require('dotenv').config();
const express = require('express')
const connectDB = require('./config/dbConnection');
const cookieParser = require('cookie-parser');

const adminsRoute = require('./routes/adminsRoute');
const studentRoute = require('./routes/studentRoute');
const volunteerRoute = require('./routes/volunteerRoute');
const alumniRoute = require('./routes/alumniRoute')

const app = express();
PORT = process.env.PORT || 8001;
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/admin',adminsRoute);
app.use('/api/students',studentRoute);
app.use('/api/volunteers',volunteerRoute);
app.use('/api/alumni',alumniRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})