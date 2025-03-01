const dotenv = require('dotenv')
const express = require('express')
const app = express()
dotenv.config();

const PORT = process.env.PORT || 8000



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})