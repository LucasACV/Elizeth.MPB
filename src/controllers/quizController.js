var quizModel = require("../models/quizModel")

function envioscore(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fk_usuario = req.body.fk_usuarioServer;
    var score = req.body.scoreServer;
    var textoUltimaPergunta = req.body.textoUltimaPerguntaServer;


    quizModel.envioscore(score, textoUltimaPergunta,fk_usuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o Envio! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    envioscore
}