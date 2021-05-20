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

function initWord(){
    var request = new XMLHttpRequest();
    request.open('GET', "assets/dico.txt", true);
    request.responseType = 'blob';
    request.onload = function() {
        let reader = new FileReader();
        reader.readAsDataURL(request.response);
        reader.onload = function(e){
            console.log('DataURL:', e.target.result);
        };
    };
    request.send();
}