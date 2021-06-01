import random

tab = [
    "\n   +-------+\n   |\n   |\n   |\n   |\n  |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |       |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      | |\n   |\n=============="
]


def askLetter():
    """
    Récuperer la valeur insérée par l'utilisateur
    :return: La chaîne de caractères correspondante
    """
    return input("Entrez une lettre")


def displayInfo(info):
    """
    Affiche une info
    :param info: La chaîne de caractère à afficher
    :return: None
    """
    print(info)


def game():
    """
    Fonction du jeu
    :return:
    """
    drawLetters()
    while not loop():
        pass


def endGame(win):
    """
    Gère la fin du jeu
    :param win: Si le joueur a gagné
    :return: None
    """
    if win:
        displayInfo("Tu as gagné, le mot était bien " + word.join(""))

    else:
        displayInfo("Tu as perdu, le mot était " + word.join(""))


def drawError():
    """
    Afficher le pendu
    :return: true si le nombre maximal d'erreur est atteint, false sinon
    """
    print(tab[errorCount])
    errorCount += 1
    return errorCount >= len(tab)


def drawTries():
    """
    Affiche la section des lettres déjà essayées
    :return: None
    """
    draw(tries)


def drawLetters():
    """
    Affiche les lettres du mot à deviner
    :return: None
    """
    draw(devine)


def draw(tab):
    """
    Affiche un tableau dans un paragraphe donné
    :param tab: Le tableau de lettre à afficher
    :return: None
    """
    to_display = ""
    for i in range(len(tab)):
        if len(to_display) > 0:
            to_display += " "
        to_display += tab[i]
    print(to_display)


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
    result = checkProposition(letter)
    if result:
        displayInfo("Tu as trouvé la lettre " + letter)
        drawLetters()
    else:
        displayInfo("la lettre '" + letter + "' n'est pas dans le mot !")
        if drawError():
            return True
    return not "_" in devine


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
    return character.toUpperCase()


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


file = open("assets/dico.txt", "r", "utf-8")
words = file.readlines()
file.close()
word = words[random.randint(0, len(words) - 1)]
devine = [len(word)]
for i in range(len(word)):
    devine[i] = "_"
tries = []
errorCount = 0
game()
