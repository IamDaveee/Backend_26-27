const model=require("../model/model")

exports.getFelhasznalok = async (req,res)=>{
    const felhasznalok = await model.felhasznalok()
    res.json(felhasznalok)
}
exports.getAktivitas = async (req,res)=>{
    const felhasznalok = await model.aktivitas()
    res.json(felhasznalok)
}
exports.getkeresesNev = async (req,res)=>{
    const nev=req.query.nev
    const felhasznalok = await model.keresesNev(nev)
    res.json(felhasznalok)
}
exports.getFelhasznaloId = async (req,res)=>{
    const id=req.params.id
    try {
        const felhasznalok = await model.felhasznaloId(id)
        res.json(felhasznalok)
    } catch (h) {
        res.status(404).json({
            hiba: h.message
        })
    }
    
}