tab=[   
    "<br>   +-------+<br>   |<br>   |<br>   |<br>   |<br>  |<br>==============",
    "<br>   +-------+<br>   |       |<br>   |       O<br>   |<br>   |<br>   |<br>==============",
    "<br>   +-------+<br>   |       |<br>   |       O<br>   |       |<br>   |<br>   |<br>==============",
    "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|<br>   |<br>   |<br>==============",
    "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|-<br>   |<br>   |<br>==============",
    "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|-<br>   |      |<br>   |<br>==============",
    "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|-<br>   |      | |<br>   |<br>=============="
    ]

window.addEventListener("load", initWord);

var word;
var devine;
var tries;
var errorCount;
var inputField;

/**
 * Charge le jeu et choisit un mot
 */
function initWord(){
    document.getElementById("file-input").addEventListener("change", function(){
        this.style.display = "none";
        let file = this.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", function(){
            let words = this.result.split("\n");
            word = [...words[Math.floor(Math.random() * words.length)]];
            devine = [word.length]
            for(let i = 0; i < word.length; i++){
                devine[i] = "_";
            }
            tries = [];
            errorCount = 0;
            createInput();
            game();
        })
        reader.readAsText(file);
    })
}

/**
 * Crée le champ de saisi
 */
function createInput(){
    let mainContainer = document.getElementById("main-container");
    inputField = document.createElement("input");
    let inputDiv = document.createElement("div");
    inputDiv.className = "center";
    inputField.id = "user-input";
    inputField.type = "text";
    inputField.addEventListener("change", function(){
        if(loop()){
            endGame(!devine.includes("_"));
        }
    });
    inputDiv.appendChild(inputField);
    mainContainer.appendChild(inputDiv);
}


/**
 * Récuperer la valeur insérée par l'utilisateur
 * @returns La chaîne de caractères correspondante
 */
function askLetter(){
    return inputField.value;
}

/**
 * Affiche une info
 * @param {String} info La chaîne de caractère à afficher
 */
function displayInfo(info){
    document.getElementById("info").innerHTML = info;
}


/**
 * Fonction du jeu
 */
function game(){
    drawLetters();
    displayInfo("Entrez une lettre");
}

/**
 * Gère la fin du jeu
 * @param {boolean} win Si le joueur a gagné
 */
function endGame(win){
    if(win){
        displayInfo("Tu as gagné, le mot était bien " + word.join(""));
    }
    else{
        displayInfo("Tu as perdu, le mot était " + word.join(""));
    }
    document.getElementById("user-input").style.display = "none";
}

/**
 * Afficher le pendu
 * @returns true si le nombre maximal d'erreur est atteint, false sinon
 */
function drawError(){
    document.getElementById("errors").innerHTML = tab[errorCount];
    errorCount++;
    return errorCount >= tab.length;
}

/**
 * Affiche la section des lettres déjà essayées
 */
function drawTries(){
    draw(tries, "tries");
}

/**
 * Affiche les lettres du mot à deviner
 */
function drawLetters(){
    draw(devine, "letters");
}

/**
 * Affiche un tableau dans un paragraphe donné
 * @param {Array} tab Le tableau de lettre à afficher
 * @param {String} paragraph L'id du paragraphe
 */
function draw(tab, paragraph){
    letterParagraph = document.getElementById(paragraph);
    let toDisplay = "";
    for(let i = 0; i < tab.length; i++){
        if(toDisplay.length > 0){
            toDisplay += " ";
        }
        toDisplay += tab[i];
    }
    letterParagraph.innerHTML = toDisplay;
}

/**
 * Remet à zéro le champ de saisi
 */
function resetInput(){
    document.getElementById("user-input").value = "";
}

/**
 * Fonction qui simule un tour de boucle
 * @returns true si la fin du jeu est déclarée, false sinon
 */
function loop(){
    let proposition = askLetter();
    let letter = checkLetter(proposition);
    if(letter == null){
        return false;
    }
    if(tries.includes(letter)){
        displayInfo("Tu as déjà utilisé la lettre " + letter);
        return;
    }
    tries.push(letter);
    resetInput();
    drawTries();
    let result = checkProposition(letter);
    if(result){
        displayInfo("Tu as trouvé la lettre " + letter);
        drawLetters();
    }
    else{
        displayInfo("la lettre '" + letter + "' n'est pas dans le mot !");
        if(drawError()){
            return true;
        }
    }
    return !devine.includes("_");
}

/**
 * Regarder si la chaîne passé en parametre est valide
 * @param {String} proposition La chaîne à analyser
 * @returns Le caractère formatté pour l'exploitation du programme, null si la chaine est non valide
 */
function checkLetter(proposition){
    if(proposition.length != 1){
        displayInfo("Entrez seulement une seule lettre");
        return null;
    }
    let character = proposition.charAt(0);
    var letters = /^[A-Za-z]+$/;
    if(!character.match(letters)){
        displayInfo(character + " n'est pas une lettre");
        return null;
    }
    displayInfo("Entrez une lettre");
    return character.toUpperCase();
}

/**
 * Met à jour la proposition
 * @param {String} letter La lettre proposée par l'utilisateur
 * @returns true si la lettre est dans le mot, false sinon
 */
function checkProposition(letter){
    let output = false;
    for(let i = 0; i < word.length; i++){
        if(word[i] == letter){
            devine[i] = letter;
            output = true;
        }
    }
    return output;
}
