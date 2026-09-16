const kerdesek = [
    {
      kerdes: "Mi a HTML fő szerepe a webfejlesztésben?",
      valaszok: [
        "Adatok tárolása a szerveren",
        "A weboldal szerkezetének leírása",
        "Interaktív funkciók biztosítása",
        "A weboldal stílusának meghatározása"
      ],
      helyesValasz: 1
    },
    {
      kerdes: "Melyik HTML elem használható gomb létrehozására?",
      valaszok: ["<span>", "<button>", "<div>", "<input type='text'>"],
      helyesValasz: 1
    },
    {
      kerdes: "Melyik HTML elem jelenít meg képet az oldalon?",
      valaszok: ["<src>", "<image>", "<img>", "<picture>"],
      helyesValasz: 2
    },
    {
      kerdes: "Mi a szerepe a <head> szekciónak egy HTML dokumentumban?",
      valaszok: [
        "A lábléc tartalmának megjelenítése",
        "Metaadatok, stíluslapok és szkriptek elhelyezése",
        "Navigációs menü létrehozása",
        "A weboldal fő tartalmának megjelenítése"
      ],
      helyesValasz: 1
    },
    {
      kerdes: "Melyik attribútum határozza meg egy kép alternatív szövegét?",
      valaszok: ["alt", "title", "href", "src"],
      helyesValasz: 0
    },
    {
      kerdes: "Melyik HTML attribútum határozza meg, hogy egy link hová mutat?",
      valaszok: ["src", "alt", "target", "href"],
      helyesValasz: 3
    },
    {
      kerdes: "Melyik HTML elem használható listák létrehozására?",
      valaszok: ["<ul>", "<table>", "<form>", "<div>"],
      helyesValasz: 0
    },
    {
      kerdes: "Mi a szerepe a <meta> elemnek egy HTML dokumentumban?",
      valaszok: [
        "Képek megjelenítése",
        "Metaadatok megadása",
        "Navigációs menü létrehozása",
        "Stíluslapok hozzáadása"
      ],
      helyesValasz: 1
    },
    {
      kerdes: "Melyik HTML elem használható űrlap létrehozására?",
      valaszok: ["<form>", "<label>", "<fieldset>", "<input>"],
      helyesValasz: 0
    },
    {
      kerdes: "Melyik attribútum határozza meg, hogy egy link új ablakban nyíljon meg?",
      valaszok: ["target", "alt", "href", "rel"],
      helyesValasz: 0
    }
  ];

const kvizUrlap = document.getElementById("kvizUrlap")
const eredmeny=document.getElementById("eredmeny")


function Keveres(tomb){
  const eredmeny=[...tomb]
  for(let i=eredmeny.length-1; i>0; i--){
    let j
    j=Math.floor(Math.random()*(i+1)) //véletlen egész szám 0 és i között
    let seged=eredmeny[i]
    eredmeny[i]=eredmeny[j]
    eredmeny[j]=seged
  }
  return eredmeny
}

//console.log(Keveres([1,2,3,4,5,6]));

//keverés 4 kérdést kiválaszt
let kivalasztottKerdesek=Keveres(kerdesek).slice(0,4)
function KvizInditasa(){
  kvizUrlap.innerHTML="" //korábbi kérdések törlése az oladlról

  kivalasztottKerdesek.forEach((k, index) => {
    let div=document.createElement("div")
    div.classList.add("kerdes")

    div.innerHTML=`<p>${index + 1}. ${k.kerdes}</p>`

    k.valaszok.forEach((v, vindex)=>{
      let label=document.createElement("label")
      let input=document.createElement("input")

      input.type="radio"
      input.value=vindex
      input.name=`kerdes${index}`

      
      label.appendChild(input)
      label.appendChild(document.createTextNode(v))
      div.appendChild(label)
    })

    kvizUrlap.appendChild(div)
  });
  
}
let pontszam=0
function valaszokEllenorzese(){
  kivalasztottKerdesek.forEach((k, kindex)=>{
    const kivalasztottGomb=document.querySelector(`input[name="kerdes${kindex}"]:checked`)
    const inputok=document.querySelectorAll(`input[name="kerdes${kindex}"]`)
    inputok.forEach((i)=>{
      
      if (i.value==k.helyesValasz) {
        i.parentElement.classList.add("helyes")
      }
      else if(i.checked){
        i.parentElement.classList.add("hibas")
      }
    })
  })
}

KvizInditasa()

document.getElementById("eredmenyGomb").addEventListener("click", ()=>{
  valaszokEllenorzese()
})

  
  
  