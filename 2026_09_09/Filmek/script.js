const filmek = [
  {cim: "A remény rabjai", mufaj: "Dráma", ev: 1994},
  {cim: "Eredet", mufaj: "Sci-fi", ev: 2010},
  {cim: "A sötét lovag", mufaj: "Akció", ev: 2008},
  {cim: "Forrest Gump", mufaj: "Vígjáték", ev: 1994},
  {cim: "Csillagok között", mufaj: "Sci-fi", ev: 2014},
  {cim: "Gladiátor", mufaj: "Történelmi", ev: 2000},
  {cim: "A nagy Gatsby", mufaj: "Romantikus", ev: 2013},
  {cim: "A Wall Street farkasa", mufaj: "Krimi", ev: 2013},
  {cim: "Halálsoron", mufaj: "Dráma", ev: 1999},
  {cim: "A kódjátszma", mufaj: "Életrajzi", ev: 2014},
  {cim: "A nyomorultak", mufaj: "Musical", ev: 2012},
  {cim: "A bolygó neve: Halál", mufaj: "Horror", ev: 1986}
];
//hivatkozás a "A remény rabjai" filmcímre: filmek[0].cim
var tetszett = 0
var nemTetszett = 0
const hely = document.getElementById("film-lista") //rámutattunk a divre, amibe a lista kerül az oldalon



function filmekListazasa() {
  
  filmek.forEach((f, index)=>{ //f paraméterbe mindig a következő film objektum kerül (pl.{cim: "A remény rabjai", mufaj: "Dráma", ev: 1994}), az indexbe az adott film tömbbeli indexe
      const div = document.createElement("div") //létrehoztunk egy <div></div> HTML elemet
      // const strong = document.createElement("strong")
      // strong.innerHTML = f.cim
      // div.appendChild(strong) //beletettük a strong tag-et a div-be
      // div.innerHTML += ` (${f.mufaj} ${f.ev})`

      // div.appendChild(document.createElement("br")) //createElement("br")--> létrejön a tag, div.appendChild --> beleteszi a div-be 

      div.innerHTML += `
          <strong>
              ${f.cim}
          </strong>
           (${f.mufaj} ${f.ev})
          <br>
          <button>👍 Tetszik </button>
          <button>👎 Nem tetszik </button>
          <br><br>
      `

      const [tetszikBtn, nemTetszikBtn] = div.querySelectorAll("button")
      console.log(nemTetszikBtn);
      tetszikBtn.addEventListener("click", () => {
          eredmeny(true, frissitStatisztika)
      })
      nemTetszikBtn.addEventListener("click", () => {
          eredmeny(false, frissitStatisztika)
      })
      hely.appendChild(div)
  })//forEach vége
  
}


function eredmeny(tetszik, callback) {
  tetszik? tetszett++ : nemTetszett++
  callback() //a paraméterben megkapott függvény hívása
}
function frissitStatisztika() {
  const hely = document.getElementById("statisztika")
  hely.innerHTML = `
      <p>👍 Tetszett: ${tetszett}</p>
      <p>👎 Nem tetszett: ${nemTetszett}</p>`
}
document.getElementById("lista").addEventListener("click", filmekListazasa)
