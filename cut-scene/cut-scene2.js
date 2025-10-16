function nv5(containerId) { // onFail n'est plus nécessaire ici
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
        // (Styles de la zone de jeu inchangés...)
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

        // --- Score ---
        const scoreBar = document.createElement('div');
        scoreBar.id = 'enemy-invasion-score';
        scoreBar.style.textAlign = "center";
        scoreBar.style.fontSize = "1.2em";
        scoreBar.style.marginTop = "8px";
        section.appendChild(scoreBar);

        // --- Joueur ---
        const player = document.createElement('div');
        player.id = 'enemy-invasion-player';
        player.style.position = 'absolute';
        player.style.bottom = '8px';
        player.style.left = '50%';
        player.style.transform = 'translateX(-50%)';
        player.style.fontSize = '2.5em';
        player.textContent = '🤓';
        gameArea.appendChild(player);

        // --- Paramètres du jeu (inchangés) ---
        let score = 0;
        let enemies = [];
        let enemyId = 0;
        let gameRunning = true;
        let nextSpawnTimeout = null;
        let speedBase = 2.5;
        let speedMin = 0.75;
        
        // Fonctions getEnemySpeed, getEnemiesPerSpawn, getSpawnInterval (inchangées)
        function getEnemySpeed() { return Math.max(speedBase - Math.floor(score / 8) * 0.28, speedMin); }
        function getEnemiesPerSpawn() {
            if (score < 10) return 1; if (score < 20) return 2; if (score < 35) return 3; if (score < 55) return 4; return 5;
        }
        function getSpawnInterval() { return Math.max(1600 - score * 30, 550); }

        // --- Génère et lance des ennemis (inchangé) ---
        function spawnEnemies() {
            if (!gameRunning) return;
            const count = getEnemiesPerSpawn();
            for (let i = 0; i < count; i++) {
                const enemy = document.createElement('div');
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
                img.src = 'img/PP.jpg';
                img.alt = 'Fidelia';
                img.style.width = '1em';
                img.style.height = '1em';
                img.style.borderRadius = '50%';
                enemy.appendChild(img);

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
                void enemy.offsetWidth; // Force reflow
                setTimeout(() => { enemy.style.top = `calc(100% - 56px)`; }, 10);
                enemies.push(enemy);

                setTimeout(() => {
                    if (!enemy.parentNode || !gameRunning) return;
                    triggerFail();
                }, travelSecs * 1000 - 100);
            }
            if (gameRunning) {
                nextSpawnTimeout = setTimeout(spawnEnemies, getSpawnInterval());
            }
        }

        function updateScore() {
            scoreBar.innerHTML = `Tu as résisté à <b>${score}</b> disquettes`;
        }

        // ▼▼▼ C'EST ICI LA MODIFICATION PRINCIPALE ▼▼▼
        function triggerFail() {
            if (!gameRunning) return;
            gameRunning = false; // Arrête toute la logique du jeu

            // Arrête les timers pour ne pas créer de nouveaux ennemis
            if (nextSpawnTimeout) clearTimeout(nextSpawnTimeout);
            
            // Vide complètement le conteneur du jeu
            section.innerHTML = '';
            
            // Lance la scène de fin dans ce même conteneur
            // La configuration par défaut de playEndScene ("Perdu...", "🤓", "Rejouer") est parfaite ici.
            playEndScene(containerId);
        }
        // ▲▲▲ FIN DE LA MODIFICATION ▲▲▲
        
        // --- Lancement du jeu ---
        updateScore();
        spawnEnemies();
    }












function playEndScene(containerId = 'mini-game-1') {
    // --- Configuration de la scène ---
    const config = {
        emoji: '🤓',
        text: 'The End <br> *La fin',
        buttonText: 'Continuer'
    };

    // --- Styles CSS ---
    // On injecte les styles une seule fois pour éviter les doublons.
    if (!document.getElementById('end-scene-style')) {
        const style = document.createElement('style');
        style.id = 'end-scene-style';
        style.textContent = `
            .cutscene-container {
                position: relative;
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                background: black;
                
                /* Utilisation de Flexbox pour centrer le contenu */
                display: flex;
                flex-direction: column; /* Aligner les éléments verticalement */
                justify-content: center; /* Centrer verticalement */
                align-items: center;     /* Centrer horizontalement */
                gap: 2rem; /* Espace entre les éléments */
            }

            .end-scene-text {
                font-size: 4rem;
                color: white;
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
                opacity: 0;
                animation: fadeIn 2s forwards; /* Animation de fondu */
                text-align: center;
            }

            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }

            .end-scene-emoji {
                font-size: 8rem; /* Grande taille pour l'emoji */
                user-select: none;
                animation: fadeIn 2s 0.5s forwards; /* Apparition après le texte */
                opacity: 0;
            }

            .end-scene-button {
                padding: 12px 25px;
                font-size: 1.2rem;
                background: white;
                color: black;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: transform 0.2s ease, background-color 0.2s;
                animation: fadeIn 2s 1s forwards; /* Apparition en dernier */
                opacity: 0;
            }
            
            .end-scene-button:hover {
                transform: scale(1.05);
                background-color: #f0f0f0;
            }
        `;
        document.head.appendChild(style);
    }

    // --- Rendu de la scène ---
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`L'élément avec l'ID '${containerId}' n'a pas été trouvé.`);
        return;
    }

    // Création de la structure HTML directement
    container.innerHTML = `
        <div class="cutscene-container">
            <div class="end-scene-text">${config.text}</div>
            <div class="end-scene-emoji">${config.emoji}</div>
            <button class="end-scene-button">${config.buttonText}</button>
        </div>
    `;

    // --- Ajout de l'interactivité ---
    const button = container.querySelector('.end-scene-button');
    button.addEventListener('click', () => {
        // Mettez ici l'action souhaitée (ex: recharger la page, cacher la scène)
        // Appelle la fonction pour créer le formulaire dans la div avec l'ID "mon-formulaire"
// et utilise votre endpoint Formspree.
        createDynamicForm('mini-game-1', 'mgvnzvny');
        // Par exemple, pour recharger la page :
        // window.location.reload(); 
    });
}

// --- Appel de la fonction pour afficher la scène ---
nv5('mini-game-1'); // Remplacez 'mini-game-1' par l'ID de votre conteneur HTML si nécessaire


/**
 * Crée et affiche un formulaire dynamique basé sur une configuration de questions.
 * @param {string} containerId - L'ID de l'élément HTML où le formulaire doit être injecté.
 * @param {string} formspreeId - Votre identifiant de formulaire Formspree.
 */
function createDynamicForm(containerId = 'mini-game-1', formspreeId = 'mgvnzvny') {

    // --- CONFIGURATION ---
    // (Copiez la nouvelle configuration vue à l'étape 1 ici)
    const config = {
        formTitle: "Fin de Jeu - Questionnaire",
        questions: [
            {
                type: 'radio',
                label: 'C\'était drôle/divertissant ?',
                name: 'drôle/divertissant',
                required: true,
                options: ['Oui', 'Non']
            },
            {
                type: 'radio',
                label: 'T\'as découvert des choses sur ta vie ?',
                name: 'decouverte_vie',
                required: true,
                options: ['Oui', 'Non']
            },
            {
                type: 'ratingScale', // Le nouveau type de question
                label: 'Une note sur 10 ?',
                name: 'note', // L'attribut "name"
                required: true,
                options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // La liste des nombres à afficher
            },
            {
                type: 'text',
                label: 'Des choses a ajouter sur le jeu ?',
                name: 'comments',
                required: false
            },
            {
                type: 'conditionalRadio',
                label: 'Est-ce que j\'ai remérité ton snap ? 😁',
                name: 'assistance',
                required: true,
                conditionalQuestion: { 
                    type: 'text',
                    label: 'Redonnes le moi stp, je l\'ai plus du coup...',
                    name: 'details_assistance',
                    required: true
                }
            }
        ],
        submitButtonText: "Envoyer",
        successMessage: "Saha, j'ai bien reçu les réponses.",
        errorMessage: "❌ Une erreur est survenue. Veuillez réessayer."
    };


    // --- STYLES CSS (inchangés) ---
    if (!document.getElementById('dynamic-form-style')) {
        const style = document.createElement('style');
        style.id = 'dynamic-form-style';
        style.textContent = `
            .form-wrapper { max-width: 500px; margin: 2rem auto; padding: 2rem; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: sans-serif; }
            .form-wrapper h2 { text-align: center; margin-top: 0; }
            .form-group { margin-bottom: 1.5rem; }
            .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #333; }
            .radio-group { display: flex; flex-direction: column; gap: 0.75rem; }
            .radio-group label { font-weight: normal; display: flex; align-items: center; gap: 0.5rem; }
            .conditional-input-container { display: none; margin-top: 1rem; }
            .conditional-input-container.visible { display: block; }
            .form-wrapper input[type="text"] { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
            .submit-btn { width: 100%; padding: 0.8rem; font-size: 1rem; color: white; background-color: #007bff; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.2s; }
            .submit-btn:hover { background-color: #0056b3; }
            .submit-btn:disabled { background-color: #cccccc; cursor: not-allowed; }
            .form-status { margin-top: 1rem; text-align: center; font-weight: bold; }
        `;
        document.head.appendChild(style);
    }

    // --- CONSTRUCTION DU HTML ---
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`L'élément avec l'ID '${containerId}' n'a pas été trouvé.`);
        return;
    }
    
    // Génère le HTML pour une seule question
    function createQuestionHtml(question) {
        const requiredAttr = question.required ? 'required' : '';
        let html = `<div class="form-group">`;
        html += `<label for="${question.name}">${question.label}</label>`;

        switch (question.type) {
            case 'text':
                html += `<input type="text" id="${question.name}" name="${question.name}" ${requiredAttr}>`;
                break;

            case 'radio':
                html += `<div class="radio-group">`;
                question.options.forEach(option => {
                    html += `<label>
                        <input type="radio" name="${question.name}" value="${option}" ${requiredAttr}> ${option}
                    </label>`;
                });
                html += `</div>`;
                break;
                
            case 'conditionalRadio':
                html += `
                    <div class="radio-group" data-conditional-name="${question.conditionalQuestion.name}">
                        <label>
                            <input type="radio" name="${question.name}" value="oui" ${requiredAttr}> Oui
                        </label>
                        <label>
                            <input type="radio" name="${question.name}" value="non" ${requiredAttr}> Non
                        </label>
                    </div>
                    <div id="container-${question.conditionalQuestion.name}" class="conditional-input-container">
                        <div class="form-group">
                            <label for="${question.conditionalQuestion.name}">${question.conditionalQuestion.label}</label>
                            <input type="text" id="${question.conditionalQuestion.name}" name="${question.conditionalQuestion.name}" ${question.conditionalQuestion.required ? 'required' : ''}>
                        </div>
                    </div>`;
                break;
            case 'ratingScale':
                html += `<select id="${question.name}" name="${question.name}" ${requiredAttr}>`;
                // Ajoute une première option vide et non sélectionnable
                html += `<option value="" disabled selected>-- Choisir une note --</option>`;
                question.options.forEach(option => {
                    html += `<option value="${option}">${option}</option>`;
                });
                html += `</select>`;
                break;
        }
        html += `</div>`;
        return html;
    }

    // Construit le formulaire complet en bouclant sur les questions
    const questionsHtml = config.questions.map(createQuestionHtml).join('');
    
    container.innerHTML = `
        <div class="form-wrapper">
            <form id="dynamic-form">
                <h2>${config.formTitle}</h2>
                ${questionsHtml}
                <button type="submit" class="submit-btn">${config.submitButtonText}</button>
                <div id="form-status" class="form-status"></div>
            </form>
        </div>
    `;

    // --- LOGIQUE JAVASCRIPT ---
    const form = document.getElementById('dynamic-form');

    // Gère l'affichage des champs conditionnels
    document.querySelectorAll('input[name="assistance"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const container = document.getElementById('container-details_assistance');
            const input = document.getElementById('details_assistance');
            if (event.target.value === 'oui') {
                container.classList.add('visible');
                input.required = true;
            } else {
                container.classList.remove('visible');
                input.required = false;
                input.value = '';
            }
        });
    });
    
    // Gère la soumission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = { _subject: `Nouvelle réponse - ${config.formTitle}` };
        
        // Transforme les données du formulaire pour Formspree
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        const statusDiv = document.getElementById('form-status');
        const submitButton = form.querySelector('.submit-btn');
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        fetch(`https://formspree.io/f/${formspreeId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                statusDiv.textContent = config.successMessage;
                statusDiv.style.color = 'green';
                form.reset();
                document.querySelectorAll('.conditional-input-container').forEach(c => c.classList.remove('visible'));
            } else { throw new Error('Erreur réseau'); }
        })
        .catch(() => {
            statusDiv.textContent = config.errorMessage;
            statusDiv.style.color = 'red';
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = config.submitButtonText;
        });
    });
}