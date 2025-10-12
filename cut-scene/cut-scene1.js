// cut-scene1.js - Cinématique d'introduction


function cin1_1() {

    // Configuration des scènes
    const scenesConfig = {
        scene1: {
            backgroundImage: '../img/Chambre.png',
            emojis: ['👩🏽', '🤓', '👩🏻‍⚕️', '🧑🏽‍⚕️'],
            emojiPositions: [
                { top: '40%', left: '58%', size: '4rem', rotation: '0deg' }, // 👩🏽
                { top: '45%', left: '62%', size: '2rem', rotation: '50deg' }, // 🤓
                { top: '40%', left: '20%', size: '7rem', rotation: '0deg' }, // 👩🏻‍⚕️
                { top: '60%', left: '20%', size: '7rem', rotation: '0deg' }  // 🧑🏽‍⚕️
            ],
            dialogues: [
                { character: '🧑🏽‍⚕️', text: 'Félicitation madame Kermal, c\'est une fille !', duration: 4 },
                { character: '👩🏻‍⚕️', text: 'Comment allez-vous l\'appeler ?', duration: 2 },
                { character: '🤓', text: 'OUIN OUIN JE PLEURE REGARDEZ MOI OUIN OUIN', duration: 2 },
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
                { character: '👩🏻‍⚕️', text: 'Tout de suite Mr Zemmour !', duration: 2 }
            ]
        },
        scene2: {
            backgroundImage: '../img/Chambre.png',
            emojis: ['👩🏽', '', '👩🏻‍⚕️', ''],
            emojiPositions: [
                { top: '40%', left: '58%', size: '4rem', rotation: '0deg' }, // 👩🏽
                { top: '45%', left: '62%', size: '2rem', rotation: '50deg' }, // 🤓
                { top: '50%', left: '20%', size: '7rem', rotation: '0deg' }, // 👩🏻‍⚕️
                { top: '40%', left: '20%', size: '7rem', rotation: '0deg' }  // 🧑🏽‍⚕️
            ],
            dialogues: [
                { character: '👩🏻‍⚕️', text: 'Madame Kermal, vous vous êtes bien reposée ?', duration: 3 },
                { character: '👩🏽', text: 'Encore un peu fatiguée, mais oui.', duration: 2 },
                { character: '👩🏽', text: 'Vous savez quand je pourrais revoir mon bébé ?', duration: 3 },
                { character: '👩🏻‍⚕️', text: 'En parlant de ça, vous allez trouvez ça CRAZYYYY', duration: 2 },
                { character: '👩🏻‍⚕️', text: 'Mais on l\'a perdu 😅', duration: 2 },
                { character: '👩🏽', text: 'MAIS WHAAAT ? NO WAY ? I DONT BELIEVE IT', duration: 3 },
                { character: '👩🏻‍⚕️', text: 'Pourquoi vous parlez anglais ??', duration: 2 },
                { character: '👩🏽', text: 'Ah oui désolé...', duration: 2 },
                { character: '👩🏽', text: 'Comment ça vous l\'avez perdu ??', duration: 2 },
                { character: '👩🏻‍⚕️', text: 'On l\'a pas vraiment perdu..', duration: 2 },
                { character: '👩🏻‍⚕️', text: 'On l\'a juste mélangé avec les autres bébés et on le retrouve plus', duration: 3 },
                { character: '👩🏽', text: 'Mais il faut absolument la retrouver, sinon Haizer il va faire comment ?', duration: 3 },
                { character: '👩🏻‍⚕️', text: 'Ce BG en trouvera d\'autres vous en faites pas.', duration: 2 },
                { character: '👩🏽', text: 'NON ! Je vais vous aider a la retrouver !', duration: 2 },
            ]
        }
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

    function initScene() {
        scene.innerHTML = `
            <div class="cutscene-container">
                <div class="background-layer bg-hopital"></div>
                <div class="background-layer bg-chambre"></div>
                <div class="fade-overlay"></div>
                <div class="transition-text">Quelques heures plus tard...</div>
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
                transition: transform 3s ease-in-out, opacity 1.5s ease-in-out;
            }
            .bg-hopital {
                background-image: url('../img/Hopital.png');
                z-index: 1;
                opacity: 1;
                transform: scale(1);
            }
            .bg-chambre {
                background-image: url('../img/Chambre.png');
                z-index: 2;
                opacity: 0;
            }
            .fade-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                opacity: 0;
                z-index: 15;
                transition: opacity 1.5s ease-in-out;
                pointer-events: none;
            }
            .fade-overlay.active {
                opacity: 1;
            }
            .transition-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 2.5rem;
                font-weight: bold;
                text-align: center;
                z-index: 16;
                opacity: 0;
                transition: opacity 1s ease-in-out;
                pointer-events: none;
                text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
            }
            .transition-text.visible {
                opacity: 1;
            }
            .emoji-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                opacity: 0;
                transition: opacity 1s ease-in-out;
            }
            .emoji-container.visible {
                opacity: 1;
            }
            .emoji {
                position: absolute;
                opacity: 1;
            }
            .zoom {
                transform: scale(1.5) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Afficher une scène avec ses emojis
    function displayScene(sceneConfig) {
        const emojiContainer = scene.querySelector('.emoji-container');
        emojiContainer.innerHTML = '';

        sceneConfig.emojis.forEach((emoji, index) => {
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'emoji';
            emojiSpan.textContent = emoji;
            emojiSpan.style.top = sceneConfig.emojiPositions[index].top;
            emojiSpan.style.left = sceneConfig.emojiPositions[index].left;
            emojiSpan.style.fontSize = sceneConfig.emojiPositions[index].size;
            emojiSpan.style.transform = `translate(-50%, -50%) rotate(${sceneConfig.emojiPositions[index].rotation})`;
            emojiContainer.appendChild(emojiSpan);
        });
    }

    // Fondu au noir avec texte
    function fadeToBlack() {
        return new Promise((resolve) => {
            const fadeOverlay = scene.querySelector('.fade-overlay');
            const emojiContainer = scene.querySelector('.emoji-container');
            const transitionText = scene.querySelector('.transition-text');
            
            emojiContainer.classList.remove('visible');
            fadeOverlay.classList.add('active');
            
            // Afficher le texte après le fondu au noir
            setTimeout(() => {
                transitionText.classList.add('visible');
            }, 1500);
            
            // Masquer le texte avant de continuer
            setTimeout(() => {
                transitionText.classList.remove('visible');
            }, 4000);
            
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    }

    // Fondu depuis le noir
    function fadeFromBlack() {
        return new Promise((resolve) => {
            const fadeOverlay = scene.querySelector('.fade-overlay');
            const emojiContainer = scene.querySelector('.emoji-container');
            
            fadeOverlay.classList.remove('active');
            
            setTimeout(() => {
                emojiContainer.classList.add('visible');
                resolve();
            }, 500);
        });
    }

    // Séquence complète de la cinématique
    async function startCutscene() {
        const bgHopital = scene.querySelector('.bg-hopital');
        const bgChambre = scene.querySelector('.bg-chambre');
        const emojiContainer = scene.querySelector('.emoji-container');

        // 1. Afficher l'hôpital puis zoom
        await new Promise(resolve => setTimeout(resolve, 500));
        bgHopital.classList.add('zoom');

        // 2. Attendre la fin du zoom
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 3. Fondu vers la chambre
        bgChambre.style.opacity = '1';
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 4. Afficher les emojis de la scène 1
        displayScene(scenesConfig.scene1);
        emojiContainer.classList.add('visible');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 5. Lancer les dialogues de la scène 1
        dialogManager.setDialogues(scenesConfig.scene1.dialogues);
        await dialogManager.play();

        // 6. Fondu au noir avec texte "Quelques heures plus tard..."
        await fadeToBlack();

        // 7. Afficher la scène 2 (même image, nouveaux emojis/dialogues)
        displayScene(scenesConfig.scene2);
        await fadeFromBlack();

        // 8. Lancer les dialogues de la scène 2
        dialogManager.setDialogues(scenesConfig.scene2.dialogues);
        await dialogManager.play();

        // Fin de la cinématique
        console.log('Cinématique terminée');
    }

    // Initialiser et lancer
    initScene();
    startCutscene();
};

cin1_1();