const express = require("express")
const app = express()
const routes=require("./routes/routes")
const bodyParser = require("body-parser")

app.use('/api', routes)

app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, (req,res)=>{
    console.log("A szerver fut, ezen az úton: http://localhost:3000");
})