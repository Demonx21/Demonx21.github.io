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

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

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
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
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
init();

    /**
     * Fonction pour seulement fermer le dialogue
     */
     function fermerDialogue() {
            document.getElementById("Pop-up").close();
        }
        /**
         * Fonction pour fermer définitivement le dialogue
         */
        function fermerPourToujours() {
            localStorage.setItem("dialogueFermé", "true");
            document.getElementById("Pop-up").close();
        }
        /**
         * Vérifier si le dialogue a déjà été fermé définitivement
         */
        window.onload = function() {
            if (localStorage.getItem("dialogueFermé") === "true") {
                document.getElementById("Pop-up").close();
            }
        };