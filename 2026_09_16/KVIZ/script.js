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
const idozito=document.getElementById("idozito")

let ido=30
let interval

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
let kivalasztottKerdesek
function KvizInditasa(){
  kvizUrlap.innerHTML="" //korábbi kérdések törlése az oladlról
  kivalasztottKerdesek = Keveres(kerdesek).slice(0,4)
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

  idozito.innerHTML=`Idő: ${ido} mp`
  interval=setInterval(frissitIdo,1000)
}

function frissitIdo(){
  ido--
  idozito.innerHTML=`Idő: ${ido} mp`
  if (ido<=0) {
    clearInterval(interval)
    valaszokEllenorzese()
  }
}

let pontszam=0

function valaszokEllenorzese(){
  clearInterval(interval)

  document.getElementById("eredmenyGomb").disabled=true
  document.getElementById("ujrainditasGomb").style.display="inline-block"

  kivalasztottKerdesek.forEach((k, kindex)=>{
    const kivalasztottGomb=document.querySelector(`input[name="kerdes${kindex}"]:checked`)
    pontszam+=kivalasztottGomb && kivalasztottGomb.value == k.helyesValasz? 1:0
    const inputok=document.querySelectorAll(`input[name="kerdes${kindex}"]`)
    inputok.forEach((input)=>{
      if (input.value==k.helyesValasz) {
        input.parentElement.classList.add("helyes")
      }
      else if(input.checked){
        input.parentElement.classList.add("hibas")
      }
    })
  })

  eredmeny.innerHTML=`
    Eredmény: ${pontszam} / 4
  `
}

KvizInditasa()

document.getElementById("eredmenyGomb").addEventListener("click", ()=>{
  valaszokEllenorzese()
})
document.getElementById("ujrainditasGomb").addEventListener("click" ,()=>{
  clearInterval(interval)
  ido=30
  KvizInditasa()
  document.getElementById("eredmenyGomb").disabled=false
  document.getElementById("ujrainditasGomb").style.display="none"
  eredmeny.innerHTML=""
  pontszam=0
})