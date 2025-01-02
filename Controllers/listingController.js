const lists = require("../Modal/listingModal")


exports.createListing=async(req,res,next)=>{

    // try{

        const listing=await lists.create(req.body)
        return res.status(201).json(listing)

    // }
    // catch(error){
    //     next(error)
    // }

}