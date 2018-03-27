"""
ScrabbleGame class
developed by X.Morin
------------------

Structure of the class & vocabulary:
* grid = 15*15 Squares
* remainder = letters in the bag (depends on language at initialization)
* rack = letters to play
* dictionary = set() of all words allowed (depends on language at initialization)
* anchors (definition) = first square, in reading direction, that attach a new word to the existing grid.
* anchorsList = list of anchors

* Square = informations about a square of the grid :
    * Letter (None if void)
    * letter or word multiplier (for score counting)
    * possibleLetters = list of allowed letters (dictionarily)

* Letter = description of a tile
    * face = A..Z + ?
    * value = 0..10 (depends on language at initialization)

* word (rules):
    * contains all letters forming the word (new tiles + existing on grid)
    * must be a complete word (limited by a blanks or grid limits on both sides)
    * must be connected to existing tiles on grid (this is guaranteed by the concept of _anchors_)
    * _UPPERCASE_ letters are either in rack or already on the grid
    * _lowercase_ letters are joker tiles being played

* position:
	*
    
=================== TO DO ============
* send to init all needed informations (dictionnary,  
"""
import os
import os.path
import random

class ScrabbleGame:
    def __init__(self, lettersFile, dictionaryFile, nbLetters):
        self.grid = [[self.Square() for _ in range(15)] for _ in range(15)]          # grid of the game, grid of squares
        self.remainder = []             # letters in bag
        self.rack = []                  # letters to play
        self.anchorsList = set()        # list of anchors (at start : center only)
        self.dictionary = set()         # allowed words
        self.history = []               # list of turns
        self.totalScore = 0             # total score of game
        self.tempTurnAction = []        # all Rack action saved
        self.kuplets = [set() for _ in range(15)]
        self.testedWords = []           # all testedWords during backtracking
        self.anchorsList.add((7,7))     # at start : center only
        self.nbLetters = nbLetters
        
        self._SetGrid()
        self._SetLetters(lettersFile)
        self._SetDictionary(dictionaryFile)
    
    def _SetGrid(self):
        """Sets the triple/double word/letter multipliers in the grid"""
        listTW = "A1,A8,A15,H1,H15,O1,O8,O15".split(',')
        for pos in listTW:
            i, j = _coord(pos)[:2]
            self.grid[i][j].wM = 3
        listDW = "B2,B14,C3,C13,D4,D12,E5,E11,H8,N2,N14,M3,M13,L4,L12,K5,K11".split(',')
        for pos in listDW:
            i, j = _coord(pos)[:2]
            self.grid[i][j].wM = 2
        listTL = "B6,B10,F2,F6,F10,F14,J2,J6,J10,J14,N6,N10".split(',')
        for pos in listTL:
            i, j = _coord(pos)[:2]
            self.grid[i][j].lM = 3
        listDL = "A4,A12,C7,C9,D1,D8,D15,G3,G7,G9,G13,H4,H12,I3,I7,I9,I13,L1,L8,L15,M7,M9,O4,O12".split(',')
        for pos in listDL:
            i, j = _coord(pos)[:2]
            self.grid[i][j].lM = 2
    
    def _SetLetters(self, fileName):
        """Sets the letters in the remainder"""
        Lines = _readLines(fileName)
        for line in Lines:
            t = line.split(' ')
            for _ in range(int(t[2])):
                self.remainder.append(self.Letter(t[0], int(t[1])))
        
    def _SetDictionary(self, fileName):
        """Sets the dictionary with file contents."""
        Lines = _readLines(fileName)
        self.dictionnary = set(Lines)
        for l in Lines:
            self.dictionary.add(l)
        
        datFile = fileName.replace(".dic",".dat")
        if os.path.isfile(datFile):
            Lines = _readLines(datFile)
            for i, line in enumerate(Lines):
                t = line.split(' ')
                self.kuplets[i]=set(t)
        else:
            for word in self.dictionary:
                for k in range(15):
                    pos = 0
                    while pos+k+1<=len(word):
                        s = word[pos:pos+k+1]
                        self.kuplets[k].add(s)
                        pos += 1
            file = open(datFile, 'w')
            for kuplet in self.kuplets:
                line = ' '.join(kuplet)
                file.write(line + '\n')
            file.close()

               
    def PickLetters(self, letters):
        """Picks letters from remainder to rack.
        Returns tuple (True, pickedLetters) on success
        or (False, ErrMsg) on fail."""
        pickedLetters = ""
        self.tempTurnAction.append(letters)  #saves the rack Action
        if len(letters)>0 and letters[0] == '/':
            self._RejectRack()
            letters = letters[1:]
            pickedLetters += '/'

        if len(self.rack)+len(letters)>self.nbLetters:
            s = "{0} is too big, rack is limited to {1} letters.".format(letters, self.nbLetters)
            #print(s)
            return (False, s)
        
        tempRack = []
        test = True
        if len(letters) == 0:
            # Random picking
            while len(self.rack)+len(tempRack)<self.nbLetters and len(self.remainder)>0:
                i = random.randrange(len(self.remainder))
                pickedLetters += self.remainder[i].face               
                tempRack.append(self.remainder.pop(i))
        else:
            # Normal picking
            for l in letters:           
                i = 0
                while i<len(self.remainder) and l != self.remainder[i].face:
                    i += 1
                
                if i == len(self.remainder):
                    s = "'{0}' n'existe pas dans le reliquat !".format(l)
                    test = False
                    break
                else:
                    pickedLetters += self.remainder[i].face
                    tempRack.append(self.remainder.pop(i))
            
        if test:
            # on success:
            for letter in tempRack:
                self.rack.append(letter)
            return (True, pickedLetters)
        else:
            # on problem : action cancelled.
            for letter in tempRack:
                self.remainder.append(letter)
            return (False, s)
    
    def _RejectRack(self):
        """Rejects all letters in rack to remainder."""
        for letter in self.rack:
            self.remainder.append(letter)
        
        self.rack = []
              
    def PlaceWord(self, word, position):
        """Complete action for placing a word on the grid.
        - Tests if this turn is valid
        - Counts the score of this turn
        - modify anchorsList
        - Returns a tuple (score; word-position) (if zero or negative: not valid turn)."""
        score, playedTiles = self.TestWord(word, position)[:2]
        s = position + ':' + word
        if score < 0:
            s = "{0} at position {1} is illegal.".format(word, position)
            #print(s)
        else:
            # saving the turn being played
            historyLine = ' '.join(self.tempTurnAction)
            historyLine = ':'.join([historyLine, word, position])
            self.history.append(historyLine)
            self.tempTurnAction = []

            # updates rack + square informations + updates anchorsList
            for i, j in playedTiles.keys():
                l = playedTiles[(i,j)]
                if l == l.upper():
                    c = l
                else:
                    c = '?'
                
                k = 0
                while k<len(self.rack) and c != self.rack[k].face:
                    k += 1
                
                self.grid[i][j].letter = self.rack.pop(k)
                self.grid[i][j].letter.face = l.upper()
                self.grid[i][j].lM = 1
                self.grid[i][j].wM = 1
                if (i,j) in self.anchorsList:
                    self.anchorsList.remove((i,j))
                tempAnchors = [(i-1,j), (i+1,j), (i, j-1), (i, j+1)]
                for i2, j2 in tempAnchors:
                    if 0<=i2<15 and 0<=j2<15 and self.grid[i2][j2].letter is None and (i2,j2) not in playedTiles.keys():
                        self.anchorsList.add((i2,j2))
            
            # updates anchors possibleLetters
            for anchor in self.anchorsList:
                self.calculatePossibleLetters(anchor)
            
        
            self.totalScore += score
            #print(position, word, score, self.totalScore)
    
        return (score, s)    
                 
    def TestWord(self, word, position):
        """Tests if word at position is acceptable.
        - rack-ly
        - position-ly (anchors)
        - dictionarily.
        Returns a tuple containing (score, playedTiles, playedWords).
        score < 0 if illegal"""
        
        if len(word)<2:
            return (-1, None, None)
                
        # playedTiles + rack check + position check
        playedTiles = self._playedTiles(word, position)
        if len(playedTiles) == 0:
            # rack or position not acceptable
            return (-1, None, None)
        
        #print(playedTiles)

        anchorFound = False
        for position in playedTiles.keys():
            if position in self.anchorsList:
                anchorFound = True
                break
        
        if not anchorFound:
            #print("{0} is not anchored to the grid.".format(word))
            return (-1, playedTiles, None)
 
        # dictionary check
        playedWords = self._playedWords(playedTiles)
        #print(playedWords)
        for w in playedWords.values():
            if w not in self.dictionary:
                #print("{0} does not exist in dictionary.".format(w))  
                return (-1, playedTiles, playedWords) 
        
        # Score calculation
        score = 0
        for tilesRange in playedWords.keys():
            score += self._countTilesRange(playedTiles, tilesRange)
        
        if len(playedTiles) == self.nbLetters:   # bonus for Scrabble
            score += 50
        
        return (score, playedTiles, playedWords)

    def FindBestWord(self):
        """-- Backtracking -- Find the best word to play."""
        rack = self._rack()
        t = []
        #print("Best words to play with [{0}]:".format(rack))
        self.testedWords = []
        for anchor in self.anchorsList:
            self._leftBacktracking(anchor, 0, "", rack, False)
            if len(self.history)>0:
                self._leftBacktracking(anchor, 1, "", rack, False)
        self.testedWords = sorted(self.testedWords, key=lambda x: -x[2])
        
        if len(self.testedWords)>0:
            top = self.testedWords[0][2]
            nbMin = min(100, len(self.testedWords))
            k = 0
            while k < len(self.testedWords) and (k<nbMin or self.testedWords[k][2] == top):
                t.append(self.testedWords[k])
                #print(self.testedWords[k])
                k += 1
        else:
            #print("No word is possible.")
            pass
        return t
                                
    def _leftBacktracking(self, position, direction, word, rack, anchored):
        """Left backtracking to find best word."""
        #print("L : {0} : {1} : {2} : {3} : {4}".format(position, direction, word, rack, anchored))
        #print(_coordInvert(position, direction), word, rack)
        letters = "*"
        i, j = position
        if direction == 0:
            di, dj = 0, 1
        else:
            di, dj = 1, 0
        # Right backtracking
        if anchored and (i<0 or j<0 or self.grid[i][j].letter is None):
            self._rightBacktracking((i+di,j+dj), direction, word, rack)
        
        # Left backtracking
        wLength = len(word)
        position2 = (i-di, j-dj)
        if i<0 or j<0:
            # out of grid
            return
        elif self.grid[i][j].letter is not None:
            # not empty square
            word2 = self.grid[i][j].letter.face + word
            if word2.upper() in self.kuplets[wLength]:
                self._leftBacktracking(position2, direction, word2, rack, anchored)
            return
        elif position in self.anchorsList:
            # empty square + anchor
            if anchored:
                return
            else:
                anchored = True
                letters = self.grid[i][j].possibleLetters
        #else:
            # empty square not in anchorsList
            # normal behavior
            
        for c in self._developRack(rack, letters):
            word2 = c + word
            if word2.upper() in self.kuplets[wLength]:
                #print(word2)
                if c != c.upper():
                    rack2 = rack.replace('?', '', 1)
                else:
                    rack2 = rack.replace(c, '', 1)
                
                self._leftBacktracking(position2, direction, word2, rack2, anchored)
        
        return
    
    def _rightBacktracking(self, position, direction, word, rack):
        """Right backtracking"""
        #print(" R : {0} : {1} : {2} : {3}".format(position, direction, word, rack))
        letters = "*"
        i, j = position
        if direction == 0:
            di, dj = 0, 1
        else:
            di, dj = 1, 0
            
        wLength = len(word)
        i, j = i+di*wLength, j+dj*wLength
        
        position2 = _coordInvert(position, direction)
        
        # Test word
        if 15<=i or 15<=j or self.grid[i][j].letter is None:
            test = self.TestWord(word, position2)
            if test[0]>0:
                self.testedWords.append([word, position2, test[0]])            
        
        # Right backtracking
        wLength = len(word)
        if 15<=i or 15<=j:
            # out of grid
            return
        elif self.grid[i][j].letter is not None:
            # not empty square
            word2 = word + self.grid[i][j].letter.face
            if word2.upper() in self.kuplets[wLength]:
                self._rightBacktracking(position, direction, word2, rack)
            return
        elif position in self.anchorsList:
            # empty square + anchor
            letters = self.grid[i][j].possibleLetters
        #else:
            # empty square not in anchorsList
            # normal behavior
        
        for c in self._developRack(rack, letters):
            word2 = word + c
            if word2.upper() in self.kuplets[wLength]:
                if c != c.upper():
                    rack2 = rack.replace('?', '', 1)
                else:
                    rack2 = rack.replace(c, '', 1)
                
                self._rightBacktracking(position, direction, word2, rack2)
        
        return
           
    def _playedTiles(self, word, position):
        """"Returns the dictionary of {(i,j):letter} being played."""
        playedTiles = {}
        copyRack = self.rack[:]
        
        iS, jS, direction = _coord(position)
        if direction == 0:
            di, dj = 0, 1
        else:
            di, dj = 1, 0
        
        nbLetters = len(word)
        iE = iS + (nbLetters-1)*di
        jE = jS + (nbLetters-1)*dj
        
        # free squares enclosing word ?
        if (0<=iS-di<15 and 0<=jS-dj<15) and (self.grid[iS-di][jS-dj].letter is not None):
            return {}
        elif (0<=iE+di<15 and 0<=jE+dj<15) and (self.grid[iE+di][jE+dj].letter is not None):
            return {}
        
        # out of grid error !
        if not (0<=iS<15 and 0<=jS<15 and 0<=iE<15 and 0<=jE<15):
            return {}

        i, j = iS, jS
        for l in word:
            if self.grid[i][j].letter is None:
                # empty square : look for letter in rack
                if l == l.upper():
                    c = l
                else:
                    c = '?'
                
                k = 0
                while k<len(copyRack) and c != copyRack[k].face:
                    k += 1
            
                if k == len(copyRack):
                    #print("'{0}' does not exist in rack !".format(l))
                    return {}
                else:
                    copyRack.pop(k)
                    playedTiles[(i,j)] = l
                
            elif l != self.grid[i][j].letter.face:
                # busy square
                #print("{0} at position {1} is in conflict with the grid.".format(word, position))
                return {}
            
            i += di
            j += dj
        
        return playedTiles
         
    def _playedWords(self, playedTiles):
        """Returns the list of the words being played."""
        playedWords = {}
        directions = [(1,0),(0,1)]
        for di, dj in directions:
            for i, j in playedTiles.keys():
                #print(i,j, playedTiles[(i,j)])
                # look for word start
                iS, jS = i, j
                while iS>=0 and jS>=0 and (self.grid[iS][jS].letter is not None or (iS,jS) in playedTiles.keys()):
                    iS -= di
                    jS -= dj
                iS += di
                jS += dj
                # look for word end
                iE, jE = i, jS
                while iE<15 and jE<15 and (self.grid[iE][jE].letter is not None or (iE,jE) in playedTiles.keys()):
                    iE += di
                    jE += dj
                iE -= di
                jE -= dj
                
                wordLength = max(iE-iS, jE-jS) + 1
                wordKey = (iS,jS,iE,jE)
                if wordLength > 1 and wordKey not in playedWords.keys():
                    word = ""
                    for k in range(wordLength):
                        iL = iS + k*di
                        jL = jS + k*dj
                        if (iL, jL) in playedTiles.keys():
                            word += playedTiles[(iL,jL)]
                        else:
                            word += self.grid[iL][jL].letter.face
                    playedWords[wordKey] = word.upper()
        return playedWords
                              
    def _countTilesRange(self, playedTiles, tilesRange):
        """Counts the score of the tilesRange being played.
        Does not check anything."""
        #print(tilesRange)
        iS, jS, iE, jE = tilesRange
        if iE-iS == 0:
            di, dj = 0, 1
        else:
            di, dj = 1, 0
        
        i, j = iS, jS
        wordMultiplier = 1
        score = 0
        while i<=iE and j<=jE:
            if self.grid[i][j].letter is not None:
                letterScore = self.grid[i][j].letter.value
            else:
                l = playedTiles[(i,j)]
                k = 0
                while k<len(self.rack) and l != self.rack[k].face:
                    k += 1
                if k == len(self.rack):
                    letterScore = 0
                else:
                    letterScore = self.rack[k].value
                
                wordMultiplier *= self.grid[i][j].wM
                letterScore *= self.grid[i][j].lM
                #print(l, self.grid[i][j].wM, self.grid[i][j].lM)
            score += letterScore
            i += di
            j += dj
        score *= wordMultiplier
        return score
    
    def _developRack(self, rack, allowedLetters = "*"):
        """Develop rack considering allowedLetters.
        (str)rack may contain ?A..Z
        (str)allowedLetters : A..Z or * for all
        Returns a set() of allowed letters a..zA..Z"""
        result = set()
        if allowedLetters == "*":
            allowedLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        
        for l in rack:
            if l == '?':
                for c in allowedLetters.lower():
                    result.add(c)
            else:
                if l in allowedLetters:
                    result.add(l)
        return result
                
    def _rack(self):
        return ''.join(sorted([letter.face for letter in self.rack]))

    def _remainder(self):
        return ''.join(sorted([letter.face for letter in self.remainder]))
    
    def __repr__(self):
        s = "     1  2  3  4  5  6  7  8  9  10 11 12 13 14 15\n"
        s += "    ---------------------------------------------\n"
        for i, line in enumerate(self.grid):
            s2 = chr(65+i) + ' : '
            for square in line:
                if square.letter is None:
                    c = '_'
                else:
                    c = square.letter.face
                s2 += " {0} ".format(c)
            s += s2 + '\n'
        s += "\n[{0:^9}]\n".format(self._rack())
        s += "="*11
        s += "\n({0})".format(self._remainder())
        
        return s 
    
    def calculatePossibleLetters(self, position):
        """Calculates possible letters for a position.
        * Looks for neighboring squares
        * Try all possible kuplets
        * retains compatible letters."""
        i, j = position
        
        directions = [(0,1),(1,0)]
        list1 = self.grid[i][j].possibleLetters
        if list1 == "*":
            list1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        for dij in directions:
            sL = ""
            k = 1
            while 0<=i-k*dij[0] and 0<=j-k*dij[1] and self.grid[i-k*dij[0]][j-k*dij[1]].letter is not None:
                sL = self.grid[i-k*dij[0]][j-k*dij[1]].letter.face + sL
                k += 1
            
            sR = ""
            k = 1
            while i+k*dij[0]<15 and j+k*dij[1]<15 and self.grid[i+k*dij[0]][j+k*dij[1]].letter is not None:
                sR = sR + self.grid[i+k*dij[0]][j+k*dij[1]].letter.face
                k += 1
            
            list2 = ""
            wLength = len(sL+sR)
            
            for c in list1:
                if sL+c+sR in self.kuplets[wLength]:
                    list2 += c
            list1 = list2

        self.grid[i][j].possibleLetters = list1
    
    class Square:
        """class representing a place on the grid"""
        def __init__(self):
            self.letter = None          # letter played. '' if void
            self.lM = 1                 # letter multiplier (1,2,3)
            self.wM = 1                 # word multiplier (1,2,3)
            self.possibleLetters = "*"  # playable letters (*=all letters)
                
    
    class Letter:
        """class representing a letter with its value"""
        def __init__(self, face, value):
            """face = letter in "A..Z?"
            value = integer"""
            self.face = face             
            self.value = value
        def __str__(self):
            return "({0},{1})".format(self.face, self.value)
        def __repr__(self):
            return "({0},{1})".format(self.face, self.value)
        
 
def _coord(position):
    """Returns position (i,j) and direction (0:Horizontal, 1:Vertical)"""
    lines = "ABCDEFGHIJKLMNO"
    if position[0] in lines:
        # Horizontal direction
        X = ord(position[0])-65
        Y = eval(position[1:])-1
        direction = 0
    elif position[-1] in lines:
        # Vertical direction
        X = ord(position[-1])-65
        Y = eval(position[0:-1])-1
        direction = 1
    return (X,Y, direction)      

def _coordInvert(position, direction):
    """Returns position An or nA"""
    lines = "ABCDEFGHIJKLMNO"
    i,j = position
    if direction == 0:
        # Horizontal
        return lines[i]+(str)(j+1)
    else:
        # Vertical
        return (str)(j+1)+lines[i]


def _readLines(fileName):
    """Returns a table containing the lines in fileName, without '\n' at ending"""
    file=open(fileName,'r')
    Lines = file.readlines()
    file.close()
    result = []
    for line in Lines:
        result.append(line.replace('\n', ''))
    return result
