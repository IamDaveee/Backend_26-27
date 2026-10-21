const tbody=document.getElementById("tbody")


document.addEventListener("DOMContentLoaded", async (e)=>{
    const adatok=await (fetch("/api/arany/torpek"))
    const torpek=await adatok.json()
    console.log(torpek);
    tbody.innerHTML=""
    torpek.forEach(element => {
        tbody.innerHTML+=`
            <tr>
                <td>${element.nev}</td>
                <td>${element.kitermelt}</td>
            </tr>
        `
    });
})