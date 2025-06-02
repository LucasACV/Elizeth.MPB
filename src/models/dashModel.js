var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function obtersexoscore() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            SELECT sexo, ifnull( SUM(score) , 0) as pontuação
    FROM respostas
    right JOIN usuario ON idusuario = fk_usuario
    GROUP BY sexo
    ORDER BY pontuação DESC limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterartista() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            SELECT  textoUltimaPergunta , COUNT(idrespostas) as rankiado FROM respostas GROUP BY textoUltimaPergunta ORDER BY rankiado DESC limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterNumerosdeUsuarios() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            SELECT COUNT(idrespostas) as numero_de_respostas FROM respostas;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterMetricasIdadeSexo() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            SELECT
  'Masculino' AS sexo,
  COUNT(CASE WHEN u.idade BETWEEN 15 AND 20 AND u.sexo = 'Masculino' THEN 1 END) AS faixa_15_20,
  COUNT(CASE WHEN u.idade BETWEEN 21 AND 25 AND u.sexo = 'Masculino' THEN 1 END) AS faixa_21_25,
  COUNT(CASE WHEN u.idade BETWEEN 26 AND 30 AND u.sexo = 'Masculino' THEN 1 END) AS faixa_26_30,
  COUNT(CASE WHEN u.idade BETWEEN 31 AND 35 AND u.sexo = 'Masculino' THEN 1 END) AS faixa_31_35,
  COUNT(CASE WHEN u.idade BETWEEN 36 AND 40 AND u.sexo = 'Masculino' THEN 1 END) AS faixa_36_40,
  COUNT(CASE WHEN u.idade > 40 AND u.sexo = 'Masculino' THEN 1 END) AS faixa_40_mais
FROM usuario u
JOIN respostas r ON u.idusuario = r.fk_usuario

UNION ALL 

SELECT
  'Feminino' AS sexo,
  COUNT(CASE WHEN u.idade BETWEEN 15 AND 20 AND u.sexo = 'Feminino' THEN 1 END),
  COUNT(CASE WHEN u.idade BETWEEN 21 AND 25 AND u.sexo = 'Feminino' THEN 1 END),
  COUNT(CASE WHEN u.idade BETWEEN 26 AND 30 AND u.sexo = 'Feminino' THEN 1 END),
  COUNT(CASE WHEN u.idade BETWEEN 31 AND 35 AND u.sexo = 'Feminino' THEN 1 END),
  COUNT(CASE WHEN u.idade BETWEEN 36 AND 40 AND u.sexo = 'Feminino' THEN 1 END),
  COUNT(CASE WHEN u.idade > 40 AND u.sexo = 'Feminino' THEN 1 END)
FROM usuario u
JOIN respostas r ON u.idusuario = r.fk_usuario;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterMetricasdeAcertos() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            SELECT
  CASE
    WHEN r.score >= 5 THEN 1
    ELSE 0
  END AS faixa_acertos,
  COUNT(*) AS total_pessoas
FROM respostas r
GROUP BY faixa_acertos
order by faixa_acertos desc;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    obtersexoscore,
    obterartista,
    obterNumerosdeUsuarios,
    obterMetricasIdadeSexo,
    obterMetricasdeAcertos
};