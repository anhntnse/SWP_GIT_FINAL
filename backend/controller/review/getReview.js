const reviewModel = require("../../models/reviewModel")

async function allReview(req,res){
    try{
        console.log("reviewid all Users",req.reviewId)

        const allReview= await reviewModel.find()
        
        res.json({
            message : "All review ",
            data : allReview,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = allReview