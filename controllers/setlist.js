//dependencies
const express = require('express');
const router = express.Router();

//index
router.get('/', (req, res) => {
    res.render('setlist/index.ejs');
});



module.exports = router;