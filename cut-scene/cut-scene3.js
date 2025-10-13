function cin4_1() {
    // Configuration des scènes
    const scenesConfig = {
        scene1: {
            backgroundImage: '../img/Maison.png',
            emojis: ['🤓','👨🏽‍🦱','🐈','🚬'],
            emojiPositions: [
                { top: '77%', left: '40%', size: '4rem', rotation: '0deg' }, // 🤓
                { top: '75%', left: '10%', size: '4rem', rotation: '0deg' }, // 👨🏽‍🦱
                { top: '43%', left: '65%', size: '3rem', rotation: '0deg' }, // 🐈
                { top: '77%', left: '7%', size: '1rem', rotation: '0deg' }, // 🚬
            ],
            dialogues: [
                { character: '🐈', text: 'MIAOU', duration: 1.5 },
                { character: '🤓', text: 'AHHHH', duration: 1.5 },
                { character: '🤓', text: 'Qu\'est-ce que ça fait du bien de rentrer à la casa.', duration: 3 },
                { character: '🤓', text: 'J\'ai bien mérité ça après ces années d\'internat.', duration: 2.5 },
                { character: '👨🏽‍🦱', text: 'Salut oukty, ça gaze ?', duration: 2 },
                { character: '🤓', text: 'Salu..', duration: 1 },
                { character: '🤓', text: 'T\'as quoi dans la bouche ?', duration: 2 },
                { character: '👨🏽‍🦱', text: 'Tu connais pas ? C\'est la mode maintenant', duration: 2 },
                { character: '👨🏽‍🦱', text: 'C\'est une Puff !', duration: 1.5 },
                { character: '🤓', text: 'Une quoi ?', duration: 1 },
                { character: '👨🏽‍🦱', text: 'Une puff !', duration: 1 },
                { character: '🤓', text: 'Une quoi ? Une quoi ?', duration: 1 },
                { character: '👨🏽‍🦱', text: 'Une puff !', duration: 1 },
                { character: '👨🏽‍🦱', text: 'Tu veux gouter ? Ca détend pour les exams !', duration: 2.5 },
                { character: '🤓', text: 'Ouais pourquoi pas ! J\'en ai bien besoin avec les partiels !', duration: 2.5 },
            ]
        },
        scene2: {
            backgroundImage: '../img/Maison.png',
            emojis: ['🤓','👨🏽‍🦱','🐈','🚬','🚬','🚬','🚬'],
            emojiPositions: [
                { top: '50%', left: '10%', size: '4rem', rotation: '0deg' }, // 🤓
                { top: '30%', left: '50%', size: '2.7rem', rotation: '0deg' }, // 👨🏽‍🦱
                { top: '75%', left: '65%', size: '3rem', rotation: '0deg' }, // 🐈
                { top: '31.12%', left: '48%', size: '0.5rem', rotation: '0deg' }, // 🚬
                { top: '51.5%', left: '5%', size: '1rem', rotation: '0deg' }, // 🚬
                { top: '61%', left: '50%', size: '1.5rem', rotation: '30deg' }, // 🚬
                { top: '45%', left: '50%', size: '1.5rem', rotation: '0deg' }, // 🚬
            ],
            dialogues: [
                { character: '🐈', text: 'MI', duration: 1 },
                { character: '🐈', text: 'AOUU', duration: 1 },
                { character: '🤓', text: 'Wesh frangin, ça dit quoi ?', duration: 2 },
                { character: '👨🏽‍🦱', text: 'Manel, c\'est toi qui a laissé toutes ces puffs partout ??', duration: 3 },
                { character: '🤓', text: 'Ah, p\'tetre j\'ai pas fais gaffe 😅', duration: 1.5 },
                { character: '👨🏽‍🦱', text: 'Faut vite que tu les ramasses !!!', duration: 1.5 },
                { character: '🤓', text: 'Je le ferai après, tkt pas..', duration: 1.5 },
                { character: '👨🏽‍🦱', text: 'Nan nan MAINTENANT !', duration: 1.5 },
                { character: '👨🏽‍🦱', text: 'Maman arrive, si elle en trouve t\'es dead !', duration: 2 },
                { character: '🤓', text: 'QUOIIIII', duration: 1.5 },
                { character: '🤓', text: 'Euuuh ok ok, je vais les récupérer.', duration: 1.5 },
                { character: '👨🏽‍🦱', text: 'Fais vite, elle est en bas, elle arrive dans 2 minutes !', duration: 3 },
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

    // Initialiser la scène avec deux backgrounds différents
    const scene = document.getElementById('mini-game-1');

    function initScene() {
        scene.innerHTML = `
            <div class="cutscene-container">
                <div class="background-layer bg-scene1"></div>
                <div class="background-layer bg-scene2" style="opacity:0;"></div>
                <div class="fade-overlay"></div>
                <div class="transition-text">Quelques jours plus tard...</div>
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
                transition: opacity 1.2s ease-in-out;
            }
            .bg-scene1 {
                background-image: url('${scenesConfig.scene1.backgroundImage}');
                z-index: 1;
                opacity: 1;
            }
            .bg-scene2 {
                background-image: url('${scenesConfig.scene2.backgroundImage}');
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
                transition: opacity 1.2s ease-in-out;
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
        `;
        document.head.appendChild(style);
    }

    // Afficher les emojis pour une scène donnée
    function displayScene(sceneConfig) {
        const emojiContainer = scene.querySelector('.emoji-container');
        emojiContainer.innerHTML = '';

        sceneConfig.emojis.forEach((emoji, index) => {
            if (!emoji) return;
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
            }, 600);
        });
    }

    // Séquence complète de la cinématique
    async function startCutscene() {
        const bgScene1 = scene.querySelector('.bg-scene1');
        const bgScene2 = scene.querySelector('.bg-scene2');
        const emojiContainer = scene.querySelector('.emoji-container');

        // --- SCENE 1 ---
        displayScene(scenesConfig.scene1);
        emojiContainer.classList.add('visible');
        await new Promise(resolve => setTimeout(resolve, 700));
        dialogManager.setDialogues(scenesConfig.scene1.dialogues);
        await dialogManager.play();

        // --- FONDU NOIR AVEC TEXTE ---
        await fadeToBlack();
        // --- CHANGEMENT DE BACKGROUND ---
        // Attendre la fin du fondu au noir (3 secondes)
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        bgScene1.style.opacity = '0';
        bgScene2.style.opacity = '1';

        // --- SCENE 2 ---
        displayScene(scenesConfig.scene2);
        
        // Fondu depuis le noir pour révéler la scène 2
        await fadeFromBlack();
        dialogManager.setDialogues(scenesConfig.scene2.dialogues);
        await dialogManager.play();
        // Fin de la cinématique
        console.log('Cinématique terminée. Transition vers le mini-jeu ou la scène suivante.');
        nv4_1();
    }

    // Initialiser et lancer
    initScene();
    startCutscene();

};

cin4_1();