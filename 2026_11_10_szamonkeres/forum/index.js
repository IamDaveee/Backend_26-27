const express=require("express")
const app=express()
const router=require("./routes/routes")

app.use(express.static("public"))
app.use(express.json())
app.use("/api", router)

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "./public/index.html")
})

app.listen(3000, (req, res)=>{
    console.log("A szerver fut: http://localhost:3000");
})