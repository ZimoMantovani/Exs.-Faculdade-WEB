// Estado
let currentScreen = 'welcome';
let userName = '';
let currentQuestion = 1;

const quizQuestions = [
  {
    question: "Como você está se sentindo agora?",
    options: [
      "Animado e cheio de energia",
      "Querendo rir um pouco",
      "Com vontade de algo intenso",
      "Curioso e imaginativo"
    ]
  },
  {
    question: "Que tipo de história te atrai mais?",
    options: [
      "Aventuras épicas e heroicas",
      "Situações engraçadas e descontraídas",
      "Mistérios e suspense",
      "Dramas emocionantes"
    ]
  },
  {
    question: "Em que ambiente você gostaria de se encontrar?",
    options: [
      "Em uma galáxia distante",
      "No conforto de casa",
      "Em uma cidade sombria",
      "Em um local mágico"
    ]
  },
  {
    question: "Qual desses elementos mais te interessa?",
    options: [
      "Efeitos especiais impressionantes",
      "Diálogos engraçados",
      "Plot twists surpreendentes",
      "Desenvolvimento de personagens"
    ]
  },
  {
    question: "Como você prefere que um filme termine?",
    options: [
      "Com o herói salvando o dia",
      "Com todos rindo juntos",
      "Com uma revelação chocante",
      "Com uma mensagem profunda"
    ]
  },
  {
    question: "Qual seria o seu companheiro ideal para assistir?",
    options: [
      "Amigos que adoram ação",
      "Família ou pessoas próximas",
      "Sozinho para se concentrar",
      "Alguém para debater depois"
    ]
  }
];

const movies = [
  {
    title: "Guardiões da Galáxia",
    synopsis: "Um grupo improvável de heróis se une para salvar a galáxia de uma ameaça cósmica, misturando ação, humor e uma trilha sonora incrível dos anos 80.",
    poster: ""
  },
  {
    title: "Minha Mãe É Uma Peça",
    synopsis: "Uma comédia brasileira sobre uma dona de casa que usa seu humor único para lidar com os problemas familiares do dia a dia.",
    poster: ""
  },
  {
    title: "Pecadores",
    synopsis: "Pecadores é um thriller sobrenatural dirigido por Ryan Coogler, que segue irmãos gêmeos que retornam à sua cidade natal, apenas para confrontar forças malignas que ameaçam suas vidas e a comunidade.",
    poster: ""
  },
  {
    title: "Interestelar",
    synopsis: "Um filme épico sobre um pai que embarca em uma jornada espacial para salvar a humanidade, explorando temas de amor, tempo e sacrifício.",
    poster: ""
  }
];

// DOM
const screens = {
  welcome: document.getElementById('welcome-screen'),
  quiz: document.getElementById('quiz-screen'),
  result: document.getElementById('result-screen'),
  about: document.getElementById('about-screen'),
  contact: document.getElementById('contact-screen')
};

document.getElementById('nav-home').onclick = () => showScreen('welcome');
document.getElementById('nav-about').onclick = () => showScreen('about');
document.getElementById('nav-contact').onclick = () => showScreen('contact');

const nameInput = document.getElementById('user-name');
const startBtn = document.getElementById('start-quiz');
const restartBtn = document.getElementById('restart-quiz');
const questionNumberElem = document.getElementById('question-number');
const questionTextElem = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options-grid');
const userNameDisplay = document.getElementById('user-name-display');
const movieTitleElem = document.querySelector('.movie-title');
const synopsisTextElem = document.querySelector('.synopsis-text');
const posterImgElem = document.querySelector('.movie-poster');

// Funções
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  currentScreen = name;
}

function startQuiz() {
  userName = nameInput.value.trim();
  if (!userName) {
    alert('Digite seu nome para continuar!');
    return;
  }
  currentQuestion = 1;
  showQuestion();
  showScreen('quiz');
}

function showQuestion() {
  const total = quizQuestions.length;
  const q = quizQuestions[currentQuestion - 1];
  questionNumberElem.textContent = `Pergunta ${String(currentQuestion).padStart(2,'0')}/${String(total).padStart(2,'0')}`;
  questionTextElem.textContent = q.question;
  optionsContainer.innerHTML = '';
  q.options.forEach((opt,i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => nextQuestion();
    optionsContainer.appendChild(btn);
  });
}

function nextQuestion() {
  if (currentQuestion < quizQuestions.length) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const m = movies[Math.floor(Math.random()*movies.length)]; //Escolher aleatoriamente ainda
  userNameDisplay.textContent = userName;
  movieTitleElem.textContent = m.title;
  synopsisTextElem.textContent = m.synopsis;
  posterImgElem.src = m.poster;
  showScreen('result');
}

function restartQuiz() {
  nameInput.value = '';
  userName = '';
  showScreen('welcome');
}

// Eventos
startBtn.onclick = startQuiz;
restartBtn.onclick = restartQuiz;
nameInput.onkeypress = e => { if (e.key==='Enter') startQuiz(); };

// Início
showScreen('welcome');
