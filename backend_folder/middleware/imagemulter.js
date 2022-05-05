var multer=require('multer')
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '_' +file.originalname)
    }
})
const filerFilter=(req,file,cb)=>{
    cb(null,true)
}
var upload=multer({storage:storage,
fileFilter:filerFilter})

module.exports=upload.single('ipicture')