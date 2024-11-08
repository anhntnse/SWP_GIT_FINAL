const newsModel = require("../../models/newPage")

const getNewsDetails = async(req,res)=>{
    try{
        const { newsId } = req.body

        const news = await newsModel.findById(newsId)

        res.json({
            data : news,
            message : "Ok",
            success : true,
            error : false
        })

        
    }catch(err){
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getNewsDetails