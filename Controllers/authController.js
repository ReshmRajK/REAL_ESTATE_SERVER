const users = require("../Modal/userModal")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { errorHandler } = require("../utils/error")


exports.signUp = async (req, res, next) => {

    const { userName, email, password } = req.body

    const hashedPassword = bcryptjs.hashSync(password, 10)

    try {
        const user = await users.findOne({ email })

        if (user) {
            res.status(401).json('User already exist...!')
        }
        else {
            const newUser = new users({
                userName, email, password: hashedPassword
            })
            await newUser.save()
            res.status(201).json('User created successfully...!')
        }
    }
    catch (error) {
        // res.status(400).json(error.message)

        // //already available error access
        next(error)

        // //manually created error access
        // next(errorHandler(400,'Request API Failed'))
    }

}

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const validUser = await users.findOne({ email })
        const validPsw = bcryptjs.compareSync(password, validUser.password)
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        //to remove the password from output
        const { password: pass, ...rest } = validUser._doc

        // console.log(validPsw);

        if (validUser && validPsw) {
            res.cookie("access_token", token, { httpOnly: true })
                .status(200).json(
                    rest
                    // message:"User Login Successfully...!",
                )
            // res.status(200).json({
            //     rest,
            //     message: 'User Login Successfully...!',
            //     token
            // })
        }
        else {
            res.status(400).json("Invalid Username or Password")
        }

    }
    catch (error) {
        // res.status(401).json("Request API Failed...!!!")
        next(error)
    }

}

exports.googleSignIn = async (req, res, next) => {

    try {

        const user = await users.findOne({ email: req.body.email })

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res.cookie("access_token", token, { httpOnly: true })
                .status(200).json(rest)
            // res.status(200).json(rest)
        }
        else {
            const generatedPsw = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hasedPsw = bcryptjs.hashSync(generatedPsw, 10)

            const newUser = new users({
                userName: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hasedPsw,
                avatar: req.body.photo
            })

            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = newUser._doc
            res.cookie("access_token", token, { httpOnly: true })
                .status(201).json(rest)
            // res.status(201).json(rest)

        }

    }
    catch (error) {
        next(error)
    }

}


exports.signOut=async(req,res,next)=>{
    try{
        res.clearCookie("access_token");
        res.status(200).json("User has been SignOut...!")

    }
    catch(error){
        next(error)
    }
}
