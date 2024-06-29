const express=require('express')
const router=express.Router()
const regiterController=require('../controllers/registerController')
 
router.post('/',regiterController.handleNewUser)
router.put('/update',regiterController.updateUser)

module.exports=router