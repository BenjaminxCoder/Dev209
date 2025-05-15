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

function startTimer(reset = true) {
    clearInterval(timerInterval);
    if (reset) secondsElapsed = 0;
    document.getElementById('timer').textContent = `${String(Math.floor(secondsElapsed / 60)).padStart(2, '0')}:${String(secondsElapsed % 60).padStart(2, '0')}`;

    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const seconds = String(secondsElapsed % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
        sessionStorage.setItem('timer', secondsElapsed);
    }, 1000);
}
function startNewGame(reset = true) {
    startTimer(reset);
    const difficulty = difficultySelect.value;
    gameBoard.className = difficulty; 

    let cards = [...cardSets[difficulty], ...cardSets[difficulty]]; 
    cards.sort(() => 0.5 - Math.random()); 

    gameBoard.innerHTML = ''; 

    cards.forEach((value, idx) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = ''; 
        card.id = `card-${idx}`;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });

    if (reset) {
        moveCount = 0;
        secondsElapsed = 0;
    }

    document.getElementById('moveCount').textContent = moveCount;
    flippedCards = [];
    saveSessionState();
}

function saveSessionState() {
    const state = {
        cards: [...document.querySelectorAll('.card')].map(card => ({
            id: card.id,
            flipped: card.classList.contains('flipped'),
            matched: card.classList.contains('matched')
        })),
        difficulty: difficultySelect.value,
        style: document.getElementById('styleSelect').value,
        timer: secondsElapsed,
        moveCount: moveCount
    };
    sessionStorage.setItem('gameState', JSON.stringify(state));
}

let flippedCards = [];
let moveCount = 0;

function incrementGlobalMoves() {
    let totalMoves = Number(localStorage.getItem('totalMoves') || 0);
    totalMoves++;
    localStorage.setItem('totalMoves', totalMoves);
    document.getElementById('globalMoveDisplay').textContent = `Total Moves (All Tabs): ${totalMoves}`;
}

function updateGlobalMoveDisplay() {
    let totalMoves = Number(localStorage.getItem('totalMoves') || 0);
    document.getElementById('globalMoveDisplay').textContent = `Total Moves (All Tabs): ${totalMoves}`;
}

window.addEventListener('storage', (event) => {
    if (event.key === 'totalMoves') {
        updateGlobalMoveDisplay();
    }
});

function handleCardClick(event) {
    const clickedCard = event.target;

    if (flippedCards.length < 2 && !clickedCard.classList.contains('matched') && !clickedCard.classList.contains('flipped')) {
        clickedCard.textContent = clickedCard.dataset.value;
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            moveCount++;
            document.getElementById('moveCount').textContent = moveCount;
            incrementGlobalMoves();
            checkForMatch();
            saveSessionState();
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
            saveSessionState();
        }, 500);
    }
}

newGameBtn.addEventListener('click', startNewGame);

function restoreSessionState() {
    const state = JSON.parse(sessionStorage.getItem('gameState'));
    if (!state) {
        startNewGame(false);
        updateGlobalMoveDisplay();
        return;
    }

    difficultySelect.value = state.difficulty;
    document.getElementById('styleSelect').value = state.style;
    secondsElapsed = state.timer || 0;
    moveCount = state.moveCount || 0;
    document.getElementById('moveCount').textContent = moveCount;

    clearInterval(timerInterval);
    document.getElementById('timer').textContent = `${String(Math.floor(secondsElapsed / 60)).padStart(2, '0')}:${String(secondsElapsed % 60).padStart(2, '0')}`;
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const seconds = String(secondsElapsed % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
        sessionStorage.setItem('timer', secondsElapsed);
    }, 1000);

    const difficulty = difficultySelect.value;
    gameBoard.className = difficulty;

    let cards = [...cardSets[difficulty], ...cardSets[difficulty]];
    cards.sort(() => 0.5 - Math.random());

    gameBoard.innerHTML = '';
    flippedCards = [];

    cards.forEach((value, idx) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = '';
        card.id = `card-${idx}`;

        const match = state.cards.find(c => c.id === card.id);
        if (match) {
            if (match.flipped) {
                card.classList.add('flipped');
                card.textContent = value;
                flippedCards.push(card);
            }
            if (match.matched) {
                card.classList.add('matched');
                card.textContent = value;
            }
        }

        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });

    document.getElementById('moveCount').textContent = moveCount;
    updateGlobalMoveDisplay();
}

window.addEventListener('DOMContentLoaded', restoreSessionState);