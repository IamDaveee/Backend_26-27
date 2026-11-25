const model=require("../model/model")

exports.regisztracio= async (req, res)=>{
    try {
        const {id, veznev, utonev, email, utolso} = req.body
        const response = await model.ujFelhasznalo(id, veznev, utonev, email, utolso)
        res.status(201).json({
            message: response
        })
    } catch (e) {
        res.status(404).json({
            Error: e.message
        })
    }
}