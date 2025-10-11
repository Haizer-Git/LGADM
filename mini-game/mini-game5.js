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
            img.src = '../img/PP.jpg'; // Chemin à adapter si besoin
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

nv5('mini-game-1');