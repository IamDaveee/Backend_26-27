//feladatok eltárolása javaScript object-ként a tömbbe (text, keszVan kulcsokkal)
let feladatok = JSON.parse(localStorage.getItem("feladatok")) || []
let osszesen = feladatok.length
let keszen = feladatok.filter(feladat => feladat.keszVan).length
//elemek átvétele
const ujFeladat = document.getElementById("ujFeladat")
const hozzaAdBtn = document.getElementById("hozzaAdBtn")
const kereses = document.getElementById("kereses")
const teendoLista = document.getElementById("teendoLista")
const osszes = document.getElementById("osszes")
const kesz = document.getElementById("kesz")

//Egy feladatot felvesz a tömbbe
function hozzaAdFeladat(){
    //a feladathoz javaScript object létrehozása
    let feladat = {
        text: ujFeladat.value,
        keszVan: false
    }
    //tömb végére beszúrjuk
    feladatok.push(feladat)
    osszesen += 1
    ujFeladat.value = ""
    mentes()
    feladatokLista() //megjelenítés
}

//megjeleníti a feladatokat a teendoLista  <ul></ul> elemben felsorolásként
function feladatokLista(){
    //töröljük az ul tag tartalmát
    teendoLista.innerHTML = ""
    //végigmegyünk a feladat tömbbön, a feladat változóba kerül a következő feladat, az indexbe, annak az indexe
    feladatok.forEach((feladat, index)=>{
        let li = document.createElement("li")
        li.textContent = feladat.text
        //ha a feladat keszVan(true), akkor hozzárendelni a keszVan osztályt
        if (feladat.keszVan) {
            li.classList.add("keszVan")
        }
        //click eseményt rendelni az li tag-hez
        li.addEventListener("click", ()=> valtFeladat(index))
        //felveszünk egy gomb HTML elemet
        let torolBtn = document.createElement("button")
        torolBtn.textContent = "❌"
        //rendelünk hozzás "click" eseményt
        torolBtn.addEventListener("click", (event)=> {
            event.stopPropagation() //
            torolFeladat(index)
        })
        //a gombot hozzáadjuk az li tag-hez
        li.appendChild(torolBtn)
        teendoLista.appendChild(li)
    })
    frissitStatisztika()
}

//törli az adott indexű elemet a tömbből
function torolFeladat(index){
    keszen -= feladatok[index].keszVan? 1 : 0 
    //törlés
    feladatok.splice(index, 1)
    osszesen--;
    mentes()
    feladatokLista() //megjeleníti újra 
}

function valtFeladat(index){
    //átálítani a feladat állapotát (keszVan: false--> true ; true--> false)
    feladatok[index].keszVan = !feladatok[index].keszVan
    keszen += feladatok[index].keszVan? 1 : -1 
    mentes()
    //megjelenítés
    feladatokLista()
}
function frissitStatisztika(){
    osszes.innerHTML = osszesen
    kesz.innerHTML = keszen
}
function mentes(){
    localStorage.setItem("feladatok", JSON.stringify(feladatok))
}
//eseménykezelő a gombhoz
hozzaAdBtn.addEventListener("click", ()=>hozzaAdFeladat())
feladatokLista()