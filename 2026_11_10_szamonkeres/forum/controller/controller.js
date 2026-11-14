const model=require("../model/model")

exports.getFelhasznalok=async(req,res)=>{
    const felhasznalok=await model.felhasznalok()
    res.json(felhasznalok)
}
exports.getHirfolyamok=async(req,res)=>{
    const hirfolyamok=await model.hirfolyamok()
    res.json(hirfolyamok)
}
exports.getAktivitas=async(req,res)=>{
    const aktivitas=await model.aktivitas()
    res.json(aktivitas)
}
exports.getHirfolyamStatisztika=async(req,res)=>{
    const statisztika=await model.hirfolyamStatisztika()
    res.json(statisztika)
}
exports.getTopFelhasznalok=async(req,res)=>{
    const felhasznalok=await model.topFelhasznalok()
    res.json(felhasznalok)
}
exports.getKereses=async(req,res)=>{
    const nev=req.query.nev
    try {
        const felhasznalok=await model.kereses(nev)
        res.json(felhasznalok)
    } catch (h) {
        res.status(404).json({
            Hiba: h.message
        })
    }
}
exports.getAktivFelhasznalok=async(req,res)=>{
    const datum=req.query.datum
    try {
        const felhasznalok=await model.aktivFelhasznalok(datum)
        res.json(felhasznalok)
    } catch (h) {
        res.status(404).json({
            Hiba: h.message
        })
    }
}
exports.getUzenetIdoszak=async(req,res)=>{
    const tol=req.query.tol
    const ig=req.query.ig
    try {
        const uzenetek=await model.uzenetekIdoszak(tol, ig)
        res.json(uzenetek)
    } catch (h) {
        res.status(404).json({
            Hiba: h.message
        })
    }
}
exports.getUzenetKereses=async(req,res)=>{
    const szoveg=req.query.szoveg
    try {
        const uzenetek=await model.uezentKereses(szoveg)
        res.json(uzenetek)
    } catch (h) {
        res.status(404).json({
            Hiba: h.message
        })
    }
}
exports.getfelhasznaloId=async(req,res)=>{
    const id=req.params.id
    try {
        const felhasznalo=await model.felhasznaloId(id)
        res.json(felhasznalo)
    } catch (h) {
        res.status(404).json({
            Hiba: h.message
        })
    }
}
exports.getfelhasznaloUzenetek=async(req,res)=>{
    const id=req.params.id
    try {
        const felhasznalo=await model.felhasznaloUzenetek(id)
        res.json(felhasznalo)
    } catch (h) {
        res.status(404).json({
            Hiba: h.message
        })
    }
}
exports.getHirfolyamUzenetek=async(req,res)=>{
    const id=req.params.id
    try {
        const uezenetek=await model.hirfolyamUzenetek(id)
        res.json(uezenetek)
    } catch (h) {
        res.status(404).json({
            Hiba: h.message
        })
    }
}