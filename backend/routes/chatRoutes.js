const express = require('express');
const authGaurd = require('../middleware/authMiddleware');
const { createChat, fetchChats, createGroup } = require('../controllers/chatController');
const router = express.Router();

router.route('/').post(authGaurd,createChat);  //create a chat
router.route('/').get(authGaurd,fetchChats);   //fetch all chats
router.route('/group').post(authGaurd,createGroup); //create a grp
router.route('/rename').put(authGaurd,); //rename a grp
router.route('/addInGroup').put(authGaurd); //add in grp
router.route('/removeInGroup').put(authGaurd); //remove in grp

module.exports = router;