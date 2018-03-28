'use strict';

// Create a list that holds all of cards
let cards = document.getElementsByClassName('card');
console.log(cards);

// Shuffle cards
$(function () {
    var parent = $('.deck');
    var card = parent.children();
    while (card.length) {
        parent.append(card.splice(Math.floor(Math.random() * card.length), 1)[0]);
    }
});

// Set up the event listener for cards
Array.prototype.forEach.call(cards, openCard);

function openCard(element) {
	element.addEventListener('click', function() {
		element.classList.add('show', 'open');
	}, false);
}






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */