// cut-scene2.js - Scène 2 indépendante pour tests

// Configuration de la scène 2
const scene2Config = {
    backgroundImage: '../img/Chambre.png',
    emojis: ['👩🏽', '', '👩🏻‍⚕️', ''],
    emojiPositions: [
        { top: '40%', left: '58%', size: '4rem', rotation: '0deg' }, // 👩🏽
        { top: '45%', left: '62%', size: '2rem', rotation: '50deg' }, // 🤓
        { top: '50%', left: '20%', size: '7rem', rotation: '0deg' }, // 👩🏻‍⚕️
        { top: '40%', left: '20%', size: '7rem', rotation: '0deg' }  // 🧑🏽‍⚕️
    ],
    dialogues: [
        { character: '🧑🏽‍⚕️', text: 'Madame Kermal, vous vous êtes bien reposée ?', duration: 3 },
        { character: '👩🏽', text: 'Encore un peu fatiguée, mais oui.', duration: 2 },
        { character: '👩🏽', text: 'Vous savez quand je pourrais revoir mon bébé ?', duration: 3 },
        { character: '👩🏻‍⚕️', text: 'En parlant de ça, vous allez trouvez ça CRAZYYYY', duration: 2 },
        { character: '👩🏻‍⚕️', text: 'Mais on l\'a perdu 😅', duration: 2 },
        { character: '👩🏽', text: 'MAIS WHAAAT ? NO WAY ? I DONT BELIEVE IT', duration: 3 },
        { character: '👩🏻‍⚕️', text: 'Pourquoi vous parlez anglais ??', duration: 2 },
        { character: '👩🏽', text: 'Ah oui désolé...', duration: 2 },
        { character: '👩🏽', text: 'Comment ça vous l\'avez perdu ??', duration: 2 },
        { character: '👩🏻‍⚕️', text: 'On l\'a pas vraiment perdu..', duration: 2 },
        { character: '👩🏻‍⚕️', text: 'On l\' a juste mélangé avec les autres bébés et on le retrouve plus', duration: 3 },
        { character: '👩🏽', text: 'Mais il faut absolument la retrouver, sinon Haizer il va faire comment ?', duration: 3 },
        { character: '👩🏻‍⚕️', text: 'Ce BG en trouvera d\'autres vous en faites pas.', duration: 2 },
        { character: '👩🏽', text: 'NON ! Je vais vous aider a la retrouver !', duration: 2 },
    ]
};

// Classe pour gérer les dialogues
class DialogManager {
    constructor() {
        this.dialogQueue = [];
        this.isPlaying = false;
        this.currentDialogBox = null;
    }

    setDialogues(dialogues) {
        this.dialogQueue = dialogues;
        return this;
    }

    async play() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        for (const dialog of this.dialogQueue) {
            await this.displayDialog(dialog.character, dialog.text, dialog.duration);
        }

        this.isPlaying = false;
        this.dialogQueue = [];
        this.hideDialog();
    }

    displayDialog(character, text, duration) {
        return new Promise((resolve) => {
            showDialog(character, text);
            setTimeout(() => {
                resolve();
            }, duration * 1000);
        });
    }

    hideDialog() {
        const container = document.querySelector('.cutscene-container');
        const dialogBox = container?.querySelector('.dialog-box');
        if (dialogBox) {
            dialogBox.remove();
        }
    }
}

const dialogManager = new DialogManager();

// Fonction pour créer la boîte de dialogue
function createDialogBox() {
    const dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';
    dialogBox.innerHTML = `
        <div class="dialog-speaker-emoji"></div>
        <div class="dialog-text"></div>
    `;
    
    const dialogStyle = document.createElement('style');
    dialogStyle.textContent = `
        .dialog-box {
            position: absolute;
            width: 60%;
            height: 15%;
            background: rgba(0, 0, 0, 0.8);
            border: 3px solid white;
            border-radius: 10px;
            padding-top: 10%;
            padding-left: 5%;
            text-align: left;
            z-index: 20;
            top: 90%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .dialog-speaker-emoji {
            position: absolute;
            top: -30px;
            left: 5%;
            font-size: 3rem;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid white;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .dialog-text {
            color: white;
            font-size: 1.2rem;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(dialogStyle);
    
    return dialogBox;
}

function showDialog(speakerEmoji, text) {
    const container = document.querySelector('.cutscene-container');
    let dialogBox = container.querySelector('.dialog-box');
    
    if (!dialogBox) {
        dialogBox = createDialogBox();
        container.appendChild(dialogBox);
    }
    
    dialogBox.querySelector('.dialog-speaker-emoji').textContent = speakerEmoji;
    dialogBox.querySelector('.dialog-text').textContent = text;
}

// Initialiser la scène
const scene = document.getElementById('mini-game-1');

function initScene2() {
    scene.innerHTML = `
        <div class="cutscene-container">
            <div class="background-layer bg-scene2"></div>
            <div class="emoji-container"></div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .cutscene-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            background: black;
        }
        .background-layer {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }
        .bg-scene2 {
            background-image: url('${scene2Config.backgroundImage}');
            z-index: 1;
            opacity: 1;
        }
        .emoji-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            opacity: 1;
        }
        .emoji {
            position: absolute;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Afficher la scène avec ses emojis
function displayScene2() {
    const emojiContainer = scene.querySelector('.emoji-container');
    emojiContainer.innerHTML = '';

    scene2Config.emojis.forEach((emoji, index) => {
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'emoji';
        emojiSpan.textContent = emoji;
        emojiSpan.style.top = scene2Config.emojiPositions[index].top;
        emojiSpan.style.left = scene2Config.emojiPositions[index].left;
        emojiSpan.style.fontSize = scene2Config.emojiPositions[index].size;
        emojiSpan.style.transform = `translate(-50%, -50%) rotate(${scene2Config.emojiPositions[index].rotation})`;
        emojiContainer.appendChild(emojiSpan);
    });
}

// Lancer la scène 2
async function startScene2() {
    // 1. Afficher la scène et les emojis
    displayScene2();
    
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Lancer les dialogues
    dialogManager.setDialogues(scene2Config.dialogues);
    await dialogManager.play();

    // Fin de la scène 2
    console.log('Scène 2 terminée');
}

// Initialiser et lancer
initScene2();
startScene2();