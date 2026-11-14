const mysql=require("mysql2/promise")
const kapcsolat=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "forum"
})

module.exports={
    felhasznalok: async()=>{
        const [rows] = await kapcsolat.query(`
            SELECT felhasznalo.id, felhasznalo.veznev, felhasznalo.utonev, felhasznalo.email FROM felhasznalo    
        `)
        return rows
    },
    hirfolyamok: async()=>{
        const [rows]=await kapcsolat.query(`
            SELECT hirfolyam.id, hirfolyam.megnevezes, concat(felhasznalo.veznev," ", felhasznalo.utonev) as moderator FROM felhasznalo, hirfolyam WHERE hirfolyam.moderator=felhasznalo.id
        `)
        return rows
    },
    aktivitas: async()=>{
        const [rows]=await kapcsolat.query(`
            SELECT Year(felhasznalo.utolso) AS ev, COUNT(*) as felhasznalok_szama FROM felhasznalo GROUP BY ev ORDER BY 1 DESC
        `)
        return rows
    },
    hirfolyamStatisztika: async()=>{
        const [rows]=await kapcsolat.query(`
            SELECT hirfolyam.megnevezes as hirfolyam, COUNT(uzenet.id) as uzenetek_szama FROM hirfolyam, uzenet WHERE uzenet.h_id=hirfolyam.id GROUP BY hirfolyam.id ORDER BY uzenetek_szama DESC  
        `)
        return rows
    },
    topFelhasznalok: async()=>{
        const [rows] = await kapcsolat.query(`
            SELECT felhasznalo.id, concat(felhasznalo.veznev, " ", felhasznalo.utonev) as nev, COUNT(uzenet.id) as uzenetek_szama FROM felhasznalo, uzenet WHERE felhasznalo.id=uzenet.f_id GROUP BY felhasznalo.id ORDER BY uzenetek_szama DESC LIMIT 5    
        `)
        return rows
    },
    kereses: async(nev)=>{
        const [rows] = await kapcsolat.query(`
            SELECT felhasznalo.id, concat(felhasznalo.veznev, " ", felhasznalo.utonev) AS nev, felhasznalo.email FROM felhasznalo WHERE concat(felhasznalo.veznev, " ", felhasznalo.utonev) LIKE concat("%",?,"%")    
        `, [nev])
        if (rows.length==0) {
            throw new Error("A megadott név nem található")
        }
        return rows
    },
    aktivFelhasznalok: async(datum)=>{
        const [rows]=await kapcsolat.query(`
            SELECT felhasznalo.id, concat(felhasznalo.veznev, " ", felhasznalo.utonev) AS nev, DATE_FORMAT(felhasznalo.utolso, "%Y-%m-%d") as utolso FROM felhasznalo WHERE felhasznalo.utolso >= ? ORDER BY felhasznalo.utolso DESC, felhasznalo.id asc
        `, [datum])
        if (rows.length==0) {
            throw new Error("A megadott dátum nem található")
        }
        return rows
    },
    uzenetekIdoszak: async (tol, ig)=>{
        const [rows]=await kapcsolat.query(`
            SELECT uzenet.id, uzenet.tartalom, uzenet.kuldido, concat(felhasznalo.veznev, " ", felhasznalo.utonev) AS kuldo FROM uzenet, felhasznalo WHERE uzenet.f_id=felhasznalo.id AND uzenet.kuldido BETWEEN ? AND ? ORDER BY uzenet.kuldido ASC    
        `, [tol, ig])
        if (rows.length==0) {
            throw new Error("A megadott időintervallumban nem található üzenet")
        }
        return rows
    },
    uezentKereses: async (szoveg)=>{
        const [rows]=await kapcsolat.query(`
            SELECT DISTINCT uzenet.tartalom, concat(felhasznalo.veznev, " ", felhasznalo.utonev) AS kuldo, hirfolyam.megnevezes as hirfolyam FROM uzenet, hirfolyam, felhasznalo WHERE uzenet.h_id=hirfolyam.id AND uzenet.f_id=felhasznalo.id AND uzenet.tartalom LIKE concat("%", ?, "%") 
        `, [szoveg])
        if (rows.length==0) {
            throw new Error("A megadott szöveggel nem található üzenet")
        }
        return rows
    },
    felhasznaloId: async (id)=>{
        const [rows]=await kapcsolat.query(`
            SELECT f.id, f.veznev, f.utonev, f.email, DATE_FORMAT(f.utolso, "%Y-%m-%d") as utolso FROM felhasznalo f WHERE f.id=?
        `, [id])
        if (rows.length==0) {
            throw new Error("A megadott id nem található")
        }
        return rows
    },
    felhasznaloUzenetek: async (id)=>{
        const [rows]=await kapcsolat.query(`
            SELECT u.id, u.tartalom, h.megnevezes as hirfolyam, u.kuldido FROM uzenet u, hirfolyam h, felhasznalo f WHERE u.h_id=h.id AND f.id=u.f_id AND f.id=? ORDER BY u.kuldido ASC
        `, [id])
        if (rows.length==0) {
            throw new Error("A megadott id nem található, vagy még nincs üzenete a személynek")
        }
        return rows
    },
    hirfolyamUzenetek: async (id)=>{
        const [rows]=await kapcsolat.query(`
            SELECT u.id, u.tartalom, concat(f.veznev, " ", f.utonev) as kuldo, u.kuldido FROM uzenet u, felhasznalo f, hirfolyam h WHERE u.f_id=f.id AND u.h_id=h.id AND h.id=? ORDER BY u.kuldido ASC
        `, [id])
        if (rows.length==0) {
            throw new Error("A megadott hyrfolyam nem található, vagy még nincs benne üzenet")
        }
        return rows
    },
}