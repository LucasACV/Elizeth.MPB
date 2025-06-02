var dashModel = require("../models/dashModel")

function dashController1(req, res) {  // info do primeiro grafico 
    
    dashModel.obterMetricasIdadeSexo().then(
        function(metricas){
            console.log(metricas)
            res.json(metricas);
        }
    )
}
function dashController2(req, res) {  // info do segundo grafico
    dashModel.obterMetricasdeAcertos().then(
        function(metricas2){
            console.log(metricas2)
            res.json(metricas2);
        }
    )
}

function dashControllerKpi(req, res) {  // info de todas as kpis .. usado then dentro de then para buscar uma informação dps da outra
    
    dashModel.obtersexoscore().then(
        
        function (sexoscore) {
             dashModel.obterartista().then(
                function(artistascore){
                    dashModel.obterNumerosdeUsuarios().then(
                        function(numerousuarios){
                            console.log(artistascore)
                            console.log(numerousuarios)
                            console.log(sexoscore)
                            res.json({ 
                                numeroderespostas:numerousuarios[0].numero_de_respostas,
                                artistasescolhido:artistascore[0].textoUltimaPergunta,
                                melhorsexo:sexoscore[0].sexo

                             });

                        }
                    )
                }
             )
            }
    )


}
module.exports = {
    dashController1,
    dashController2,
    dashControllerKpi

}