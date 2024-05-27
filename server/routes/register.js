const express=require('express')
const router=express.Router()
const regiterController=require('../controllers/registerController')
 
router.post('/',regiterController.handleNewDoctor)
router.put('/update',regiterController.updateDoctor)

module.exports=router