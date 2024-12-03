const express = require('express');
const router = express.Router();
const contactUsController = require('../Controller/contactUsController'); 

router.post('/contact-us', contactUsController.createContactUsMessage);
router.get('/', contactUsController.getAllMessages);

module.exports = router;
