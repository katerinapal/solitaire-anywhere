export var card;

export function keyaction_modificationFunc_11() {
    card = document.getElementById(ma[i]);
}

var lnum;
var u;
var num;
export var ani;

export function keyaction_modificationFunc_8() {
    ani = true;
}

export function keyaction_modificationFunc_7() {
    ani = false;
}

var topCardArray;
var index2;
var index1;
var s;
var counter;
var searchCardValue2;
var searchCardValue1;
var c;
var acePileArray;
var okToMove;
var theTopCard;
var keepCheckingForStuffToMoveToTheAcePiles;
var freeSpots;
var end;
var aceStart;
export var checkMe;

export function keyaction_modificationFunc_10() {
    checkMe = document.getElementById(col0[topIndex]);
}

export var active;

export function keyaction_modificationFunc_12() {
    active = document.getElementById(deck[i]);
}

export function keyaction_modificationFunc_9() {
    active = document.getElementById(deck[q]);
}

var col;
var b;
var k;
var topCardIndex;
var q;
import { animTime } from ".\\snaptoplace.js";
import { leftPosArray } from ".\\freecell.js";
import { columnArray } from ".\\freecell.js";
import { ace4 } from ".\\freecell.js";
import { ace3 } from ".\\freecell.js";
import { ace2 } from ".\\freecell.js";
import { ace1 } from ".\\freecell.js";
import { deck } from ".\\freecell.js";
import { mouseIsDown } from ".\\freecell.js";
import { paused } from ".\\freecell.js";
import { freecell } from ".\\freecell.js";
import { klondike } from ".\\freecell.js";
import { validateCard } from ".\\validatecard.js";
import { findIndex } from ".\\sub.js";
import { checkForHighScore } from ".\\solitaire.js";
import { undo } from ".\\snaptoplace.js";
import { snapToPlace } from ".\\snaptoplace.js";
import { updateRecord } from ".\\nameprompt.js";
import { findPossibleMoves } from ".\\movefunctions.js";
import { unPause } from ".\\freecell.js";
import { pause } from ".\\freecell.js";
import { assignMovableClass } from ".\\freecell.js";
export var num;
var s;
export var col;
var k;
var q;

// <!-- Filename: keyaction.js -->
// <!-- Created December 2, 2003 by Leah Culver -->
// <!-- Last modified 12/15/2003 by Leah Culver -->

//handles the onkeyup
export function keyUpAction() {
	//alert(event.keyCode)

	//shift key up - unhighlight
	if((klondike && event.keyCode == 16) || ((event.keyCode >=48 && event.keyCode <= 57) || (event.keyCode >=96 && event.keyCode <= 105) || event.keyCode == 74 || event.keyCode == 81 || event.keyCode == 75 || event.keyCode == 65))
	{
		//un-highlight every card in the deck
		for(q=0; q < deck.length; q++)
			document.getElementById(deck[q]).style.filter = ""
	}
	// Check if the user hit enter while the high score dialogue is visible.
	// This should okay off the dialogue box.
	else if(event.keyCode == 13 && document.getElementById('highScoreDialogue').style.visibility == "visible")
		updateRecord()
	//z for undo
	else if(event.keyCode == 90 && !mouseIsDown && document.getElementById('highScoreDialogue').style.visibility == "hidden")
		undo()
	//n for new game
	else if(event.keyCode == 78 && !mouseIsDown && document.getElementById('highScoreDialogue').style.visibility == "hidden")
	{
		if(klondike)
			checkForHighScore()
		else if(freecell)
			window.location.replace('freecell.html')
	}
	//p for pause
	else if(freecell && event.keyCode == 80 && !mouseIsDown && document.getElementById('highScoreDialogue').style.visibility == "hidden")
	{
		if(paused)
			unPause()
		else
			pause()
	}
	//space bar to move cards to ace pile
	else if(event.keyCode == 32 && !mouseIsDown)
	{
		//disable sound(quicktime)
		document.cardSound.stop()
		moveToAcePiles(true)
	}
}

//key down / key pressed
export function keyDownAction() {
	//the shift key
	if(klondike && event.shiftKey && animTime == null)
	{
		for(q=0; q < 8; q++)
		{
			//find if the card in col0 is moveable
			topCardIndex = columnArray[q].length
			for(k=0; k < topCardIndex; k++)
			{
				if(document.getElementById(columnArray[q][k]).className == 'drag')
				{
					topCardIndex = k
				}
			}

			if(topCardIndex < columnArray[q].length && findPossibleMoves(columnArray[q][topCardIndex], false))
			{
				document.getElementById(columnArray[q][topCardIndex]).style.filter = "Invert"
			}
		}

		//find top cards that are moveable cards on the table and in the ace piles
		for(b=1; b < columnArray.length; b++)
		{
			col = columnArray[b]
			active = document.getElementById(col[col.length - 1])

			if(col[col.length - 1])//top card on the pile exists
			{
				if(findPossibleMoves(col[col.length - 1], false) && active.className =='drag')
					active.style.filter = "Invert"
				else
					active.style.filter = ""
			}
		}
	}
	
	//0-9 or k, q, j, to highlight those cards
	if(((event.keyCode >=48 && event.keyCode <=57) || (event.keyCode >=96 && event.keyCode <= 105) || event.keyCode == 74 || event.keyCode == 81 || event.keyCode == 75 || event.keyCode == 65) && !mouseIsDown && document.getElementById('highScoreDialogue').style.visibility == "hidden")
	{
		highlightCardValue(event.keyCode)
	}
}

//this function checks for everything that can
//be moved to the ace piles then moves it there
export function moveToAcePiles(moveAll) {
	checkMe = new Array()
	if(klondike)
	{
		aceStart = 8
		end = columnArray.length
		checkMe = columnArray.slice(1,aceStart)
	}
	else if(freecell)
	{
		aceStart = 9
		end = 13
		checkMe = columnArray.slice(1,aceStart)
		freeSpots = new Array()
		freeSpots = columnArray.slice(13,columnArray.length)
		checkMe = checkMe.concat(freeSpots)
	}
			
	keepCheckingForStuffToMoveToTheAcePiles = true
	while(keepCheckingForStuffToMoveToTheAcePiles)
	{
		keepCheckingForStuffToMoveToTheAcePiles = false
		//check all columns on the table or for free cell, all the free cells
		for(b=0; b < checkMe.length; b++)
		{
			col = checkMe[b]
			theTopCard = col[col.length - 1]
			active = document.getElementById(theTopCard)

			if(theTopCard)//top card on the pile exists
			{
				okToMove = true
				acePileArray = new Array(ace1, ace2, ace3, ace4)
				
				//loop through ace piles
				for(c=aceStart; c < end; c++)
				{
					if(validateCard(theTopCard, col, columnArray[c]) && active.className =='drag')
					{
						//freecell only - check if the card is still needed on the table
						//find two cards two values lower and the same color to be able to move
						if(!moveAll && theTopCard%13 != 1 && theTopCard%13 != 2)//all aces and twos can move
						{
							searchCardValue1 = theTopCard - 2
							
							//spade or diamond
							if(searchCardValue1 < 13 || (searchCardValue1 > 26 && searchCardValue1 < 40))
								searchCardValue2 = searchCardValue1 + 13
							else //club or heart
								searchCardValue2 = searchCardValue1 - 13

							counter = 0
							for(s = 0; s < acePileArray.length; s++)
							{
								index1 = findIndex(searchCardValue1, acePileArray[s])
								index2 = findIndex(searchCardValue2, acePileArray[s])
								if(index1 > -1 || index2 > -1)//it exists
									counter++
							}
							
							if(counter < 2)
								okToMove = false
						}
					
						if(okToMove)
						{
							//create an array
							topCardArray = new Array()
							topCardArray[0] = theTopCard
							
							ani = false
							if(document.getElementById("animOption").checked)
								ani = true
							
							snapToPlace(topCardArray, col, columnArray[c], leftPosArray[c], false, ani)
							if(freecell)
								assignMovableClass()
							//exit the inner loop
							c = end
							keepCheckingForStuffToMoveToTheAcePiles = true
						}
					}
				}
			}
		}
	}
}

function highlightCardValue(value)
{
	if(value >= 49 && value <= 57)//key is 1 - 9
		num = value - 48
	else if(value >= 97 && value <= 105)//key is 1 - 9 on the keypad
		num = value - 96
	else if(value == 48 || value == 96)//key is 0 for 10
		num = 10
	else if(value == 65)//key is a for ace
		num = 1
	else if(value == 74)//key is j for jack
		num = 11
	else if(value == 81)//key is q for queen
		num = 12
	else if(value == 75)//key is k for king
		num = 0
		
	for(u=0; u < deck.length; u++)
	{
		lnum = deck[u]%13
		card = document.getElementById(deck[u])
		if(lnum == num && (card.className == "drag" || card.className == "noDrag"))
			card.style.filter = "Invert"
	}
}