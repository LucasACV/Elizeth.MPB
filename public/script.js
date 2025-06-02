const questoes = [
    {
        questoes: "Qual foi a cantora que ajudou a lançar a Bossa Nova no Brasil?",
        respostas: [
            { id: 1, text: "Alcione", correta: false },
            { id: 2, text: "Elis Regina", correta: false },
            { id: 3, text: "Elizeth Cardoso", correta: true },
            { id: 4, text: "Beth Carvalho", correta: false }
        ]
    },
    {
        questoes: "Em que álbum histórico de 1958, considerado um marco inicial da Bossa Nova, Elizeth Cardoso teve participação fundamental cantando algumas das primeiras composições de Tom Jobim e Vinicius de Moraes?",
        respostas: [
            { id: 1, text: "Chega de Saudade", correta: false },
            { id: 2, text: "Elis e Tom", correta: false },
            { id: 3, text: "Canção do Amor Demais", correta: true },
            { id: 4, text: "Getz/Gilberto", correta: false }
        ]
    },
    {
        questoes: "Antes de se tornar a 'Divina', qual era o primeiro nome completo de Elizeth Cardoso?",
        respostas: [
            { id: 1, text: "Elizeth Tereza da Conceição Cardoso", correta: true },
            { id: 2, text: "Elizeth Gomes Cardoso", correta: false },
            { id: 3, text: "Elizeth da Silva Cardoso", correta: false },
            { id: 4, text: " Elizeth Moreira Cardoso", correta: false }
        ]
    },
    {
        questoes: "Embora não seja estritamente uma cantora de Bossa Nova, Elizeth Cardoso foi fundamental por sua voz suave e pela interpretação. Em que estilo musical ela foi originalmente reconhecida como uma das maiores intérpretes?",
        respostas: [
            { id: 1, text: "Jazz", correta: false },
            { id: 2, text: "Samba-canção", correta: true },
            { id: 3, text: "Rock ", correta: false },
            { id: 4, text: "Forró", correta: false }
        ]
    },
    {
        questoes: "Qual foi o nome da canção composta por Tom Jobim e Vinicius de Moraes que Elizeth Cardoso gravou pela primeira vez no álbum 'Canção do Amor Demais', e que se tornou um dos clássicos da Bossa Nova?",
        respostas: [
            { id: 1, text: "Água de Beber", correta: false },
            { id: 2, text: "Desafinado", correta: false },
            { id: 3, text: "Chega de Saudade", correta: true },
            { id: 4, text: "Garota de Ipanema", correta: false }
        ]
    },
    {
        questoes: "Além de sua carreira musical, Elizeth Cardoso também teve participações em qual outra área artística?",
        respostas: [
            { id: 1, text: "Pintura", correta: false },
            { id: 2, text: "Escultura", correta: false },
            { id: 3, text: "Atuação em cinema e televisão", correta: true },
            { id: 4, text: "Dança Clássica", correta: false }
        ]
    },
    {
        questoes: "A Bossa Nova é conhecida por sua sonoridade suave e intimista, com grande uso de qual instrumento como acompanhamento principal?",
        respostas: [
            { id: 1, text: "Trompete", correta: false },
            { id: 2, text: "Piano", correta: false },
            { id: 3, text: "Violão", correta: true },
            { id: 4, text: "Bateria", correta: false }
        ]
    },
    {
        questoes: "Qual dos seguintes artistas não é considerado um dos 'pilares' fundadores da Bossa Nova?",
        respostas: [
            { id: 1, text: "João Gilberto", correta: false },
            { id: 2, text: "Tom Jobim", correta: false },
            { id: 3, text: "Vinicius de Moraes", correta: false },
            { id: 4, text: "Nelson Cavaquinho", correta: true }
        ]
    },
    {
        questoes: "Onde a Bossa Nova surgiu e se desenvolveu, tornando-se um movimento musical reconhecido mundialmente?",
        respostas: [
            { id: 1, text: "São Paulo", correta: false },
            { id: 2, text: "Salvador", correta: false },
            { id: 3, text: "Rio de Janeiro", correta: true },
            { id: 4, text: "Belo Horizonte", correta: false }
        ]
    },
    {
        questoes: "CURIOSIDADE : Qual cantor voce mais ouviu falar??",
        respostas: [
            { id: 1, text: "Vinícius de Moraes", correta: true },
            { id: 2, text: "Elis Regina", correta: true },
            { id: 3, text: "Elizeth Cardoso", correta: true },
            { id: 4, text: "Tom Jobim", correta: true }
        ]
    }
]

const questaoElement = document.getElementById("questao");
const respostabotao = document.getElementById("botao-resposta");
const proximabotao = document.getElementById("proxima-pergunta");
const dicasAprendizado = document.getElementById("dicas-aprendizado")

let questaoIndex = 0;
let score = 0;
let erradas = 0;
var alternativaSelecionada = ''
var textoUltimaPergunta = "";
var id_usuario = sessionStorage.ID_USUARIO

function comecarQuiz() {
    questaoIndex = 0
    score = 0
    erradas = 0
    dicasAprendizado.style.display = "none";
    proximabotao.innerHTML = "Próxima";

    showQuestion();
}

function resetState() { // garante que o primeiro elemento vá sendo removido
    dicasAprendizado.style.display = "none";
    proximabotao.style.display = "none";
    while (respostabotao.firstChild) {
        respostabotao.removeChild(respostabotao.firstChild);
    }
}

function showQuestion() {
    resetState();
    let questaoagora = questoes[questaoIndex];
    let questaoNo = questaoIndex + 1;
    questaoElement.innerHTML = `${questaoNo} . ${questaoagora.questoes}`;

    questaoagora.respostas.forEach((respostas) => {
        const button = document.createElement("button");
        button.innerHTML = respostas.text;
        button.dataset.id = respostas.id; // contem o id da resposta
        button.classList.add("btn");
        button.addEventListener("click", selecionarResposta);
        respostabotao.appendChild(button);

    })
}

function selecionarResposta(e) {
    respostas = questoes[questaoIndex].respostas;
    const respostaCorreta = respostas.filter((respostas) => respostas.correta == true)[0]

    const SelecionadoBtn = e.target;
    const ecorreto = SelecionadoBtn.dataset.id == respostaCorreta.id;

    alternativaSelecionada = SelecionadoBtn.innerText;

    if (ecorreto) {
        SelecionadoBtn.classList.add("correta")
        score++

    } else {
        SelecionadoBtn.classList.add("incorreta")
        erradas++
    }
    Array.from(respostabotao.children).forEach((button) => {
        button.disabled = true;
    });
    proximabotao.style.display = "block"; // deixa o o botão da proxima pergunta aparecer , dps que alguem marcar um alternativa
}

function showScore() {
    resetState();
    questaoElement.innerHTML = `Voce acertou ${score} e errou ${erradas} questões!`
    proximabotao.innerHTML = `Veja o resultado de todos em nossa DashBoard!`
    dicasAprendizado.style.display = "block";
    proximabotao.style.display = "block";

    fetch("/quiz/envioscore", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fk_usuarioServer: id_usuario,
            scoreServer: score,
            textoUltimaPerguntaServer: textoUltimaPergunta
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error("Erro ao enviar dados");
        }
        return response.json();
    }).then(data => {
        console.log("Enviado com sucesso:", data);
    }).catch(error => {
        console.error("Erro no envio:", error);
    });

    proximabotao.onclick = () => {
        window.location.href = "./dashboard.html"; // ir pro dash
    };
}


function proximobotao() {  // vai fazendo verificação de alternativa ate chegar na ultima , (que sao 10)
    questaoIndex++;
    if (questaoIndex < questoes.length) {
        showQuestion();
    } else {
        
        textoUltimaPergunta = alternativaSelecionada;
        showScore();
    }

}

proximabotao.addEventListener("click", () => {
    if (questaoIndex < questoes.length) {
        proximobotao();
    } else {
        comecarQuiz();
    }
})

comecarQuiz();


