const tbody=document.getElementById("tbody")


document.addEventListener("DOMContentLoaded", async (e)=>{
    const adatok=await (fetch("/api/torpek"))
    const torpek=await adatok.json()
    console.log(torpek);
    tbody.innerHTML=""
    torpek.forEach(element => {
        tbody.innerHTML+=`
            <tr>
                <td>${element.id}</td>
                <td>${element.nev}</td>
                <td>${element.klan}</td>
                <td>${element.nem=="F"?"Férfi":"Nő"}</td>
                <td>${element.suly}</td>
                <td>${element.magassag}</td>
            </tr>
        `
    });
})