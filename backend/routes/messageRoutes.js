const express = require('express');
const authGaurd = require('../middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messageController');
const router = express.Router();

router.route('/').post(authGaurd,sendMessage);
router.route('/:chatId').get(authGaurd, allMessages);

module.exports= router;