const express = require('express');
const { addUrl, fetchUrls, deleteUrl } = require('../controllers/urlController');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json("API is running"); })

//add url to the firebase database
router.post('/add', addUrl);



//obtain urls from the firebase database
router.get('/fetch', fetchUrls);



//remove url from the firebase database
router.delete('/delete/:id', deleteUrl);


module.exports = router;