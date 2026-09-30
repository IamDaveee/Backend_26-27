const filmek = [
    { cim: "Az elveszett bolygó", kategoria: "Sci-fi", ar: 2500, korhatar: 12 },
    { cim: "Robotok hajnala", kategoria: "Sci-fi", ar: 2800, korhatar: 16 },
    { cim: "Nevess velem!", kategoria: "Vígjáték", ar: 2200, korhatar: 12 },
    { cim: "Családi káosz", kategoria: "Vígjáték", ar: 2300, korhatar: 6 },
    { cim: "Végső küldetés", kategoria: "Akció", ar: 2900, korhatar: 16 },
    { cim: "A menekülő", kategoria: "Akció", ar: 2700, korhatar: 16 },
    { cim: "Kaland az erdőben", kategoria: "Animáció", ar: 2100, korhatar: 6 },
    { cim: "A bátor pingvin", kategoria: "Animáció", ar: 2000, korhatar: 0 }
];

const filmekLista=document.getElementById("filmekLista")
const foglalasGomb=document.getElementById("foglalasGomb")
const ujFoglalasGomb=document.getElementById("ujFoglalasGomb")
const kategoriak=document.getElementById("kategoriak")
const eredmeny=document.getElementById("eredmeny")
const idoContainer=document.getElementById("ido")

let kivalasztottFilm
let kivalasztottIndex
let kategoria="Összes film"
let hatralevoIdo=30
let idozito

function filmekMegjelenitese(){
    filmekLista.innerHTML=""

    filmek.forEach((f, index)=>{
        if (f.kategoria==kategoria || kategoria=="Összes film") {
            filmekLista.innerHTML+=`
                <div class="film" data-index="${index}">
                    <h3>${f.cim}</h3>
                    <p>Kategória: ${f.kategoria}</p>
                    <p>Korhatár: ${f.korhatar}</p>
                    <p>Jegyár: ${f.ar}</p>
                    <button onclick="FilmValasztas(${index})">Kiválasztom</button>
                </div>
            `
            kivalasztottIndex=null
            kivalasztottFilm="nincs kiválasztva"
            document.getElementById("kivalasztottFilmSzoveg").innerHTML=`
                <strong>Kiválasztott film:</strong> ${kivalasztottFilm}
            `
        }
    })
}

function FilmValasztas(index){
    clearInterval(idozito)
    hatralevoIdo=30
    idoContainer.innerHTML=`Idő a foglalásra: ${hatralevoIdo}`
    idozito=setInterval(idoFrissitese, 1000)

    kivalasztottFilm=filmek[index].cim
    let div=document.querySelector(`[data-index="${index}"]`)
    if (kivalasztottIndex || kivalasztottIndex==0) {
        let elozoDiv=document.querySelector(`[data-index="${kivalasztottIndex}"]`)
        elozoDiv.classList.remove("kivalasztva")
    }
    kivalasztottIndex=index
    div.classList.add("kivalasztva")
    
    document.getElementById("kivalasztottFilmSzoveg").innerHTML=`
        <strong>Kiválasztott film:</strong> ${kivalasztottFilm}
    `
}

function Foglalas(){
    let idopont=document.getElementById("idopont").value
    if (!kivalasztottFilm || kivalasztottFilm=="nincs kiválasztva") {
        window.alert("Kérlek válassz egy filmet!")
        return
    }
    if (idopont=="") {
        window.alert("Kérlek válassz egy időpontot")
        return
    }
    let jegyek=document.getElementById("jegyekSzama").value
    if (jegyek<1 || jegyek>6) {
        window.alert("A jegyek csak 1 és 6 között lehetnek")
        return
    }

    clearInterval(idozito)
    hatralevoIdo=30
    foglalasGomb.disabled=true
    ujFoglalasGomb.classList.remove("rejtett")

    let adatok={
        cim: kivalasztottFilm,
        kategoria: filmek[kivalasztottIndex].kategoria,
        vetites: idopont,
        jegyar: filmek[kivalasztottIndex].ar,
        jegyek: jegyek,
        alapAr: 0,
        fizetendo: 0,
    }

    arSzamitasa(adatok)
}

function arSzamitasa(adatok){
    adatok.alapAr=adatok.jegyar*adatok.jegyek
    if (adatok.jegyek>=4) {
        let alap=adatok.alapAr
        let kedvezmeny=alap*0.1;
        adatok.fizetendo=alap-kedvezmeny
    }
    else{
        adatok.fizetendo=adatok.alapAr
    }

    EredemyenKiiras(adatok)
}

function EredemyenKiiras(adatok){
    eredmeny.innerHTML=""
    eredmeny.innerHTML=`
        <div>
            <h2>Sikeresd foglalás!</h2>
            <p><strong>Film: ${adatok.cim}</strong></p>
            <p><strong>Kategória: ${adatok.kategoria}</strong></p>
            <p><strong>Vetítés: ${adatok.vetites}</strong></p>
            <p><strong>Jegyek száma: ${adatok.jegyek}</strong></p>
            <p><strong>Alapár: ${adatok.alapAr}</strong></p>
            <p><strong>Fizetendő: ${adatok.fizetendo} Ft</strong></p>
        </div>
    `
    eredmeny.classList.remove("rejtett")
    ujFoglalasGomb.classList.remove("rejtett")
}

function idoFrissitese(){
    hatralevoIdo--
    idoContainer.innerHTML=`Idő a foglalásra: ${hatralevoIdo}`
    if (hatralevoIdo<=0) {
        clearInterval(idozito)
        window.alert("Az idő lejárt, kélek indíts újat")
        foglalasGomb.disabled=true
        ujFoglalasGomb.classList.remove("rejtett")
    }
}

function ujFoglalas(){
    hatralevoIdo=30
    kivalasztottFilm="nincs kiválasztva"
    kivalasztottIndex=null
    kategoria="Összes film"
    clearInterval(idozito)
    idoContainer.innerText="A visszaszámláló a film kiválasztásakor indul."
    document.getElementById("idopont").value=""
    document.getElementById("jegyekSzama").value=1
    ujFoglalasGomb.classList.add("rejtett")
    foglalasGomb.disabled=false
    let radios=document.querySelectorAll('input[name="kategoria"]')
    radios[0].checked=true
    eredmeny.classList.add("rejtett")

    filmekMegjelenitese()
}

kategoriak.addEventListener("click", ()=>{
    kategoria=document.querySelector("input[name='kategoria']:checked").value
    filmekMegjelenitese()
})

foglalasGomb.addEventListener("click",()=>{
    Foglalas()
})
ujFoglalasGomb.addEventListener("click", ()=>{
    ujFoglalas()
})

filmekMegjelenitese()