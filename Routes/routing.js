const express=require('express')
const { signUp, signIn, googleSignIn, signOut} = require('../Controllers/authController')
const { verifyToken } = require('../utils/verifyUser')
const { deleteUser } = require('../Controllers/userController')
const router=new express.Router()


router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/google-signin',googleSignIn)
router.delete('/user-delete/:id',verifyToken,deleteUser)
router.get('/user/signout',signOut)


module.exports=router