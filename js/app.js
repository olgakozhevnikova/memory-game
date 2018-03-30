'use strict';

// Create a list that holds all of cards
let cards = document.getElementsByClassName('card');

// Create a list of all matched cards
let cardsMatched = document.getElementsByClassName('match');

// Declare a variable for a deck
let deck = document.querySelector('.deck');

// Get the modal
let modal = document.getElementById('myModal');

// Create a list that holds open cards
let cardsOpen = [];

// Declare a variable for stars
let stars = document.querySelectorAll('.fa-star');

// Declare variables for moves
let moves = 0;
let counter = document.querySelector('.moves');

// Declare variables for timer
let timer = document.querySelector('.timer');
let min = 0, sec = 0, interval;

// Refresh page
window.onload = startGame;

function startGame() {
	shuffle();
	// Set up the event listener for cards
	// []=Array.prototype
	[].forEach.call(cards, function(element) {
		element.classList.add('enable');
		setTimeout(function() {
			element.classList.remove('enable');
		}, 5000);
		element.addEventListener('click', openCard, false);
		element.addEventListener('click', openModal, false);
	});
	// Start the timer on first click
	oneClick(deck, 'click', startTimer);

	// Reset moves
	moves = 0;
	counter.innerHTML = moves;

	// Reset timer
	sec = 0;
	min = 0;
	timer.innerHTML = '0 mins 0 secs';
	clearInterval(interval);
}

// The function which stops after the first click
function oneClick(el, type, fn) {
    function handler(event) {
        el.removeEventListener(type, handler);
        fn(event);
    }
    el.addEventListener(type, handler);
}

// Shuffle cards
function shuffle() {
	let parent = $('.deck');
    let card = parent.children();
    while (card.length) {
        parent.append(card.splice(Math.floor(Math.random() * card.length), 1)[0]);
	}
}

// Add the card to a *list* of "open" cards 
function openCard() {
	this.classList.add('show', 'open');
	cardsOpen.push(this);
	if (cardsOpen.length === 2) {
		moveCounter();
		if (cardsOpen[0].innerHTML === cardsOpen[1].innerHTML) {
			match();
		}
		else {
			unmatch();
		}
	}
}

// If the cards do match, lock the cards in the open position
function match() {
	cardsOpen[0].classList.add('match');
	cardsOpen[0].classList.remove('show', 'open');
	cardsOpen[1].classList.add('match');
	cardsOpen[1].classList.remove('show', 'open');
	cardsOpen = [];
}

// If the cards do not match, remove the cards from the list and hide the card's symbol
function unmatch() {
	cardsOpen[0].classList.remove('open');
	cardsOpen[1].classList.remove('open');
	cardsOpen[0].classList.add('unmatched');
	cardsOpen[1].classList.add('unmatched');
	setTimeout(function() {
		cardsOpen[0].classList.remove('show');
		cardsOpen[1].classList.remove('show');
		cardsOpen[0].classList.remove('unmatched');
		cardsOpen[1].classList.remove('unmatched');
		cardsOpen = [];
	}, 1000);
}

// Start the timer
function startTimer() {
    interval = setInterval(function(){
		timer.innerHTML = min + ' mins ' + sec + ' secs';
		sec++;
		if (sec === 60){
			min++;
			sec = 0;
		}
	}, 1000);
}

// Increment the move counter and display it on the page
function moveCounter() {
	moves++;
	counter.innerHTML = moves;

	/* 
	  - Set number of stars based on number of moves
	  - If player makes 2 wrong moves, he still gets 3 stars
	  - If player makes 4 (2+2) wrong moves, he gets 2 stars
	*/
	if (moves > 10 && moves <= 12) {
		for (let i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = 'collapse'; 
			}
		}
	}

	// If player makes 6 (2+2+2) wrong moves, he gets 1 star
	if (moves > 12 && moves <= 14) {
		for (let i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = 'collapse';
			}
		}
	}

	// If player makes more than 8 (2+2+2+2) wrong moves, he gets 0 stars
	if (moves > 14) {
		for (let i = 0; i < 3; i++) {
			stars[i].style.visibility = 'collapse'; 
		}		
	}
}

// If all cards have matched, display a message with the final score
function openModal() {
	if (cardsMatched.length == 16) {
		clearInterval(interval);
		finalTime = timer.innerHTML;
		$('.container').hide();
		document.body.style.background = '#fff';
		modal.style.display = 'block';

		// Display number of moves and stars and playing time in the modal
		document.getElementById('time').innerHTML = finalTime;
		//document.getElementById('moves').innerHTML = ;
		//document.getElementById('stars').innerHTML = ;
	}
}
