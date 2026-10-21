const tbody=document.getElementById("tbody")


document.addEventListener("DOMContentLoaded", async (e)=>{
    const adatok=await (fetch("/api/banyak"))
    const torpek=await adatok.json()
    console.log(torpek);
    tbody.innerHTML=""
    torpek.forEach(element => {
        tbody.innerHTML+=`
            <tr>
                <td>${element.id}</td>
                <td>${element.nev}</td>
                <td>${element.kozet_id}</td>
            </tr>
        `
    });
})