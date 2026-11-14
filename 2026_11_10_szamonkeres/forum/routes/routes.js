const express=require("express")
const router=express.Router()
const controller=require("../controller/controller")

router.get("/felhasznalok", controller.getFelhasznalok)
router.get("/hirfolyamok", controller.getHirfolyamok)
router.get("/aktivitas", controller.getAktivitas)
router.get("/hirfolyam-statisztika", controller.getHirfolyamStatisztika)
router.get("/top-felhasznalok", controller.getTopFelhasznalok)
router.get("/kereses", controller.getKereses)
router.get("/aktiv-felhasznalok", controller.getAktivFelhasznalok)
router.get("/uzenetek-idoszak", controller.getUzenetIdoszak)
router.get("/uzenet-kereses", controller.getUzenetKereses)
router.get("/felhasznalok/:id", controller.getfelhasznaloId)
router.get("/felhasznalok/:id/uzenetek", controller.getfelhasznaloUzenetek)
router.get("/hirfolyamok/:id/uzenetek", controller.getHirfolyamUzenetek)

module.exports=router