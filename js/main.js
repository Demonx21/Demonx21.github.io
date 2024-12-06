/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/

let board = new Board(); 
let turn = 'X';            
let winner = new Winner(); 
let score = { X: 0, O: 0 }; 

/*----- Classes -----*/

/**
 *  Classe pour gérer l'état du plateau de jeu
 */
class Board {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
    }

    /**
     * Vérifier s'il y a un gagnant
     * @returns Retourne le gagnant et les cases si null = vide
     */
    getWinner() {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return this.board.includes('') ? null : 'T';
    }

    /**
     * Reset le plateau
     */
    reset() {
        this.board = ['', '', '', '', '', '', '', '', ''];
    }

    /**
     * Mettre à jour l'état du plateau à une position donnée
     * @param {number} index 
     * @param {string} player 
     */
    update(index, player) {
        this.board[index] = player;
    }

    /**
     * Pour jouer
     * @param {HTMLElement[]} squares 
     */
    render(squares) {
        this.board.forEach(function(mark, index) {
            squares[index].textContent = mark;
            squares[index].classList.remove('x', 'o');
            if (mark === 'X') {
                squares[index].classList.add('x');
            } else if (mark === 'O') {
                squares[index].classList.add('o');
            }
        });
    }
}

/**
 * Classe pour gérer l'état du gagnant
 */
class Winner {
    constructor() {
        this.winner = null;
        this.isGameOver = false;
    }

    /**
     * Déterminer si la partie est terminée et quel est le gagnant
     * @param {string|null} winner 
     */
    setWinner(winner) {
        this.winner = winner;
        this.isGameOver = winner !== null;
    }

    /**
     * Obtenir l'état de la victoire
     */
    get() {
        return this.winner;
    }
}

const squares = Array.from(document.querySelectorAll('#board div'));
const scoreBoard = document.createElement('div');
scoreBoard.id = "scoreboard";
document.body.insertBefore(scoreBoard, document.querySelector('h1').nextSibling);
const messages = document.querySelector('h2');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);

/*----- functions -----*/

/**
 * Fonction qui gère le tour du joueur
 * @param {MouseEvent} event 
 * @returns void
 */
function handleTurn(event) {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });

    if (board.board[idx] || winner.isGameOver) return;

    board.update(idx, turn); 
    turn = turn === 'X' ? 'O' : 'X'; 
    let currentWinner = board.getWinner(); 
    winner.setWinner(currentWinner); 
    if (winner.isGameOver) {
        updateScore(currentWinner);
    }
    render(); 
}

/**
 * Fonction pour initialiser (réinitialiser) le jeu
 */
function init() {
    board.reset();
    winner.setWinner(null);
    render();
}


/**
 * Fonction qui met à jour l'affichage du plateau
 */
function render() {
    board.render(squares); 
    const winnerStatus = winner.get(); 
    if (winner.isGameOver) {
        messages.textContent = winnerStatus === 'T' ? "C'est un match nul !" : `${winnerStatus} Gagne le match!`;
    } else {
        messages.textContent = `C'est le tour des ${turn} !`;
    }
}

/**
 * Fonction qui met à jour le score
 * @param {*} winnerStatus 
 */
function updateScore(winnerStatus) {
    if (winnerStatus === 'X') {
        score.X++;
    } else if (winnerStatus === 'O') {
        score.O++;
    }
    displayScore();
}

/**
 * Fonction qui affiche le score à l'écran
 */
function displayScore() {
    scoreBoard.textContent = `Score: X - ${score.X} | O - ${score.O}`;
}

init();

const modal = document.getElementById('popUp'); 
const overlay = document.getElementById('overlay'); 

window.addEventListener('load', () => {
  modal.showModal(); 
  overlay.style.display = 'block'; 
  document.body.style.overflow = 'hidden'; 
});

function fermerDialogue() {
  document.getElementById("popUp").close();
  overlay.style.display = 'none';  
  document.body.style.overflow = ''; 
}

function fermerPourToujours() {
  localStorage.setItem("dialogueFermé", "true");
  document.getElementById("popUp").close();
  overlay.style.display = 'none';  
  document.body.style.overflow = ''; 
}

window.onload = function() {
  if (localStorage.getItem("dialogueFermé") === "true") {
    document.getElementById("popUp").close();
    overlay.style.display = 'none';  
    document.body.style.overflow = '';
  }
};
