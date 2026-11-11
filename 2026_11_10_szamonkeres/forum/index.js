const express = require('express');
const app = express();
const routes=require("./routes/routes")

app.use(express.static("public"))
app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "./public/index.html")
})
app.use("/api", routes)

app.listen(3000, (req,res)=>{
    console.log("A szerver fut: http://localhost:3000");
})