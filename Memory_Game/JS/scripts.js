const gameBoard = document.getElementById('gameBoard');
const newGameBtn = document.getElementById('newGameBtn');
const difficultySelect = document.getElementById('difficulty');
let timerInterval;
let secondsElapsed = 0;

const cardSets = {
    easy: ['A','B','C','D','E','F','G','H'],
    medium: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'],
    hard: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4']
};

function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    document.getElementById('timer').textContent = '00:00';

    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const seconds = String(secondsElapsed % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }, 1000);
}
function startNewGame() {
    startTimer();
    const difficulty = difficultySelect.value;
    gameBoard.className = difficulty; 

    let cards = [...cardSets[difficulty], ...cardSets[difficulty]]; 
    cards.sort(() => 0.5 - Math.random()); 

    gameBoard.innerHTML = ''; 

    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = ''; 
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });

    moveCount = 0;
    document.getElementById('moveCount').textContent = moveCount;
    flippedCards = [];
}

let flippedCards = [];
let moveCount = 0;

function handleCardClick(event) {
    const clickedCard = event.target;

    if (flippedCards.length < 2 && !clickedCard.classList.contains('matched') && !clickedCard.classList.contains('flipped')) {
        clickedCard.textContent = clickedCard.dataset.value;
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            moveCount++;
            document.getElementById('moveCount').textContent = moveCount;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }

    const allMatched = [...gameBoard.children].every(card => card.classList.contains('matched'));
    if (allMatched) {
        setTimeout(() => {
            alert(`Game Over! Moves: ${moveCount}`);
        }, 500);
    }
}

newGameBtn.addEventListener('click', startNewGame);