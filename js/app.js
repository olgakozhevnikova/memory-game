'use strict';

// Create a list that holds all of cards
let cards = document.getElementsByClassName('card');

// Create a list of all matched cards
let cardsMatched = document.getElementsByClassName('match');

// Get the modal
let modal = document.getElementById('myModal');

// Create a list that holds open cards
let cardsOpen = [];

// Shuffle cards
$(function() {
	let parent = $('.deck');
    let card = parent.children();
    while (card.length) {
        parent.append(card.splice(Math.floor(Math.random() * card.length), 1)[0]);
	}
	setTimeout(function() {
		startTimer();
	}, 5000);
});

// Set up the event listener for cards
// []=Array.prototype
[].forEach.call(cards, function(element) {
	element.classList.add('enable');
	setTimeout(function() {
		element.classList.remove('enable');
	}, 5000);
	element.addEventListener('click', openCard, false);
	element.addEventListener('click', openModal);
});


// add the card to a *list* of "open" cards 
function openCard() {
	this.classList.add('show', 'open');
	cardsOpen.push(this);
	if (cardsOpen.length === 2) {
		if (cardsOpen[0].innerHTML === cardsOpen[1].innerHTML) {
			match();
		}
		else {
			unmatch();
		}
	}
}

// Start the timer
let min = 0, sec = 0;
let timer = document.querySelector('.timer');
let interval;
function startTimer() {
	interval = setInterval(function(){
		timer.innerHTML = min + " mins " + sec + " secs";
		sec++;
		if (sec === 60){
			min++;
			sec = 0;
		}
	}, 1000);
}

// if the cards do match, lock the cards in the open position
function match() {
	cardsOpen[0].classList.add('match');
	cardsOpen[0].classList.remove('show', 'open');
	cardsOpen[1].classList.add('match');
	cardsOpen[1].classList.remove('show', 'open');
	cardsOpen = [];
}

// if the cards do not match, remove the cards from the list and hide the card's symbol
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

//  if all cards have matched, display a message with the final score
function openModal() {
	if (cardsMatched.length == 16) {
		$('.container').hide();
		document.body.style.background = "#fff";
		modal.style.display = "block";
	}
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
