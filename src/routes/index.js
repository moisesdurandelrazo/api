const { Router } = require("express");
const axios = require("axios");
const mercado = require("./Products");

const router = Router();

router.use("/mercado", mercado);

module.exports = router;
