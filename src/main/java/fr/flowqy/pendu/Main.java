package fr.flowqy.pendu;

import javax.swing.*;
import java.awt.*;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class Main {

    private final static String[] tab = new String[]{
            "<br>   +-------+<br>   |<br>   |<br>   |<br>   |<br>  |<br>==============",
            "<br>   +-------+<br>   |       |<br>   |       O<br>   |<br>   |<br>   |<br>==============",
            "<br>   +-------+<br>   |       |<br>   |       O<br>   |       |<br>   |<br>   |<br>==============",
            "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|<br>   |<br>   |<br>==============",
            "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|-<br>   |<br>   |<br>==============",
            "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|-<br>   |      |<br>   |<br>==============",
            "<br>   +-------+<br>   |       |<br>   |       O<br>   |      -|-<br>   |      | |<br>   |<br>=============="
    };
    private JPanel mainContainer;
    private JLabel lettersLabel;
    private JLabel errorsLabel;
    private JLabel triesLabel;
    private JLabel infoLabel;
    private JTextField inputField;
    private JPanel inputPanel;
    private char[] word;
    private List<Character> devine;
    private List<Character> tries;
    private int errorCount;
    public Main() {
        initWindow();
        initWord();
        errorCount = 0;
    }

    public static void main(String[] args) {
        new Main();
    }

    /**
     * Crée la fenêtre
     */
    private void initWindow() {
        final JFrame window = new JFrame();
        mainContainer = new JPanel();
        lettersLabel = new JLabel();
        errorsLabel = new JLabel();
        infoLabel = new JLabel();
        triesLabel = new JLabel();
        inputField = new JTextField(10);
        inputField.addActionListener(e -> {
            if (loop()) {
                endGame(!devine.contains('_'));
            }
        });
        final GridLayout layout = new GridLayout(5, 1);
        mainContainer.setLayout(layout);

        final JPanel lettersPanel = new JPanel();
        lettersPanel.add(lettersLabel);
        mainContainer.add(lettersPanel);

        final JPanel errorsPanel = new JPanel();
        errorsPanel.add(errorsLabel);
        mainContainer.add(errorsPanel);

        final JPanel triesPanel = new JPanel();
        triesPanel.add(triesLabel);
        mainContainer.add(triesPanel);

        final JPanel infoPanel = new JPanel();
        infoPanel.add(infoLabel);
        mainContainer.add(infoPanel);

        inputPanel = new JPanel();
        inputPanel.add(inputField);
        mainContainer.add(inputPanel);
        window.setContentPane(mainContainer);

        final Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        final int height = screenSize.height;
        final int width = screenSize.width;
        window.setSize(width / 2, height / 2);
        window.setLocation(width / 4, height / 4);
        window.setVisible(true);
        window.setTitle("Pendu");
        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    /**
     * Charge le jeu et choisit un mot
     */
    private void initWord() {
        final InputStream is = getClass().getClassLoader().getResourceAsStream("dico.txt");
        assert is != null;
        final BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        final List<String> lines = reader.lines().collect(Collectors.toList());
        final Random random = new Random();
        word = lines.get(random.nextInt(lines.size())).toCharArray();
        devine = new ArrayList<>(word.length);
        for (int i = 0; i < word.length; i++) {
            devine.add('_');
        }
        tries = new ArrayList<>();
        errorCount = 0;
        game();
    }


    /**
     * Récuperer la valeur insérée par l'utilisateur
     *
     * @return La chaîne de caractères correspondante
     */
    private String askLetter() {
        return inputField.getText();
    }

    /**
     * Affiche une info
     *
     * @param info La chaîne de caractère à afficher
     */
    private void displayInfo(String info) {
        infoLabel.setText(info);
    }


    /**
     * Fonction du jeu
     */
    private void game() {
        drawLetters();
        displayInfo("Entrez une lettre");
    }

    /**
     * Gère la fin du jeu
     *
     * @param win Si le joueur a gagné
     */
    private void endGame(boolean win) {
        if (win) {
            displayInfo("Tu as gagné, le mot était bien " + new String(word));
        } else {
            displayInfo("Tu as perdu, le mot était " + new String(word));
        }
        inputPanel.setVisible(false);
    }

    /**
     * Afficher le pendu
     *
     * @return true si le nombre maximal d'erreur est atteint, false sinon
     */
    private boolean drawError() {
        errorsLabel.setText("<html>" + tab[errorCount] + "</html>");
        errorCount++;
        return errorCount >= tab.length;
    }

    /**
     * Affiche la section des lettres déjà essayées
     */
    private void drawTries() {
        draw(tries, triesLabel);
    }

    /**
     * Affiche les lettres du mot à deviner
     */
    private void drawLetters() {
        draw(devine, lettersLabel);
    }

    /**
     * Affiche un tableau dans un paragraphe donné
     *
     * @param tab   Le tableau de lettre à afficher
     * @param label Le label a mettre à jour
     */
    private void draw(List<Character> tab, JLabel label) {
        final StringBuilder toDisplay = new StringBuilder();
        for (char c : tab) {
            if (toDisplay.length() > 0) {
                toDisplay.append(" ");
            }
            toDisplay.append(c);
        }
        label.setText(toDisplay.toString());
    }

    /**
     * Remet à zéro le champ de saisi
     */
    private void resetInput() {
        inputField.setText("");
    }

    /**
     * Fonction qui simule un tour de boucle
     *
     * @return true si la fin du jeu est déclarée, false sinon
     */
    private boolean loop() {
        final String proposition = askLetter();
        final Character letter = checkLetter(proposition);
        if (letter == null) {
            return false;
        }
        if (tries.contains(letter)) {
            displayInfo("Tu as déjà utilisé la lettre " + letter);
            return false;
        }
        tries.add(letter);
        resetInput();
        drawTries();
        final boolean result = checkProposition(letter);
        if (result) {
            displayInfo("Tu as trouvé la lettre " + letter);
            drawLetters();
        } else {
            displayInfo("la lettre '" + letter + "' n'est pas dans le mot !");
            if (drawError()) {
                return true;
            }
        }
        return !devine.contains('_');
    }

    /**
     * Regarder si la chaîne passé en parametre est valide
     *
     * @param proposition La chaîne à analyser
     * @return Le caractère formatté pour l'exploitation du programme, null si la chaine est non valide
     */
    private Character checkLetter(String proposition) {
        if (proposition.length() != 1) {
            displayInfo("Entrez seulement une seule lettre");
            return null;
        }
        final char c = proposition.charAt(0);
        if (!(c >= 'A' && c <= 'Z') && !(c >= 'a' && c <= 'z')) {
            displayInfo(c + " n'est pas une lettre");
            return null;
        }
        displayInfo("Entrez une lettre");
        return Character.toUpperCase(c);
    }

    /**
     * Met à jour la proposition
     *
     * @param letter La lettre proposée par l'utilisateur
     * @return true si la lettre est dans le mot, false sinon
     */
    private boolean checkProposition(char letter) {
        boolean output = false;
        for (int i = 0; i < word.length; i++) {
            if (word[i] == letter) {
                devine.set(i, letter);
                output = true;
            }
        }
        return output;
    }

}
