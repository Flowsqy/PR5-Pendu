import random
from tkinter import *

tab = [
    "\n   +-------+\n   |\n   |\n   |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |       |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      | |\n   |\n=============="
]


class AtomicInteger:
    """
    Obligé de créer une classe parceque les int sont transmis par valeur et non par référence
    Quel enfer
    """

    def __init__(self, value):
        self.value = value


def askLetter():
    """
    Récuperer la valeur insérée par l'utilisateur
    :return: La chaîne de caractères correspondante
    """
    return entry.get()


def displayInfo(info):
    """
    Affiche une info
    :param info: La chaîne de caractère à afficher
    :return: None
    """
    infoLabel.config(text=info)


def processInput(e):
    """
    Gere l'évènement du clic
    :return: None
    """
    if loop():
        endGame("_" not in devine)


def game():
    """
    Fonction du jeu
    :return:
    """
    drawLetters()
    displayInfo("Entrez une lettre")


def endGame(win):
    """
    Gère la fin du jeu
    :param win: Si le joueur a gagné
    :return: None
    """
    if win:
        displayInfo("Tu as gagné, le mot était bien " + "".join(word))

    else:
        displayInfo("Tu as perdu, le mot était " + "".join(word))
    entry.destroy()


def drawError():
    """
    Afficher le pendu
    :return: true si le nombre maximal d'erreur est atteint, false sinon
    """
    errorsLabel.config(text=tab[errorCount.value])
    errorCount.value += 1
    return errorCount.value >= len(tab)


def drawTries():
    """
    Affiche la section des lettres déjà essayées
    :return: None
    """
    draw(tries, triesLabel)


def drawLetters():
    """
    Affiche les lettres du mot à deviner
    :return: None
    """
    draw(devine, lettersLabel)


def draw(tab, label):
    """
    Affiche un tableau dans un paragraphe donné
    :param tab: Le tableau de lettre à afficher
    :param label: Le label a utiliser
    :return: None
    """
    to_display = ""
    for i in range(len(tab)):
        if len(to_display) > 0:
            to_display += " "
        to_display += tab[i]
    label.config(text=to_display)


def loop():
    """
    Fonction qui simule un tour de boucle
    :return: true si la fin du jeu est déclarée, false sinon
    """
    proposition = askLetter()
    letter = checkLetter(proposition)
    if letter is None:
        return False
    if letter in tries:
        displayInfo("Tu as déjà utilisé la lettre " + letter)
        return
    tries.append(letter)
    drawTries()
    entry.delete(0, END)
    result = checkProposition(letter)
    if result:
        displayInfo("Tu as trouvé la lettre " + letter)
        drawLetters()
    else:
        displayInfo("la lettre '" + letter + "' n'est pas dans le mot !")
        drawLetters()
        if drawError():
            return True
    return "_" not in devine


def checkLetter(proposition):
    """
    Regarder si la chaîne passé en parametre est valide
    :param proposition: La chaîne à analyser
    :return: Le caractère formatté pour l'exploitation du programme, null si la chaine est non valide
    """
    if len(proposition) != 1:
        displayInfo("Entrez seulement une seule lettre")
        return None
    character = proposition[0]
    if not character.isalpha():
        displayInfo(character + " n'est pas une lettre")
        return None
    displayInfo("Entrez une lettre")
    return character.upper()


def checkProposition(letter):
    """
    Met à jour la proposition
    :param letter: La lettre proposée par l'utilisateur
    :return: true si la lettre est dans le mot, false sinon
    """
    output = False
    for i in range(len(word)):
        if word[i] == letter:
            devine[i] = letter
            output = True
    return output


file = open("assets/dico.txt", mode="r", encoding="utf-8")
words = file.readlines()
file.close()
word = words[random.randint(0, len(words) - 1)]
devine = ["_" for _ in range(len(word))]
tries = []
errorCount = AtomicInteger(0)

# Création de la fenetre
window = Tk()
window.title("Fenetre")
window.geometry("1280x720")

frame = Frame(window)
frame.pack(expand=YES)

lettersLabel = Label(frame)
lettersLabel.grid(column=0, row=0)

errorsLabel = Label(frame, justify="left")
errorsLabel.grid(column=0, row=1)

triesLabel = Label(frame)
triesLabel.grid(column=0, row=2)

infoLabel = Label(frame)
infoLabel.grid(column=0, row=3)

entry = Entry(frame)
entry.grid(column=0, row=4)
entry.bind('<Return>', processInput)

# Start game
game()

window.mainloop()
