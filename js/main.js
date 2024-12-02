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

let board;
let turn = 'X';
let win;
/**
 * Compteur pour X et Compteur pour O
 */
let scoreX = 0;
let scoreO = 0;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));
const scoreBoard = document.createElement('div');
scoreBoard.id = "scoreboard";
document.body.insertBefore(scoreBoard, document.querySelector('h1').nextSibling);

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    
    /**
     *  Ne pas pouvoir jouer si il y a une win ou un match nul
     */
    if (board[idx] || win) return;
    
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    if (win) {
        updateScore(win);
    }
    render();
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    /**
     * Pour mettre l'état de la victoire
     */
    win = null
    render();
};

function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
        
        squares[index].classList.remove('x', 'o');

        if (mark === 'X') {
            squares[index].classList.add('x'); 
        } else if (mark === 'O') {
            squares[index].classList.add('o'); 
        }
    });
    messages.textContent = win === 'T' ? `C'est un match nul !` : win ? `${win} Gagne le match!` : `C'est le tour des ${turn} !`;
};
/**
 * Fonction pour faire un winner
 */
function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
    } else if (winner === 'O') {
        scoreO++;
    }
    displayScore();
}
/**
 * Pour afficher le score en haut de l'écran
 */
function displayScore() {
    scoreBoard.textContent = `Score: X - ${scoreX} | O - ${scoreO}`;
}
init();
/**
 * Nommez les variables
 */
const modal = document.getElementById('popUp');
const overlay = document.getElementById('overlay');

/**
 * Ouvrir automatiquement le modal dès que la page est prête
 * De plus que le background soit bleu derrière le dialogue
 */
window.addEventListener('load', () => {
  modal.showModal();  
  overlay.style.display = 'block';  
  document.body.style.overflow = 'hidden'; 
});
/**
 * Pouvoir simplement fermer le dialogue et qu'il revient après que la page se recharge
 * De plus que cela fait revernir a la norme le background
 */
function fermerDialogue() {
  document.getElementById("popUp").close();
  overlay.style.display = 'none';  
  document.body.style.overflow = ''; 
}
/**
 * Pouvoir activer le fait que le dialogue ce ferme pour toujours
 * De plus que cela fait revernir a la norme le background
 */
function fermerPourToujours() {
  localStorage.setItem("dialogueFermé", "true");
  document.getElementById("popUp").close();
  overlay.style.display = 'none';  
  document.body.style.overflow = ''; 
}
/**
 * Vérifier que quand la page se charge et que le bouton qui ferme pour toujours est activer cela ce ferme automatiquement.
 * De plus que cela fait revernir a la norme le background
 */
window.onload = function() {
  if (localStorage.getItem("dialogueFermé") === "true") {
    document.getElementById("popUp").close();
    overlay.style.display = 'none';  
    document.body.style.overflow = '';
  }
};
