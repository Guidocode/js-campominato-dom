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


const main = document.querySelector('.game-wrapper');
const BOMBS_NUMBER = 16;
document.getElementById('play').addEventListener('click', play);
let bombs = [];
let score = 0;

// Start Game
function play(){

  const level = document.getElementById('level').value;
  const gridLevels = [100,81,49];
  
  const cellNumbers = gridLevels[level];
  
  reset(cellNumbers);
  
  // console.log('bombs', bombs);
  
  generateGridGame(cellNumbers);

}

// Funzione che genera la griglia di gioco
function generateGridGame(cellNumbers){

  const grid = document.createElement('div');
  grid.className = 'grid';

  for(let i = 1; i <= cellNumbers; i++){

    const cell = generateCell(i, cellNumbers);
    grid.append(cell);
  }

  main.append(grid);

}

// Funzione che genera le celle
function generateCell(cellId, cellNumbers){
  
  const cell = document.createElement('div');
  cell.className = 'cell';

  cell.classList.add('square'+cellNumbers);
  cell.innerHTML = `<span>${cellId}</span>`;

  // creo la proprietà custom cellIdr per andarla a leggere al click
  cell.cellId = cellId;

  cell.addEventListener('click', clickCell);

  return cell;
}

// Funzione scatenata dal click della cella
function clickCell(){
  /*
    1. contare i click
    2. "leggere" il numero della cella
    3. verificare se il numero è presente nell'array delle bombe
    4. se NO aggiungere la classe clicked
    5. se SI attivare la procedura di fine gioco :-)
  */
  
  console.log(this.cellId);

  if(!bombs.includes(this.cellId)){

    score++;
    this.classList.add('clicked');
    console.log('OK', this.cellId);
    const cells = document.getElementsByClassName('cell');

    if(score === cells.length - BOMBS_NUMBER){
      printEndGame('Hai Vinto!!!');
    }
  }else{
    endGame(this);
  }
}

// Funzione che scatena la fine del gioco 
function endGame(el){

  console.log('FINE GIOCO')
  el.classList.add('bomb');
  const endMsg = `<h3 class="py-3">Gioco finito, hai calpestato 1 bomba su ${BOMBS_NUMBER}! Numero di tentativi: ${score}</h3>`;
  printEndGame(endMsg);
}

// Funzione che stampa la fine del gioco
function printEndGame(endMsg){

  document.querySelector('.endMessage').innerHTML = endMsg;
  seeAllBombs();
  const endGameHtmlLevel = document.createElement('div');
  endGameHtmlLevel.className = 'endGame';
  main.append(endGameHtmlLevel);
}

// Funzione per mostrare tutte le bombe a fine gioco
function seeAllBombs(){
  
  const cells = document.getElementsByClassName('cell');
  for(let i = 0; i < cells.length; i++){
    if(bombs.includes(i + 1)){
      cells[i].classList.add('bomb');
    }

  }
  console.log(cells);
}

// Funzione che genera le bombe
function generateBombs(cellNumbers){
  const generatedBombs = [];

  while(generatedBombs.length < BOMBS_NUMBER){

    const bomb = generateRandomInt(1, cellNumbers);

    if(!generatedBombs.includes(bomb)){
      generatedBombs.push(bomb);
    }
  }

  return generatedBombs;
}

// Funzione di reset
function reset(cellNumbers){
  
  bombs = generateBombs(cellNumbers);
  main.innerHTML = '';
  document.querySelector('.endMessage').innerHTML = '';
}

// Funzione numeri random
function generateRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
