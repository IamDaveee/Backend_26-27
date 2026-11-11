const mysql=require("mysql2/promise")

const kapcsolat=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "forum"
})

module.exports={
    felhasznalok: async ()=>{
        const [rows]=await kapcsolat.query(`
            SELECT felhasznalo.id, felhasznalo.veznev, felhasznalo.utonev, felhasznalo.email FROM felhasznalo
        `)
        return rows
    },
    aktivitas: async ()=>{
        const [rows]=await kapcsolat.query(`
            SELECT Year(felhasznalo.utolso) AS ev, COUNT(*) AS felhasznalok_szama FROM felhasznalo GROUP BY ev ORDER BY 1 DESC    
        `)
        return rows
    },
    keresesNev: async (nev)=>{
        const [rows]=await kapcsolat.query(`SELECT felhasznalo.id, concat(felhasznalo.veznev," ", felhasznalo.utonev) AS nev, felhasznalo.email FROM felhasznalo WHERE concat(felhasznalo.veznev," ", felhasznalo.utonev) LIKE concat("%",?,"%")`, [nev])
        return rows
    },
    felhasznaloId: async (id)=>{
        const [rows] = await kapcsolat.query(`
            SELECT * FROM felhasznalo WHERE felhasznalo.id=?    
        `, [id])
        if (rows.length==0) {
            throw new Error(`Nem található ilyen id-val felhasználó: ${id}`)
        }
        return rows
    }
}