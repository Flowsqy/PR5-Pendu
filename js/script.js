tab=[   
    "\n   +-------+\n   |\n   |\n   |\n   |\n  |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |       |\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      |\n   |\n==============",
    "\n   +-------+\n   |       |\n   |       O\n   |      -|-\n   |      | |\n   |\n=============="
    ]

window.addEventListener("load", init);

var word;
var devine;

function init(){
    initWord();
}

function initWord(){
    document.getElementById("file-input").addEventListener("change", function(){
        this.style.display = "none";
        let file = this.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", function(){
            let words = this.result.split("\n");
            word = words[Math.floor(Math.random() * words.length)];
        })
        reader.readAsText(file);
    })
}