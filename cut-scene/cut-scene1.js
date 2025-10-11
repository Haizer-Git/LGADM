// cut-scene1.js - Cinématique d'introduction
// Fonction pour créer et afficher la boîte de dialogue
// Système de gestion des dialogues
// Initialiser les dialogues au démarrage
window.addEventListener('DOMContentLoaded', () => {
    // Lancer automatiquement les dialogues après un court délai
    setTimeout(() => {
        dialogManager.play();
    }, 1000);
});

class DialogManager {
    constructor() {
        this.dialogQueue = [{ character: '🧑🏽‍⚕️', text: 'Félicitation madame Kermal, c\'est une fille !', duration: 4 }, 
            { character: '👩🏻‍⚕️', text: 'Comment allez-vous l\'appeler ?', duration: 2 },
            { character: '🤓', text: 'OUIN OUIN JE PLEURE REGARDEZ MOI OUIN OUIN', duration: 2},
            { character: '👩🏽', text: 'Je vais l\'appeler El Mordjene 92I', duration: 3 },
            { character: '👩🏻‍⚕️', text: 'Euuuhh.. vous n\'avez pas le droit', duration: 2 },
            { character: '👩🏽', text: 'Vous avez raison, j\'ai changé d\'avis, ça sera Adolf Himler !', duration: 3 },
            { character: '👩🏻‍⚕️', text: 'HEIN ??', duration: 2 },
            { character: '🧑🏽‍⚕️', text: 'On va appeller les poulets madame !', duration: 2 },
            { character: '👩🏽', text: 'Oh non désolé c\'est bon 😭', duration: 2 },
            { character: '👩🏻‍⚕️', text: 'Avec ses grosses lunettes...', duration: 2 },
            { character: '👩🏽', text: 'Je vais la call, Manel !', duration: 2 },
            { character: '🧑🏽‍⚕️', text: 'On est en France, on parle français !', duration: 2 },
            { character: '👩🏻‍⚕️', text: 'Sale arabe, retourne dans ton pays !', duration: 2 },
            { character: '🧑🏽‍⚕️', text: 'Manel... c\'est noté.', duration: 2 },
            { character: '🧑🏽‍⚕️', text: 'Marine le Pen, emmenez le bébé en surveillance', duration: 2 },
            { character: '👩🏻‍⚕️', text: 'Tout de suite Mr Zemmour !', duration: 2 },
        ];
        this.nextSceneImage = '../img/NouvelleScene.png'; // Remplacez par le chemin de votre image

        this.isPlaying = false;
        this.currentDialogBox = null;
    }

    // Ajouter des dialogues à la queue
    addDialog(character, text, duration) {
        this.dialogQueue.push({ character, text, duration });
        return this;
    }

    // Démarrer la séquence de dialogues
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

    // Afficher un dialogue pendant une durée donnée
    displayDialog(character, text, duration) {
        return new Promise((resolve) => {
            showDialog(character, text);
            setTimeout(() => {
                resolve();
            }, duration * 1000);
        });
    }

    // Cacher la boîte de dialogue
    hideDialog() {
        const container = document.querySelector('.cutscene-container');
        const dialogBox = container?.querySelector('.dialog-box');
        if (dialogBox) {
            dialogBox.remove();
        }
    }
}

// Créer une instance du gestionnaire de dialogues
const dialogManager = new DialogManager();

// AJOUTEZ VOS DIALOGUES ICI :
// Exemple d'utilisation
function createDialogBox() {
    const dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';
    dialogBox.innerHTML = `
        <div class="dialog-speaker-emoji"></div>
        <div class="dialog-text"></div>
    `;
    
    // Styles pour la boîte de dialogue
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
            padding-left:5%;
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

// Fonction pour afficher un dialogue
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

const scene = document.getElementById('mini-game-1');

// Configuration de la scène
const config = {
    backgroundImage1: '../img/Hopital.png', // Image de départ
    backgroundImage2: '../img/Chambre.png', // Image d'arrière-plan après zoom
    emojis: ['👩🏽', '🤓', '👩🏻‍⚕️', '🧑🏽‍⚕️'], // Emojis à afficher
    zoomDuration: 5000, // Durée du zoom en ms
    emojiDelay: 500 // Délai entre chaque emoji
};

// Créer la structure HTML
function initScene() {
    scene.innerHTML = `
        <div class="cutscene-container">
            <div class="background-layer bg-1"></div>
            <div class="background-layer bg-2"></div>
            <div class="emoji-container"></div>
        </div>
    `;

    // Appliquer les styles
    const style = document.createElement('style');
    style.textContent = `
        .cutscene-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        .background-layer {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            transition: transform ${config.zoomDuration}ms ease-in-out;
        }
        .bg-1 {
            background-image: url('${config.backgroundImage1}');
            z-index: 1;
        }
        .bg-2 {
            background-image: url('${config.backgroundImage2}');
            z-index: 2;
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
        .zoom {
            transform: scale(1.5);
        }
    `;
    document.head.appendChild(style);
}

// Démarrer la cinématique
function startCutscene() {
    const emojiContainer = scene.querySelector('.emoji-container');

    // Positions personnalisées pour les emojis
    const emojiPositions = [
        { top: '40%', left: '58%', size: '4rem', rotation: '0deg' }, // Position pour 👩🏽
        { top: '45%', left: '62%', size: '2rem', rotation: '50deg' }, // Position pour 🤓
        { top: '40%', left: '20%', size: '7rem', rotation: '0deg' }, // Position pour 👩🏽‍⚕️
        { top: '60%', left: '20%', size: '7rem', rotation: '0deg' }  // Position pour 🧑🏽‍⚕️
    ];

    // Afficher les emojis directement
    config.emojis.forEach((emoji, index) => {
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'emoji';
        emojiSpan.textContent = emoji;
        emojiSpan.style.top = emojiPositions[index].top;
        emojiSpan.style.left = emojiPositions[index].left;
        emojiSpan.style.fontSize = emojiPositions[index].size;
        emojiSpan.style.transform = `translate(-50%, -50%) rotate(${emojiPositions[index].rotation})`;
        emojiContainer.appendChild(emojiSpan);
    });

    /* CODE INACTIF - Animation avec zoom
    const bg1 = scene.querySelector('.bg-1');
    const bg2 = scene.querySelector('.bg-2');

    // Zoom sur la première image
    setTimeout(() => {
        bg1.classList.add('zoom');
    }, 500);

    // Afficher la deuxième image
    setTimeout(() => {
        bg2.style.opacity = '1';
    }, config.zoomDuration);

    // Afficher les emojis un par un après le zoom et l'affichage de l'image 2
    setTimeout(() => {
        config.emojis.forEach((emoji, index) => {
            setTimeout(() => {
                const emojiSpan = document.createElement('span');
                emojiSpan.className = 'emoji';
                emojiSpan.textContent = emoji;
                emojiSpan.style.top = emojiPositions[index].top;
                emojiSpan.style.left = emojiPositions[index].left;
                emojiSpan.style.fontSize = emojiPositions[index].size;
                emojiSpan.style.transform = `translate(-50%, -50%) rotate(${emojiPositions[index].rotation})`;
                emojiSpan.style.animationDelay = `${index * 0.2}s`;
                emojiContainer.appendChild(emojiSpan);
            }, index * config.emojiDelay);
        });
    }, config.zoomDuration + 500);
    */
}

// Initialiser et lancer
initScene();
startCutscene();

// Afficher un dialogue exemple
dialogManager

