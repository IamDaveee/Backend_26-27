const mysql=require("mysql2/promise")
const kapcsolat=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "forum"
})

module.exports={
    ujFelhasznalo: async (id, veznev, utonev, email, utolso)=>{
        const [response]=await kapcsolat.query(`
            INSERT INTO felhasznalo(felhasznalo.id, felhasznalo.veznev, felhasznalo.utonev, felhasznalo.email, felhasznalo.utolso) VALUES (?, ?, ?, ?, ?)
        `, [id, veznev, utonev, email, utolso])
        if (response.length==0) {
            throw new Error("Sikertelen rögzítés")
        }
        return "Sikeres rögzítés!"
    }
}