
const users = require("../Modal/userModal")
const { errorHandler } = require("../utils/error")


exports.deleteUser = async (req, res, next) => {
    //this user is given in verifyToken
    if (req.user.id !== req.params.id) 
        return next(errorHandler(401, "You can only delete your own account...! "))
       

    try {
        await users.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')

    }
    catch (error) {
        next(error)
    }
}