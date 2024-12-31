const express=require('express')
const { signUp, signIn, googleSignIn } = require('../Controllers/authController')
const router=new express.Router()


router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/google-signin',googleSignIn)


module.exports=router