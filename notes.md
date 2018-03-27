# ScrabbleSolver
X. Morin
___


## -- TODO --


default.config

à l'ouverture : prend default.config

à l'ouverture d'une partie : lit la config


* Menu:
$	* Fichier
$		* Nouvelle partie
			* choix de la langue
$		* Ouvrir partie
$		* Sauvegarder partie
$		* Sauvegarder partie sous...
	* A propos

$ * Afficher le reliquat

## Sauvegarde / chargement d'une partie
Géré par l'interface.


## Limites du moteur de jeu :
Charge une boite de jeu (lettres + dictionnaire)

fait un tirage

calcule les meilleurs coups

vérifie les coups
joue un mot
compte les points

xx sauve le jeu --> interface
xx charge un jeu --> interface

## limites de l'interface

## Cas d'utilisation
* Nouveau tirage (cliqué / aléatoire)
* Recherche de meilleure solution
* saisie d'un coup
* revenir en arrière
* selectionner la langue de jeu
* sauvegarder une partie
* ouvrir une partie sauvegardée


## Le plateau de jeu
### Fenêtre de jeu
* plateau
* liste des coups joués
* saisie d'un coup ?
* nouveau tirage > nouvelle fenêtre > aléatoire, cliqué, bouton valider.
* score / calcul de score

### Structure du plateau
liste de piles d'objets

### Évènements
* sélection d'objet
* déplacement d'objet
* superposition d'objets

### Description des objets
* nom
* type
* déplaçable/non-déplaçable

## Modules python
### boîte de jeu
* fenêtre d'affichage (+gestion d'évènements)
    * plateau (!)
    * liste des coups
    * boîte de saisie de coup
        * on indique les pièces que l'on joue et où+direction
        * A2 BOnJUR > place horizontalement, à partir de A2 et s'appuie sur le O présent en A6
        * n est un joker
* 

### plateau de jeu
* gestion des évènements

### Structure du jeu




* dictionary : set((str)WoRD ..)




* grille de jeu = matrice 15*15 de cases
    * case :
        * lettre jouée (=null si vide)
        * letterMultiplier : 1, 2, 3
        * wordMultiplier : 1, 2, 3
        * liste des lettres possiblestentielles / interdites / lettre jouée

* reliquat = liste de lettres disponibles
    * lettre :
        * face (A..Z)
        * value (0..10)

* chevalet = liste de lettres 
    * voir structure lettre   

* PlaceWord((str)WoRD, (i,j)Position)
    * > returns True/False
    * CheckWord
    * CountWord
    * ModifyGrid
    * AddWord to ScoreSheet

* CheckWord((str)WoRD, (i,j)Position)
    * > returns True/False ? (score ? >0 := valid)  
    * PositionIsCorrect (mot bien ancré)
    * 
    * IsDictionnaryValid

* CountWord((str)WoRD, (i,j)Position)
    * 

* liste des coups joués
    * coup joué
        * rack
        * position
        * mot joué
        * score
 
* fonction coup valide ?
* fonction compte points
    * compte le mot joué (hz / vt)
    * balaye les lettres posées et compte les mots (vt / hz)
    * fonction compte mot
        * 
    
* fonction recherche meilleur coup
* ...



	Code pour voir


