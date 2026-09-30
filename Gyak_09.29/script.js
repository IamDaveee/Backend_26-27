const filmek=["Interstellar", "Inception", "The Dark Knight", "Spider-Man: Into the Spider-Verse"]

function Betolt(){
    return JSON.parse(localStorage.getItem("foglalasok")) || []
}

const foglalasForm=document.getElementById("foglalasForm")
const foglalasGomb=document.getElementById("foglalasGomb")
const ujrainditasGomb=document.getElementById("ujrainditasGomb")
const uzenet=document.getElementById("uzenet")
let alerts=0

const idozito=document.getElementById("idozito")

let ido=60
let interval

function arSzamitas(tipus, darab){
    const arak=
        {
            Normal: 2500,
            VIP: 4000,
            Premium: 5500,
        }

    return arak[tipus]*darab
}

function FoglalasHitelesites(){
    const nev=foglalasForm.nev.value
    const film=foglalasForm.film.value
    const jegyek=foglalasForm.jegyek.value
    const helyValasztas=document.querySelector('input[name="hely"]:checked')
    const hely=helyValasztas&&helyValasztas.value
    alerts=0
    uzenet.innerHTML=""

    if (nev.trim().length==0) {
        uzenet.innerHTML+=`<p>A név mező nem lehet üres!</p>`
        alerts++
    }
    if (film=="") {
        uzenet.innerHTML+=`<p>Válassz egy filmet!</p>`
        alerts++
    }
    if (jegyek<1) {
        uzenet.innerHTML+=`<p>Legalább 1 jegynek lennie kell</p>`
        alerts++
    }
    if (!hely) {
        uzenet.innerHTML+=`<p>Válassz egy ülőhely típust!</p>`
        alerts++
    }
    if (alerts>0) {
        return
    }

    clearInterval(interval)

    const adatok={
        nev,
        film,
        jegyek,
        hely,
        ar: arSzamitas(hely, jegyek)
    }
    const foglalasok=Betolt()
    foglalasok.push(adatok)
    Mentes(foglalasok)

    foglalasForm.reset()
    FoglalasokLista()
}

function FoglalasokLista(){
    alerts=0
    uzenet.innerHTML=""
    clearInterval(interval)
    ido=60
    const foglalasok=Betolt()
    const tbody=document.querySelector("#foglalasok tbody")
    tbody.innerHTML=""
    foglalasok.forEach((f, index) => {
        tbody.innerHTML+=`
            <tr>
                <td>${f.nev}</td>
                <td>${f.film}</td>
                <td>${f.jegyek}</td>
                <td>${f.hely}</td>
                <td>${f.ar}</td>
                <td><button onclick="Torol(${index})">X</button></td>
            </tr>
        `
    });

    idozito.innerHTML=`Foglalási idő: ${ido} mp`
    interval=setInterval(idoFrissitese,1000)
}

function Mentes(foglalasok){
    localStorage.setItem('foglalasok', JSON.stringify(foglalasok))
    Statisztika()
}

function Torol(index){
    const foglalasok=Betolt()
    foglalasok.splice(index, 1)
    Mentes(foglalasok)
    FoglalasokLista()
    Statisztika()
}

function Statisztika(){
    const foglalasokSzama=document.getElementById("foglalasokSzama")
    const jegyekSzama=document.getElementById("jegyekSzama")
    const foglalasok=Betolt()

    foglalasokSzama.innerText=foglalasok.length
    let jegycount=0
    foglalasok.forEach(item=>{
        jegycount+=parseInt(item.jegyek)
    })
    jegyekSzama.innerText=jegycount
}

function idoFrissitese(){
    ido--
    idozito.innerHTML=`Foglalási idő: ${ido} mp`
    if (ido<=0) {
        clearInterval(interval)
        foglalasGomb.disabled=true
        foglalasForm.reset()
        uzenet.innerHTML='Az Idő lejárt! Új foglalást indíthatsz az "Új foglalási időszak" gombra kattintva.'
    }
}

foglalasForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    FoglalasHitelesites()
})

ujrainditasGomb.addEventListener("click", ()=>{
    foglalasForm.reset()
    FoglalasokLista()
    foglalasGomb.disabled=false
})

FoglalasokLista()
Statisztika()