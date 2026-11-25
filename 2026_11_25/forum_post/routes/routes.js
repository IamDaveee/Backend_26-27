const express=require("express")
const router=express.Router()
const controller=require("../controller/controller")

router.post("/felhasznalo", controller.regisztracio)

module.exports=router