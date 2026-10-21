const express = require("express")
const app = express()

const routes=require("./routes/routes")

app.use(express.static("public"))
app.use("/api", routes)

app.get("/", (req,res)=>{
    res.send(__dirname + "/public/index.html")
})

app.listen(3000, (req,res)=>{
    console.log("Szerver fut: http://localhost:3000");
})