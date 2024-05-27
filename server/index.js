require('dotenv').config();
const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


//allow all origins
app.use(cors());

//routes
app.use('/api/url', urlRoutes);



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})