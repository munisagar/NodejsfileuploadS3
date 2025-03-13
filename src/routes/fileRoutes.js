const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;