var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.get("/graficos1", function (req, res) {
    dashController.dashController1(req, res);
})

router.get("/graficos2", function (req, res) {
    dashController.dashController2(req, res);
});
router.get("/graficoskpis", function (req, res) {
    dashController.dashControllerKpi(req, res);
});

module.exports = router;