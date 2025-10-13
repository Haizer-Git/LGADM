function playOnlyScene2(containerId = 'mini-game-1') {
    // Même structure que scenesConfig.scene2 dans ta fonction principale
    const scene2Config = {
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
            { character: '🤓', text: 'Euuuh ok ok, je vais les récupérer', duration: 1.5 },
            { character: '👨🏽‍🦱', text: 'Fais vite, elle est en bas, elle arrive dans 2 minutes !', duration: 3 },
        ]
    };

    // Ajoute le style si pas déjà fait (classes identiques à ta fonction principale)
    if (!document.getElementById('scene2only-style')) {
        const style = document.createElement('style');
        style.id = 'scene2only-style';
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
                user-select: none;
            }
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
                margin-left: 70px;
            }
        `;
        document.head.appendChild(style);
    }

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

    function showDialog(speakerEmoji, text) {
        const container = document.querySelector('.cutscene-container');
        let dialogBox = container.querySelector('.dialog-box');
        if (!dialogBox) {
            dialogBox = document.createElement('div');
            dialogBox.className = 'dialog-box';
            dialogBox.innerHTML = `
                <div class="dialog-speaker-emoji"></div>
                <div class="dialog-text"></div>
            `;
            container.appendChild(dialogBox);
        }
        dialogBox.querySelector('.dialog-speaker-emoji').textContent = speakerEmoji;
        dialogBox.querySelector('.dialog-text').textContent = text;
    }

    function renderScene2() {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <div class="cutscene-container">
                <div class="background-layer scene2-bg"></div>
                <div class="emoji-container"></div>
            </div>
        `;
        const bg = container.querySelector('.scene2-bg');
        bg.style.backgroundImage = `url('${scene2Config.backgroundImage}')`;
        const emojiContainer = container.querySelector('.emoji-container');
        emojiContainer.innerHTML = '';
        scene2Config.emojis.forEach((emoji, index) => {
            if (!emoji) return;
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'emoji';
            emojiSpan.textContent = emoji;
            const pos = scene2Config.emojiPositions[index];
            emojiSpan.style.top = pos.top;
            emojiSpan.style.left = pos.left;
            emojiSpan.style.fontSize = pos.size;
            emojiSpan.style.transform = `translate(-50%, -50%) rotate(${pos.rotation})`;
            emojiContainer.appendChild(emojiSpan);
        });
    }

    async function playScene2() {
        renderScene2();
        const dialogManager = new DialogManager();
        await new Promise(res => setTimeout(res, 500));
        await dialogManager.setDialogues(scene2Config.dialogues).play();
    }

    playScene2();
}
playOnlyScene2();