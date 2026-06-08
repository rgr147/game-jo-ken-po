const state = {
    score: {
        win: 0,
        lose: 0,   
        scoreWin: document.getElementById("score-win"),
        scoreLose: document.getElementById("score-lose"),
    },
    cardsDescription: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    playersSides: {
        player1: document.getElementById("player-cards"),
        computer: document.getElementById("enemy-cards"),
    },
    fieldCards: {
        player: document.getElementById("player-card"),
        computer: document.getElementById("computer-card"),
    },
    actions: {
        buttonNext: document.getElementById("next-duel"),
    },
    paths: {
        images: "./src/assets/icons/",
    }
}

const playerSides = {
    player1: "player-cards",
    computer: "enemy-cards",
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

async function getRandomIdCard () {
    const randomId = Math.floor(Math.random() * cardData.length);
    console.log(`primeiro id aleatorio foi: ${randomId}`);
    
    return cardData[randomId].id;
}

async function createCardImage (idCard, fieldSide) {
    console.log(`id da carta é: ${idCard}`);
    const cardImage = document.createElement("img");
    cardImage.classList.add("card");
    cardImage.setAttribute("src",`${state.paths.images}card-back.png`);
    cardImage.setAttribute("data-id", idCard);

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }
    cardImage.addEventListener("mouseover", () => {
        drawCardDescription(idCard);
    });

    return cardImage;
}

async function drawCards (numberOfCards, fieldSide) {
    for (let i = 0; i < numberOfCards; i++) {
        const randomIdCard = await getRandomIdCard();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init () {
    drawCards(5,playerSides.player1);
    drawCards(5,playerSides.computer);
}

init();