document.addEventListener("DOMContentLoaded", () => {
    // Appel automatique au chargement
    nv3_3("mini-game-1");
});

function nv3_3(containerId, onComplete) {
    const QUESTIONS = [
        {
            q: "Pour une première sortie avec un gars, tu préfères :",
            options: [
                { text: "Bouffe (resto/fast-food)", msg: "Tu paies ou tu fais la petite ?" },
                { text: "Activités culturelles (musée, expo)", msg: "T'es une meuf géchar en haut" },
                { text: "Loisir (arcade, cinéma)", msg: "Droit au but #classique" },
                { text: "Balade (quai, parc)", msg: "Il y a pas grand chose d'autre à faire à Strasbourg..." }
            ]
        },
        {
            q: "A quel point les fleurs c'est important ?",
            options: [
                { text: "Très ! Dès le premier date !", msg: "OK Maya l'abeille" },
                { text: "J'aime bien !", msg: "Tu savais qu'on disait UN pétale ? Maintenant oui ;)" },
                { text: "Pas trop mais de temps en temps", msg: "Pas trop mais ahhh méfiant quand même (c'est une ref que t'as pas encore...)" },
                { text: "M'en fou en vrai", msg: "T'es pas dans ça toi tfacon" }
            ]
        },
        {
            q: "Imagine t'as 21 ans et t'attrape la mononucleose, tu te sens :",
            options: [
                { text: "SUPER MAL ! Ca peut etre mortel !!", msg: "Je sais j'ai évité un grave danger" },
                { text: "Horrible, j'imagine même pas...", msg: "Pire expérience, heureusement tu l'as eu avant" },
                { text: "OH NAN, C'EST COMME TOI JE COMPATIS TELLEMENT !!", msg: "Merci beaucoup, ça fait chaud au coeur !" },
                { text: "Je me suicide tellement ça fait mal", msg: "J'ai réussi a survivre à ça, je t'impressionne ?" }
            ]
        },
        {
            q: "La qualité la plus importante chez un homme ?",
            options: [
                { text: "Gentillesse", msg: "Tu te souviens je t'ai payé le quick 😉" },
                { text: "Humour", msg: "C'est un juif qui rentre dans un bar..." },
                { text: "Romantisme", msg: "Ton père serait pas un voleur ? Parceque il a volé tout le sable du monde pour fabriquer tes lunettes 😍 #disquette" },
                { text: "Être Haizer", msg: "Tout simplement en fait" }
            ]
        },
        {
            q: "Si tu devais choisir une personne :",
            options: [
                { text: "Oussamma Ben Laden", msg: "??" },
                { text: "Adolf Hitler", msg: "???" },
                { text: "Eric Zemmour", msg: "????" },
                { text: "Haizer", msg: "Encore heureux ??????" }
            ]
        }
    ];

    
    let current = 0;
    let answers = [];

    function renderQuestion() {
        const container = document.getElementById(containerId);
        if (!container) return;
        const qObj = QUESTIONS[current];
        const questionHtml = `
            <div class="quiz-rect">
                <div class="quiz-q">${qObj.q}</div>
            </div>
        `;
        const optionsHtml = `
            <div class="quiz-options-2x2">
                ${qObj.options.map((opt, i) => `
                    <button type="button" class="quiz-option-btn" data-idx="${i}">
                        ${opt.text}
                    </button>
                `).join("")}
            </div>
            <div class="quiz-feedback"></div>
            ${
                current === QUESTIONS.length - 1
                ? `<div class="next-game-link" style="display:none;cursor:pointer;">Continuer l'aventure &gt;</div>`
                : `<button type="button" class="quiz-next-btn" style="display:none;">Question suivante</button>`
            }
        `;
        container.innerHTML = `
            <div class="game-instructions">
                <h2>Niveau 3 - L'internat</h2>
                <p>Réponds aux 5 questions ! Tu dois avoir au moins 3 bonnes réponses<br>Question ${current + 1} sur ${QUESTIONS.length}</p>
            </div>
            ${questionHtml}
            ${optionsHtml}
        `;

        container.querySelectorAll(".quiz-option-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const idx = Number(btn.dataset.idx);
                answers[current] = qObj.options[idx].text;
                const feedback = container.querySelector(".quiz-feedback");
                feedback.textContent = qObj.options[idx].msg;
                feedback.style.display = "block";
                container.querySelectorAll(".quiz-option-btn").forEach((b, j) => {
                    if (j === idx) {
                        b.classList.add("selected");
                    } else {
                        b.classList.remove("selected");
                    }
                    b.disabled = true;
                });
                if (current === QUESTIONS.length - 1) {
                    container.querySelector(".next-game-link").style.display = "block";
                } else {
                    container.querySelector(".quiz-next-btn").style.display = "block";
                }
            });
        });

        if (current === QUESTIONS.length - 1) {
            const nextLink = container.querySelector(".next-game-link");
            if (nextLink) {
                nextLink.addEventListener("click", function() {
                    // 1. Envoi du mail
                    const answersObj = {};
                    QUESTIONS.forEach((q, i) => {
                        answersObj[`Q${i+1}: ${q.q}`] = answers[i];
                    });
                    fetch("https://formspree.io/f/mgvnzvny", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            _subject: "Réponses au quiz Haizer",
                            ...answersObj
                        })
                    }).catch(() => {});

                    // 2. Appel du niveau suivant (remplace ici par la fonction que tu veux)
                    nv4(containerId);
                });
            }
        } else {
            container.querySelector(".quiz-next-btn").addEventListener("click", function() {
                current++;
                if (current < QUESTIONS.length) {
                    renderQuestion();
                }
            });
        }
    }

    renderQuestion();
}

function nv4(containerId) {
    function deepCopy(obj) { return JSON.parse(JSON.stringify(obj)); }

    const section = document.getElementById(containerId);
    if (!section) return;
    section.innerHTML = "";


    // --- Affichage instructions ---
    const instructions = document.createElement('div');
    instructions.className = 'game-instructions';
    instructions.innerHTML = `
        <h2>Niveau 4 - L'épreuve</h2>
        <p>
            Récupère toutes les puffs (🚬) le plus vite possible !<br>
            Utilises le joystick pour te déplacer !<br>
        </p>
    `;
    section.appendChild(instructions);

    // --- Affichage timer & objectifs ---
    const statusBar = document.createElement('div');
    statusBar.className = 'game-status-bar';
    statusBar.innerHTML = `
        <div id="timer-display" class="timer-display">⏱️ 60s</div>
        <div id="objective-counter" class="objective-counter">🚬 x <span id="collected-count">0</span>/11</div>
    `;
    section.appendChild(statusBar);

    // --- Création du container principal (labyrinthe) ---
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    section.appendChild(gameContainer);

    // --- Messages fin de partie ---
    const endMsg = document.createElement('div');
    endMsg.className = 'end-message';
    endMsg.style.display = 'none';
    section.appendChild(endMsg);

    // --- Joystick mobile-friendly (toujours présent !) ---
    const joystickContainer = document.createElement('div');
    joystickContainer.className = 'joystick-container';
    section.appendChild(joystickContainer);

    // Ajout blocs succès/échec masqués
    const successDiv = document.createElement('div');
    successDiv.id = "success";
    successDiv.className = "game-success";
    successDiv.style.display = "none";
    successDiv.innerHTML = `Bravo ! Tu as ramassé toutes les puffs avant que ta mère ne rentre ! 🎉<br><span id="next-workshop-link" class="next-game-link" style="cursor:pointer;">Continuer l'aventure ></span>`;
    section.appendChild(successDiv);

    const failDiv = document.createElement('div');
    failDiv.id = "fail";
    failDiv.className = "game-fail";
    failDiv.style.display = "none";
    failDiv.innerHTML = `Trop nulle... ta mère t'as confisquée toutes tes puffs...<br><span class="retry-tip" style="cursor:pointer;">Clique pour recommencer</span>`;
    section.appendChild(failDiv);

    const stick = document.createElement('div');
    stick.className = 'joystick-stick';
    joystickContainer.appendChild(stick);

    // --- Définition des 5 maps (centre + 4 directions) avec objets ---
    const maps = {
        center: {
            name: "centre",
            maze: [
                [1,0,1,1,0,1,1,1,1,1],
                [1,0,1,1,0,0,1,0,0,1],
                [1,0,0,1,1,0,0,0,0,1],
                [1,0,0,0,0,0,0,1,1,1],
                [1,1,1,0,1,1,0,1,0,0],
                [0,0,0,0,0,0,0,1,0,0],
                [1,0,0,1,1,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,1,0,1,1,1,0,1,1,1],
                [1,1,0,1,1,1,1,1,1,1],
            ],
            objectGrid: [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,1,0],
                [0,0,2,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,1,0,0,0,0,0,0,0,0],
                [0,0,0,0,3,0,0,0,1,0],
                [0,0,0,0,0,0,2,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
            ],
        },
        right: {
            name: "droite",
            maze: [
                [1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,0,0,1,1,1,1],
                [1,0,0,1,1,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,1,1],
                [0,1,1,0,1,1,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,1],
                [1,0,0,1,1,1,1,0,1,1],
                [1,1,0,0,0,0,0,0,1,1],
                [1,1,1,1,0,0,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1],
            ],
            objectGrid: [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,0,0],
                [0,1,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,3,0,0,0,0,2,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,1,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
            ],
        },
        left: {
            name: "gauche",
            maze: [
                [1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,1,0,1,0,1,1,0,1],
                [1,0,0,0,0,0,0,1,0,1],
                [1,1,1,0,1,1,0,1,0,1],
                [1,0,1,0,0,0,0,1,0,0],
                [1,0,1,1,1,0,1,1,0,1],
                [1,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,1,1,0,1,1,1],
                [1,1,1,1,1,1,1,1,1,1],
            ],
            objectGrid: [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,2,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,0,0,0],
                [0,1,0,0,0,0,3,0,0,0],
                [0,0,0,0,0,0,0,0,2,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
            ],
        },
        up: {
            name: "haut",
            maze: [
                [1,1,1,1,1,1,1,1,1,1],
                [1,0,1,1,0,0,1,0,0,1],
                [1,0,0,1,1,0,0,0,0,1],
                [1,0,0,0,0,0,0,1,1,1],
                [1,0,1,0,1,1,0,1,0,1],
                [1,0,0,0,0,0,0,1,0,1],
                [1,0,0,1,1,0,0,0,0,1],
                [1,1,0,0,0,0,0,0,0,1],
                [1,0,0,1,0,1,1,1,1,1],
                [1,0,1,1,0,1,1,1,1,1],
            ],
            objectGrid: [
                [0,0,0,0,0,0,0,0,0,0],
                [0,1,0,0,2,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,3,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,1,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,3,0,0,0,0],
                [0,0,0,2,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
            ],
        },
        down: {
            name: "bas",
            maze: [
                [1,1,0,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1,0,1,1],
                [1,0,1,0,1,0,0,0,0,1],
                [1,0,0,0,1,0,0,1,1,1],
                [1,1,1,0,1,1,1,1,0,1],
                [1,1,0,0,0,0,0,1,0,1],
                [1,1,0,1,1,0,0,0,0,1],
                [1,1,0,0,0,0,0,0,0,1],
                [1,1,0,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1],
            ],
            objectGrid: [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,2,0,0],
                [0,0,0,0,0,0,0,0,1,0],
                [0,0,0,0,0,3,0,0,0,0],
                [0,0,0,0,0,0,0,0,1,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,3,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
            ],
        }
    };

    // --- Symboles objets ---
    const objEmojis = { 1: "🚬", 2: "💉", 3: "🩸" };

    // --- ETAT GLOBAL DES OBJETS ---
    let globalObjectGrids = {
        center: deepCopy(maps.center.objectGrid),
        right: deepCopy(maps.right.objectGrid),
        left: deepCopy(maps.left.objectGrid),
        up: deepCopy(maps.up.objectGrid),
        down: deepCopy(maps.down.objectGrid),
    };

    // --- Variables globales joueur et bonus/malus ---
    let playerPos = { x: 0.5, y: 0.5 };
    const speed = 0.002;
    const speedBonus = 0.004;
    const speedMalus = 0.001;
    let currentSpeed = speed;
    let collected = 0;
    let bonusActive = false;
    let bonusTimeout = null;
    let malusActive = false;
    let malusTimeout = null;
    let objectElems = [];
    let wallElems = [];
    let player;

    let currentMapKey = 'center';
    let maze;
    let objectGrid;

    // --- Timer ---
    let maxTime = 75;
    let timeLeft = maxTime;
    let timerInterval = null;
    let timerEnded = false;

    // --- Nettoyage et génération de la carte ---
    function renderMap(mapKey, entryDir, fromCellIdx) {
        wallElems.forEach(w => w.remove());
        wallElems = [];
        objectElems.forEach(row => row.forEach(o => { if (o) o.remove(); }));
        objectElems = [];
        let oldPlayer = document.getElementById('player');
        if (oldPlayer) oldPlayer.remove();

        maze = deepCopy(maps[mapKey].maze);
        objectGrid = globalObjectGrids[mapKey];
        currentMapKey = mapKey;

        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[0].length; x++) {
                if (maze[y][x] === 1) {
                    const wall = document.createElement('div');
                    wall.className = 'maze-wall';
                    wall.style.left = (x * 10) + '%';
                    wall.style.top = (y * 10) + '%';
                    wall.style.width = 10 + '%';
                    wall.style.height = 10 + '%';
                    gameContainer.appendChild(wall);
                    wallElems.push(wall);
                }
            }
        }
        objectElems = [];
        for (let y = 0; y < maze.length; y++) {
            objectElems[y] = [];
            for (let x = 0; x < maze[0].length; x++) {
                const type = objectGrid[y][x];
                if (type > 0 && maze[y][x] === 0) {
                    const obj = document.createElement('span');
                    obj.className = 'maze-object';
                    obj.style.left = (x * 10 + 5) + '%';
                    obj.style.top = (y * 10 + 5) + '%';
                    obj.textContent = objEmojis[type];
                    gameContainer.appendChild(obj);
                    objectElems[y][x] = obj;
                } else {
                    objectElems[y][x] = null;
                }
            }
        }
        // Création/mise à jour du joueur
        player = document.createElement('div');
        player.id = 'player';
        player.className = 'player';
        player.textContent = '🤓';

        if (entryDir) {
            let px = 0, py = 0;
            if (entryDir === "right") { px = 0; py = fromCellIdx; }
            else if (entryDir === "left") { px = maze[0].length - 1; py = fromCellIdx; }
            else if (entryDir === "up") { px = fromCellIdx; py = maze.length - 1; }
            else if (entryDir === "down") { px = fromCellIdx; py = 0; }
            playerPos.x = (px + 0.5) / maze[0].length;
            playerPos.y = (py + 0.5) / maze.length;
        } else {
            playerPos = { x: 0.5, y: 0.5 };
        }
        player.style.left = (playerPos.x * 100) + "%";
        player.style.top = (playerPos.y * 100) + "%";
        gameContainer.appendChild(player);
    }

    // --- Joystick events ---
    let dragging = false;
    function getCenter() {
        const rect = joystickContainer.getBoundingClientRect();
        return {
            x: rect.width / 2,
            y: rect.height / 2,
            maxDist: rect.width * 0.33
        };
    }
    function setStick(x, y) {
        stick.style.left = (x - stick.offsetWidth / 2) + 'px';
        stick.style.top = (y - stick.offsetHeight / 2) + 'px';
    }
    function handleStart(e) {
        dragging = true;
        const touch = e.touches ? e.touches[0] : e;
        const rect = joystickContainer.getBoundingClientRect();
        setStick(touch.clientX - rect.left, touch.clientY - rect.top);
        updateDirection(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();
    }
    function handleMove(e) {
        if (!dragging) return;
        const touch = e.touches ? e.touches[0] : e;
        const rect = joystickContainer.getBoundingClientRect();
        const {x: centerX, y: centerY, maxDist} = getCenter();
        let x = touch.clientX - rect.left;
        let y = touch.clientY - rect.top;
        let dx = x - centerX;
        let dy = y - centerY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > maxDist) {
            dx = dx * maxDist / dist;
            dy = dy * maxDist / dist;
            x = centerX + dx;
            y = centerY + dy;
        }
        setStick(x, y);
        updateDirection(x, y);
        e.preventDefault();
    }
    function handleEnd(e) {
        dragging = false;
        const {x, y} = getCenter();
        setStick(x, y);
        joyDx = 0;
        joyDy = 0;
        e.preventDefault();
    }
    let joyDx = 0;
    let joyDy = 0;
    function updateDirection(x, y) {
        const {x: centerX, y: centerY, maxDist} = getCenter();
        let dx = x - centerX;
        let dy = y - centerY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > maxDist) {
            dx = dx * maxDist / dist;
            dy = dy * maxDist / dist;
        }
        joyDx = dx / maxDist;
        joyDy = dy / maxDist;
    }
    joystickContainer.addEventListener('touchstart', handleStart, {passive: false});
    joystickContainer.addEventListener('touchmove', handleMove, {passive: false});
    joystickContainer.addEventListener('touchend', handleEnd, {passive: false});
    joystickContainer.addEventListener('touchcancel', handleEnd, {passive: false});
    joystickContainer.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    setTimeout(() => {
        const {x, y} = getCenter();
        setStick(x, y);
    }, 10);

    // --- Mouvement principal ---
    function movePlayer() {
        if (timerEnded) return;
        let nextX = playerPos.x + joyDx * currentSpeed;
        let nextY = playerPos.y + joyDy * currentSpeed;
        let borderSwitch = null, fromCellIdx = null;

        if (currentMapKey === 'center') {
            if (nextX > 1) {
                let yCell = Math.floor(playerPos.y * 10);
                let candidates = [];
                for (let y = 0; y < 10; y++) if (maze[y][9] === 0) candidates.push(y);
                let best = candidates.reduce((a, b) => Math.abs(b - yCell) < Math.abs(a - yCell) ? b : a, candidates[0]);
                borderSwitch = 'right';
                fromCellIdx = best;
            } else if (nextX < 0) {
                let yCell = Math.floor(playerPos.y * 10);
                let candidates = [];
                for (let y = 0; y < 10; y++) if (maze[y][0] === 0) candidates.push(y);
                let best = candidates.reduce((a, b) => Math.abs(b - yCell) < Math.abs(a - yCell) ? b : a, candidates[0]);
                borderSwitch = 'left';
                fromCellIdx = best;
            } else if (nextY < 0) {
                let xCell = Math.floor(playerPos.x * 10);
                let candidates = [];
                for (let x = 0; x < 10; x++) if (maze[0][x] === 0) candidates.push(x);
                let best = candidates.reduce((a, b) => Math.abs(b - xCell) < Math.abs(a - xCell) ? b : a, candidates[0]);
                borderSwitch = 'up';
                fromCellIdx = best;
            } else if (nextY > 1) {
                let xCell = Math.floor(playerPos.x * 10);
                let candidates = [];
                for (let x = 0; x < 10; x++) if (maze[9][x] === 0) candidates.push(x);
                let best = candidates.reduce((a, b) => Math.abs(b - xCell) < Math.abs(a - xCell) ? b : a, candidates[0]);
                borderSwitch = 'down';
                fromCellIdx = best;
            }
        } else {
            if (currentMapKey === 'right' && nextX < 0) {
                let yCell = Math.floor(playerPos.y * 10);
                let candidates = [];
                for (let y = 0; y < 10; y++) if (maps.center.maze[y][9] === 0) candidates.push(y);
                let best = candidates.reduce((a, b) => Math.abs(b - yCell) < Math.abs(a - yCell) ? b : a, candidates[0]);
                borderSwitch = 'center';
                fromCellIdx = best;
            } else if (currentMapKey === 'left' && nextX > 1) {
                let yCell = Math.floor(playerPos.y * 10);
                let candidates = [];
                for (let y = 0; y < 10; y++) if (maps.center.maze[y][0] === 0) candidates.push(y);
                let best = candidates.reduce((a, b) => Math.abs(b - yCell) < Math.abs(a - yCell) ? b : a, candidates[0]);
                borderSwitch = 'center';
                fromCellIdx = best;
            } else if (currentMapKey === 'up' && nextY > 1) {
                let xCell = Math.floor(playerPos.x * 10);
                let candidates = [];
                for (let x = 0; x < 10; x++) if (maps.center.maze[0][x] === 0) candidates.push(x);
                let best = candidates.reduce((a, b) => Math.abs(b - xCell) < Math.abs(a - xCell) ? b : a, candidates[0]);
                borderSwitch = 'center';
                fromCellIdx = best;
            } else if (currentMapKey === 'down' && nextY < 0) {
                let xCell = Math.floor(playerPos.x * 10);
                let candidates = [];
                for (let x = 0; x < 10; x++) if (maps.center.maze[9][x] === 0) candidates.push(x);
                let best = candidates.reduce((a, b) => Math.abs(b - xCell) < Math.abs(a - xCell) ? b : a, candidates[0]);
                borderSwitch = 'center';
                fromCellIdx = best;
            }
        }
        if (borderSwitch) {
            if (currentMapKey === 'center') {
                renderMap(borderSwitch, borderSwitch, fromCellIdx);
            } else {
                let entryDir = (
                    currentMapKey === 'right' ? 'left' :
                    currentMapKey === 'left' ? 'right' :
                    currentMapKey === 'up' ? 'down' :
                    'up'
                );
                renderMap('center', entryDir, fromCellIdx);
            }
            setTimeout(() => movePlayer(), 0);
            return;
        }

        let gridX = Math.floor(nextX * 10);
        let gridY = Math.floor(nextY * 10);

        if (
            gridX >= 0 && gridX < 10 &&
            gridY >= 0 && gridY < 10 &&
            maze[gridY][gridX] === 0
        ) {
            playerPos.x = nextX;
            playerPos.y = nextY;
            const objType = objectGrid[gridY][gridX];
            if (objType > 0) {
                if (objType === 1) {
                    collected++;
                    document.getElementById('collected-count').textContent = collected;
                    if (objectElems[gridY][gridX]) {
                        objectElems[gridY][gridX].remove();
                        objectElems[gridY][gridX] = null;
                    }
                    objectGrid[gridY][gridX] = 0;
                    if (collected >= 1) {
                        endGame(true);
                        return;
                    }
                }
                if (objType === 2) {
                    if (!bonusActive) {
                        bonusActive = true;
                        currentSpeed = speedBonus;
                        if (bonusTimeout) clearTimeout(bonusTimeout);
                        bonusTimeout = setTimeout(() => {
                            bonusActive = false;
                            currentSpeed = speed;
                        }, 5000);
                    }
                    objectGrid[gridY][gridX] = 0;
                    if (objectElems[gridY][gridX]) {
                        objectElems[gridY][gridX].remove();
                        objectElems[gridY][gridX] = null;
                    }
                }
                if (objType === 3) {
                    if (!malusActive) {
                        malusActive = true;
                        currentSpeed = speedMalus;
                        if (malusTimeout) clearTimeout(malusTimeout);
                        malusTimeout = setTimeout(() => {
                            malusActive = false;
                            currentSpeed = speed;
                        }, 5000);
                    }
                    objectGrid[gridY][gridX] = 0;
                    if (objectElems[gridY][gridX]) {
                        objectElems[gridY][gridX].remove();
                        objectElems[gridY][gridX] = null;
                    }
                }
            }
        }
        player.style.left = (playerPos.x * 100) + "%";
        player.style.top = (playerPos.y * 100) + "%";
        player.style.transform = "translate(-50%, -50%)";
        requestAnimationFrame(movePlayer);
    }

    function startTimer() {
        timerEnded = false;
        timeLeft = maxTime;
        document.getElementById('timer-display').textContent = `⏱️ ${timeLeft}s`;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timer-display').textContent = `⏱️ ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame(false);
            }
        }, 1000);
    }
    function endGame(victory) {
        timerEnded = true;
        if (timerInterval) clearInterval(timerInterval);

        // Cache les anciens messages
        document.getElementById('success').style.display = 'none';
        document.getElementById('fail').style.display = 'none';

        if (victory) {
            document.getElementById('success').style.display = 'block';

            // Suivant (redirige ou relance ou ce que tu veux)
            const nextBtn = document.getElementById('next-workshop-link');
            if (nextBtn) {
                nextBtn.onclick = () => {
                    nv5(containerId);
                };
            }
        } else {
            document.getElementById('fail').style.display = 'block';
            const retry = document.querySelector('#fail .retry-tip');
            if (retry) {
                retry.onclick = () => {
                    document.getElementById('fail').style.display = 'none';
                    collected = 0;
                    document.getElementById('collected-count').textContent = collected;
                    globalObjectGrids = {
                        center: deepCopy(maps.center.objectGrid),
                        right: deepCopy(maps.right.objectGrid),
                        left: deepCopy(maps.left.objectGrid),
                        up: deepCopy(maps.up.objectGrid),
                        down: deepCopy(maps.down.objectGrid),
                    };
                    renderMap('center');
                    startTimer();
                    movePlayer();
                };
            }
        }
    }

    // --- Démarrage du jeu ---
    renderMap('center');
    startTimer();
    movePlayer();
};
