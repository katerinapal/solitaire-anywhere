
var prefString;
var inputN;
var winHeight;
var winWidth;
var pb;
var dis;
var v;
var playerName;
var cn;
var sf;
var f;
var pileCard;
var buriedCard;
var buriedNum;
var buriedCardIndex;
var prevFlippedCard;
var n;
var flipMe;
var idNum;
var count;
var leftAlign;
var pos;
var numToFlip;
var flipIndex;
var flipArray;
var k;
var en;
var st;
var moved;
var moveId;
var splPref5;
var splPref4;
var splPref3;
var splPref2;
var flipStyle;
var splPref;
var deckStyle;
var prefArray;
var temp;
var leftOfCardLocation;
var topOfCardLocation;
var sclass;
var image;
var q;
var num;
var rand;
var used;
var index;
var leftPosArray;
var columnArray;
var ace4Suit;
var ace4;
var ace3Suit;
var ace3;
var ace2Suit;
var ace2;
var ace1Suit;
var ace1;
var col0;
var col7;
var col6;
var col5;
var col4;
var col3;
var col2;
var col1;
var preloadCount;
var preloadImageArray;
var numCardsInDeck;
var deck;
var leftEdge;
var staticImageArray;
var col7Left;
var col6Left;
var col5Left;
var col4Left;
var col3Left;
var col2Left;
var col1Left;
var tableTop;
var pileUpLeft;
var pileDownLeft;
var cellTop;
var overlap;
var gutter;
var border;
var flipSpace;
var cardHeight;
var cardWidth;
var cardFolder;
var undoArray;
var mouseIsDown;
var acceptDblClick;
var numMoves;
var score;
var zPos;
var dragapproved;
var s;
var records;
var players;
var highScoresArray;
var numHighScores;
var freecell;
var klondike;
import { left } from ".\\snaptoplace.js";
import { moveArray } from ".\\movefunctions.js";
import { yCardCenter } from ".\\movefunctions.js";
import { xCardCenter } from ".\\movefunctions.js";
import { newyPos } from ".\\movefunctions.js";
import { newxPos } from ".\\movefunctions.js";
import { column } from ".\\movefunctions.js";
import { validateCard } from ".\\validatecard.js";
import { changeDeck } from ".\\sub.js";
import { findIndex } from ".\\sub.js";
import { returnToOriginalPile } from ".\\sub.js";
import { undo } from ".\\snaptoplace.js";
import { snapToPlace } from ".\\snaptoplace.js";
import { dblclickAction } from ".\\movefunctions.js";
import { drag } from ".\\movefunctions.js";
import { keyDownAction } from ".\\keyaction.js";
import { keyUpAction } from ".\\keyaction.js";
import { getCookieArray } from ".\\cookie.js";
import { setCookie } from ".\\cookie.js";
export var numToFlip;
export var flipIndex;
export var pileUpLeft;
export var pileDownLeft;
export var flipSpace;
export var prefString;
export var inputN;
export var winHeight;
export var winWidth;
export var pb;
export var dis;
var v;
export var moved;
export var moveId;
export var splPref4;
export var splPref3;
export var splPref2;
export var splPref;
export var deckStyle;
export var prefArray;
export var leftOfCardLocation;
export var topOfCardLocation;
export var rand;
export var used;
var index;
export var leftPosArray;
export var columnArray;
export var ace4Suit;
export var ace4;
export var ace3Suit;
export var ace3;
export var ace2Suit;
export var ace2;
export var ace1Suit;
export var ace1;
export var col0;
export var col7;
export var col6;
export var col5;
export var col4;
export var col3;
export var col2;
export var col1;
export var numCardsInDeck;
export var deck;
export var leftEdge;
export var staticImageArray;
export var col7Left;
export var col6Left;
export var col5Left;
export var col4Left;
export var col3Left;
export var col2Left;
export var col1Left;
export var tableTop;
export var cellTop;
export var overlap;
export var gutter;
export var border;
export var cardHeight;
export var cardWidth;
export var cardFolder;
export var undoArray;
export var numMoves;
export var score;
export var zPos;
export var records;
export var players;
export var freecell;
export var klondike;
//distinguish the game
klondike = true
freecell = false


numHighScores = 5
highScoresArray = getCookieArray("kscore")
if(!highScoresArray)
{
	setCookie("kscore", "none=0")
}

players = new Array(numHighScores)
records = new Array(numHighScores)

for(i=0; i < records.length; i++)
{
	//document.write(i + " -- " + highScoresArray[i] + "<br>")
	if(highScoresArray[i])//high score exists
	{
		s = highScoresArray[i].split("=")
		players[i] = s[0]
		records[i] = s[1]
	}
	else
	{
		players[i] = "none"
		records[i] = "0"
	}
}
document.write("<table class=inner width=100%>")
document.write("<tr><td>")
for(i=0; i<players.length; i++)
	{document.write(players[i] + "<br>")}
document.write("</td><td align=right>")
for(i=0; i<records.length; i++)
	{document.write(records[i] + "<br>")}


document.write("</td></tr>")
document.write("</table>")

document.write("</td></tr>")
document.write("</table>")

//event handlers
document.onmousedown = drag
document.onmouseup = mouseUpAction
document.ondblclick = dblclickAction
document.onkeydown = keyDownAction
document.onkeypress = keyDownAction
document.onkeyup = keyUpAction

dragapproved=false
zPos = 60 // top layer position
score = 0
numMoves = 0
acceptDblClick = true
mouseIsDown = false
undoArray = new Array() //initialize undo

//deck of cards
cardFolder = document.getElementById('chooseDeck').value + "/"
cardWidth = 80
cardHeight = 120

//playing field dimensions
flipSpace = 30 //distance between multiple flipped cards
border = 190
gutter = 15
overlap = 20
cellTop = 40
pileDownLeft = border
pileUpLeft = border + cardWidth + gutter
tableTop = cellTop + 160
col1Left = border
col2Left = border + cardWidth + gutter
col3Left = border + 2*cardWidth + 2*gutter
col4Left = border + 3*cardWidth + 3*gutter
col5Left = border + 4*cardWidth + 4*gutter
col6Left = border + 5*cardWidth + 5*gutter
col7Left = border + 6*cardWidth + 6*gutter

//draw static images
document.write("<img id='restack' src='" + cardFolder + "restack.gif'")
document.write("class ='restack' style='position:absolute;")
document.write("left:" + pileDownLeft + "px;")
document.write("top:" + cellTop + "px'>")

staticImageArray = new Array()
for(i = 0; i < 4; i++)
{
	leftEdge = border + (i+3)*cardWidth + (i+3)*gutter
	document.write("<img id='aceImage" + i + "' src='" + cardFolder + "ace.gif'")
	document.write("class ='' style='position:absolute; color: #ff0606; filter:Alpha(opacity=50);")
	document.write("left:" + leftEdge + "px;")
	document.write("top:" + cellTop + "px'>")
	staticImageArray[i] = "aceImage" + i
}

//on load function - more functionality yet to come!
function loadAction()
{
	document.getElementById('scoreField').value = '0'
}

//initialize the playing field
deck = new Array() //total of 52 cards
numCardsInDeck = 0
preloadImageArray = new Array()
preloadCount = 0

col1 = new Array()
fill(col1, 1)
col2 = new Array()
fill(col2, 2)
col3 = new Array()
fill(col3, 3)
col4 = new Array()
fill(col4, 4)
col5 = new Array()
fill(col5, 5)
col6 = new Array()
fill(col6, 6)
col7 = new Array()
fill(col7, 7)
col0 = new Array()
fill(col0, 24)
ace1 = new Array()
ace1Suit = ""
ace2 = new Array()
ace2Suit = ""
ace3 = new Array()
ace3Suit = ""
ace4 = new Array()
ace4Suit = ""
//array of columns
columnArray = new Array(col0, col1, col2, col3, col4, col5, col6, col7, ace1, ace2, ace3, ace4)
//positions for the left of each column corresponding to the column array
leftPosArray = new Array(border, col1Left, col2Left, col3Left, col4Left, col5Left, col6Left, col7Left, col4Left, col5Left, col6Left, col7Left)

function fill(arrayName, numberOfCards)
{
	for(index = 0; index < numberOfCards; index++)
	{
		used = false
		rand = Math.random()*52
		num = Math.ceil(rand)
		// check current contents of the deck for the random number
		for(q=0; q < numCardsInDeck; q++)
		{
			if(deck[q] == num)
			{
				used = true
			}
		}
		if(used != true)
		{
			arrayName[index] = num
			deck[numCardsInDeck] = num
			numCardsInDeck++

			image = "back"
			sclass = "" //not the top card

			if(numberOfCards < 24) //not the pile
			{
				topOfCardLocation = (index * overlap) + tableTop
				leftOfCardLocation = border + (numberOfCards-1)*cardWidth + (numberOfCards-1)*gutter
				if(index == numberOfCards - 1) //top card is face up
				{
					sclass = "class='drag'"
					image = num
				}
				else
				{
					temp = new Image()
					temp.src = cardFolder + num + ".gif"
					preloadImageArray[preloadCount] = temp
					preloadCount++
				}
			}
			else
			{
				sclass = "class='flip'"
				topOfCardLocation = cellTop
				leftOfCardLocation = pileDownLeft
				temp = new Image()
				temp.src = cardFolder + num + ".gif"
				preloadImageArray[preloadCount] = temp
				preloadCount++
			}

			document.write("<img id='" + arrayName[index] + "' src='" + cardFolder + image + ".gif'")
			document.write(sclass + "style='position:absolute;")
			document.write("left:" + leftOfCardLocation + "px;")
			document.write("top:" + topOfCardLocation + "px'>")

		}
		else
		{
			index--
		}
	}
}



prefArray = getCookieArray("kpref")
if(prefArray)
{
	deckStyle = document.getElementById('chooseDeck')
	splPref = prefArray[0].split("=")
	deckStyle.value = splPref[1] // deck style preference (value side of the split)
	flipStyle = document.getElementById('numFlip')
	splPref2 = prefArray[1].split("=")
	flipStyle.value = splPref2[1] // number to flip preference (value side of the split)

	splPref3 = prefArray[2].split("=")
	if(splPref3[1] == "true")
		document.getElementById("showDealt").checked = "true"
	splPref4 = prefArray[3].split("=")
	if(splPref4[1] == "true")
		document.getElementById("animOption").checked = "true"
	splPref5 = prefArray[4].split("=")
	if(splPref5[1] == "true")
		document.getElementById("soundOption").checked = "true"

	changeDeck()
	changeNumDealt()
}
else
{
	//set default options
	document.getElementById("numFlip").value = "3"
	document.getElementById("showDealt").checked = "true"
	document.getElementById("animOption").checked = "true"
}

function mouseUpAction()
{
	mouseIsDown = false
	if (event.srcElement.className=="drag" && dragapproved == true)
	{
		dragapproved=false
		acceptDblClick = true

		moveId = moveArray[0]
		//alert(newxPos)
		//is the mouse within the browser window?
		if(newxPos < 0 || newyPos < 0)
		{
			returnToOriginalPile()
		}
		else
		{
			//is the card within the playing area? (regular pile or ace pile)
			if (xCardCenter < (col7Left + cardWidth) && ((xCardCenter > col4Left && newyPos > cellTop) || (xCardCenter > border && newyPos > tableTop)))
			{
				moved = false //card hasn't moved yet
				if(yCardCenter > tableTop)//within table
				{
					st = 1
					en = 8
				}
				else //in ace piles
				{
					st = 8
					en = leftPosArray.length
				}

				//loop to check if mouse is in one of the regular columns
				for(k=st; k < en; k++)
				{
					//check if within the card area and if the card is a valid move
					if (xCardCenter >= leftPosArray[k] && xCardCenter < leftPosArray[k]+cardWidth && validateCard(moveId, column, columnArray[k]))
					{
						snapToPlace(moveArray, column, columnArray[k], leftPosArray[k], false, false)
						moved = true
					}
					if(moved)//get out of for loop if the card has been moved
						return
				}
				if(!moved)
					returnToOriginalPile()
			}
			else
				returnToOriginalPile()
		}
	}

	else if (event.srcElement.className == "flip")
	{
		acceptDblClick = false //should never trigger dblclick event!

		flipArray = new Array()
		flipIndex = document.getElementById('numFlip')
		numToFlip = flipIndex.value
		//find the index in col0 of the card to flip
		pos = findIndex(event.srcElement.id, col0)
		//loop through cards to be flipped
		leftAlign = 0
		count = 0
		for(i=pos; i > pos-numToFlip; i--)
		{
			idNum = col0[i]
			//alert(idNum)
			if(col0[i]) //number exists at that location
			{
				flipMe = document.getElementById(idNum)
				flipMe.style.zIndex = zPos
				zPos++
				//if the checkbox for show dealt is checked, display a hand of cards
				if(document.getElementById('showDealt').checked)
				{
					flipMe.style.left = pileUpLeft + leftAlign*flipSpace
					leftAlign++
				}
				else
					flipMe.style.left = pileUpLeft
				flipMe.style.top = cellTop
				n = flipMe.id
				flipMe.src = cardFolder + n + ".gif"

				if(i == pos-numToFlip+1)
					flipMe.className = 'drag'//top card is moveable
				else
					flipMe.className = 'noDrag'//buried cards aren't movable

				//add card to flip array
				flipArray[count] = idNum
				count++
			}
			else if(col0[i+1])//less that the number of cards to be flipped
			{
				prevFlippedCard = col0[i+1]
				flipMe = document.getElementById(prevFlippedCard)
				flipMe.className = 'drag'
			}
		}
		if(pos > col0.length-1)
			pos = col0.length - 1
		//shove the bottom cards together
		for(buriedCardIndex=0; buriedCardIndex < 4 && col0[pos+buriedCardIndex]; buriedCardIndex++)
		{
			buriedNum = col0[pos+buriedCardIndex]
			buriedCard = document.getElementById(buriedNum)
			buriedCard.style.left = pileUpLeft
			//buriedCard.className = 'drag'
		}

		//set the undo array
		undoArray[0] = flipArray
		undoArray[1] = col0
		undoArray[2] = col0
		document.getElementById('undoButton').className = "activeLink"

	}
	else if (event.srcElement.className == "restack")
	{
		acceptDblClick = true
		//clear undo array(for now)
		undoArray[0] = null

		document.getElementById('undoButton').className = "inactiveLink"

		for(i = 0; i  < col0.length; i++)
		{
			idNum = col0[i]
			pileCard = document.getElementById(idNum)
			pileCard.style.zIndex = zPos
			zPos++

			pileCard.src = cardFolder + "back.gif"
			pileCard.className = 'flip'
			pileCard.style.pixelLeft = pileDownLeft
		}
		//take away some points for restacking if there are cards left to flip
		if(col0.length > 0)
		{
			f = document.getElementById('numFlip')
			numToFlip = f.value
			if(numToFlip == 4)
				{addToScore(-10)}
			else if(numToFlip == 3)
				{addToScore(-20)}
			else if(numToFlip == 2)
				{addToScore(-30)}
			else
				{addToScore(-40)}
		}
	}
}

export function addToScore(numAdd) {
	score = score + numAdd
	sf = document.getElementById('scoreField')
	//score can never be less than -100 because I'm just so nice.
	if(score >= -100)
		{sf.value = score}
	else
		{sf.value = '-100'}
}

function changeNumDealt()
{
	setPrefs()
	if(numMoves > 0)
		addToScore(-50)
	if(document.getElementById('numFlip').value == "1")
	{
		//alert("1 card dealt")
		document.getElementById('dealtspan').style.visibility = "hidden"
	}
	else
		document.getElementById('dealtspan').style.visibility = "visible"
}

export function //uses highScores array and score variable to check if the user got a high score
checkForHighScore() {
	if(score > 0)
	{
		index = -1
		for(i=records.length-1; i >= 0; i--)
		{
			if(score >= records[i])
			{
				index = i
			}
		}
		if(index != -1)
		{
			cn = ""
			playerName = ""
			//'pause' the game
			document.getElementById('chooseDeck').disabled = 'true'
			document.getElementById('numFlip').disabled = 'true'
			document.getElementById('showDealt').disabled = 'true'
			document.getElementById('animOption').disabled = 'true'
			document.getElementById('soundOption').disabled = 'true'
			document.getElementById('undoButton').className = 'inactiveLink'
			undoArray[0] = null

			for(v=1; v < 53; v++)
			{
				dis = document.getElementById(v)
				dis.className = ""
			}


			//Display the div for the user to enter their name
			pb = document.getElementById('highScoreDialogue')
			//get the size of the users window
			winWidth = document.body.clientWidth
			winHeight = document.body.clientHeight

			//move the window to a nice location that depends on the user's window size
			pb.style.left = winWidth/2 - 200
			pb.style.top = winHeight/2 - 100
			pb.style.zIndex = zPos
			pb.style.visibility = "visible"
			inputN = document.getElementById("inputName")
			inputN.focus()
		}
		else//not a high score, refresh the window
		{
			window.location.replace("solitaire.html")
		}
	}
	else
	{
		window.location.replace("solitaire.html")
	}
}

function setPrefs()//set user preferences
{
	prefString = "face=" + document.getElementById('chooseDeck').value
	prefString += "&flip=" + document.getElementById('numFlip').value
	prefString += "&flipShow=" + document.getElementById('showDealt').checked
	prefString += "&animate=" + document.getElementById('animOption').checked
	prefString += "&sound=" + document.getElementById('soundOption').checked
	setCookie("kpref", prefString)
}

var attributes = document.getElementsByTagName('body');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onload = function() {
	loadAction();
}
}
var attributes = document.getElementsByTagName('img');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onclick = function() {
	checkForHighScore();
}
}
document.getElementById('undoButton').onclick = function() {
	undo();
}
document.getElementById('helpButton').onclick = function() {
	open("klondikehelp.html", "win", "location=no, menubar=no, scrollbars=yes, resizable=yes, height=600, width=550");
}
document.getElementById('chooseDeck').onchange = function() {
	changeDeck();
}
document.getElementById('numFlip').onchange = function() {
	changeNumDealt();
}
document.getElementById('showDealt').onclick = function() {
	setPrefs();
}
document.getElementById('animOption').onclick = function() {
	setPrefs();
}
document.getElementById('soundOption').onclick = function() {
	setPrefs();
}
