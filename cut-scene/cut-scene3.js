function nv5(containerId, onFail) {
    const section = document.getElementById(containerId);
    if (!section) return;
    section.innerHTML = "";

    // --- Instructions ---
    const instructions = document.createElement('div');
    instructions.className = 'game-instructions';
    instructions.innerHTML = `
        <h2>Niveau 5 - Fidelia</h2>
        <p>
            Attention ! Ne tombes pas sous son charme !<br>
            Cliques sur les visages pour les éloigner !<br>
        </p>
    `;
    section.appendChild(instructions);

    // --- Zone de jeu principale ---
    const gameArea = document.createElement('div');
    gameArea.id = 'enemy-invasion-area';
    gameArea.style.position = 'relative';
    gameArea.style.width = '90vw';
    gameArea.style.maxWidth = '500px';
    gameArea.style.height = '60vw';
    gameArea.style.maxHeight = '340px';
    gameArea.style.margin = '18px auto 0 auto';
    gameArea.style.background = '#1a1a1a';
    gameArea.style.borderRadius = '16px';
    gameArea.style.border = '2px solid #222';
    gameArea.style.overflow = 'hidden';
    section.appendChild(gameArea);

    // --- Zone de spawn (invisible) ---
    const spawnZone = document.createElement('div');
    spawnZone.style.position = 'absolute';
    spawnZone.style.top = '0';
    spawnZone.style.left = '15%';
    spawnZone.style.width = '70%';
    spawnZone.style.height = '30px';
    spawnZone.style.pointerEvents = 'none';
    spawnZone.style.zIndex = '10';
    spawnZone.style.display = 'none'; // invisible
    gameArea.appendChild(spawnZone);

    // --- Score ---
    const scoreBar = document.createElement('div');
    scoreBar.id = 'enemy-invasion-score';
    scoreBar.style.textAlign = "center";
    scoreBar.style.fontSize = "1.2em";
    scoreBar.style.marginTop = "8px";
    section.appendChild(scoreBar);

    // --- Joueur (emoji en bas au centre) ---
    const player = document.createElement('div');
    player.id = 'enemy-invasion-player';
    player.style.position = 'absolute';
    player.style.bottom = '8px';
    player.style.left = '50%';
    player.style.transform = 'translateX(-50%)';
    player.style.fontSize = '2.5em';
    player.style.userSelect = 'none';
    player.style.pointerEvents = 'none';
    player.textContent = '🤓';
    gameArea.appendChild(player);

    // --- Paramètres du jeu ---
    let score = 0;
    let enemies = [];
    let enemyId = 0;
    let spawnInterval = 1600;
    let gameRunning = true;
    let fail = false;
    let nextSpawnTimeout = null;
    let speedBase = 2.5;
    let speedMin = 0.75;

    function getEnemySpeed() {
        return Math.max(speedBase - Math.floor(score / 8) * 0.28, speedMin);
    }
    function getEnemiesPerSpawn() {
        // Augmentation progressive du nombre d'ennemis
        if (score < 10) return 1;
        if (score < 20) return 2;
        if (score < 35) return 3;
        if (score < 55) return 4;
        return 5;
    }
    function getSpawnInterval() {
        return Math.max(1600 - score * 30, 550);
    }

    // --- Génère et lance des ennemis ---
    function spawnEnemies() {
        if (!gameRunning) return;
        const count = getEnemiesPerSpawn();
        for (let i = 0; i < count; i++) {
            const enemy = document.createElement('div');
            // Spawn entre 15% et 85% de la largeur (centré)
            const leftPercent = 15 + Math.random() * 70;
            enemy.className = 'enemy-invasion-enemy';
            enemy.style.position = 'absolute';
            enemy.style.left = `calc(${leftPercent}% - 1.2em)`;
            enemy.style.top = '-60px';
            enemy.style.fontSize = '2.5em';
            enemy.style.cursor = 'pointer';
            const travelSecs = getEnemySpeed();
            enemy.style.transition = `top ${travelSecs}s linear`;
            const img = document.createElement('img');
            img.src = 'img/PP.jpg'; // Chemin à adapter si besoin
            img.alt = 'Fidelia';
            img.style.width = '1em';
            img.style.height = '1em';
            img.style.borderRadius = '50%';
            enemy.appendChild(img);
            enemy.dataset.enemyid = enemyId++;
            enemy.dataset.left = leftPercent;

            function killEnemy(e) {
                if (!gameRunning) return;
                e.stopPropagation();
                enemy.remove();
                enemies = enemies.filter(en => en !== enemy);
                score++;
                updateScore();
            }
            enemy.addEventListener('click', killEnemy);
            enemy.addEventListener('touchstart', killEnemy, { passive: false });

            gameArea.appendChild(enemy);

            // Force reflow
            void enemy.offsetWidth;

            setTimeout(() => {
                enemy.style.top = `calc(100% - 56px)`;
            }, 10);

            enemies.push(enemy);

            // Défaite si l'ennemi atteint le joueur
            const travelTime = travelSecs;
            setTimeout(() => {
                if (!enemy.parentNode || !gameRunning) return;
                triggerFail();
            }, travelTime * 1000 - 100);
        }
        spawnInterval = getSpawnInterval();
        if (gameRunning) {
            nextSpawnTimeout = setTimeout(spawnEnemies, spawnInterval);
        }
    }

    function updateScore() {
        scoreBar.innerHTML = `Tu as résisté à <b>${score}</b> disquettes`;
    }

    function triggerFail() {
        if (!gameRunning) return;
        gameRunning = false;
        fail = true;
        enemies.forEach(en => en.remove());
        enemies = [];
        if (nextSpawnTimeout) clearTimeout(nextSpawnTimeout);
        scoreBar.innerHTML = '';
        if (typeof onFail === "function") onFail(score);
    }

    function restart() {
        score = 0;
        enemies.forEach(en => en.remove());
        enemies = [];
        gameRunning = true;
        fail = false;
        updateScore();
        spawnInterval = 1600;
        spawnEnemies();
    }

    // --- Lancement du jeu ---
    updateScore();
    spawnEnemies();
}







function cin5_1() {
    // Configuration des scènes
    const scenesConfig = {
        scene1: {
            backgroundImage: '../img/Fidelia.png',
            emojis: ['🤓','👱🏼‍♀️'],
            emojiPositions: [
                { top: '44%', left: '30%', size: '3.5rem', rotation: '0deg' }, // 🤓
                { top: '70%', left: '30%', size: '3.5rem', rotation: '0deg' }, // 👱🏼‍♀️
            ],
            dialogues: [
                { character: '👱🏼‍♀️', text: 'MMA Assistance Bonjour', duration: 2 },
                { character: '🤓', text: 'Oh nan, j\'ai ma rentrée un jour de taff..', duration: 2 },
                { character: '👱🏼‍♀️', text: 'Très bien, je pourrais avoir votre nom et code postal', duration: 2.5 },
                { character: '🤓', text: 'Faut que je trouve quelqu\'un avec qui échanger', duration: 2 },
                { character: '🤓', text: 'Sur le planning, il y a qui de libre...', duration: 1.5 },
                { character: '🤓', text: 'Hmm 🤔', duration: 1 },
                { character: '🤓', text: 'Haizer ?', duration: 1 },
                { character: '👱🏼‍♀️', text: 'Nan madame, on peut pas vous rapatrier depuis Mantes-La-Jolie, c\'est une zone de guerre', duration: 3 },
                { character: '🤓', text: 'Je vais lui envoyer un message sur Teams, pour lui demander', duration: 2 },
                { character: '🤓', text: 'J\'espère qu\'il acceptera, il est trop mystérieux', duration: 2 },
            ]
        },
        scene2: {
            backgroundImage: '../img/Fidelia.png',
            emojis: ['🤓','👩🏽'],
            emojiPositions: [
                { top: '44%', left: '30%', size: '3.5rem', rotation: '0deg' }, // 🤓
                { top: '36%', left: '95%', size: '3.5rem', rotation: '0deg' }, // 👩🏽
            ],
            dialogues: [
                { character: '🤓', text: 'Ouah, il a accepté, trop gentil !', duration: 2 },
                { character: '🤓', text: 'En plus il est trop drole 🤣🤣🤣', duration: 2 },
                { character: '🤓', text: 'En plus il est intelligent', duration: 2.5 },
                { character: '🤓', text: 'En plus il est trop..', duration: 1.5 },
                { character: '🤓', text: 'STOP HAIZER on a capté c\'est bon', duration: 2 },
                { character: '🤓', text: 'Tu profites de ça pour te faire des compliments', duration: 2 },
                { character: '🤓', text: 'Saye lances le dernier jeu', duration: 1.5 },
                { character: '🤓', text: 'Tu dois résister aux disquettes et pas tomber sous le charme', duration: 2 },
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
                <div class="transition-text">Quelques heures plus tard</div>
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
        
        bgScene1.style.opacity = '0';
        bgScene2.style.opacity = '1';

        // --- SCENE 2 ---
        nv5('mini-game-1', function(score) {
            console.log('Jeu terminé avec un score de:', score);
        });
        displayScene(scenesConfig.scene2);
        
        // Fondu depuis le noir pour révéler la scène 2
        await fadeFromBlack();
        dialogManager.setDialogues(scenesConfig.scene2.dialogues);
        await dialogManager.play();
        nv5('mini-game-1', function(score) {
            console.log('Jeu terminé avec un score de:', score);
        });
    }

    // Initialiser et lancer
    initScene();
    startCutscene();

};

cin5_1();


