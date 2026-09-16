const filmCim=document.getElementById("filmCim")
const hozzaadBtn=document.getElementById("hozzaAdBtn")
const szuro=document.getElementById("szuro")
const filmLista=document.getElementById("filmLista")

let filmek=[]

function hozzaAdFilm() {
    let egyFilm={
        cim: filmCim.value,
        mufaj: document.querySelector('input[name="mufaj"]:checked').value,
        latta: document.querySelector('input[name="latta"]:checked').value,
    }
    filmek.push(egyFilm)
    filmCim.value=""
}

hozzaadBtn.addEventListener("click",()=>{
    hozzaAdFilm()
})