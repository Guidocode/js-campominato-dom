/*
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

>>>>>>-------------------------------------------------<<<<<<

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/


const main = document.querySelector('main');

const limitBombs = 16;

// Creo un evento di click sul bottone play
document.getElementById('play').addEventListener('click', play);


// Qui scrivo cosa accade quando clicco su play 
function play(){

    reset();

    const level = document.getElementById('level').value;
    const gridLevels = [100, 81, 49];

    const cellNumbers = gridLevels[level];
    console.log('quantità celle', cellNumbers);

    const bomb = generateBombs(cellNumbers);
    console.log(bomb);

    generateGridGame(cellNumbers);
}


// funzione per resettare il contenuto del main
function reset(){
    main.innerHTML = '';
}


// funzione per generare la griglia di gioco
function generateGridGame(numeroCelle){

    const grid = document.createElement('div');
    grid.className = 'gb-grid';

    for( let i = 1; i <= numeroCelle; i++ ){
        
        const cell = generateCell(i, numeroCelle);
        grid.append(cell);
    }

    main.append(grid);
}


// funzione per generare le celle della griglia
function generateCell(cellId, totCelle){

    const cell = document.createElement('div');
    cell.className = 'cell square' + totCelle;
    cell.innerHTML = `<span>${cellId}</span>`;

    cell.addEventListener('click', clickCell);

    return cell;
}


// funzione per aggiungere la classe clicked all'elemento cliccato
function clickCell(){

    
    
    this.classList.add('clicked');
}


/*
    1. Genero una lista di 16 numeri casuali da 1 a cellNumber

    2. I numeri non devono ripetersi.

    3. L’utente clicca su una cella: se il numero è presente nella lista dei numeri 
        generati - abbiamo calpestato una bomba - la cella si colora di rosso

    4. La partita termina quando il giocatore clicca su una bomba o raggiunge il 
        numero massimo possibile di numeri consentiti.
*/


// Funzione che genera le bombe
function generateBombs(cellNumbers){

    const generatedBombs = [];

    while( generatedBombs.length < limitBombs ){
        const bomb = getRndInteger(1, cellNumbers)

        if( !generatedBombs.includes(bomb )){
            generatedBombs.push(bomb);
        }
    }

    return generatedBombs;
}



// Funzione genera numeri random con un min e max indicato da me
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}