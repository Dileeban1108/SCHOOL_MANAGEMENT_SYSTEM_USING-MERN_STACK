const express=require('express')
const router=express.Router()
const regiterController=require('../controllers/registerController')
 
router.post('/',regiterController.handleNewDoctor)

module.exports=router