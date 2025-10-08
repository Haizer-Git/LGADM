// cut-scene1.js

const dialogues = [
    "Bienvenue dans l'aventure !",
    "Tu es sur le point de découvrir un secret.",
    "Mais attention, chaque choix compte...",
    "Es-tu prêt à continuer ?",
    "Bonne chance !"
];

// Création du conteneur principal centré
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100vw';
container.style.height = '100vh';
container.style.display = 'flex';
container.style.alignItems = 'center';
container.style.justifyContent = 'center';
container.style.pointerEvents = 'none'; // Pour ne pas bloquer les interactions

// Création de la boîte de dialogue
const dialogueBox = document.createElement('div');
dialogueBox.style.background = 'rgba(30,30,30,0.95)';
dialogueBox.style.color = '#fff';
dialogueBox.style.padding = '24px 32px';
dialogueBox.style.borderRadius = '16px';
dialogueBox.style.minWidth = '400px';
dialogueBox.style.fontSize = '1.2rem';
dialogueBox.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
dialogueBox.style.maxHeight = '160px';
dialogueBox.style.overflowY = 'auto';
dialogueBox.style.display = 'flex';
dialogueBox.style.flexDirection = 'column';
dialogueBox.style.gap = '12px';
dialogueBox.style.transition = 'max-height 0.4s';
dialogueBox.style.pointerEvents = 'auto';

container.appendChild(dialogueBox);
document.body.appendChild(container);

let current = 0;

function showNextDialogue() {
    if (current < dialogues.length) {
        // Détermine le côté du message : pair = gauche, impair = droite
        const isLeft = current % 2 === 0;
        const msgWrapper = document.createElement('div');
        msgWrapper.style.display = 'flex';
        msgWrapper.style.justifyContent = isLeft ? 'flex-start' : 'flex-end';

        const msg = document.createElement('div');
        msg.textContent = dialogues[current];
        msg.style.opacity = 0;
        msg.style.transition = 'opacity 0.5s';
        msg.style.maxWidth = '70%';
        msg.style.padding = '10px 18px';
        msg.style.borderRadius = '18px';
        msg.style.background = isLeft ? '#444' : '#1976d2';
        msg.style.color = isLeft ? '#fff' : '#fff';
        msg.style.alignSelf = isLeft ? 'flex-start' : 'flex-end';
        msg.style.marginLeft = isLeft ? '0' : '40px';
        msg.style.marginRight = isLeft ? '40px' : '0';

        msgWrapper.appendChild(msg);
        dialogueBox.appendChild(msgWrapper);

        setTimeout(() => { msg.style.opacity = 1; }, 50);

        // À partir du 3ème message, effet de scroll pour suivre le dernier
        if (current >= 2) {
            setTimeout(() => {
                dialogueBox.scrollTop = dialogueBox.scrollHeight;
            }, 60);
        }

        current++;
        setTimeout(showNextDialogue, 2000);
    }
}

// // Augmente la hauteur de la fenêtre de dialogue
// --- CINEMATIQUE : Deux emojis se font face et discutent via des bulles type manga/bd ---

// 1. On augmente la hauteur de la fenêtre de dialogue
dialogueBox.style.maxHeight = '420px';

// 2. Création de la scène principale (deux emojis face à face)
const sceneContainer = document.createElement('div');
sceneContainer.style.position = 'relative';
sceneContainer.style.height = '180px';
sceneContainer.style.marginBottom = '24px';
sceneContainer.style.overflow = 'hidden';

// Emoji personnage gauche
const leftChar = document.createElement('span');
leftChar.textContent = '🦸‍♂️';
leftChar.style.position = 'absolute';
leftChar.style.left = '30px';
leftChar.style.bottom = '0px';
leftChar.style.fontSize = '5rem';
leftChar.style.transition = 'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)';

// Emoji personnage droite
const rightChar = document.createElement('span');
rightChar.textContent = '🦹‍♀️';
rightChar.style.position = 'absolute';
rightChar.style.right = '30px';
rightChar.style.bottom = '0px';
rightChar.style.fontSize = '5rem';
rightChar.style.transition = 'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)';

// Bulle de dialogue gauche
const leftBubble = document.createElement('div');
leftBubble.style.position = 'absolute';
leftBubble.style.left = '110px';
leftBubble.style.bottom = '90px';
leftBubble.style.maxWidth = '180px';
leftBubble.style.background = '#fff';
leftBubble.style.color = '#222';
leftBubble.style.borderRadius = '18px 18px 18px 0';
leftBubble.style.padding = '12px 18px';
leftBubble.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
leftBubble.style.opacity = '0';
leftBubble.style.transition = 'opacity 0.4s';

// Bulle de dialogue droite
const rightBubble = document.createElement('div');
rightBubble.style.position = 'absolute';
rightBubble.style.right = '110px';
rightBubble.style.bottom = '90px';
rightBubble.style.maxWidth = '180px';
rightBubble.style.background = '#fff';
rightBubble.style.color = '#222';
rightBubble.style.borderRadius = '18px 18px 0 18px';
rightBubble.style.padding = '12px 18px';
rightBubble.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
rightBubble.style.opacity = '0';
rightBubble.style.transition = 'opacity 0.4s';

sceneContainer.appendChild(leftChar);
sceneContainer.appendChild(rightChar);
sceneContainer.appendChild(leftBubble);
sceneContainer.appendChild(rightBubble);
dialogueBox.insertBefore(sceneContainer, dialogueBox.firstChild);

// 3. Animation simple : petit effet rebond sur chaque emoji quand il parle
function bounce(char) {
    char.style.transform = 'translateY(-18px)';
    setTimeout(() => {
        char.style.transform = 'translateY(0)';
    }, 220);
}

// 4. Affichage des dialogues façon manga/bd
const mangaDialogues = [
    { side: 'left', text: "Salut ! Tu es prêt pour l'aventure ?" },
    { side: 'right', text: "Toujours prêt ! On y va ensemble ?" },
    { side: 'left', text: "Bien sûr, mais attention aux surprises..." },
    { side: 'right', text: "Je n'ai peur de rien !" },
    { side: 'left', text: "Alors, en route !" }
];

let mangaStep = 0;
function showMangaDialogue() {
    if (mangaStep >= mangaDialogues.length) {
        // Fin de la scène, on efface et lance la suite (SMS)
        sceneContainer.style.opacity = '0';
        setTimeout(() => {
            sceneContainer.style.display = 'none';
            showNextDialogue();
        }, 400);
        return;
    }
    const { side, text } = mangaDialogues[mangaStep];
    if (side === 'left') {
        leftBubble.textContent = text;
        leftBubble.style.opacity = '1';
        rightBubble.style.opacity = '0';
        bounce(leftChar);
    } else {
        rightBubble.textContent = text;
        rightBubble.style.opacity = '1';
        leftBubble.style.opacity = '0';
        bounce(rightChar);
    }
    mangaStep++;
    setTimeout(showMangaDialogue, 2000);
}

// 5. Conversation SMS (réutilise la fonction existante)
function showNextDialogue() {
    if (current < dialogues.length) {
        // Style SMS classique (gauche/droite)
        const isLeft = current % 2 === 0;
        const msgWrapper = document.createElement('div');
        msgWrapper.style.display = 'flex';
        msgWrapper.style.justifyContent = isLeft ? 'flex-start' : 'flex-end';

        const msg = document.createElement('div');
        msg.textContent = dialogues[current];
        msg.style.opacity = 0;
        msg.style.transition = 'opacity 0.5s';
        msg.style.maxWidth = '70%';
        msg.style.padding = '10px 18px';
        msg.style.borderRadius = '18px';
        msg.style.background = isLeft ? '#444' : '#1976d2';
        msg.style.color = isLeft ? '#fff' : '#fff';
        msg.style.alignSelf = isLeft ? 'flex-start' : 'flex-end';
        msg.style.marginLeft = isLeft ? '0' : '40px';
        msg.style.marginRight = isLeft ? '40px' : '0';

        msgWrapper.appendChild(msg);
        dialogueBox.appendChild(msgWrapper);

        setTimeout(() => { msg.style.opacity = 1; }, 50);

        // À partir du 3ème message, effet de scroll pour suivre le dernier
        if (current >= 2) {
            setTimeout(() => {
                dialogueBox.scrollTop = dialogueBox.scrollHeight;
            }, 60);
        }

        current++;
        setTimeout(showNextDialogue, 2000);
    }
}

// Lancement de la cinématique manga/bd
showMangaDialogue();
