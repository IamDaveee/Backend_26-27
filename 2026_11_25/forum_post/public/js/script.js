document.getElementById("regform").addEventListener("submit", async(event)=>{
    event.preventDefault()
    const adatok=new FormData(event.target) //gyűjtemény
    //console.log(Object.fromEntries(adatok));
    const response = await fetch('/api/felhasznalo', {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(adatok)),
        headers: {"Content-Type" : "application/json"}
    })
    const res=await response.json()
    if (!response.ok) {
        alert(res.Error)
        return
    }
    alert(res.message)
})