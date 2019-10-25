const express = require('express');
const router = express.Router();

const {singIn, userRegister, delUser} = require('../controllers/auth');

router.post('/login', singIn);
router.post('/registration', userRegister);
router.delete('/del', delUser);

module.exports = router;
