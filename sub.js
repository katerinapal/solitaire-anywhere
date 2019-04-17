var bonus;
var topAce4;
var topAce3;
var topAce2;
var topAce1;
var a;
var r;
var active;
var cardFolder;
var ind;
var colInd;
var j;
var ace4Suit;
var ace3Suit;
var ace2Suit;
var ace1Suit;
var attached;
var idNum;
var i;
import { moveArray } from ".\\movefunctions.js";
import { originalCardTopPos } from ".\\movefunctions.js";
import { originalCardLeftPos } from ".\\movefunctions.js";
import { leftPosArray } from ".\\freecell.js";
import { columnArray } from ".\\freecell.js";
import { ace4 } from ".\\freecell.js";
import { ace3 } from ".\\freecell.js";
import { ace2 } from ".\\freecell.js";
import { ace1 } from ".\\freecell.js";
import { deck } from ".\\freecell.js";
import { staticImageArray } from ".\\freecell.js";
import { overlap } from ".\\freecell.js";
import { numMoves } from ".\\freecell.js";
import { freecell } from ".\\freecell.js";
import { klondike } from ".\\freecell.js";
import { checkForHighScore } from ".\\solitaire.js";
import { addToScore } from ".\\solitaire.js";
import { setPrefs } from ".\\freecell.js";
import { checkForFastestTime } from ".\\freecell.js";
export var r;

// <!-- Filename: sub.js -->
// <!-- Created December 2, 2003 by Leah Culver -->
// <!-- Last modified 12/5/2003 by Leah Culver -->

export function returnToOriginalPile() {
	for(i = 0; i < moveArray.length; i ++)
	{
		idNum = moveArray[i]
		attached = document.getElementById(idNum)
		attached.style.pixelLeft = originalCardLeftPos
		attached.style.pixelTop = originalCardTopPos + overlap*i
	}
}

export function setAcePileSuit(acePile, suitName) {
	if(acePile == ace1)
		{ace1Suit = suitName}
	else if(acePile == ace2)
		{ace2Suit = suitName}
	else if(acePile == ace3)
		{ace3Suit = suitName}
	else if(acePile == ace4)
		{ace4Suit = suitName}
}

export function getAcePileSuit(acePile) {
	if(acePile == ace1)
		{return ace1Suit}
	else if(acePile == ace2)
		{return ace2Suit}
	else if(acePile == ace3)
		{return ace3Suit}
	else if(acePile == ace4)
		{return ace4Suit}
}

export function findColumn(cardNum) {
	for(i =0; i < columnArray.length; i++)
	{
		for(j = 0; j < columnArray[i].length; j++)
			{if(columnArray[i][j] == cardNum)
			{return columnArray[i]}}
	}
}

export function findLeftPosition(column) {
	for(colInd=0; colInd < columnArray.length; colInd++)
	{
		if(columnArray[colInd] == column)
			return leftPosArray[colInd]
	}
}

export function findIndex(cardNumber, columnName) {
	for(ind = 0; ind < columnName.length; ind++)
		{if(columnName[ind] == cardNumber)
		{return ind}}
}

export function changeDeck() {
	setPrefs()
	cardFolder = document.getElementById('chooseDeck').value + "/"
	for(i=0; i < deck.length; i++)
	{
		active = document.getElementById(deck[i])
		if(active.className == "drag" || active.className == "noDrag")
			active.src = cardFolder + active.id + ".gif"
		else
			active.src = cardFolder + "back.gif"
	}
	if(klondike)
	{
		r = document.getElementById("restack")
		r.src = cardFolder + "restack.gif"
	}
	for(j=0; j < staticImageArray.length; j++)
	{
		a = document.getElementById(staticImageArray[j])
		a.src = cardFolder + "ace.gif"
	}
}

export function checkEndGame() {
	topAce1 = ace1[ace1.length - 1] % 13
	topAce2 = ace2[ace2.length - 1] % 13
	topAce3 = ace3[ace3.length - 1] % 13
	topAce4 = ace4[ace4.length - 1] % 13
	//alert(topAce1 + " - " + topAce2 + " - " + topAce3 + " - " + topAce4)
	if(topAce1 == 0 && topAce2 == 0 && topAce3 == 0 && topAce4 ==0)
	{
		if(klondike)
		{
			//calculate move bonus
			if(numMoves >= 122)
				bonus = 0
			else
				bonus = 1400 + ((numMoves - 52) * -20)
			alert("You win! It only took " + numMoves + " moves. Yeah. You get a bonus of " + bonus + " points. Now think of a good way to end this game.")
			addToScore(bonus)
			checkForHighScore()
		}
		else if(freecell)
		{
			alert("You win! Yeah. Now think of a good way to end this game.")
			checkForFastestTime()
		}
	}
}