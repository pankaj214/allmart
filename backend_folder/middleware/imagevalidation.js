const fs=require('fs')
module.exports=(req,res,next)=>{
    // if(typeof(req.file)==="undefined" || typeof(req.body)==="undefined"){
    //     return res.status(422).json({
    //         error:"Please select the file"
    //     })
    // }
    let image=req.file.path
    console.log(req.file.path)
    if(!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')){
        fs.unlinkSync(image)
        return res.status(422).json({error:"File format not support"})
    }

    if(req.file.size>1*1024*1024)  //1 mb
    {
            fs.unlinkSync(image)
            return res.status(422).json({error:'Size should be less than 1 mb file is too large'})
    }   
    next()
}