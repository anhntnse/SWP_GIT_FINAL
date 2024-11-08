const newPage = require("../../models/newPage")

async function allNews(req,res){
    try{

        const allNews = await newPage.find()
        
        res.json({
            message : "All News ",
            data : allNews,
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

module.exports = allNews