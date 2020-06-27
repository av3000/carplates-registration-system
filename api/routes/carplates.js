const express = require('express');
const router  = express.Router();
const { storeCarplate, getCarplate, deleteCarplate, getAllCarplates, updateCarplate } = require("../handlers/carplates");

// prefix - "/api/carplates"
router.post("/", storeCarplate);
router.get("/", getAllCarplates);

// prefix - "/api/carplates/:carplate_id"
router.route("/:carplate_id")
    .get(getCarplate)
    .delete(deleteCarplate)
    .put(updateCarplate);

module.exports = router;