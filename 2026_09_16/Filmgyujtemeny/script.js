const filmCim=document.getElementById("filmCim")
const hozzaadBtn=document.getElementById("hozzaAdBtn")
const szuro=document.getElementById("szuro")
const filmLista=document.getElementById("filmLista")

let filmek=[]

function hozzaAdFilm() {
    let egyFilm={
        cim: filmCim.value,
        mufaj: document.querySelector('input[name="mufaj"]:checked').value,
        latta: document.querySelector('input[name="latta"]:checked').value === "true",
    }
    filmek.push(egyFilm)
    filmCim.value=""

    filmekLista()
}

function filmekLista(){
    filmLista.innerHTML=""
    filmek.forEach((egyFilm, index)=>{
        let li=document.createElement("li")
        let checkbox=document.createElement("input")
        checkbox.type="checkbox"
        //li.textContent=egyFilm.cim
        li.appendChild(checkbox)
        li.append(egyFilm.cim + "\t" + "," + "\t")
        li.append(egyFilm.mufaj)

        if (egyFilm.latta) {
            li.classList.add("latott")
            checkbox.checked=true
        }

        li.addEventListener("click", ()=> valtFilm(index))
        let torolBtn = document.createElement("button")
        torolBtn.textContent = "❌"

        torolBtn.addEventListener("click", (event)=> {
            event.stopPropagation()
            torolFilm(index)
        })

        li.appendChild(torolBtn)
        filmLista.appendChild(li)
    })
}

function toroFilm(index){ 
    //törlés
    filmek.splice(index, 1)
    filmekLista()
}

function valtFilm(index){
    filmek[index].latta = !filmek[index].latta
    filmekLista()
}

hozzaadBtn.addEventListener("click",()=>{
    hozzaAdFilm()
})