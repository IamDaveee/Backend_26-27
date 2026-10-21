const controller=require("../controller/controller")
const express=require("express")
const router=express.Router()

router.get("/torpek",controller.getAllTorpe)
router.get("/ferfiak", controller.getallFerfi)
router.get("/banyak", controller.getAllBanya)
router.get("/arany/torpek", controller.getAranyTorpe)

module.exports=router