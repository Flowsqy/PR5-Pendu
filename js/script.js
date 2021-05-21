tab=[   
    "\n   +-------+\n   |\n   |\n   |\n   |\n  |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |       |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      | |\n   |\n=============="
    ]

window.addEventListener("load", initWord);

var word;
var devine;
var inputField;

function initWord(){
    document.getElementById("file-input").addEventListener("change", function(){
        this.style.display = "none";
        let file = this.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", function(){
            let words = this.result.split("\n");
            word = words[Math.floor(Math.random() * words.length)];
            createInputDiv();
            //game();
        })
        reader.readAsText(file);
    })
}

function createInputDiv(){
    let mainContainer = document.getElementById("main-container");
    inputField = document.createElement("input");
    let inputDiv = document.createElement("div");
    inputDiv.className = "center";
    inputField.type = "text";
    inputField.addEventListener("change", loop);
    let validbutton = document.createElement("button");
    validbutton.textContent = "Valider";
    validbutton.addEventListener("click", loop);
    inputDiv.appendChild(inputField);
    inputDiv.appendChild(validbutton);
    mainContainer.appendChild(inputDiv);
}

function askLetter(){
    return inputField.value;
}

function displayInfo(info){
    document.getElementById("info").innerHTML = info;
}

/*
function game(){
    while(!loop()){}
}*/

function loop(){
    let proposition = askLetter();
    let letter = checkLetter(proposition);
    if(letter == null){

        return false;
    }
    return true;
}

function checkLetter(proposition){
    if(proposition.length != 1){
        return null;
    }
    let character = proposition.charAt(0);
    var letters = /^[A-Za-z]+$/;
    if(!character.match(letters)){
        return null;
    }
    return character.toUpperCase();
}
