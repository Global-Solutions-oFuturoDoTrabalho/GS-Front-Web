const slidesData = {
  mediador: [
    {title:"Descrição", text:"Profissional responsável por mediar decisões de sistemas de IA, garantindo transparência e justiça."},
    {title:"Habilidades", text:"Ética aplicada, entendimento de modelos, comunicação e revisão de viés."},
    {title:"Atuação", text:"Revisão de políticas, auditoria de decisões automatizadas, treinamento de equipes."}
  ],
  gemeo: [
    {title:"Descrição", text:"Cria modelos digitais que simulam máquinas, processos ou pessoas para monitoramento e testes."},
    {title:"Habilidades", text:"Modelagem, sensores virtuais, integração com IoT e análises preditivas."},
    {title:"Atuação", text:"Indústria 4.0, manutenção preditiva, simulação de cenários."}
  ],
  clima: [
    {title:"Descrição", text:"Profissional focado em reduzir riscos climáticos e adaptar infraestruturas."},
    {title:"Habilidades", text:"Planejamento urbano, análise de risco, políticas verdes e comunicação com comunidades."},
    {title:"Atuação", text:"Setor público, planejamento urbano, consultoria e infraestrutura."}
  ],
  imersao: [
    {title:"Descrição", text:"Cria cenários virtuais e experiências em AR/VR para educação, entretenimento e trabalho."},
    {title:"Habilidades", text:"Design de interação, modelagem 3D básica, roteirização e testes de usabilidade."},
    {title:"Atuação", text:"Agências, estúdios de jogos, empresas de treinamento e educação imersiva."}
  ],
  curador: [
    {title:"Descrição", text:"Seleciona, organiza e interpreta dados com foco em contexto humano."},
    {title:"Habilidades", text:"Visualização, storytelling, ética e comunicação com times não técnicos."},
    {title:"Atuação", text:"Times de produto, research e consultorias que transformam dados em ações."}
  ]
};
const state = {};

function initSlideshow(id){
  state[id] = {index:0};
  renderSlide(id);
}

function renderSlide(id){
  const slides = slidesData[id];
  if(!slides) return;
  const container = document.querySelector('.slideshow');
  if(!container) return;
  container.innerHTML = '';
  const slide = slides[state[id].index];
  const el = document.createElement('div');
  el.className = 'slide active';
  el.innerHTML = `<h3>${slide.title}</h3><p>${slide.text}</p>`;
  container.appendChild(el);
}

function nextSlide(id){
  if(!state[id]) return;
  const slides = slidesData[id];
  state[id].index = (state[id].index + 1) % slides.length;
  renderSlide(id);
}
function prevSlide(id){
  if(!state[id]) return;
  const slides = slidesData[id];
  state[id].index = (state[id].index - 1 + slides.length) % slides.length;
  renderSlide(id);
}
const quizQuestions = [
  {
    q:"Qual tecnologia está ligada à criação de conteúdo automático?",
    options:["Blockchain","IA generativa","Robótica tradicional"],
    answer:1
  },
  {
    q:"O que é um gêmeo digital?",
    options:["Um clone humano","Uma simulação digital de processo/objeto","Um tipo de sensor"],
    answer:1
  },
  {
    q:"Qual área foca em reduzir impactos climáticos locais?",
    options:["Marketing","Sustentação climática","Financeiro"],
    answer:1
  },
  {
    q:"AR/VR são usados principalmente para:",
    options:["Experiências imersivas","Coleta de impostos","Logística"],
    answer:0
  },
  {
    q:"Curadoria de dados se preocupa com:",
    options:["Organizar e dar contexto aos dados","Só colecionar dados","Construir hardware"],
    answer:0
  }
];

function loadQuiz(){
  const div = document.getElementById('quiz');
  if(!div) return;
  div.innerHTML = '';
  quizQuestions.forEach((item, idx) => {
    const box = document.createElement('div');
    box.className = 'quiz-item';
    box.innerHTML = `<p><strong>${idx+1}.</strong> ${item.q}</p>`;
    item.options.forEach((opt, i) => {
      const id = `q${idx}_opt${i}`;
      box.innerHTML += `<label><input type="radio" name="q${idx}" value="${i}" id="${id}"> ${opt}</label><br/>`;
    });
    div.appendChild(box);
  });
}

function submitQuiz(){
  let score = 0;
  quizQuestions.forEach((item, idx) => {
    const radios = document.getElementsByName('q'+idx);
    let selected = null;
    for(let r=0;r<radios.length;r++){
      if(radios[r].checked) selected = parseInt(radios[r].value);
    }
    if(selected === item.answer) score++;
  });
  const resultado = document.getElementById('resultado');
  if(resultado) resultado.innerText = `Você acertou ${score} de ${quizQuestions.length} perguntas.`;
}
window.initSlideshow = initSlideshow;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.loadQuiz = loadQuiz;
window.submitQuiz = submitQuiz;
