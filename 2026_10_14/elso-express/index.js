const express=require('express')
const app=express()

app.get('/szia', (req,res)=>{
    res.send("Hello World!")
})
app.get('/api/users', (req,res)=>{
    res.json([
        {
            name: "Anna"
        },
        {
            name: "Feri"
        },
        {
            name: "Laci"
        }
    ])
})
app.get('/hello/:name', (req,res)=>{
    const name=req.params.name
    res.send(`Jó reggelt, ${name}`)
})
app.get('/api/add/:x/:y', (req,res)=>{
    const x=parseInt(req.params.x)
    const y=parseInt(req.params.y)
    res.json({
        x: x,
        y: y,
        Összeg: x+y
    })
})
app.get('/api/length/:text', (req,res)=>{
    const text=req.params.text
    res.json(text.length)
})
app.get('/api/even/:number',(req,res)=>{
    const number=req.params.number
    number%2==0?res.send("A szám páros"):res.send("A szám páratlan")
})
app.get('/api/year/:year',(req,res)=>{
    const year=req.params.year
    if (year%4==0 && year%100>0 || year%400==0) {
        res.json(`${year} szökőév volt`)
    }
    else{
        res.json(`${year} nem volt szökőév`)
    }
})
app.get('/api/case/:text',(req,res)=>{
    const text=req.params.text
    res.json({
        lower: text.toLowerCase(),
        upper: text.toUpperCase(),
    })
})
app.get('/api/calc/:a/:b', (req, res)=>{
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)

    res.json({
        a,
        b,
        Összeg: a+b,
        Különbség: a-b,
        Szorzat: a*b,
        Hányados: a/b,
    })
})
app.get('/api/dayname/:date',(req,res)=>{
    const datum=new Date(req.params.date)
    const napok=["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"]
    res.send(`${napok[datum.getDay()]}`)
})
app.get('/api/palindrome/:text',(req,res)=>{
    const text=req.params.text.trim()
    const reverseText=text.split('').reverse().join('')
    if (text==reverseText) {
        res.send("Palindrome")
    }
    else{
        res.send("Nem palindrome")
    }
})
app.get('/api/lnko',(req,res)=>{
    const elso=parseInt(req.query.elso)
    const masodik=parseInt(req.query.masodik)
    let maradek
    function lnko(elso, masodik){
        if (masodik===0) {
            return elso
        }
        else{
            maradek = elso % masodik
            return lnko(masodik, maradek)
        }
    }
    res.send(`A lnko: ${lnko(elso, masodik)}`)
})
app.get('/api/lkkt', (req,res)=>{
    const elso=parseInt(req.query.elso)
    const masodik=parseInt(req.query.masodik)
    function lnko(elso, masodik){
        if (masodik==0) {
            return elso
        }
        else{
            return lnko(masodik, elso%masodik)
        }
    }
    function lkkt(elso, masodik){
        let kozosOszto=lnko(elso, masodik)
        let eredmeny=(elso * masodik)/kozosOszto
        return eredmeny
    }
    res.send(`lkkt: ${lkkt(elso, masodik)}`)
})
app.get('/api/szamjegyosszeg',(req,res)=>{
    const szam=req.query.szam
    let szamlista=szam.split('')
    let count=0
    szamlista.forEach(e => {
        count+=parseInt(e)
    });
    res.send(`A számjegyek összege: ${count}`)
})

app.listen(3000, (req,res)=>{
    console.log("A szerver fut: http://localhost:3000")
})