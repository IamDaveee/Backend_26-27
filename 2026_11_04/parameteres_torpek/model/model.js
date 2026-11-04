const mysql=require("mysql2/promise")

const kapcsolat=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "torpetarna",
})



module.exports={
    torpekKlan: async (klan)=>{
        const [rows]=await kapcsolat.query(
            `SELECT torpek.nev, torpek.nem, torpek.suly, torpek.magassag
            FROM torpek
            WHERE torpek.klan=?
            ORDER BY torpek.nev ASC`,
            [klan]
        )
        //kivétel dobás
        if (rows.length==0) {
            throw new Error(`A(z) ${klan} klán nincs az adatbázisban`)
        }
        return rows
    },
    torpeMinMag: async (magassag)=>{
        const [rows]=await kapcsolat.query(
            `SELECT torpek.nev, torpek.klan, torpek.magassag FROM torpek WHERE torpek.magassag >= ? ORDER BY torpek.magassag DESC`,
            [magassag]
        )
        if (rows.length==0) {
            throw new Error(`${magassag}cm magas törpe nem létezik!`)
        }
        return rows
    },
    torpeSulyInter: async (min, max)=>{
        const [rows] = await kapcsolat.query(
            `SELECT torpek.nev, torpek.suly, torpek.klan FROM torpek WHERE torpek.suly BETWEEN ? AND ? ORDER BY torpek.suly ASC`,[min, max]
        )
        if (rows.length==0) {
            throw new Error(`Nincs törpe ezek a súlyok között: ${min}-${max}`)
        }
        return rows
    },
    torpeNev: async (nev)=>{
        const [rows]=await kapcsolat.query(
            `SELECT torpek.nev, torpek.klan FROM torpek WHERE torpek.nev LIKE CONCAT("%",?,"%")`,[nev]
        )
        if (rows.length==0) {
            throw new Error(`Nincs az adatbázisban ${nev} nevű törpe!`)
        }
        return rows
    },
    torpeKlanTermelt: async (klan, suly, termeles)=>{
        const [rows] = await kapcsolat.query(
            `SELECT torpek.nev, torpek.klan, torpek.suly, Sum(kihol.kitermelt_mennyiseg) AS kitermelt FROM torpek, kihol
            WHERE torpek.id=kihol.torpe_id AND torpek.suly >= ? AND torpek.klan=?
            GROUP BY torpek.id
            HAVING kitermelt >= ?
            ORDER BY kitermelt DESC`, [suly, klan, termeles]
        )
        if (rows.length==0) {
            throw new Error(`A megadott feltételekkel: Klan: ${klan}, Súly: ${suly}, Kitermelés: ${termeles}`)
        }
        return rows
    }
}