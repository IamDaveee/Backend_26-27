const controller=require("../controller/controller")

//importálni kell az expresst, az útvonalak tárolása miatt
const express=require("express")
const router=express.Router()

router.get('/torpek/klan/:klan', controller.torpkKlan)
router.get('/torpek/magassag', controller.torpeMinMag)
router.get('/torpek/suly', controller.torpeSulyInter)
router.get('/torpek/kereses', controller.torpeNev)
router.get('/torpek/osszetett', controller.torpeKlanTermelt)

module.exports=router