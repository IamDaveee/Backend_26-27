const model=require("../model/model")

exports.getAllTorpe = async (req,res)=>{
    const torpek = await model.getTorpek()
    res.json(torpek)
}

exports.getallFerfi=async (req,res)=>{
    const torpek=await model.getFerfiak()
    res.json(torpek)
}

exports.getAllBanya=async (req,res)=>{
    const banyak=await model.getBanyak()
    res.json(banyak)
}

exports.getAranyTorpe= async (req, res)=>{
    const aranyTorpe=await model.getAranyTorpe()
    res.json(aranyTorpe)
}