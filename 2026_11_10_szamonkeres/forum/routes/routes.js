const express=require("express")
const controller=require("../controller/controller")

const router=express.Router()

router.get("/felhasznalok", controller.getFelhasznalok)
router.get("/aktivitas", controller.getAktivitas)
router.get("/kereses", controller.getkeresesNev)
router.get("/felhasznalok/:id", controller.getFelhasznaloId)

module.exports = router