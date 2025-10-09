function niv3_1(containerId, imgUrl, onComplete) {
    const SIZE = 2;
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
                ${solved ? `
                ` : ""}
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
                        if (typeof onComplete === "function") onComplete();
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

function niv3_2(containerId, onComplete) {
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
        <div class="niv3-2-center">
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
            <div class="wordle-success">Comment t'as deviné ??</div>
            <div class="wordle-next-link" style="display:none;cursor:pointer;">Dernier casse-tête &gt;</div>
            <div class="wordle-fail">Trop nulle... tfacon je suis pas succeptible ça me fait rien......<b>La réponse c'était ${ANSWER}...</b></div>
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
            const nextLink = container.querySelector('.wordle-next-link');
            if (nextLink) {
                nextLink.style.display = 'block';
                nextLink.onclick = function() {
                    if (typeof onComplete === "function") onComplete();
                }
            }
        } else if (attempts.length === MAX_ATTEMPTS) {
            container.querySelector('.wordle-fail').style.display = 'block';
        }
    }

    function render() {
        container.innerHTML = renderGrid();
        container.querySelector('.wordle-success').style.display = 'none';
        container.querySelector('.wordle-next-link').style.display = 'none';
        container.querySelector('.wordle-fail').style.display = 'none';
        setupListeners();
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

function niv3_3(containerId, onComplete) {
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
            q: "T'es heureuse dans la vie ?",
            options: [
                { text: "Oui - Heureuse et épanouie", msg: "Même à Strasbourg ??" },
                { text: "Plutôt oui", msg: "Bonne réponse ! (j'ai pas d'inspi là)" },
                { text: "Pas trop, mais il y a la santé", msg: "Plus pour longtemps 😈 (le mec qui dvient fou et menace)" },
                { text: "Non..", msg: "😭😢😢😢😭😢😿😿😢😭😢😢😭😢😿" }
            ]
        },
        {
            q: "La qualité la plus importante chez un homme ?",
            options: [
                { text: "Gentillesse", msg: "C'est la plus belle des qualités !" },
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
                ? `<div class="next-game-link">Continuer l'aventure &gt;</div>`
                : `<button type="button" class="quiz-next-btn">Question suivante</button>`
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

        // Hide feedback and next by default
        container.querySelector(".quiz-feedback").style.display = "none";
        if (current === QUESTIONS.length - 1) {
            container.querySelector(".next-game-link").style.display = "none";
        } else {
            container.querySelector(".quiz-next-btn").style.display = "none";
        }

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
                    sendAnswersAndContinue();
                });
            }
        } else {
            container.querySelector(".quiz-next-btn").addEventListener("click", function() {
                current++;
                if (current < QUESTIONS.length) {
                    renderQuestion();
                } else {
                    sendAnswersAndContinue();
                }
            });
        }
    }

    function sendAnswersAndContinue() {
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
        if (typeof onComplete === "function") {
            onComplete();
        }
    }

    renderQuestion();
}

// Lancement du mini-jeu 1, puis 2, puis 3 en séquence
niv3_1("mini-game-1", "/img/PP.jpg", function() {
    niv3_2("mini-game-1", function() {
        niv3_3("mini-game-1", function() {
            // Ici tu peux lancer la suite de l'aventure ou afficher un message final !
            // Par exemple : document.getElementById("mini-game-1").innerHTML = "<h2>Bravo, tu as fini tous les jeux !</h2>";
        });
    });
});