function arSzamitas(suly, tipus) {
    const arak = {
        Normál : {ar: 1000, perKg: 200},
        Expressz: {ar: 2000, perKg: 500},
        Éjszakai: {ar: 3000, perKg: 700}
    }
    
    const {ar, perKg} = arak[tipus]
    return ar + perKg * suly
}

const tbody = document.querySelector("#adatok tbody")
function kiiratas(){ //mentett adatok kiiratása a táblázatba
    const adatok = JSON.parse(localStorage.getItem('szallitasok')) || []
    tbody.innerHTML = ""
    adatok.forEach((adat, index) => {
        const sor = document.createElement('tr');
        sor.innerHTML += `
        <td>${adat.nev}</td>
        <td>${adat.suly}</td>
        <td>${adat.mod}</td>
        <td>${adat.ar}</td>
        <td><button onclick="torles(${index})">🗑</button></td>
        `
        tbody.appendChild(sor)
      });
}

function torles(index){
    // betölteni az adatokat a localStorage-ból adatok tömbbe
    const adatok = JSON.parse(localStorage.getItem('szallitasok'))
    //kitörölni a tömb index. elemét
    adatok.splice(index,1)
    //visszaírni az adatokat a localStorage-ba adatok tömbből
    localStorage.setItem('szallitasok', JSON.stringify(adatok))
    //kiiratni az adatok tartalmát az oldalra
    kiiratas()
}

function mentes(adat){
    // betölteni az adatokat a localStorage-ból adatok tömbbe
    const adatok = JSON.parse(localStorage.getItem('szallitasok')) || []
    //adatok tömbbe betenni az új adatot
    adatok.push(adat)
    //visszaírni az adatokat a localStorage-ba adatok tömbből
    localStorage.setItem('szallitasok', JSON.stringify(adatok))
    //kiiratni az adatok tartalmát az oldalra
    kiiratas()
}
document.getElementById("szallitasForm").addEventListener("submit", (e)=>{
    e.preventDefault()

    const nev = document.getElementById("nev").value.trim()
    const suly = parseFloat(document.getElementById("suly").value)
    const mod = document.querySelector(`input[name="mod"]:checked`).value
    const ar = arSzamitas(suly, mod)
    const adat ={
        nev,
        suly,
        mod,
        ar
    }
    mentes(adat)
    document.getElementById("szallitasForm").reset()
})
window.addEventListener("DOMContentLoaded", kiiratas)

