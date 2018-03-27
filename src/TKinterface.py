import tkinter as tk
import tkinter.messagebox as msgbox
import tkinter.filedialog as filebox
from tkSimpleDialog import Dialog

from ScrabbleGame import ScrabbleGame, _readLines
from math import cos, sin, pi

import platform
import os

#print(tk.TclVersion, tk.TkVersion)


style = {}
print(platform.system())
if platform.system() == "Windows":
    font = "Monaco"
    style["coordinates"] = (font, -11)
    style["msgbox"] = (font, -11)
    style["letter"] = (font, -15, "bold")
    style["letter2"] = (font, -8)
    style["remainder"] = (font, -10)
    style["joker"] = ("Comic Sans Ms", -18, "bold")
    
    keyOPT = "Control"
    
else:
    font = "Monaco"
    style["coordinates"] = (font, 11)
    style["msgbox"] = (font, 11)
    style["letter"] = (font, 15)
    style["letter2"] = (font, 8)
    style["remainder"] = (font, 10)
    style["joker"] = ("Comic Sans Ms", -18, "bold")
    
    keyOPT = "Command"


style["bg"] = "#93AAAA"

# ShortCuts
SCNEW = "<{}-n>".format(keyOPT)
SCSAVE = "<{}-s>".format(keyOPT)
SCSAVEAS = "<{}-S>".format(keyOPT)
SCOPEN = "<{}-o>".format(keyOPT)
SCQUIT = "<{}-q>".format(keyOPT)

SCPICK = "<{}-t>".format(keyOPT)
SCPICK2 = "<{}-T>".format(keyOPT)
SCFIND = "<{}-f>".format(keyOPT)
SCPLAY = "<{}-p>".format(keyOPT)
    



class Application(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)
        self.lift()
        self.title("Scrabble Solver -- X. Morin -- 01/2018")
        self.resizable(False, False)
        p = tk.PanedWindow(self, orient=tk.HORIZONTAL, bd=0, bg=style["bg"], sashwidth=0)
        p.pack()
        self.canvas = self.LeftRegion(p)
        self.rightRegion = self.RightRegion(p)
        p.add(self.canvas)
        p.add(self.rightRegion)
        p.add(tk.Canvas(width=7, bg=style["bg"], bd=0, borderwidth=0, highlightthickness=0))
        self.config(menu=self.MenuBar(self))
        
        self.game = None
        self.fileName = None
        self.fileHistory = ""
        
        self.readConfig()
        
        self.newGame()
        
        # Shortcuts
        self.bind(SCNEW, self.newGame)
        self.bind(SCSAVE, self.saveGame)
        self.bind(SCSAVEAS, self.saveAs)
        self.bind(SCOPEN, self.loadGame)
        self.bind(SCQUIT, self.quitApp)
        
        self.bind(SCPICK, self.pickLettersBox)
        self.bind(SCPICK2, self.pickLetters2)
        self.bind(SCFIND, self.findSolution)
        self.bind(SCPLAY, self.playWordBox)
        
    
    def readConfig(self, fileName = "default.config"):
        """Load configuration from fileName"""
        Lines = _readLines(fileName)
        return (Lines[0], Lines[1], int(Lines[2]))
    
    def saveConfig(self):
        """Writes in default.config the current configuration"""
        file = open("default.config", "w")
        file.write(self.lettersFile + '\n')
        file.write(self.dictionaryFile + '\n')
        file.write(str(self.nbLetters))
        file.close()
    
    def setConfig(self, lettersFile, dictionaryFile, nbLetters):
        """Set the configuration"""
        self.lettersFile = lettersFile
        self.dictionaryFile = dictionaryFile
        self.nbLetters = int(nbLetters) # just in case
        
    def quitApp(self, event = None):
        print("quitSC")
        self.quit()
        self.destroy()
    
    def newGame(self, event = None, configuration = None):
        test = True
        if self.game is not None and len(self.fileHistory)>0:
            test = msgbox.askyesno("La sauvegarde n'est pas automatique",
                                   "Êtes-vous sûr de bien vouloir quitter la partie en cours ?",
                                   icon=msgbox.WARNING)
        
        if configuration is None:
                configuration = self.readConfig() 
        
        self.lettersFile = configuration[0]
        self.dictionaryFile = configuration[1]
        self.nbLetters = configuration[2]
        
        if test:
            self.game = ScrabbleGame(self.lettersFile, self.dictionaryFile, self.nbLetters)
            self.canvas.game = self.game
            self.canvas.Refresh()
            self.rightRegion.clean()
            self.fileHistory = ""
    
    def loadGame(self, event = None):
        """Loads a game in txt file.
        Format is : rackActions, wordPlayed, position."""
        self.fileName = filebox.askopenfilename(title = "Ouvrir une partie...", initialdir=self._gamesDir(), filetypes=[("SCR", "*.scr")])
        if self.fileName != '':
            self.newGame(configuration=self.readConfig(self.fileName))
            Lines = _readLines(self.fileName)[3:]
            for line in Lines:
                if line == "":
                    return
                t = line.split(':')
                t2 = t[0].split(' ')
                for letters in t2:
                    if letters != '':
                        self.pickLetters(letters)
                if len(t)>1:
                    self.playWord(t[-2],t[-1])
        else:
            self.fileName = None

    def saveGame(self, event = None):
        """Dialog box and action to save game."""
        if self.fileName is None:
            s = filebox.asksaveasfilename(initialdir=self._gamesDir(),
                                          defaultextension = ".scr",
                                          filetypes=[("SCR", "*.scr")]
                                          )
            self.fileName = s
        if self.fileName != '':
            file=open(self.fileName, 'w')
            file.write("{0}\n{1}\n{2}\n".format(self.lettersFile,
                                                self.dictionaryFile,
                                                self.nbLetters
                                                ))
            file.write(self.fileHistory + '\n')
            file.close()
        else:
            self.fileName = None
    
    def saveAs(self, event = None):
        self.fileName = None
        self.saveGame()
        

    def _gamesDir(self):
        """Returns the games directory : ../games from here."""
        cwdir = os.getcwd()
        p = os.path.split(cwdir)
        return os.path.join(p[0], "games")
            
    def _dictionariesDir(self):
        """Returns the dictionaries directory : ../dictionaries from here."""
        cwdir = os.getcwd()
        p = os.path.split(cwdir)
        return os.path.join(p[0], "dictionaries")

    def _lettersDir(self):
        cwdir = os.getcwd()
        p = os.path.split(cwdir)
        return os.path.join(p[0], "letters")

    def preferencesBox(self, event = None):
        box = self.PreferencesBox(self)
        if box != None:
            box.destroy()
        if box.result != None:
            err = False
            if os.path.isfile(box.result[0]):
                p1 = box.result[0]
            else:
                err = True
            
            if not err and os.path.isfile(box.result[1]):
                p2 = box.result[1]
            else:
                err = True
            
            try:
                nb = int(box.result[2])
                if nb > 0:
                    p3 = nb
                else:
                    err = True
            except ValueError:
                err = True
            
            if not err:
                self.setConfig(p1, p2, p3)
                self.saveConfig()
            else:
                self.preferencesBox()
            
    
    class PreferencesBox(Dialog):
        def __init__(self, parent):
            self.app = parent
            Dialog.__init__(self, parent, title = "Définir des paramètres par défaut")
            
            #self.app = parent
            
        def body(self, master):
            box = tk.Frame(self)
            lbl1 = tk.Label(box, text="Fichier de lettres (*.let) :")
            lbl1.grid(row=0, column=0)
            self.lettersFileEntry = tk.Entry(box, width=30, font=style["msgbox"])
            self.lettersFileEntry.insert(0, self.app.lettersFile)
            self.lettersFileEntry.grid(row=0, column=1)
            b1 = tk.Button(box, text="Parcourir", command=self.lettersOpenFile)
            b1.grid(row=0,column=2)
            #---
            lbl2 = tk.Label(box, text="Fichier de dictionnaire (*.dic) :")
            lbl2.grid(row=1, column=0)
            self.dictionaryFileEntry = tk.Entry(box, width=30, font=style["msgbox"])
            self.dictionaryFileEntry.insert(0, self.app.dictionaryFile)
            self.dictionaryFileEntry.grid(row=1, column=1)
            b2 = tk.Button(box, text="Parcourir", command=self.dictionaryOpenFile)
            b2.grid(row=1,column=2)
            #---
            lbl3 = tk.Label(box, text="Nombre de lettres :")
            lbl3.grid(row=2, column=0)
            self.nbLettersEntry = tk.Entry(box, width=2, font=style["msgbox"])
            self.nbLettersEntry.insert(0, self.app.nbLetters)
            self.nbLettersEntry.grid(row=2, column=1)           

            box.pack()
            return self.lettersFileEntry
   
        
        def lettersOpenFile(self):
            lettersDir = self.app._lettersDir()
            s = filebox.askopenfilename(title = "Ouvrir un jeu de lettres...", initialdir=lettersDir, filetypes=[("LET", "*.let")])
            print(s)
            print(lettersDir)
            if lettersDir in s:
                s = s.replace(lettersDir, ".." + os.sep + "letters")
            self.lettersFileEntry.delete(0, tk.END)
            self.lettersFileEntry.insert(0, s)
            
        
        def dictionaryOpenFile(self):
            dictionaryDir = self.app._dictionariesDir()
            s = filebox.askopenfilename(title = "Ouvrir un dicitonnaire...", initialdir=dictionaryDir, filetypes=[("DIC", "*.dic")])
            print(s)
            print(dictionaryDir)
            if dictionaryDir in s:
                s = s.replace(dictionaryDir, ".." + os.sep + "dictionaries")
            self.dictionaryFileEntry.delete(0, tk.END)
            self.dictionaryFileEntry.insert(0, s)
        
            
            
        def validate(self):
            self.result = (self.lettersFileEntry.get(), 
                           self.dictionaryFileEntry.get(),
                           self.nbLettersEntry.get())
            return 1
    
    
    def pickLetters2(self, event = None):
        """Automatic picking"""
        self.pickLetters("")
    
    def pickLetters(self, letters):
        action = self.game.PickLetters(letters)
        if not action[0]:
            msgbox.showerror("Tirage invalide", action[1])
            return False
        else:
            self.canvas.Refresh()
            self.fileHistory += "{0} ".format(action[1])
            return True
        
    def pickLettersBox(self, event = None):
        box = self.PickLettersBox(self)
        if box != None:
            box.destroy()
        if box.result != None:
            if not self.pickLetters(box.result):
                self.pickLettersBox()

    class PickLettersBox(Dialog):
        def __init__(self, parent):
            Dialog.__init__(self, parent, title = "Piocher des lettres")
            #self.app = parent
            
        def body(self, master):
            lbl = tk.Label(master, text="Tirage [A..Z?/] :",
                           font=style["msgbox"])
            lbl.grid(row = 0, column = 0)
            self.entry = tk.Entry(master, width=8, font=style["msgbox"])
            self.entry.grid(row=0, column=1)
            
            return self.entry
        
        def validate(self):
            self.result = self.entry.get()
            return 1
            
        
    def findSolution(self, event = None):
        result = self.game.FindBestWord()
        if len(result)>0:
            self.rightRegion.listOfResults.refresh(result)
        else:
            msgbox.showerror("Aucun coup jouable.")
            
        
    def playWord(self, word, position):
        rack = self.game._rack()
        action = self.game.PlaceWord(word, position)
        if action[0] <= 0:
            msgbox.showerror("Mot invalide", action[1])
            return False
        else:
            self.canvas.Refresh()
            self.rightRegion.listOfTurns.addTurn(rack, position, action[0], word)
            self.rightRegion.listOfResults.clean()
            self.fileHistory += ":{0}:{1}\n".format(word, position)
            
            return True
        
    def playWordBox(self, event = None):
        box = self.PlayWordBox(self)
        #box.mainloop()
        
        if box.result != None and box.result[0] != "" and box.result[1]!="":
            if not self.playWord(box.result[0], box.result[1]):
                self.playWordBox()
            
    class PlayWordBox(Dialog):
        def __init__(self, parent):
            Dialog.__init__(self, parent, title = "Jouer un mot")
            #self.app = parent
            
            self.word=""
            self.position=""
   
            
        def body(self, master):
            lbl = tk.Label(master, text="Mot joué [A..Za..z] :",
                           font=style["msgbox"])
            lbl.grid(row = 0, column = 0)
            lbl2 = tk.Label(master, text="Position [A..Z01..15] :",
                            font=style["msgbox"])
            lbl2.grid(row = 1, column = 0)
        
            self.wordEntry = tk.Entry(master, width=15, font=style["msgbox"])
            self.wordEntry.grid(row=0, column=1)
            self.positionEntry = tk.Entry(master, width=3, font=style["msgbox"])
            self.positionEntry.grid(row=1, column=1)
            
            return self.wordEntry
            
        def validate(self):
            self.result = (self.wordEntry.get(), self.positionEntry.get())
            return 1
   
   
    class MenuBar(tk.Menu):
        def __init__(self, master):
            tk.Menu.__init__(self, master)
            self.app = master
                    
            def about():
                msgbox.showinfo("À propos",
                                """Scrabble solver v0 \n réalisé par Xavier MORIN \n-- 01/2018""",
                                icon=msgbox.INFO)
                
            menu1 = tk.Menu(self, tearoff=0)
            menu1.add_command(label="Nouvelle partie", command=self.app.newGame, accelerator='{}-N'.format(keyOPT))
            menu1.add_command(label="Ouvrir partie", command=self.app.loadGame , accelerator='{}-O'.format(keyOPT))
            menu1.add_separator()
            menu1.add_command(label="Enregistrer", command=self.app.saveGame, accelerator='{}-S'.format(keyOPT))
            menu1.add_command(label="Enregistrer sous...", command=self.app.saveAs , accelerator='{}-Shift-S'.format(keyOPT))
            menu1.add_separator()
            menu1.add_command(label="Options", command=self.app.preferencesBox)
            menu1.add_separator()
            menu1.add_command(label="Quitter", command=self.app.quitApp, accelerator='{}-Q'.format(keyOPT))
            self.add_cascade(label="Fichier", menu=menu1)
            
            menu2 = tk.Menu(self, tearoff=0)
            menu2.add_command(label="Piocher des lettres", command=self.app.pickLettersBox, accelerator='{}-T'.format(keyOPT))
            menu2.add_command(label="Piochage automatique", command=self.app.pickLetters2, accelerator='{}-Shift-T'.format(keyOPT))
            menu2.add_separator()
            menu2.add_command(label="Trouver le meilleur coup", command=self.app.findSolution, accelerator='{}-F'.format(keyOPT))
            menu2.add_separator()
            menu2.add_command(label="Jouer un mot", command=self.app.playWordBox, accelerator='{}-P'.format(keyOPT))
            self.add_cascade(label="Jeu", menu=menu2)
        
            menu3 = tk.Menu(self, tearoff=0)
            menu3.add_command(label="Comment jouer", command=about)
            menu3.add_separator()
            menu3.add_command(label="À propos", command=about)
            self.add_cascade(label="Aide", menu=menu3)
            

            
        
           
    class LeftRegion(tk.Canvas):
        def __init__(self, master):
            self.tileSize = 30
            tk.Canvas.__init__(self, master,
                            width=17*self.tileSize,
                            height=19.5*self.tileSize,
                            borderwidth=0,
                            highlightthickness=0,
                            bg=style["bg"], #006666", #123456", 
                            cursor="hand1")
            
            self.game = None
            self.pack()    
        
        def Refresh(self):
            # deletes every object
            for tag in self.find_all():
                self.delete(tag)
            
            # draws everything    
            self.drawGrid()
            if self.game != None:
                self.drawPlayedLetters()
                self.drawRack()
                self.drawRemainder()
                
        
        def drawLetter(self, letter, posX, posY):
            """ draw a letter at posX, posY"""
            # shadow
            x0, y0 = posX+2,posY+2
            x1, y1 = posX+self.tileSize-3, posY+self.tileSize-3
            t = [x0, y0, x0, y1, x1, y1, x1, y0]
            self.create_polygon(t, fill="#342D27", smooth=0, joinstyle=tk.ROUND, width=5, outline ="#342D27")

            # outline
            x0, y0 = posX,posY
            x1, y1 = posX+self.tileSize-4, posY+self.tileSize-4
            t = [x0, y0, x0, y1, x1, y1, x1, y0]
            self.create_polygon(t, fill="#FFFFF0", smooth=0, joinstyle=tk.ROUND, width=5, outline="#808080")
            # face
            self.create_polygon(t,smooth=0, joinstyle=tk.ROUND,
                                fill="#FFFFF0",
                                activefill="#CCCCCC",
                                width=3,
                                outline="#FFFFF0",
                                activeoutline="#CCCCCC")

            if letter.value > 0:
                # Normal letter
                self.create_text(posX+7, posY+4, text = letter.face, fill="#342D27",
                                 font=style["letter"],
                                 anchor=tk.NW)
                self.create_text(posX+self.tileSize-4, posY+self.tileSize-3, text = letter.value, fill="#342D27",
                                 font=style["letter2"],
                                 anchor=tk.SE)
            else:
                # Joker
                self.create_text(posX+13, posY+1, text = letter.face, fill="#FF00FF",
                                 font=style["joker"],
                                 anchor=tk.N)
            
        def drawRack(self):
            case = self.tileSize
            for i, letter in enumerate(self.game.rack):
                self.drawLetter(letter, (i+5)*case, 17*case)
                

        def drawPlayedLetters(self):
            case = self.tileSize
            for j, line in enumerate(self.game.grid):
                for i, square in enumerate(line):
                    if square.letter != None:
                        self.drawLetter(square.letter, (i+1)*case, (j+1)*case)
        
        def drawRemainder(self):
            s = self.game._remainder()
            s2= ""
            while len(s)>51:
                s2 += s[:51] + '\n'
                s = s[51:]
            s2 += s
            self.create_text(10,19.2*self.tileSize, text=s2, fill="#FFFFFF", font=style["remainder"], anchor=tk.SW)
            
                        

        def drawGrid(self):
            case = self.tileSize
            d=22
            # board
            self.create_rectangle(case-d, case-d, 16*case+d, 16*case+d, fill="#CCCBB3", outline="#342D27", width=3)
            #fill="#BEBD9E"

            # Triple Word, Double Word, Triple Letter, Double Letter squares.
            listTW = "A1,A8,A15,H1,H15,O1,O8,O15".split(',')
            for pos in listTW:
                x, y = self._coord(pos)
                self.create_rectangle(case*x,case*y,case*(x+1),case*(y+1),fill="#E40234")
        
            listDW = "B2,B14,C3,C13,D4,D12,E5,E11,H8,N2,N14,M3,M13,L4,L12,K5,K11".split(',')
            for pos in listDW:
                x, y = self._coord(pos)
                self.create_rectangle(case*x,case*y,case*(x+1),case*(y+1),fill="#F0878C")
        
            listTL = "B6,B10,F2,F6,F10,F14,J2,J6,J10,J14,N6,N10".split(',')
            for pos in listTL:
                x, y = self._coord(pos)
                self.create_rectangle(case*x,case*y,case*(x+1),case*(y+1),fill="#4FA1B9")
        
            listDL = "A4,A12,C7,C9,D1,D8,D15,G3,G7,G9,G13,H4,H12,I3,I7,I9,I13,L1,L8,L15,M7,M9,O4,O12".split(',')
            for pos in listDL:
                x, y = self._coord(pos)
                self.create_rectangle(case*x,case*y,case*(x+1),case*(y+1),fill="#C2DDE8")
            
            # center polygon
            t=[]
            N= 40
            for i in range(N):
                x = 8.5*case + case*(2+cos(i/N*16*pi))*sin(i/N*2*pi)/7
                y = 8.5*case - case*(2+cos(i/N*16*pi))*cos(i/N*2*pi)/7
                t.append(x)
                t.append(y)
                
            self.create_polygon(t, fill="#342D27", smooth=1)

            # Grid
            for i in range(16):
                self.create_line(case,case*(i+1),case*(15+1),case*(i+1), fill="#F0F0F0", width=2, cap=tk.PROJECTING)
                self.create_line(case*(i+1),case,case*(i+1),case*(15+1), fill="#F0F0F0", width=2, cap=tk.PROJECTING)
        
            # coordinates
            for i in range(15):
                self.create_text(case*(3/2+i),case*2/3,text=str(i+1), font=style["coordinates"], fill="#342D27")
                self.create_text(case*2/3, case*(3/2+i),text=chr(65+i), font=style["coordinates"], fill="#342D27")

            
        def _coord(self, pos):
            """Returns  (i,j) from *Ann* string"""
            i = ord(pos[0])-64
            j = eval(pos[1:])
            return (i,j)

        class Tile(ScrabbleGame.Letter):
            """Class representing a letter in the canvas"""
            def __init__(self):
                pass
                

    class RightRegion(tk.PanedWindow):
        def __init__(self, master):
            tk.PanedWindow.__init__(self, master, orient=tk.VERTICAL, bd=0, bg=style["bg"], sashwidth=0)
            self.app = master.master
            self.pack()
            self.listOfTurns = self.ListOfTurns(self)
            self.add(self.listOfTurns)
            self.add(tk.Button(self, text="Piocher des lettres", font=style["msgbox"], highlightbackground=style["bg"], command=self.app.pickLettersBox))
            self.add(tk.Button(self, text="Trouver solution", font=style["msgbox"], highlightbackground=style["bg"], command=self.app.findSolution))
            self.add(tk.Button(self, text="Jouer un mot", font=style["msgbox"], highlightbackground=style["bg"], command=self.app.playWordBox))
            self.listOfResults = self.ListOfResults(self)
            self.add(self.listOfResults)
            self.add(tk.Canvas(height=7, bg=style["bg"], bd=0, borderwidth=0, highlightthickness=0))
        def clean(self):
            self.listOfTurns.clean()
            self.listOfResults.clean()
        
        class ListOfTurns(tk.Listbox):
            def __init__(self, master):
                self.app = master.app
                master.add(tk.Label(master, text="n°:  Tirage  : Pos : Pts : Tot : Mots joués", bg=style["bg"], font=style["msgbox"], anchor=tk.W, padx=-1))
                tk.Listbox.__init__(self, master, font=style["msgbox"], width=50, height=15, bg="#CDD8D8")
                
                self.totalScore = 0
                self.turnsCount = 0
                self.pack()
                
            def addTurn(self, rack, position, score, word):
                self.totalScore += score
                self.turnsCount += 1
                self.insert(tk.END, "{0:>2}: {1:<9}: {2:<3} :{3:>4} :{4:>4} : {5}".format(self.turnsCount,
                                                                                          rack,
                                                                                          position,
                                                                                          score,
                                                                                          self.totalScore,
                                                                                          word))
                self.see(tk.END)
             
            def clean(self):
                self.totalScore = 0
                self.turnsCount = 0
                self.delete(0, tk.END)   
                
        class ListOfResults(tk.Listbox):
            def __init__(self, master):
                master.add(tk.Label(master, text="Pts : Pos : Mots jouables", font=style["msgbox"], bg=style["bg"], anchor=tk.W, padx=-1))
                tk.Listbox.__init__(self, master, font=style["msgbox"], width=50, height=13, bg="#CDD8D8")
                
                self.app = master.app
                self.bind("<Double-Button-1>", self.dbleClick1)
                self.pack()
            
            def refresh(self, listOfWords):
                self.delete(0, tk.END)
                for l in listOfWords:
                    #l format : [word, position, score]
                    self.insert(tk.END, "{0:>4}: {1:<3} : {2}".format(l[2],l[1],l[0]))   
                
            def clean(self):
                self.delete(0, tk.END) 
            
            def dbleClick1(self, event):
                # repérer la ligne
                # traiter la ligne
                if len(self.curselection()) == 1:
                    s = self.get(self.curselection())
                    s = s.replace(' ', '')
                    t = s.split(':')
                    self.app.playWord(t[2],t[1])
        
