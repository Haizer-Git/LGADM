document.addEventListener("DOMContentLoaded", () => {
    document.body.style.overflowX = "hidden";
    document.addEventListener('touchmove', function(e) {
        if (e.touches && e.touches.length === 1) {
            if (Math.abs(e.touches[0].clientX - (window.lastTouchX || 0)) > Math.abs(e.touches[0].clientY - (window.lastTouchY || 0))) {
                e.preventDefault();
            }
            window.lastTouchX = e.touches[0].clientX;
            window.lastTouchY = e.touches[0].clientY;
        }
    }, { passive: false });
    // --- LOGO & BOUTON ANIMATION ON SCROLL ---
    const header = document.querySelector("header");
    const logo = document.getElementById("main-logo");
    const startBtn = document.getElementById("start-btn");
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    const introText = document.getElementById("intro-text");

    let logoShrunk = false;
    let ignoreScroll = false;
    let alreadyScrolled = false;

    // Masque texte ET bouton au départ
    introText.classList.add("hidden");
    startBtn.classList.add("hidden");
    startBtn.classList.remove("visible");

    function onScrollLogo() {
        if (ignoreScroll || alreadyScrolled) return;
        if (window.scrollY > 5 && !logoShrunk) {
            header.classList.add("header-shrink");
            logo.classList.add("logo-shrink");
            logoShrunk = true;
            alreadyScrolled = true;
            if (scrollIndicator) scrollIndicator.style.opacity = 0;
            setTimeout(() => {
                introText.classList.remove("hidden");
                startBtn.classList.remove("hidden");
                startBtn.classList.add("visible");
            }, 400);
            window.removeEventListener("scroll", onScrollLogo);
        }
    }
    window.addEventListener("scroll", onScrollLogo);

    // Affiche le contenu si déjà scrollé (ex: refresh milieu page)
    if (window.scrollY > 5) {
        header.classList.add("header-shrink");
        logo.classList.add("logo-shrink");
        if (scrollIndicator) scrollIndicator.style.opacity = 0;
        setTimeout(() => {
            introText.classList.remove("hidden");
            startBtn.classList.remove("hidden");
            startBtn.classList.add("visible");
        }, 200);
        logoShrunk = true;
        alreadyScrolled = true;
        window.removeEventListener("scroll", onScrollLogo);
    }

    // === LOGIQUE DES JEUX ===
    document.getElementById("start-btn").addEventListener("click", function() {
        document.getElementById('start-section').classList.add('hidden');
        document.getElementById('game-section').classList.remove('hidden');
        document.getElementById('game-section').innerHTML = `<div id="mini-game-1"></div>`;
        cin1_1();
    });


    // === MINI-JEU 1 ===
    function nv1_1() {
        const pairs = [
            { baby: "👶", mom: "👩" },
            { baby: "👶🏻", mom: "👩🏻" },
            { baby: "👶🏾", mom: "👩🏾" },
            { baby: "👶🏿", mom: "👩🏿" },
        ];
        const errorMessages = [
            "S'il te plaît, fais un effort...",
            "Il y a des indices de couleur, au cas où hein...",
            "Quelle surprise...",
        ];
        const section = document.getElementById('mini-game-1');
        section.innerHTML = `
            <div class="game-instructions">
                <h2>Niveau 1 - La naissance</h2>
                <p>Aide l'infirmière à remettre chaque bébé à sa maman !<br>Relies chaque bébé à sa mère 👶</p>
            </div>
            <div id="baby-game-area">
                <div class="moms-row">
                    ${shuffle(pairs).map((p) => `<div class="mom-emoji" data-mom="${pairs.indexOf(p)}">${p.mom}</div>`).join('')}
                </div>
                <canvas class="connection-canvas"></canvas>
                <div class="babies-row">
                    ${pairs.map((p, i) => `<div class="baby-emoji" data-baby="${i}">${p.baby}</div>`).join('')}
                </div>
                <div class="error-msg"></div>
            </div>
            <div class="success-msg">Bravo, tu as relié tous les bébés !</div>
            <div class="next-msg" style="display:none;">Mais... où est Manel ?</div>
            <div class="next-game-link" style="display:none;">Tentes l'autre chambre ></div>
        `;
        setupGameLogic(section, pairs, errorMessages, nv1_2);
    }

    // === MINI-JEU 2 ===
    function nv1_2() {
        const pairs = [
            { baby: "👶🏽", mom: "👩🏽" },
            { baby: "👶🏼", mom: "👩🏼" },
            { baby: "👶🏾", mom: "👩🏻" },
            { baby: "👶🏻", mom: "👩🏾" },
        ];
        const errorMessages = [
            "Quelque chose contre le métissage ?",
            "On est en 2025 hein, il faut se mettre à jour...",
            "L'amour est aveugle",
        ];
        const section = document.getElementById('mini-game-1');
        section.innerHTML = `
            <div class="game-instructions">
                <h2>Niveau 1 - La naissance</h2>
                <p>L'infirmière s'est encore gourée dans les bébés...</p>
            </div>
            <div id="baby-game-area">
                <div class="moms-row">
                    ${shuffle(pairs).map((p) => `<div class="mom-emoji" data-mom="${pairs.indexOf(p)}">${p.mom}</div>`).join('')}
                </div>
                <canvas class="connection-canvas"></canvas>
                <div class="babies-row">
                    ${pairs.map((p, i) => `<div class="baby-emoji" data-baby="${i}">${p.baby}</div>`).join('')}
                </div>
                <div class="error-msg"></div>
            </div>
            <div class="success-msg">Bravo, ces enfants sont avec leurs mamans !</div>
            <div class="next-msg" style="display:none;">Toujours aucune trace de Manel...</div>
            <div class="next-game-link" style="display:none;">Dernière chambre ></div>
        `;
        setupGameLogic(section, pairs, errorMessages, nv1_3);
    }

    // === MINI-JEU 3 ===
    function nv1_3() {
        const pairs = [
            { baby: "🤓", mom: "👩🏽" },
            { baby: "👶🏼", mom: "👩🏼" },
            { baby: "👶🏾", mom: "👱‍♂️" },
            { baby: "👶🏻", mom: "👩🏾" },
        ];
        const errorMessages = [
            "On ne reconnait pas sa maman ?",
            "On ne juge pas !",
            "La honte...",
        ];
        const section = document.getElementById('mini-game-1');
        section.innerHTML = `
            <div class="game-instructions">
                <h2>Niveau 1 - La naissance</h2>
                <p>L'infirmière s'est encore gourée dans les bébés...</p>
            </div>
            <div id="baby-game-area">
                <div class="moms-row">
                    ${shuffle(pairs).map((p) => `<div class="mom-emoji" data-mom="${pairs.indexOf(p)}">${p.mom}</div>`).join('')}
                </div>
                <canvas class="connection-canvas"></canvas>
                <div class="babies-row">
                    ${pairs.map((p, i) => `<div class="baby-emoji" data-baby="${i}">${p.baby}</div>`).join('')}
                </div>
                <div class="error-msg"></div>
            </div>
            <div class="success-msg">On a retrouvé Manel !</div>
            <div class="next-msg" style="display:none;">C'est quoi ces lunettes 🤣🤣🤣🤣🤣</div>
            <div class="next-game-link" style="display:none;">Continuer ></div>
        `;
        setupGameLogic(section, pairs, errorMessages, cin2_1);
    }

    // --- LOGIQUE GÉNÉRIQUE POUR UN MINI-JEU ---
    function setupGameLogic(section, pairs, errorMessages, nextGameCallback) {
        // Utilise le même shuffle pour chaque jeu
        function shuffle(arr) {
            return arr.map(x => [Math.random(), x])
                .sort((a, b) => a[0] - b[0])
                .map(x => x[1]);
        }
        let selectedBaby = null;
        let errorTimeout = null;
        let connections = {};
        const babies = Array.from(section.querySelectorAll('.baby-emoji'));
        const moms = Array.from(section.querySelectorAll('.mom-emoji'));
        const successMsg = section.querySelector('.success-msg');
        const errorMsg = section.querySelector('.error-msg');
        const canvas = section.querySelector('.connection-canvas');

        function showRandomError() {
            const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            errorMsg.textContent = msg;
            errorMsg.classList.add('visible');
        }

        function drawLine(baby, mom, color = "#0c8") {
            const area = document.getElementById('baby-game-area');
            const rect = area.getBoundingClientRect();
            canvas.width = area.offsetWidth;
            canvas.height = area.offsetHeight;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            Object.keys(connections).forEach(babyIdx => {
                const b = babies[babyIdx];
                const m = moms.find(momEl => momEl.dataset.mom === babyIdx);
                if (b && m) {
                    const bRect = b.getBoundingClientRect();
                    const mRect = m.getBoundingClientRect();
                    ctx.beginPath();
                    ctx.moveTo(bRect.left + bRect.width / 2 - rect.left,
                            bRect.top + bRect.height / 2 - rect.top);
                    ctx.lineTo(mRect.left + mRect.width / 2 - rect.left,
                            mRect.top + mRect.height / 2 - rect.top);
                    ctx.strokeStyle = "#0c8";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            });

            if (baby && mom) {
                const bRect = baby.getBoundingClientRect();
                const mRect = mom.getBoundingClientRect();
                ctx.beginPath();
                ctx.moveTo(bRect.left + bRect.width / 2 - rect.left,
                        bRect.top + bRect.height / 2 - rect.top);
                ctx.lineTo(mRect.left + mRect.width / 2 - rect.left,
                        mRect.top + mRect.height / 2 - rect.top);
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        }

        window.addEventListener('resize', () => drawLine());

        function handleBabySelect(e) {
            e.preventDefault();
            clearErrorState();
            babies.forEach(b => b.classList.remove('active'));
            moms.forEach(m => m.classList.remove('target'));
            if (!connections[e.currentTarget.dataset.baby]) {
                selectedBaby = e.currentTarget;
                selectedBaby.classList.add('active');
                moms.forEach(m => m.classList.add('target'));
            }
        }

        function handleMomSelect(e) {
            e.preventDefault();
            if (!selectedBaby) return;
            clearErrorState();
            const babyIdx = selectedBaby.dataset.baby;
            const momIdx = e.currentTarget.dataset.mom;
            if (babyIdx === momIdx && !connections[babyIdx]) {
                connections[babyIdx] = true;
                selectedBaby.classList.add('connected');
                e.currentTarget.classList.add('connected');
                drawLine(selectedBaby, e.currentTarget, "#0c8");
                selectedBaby.classList.remove('active');
                moms.forEach(m => m.classList.remove('target'));
                selectedBaby = null;
                if (Object.keys(connections).length === pairs.length) {
                    setTimeout(() => {
                        successMsg.classList.add('visible');
                        section.querySelector('.next-msg').style.display = "block";
                        const nextLink = section.querySelector('.next-game-link');
                        nextLink.style.display = "block";
                        if (typeof nextGameCallback === "function") {
                            nextLink.onclick = () => {
                                section.innerHTML = ""; // clean
                                nextGameCallback();
                            };
                        } else {
                            nextLink.onclick = null;
                        }
                    }, 300);
                }
            } else {
                selectedBaby.classList.remove('active');
                e.currentTarget.classList.remove('active');
                selectedBaby.classList.add('error');
                e.currentTarget.classList.add('error');
                showRandomError();
                moms.forEach(m => m.classList.remove('target'));
                if (errorTimeout) clearTimeout(errorTimeout);
                errorTimeout = setTimeout(() => {
                    clearErrorState();
                }, 2000);
                selectedBaby = null;
            }
        }

        function clearErrorState() {
            babies.forEach(b => b.classList.remove('error', 'active'));
            moms.forEach(m => m.classList.remove('error', 'active', 'target'));
            errorMsg.classList.remove('visible');
            if (errorTimeout) {
                clearTimeout(errorTimeout);
                errorTimeout = null;
            }
        }

        successMsg.classList.remove('visible');

        babies.forEach(baby => {
            baby.addEventListener('click', handleBabySelect);
            baby.addEventListener('touchstart', handleBabySelect, { passive: false });
        });
        moms.forEach(mom => {
            mom.addEventListener('click', handleMomSelect);
            mom.addEventListener('touchstart', handleMomSelect, { passive: false });
        });
    }

    // Shuffle utility (hors scope setupGameLogic)
    function shuffle(arr) {
        return arr.map(x => [Math.random(), x])
            .sort((a, b) => a[0] - b[0])
            .map(x => x[1]);
    }

    // === MINI-JEU 2 ===
    // ============== NIVEAU 1 : Jongles ==============
    function nv2_1() {
        const header = document.querySelector("header");
        if (header) header.style.display = "";
        const footer = document.querySelector("footer");
        if (footer) footer.style.display = "";

        const container = document.getElementById("mini-game-1");
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
                <p>Comme pendant les détections, fais 20 jongles pour valider l'exo ! ⚽ <br>Cliques au bon moment pour jongler.</p>
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
        const header = document.querySelector("header");
        if (header) header.style.display = "";
        const footer = document.querySelector("footer");
        if (footer) footer.style.display = "";

        const container = document.getElementById("mini-game-1");
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
        const header = document.querySelector("header");
        if (header) header.style.display = "";
        const footer = document.querySelector("footer");
        if (footer) footer.style.display = "";

        const container = document.getElementById("mini-game-1");
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
                <h2>Niveau 2 - Football</h2>
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
            cin3_1();
        });

        resultats = [];
        updateCercles();
    }

    function nv3_1(containerId, imgUrl, onComplete) {
        const SIZE = 4;
        const PIECE_SIZE = 90; // px

        function shuffledOrder() {
            const arr = Array.from({length: SIZE*SIZE}, (_,i)=>i);
            for (let i = arr.length-1; i>0; i--) {
                const j = Math.floor(Math.random()*(i+1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        function renderGrid(order, solved) {
            return `
                <div class="game-instructions">
                    <h2>Niveau 3 - L'internat</h2>
                    <p>Résous le puzzle pour retrouver l'image ! <br>Glisses les pièces pour les déplacer 🧩</p>
                </div>
                <div id="puzzle-board" style="width:${PIECE_SIZE*SIZE}px;height:${PIECE_SIZE*SIZE}px;display:grid;grid-template-columns:repeat(${SIZE},1fr);grid-template-rows:repeat(${SIZE},1fr);gap:2px;user-select:none;margin:auto;position:relative;">
                    ${order.map((piece, idx) => {
                        const row = Math.floor(piece / SIZE);
                        const col = piece % SIZE;
                        return `
                            <div class="piece"
                                data-idx="${idx}"
                                data-piece="${piece}"
                                style="
                                    width:${PIECE_SIZE}px;height:${PIECE_SIZE}px;
                                    background-image:url('${imgUrl}');
                                    background-size:${PIECE_SIZE*SIZE}px ${PIECE_SIZE*SIZE}px;
                                    background-position:-${col*PIECE_SIZE}px -${row*PIECE_SIZE}px;
                                ">
                            </div>
                        `;
                    }).join('')}
                    ${solved ? `` : ""}
                </div>
                <div class="puzzle-success" style="display:${solved ? 'block':'none'};">Bravo, tu as résolu le puzzle ! 🎉</div>
                <div class="puzzle-next-msg" style="display:none;">Mais qui est ce beau-gosse ??</div>
                <div class="puzzle-next-link" style="display:none;cursor:pointer;">Casse-tête suivant &gt;</div>
            `;
        }

        let order = shuffledOrder();
        let solved = false;
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = renderGrid(order, solved);

        let draggingIdx = null;
        let highlightIdx = null;

        const board = () => container.querySelector("#puzzle-board");
        const pieces = () => Array.from(container.querySelectorAll(".piece"));

        function highlight(idx) {
            pieces().forEach((el, i) => {
                el.style.boxShadow = (i === idx) ? "0 0 0 4px #1d7c1d" : "";
            });
        }

        function isSolved() {
            return order.every((piece, idx) => piece === idx);
        }

        function onTouchStart(e) {
            e.preventDefault();
            const target = e.target.closest('.piece');
            if (!target) return;
            draggingIdx = Number(target.dataset.idx);
            highlightIdx = draggingIdx;
            highlight(highlightIdx);
        }

        function onTouchMove(e) {
            if (draggingIdx === null) return;
            let touch = e.touches ? e.touches[0] : e;
            const boardRect = board().getBoundingClientRect();
            const x = touch.clientX - boardRect.left;
            const y = touch.clientY - boardRect.top;
            if (x < 0 || y < 0 || x > PIECE_SIZE*SIZE || y > PIECE_SIZE*SIZE) return;
            const col = Math.floor(x / PIECE_SIZE);
            const row = Math.floor(y / PIECE_SIZE);
            const idx = row * SIZE + col;
            if (idx !== highlightIdx) {
                highlightIdx = idx;
                highlight(highlightIdx);
            }
        }

        function onTouchEnd(e) {
            if (draggingIdx === null || highlightIdx === null) {
            draggingIdx = null;
            highlightIdx = null;
            highlight(-1);
            return;
            }
            if (draggingIdx !== highlightIdx) {
            [order[draggingIdx], order[highlightIdx]] = [order[highlightIdx], order[draggingIdx]];
            solved = isSolved();
            container.innerHTML = renderGrid(order, solved);
            setupListeners();
            if (solved) {
                const nextMsg = container.querySelector('.puzzle-next-msg');
                if (nextMsg) nextMsg.style.display = "block";
                const nextLink = container.querySelector('.puzzle-next-link');
                if (nextLink) {
                nextLink.style.display = "block";
                nextLink.onclick = function() {
                    nv3_2(containerId, onComplete);
                }
                }
            }
            } else {
            highlight(-1);
            }
            draggingIdx = null;
            highlightIdx = null;
        }

        function setupListeners() {
            if (solved) return;
            const brd = board();
            brd.addEventListener("touchstart", onTouchStart, {passive:false});
            brd.addEventListener("touchmove", onTouchMove, {passive:false});
            brd.addEventListener("touchend", onTouchEnd, {passive:false});
            brd.addEventListener("mousedown", onTouchStart);
            brd.addEventListener("mousemove", onTouchMove);
            brd.addEventListener("mouseup", onTouchEnd);
        }

        setupListeners();
    }

    function nv3_2(containerId) {
        const ANSWER = "HAIZER";
        const WORD_LENGTH = ANSWER.length;
        const MAX_ATTEMPTS = 6;
        const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        let attempts = [];
        let currentAttempt = "";

        function getLetterStatus() {
            const status = {};
            attempts.forEach(attempt => {
                for (let i = 0; i < WORD_LENGTH; i++) {
                    const l = attempt.word[i];
                    if (!l) continue;
                    if (ANSWER[i] === l) {
                        status[l] = "green";
                    } else if (ANSWER.includes(l)) {
                        if (status[l] !== "green") status[l] = "orange";
                    } else {
                        if (!status[l]) status[l] = "red";
                    }
                }
            });
            return status;
        }

        function renderGrid() {
            const alphaRows = [
                ALPHABET.slice(0, 7),
                ALPHABET.slice(7, 14),
                ALPHABET.slice(14, 20),
                ALPHABET.slice(20, 26)
            ];
            return `
            <div class="nv3-2-center">
                <div class="game-instructions">
                    <h2>Niveau 3 - L'internat</h2>
                    <p>Sauras-tu deviner le mot ?<br>Infos : Verte = lettre bien placée, Orange = lettre mal placée & Rouge = lettre absente</p>
                </div>
                <div class="wordle-grid-outer">
                    <div class="wordle-grid">
                        ${Array.from({length: MAX_ATTEMPTS}).map((_, rowIdx) => {
                            const attempt = attempts[rowIdx] || {word: "", result: []};
                            let word = attempt.word.padEnd(WORD_LENGTH, "");
                            let result = attempt.result || [];
                            return `
                            <div class="wordle-row">
                                ${Array.from({length: WORD_LENGTH}).map((_, colIdx) => {
                                    let letter = word[colIdx] || "";
                                    let state = result[colIdx] || "";
                                    let classes = "wordle-cell";
                                    if (state) classes += " " + state;
                                    if (rowIdx === attempts.length && currentAttempt[colIdx]) classes += " current";
                                    return `
                                    <input maxlength="1" data-row="${rowIdx}" data-col="${colIdx}" value="${letter}" class="${classes}" autocomplete="off" />
                                    `;
                                }).join("")}
                            </div>
                            `;
                        }).join("")}
                    </div>
                </div>
                <div class="wordle-alphabet">
                    ${alphaRows.map(row => `
                    <div class="wordle-alphabet-row">
                        ${row.map(l => {
                            const status = getLetterStatus()[l] || "";
                            return `<div class="wordle-alpha${status ? " " + status : ""}">${l}</div>`;
                        }).join("")}
                    </div>
                    `).join("")}
                </div>
                <div class="wordle-success" style="display:none;">Comment t'as deviné ??</div>
                <div class="wordle-fail" style="display:none;">Trop nulle... tfacon je suis pas succeptible ça me fait rien......<b>La réponse c'était ${ANSWER}...</b></div>
                <div class="next-game-link" style="display:none;cursor:pointer;">Dernier casse-tête &gt;</div>
            </div>
            `;
        }

        function checkAttempt(word) {
            word = word.toUpperCase();
            let result = Array(WORD_LENGTH).fill("red");
            let answerArr = ANSWER.split("");
            let used = Array(WORD_LENGTH).fill(false);

            for (let i = 0; i < WORD_LENGTH; i++) {
                if (word[i] === ANSWER[i]) {
                    result[i] = "green";
                    used[i] = true;
                }
            }
            for (let i = 0; i < WORD_LENGTH; i++) {
                if (result[i] === "green") continue;
                let idx = answerArr.findIndex((l, j) => l === word[i] && !used[j]);
                if (idx !== -1) {
                    result[i] = "orange";
                    used[idx] = true;
                }
            }
            return result;
        }

        function focusNextInput(row, col) {
            const next = container.querySelector(`input[data-row="${row}"][data-col="${col+1}"]`);
            if (next) next.focus();
        }

        function focusPrevInput(row, col) {
            const prev = container.querySelector(`input[data-row="${row}"][data-col="${col-1}"]`);
            if (prev) prev.focus();
        }

        function setupListeners() {
            const row = attempts.length;
            for (let col = 0; col < WORD_LENGTH; col++) {
                const input = container.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                if (!input) continue;
                input.addEventListener("input", e => {
                    let v = input.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0,1);
                    input.value = v;
                    currentAttempt = currentAttempt.split("");
                    currentAttempt[col] = v;
                    currentAttempt = currentAttempt.join("").padEnd(WORD_LENGTH, "");
                    if (v && col < WORD_LENGTH-1) {
                        focusNextInput(row, col);
                    }
                });
                input.addEventListener("keydown", e => {
                    if (e.key === "Backspace" && !input.value && col > 0) {
                        focusPrevInput(row, col);
                    }
                    if (e.key === "Enter") {
                        submitAttempt();
                    }
                });
            }
            const firstEmpty = container.querySelector(`input[data-row="${row}"][data-col="0"]`);
            if (firstEmpty) firstEmpty.focus();
        }

        function submitAttempt() {
            if (currentAttempt.length !== WORD_LENGTH || !/^[A-Z]{6}$/.test(currentAttempt)) return;
            const result = checkAttempt(currentAttempt);
            attempts.push({word: currentAttempt, result});
            currentAttempt = "";
            render();
            if (result.every(r => r === "green")) {
                container.querySelector('.wordle-success').style.display = 'block';
                const nextLink = container.querySelector('.next-game-link');
                if (nextLink) {
                    nextLink.style.display = 'block';
                }
            } else if (attempts.length === MAX_ATTEMPTS) {
                container.querySelector('.wordle-fail').style.display = 'block';
                const nextLink = container.querySelector('.next-game-link');
                if (nextLink) {
                    nextLink.style.display = 'block';
                }
            }
            setupNextLink();
        }

        function setupNextLink() {
            const nextLink = container.querySelector('.next-game-link');
            if (nextLink) {
                nextLink.onclick = function() {
                    nv3_3(containerId);
                };
            }
        }

        function render() {
            container.innerHTML = renderGrid();
            setupListeners();
            setupNextLink();
        }

        const container = document.getElementById(containerId);
        if (!container) return;
        render();

        container.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                submitAttempt();
            }
        });
    }

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
                        cin4_1();
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

        // --- Affichage timer & objectifs (centré) ---
        const statusBar = document.createElement('div');
        statusBar.className = 'game-status-bar';
        statusBar.style.display = "flex";
        statusBar.style.justifyContent = "center";
        statusBar.style.alignItems = "center";
        statusBar.style.gap = "2.2em";
        statusBar.style.margin = "0 auto 10px auto";
        statusBar.style.fontSize = "1.3em";
        statusBar.style.textAlign = "center";
        statusBar.innerHTML = `
            <div id="timer-display" class="timer-display" style="text-align:center;">⏱️ 75s</div>
            <div id="objective-counter" class="objective-counter" style="text-align:center;">🚬 x <span id="collected-count">0</span>/12</div>
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
        const speed = 0.004;
        const speedBonus = 0.008;
        const speedMalus = 0.003;
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
        let maxTime = 80;
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

        // --- Mouvement principal (vitesse identique mobile/PC) ---
        let lastTimestamp = null;
        function movePlayer(ts) {
            if (timerEnded) return;
            if (lastTimestamp === null) lastTimestamp = ts || performance.now();
            const now = ts || performance.now();
            const dt = Math.min((now - lastTimestamp) / 16.6667, 2);
            lastTimestamp = now;

            let nextX = playerPos.x + joyDx * currentSpeed * dt;
            let nextY = playerPos.y + joyDy * currentSpeed * dt;
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
                lastTimestamp = null;
                requestAnimationFrame(movePlayer);
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
                        if (collected >= 12) {
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

            document.getElementById('success').style.display = 'none';
            document.getElementById('fail').style.display = 'none';

            if (victory) {
                document.getElementById('success').style.display = 'block';
                const nextBtn = document.getElementById('next-workshop-link');
                if (nextBtn) {
                    nextBtn.onclick = () => {
                        cin5_1();
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
                        lastTimestamp = null;
                        requestAnimationFrame(movePlayer);
                    };
                }
            }
        }

        // --- Démarrage du jeu ---
        renderMap('center');
        startTimer();
        requestAnimationFrame(movePlayer);
    }

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

    function cin1_1() {

        // Configuration des scènes
        const scenesConfig = {
            scene1: {
                backgroundImage: 'img/Chambre.png',
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
                backgroundImage: 'img/Chambre.png',
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
                    background-image: url('img/Hopital.png');
                    z-index: 1;
                    opacity: 1;
                    transform: scale(1);
                }
                .bg-chambre {
                    background-image: url('img/Chambre.png');
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
            nv1_1();
        }

        // Initialiser et lancer
        initScene();
        startCutscene();
    };
    function cin2_1() {
        // Configuration des scènes
        const scenesConfig = {
            scene1: {
                backgroundImage: 'img/Ecole.png', // Variable indépendante
                emojis: ['🤓', '👧🏽', '👧🏻', '👧🏿'],
                emojiPositions: [
                    { top: '65%', left: '30%', size: '4rem', rotation: '0deg' }, // 👧🏽
                    { top: '65%', left: '15%', size: '4rem', rotation: '0deg' }, // 🤓
                    { top: '70%', left: '50%', size: '4rem', rotation: '0deg' }, // 👧🏻
                    { top: '50%', left: '50%', size: '3rem', rotation: '0deg' }  // 👧🏿
                ],
                dialogues: [
                    {character: '🤓', text: 'Et là je lui dis...', duration: 1.5 },
                    {character: '🤓', text: 'QUOICOUBEH !!!!', duration: 1.5 },
                    {character: '👧🏽', text: 'HAHAHAHA 😂😂', duration: 1 },
                    {character: '👧🏻', text: 'HAHAAAAAAHA', duration: 1 },
                    {character: '👧🏽', text: 'HAHAHAHAHAHAHAHAH', duration: 1 },
                    {character: '👧🏽', text: 'T\'es trop drole Manel..', duration: 1.5 },
                    {character: '🤓', text: 'Je sais, je sais BABINKS CHAROO.', duration: 2 },
                    {character: '👧🏻', text: 'Tu fais quoi après les cours le M ?', duration: 2 },
                    {character: '🤓', text: 'Euh bah pas grand chose...', duration: 2 },
                    {character: '🤓', text: 'Pourquoi cela ma chère amie d\'école primaire ?', duration: 3 },
                    {character: '👧🏽', text: 'Pourquoi tu parles comme Macron ?', duration: 2 },
                    {character: '👧🏻', text: 'Il est pas connu encore on est en 2014.', duration: 3 },
                    {character: '👧🏽', text: 'Ah oui c\'est vrai on est juste des emojis dans un jeu là.', duration: 3 },
                    {character: '👧🏽', text: 'Manel si tu fais rien, on a le club de foot de *j\'ai oublié le nom de ta ville* qui organise un entrainement', duration: 4 },
                    {character: '👧🏽', text: 'Tu peux venir si tu veux jouer avec nous !', duration: 2 },
                    {character: '🤓', text: 'Ouai pourquoi pas..', duration: 2 },
                    {character: '🤓', text: 'On se voit là bas alors !', duration: 2 },
                ]
            },
            scene2: {
                backgroundImage: 'img/Terrain foot.png',
                emojis: ['🤓', '👧🏽', '👧🏻', '👨🏽‍🦲','⚽'],
                emojiPositions: [
                    { top: '60%', left: '30%', size: '4rem', rotation: '0deg' }, // 🤓
                    { top: '60%', left: '15%', size: '4rem', rotation: '0deg' }, // 👧🏽
                    { top: '70%', left: '20%', size: '4rem', rotation: '0deg' }, // 👧🏻
                    { top: '40%', left: '80%', size: '6rem', rotation: '0deg' }, // 👨🏽‍🦲
                    { top: '50%', left: '50%', size: '2rem', rotation: '0deg' }  // ⚽
                ],
                dialogues: [
                    { character: '👧🏽', text: 'MANEEL !!!', duration: 1.5 },
                    { character: '👧🏽', text: 'T\'es venu !', duration: 1.5 },
                    { character: '🤓', text: 'Bah ouai Moray, j\'avais dis que j\'allais venir', duration: 3 },
                    { character: '👧🏻', text: 'T\'as déjà joué au foot ?', duration: 1.5 },
                    { character: '🤓', text: 'Bien sur, je suis trop forte je vais vous montrer !', duration: 2 },
                    { character: '👧🏽', text: 'On a hâte de voir ça ! T\'as l\'air trop forte !', duration: 2.5 },
                    { character: '🤓', text: 'Tu suces a perte là..', duration: 2 },
                    { character: '👨🏽‍🦲', text: 'Allez rassemblement !', duration: 2 },
                    { character: '👧🏽', text: 'Allez vite les filles, allons voir l\'entraineur', duration: 3 },
                    { character: '👨🏽‍🦲', text: 'On va commencer l\'entrainement', duration: 2 },
                    { character: '👨🏽‍🦲', text: 'La nouvelle Manel, montres nous ce que tu sais faire !', duration: 3 },
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
                    <div class="transition-text">Plus tard, dans la soirée...</div>
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
                }, 1300);
                
                // Masquer le texte avant de continuer
                setTimeout(() => {
                    transitionText.classList.remove('visible');
                }, 3300);
                
                setTimeout(() => {
                    resolve();
                }, 4000);
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
            displayScene(scenesConfig.scene2);
            await fadeFromBlack();
            dialogManager.setDialogues(scenesConfig.scene2.dialogues);
            await dialogManager.play();
            // Fin de la cinématique
            console.log('Cinématique terminée. Transition vers le mini-jeu ou la scène suivante.');
            nv2_1();
        }

        // Initialiser et lancer
        initScene();
        startCutscene();

    };
    function cin3_1() {
        // Configuration des scènes
        const scenesConfig = {
            scene1: {
                backgroundImage: 'img/Maison.png',
                emojis: ['🤓', '👩🏽', '👦🏽', '👨🏽‍🦱','🐈'],
                emojiPositions: [
                    { top: '75%', left: '40%', size: '4rem', rotation: '0deg' }, // 🤓
                    { top: '70%', left: '60%', size: '6rem', rotation: '0deg' }, // 👩🏽
                    { top: '40%', left: '65%', size: '3rem', rotation: '0deg' }, // 👦🏽
                    { top: '40%', left: '80%', size: '3rem', rotation: '0deg' }, // 👨🏽‍🦱
                    { top: '31%', left: '70%', size: '3rem', rotation: '0deg' }  // 🐈
                ],
                dialogues: [
                    { character: '👩🏽', text: 'Manel, ma chérie j\'ai à te parler.', duration: 2 },
                    { character: '🤓', text: 'Ouaip, tac les infos asap, je suis busy là en gros', duration: 3 },
                    { character: '👩🏽', text: 'J\'ai pris une décision pour ton avenir..', duration: 2 },
                    { character: '👩🏽', text: 'Je pense que pour réussir, tu dois être dans un meilleur environnement', duration: 3.5},
                    { character: '👩🏽', text: 'Un environnement qui t\'empêchera d\'étaler ton caca sur les murs..', duration: 3},
                    { character: '👩🏽', text: 'Ou de boire l\'eau des toilettes', duration: 2},
                    { character: '🤓', text: 'Na3 Sheitan, tu me décris l\'enfer là !!', duration: 2 },
                    { character: '👩🏽', text: 'Je sais que c\'est dur pour toi...', duration: 2},
                    { character: '👩🏽', text: 'Mais tu iras terminer ta scolarité dans un internat', duration: 2.5},
                    { character: '🐈', text: 'MIAOU', duration: 1},
                    { character: '🤓', text: 'MAIS WHAT ? NO WAY ?! 😱😱', duration: 2 },
                    { character: '🤓', text: 'REGARDES BIEN MES LUNETTES..', duration: 2 },
                    { character: '🤓', text: 'JAMAIS', duration: 1 },
                    { character: '🤓', text: 'JE DIS BIEN', duration: 1 },
                    { character: '🤓', text: 'JAMAIS', duration: 1 },
                    { character: '🤓', text: 'JE N\'IRAI DANS UN INTER...', duration: 1.5 },
                ]
            },
            scene2: {
                backgroundImage: 'img/Internat.png',
                emojis: ['🤓','👧🏻', '👧🏿', '👧🏽'],
                emojiPositions: [
                    { top: '77%', left: '40%', size: '2.5rem', rotation: '0deg' }, // 🤓
                    { top: '80%', left: '10%', size: '3rem', rotation: '0deg' }, // 👧🏻
                    { top: '81%', left: '65%', size: '3rem', rotation: '0deg' }, // 👧🏿
                    { top: '81%', left: '80%', size: '3rem', rotation: '0deg' }, // 👧🏽
                ],
                dialogues: [
                    { character: '🤓', text: 'NAT....', duration: 1.5 },
                    { character: '🤓', text: '', duration: 1.5 },
                    { character: '🤓', text: 'Elle m\'a eu...', duration: 2 },
                    { character: '🤓', text: 'Mais bon, je vais pas me laisser abattre', duration: 2.5 },
                    { character: '🤓', text: 'Mon corps est peut etre dérrière des barreaux..', duration: 2.5 },
                    { character: '🤓', text: 'Mais mon esprit lui, est libre !', duration: 2 },
                    { character: '🤓', text: 'Heureusement que j\'ai pris avec moi ce livre de reflexion', duration: 2.5 },
                    { character: '🤓', text: 'Il va me permettre de passer le temps en apprenant !', duration: 2.5 },
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
                    <div class="transition-text">Plus tard, dans la soirée...</div>
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
                }, 1300);
                
                // Masquer le texte avant de continuer
                setTimeout(() => {
                    transitionText.classList.remove('visible');
                }, 3300);
                
                setTimeout(() => {
                    resolve();
                }, 4000);
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

            // --- CHANGEMENT DE BACKGROUND ---
            bgScene1.style.opacity = '0';
            bgScene2.style.opacity = '1';

            // --- SCENE 2 ---
            displayScene(scenesConfig.scene2);
            dialogManager.setDialogues(scenesConfig.scene2.dialogues);
            await dialogManager.play();
            // Fin de la cinématique
            console.log('Cinématique terminée. Transition vers le mini-jeu ou la scène suivante.');
            nv3_1("mini-game-1", "img/PP.jpg");
        }

        // Initialiser et lancer
        initScene();
        startCutscene();

    };

    function cin4_1() {
        // Configuration des scènes
        const scenesConfig = {
            scene1: {
                backgroundImage: 'img/Maison.png',
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
                backgroundImage: 'img/Maison.png',
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
            nv4("mini-game-1");
        }

        // Initialiser et lancer
        initScene();
        startCutscene();

    };

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
            nv5('mini-game-1', function(score) {
                console.log('Jeu terminé avec un score de:', score);
            });
        }

        // Initialiser et lancer
        initScene();
        startCutscene();

    };


});