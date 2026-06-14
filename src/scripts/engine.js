const state = {
    score: {
        pointsInicialWin: 0,
        pointsInitialDefeat: 0,
        winScore: document.getElementById("score-win"),
        defeatScore: document.getElementById("score-lose"),
    },
    cardPreview: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    handCardsPlayers: { 
        player: document.getElementById("hand-player"),
        computer: document.getElementById("hand-computer"),
    },
    playersSides: {
        player: "hand-player",
        computer: "hand-computer",
    },
    cardsInField: {
        player: document.getElementById("player-move-card"),
        computer: document.getElementById("computer-move-card"),
    },
    actions: {
        buttonNext: document.getElementById("next-duel"),
    },
    paths: {
        images: "./src/assets/icons/",
    }
}

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        image: `${state.paths.images}/dragon.png`,
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        image: `${state.paths.images}/magician.png`,
        winOf: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia the Forbidden One",
        type: "Scissors",
        image: `${state.paths.images}/exodia.png`,
        winOf: [0],
        loseOf: [1],
    },
]

/*=================================
função para gerar número aleatório
===================================*/
async function getRandomIdCard () {
    const randomId = Math.floor(Math.random() * cardData.length);
    
    return cardData[randomId].id;
}

/*========================
entrega as cartas do jogo
==========================*/
async function createCardImage (idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.classList.add("card");
    cardImage.setAttribute("src",`${state.paths.images}card-back.png`);
    cardImage.setAttribute("data-id", idCard);

    //essa função é para telas touchscreen
    if (fieldSide === state.playersSides.player) {

        let startY = 0;

        cardImage.addEventListener("touchstart", (event) => {

            // Mantém sua ação atual
            drawcardPreview(idCard);
            
            // Guarda a posição inicial do toque
            startY = event.touches[0].clientY;
        });

        cardImage.addEventListener("touchend", (event) => {
            const endY = event.changedTouches[0].clientY;

            if (startY - endY > 50) {
                console.log("Arrastou para cima");

                state.cardsInField.player.src = cardData[idCard].image;
            
            }
        });
    }
    
    return cardImage;
}

/*=====================================================
mostra detalher da carta selecionada no painel lateral
=======================================================*/
async function drawcardPreview(idCard) {
    state.cardPreview.avatar.src = cardData[idCard].image;
    state.cardPreview.name.textContent = cardData[idCard].name;
    state.cardPreview.type.textContent = "Attribute: " + cardData[idCard].type;
}

/*=============================================
função para distribuir as cartas aleatóriamente
===============================================*/
async function drawCards (numberOfCards, fieldSide) {
    for (let i = 0; i < numberOfCards; i++) {
        const randomIdCard = await getRandomIdCard();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

/*=====================================
função que atualiza o placar do jogo
=======================================*/
function score (winPoint, defeatPoint){
    console.log(state.score.pointsInicialWin)
    state.score.winScore.textContent = `Win : ${winPoint}`;
    state.score.defeatScore.textContent = `Lose: ${defeatPoint}`;
}

/*=====================================
função responsável por iniciar o jogo
=======================================*/
function init () {

    score(state.score.pointsInicialWin,state.score.pointsInitialDefeat);
    drawCards(5,state.playersSides.player);
    drawCards(5,state.playersSides.computer);
}

init();