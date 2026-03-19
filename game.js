// Qui Veut Gagner des Millions - Spécial Setter
// Logique du jeu

let currentQuestion = 0;
let lifelines = { fiftyFifty: false, phone: false, audience: false };
let gameOver = false;
let eliminated5050 = [];

// Sons (optionnels)
const sounds = {
    correct: null,
    wrong: null,
    suspense: null
};

function startGame() {
    currentQuestion = 0;
    lifelines = { fiftyFifty: false, phone: false, audience: false };
    gameOver = false;
    eliminated5050 = [];

    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    document.getElementById('lifeline-5050').classList.remove('used');
    document.getElementById('lifeline-phone').classList.remove('used');
    document.getElementById('lifeline-audience').classList.remove('used');

    buildPrizeLadder();
    showQuestion();
}

function restartGame() {
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
}

function buildPrizeLadder() {
    const ladder = document.getElementById('prize-ladder');
    ladder.innerHTML = '';
    for (let i = PRIZE_LADDER.length - 1; i >= 0; i--) {
        const step = document.createElement('div');
        step.className = 'prize-step';
        step.id = `prize-step-${i}`;
        if (MILESTONES.includes(i)) step.classList.add('milestone');
        step.textContent = `${i + 1}. ${PRIZE_LADDER[i]}`;
        ladder.appendChild(step);
    }
    updatePrizeLadder();
}

function updatePrizeLadder() {
    for (let i = 0; i < PRIZE_LADDER.length; i++) {
        const step = document.getElementById(`prize-step-${i}`);
        step.classList.remove('current', 'done');
        if (i < currentQuestion) step.classList.add('done');
        if (i === currentQuestion) step.classList.add('current');
    }
}

function showQuestion() {
    if (currentQuestion >= QUESTIONS.length) {
        endGame(true);
        return;
    }

    const q = QUESTIONS[currentQuestion];
    eliminated5050 = [];

    // Phase badge
    const badge = document.getElementById('phase-badge');
    if (q.phase === 'warmup') {
        badge.textContent = '🐕 WARM-UP : CULTURE CANINE';
        badge.className = 'phase-badge';
    } else {
        badge.textContent = '🦊 SPÉCIAL SETTER';
        badge.className = 'phase-badge setter';
    }

    // Prix actuel
    document.getElementById('prize-current').textContent = PRIZE_LADDER[currentQuestion];

    // Numéro
    document.getElementById('question-number').textContent =
        `Question ${currentQuestion + 1} / ${QUESTIONS.length}`;

    // Question
    document.getElementById('question-text').textContent = q.question;

    // Réponses
    const grid = document.getElementById('answers-grid');
    grid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="letter">${letters[index]}:</span> ${answer}`;
        btn.onclick = () => selectAnswer(index);
        btn.id = `answer-${index}`;
        grid.appendChild(btn);
    });

    updatePrizeLadder();
}

function selectAnswer(index) {
    if (gameOver) return;

    const q = QUESTIONS[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');

    // Désactiver tous les boutons
    buttons.forEach(btn => btn.style.pointerEvents = 'none');

    // Marquer la sélection
    buttons[index].classList.add('selected');

    // Timer suspense puis révélation
    setTimeout(() => {
        if (index === q.correct) {
            // Bonne réponse !
            buttons[index].classList.remove('selected');
            buttons[index].classList.add('correct');

            setTimeout(() => {
                showFunFact(q.funFact, true);
            }, 800);
        } else {
            // Mauvaise réponse
            buttons[index].classList.remove('selected');
            buttons[index].classList.add('wrong');
            buttons[q.correct].classList.add('correct');

            setTimeout(() => {
                showFunFact(q.funFact, false);
            }, 800);
        }
    }, 1500);
}

function showFunFact(fact, isCorrect) {
    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    const emoji = isCorrect ? '✅' : '❌';
    const title = isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse !';
    const color = isCorrect ? '#4caf50' : '#f44336';

    content.innerHTML = `
        <h3 style="color: ${color};">${emoji} ${title}</h3>
        <div class="fun-fact">
            <strong>Le savais-tu ?</strong><br>
            ${fact}
        </div>
        <button class="close-modal" onclick="closeFunFact(${isCorrect})">
            ${isCorrect ? 'Question suivante ➜' : 'Voir le résultat'}
        </button>
    `;

    modal.classList.add('active');
}

function closeFunFact(wasCorrect) {
    document.getElementById('modal-overlay').classList.remove('active');

    if (wasCorrect) {
        currentQuestion++;
        showQuestion();
    } else {
        endGame(false);
    }
}

function endGame(won) {
    gameOver = true;
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    const content = document.getElementById('result-content');
    let prize = "0 €";
    let message = "";
    let emoji = "";

    if (won) {
        prize = "1 000 000 €";
        emoji = "🏆🐕";
        message = `Incroyable Alex ! Tu es un véritable expert des Setters et des chiens !<br>Tu remportes le million !`;
    } else {
        // Trouver le dernier palier de sécurité atteint
        let safeAmount = "0 €";
        for (let i = MILESTONES.length - 1; i >= 0; i--) {
            if (currentQuestion > MILESTONES[i]) {
                safeAmount = PRIZE_LADDER[MILESTONES[i]];
                break;
            }
        }
        prize = safeAmount;

        if (currentQuestion <= 4) {
            emoji = "🐶";
            message = `Pas mal Alex, mais il te reste des choses à apprendre sur nos amis à quatre pattes !<br>Tu repars avec <strong>${prize}</strong>.`;
        } else if (currentQuestion <= 9) {
            emoji = "🦮";
            message = `Bien joué Alex ! Tu connais déjà pas mal de choses sur les Setters !<br>Tu repars avec <strong>${prize}</strong>.`;
        } else {
            emoji = "🐕‍🦺";
            message = `Impressionnant Alex ! Tu es presque un spécialiste des Setters !<br>Tu repars avec <strong>${prize}</strong>.`;
        }
    }

    content.innerHTML = `
        <div class="dog-emoji">${emoji}</div>
        <h2>${won ? 'FÉLICITATIONS !' : 'FIN DE LA PARTIE'}</h2>
        <div class="final-prize">${prize}</div>
        <div class="result-message">${message}</div>
    `;
}

// ===== JOKERS =====

function use5050() {
    if (lifelines.fiftyFifty || gameOver) return;
    lifelines.fiftyFifty = true;
    document.getElementById('lifeline-5050').classList.add('used');

    const q = QUESTIONS[currentQuestion];
    const wrongAnswers = [];

    for (let i = 0; i < 4; i++) {
        if (i !== q.correct) wrongAnswers.push(i);
    }

    // Mélanger et en garder 2 à éliminer
    shuffleArray(wrongAnswers);
    eliminated5050 = [wrongAnswers[0], wrongAnswers[1]];

    eliminated5050.forEach(idx => {
        document.getElementById(`answer-${idx}`).classList.add('hidden-5050');
    });
}

function usePhone() {
    if (lifelines.phone || gameOver) return;
    lifelines.phone = true;
    document.getElementById('lifeline-phone').classList.add('used');

    const q = QUESTIONS[currentQuestion];
    const letters = ['A', 'B', 'C', 'D'];
    const correctLetter = letters[q.correct];

    // L'ami donne la bonne réponse avec 80% de certitude
    const confidence = Math.random() > 0.2;
    let suggestedLetter;

    if (confidence) {
        suggestedLetter = correctLetter;
    } else {
        const wrongLetters = letters.filter((_, i) => i !== q.correct && !eliminated5050.includes(i));
        suggestedLetter = wrongLetters[Math.floor(Math.random() * wrongLetters.length)] || correctLetter;
    }

    const friendNames = ["Bernard", "Michel", "Jean-Pierre", "Didier", "Gérard"];
    const friend = friendNames[Math.floor(Math.random() * friendNames.length)];
    const certainty = confidence ? "Je suis quasiment sûr" : "Je pense";

    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <h3>📞 Appel à un ami</h3>
        <p><em>Vous appelez votre ami <strong>${friend}</strong>...</em></p>
        <p style="margin-top: 15px; font-size: 1.2rem;">
            "Salut Alex ! Alors... ${certainty} que c'est la réponse <strong style="color: #ffd700;">${suggestedLetter}</strong>.
            ${confidence ? "C'est un sujet que je connais bien !" : "Mais je ne suis pas certain à 100%..."}"
        </p>
        <button class="close-modal" onclick="closeModal()">Merci ${friend} !</button>
    `;

    modal.classList.add('active');
}

function useAudience() {
    if (lifelines.audience || gameOver) return;
    lifelines.audience = true;
    document.getElementById('lifeline-audience').classList.add('used');

    const q = QUESTIONS[currentQuestion];
    const letters = ['A', 'B', 'C', 'D'];

    // Générer des pourcentages (le bon a le plus haut)
    let percentages = [0, 0, 0, 0];
    const correctPercent = 40 + Math.floor(Math.random() * 35); // 40-74%
    percentages[q.correct] = correctPercent;

    let remaining = 100 - correctPercent;
    for (let i = 0; i < 4; i++) {
        if (i === q.correct) continue;
        if (eliminated5050.includes(i)) {
            percentages[i] = 0;
            continue;
        }
        if (i === 3 || (i === 2 && !eliminated5050.includes(3))) {
            // Dernier non-éliminé
            const others = percentages.filter((_, idx) => idx !== q.correct && !eliminated5050.includes(idx) && idx > i);
            if (others.length === 0) {
                percentages[i] = remaining;
            } else {
                percentages[i] = Math.floor(Math.random() * remaining);
                remaining -= percentages[i];
            }
        } else {
            percentages[i] = Math.floor(Math.random() * remaining);
            remaining -= percentages[i];
        }
    }

    // S'assurer que le total fait 100
    const sum = percentages.reduce((a, b) => a + b, 0);
    if (sum !== 100) {
        percentages[q.correct] += (100 - sum);
    }

    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    const barsHtml = percentages.map((p, i) => `
        <div class="audience-bar">
            <div class="percent">${p}%</div>
            <div class="bar" style="height: ${p * 1.2}px;"></div>
            <div class="label">${letters[i]}</div>
        </div>
    `).join('');

    content.innerHTML = `
        <h3>👥 Avis du public</h3>
        <p>Le public a voté :</p>
        <div class="audience-bars">${barsHtml}</div>
        <button class="close-modal" onclick="closeModal()">Merci le public !</button>
    `;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

// Utilitaire
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
