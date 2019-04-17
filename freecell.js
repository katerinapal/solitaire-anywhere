
//distinguish the game
klondike = false
freecell = true


numFastestTimes = 5
timeArray = getCookieArray("ftime")
if(!timeArray)
{
	setCookie("ftime", "none=00:00")
}

players = new Array(numFastestTimes)
records = new Array(numFastestTimes)

for(i=0; i < records.length; i++)
{
	//document.write(i + " -- " + highScoresArray[i] + "<br>")
	if(timeArray[i])//high score exists
	{
		s = timeArray[i].split("=")
		players[i] = s[0]
		records[i] = s[1]
	}
	else
	{
		players[i] = "none"
		records[i] = "00:00"
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

dragapproved=false
paused = false
zPos = 60 // top layer position
score = 0
numMoves = 0
numMovable = 5 //initial amount of cards that can be moved
numColumnsEmpty = 0 //initial amount of empty columns
mouseIsDown = false
undoArray = new Array()

//event handlers
document.onmousedown = drag
document.onmouseup = mouseUpAction
document.ondblclick = dblclickAction
document.onkeydown = keyDownAction
document.onkeypress = keyDownAction
document.onkeyup = keyUpAction

cardFolder = document.getElementById('chooseDeck').value + "/"
cardWidth = 80
cardHeight = 120

//playing field dimensions
border = 190
cellGutter = 1
gutter = 10
overlap = 20
cellTop = 40
tableTop = cellTop + 160
col1Left = border
col2Left = border + cardWidth + gutter
col3Left = border + 2*cardWidth + 2*gutter
col4Left = border + 3*cardWidth + 3*gutter
col5Left = border + 4*cardWidth + 4*gutter
col6Left = border + 5*cardWidth + 5*gutter
col7Left = border + 6*cardWidth + 6*gutter
col8Left = border + 7*cardWidth + 7*gutter
ace1Left = col8Left - 3*cardWidth - 3*cellGutter
ace2Left = col8Left - 2*cardWidth - 2*cellGutter
ace3Left = col8Left - cardWidth - cellGutter
ace4Left = col8Left
cell1Left = border
cell2Left = border + cardWidth + cellGutter
cell3Left = border + 2*cardWidth + 2*cellGutter
cell4Left = border + 3*cardWidth + 3*cellGutter

//draw static images
staticImageArray = new Array()
for(i = 0; i < 4; i++)
{
	leftEdge = border + i*cardWidth + i*cellGutter
	document.write("<img id='cellImage" + i + "' src='" + cardFolder + "ace.gif'")
	document.write("class ='' style='position:absolute; color: #ff0606; filter:Alpha(opacity=50);")
	document.write("left:" + leftEdge + "px;")
	document.write("top:" + cellTop + "px'>")
	staticImageArray[i] = "cellImage" + i
}

for(i = 4; i < 8; i++)
{
	leftEdge = col8Left - (i-4)*cardWidth - (i-4)*cellGutter
	document.write("<img id='cellImage" + i + "' src='" + cardFolder + "ace.gif'")
	document.write("class ='' style='position:absolute; color: #ff0606; filter:Alpha(opacity=50);")
	document.write("left:" + leftEdge + "px;")
	document.write("top:" + cellTop + "px'>")
	staticImageArray[i] = "cellImage" + i
}

//initialize the playing field
deck = new Array() //total of 52 cards
numCardsInDeck = 0

col0 = new Array()//fake
col1 = new Array()
fill(col1, 7, 1)
col2 = new Array()
fill(col2, 7, 2)
col3 = new Array()
fill(col3, 7, 3)
col4 = new Array()
fill(col4, 7, 4)
col5 = new Array()
fill(col5, 6, 5)
col6 = new Array()
fill(col6, 6, 6)
col7 = new Array()
fill(col7, 6, 7)
col8 = new Array()
fill(col8, 6, 8)
ace1 = new Array()
ace1Suit = ""
ace2 = new Array()
ace2Suit = ""
ace3 = new Array()
ace3Suit = ""
ace4 = new Array()
ace4Suit = ""
cell1 = new Array()
cell2 = new Array()
cell3 = new Array()
cell4 = new Array()
//array of columns
columnArray = new Array(col0, col1, col2, col3, col4, col5, col6, col7, col8, ace1, ace2, ace3, ace4, cell1, cell2, cell3, cell4)
//positions for the left of each column corresponding to the column array
leftPosArray = new Array(border, col1Left, col2Left, col3Left, col4Left, col5Left, col6Left, col7Left, col8Left, ace1Left, ace2Left, ace3Left, ace4Left, cell1Left, cell2Left, cell3Left, cell4Left)

//initialize each card's class
assignMovableClass()

//get user preferences
prefArray = getCookieArray("fpref")
if(prefArray)
{
	deckStyle = document.getElementById('chooseDeck')
	splPref = prefArray[0].split("=")
	deckStyle.value = splPref[1] // deck style preference (value side of the split)
	splPref2 = prefArray[1].split("=")
	if(splPref2[1] == "true")
		document.getElementById('moveToAce').checked = "true"
	splPref3 = prefArray[2].split("=")
	if(splPref3[1] == "true")
		document.getElementById('animOption').checked = "true"
	splPref4 = prefArray[3].split("=")
	if(splPref4[1] == "true")
		document.getElementById('soundOption').checked = "true"

	changeDeck()
}
else
{
	//set default options
	document.getElementById("moveToAce").checked = "true"
	document.getElementById("animOption").checked = "true"
}

function loadAction()
{
	document.getElementById('timerField').value = '00:00'
	//start the timer
	timer = 0
	start = null
	stopTimer()
	updateTime()
}

function updateTime()
{
	if(!start)
	{
		start = new Date()
		startTime = start.getTime()
	}
	current = new Date()
	difference = current.getTime() - startTime
	timeElapsed = new Date()
	timeElapsed.setTime(difference)
	eTime = timeElapsed.getTime()
	//alert(timeElapsed.getMinutes())

	mins = timeElapsed.getMinutes()
	if(mins < 10)
		mins = "0" + mins
	secs = timeElapsed.getSeconds()
		if(secs < 10)
		secs = "0" + secs

	//check if over an hour
	//if(mins > 1 && secs > 2)
	//{
		//alert("hello")
		//stopTime()
		//timerField.value = "over 1 hour"
		//alert("end time")
	//}
	//else
	//{
		timerField.value = "" + mins + ":" + secs
		timer = setTimeout("updateTime()", 1000)
	//}
}

function stopTimer()
{
	clearTimeout(timer)
	timer = 0
	start = null
}

function fill(arrayName, numberOfCards, columnNumber)
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

			topOfCardLocation = (index * overlap) + tableTop
			leftOfCardLocation = border + (columnNumber-1)*cardWidth + (columnNumber-1)*gutter

			document.write("<img id='" + arrayName[index] + "' src='" + cardFolder + num + ".gif'")
			document.write("style='position:absolute;")
			document.write("left:" + leftOfCardLocation + "px;")
			document.write("top:" + topOfCardLocation + "px'>")
		}
		else
		{
			index--
		}
	}
}

function assignMovableClass()
{
	for(i = 1; i < 9; i++)
	{
		col = columnArray[i]
		//check if column has more cards than the amount movable
		if(col.length > 0)
		{
			//top card is always movable
			document.getElementById(col[col.length - 1]).className = "drag"

			//check if cards under top card can be moved
			if(col.length > 1)
			{
				continueCheck = true
				for(j=col.length - 2; j >= 0; j--)
				{
					//check for super moves
					if(findIndex(col[j], col) > col.length-numMovable-1)
					{
						checkId = col[j]
						nextId = col[j+1]

						checkNum = checkId%13
						nextNum = nextId%13

						checkSuitColor = checkId < 27? "black":"red"
						nextSuitColor = nextId < 27? "black":"red"

						if(!continueCheck)
							document.getElementById(col[j]).className = "noDrag"
						else if((checkNum-1 == nextNum || (checkNum == 0 && nextNum == 12)) && !(checkNum == 1 && nextNum == 0) && checkSuitColor != nextSuitColor)
							document.getElementById(col[j]).className = "drag"
						else
						{
							document.getElementById(col[j]).className = "noDrag"
							continueCheck = false
						}
					}
					else
						document.getElementById(col[j]).className = "noDrag"
				}
			}
		}
	}

	//also automatically move cards to the ace pile if the auto move box is checked
	if(document.getElementById("moveToAce").checked)
	{
		//alert("hello")
		moveToAcePiles(false)
	}
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
			//is the card within the playing area? (regular pile or ace piles)
			if(xCardCenter < (col8Left + cardWidth) && xCardCenter > border)
			{
				//within ace/cell area
				if(newyPos < tableTop)
				{
					begin = 9
					end = leftPosArray.length
				}
				//within table
				else
				{
					begin = 1
					end = 9
				}
				moved = false //card hasn't moved yet
				//loop to check if mouse is in one of the columns
				for(k=begin; k < end; k++)
				{
					//check if within the card area and if the card is a valid move
					if (xCardCenter >= leftPosArray[k] && xCardCenter < leftPosArray[k]+cardWidth && validateCard(moveId, column, columnArray[k]))
					{
						//alert("ok to move")
						snapToPlace(moveArray, column, columnArray[k], leftPosArray[k], false, false)
						assignMovableClass()
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
}

function checkForFastestTime() //uses fastTimes array and timer to check if the user got a fast time
{
	stopTimer()
	//use mins and secs
	index = -1
	for(i=records.length-1; i >= 0; i--)
	{
		//break up fast time into minutes and seconds
		ft = records[i]
		colon = ft.indexOf(":")
		fmin = ft.substring(0, colon)
		fsec = ft.substring(colon+1, ft.length)
		if(fmin == 0 && fsec == 0 || mins < fmin || (mins == fmin && secs <= fsec))
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
		document.getElementById('moveToAce').disabled = 'true'
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

		//move the window to a nice location that depends on the user's
		//window size because I like that Mac style ;)
		pb.style.left = winWidth/2 - 200
		pb.style.top = winHeight/2 - 100
		pb.style.zIndex = ++zPos
		pb.style.visibility = "visible"
		inputN = document.getElementById("inputName")
		inputN.focus()
	}
	else//not a high score, refresh the window
	{
		window.location.replace("freecell.html")
	}
}

function setPrefs()//set user preferences
{
	prefString = "face=" + document.getElementById('chooseDeck').value
	prefString += "&auto=" + document.getElementById('moveToAce').checked
	prefString += "&animate=" + document.getElementById('animOption').checked
	prefString += "&sound=" + document.getElementById('soundOption').checked
	//alert(prefString)
	setCookie("fpref", prefString)
}

function pause()
{
	clearTimeout(timer)
	timer = 0

	//cancel the undo
	document.getElementById('undoButton').className = 'inactiveLink'
	undoArray[0] = null

	document.getElementById('pauseButton').className = 'inactiveLink'

	for(i = 0; i < deck.length; i++)
	{
		document.getElementById(deck[i]).style.visibility = "hidden"
	}
	pauseBar = document.getElementById("pauseDiv")

	//get the size of the users window
	winWidth = document.body.clientWidth
	winHeight = document.body.clientHeight
	pauseBar.style.left = winWidth/2 - 150
	pauseBar.style.top = winHeight/2 - 100
	pauseBar.style.zIndex = zPos
	zPos++
	pauseBar.style.visibility = "visible"
	paused = true
}

function unPause()
{
	now = new Date()
	startTime = now.getTime() - eTime

	for(i = 0; i < deck.length; i++)
	{
		document.getElementById(deck[i]).style.visibility = "visible"
	}
	timer = setTimeout("updateTime()", 1000)
	document.getElementById("pauseDiv").style.visibility = "hidden"
	document.getElementById('pauseButton').className = 'activeLink'
	paused = false
}
var attributes = document.getElementsByTagName('body');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onload = function() {
	loadAction();
}
}
document.getElementById('play').onclick = function() {
	unPause();
}
var attributes = document.getElementsByTagName('img');
for(var i = 0; i < attributes.length; i++) {
attributes[i].onclick = function() {
	location.replace("freecell.html");
}
}
document.getElementById('undoButton').onclick = function() {
	undo();
}
document.getElementById('pauseButton').onclick = function() {
	pause();
}
document.getElementById('helpButton').onclick = function() {
	open("freecellhelp.html", "win", "location=no, menubar=no, scrollbars=yes, resizable=yes, height=600, width=550");
}
document.getElementById('chooseDeck').onchange = function() {
	changeDeck();
}
document.getElementById('moveToAce').onclick = function() {
	setPrefs();
}
document.getElementById('animOption').onclick = function() {
	setPrefs();
}
document.getElementById('soundOption').onclick = function() {
	setPrefs();
}
