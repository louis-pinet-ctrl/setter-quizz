// Questions du quizz - Qui Veut Gagner des Millions : Spécial Setter
// Phase 1 : Warm-up - Culture générale canine
// Phase 2 : Spécial Setter

const QUESTIONS = [
    // ===== WARM-UP : Questions générales sur les chiens (5 questions) =====
    {
        question: "Quel est le sens le plus développé chez le chien ?",
        answers: ["La vue", "L'odorat", "L'ouïe", "Le toucher"],
        correct: 1,
        funFact: "Le chien possède environ 300 millions de récepteurs olfactifs, contre seulement 6 millions chez l'humain. Son odorat est 10 000 à 100 000 fois plus sensible que le nôtre !",
        phase: "warmup"
    },
    {
        question: "De quel animal le chien domestique descend-il principalement ?",
        answers: ["Le renard", "Le loup gris", "Le coyote", "Le chacal"],
        correct: 1,
        funFact: "La domestication du loup gris a commencé il y a environ 15 000 à 40 000 ans, faisant du chien le premier animal domestiqué par l'homme.",
        phase: "warmup"
    },
    {
        question: "Combien de dents possède un chien adulte ?",
        answers: ["28", "32", "42", "36"],
        correct: 2,
        funFact: "Le chien adulte a 42 dents : 12 incisives, 4 canines, 16 prémolaires et 10 molaires. Les chiots n'en ont que 28 !",
        phase: "warmup"
    },
    {
        question: "Que signifie quand un chien remue la queue vers la droite ?",
        answers: ["Il a peur", "Il est content et détendu", "Il est en alerte", "Il veut manger"],
        correct: 1,
        funFact: "Des études scientifiques ont montré que les chiens remuent la queue vers la droite quand ils sont heureux et vers la gauche quand ils sont anxieux. C'est lié aux hémisphères du cerveau !",
        phase: "warmup"
    },
    {
        question: "Quelle est la race de chien la plus ancienne encore existante ?",
        answers: ["Le Berger Allemand", "Le Basenji", "Le Labrador", "Le Caniche"],
        correct: 1,
        funFact: "Le Basenji, originaire d'Afrique centrale, est considéré comme l'une des races les plus anciennes. Il est représenté sur des artefacts égyptiens datant de 4 000 ans et il n'aboie pas : il yodle !",
        phase: "warmup"
    },

    // ===== SPÉCIAL SETTER (10 questions) =====
    {
        question: "De quel pays le Setter Irlandais (Irish Setter) est-il originaire ?",
        answers: ["L'Écosse", "L'Angleterre", "L'Irlande", "Le Pays de Galles"],
        correct: 2,
        funFact: "Le Setter Irlandais est né en Irlande au XVIIIe siècle. Son nom gaélique est « Madra rua » qui signifie « chien rouge » en référence à sa magnifique robe acajou.",
        phase: "setter"
    },
    {
        question: "D'où vient le nom « Setter » ?",
        answers: ["Du mot « set » signifiant « s'asseoir/se figer »", "Du nom d'un éleveur anglais", "Du mot « setter » signifiant « chasseur »", "D'un mot gaélique pour « rapide »"],
        correct: 0,
        funFact: "Le Setter tire son nom de sa technique de chasse : quand il repère du gibier à plumes, il se fige (« sets ») en position basse, parfois presque couché, pour indiquer l'emplacement du gibier au chasseur.",
        phase: "setter"
    },
    {
        question: "Combien existe-t-il de races de Setters officiellement reconnues ?",
        answers: ["2", "3", "4", "5"],
        correct: 2,
        funFact: "Il existe 4 races : le Setter Anglais, le Setter Irlandais (rouge), le Setter Irlandais Rouge et Blanc, et le Setter Gordon (écossais, noir et feu).",
        phase: "setter"
    },
    {
        question: "Quelle est la couleur caractéristique du Setter Gordon ?",
        answers: ["Blanc et orange", "Rouge acajou", "Noir et feu (noir et marron)", "Bleu belton"],
        correct: 2,
        funFact: "Le Setter Gordon, originaire d'Écosse, doit son nom au 4e Duc de Gordon qui a développé la race au château de Gordon au XVIIIe siècle. Sa robe noire et feu est unique parmi les Setters.",
        phase: "setter"
    },
    {
        question: "Pour quel type de chasse le Setter a-t-il été principalement développé ?",
        answers: ["La chasse au sanglier", "La chasse au gibier à plumes (perdrix, bécasses)", "La chasse au renard", "La chasse au cerf"],
        correct: 1,
        funFact: "Les Setters sont des chiens d'arrêt spécialisés dans la chasse aux oiseaux. Avant l'invention du fusil, ils travaillaient avec des filets : le chien se couchait et le chasseur lançait le filet par-dessus !",
        phase: "setter"
    },
    {
        question: "Quelle est l'espérance de vie moyenne d'un Setter Irlandais ?",
        answers: ["6-8 ans", "8-10 ans", "12-15 ans", "15-18 ans"],
        correct: 2,
        funFact: "Le Setter Irlandais vit en moyenne 12 à 15 ans, ce qui est remarquable pour un chien de grande taille. Le record est détenu par un Setter Irlandais australien qui a vécu 18 ans !",
        phase: "setter"
    },
    {
        question: "Quel président américain a eu un Setter Irlandais célèbre nommé « King Timahoe » ?",
        answers: ["John F. Kennedy", "Richard Nixon", "Ronald Reagan", "Harry Truman"],
        correct: 1,
        funFact: "Richard Nixon a reçu King Timahoe en cadeau en 1969. Le chien portait le nom du village irlandais d'où venait la famille de sa femme Pat. King Timahoe est devenu une célébrité de la Maison-Blanche !",
        phase: "setter"
    },
    {
        question: "Quelle particularité physique distingue le Setter Anglais des autres Setters ?",
        answers: ["Il est plus petit", "Son pelage « belton » (moucheté)", "Il a les oreilles plus courtes", "Il a la queue bouclée"],
        correct: 1,
        funFact: "Le terme « belton » est unique au Setter Anglais. Il désigne le moucheté de sa robe et vient du village de Belton dans le Northumberland. On parle de blue belton, orange belton, lemon belton...",
        phase: "setter"
    },
    {
        question: "Qui est considéré comme le « père » du Setter Anglais moderne ?",
        answers: ["Le Duc de Gordon", "Sir Edward Laverack", "Le Comte de Leicester", "Robert Leighton"],
        correct: 1,
        funFact: "Edward Laverack (1800-1877) a consacré 35 ans de sa vie à perfectionner le Setter Anglais par un programme de sélection rigoureux. La lignée « Laverack » est encore célèbre aujourd'hui.",
        phase: "setter"
    },
    {
        question: "Quelle est la vitesse de pointe approximative d'un Setter Irlandais en pleine course ?",
        answers: ["25 km/h", "35 km/h", "45 km/h", "55 km/h"],
        correct: 2,
        funFact: "Le Setter Irlandais peut atteindre environ 45 km/h grâce à sa morphologie élancée et ses longues pattes. C'est un athlète infatigable qui a besoin de beaucoup d'exercice quotidien !",
        phase: "setter"
    }
];

// Paliers de gains (style Qui Veut Gagner des Millions)
const PRIZE_LADDER = [
    "100 €",       // 1
    "200 €",       // 2
    "300 €",       // 3
    "500 €",       // 4
    "1 000 €",     // 5 - Palier
    "2 000 €",     // 6
    "4 000 €",     // 7
    "8 000 €",     // 8
    "16 000 €",    // 9
    "32 000 €",    // 10 - Palier
    "64 000 €",    // 11
    "125 000 €",   // 12
    "250 000 €",   // 13
    "500 000 €",   // 14
    "1 000 000 €"  // 15 - MILLION !
];

const MILESTONES = [4, 9, 14]; // indices des paliers de sécurité (1000€, 32000€, 1M€)
