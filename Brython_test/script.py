from browser import document, html

# Construction de la calculatrice
calc = html.TABLE()
calc <= html.TR(html.TH(html.DIV("0", id="result"), colspan=3) +
                html.TD("C"))
lines = ["789/", "456*", "123-", "0.=+"]

calc <= (html.TR(html.TD(x) for x in line) for line in lines)

document <= calc

result = document["result"] # accès direct à un élément par son id

def action(event):
    """Gère l'événement "click" sur un bouton de la calculatrice."""
    # L'élément sur lequel l'utilisateur a cliqué est l'attribut "target" de
    # l'objet event
    element = event.target
    # Le texte affiché sur le bouton est l'attribut "text" de l'élément
    value = element.text
    if value not in "=C":
        # mise à jour du contenu de la zone "result"
        if result.text in ["0", "erreur"]:
            result.text = value
        else:
            result.text = result.text + value
    elif value == "C":
        # remise à zéro
        result.text = "0"
    elif value == "=":
        # exécution de la formule saisie
        try:
            x = eval(result.text)
            result.text = x
        except:
            result.text = "erreur"

    toto()


def toto():
    document <= "couille"
    print(__name__)
    print((toto.__name__))

# Associe la fonction action() à l'événement "click" sur tous les boutons
# de la page.
for button in document.select("td"):
    button.bind("click", action)
