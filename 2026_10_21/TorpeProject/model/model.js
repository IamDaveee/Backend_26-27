const mysql=require("mysql2/promise")
const kapcsolat=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "torpetarna"
})

module.exports={
    getTorpek: async ()=>{
        const [rows]=await kapcsolat.query(
            "SELECT * FROM torpek"
        )
        return rows
    },
    getFerfiak: async ()=>{
        const [rows]=await kapcsolat.query(
            'SELECT * FROM torpek WHERE nem="F"'
        )
        return rows
    },
    getBanyak: async ()=>{
        const [rows]=await kapcsolat.query(
            'SELECT tarnak.id, tarnak.nev, tarnak.kozet_id FROM tarnak INNER JOIN kozetek ON tarnak.kozet_id=kozetek.id WHERE kozetek.nev="arany"'
        )
        return rows
    },
    getAranyTorpe: async ()=>{
        const [rows]=await kapcsolat.query(
            'SELECT torpek.nev, SUM(kihol.kitermelt_mennyiseg) as kitermelt FROM torpek, kihol, kozetek, tarnak WHERE torpek.id=kihol.torpe_id AND kihol.tarna_id=tarnak.id AND tarnak.kozet_id=kozetek.id AND kozetek.nev="arany" GROUP BY torpek.nev'
        )
        return rows
    }
}