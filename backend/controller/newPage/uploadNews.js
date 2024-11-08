// const uploadProductPermission= require("../../helpers/permission");
const newsModel = require("../../models/newPage");

async function uploadNewsController(req, res) {
  try {
    // const sessionUserId = req.userId;

  
    // if (!uploadProductPermission(sessionUserId)) {
    //   throw new Error("Permission denied");
    // }
    const uploadNewsController = new newsModel(req.body)
    const saveNews = await uploadNewsController.save()

    res.status(201).json({
        message : "News upload successfully",
        error : false,
        success : true,
        data : saveNews
    })

}catch(err){
    res.status(400).json({
        message : err.message || err,
        error : true,
        success : false
    })
}
}

module.exports = uploadNewsController;
