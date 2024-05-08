/**
 * 
 * Main Prototype Script for TyperRacers
 * 
 */

const gameArea = document.querySelector("#game-area");
const gameText = document.querySelector("#game-text");

const userTextInput = document.querySelector("#user-text-input");
const countdownMessage = document.querySelector("#countdown-msg");
const timerText = document.querySelector("#timer");

const SPACE_BAR_KEY = " ";

const TEXT_PROMPTS =
    [
        "He sat across from her trying to imagine it was the first time. It wasn't. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. His mind wandered until he caught himself and again tried to imagine it was the first time.",
        "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.",
        "Sitting in the sun, away from everyone who had done him harm in the past, he quietly listened to those who roamed by. He felt at peace in the moment, hoping it would last, but knowing the reprieve would soon come to an end. He closed his eyes, the sun beating down on face and he smiled. He smiled for the first time in as long as he could remember.",
        "She counted. One. She could hear the steps coming closer. Two. Puffs of breath could be seen coming from his mouth. Three. He stopped beside her. Four. She pulled the trigger of the gun.",
        "The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence.",
        "The leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it."
    ];

let currentTextPrompt = randomTextPrompt();
let totalWordsInPrompt = wordsLen(currentTextPrompt);

let currentWordToType = firstWordBeforeEmpty(currentTextPrompt);
let currentWordIndex = 0;
let totalWordsCompleted = 0;

let currentCharToTypeNext = currentWordToType[0];
let currentWordCharCount = 0;

/**
 * SPAN ELEMENTS
 */
let completedWords = null;
let activeCharacterSpan = null;
let correctCharacters = null;
let incorrectCharacters = null; // NEED TO ADD FUNCTIONALITY
let remainingCharacters = null;
let promptLeftSpan = null;

/**
 * Initalizes All Objects
 */
function initializeGameElements() {
    if (completedWords == null) {
        completedWords = document.createElement("span");
        completedWords.className = "completed-words";

        gameText.append(completedWords);
    }

    if (correctCharacters == null) {
        correctCharacters = document.createElement("span");
        correctCharacters.className = "correct-characters";

        gameText.append(correctCharacters);
    }

    if (incorrectCharacters == null) {
        incorrectCharacters = document.createElement("span");
        incorrectCharacters.className = "incorrect-characters";

        gameText.append(incorrectCharacters);
    }

    if (activeCharacterSpan == null) {
        let activeCharsTextNode = document.createTextNode(currentCharToTypeNext);

        activeCharacterSpan = document.createElement("span")
        activeCharacterSpan.className = "active-character";
        activeCharacterSpan.append(activeCharsTextNode);

        gameText.append(activeCharacterSpan);
    }

    if (remainingCharacters == null) {
        let customString = currentWordToType.slice(1);
        let wordsToTypeTextNode = document.createTextNode(customString);

        remainingCharacters = document.createElement("span");
        remainingCharacters.className = "remaining-characters";
        remainingCharacters.appendChild(wordsToTypeTextNode);

        gameText.append(remainingCharacters);
    }

    if (promptLeftSpan == null) {
        let promptLeftString = currentTextPrompt.slice(currentWordToType.length, currentTextPrompt.length);
        let promptLeftTextNode = document.createTextNode(promptLeftString);

        promptLeftSpan = document.createElement("span")
        promptLeftSpan.className = "promptLeftSpan";
        promptLeftSpan.appendChild(promptLeftTextNode);

        gameText.append(promptLeftSpan);
    }
}

/**
 * Updates All Logic For Our Game
 */
function updateGameElements() {
    //TO-DO
}

function onStart() {
    initializeGameElements();
}

function firstWordBeforeEmpty(str) {
    if (str == null) {
        return null;
    }

    const words = str.split(' ');
    return words[0];
}

function wordsLen(str) {
    const array = str.trim().split(/\s+/);
    return array.length;
}

function searchWordBeforeEmpty(str, index) {
    if (str == null) {
        return null;
    }

    const words = str.split(' ');
    return words[index];
}

function randomTextPrompt() {
    let randomPrompt = null;
    let randomNumber = Math.floor((Math.random() * TEXT_PROMPTS.length));

    randomPrompt = TEXT_PROMPTS[randomNumber];
    return randomPrompt;
}

/**
 * Handles All Keyboard (KeyDown) Events.
 */
function onKeyDown(event) {
    let key = event.key;
    console.log("Key pressed: " + key);

    if (key == "Backspace" || key == "Delete") {
        console.log("Backspace or Del Button Key Down.");
        if (currentWordCharCount == 0) {
            console.log("You don't have any characters to delete!");
            return;
        }
        currentWordCharCount -= 1;
        if (currentWordCharCount < 0) {
            currentWordCharCount = 0;
        }

        let lastCharacter = correctCharacters.innerHTML.substring(currentWordCharCount, correctCharacters.length);
        let updatedCharactersLeftToType = activeCharacterSpan.innerText.concat(remainingCharacters.innerText);

        correctCharacters.innerHTML = correctCharacters.innerHTML.substring(currentWordCharCount, correctCharacters.length - 1);
        activeCharacterSpan.innerText = lastCharacter;
        remainingCharacters.innerText = updatedCharactersLeftToType
        currentCharToTypeNext = currentWordToType[currentWordCharCount];
        incorrectCharacters.innerText += incorrectCharacters.innerText.substring(0, 1);
    }

    if (key == currentCharToTypeNext) {
        if (currentWordToType.lastIndexOf(userTextInput.value) != -1) {
            console.log("key: " + currentCharToTypeNext);

            if (currentCharToTypeNext == " ") {
                console.log("SPACE ENTERED HERE");
                event.preventDefault();

                console.log("currentWordToType: " + currentWordToType);
                if (userTextInput.value == currentWordToType) { // Word Completion Condition
                    console.log("Word Completed.")

                    totalWordsCompleted += 1;
                    currentWordIndex += 1;
                    currentWordCharCount = 0;
                    completedWords.innerHTML += userTextInput.value + " ";
                    userTextInput.value = "";
                    currentWordToType = searchWordBeforeEmpty(currentTextPrompt, currentWordIndex);
                    correctCharacters.innerHTML = "";

                    if (currentWordToType != null) {
                        console.log("Current Word To Type: " + currentWordToType);

                        activeCharacterSpan.innerHTML = currentWordToType[0];
                        promptLeftSpan.innerHTML = promptLeftSpan.innerHTML.slice(currentWordToType.length + 1);
                        currentCharToTypeNext = currentWordToType[0];

                        if (activeCharacterSpan.innerHTML == undefined) {
                            activeCharacterSpan.innerHTML = " ";
                        }

                        if (remainingCharacters.innerHTML == "") {
                            remainingCharacters.innerHTML += " ";
                        } else {
                            remainingCharacters.innerHTML = currentWordToType.slice(1) + " ";
                        }
                    }

                    console.log("Total Words Completed: " + totalWordsCompleted);
                }

                if (totalWordsCompleted == totalWordsInPrompt) { // Prompt Completion Condition
                    totalWordsCompleted = 0;
                    userTextInput.value = "YOU HAVE COMPLETED THE PROMPT!";
                    return;
                }
            }

            if (key != " ") {
                currentWordCharCount += 1;
                currentCharToTypeNext = currentWordToType[currentWordCharCount];
    
                if (currentCharToTypeNext == undefined || currentCharToTypeNext == "") {
                    currentCharToTypeNext = " ";
                }
    
                if (activeCharacterSpan.firstChild) {
                    activeCharacterSpan.firstChild.remove();
                }
    
                correctCharacters.innerText += currentWordToType[currentWordCharCount - 1];
                activeCharacterSpan.innerText = currentCharToTypeNext;
                remainingCharacters.innerText = remainingCharacters.innerText.slice(1);
    
                if (remainingCharacters.innerText == "") {
                    remainingCharacters.innerText = remainingCharacters.innerText + " ";
                }
                if (activeCharacterSpan.innerText == " " || activeCharacterSpan.innerText == "undefined") {
                    activeCharacterSpan.innerText = "" + " ";
                }
                if (currentCharToTypeNext == undefined || currentCharToTypeNext == "") {
                    currentCharToTypeNext = " ";
                }
            }

            
        } else {
            incorrectCharacters.innerText += activeCharacterSpan.innerText;

            if (activeCharacterSpan.firstChild) {
                activeCharacterSpan.firstChild.remove();
            }
            activeCharacterSpan.innerText += remainingCharacters.innerText.slice(1);
            remainingCharacters.innerText = remainingCharacters.innerText.slice(1);
            console.log("test1");
        }

        console.log("Current Word To Type: " + currentWordToType);
        console.log("Current Character To Type: " + currentCharToTypeNext);
    } else {

        if (key != "Shift" && key != "Control" && key != "Alt" && key != "CapsLock" && key != "Tab" && key != "" && 
            key != "Backspace" && key != "Delete" && key != "Meta") {
            // active -> incorrect
            // remaining -> active
            // promp update ? maybe
            if (activeCharacterSpan.innerText == "") {
                activeCharacterSpan.innerText += " ";
            }
            
            incorrectCharacters.innerText += activeCharacterSpan.innerText; // correct

            if (activeCharacterSpan.firstChild != null) {
                activeCharacterSpan.firstChild.remove();
            }
            activeCharacterSpan.innerText = remainingCharacters.innerText.substring(0, 1); // correct
            remainingCharacters.innerText = remainingCharacters.innerText.slice(1);

            if (remainingCharacters.innerText === "") {
                //activeCharacterSpan.innerHTML = currentWordToType[0];
                console.log("WIEFHIWEHFIWEHFIWEF");
                let nextWordToType = searchWordBeforeEmpty(currentTextPrompt, currentWordIndex + 1);
                promptLeftSpan.innerHTML = promptLeftSpan.innerHTML.slice(nextWordToType.length + 1);
                
                //if (activeCharacterSpan.firstChild != null) {
                //    activeCharacterSpan.firstChild.remove();
                //}
                
               // console.log("NEW WORD TO TYPE: "+nextWordToType);
                //activeCharacterSpan.innerText = remainingCharacters.innerText.substring(0, 1);
                //remainingCharacters.innerText = remainingCharacters.innerText.slice(1);
            }

            if (currentWordToType.lastIndexOf(userTextInput.value) == -1) {
                console.log("key: " + currentCharToTypeNext);
            }
            console.log("Incorrect KEY!")
        }
    }
}

    /**
     * Event Listeners
     */
    userTextInput.addEventListener("keydown", onKeyDown);
    ///////////////////////////////////////////////////////

    /**
     * METHOD CALLS
     */
    onStart();