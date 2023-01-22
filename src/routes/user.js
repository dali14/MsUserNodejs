const express = require('express');
const router = express.Router();

const userController=require('../controllers/userController')

router.get('/alluser',userController.all);
router.post('/newuser', userController.create);
module.exports=router;
