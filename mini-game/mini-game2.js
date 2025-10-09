document.addEventListener("DOMContentLoaded", nv2_1);

// ============== NIVEAU 1 : Jongles ==============
function nv2_1() {
    const header = document.querySelector("header");
    if (header) header.style.display = "";
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "";

    const container = document.getElementById("mini-game-2");
    if (!container) return;
    // Config
    const ballGroundY = 180;
    const ballKickY = 150;
    const kickZone = 60;
    const kickCooldown = 180;
    const gravity = 750; // pixels / seconde² (était 0.06 “par frame”)
    const JONGLES_OBJECTIF = 20;

    container.innerHTML = `
        <div class="game-instructions">
            <h2>Niveau 2 - Football</h2>
            <p>Comme pendant les détections, fais 30 jongles pour valider l'exo ! ⚽ <br>Cliques au bon moment pour jongler.</p>
        </div>
        <div id="jongle-game">
            <div class="jongle-arena">
                <canvas id="arena-decor" width="200" height="230"></canvas>
                <div id="kick-zone-visual"></div>
                <div id="jongle-character">
                    <span class="emoji-body">🤓</span>
                    <span class="emoji-leg"></span>
                </div>
                <span id="jongle-ball">⚽</span>
            </div>
            <div id="jongle-counter">Jongles : 0</div>
            <div id="jongle-success" style="display:none;">
                Bravo !!! Juste la GOAT en fait !<br>
                <span id="next-workshop-link" class="next-game-link" style="cursor:pointer;">Atelier suivant ></span>
            </div>
            <div id="jongle-fail" style="display:none;">Oups, la balle est tombée ! Nullos 🫵🤣<br><span class="retry-tip">Clique pour recommencer</span></div>
        </div>
    `;

    // Sélection des éléments
    const ball = document.getElementById('jongle-ball');
    const leg = document.querySelector('.emoji-leg');
    const counterDisplay = document.getElementById('jongle-counter');
    const arena = document.querySelector('.jongle-arena');
    const kickZoneVisual = document.getElementById('kick-zone-visual');
    const successMsg = document.getElementById('jongle-success');
    const failMsg = document.getElementById('jongle-fail');
    const nextLink = document.getElementById('next-workshop-link');
    const canvas = document.getElementById('arena-decor');

    // Variables d'état
    let nextKickTime = 0;
    let jongles = 0;
    let ballY = ballGroundY;
    let ballVY = 0;
    let isAirborne = false;
    let animFrame = null;
    let isFailed = false;
    let isSuccess = false;
    let lastTime = null; // Pour animation framerate-indépendante

    function updateKickZoneVisual() {
        kickZoneVisual.className = "kick-zone-visual";
        kickZoneVisual.style.height = (kickZone * 2) + "px";
        kickZoneVisual.style.top = (ballKickY - kickZone) + "px";
    }
    updateKickZoneVisual();

    function drawField() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 0, 38, 0, Math.PI, false);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 2);
        ctx.lineTo(canvas.width, canvas.height - 2);
        ctx.stroke();
        ctx.restore();
    }
    drawField();

    function resetGame() {
        isFailed = false;
        isSuccess = false;
        nextKickTime = 0;
        jongles = 0;
        ballY = ballGroundY;
        ballVY = 0;
        isAirborne = false;
        counterDisplay.textContent = "Jongles : 0";
        successMsg.style.display = "none";
        failMsg.style.display = "none";
        if (nextLink) nextLink.style.display = "none";
        ball.style.top = ballY + "px";
        if (animFrame) cancelAnimationFrame(animFrame);
        lastTime = performance.now();
        animFrame = requestAnimationFrame(updateBall);
    }

    function updateBall(now) {
        if (isFailed || isSuccess) return;
        if (!lastTime) lastTime = now;
        const dt = Math.min((now - lastTime) / 1000, 0.04); // Limite à 40ms pour éviter les gros lags
        lastTime = now;

        if (isAirborne) {
            ballVY += gravity * dt;
            ballY += ballVY * dt;
            if (ballY >= canvas.height - 18) {
                ballY = canvas.height - 18;
                isFailed = true;
                failMsg.style.display = "";
                successMsg.style.display = "none";
                if (nextLink) nextLink.style.display = "none";
                return;
            }
        }
        ball.style.top = ballY + "px";
        animFrame = requestAnimationFrame(updateBall);
    }

    function tryJuggle(e) {
        if (isSuccess) return;
        if (isFailed) {
            resetGame();
            return;
        }
        const now = Date.now();
        if (now < nextKickTime) return;
        nextKickTime = now + kickCooldown;

        animateKick();

        // On n'utilise plus la vitesse "par frame" mais en pixels/sec, donc -350px/sec = ~3.5px/frame à 60fps
        if (
            (!isAirborne && Math.abs(ballY - ballGroundY) < 6) ||
            (isAirborne && Math.abs(ballY - ballKickY) < kickZone && ballVY > 0)
        ) {
            ballVY = -350 - Math.random() * 60; // pixels/sec (ajoute un peu de variation)
            isAirborne = true;
            jongles++;
            counterDisplay.textContent = "Jongles : " + jongles;
            if (jongles >= JONGLES_OBJECTIF) {
                isSuccess = true;
                successMsg.style.display = "";
                if (nextLink) nextLink.style.display = "inline";
                failMsg.style.display = "none";
            }
        }
    }

    function animateKick() {
        leg.classList.add('kick');
        setTimeout(() => leg.classList.remove('kick'), 130);
    }

    // Clique ou tap sur l'arène ou la balle
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    [arena, ball].forEach(el => {
        if (isTouchDevice) {
            el.addEventListener('touchstart', tryJuggle, { passive: false });
        } else {
            el.addEventListener('click', tryJuggle);
        }
    });

    // Lien "atelier suivant" = niveau 2
    if (nextLink) {
        nextLink.addEventListener('click', () => {
            nv2_2();
        });
    }

    // Init
    ball.style.position = "absolute";
    ball.style.left = "calc(50% - 18px)";
    ball.style.top = ballY + "px";
    counterDisplay.textContent = "Jongles : 0";
    resetGame();
}

// ============== NIVEAU 2 : Esquive ==============
function nv2_2() {
    const container = document.getElementById("mini-game-2");
    if (!container) return;

    // Terrain variables
    const ballGroundY = 180;
    const ballKickY = 150;
    const kickZone = 60;
    const kickCooldown = 180;
    const gravity = 0.06;

    // Positions possibles : 0 = gauche, 1 = centre, 2 = droite
    const positions = ["left", "center", "right"];
    let playerPos = 1; // centre par défaut

    // Obstacles
    const obstacleEmojis = ["🧍‍♀️"];
    const spawnInterval = 1000; // ms entre chaque spawn
    const obstacleSpeed = 1; // px/frame

    // Timer
    let timeLeft = 20;
    let isGameOver = false;

    container.innerHTML = `
        <div class="game-instructions">
            <h2>Niveau 2 - Football</h2>
            <p>Elles veulent te prendre la balle !<br>Swipe vers la gauche ou droite pour les dribbler !</p>
        </div>
        <div id="jongle-game">
            <div class="jongle-arena" id="esquive-arena">
                <canvas id="arena-decor" width="200" height="230"></canvas>
                <div id="falling-objects"></div>
                <div id="esquive-player" class="player-center">
                    <span class="esquive-emoji">🤓</span>
                    <span id="esquive-ball" class="ball-center">⚽</span>
                </div>
            </div>
            <div id="jongle-counter"><span id="timer-bar">Temps restant : 20s</span></div>
            <div id="jongle-success" style="display:none;margin-top:10px;">
                ANKARA MANEL, ANKARA MANEL, MANEL, MANEL, MANEL (t'as même pas la ref...)<br>
                <span id="end-workshop-link" class="next-game-link" style="cursor:pointer;">Dernier atelier > </span>
            </div>
            <div id="jongle-fail" style="display:none;margin-top:10px;">
                N...U...L...L...O...S<br>
                <span class="retry-tip">Clique pour recommencer</span>
            </div>
        </div>
    `;

    // Dessin du terrain
    const canvas = document.getElementById('arena-decor');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 0, 38, 0, Math.PI, false);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 2);
        ctx.lineTo(canvas.width, canvas.height - 2);
        ctx.stroke();
        ctx.restore();
    }

    function setPlayerPosition(posIdx) {
        const player = document.getElementById('esquive-player');
        const ball = document.getElementById('esquive-ball');
        player.className = `player-${positions[posIdx]}`;
        ball.className = `ball-${positions[posIdx]}`;
    }
    setPlayerPosition(playerPos);

    // SWIPE (tactile)
    let touchStartX = null;
    const arena = document.getElementById("esquive-arena");

    arena.addEventListener("touchstart", (e) => {
        if (isGameOver) return;
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
        }
    });

    arena.addEventListener("touchend", (e) => {
        if (isGameOver) { restart(); return; }
        if (touchStartX === null) return;
        let touchEndX = (e.changedTouches && e.changedTouches[0].clientX) || touchStartX;
        let dx = touchEndX - touchStartX;
        if (Math.abs(dx) > 30) {
            if (dx > 0 && playerPos < 2) {
                playerPos++;
                setPlayerPosition(playerPos);
            } else if (dx < 0 && playerPos > 0) {
                playerPos--;
                setPlayerPosition(playerPos);
            }
        }
        touchStartX = null;
    });

    // CLAVIER
    window.addEventListener('keydown', e => {
        if (isGameOver) return;
        if (e.key === "ArrowLeft" && playerPos > 0) {
            playerPos--;
            setPlayerPosition(playerPos);
        }
        if (e.key === "ArrowRight" && playerPos < 2) {
            playerPos++;
            setPlayerPosition(playerPos);
        }
    });

    // Obstacles qui tombent
    const fallingZone = document.getElementById("falling-objects");
    let obstacles = [];

    function spawnObstacle() {
        if (isGameOver) return;
        const pos = Math.floor(Math.random() * 3);
        const emoji = obstacleEmojis[Math.floor(Math.random() * obstacleEmojis.length)];

        const el = document.createElement("span");
        el.className = `falling-obstacle obstacle-${positions[pos]}`;
        el.innerText = emoji;
        el.style.position = "absolute";
        el.style.top = "0px";
        if (pos === 0) el.style.left = "23px";
        if (pos === 1) { el.style.left = "50%"; el.style.transform = "translateX(-50%)"; }
        if (pos === 2) el.style.left = "144px";

        fallingZone.appendChild(el);
        obstacles.push({pos, y: 0, el});
    }

    function moveObstacles() {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.y += obstacleSpeed;
            obs.el.style.top = obs.y + "px";
            // Collision detection
            if (
                obs.y > 164 && obs.y < 210 &&
                obs.pos === playerPos
            ) {
                endGame(false);
                return;
            }
            if (obs.y > 230) {
                obs.el.remove();
                obstacles.splice(i, 1);
            }
        }
    }

    // Boucle d'animation
    let animId = null;
    function gameLoop() {
        if (isGameOver) return;
        moveObstacles();
        animId = requestAnimationFrame(gameLoop);
    }
    gameLoop();

    // Spawn loop
    let spawnIntervalId = setInterval(spawnObstacle, spawnInterval);

    // Timer
    const timerBar = document.getElementById('timer-bar');
    let timerIntervalId = setInterval(() => {
        if (isGameOver) return;
        timeLeft--;
        timerBar.textContent = "Temps restant : " + timeLeft + "s";
        if (timeLeft <= 0) {
            endGame(true);
        }
    }, 1000);

    function endGame(success) {
        isGameOver = true;
        clearInterval(spawnIntervalId);
        clearInterval(timerIntervalId);
        cancelAnimationFrame(animId);
        if (success) {
            document.getElementById("jongle-success").style.display = "";
        } else {
            document.getElementById("jongle-fail").style.display = "";
        }
    }

    function restart() {
        isGameOver = false;
        playerPos = 1;
        setPlayerPosition(playerPos);
        obstacles.forEach(o => o.el.remove());
        obstacles = [];
        timeLeft = 20;
        timerBar.textContent = "Temps restant : 20s";
        document.getElementById("jongle-success").style.display = "none";
        document.getElementById("jongle-fail").style.display = "none";
        gameLoop();
        spawnIntervalId = setInterval(spawnObstacle, spawnInterval);
        timerIntervalId = setInterval(() => {
            if (isGameOver) return;
            timeLeft--;
            timerBar.textContent = "Temps restant : " + timeLeft + "s";
            if (timeLeft <= 0) {
                endGame(true);
            }
        }, 1000);
    }

    // Clique sur arène ou retry-tip pour recommencer
    arena.addEventListener('click', () => {
        if (isGameOver) restart();
    });
    document.addEventListener('click', e => {
        if (e.target.classList.contains('retry-tip')) {
            if (isGameOver) restart();
        }
    });

    // Lien dernier niveau
    document.addEventListener('click', e => {
        if (e.target.id === 'end-workshop-link') {
            nv2_3();
        }
    });
}

// ============== NIVEAU 3 : Pénaltys ==============
function nv2_3() {
    const container = document.getElementById("mini-game-2");
    if (!container) return;

    // Paramètres du terrain
    const arenaWidth = 200;
    const arenaHeight = 260;
    const goalY = 10;
    const goalHeight = 54;
    const goalWidth = arenaWidth - 20;
    const goalX = 10;

    // Position du joueur (centré en bas)
    let playerX = arenaWidth / 2;
    let playerY = arenaHeight - 80;

    // Position du ballon (au-dessus du joueur)
    let ballX = playerX - 8;
    let ballY = playerY - 40;

    // Position du gardien (au centre des cages)
    let goalieX = arenaWidth / 2 - 30;
    const goalieY = goalY + 12;

    // Compteurs
    let tirTotal = 0;
    let buts = 0;
    const tirsMax = 5;
    const butsRequis = 3;
    let isShooting = false;
    let hasShot = false;
    let isGameOver = false;
    let resultats = [];

    function renderCercles() {
        let html = '';
        for (let i = 0; i < tirsMax; i++) {
            let color = "#fff";
            if (resultats[i] === 1) color = "#18c018";
            else if (resultats[i] === -1) color = "#d22";
            html += `<span class="penalty-circle" style="
                display:inline-block;width:22px;height:22px;border-radius:50%;border:2px solid #888;
                background:${color};margin:0 5px;
            "></span>`;
        }
        return html;
    }

    container.innerHTML = `
        <div class="game-instructions">
            <h2>Niveau final - Pénaltys</h2>
            <p>Marque 3 pénaltys sur 5 tentatives ! <br>Clique sur la cage pour tirer.</p>
        </div>
        <div id="jongle-game">
            <div class="jongle-arena" id="penalty-arena" style="background:#3B782F; position: relative;">
                <canvas id="arena-decor" width="${arenaWidth}" height="${arenaHeight}"></canvas>
                <div id="goalie"
                    style="position:absolute;left:${goalieX}px;top:${goalieY}px;z-index:12;font-size:3rem;transition:left 0.4s;">
                    🧍‍♀️
                </div>
                <div id="penalty-ball"
                    style="position:absolute;left:${ballX-11}px;top:${ballY}px;font-size:1.8rem;z-index:11;transition:left 0.35s, top 0.35s;">
                    ⚽
                </div>
                <div id="penalty-player"
                    style="position:absolute;left:${playerX-20}px;top:${playerY}px;z-index:10;">
                    <span class="penalty-emoji" style="font-size:2.1rem;">🤓</span>
                </div>
            </div>
            <div id="penalty-circles" style="display: flex; justify-content: center; margin: 16px 0 0 0;">
                ${renderCercles()}
            </div>
            <div id="penalty-message" style="text-align:center;font-weight:bold;color:#1d7c1d;margin:7px 0;"></div>
            <div id="jongle-success" style="display:none; margin-top:10px;">
                Ok, Maneldo... (t'as toujours pas la ref...)<br>
                <span id="continue-link2" class="next-game-link">Continuer l'aventure</span>
            </div>
            <div id="jongle-fail" style="display:none;margin-top:10px;">
                Raté... Essaie encore !
            </div>
        </div>
    `;

    // Dessin du terrain : juste le fond vert et la cage en haut (barre du bas supprimée)
    const canvas = document.getElementById('arena-decor');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cage de but (haut uniquement)
        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(goalX, goalY);
        ctx.lineTo(goalX + goalWidth, goalY);
        ctx.moveTo(goalX, goalY);
        ctx.lineTo(goalX, goalY + goalHeight);
        ctx.moveTo(goalX + goalWidth, goalY);
        ctx.lineTo(goalX + goalWidth, goalY + goalHeight);
        ctx.stroke();
        ctx.restore();
    }

    const penaltyArena = document.getElementById("penalty-arena");
    const ballElem = document.getElementById("penalty-ball");
    const goalieElem = document.getElementById("goalie");
    const playerElem = document.getElementById("penalty-player");
    const successMsg = document.getElementById("jongle-success");
    const failMsg = document.getElementById("jongle-fail");
    const penaltyMsg = document.getElementById("penalty-message");
    const penaltyCircles = document.getElementById("penalty-circles");
    const ballStartX = ballX - 11;
    const ballStartY = ballY;

    function updateCercles() {
        penaltyCircles.innerHTML = renderCercles();
    }

    function endGame(success) {
        isGameOver = true;
        if (success) {
            successMsg.style.display = "";
        } else {
            failMsg.style.display = "";
        }
    }

    function resetPenalty() {
        isShooting = false;
        hasShot = false;
        penaltyMsg.textContent = "";
        ballElem.style.left = ballStartX + "px";
        ballElem.style.top = ballStartY + "px";
        goalieElem.style.left = (arenaWidth / 2 - 30) + "px";
    }

    penaltyArena.addEventListener("click", (e) => {
        if (isGameOver) return;
        if (isShooting) return;
        if (tirTotal >= tirsMax) return;
        const rect = penaltyArena.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        if (
            clickX >= goalX && clickX <= goalX + goalWidth &&
            clickY >= goalY && clickY <= goalY + goalHeight + 10
        ) {
            isShooting = true;
            hasShot = true;
            tirTotal++;

            let targetX = clickX - 8;
            let targetY = Math.max(goalY + 10, clickY);

            const rand = Math.random();
            let goalieTargetX;
            let goalieZone;
            if (rand < 0.33) {
                goalieTargetX = goalX;
                goalieZone = goalX + 18;
            } else if (rand > 0.66) {
                goalieTargetX = goalX + goalWidth - 36;
                goalieZone = goalX + goalWidth - 18;
            } else {
                goalieTargetX = arenaWidth / 2 - 30;
                goalieZone = arenaWidth / 2;
            }
            goalieElem.style.left = goalieTargetX + "px";
            ballElem.style.left = targetX + "px";
            ballElem.style.top = targetY + "px";

            setTimeout(() => {
                const ballFinalX = targetX + 11;
                let isArrete = Math.abs(ballFinalX - goalieZone) < 30 && targetY < goalY + goalHeight + 10;

                if (!isArrete) {
                    buts++;
                    resultats.push(1);
                    penaltyMsg.textContent = "BUTTTTTT !";
                    penaltyMsg.style.color = "#1d7c1d";
                } else {
                    resultats.push(-1);
                    penaltyMsg.textContent = "Arrêt du gardien 😢";
                    penaltyMsg.style.color = "#c21a1a";
                }
                updateCercles();

                if (buts >= butsRequis) {
                    penaltyMsg.textContent = "";
                    endGame(true);
                } else if (tirTotal >= tirsMax) {
                    penaltyMsg.textContent = "";
                    endGame(false);
                }
                setTimeout(() => {
                    if (!isGameOver) resetPenalty();
                    isShooting = false;
                }, 700);
            }, 400);
        }
    });

    failMsg.addEventListener("click", () => {
        if (!isGameOver) return;
        tirTotal = 0;
        buts = 0;
        isGameOver = false;
        resultats = [];
        successMsg.style.display = "none";
        failMsg.style.display = "none";
        penaltyMsg.textContent = "";
        resetPenalty();
        updateCercles();
    });

    successMsg.addEventListener("click", () => {
        tirTotal = 0;
        buts = 0;
        isGameOver = false;
        resultats = [];
        successMsg.style.display = "none";
        failMsg.style.display = "none";
        penaltyMsg.textContent = "";
        resetPenalty();
        updateCercles();
    });

    resultats = [];
    updateCercles();
}