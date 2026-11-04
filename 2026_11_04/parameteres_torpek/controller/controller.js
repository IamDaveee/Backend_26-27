const model=require("../model/model")

exports.torpkKlan = async (req,res)=>{
    try {
        //adat átvétele
        const klan = req.params.klan
        const torpek = await model.torpekKlan(klan)
        res.json(torpek) //ha nem dob kivételt
    } catch (h) {
        res.status(404).json({ //frontend fele megy egy hibaüzenet és status kód
            hiba: h.message
        })
    }
}

exports.torpeMinMag= async (req,res)=>{
    try {
        const magassag=req.query.min
        const torpek=await model.torpeMinMag(magassag)
        res.json(torpek)
    } catch (h) {
        res.status(404).json({
            hiba: h.message
        })
    }
}

exports.torpeSulyInter = async (req,res)=>{
    try {
        const min=req.query.min
        const max=req.query.max
        const torpek=await model.torpeSulyInter(min,max)
        res.json(torpek)
    } catch (h) {
        res.status(404).json({
            hiba: h.message
        })
    }
}

exports.torpeNev = async(req,res)=>{
    try {
        const nev=req.query.nev
        const torpek = await model.torpeNev(nev)
        res.json(torpek)
    } catch (h) {
        res.status(404).json({
            hiba: h.message
        })
    }
}

exports.torpeKlanTermelt = async(req,res)=>{
    try {
        const klan=req.query.klan
        const suly=req.query.minSuly
        const termeles=req.query.minTermeles
        const torpek= await model.torpeKlanTermelt(klan, suly, termeles)
        res.json(torpek)
    } catch (error) {
        res.status(404).json({
            hiba: h.message
        })
    }
}