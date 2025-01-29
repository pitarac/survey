// src/utils/questions.js

const questions = [
  {
    id: 1,
    question: "1.1 - Unidade do CEU:",
    type: "radio",
    options: [
      "CEU itapoã",
      "CEU Recanto",
      "CEU QNR 02",
      "CEU QMN 28",
      "CEU QNN 13",
      "Outro"
    ],
    otherOption: true,
    section: "1. Informações Gerais",
    allowComment: false
    // Sem interpretação pois não exibiremos essa pergunta
  },
  {
    id: 2,
    question: "1.2 - Categoria de Participante:",
    type: "radio",
    options: [
      "Aluno(a)",
      "Pai/Mãe/Responsável",
      "Professor(a)",
      "Gestor(a)",
      "Monitor(a)",
      "Outro"
    ],
    otherOption: true,
    section: "1. Informações Gerais",
    allowComment: false,
    interpretation: "A pergunta identifica qual o tipo de envolvimento do participante com o CEU, permitindo entender melhor o perfil dos respondentes."
  },
  {
    id: 3,
    question: "2.1 - Como você avalia a infraestrutura da unidade do CEU que frequenta?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "2. Avaliação Geral",
    allowComment: true,
    interpretation: "A maioria dos alunos avalia a infraestrutura como boa ou excelente, indicando um alto nível de satisfação geral. Contudo, onde há insatisfação, é fundamental investigar problemas específicos (limpeza, segurança, acessibilidade)."
  },
  {
    id: 4,
    question: "2.3 - Como você avalia os programas e atividades oferecidos?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "2. Avaliação Geral",
    allowComment: true,
    interpretation: "Os programas e atividades oferecidos são amplamente bem avaliados, com alto índice de satisfação. Sugestões de melhorias podem focar no atendimento das necessidades daqueles que expressam insatisfação ou consideram 'Regular'."
  },
  {
    id: 5,
    question: "2.4 - Os horários das atividades atendem às suas necessidades?",
    type: "radio",
    options: ["Sim", "Parcialmente", "Não"],
    section: "2. Avaliação Geral",
    allowComment: true,
    interpretation: "Horários adequados facilitam a participação. Uma parcela que considera 'Parcialmente' ou 'Não' sugere a possibilidade de ampliar ou ajustar as faixas de horário."
  },
  {
    id: 6,
    question: "2.5 - Você sente que sua participação nas atividades contribui para seu desenvolvimento pessoal/profissional?",
    type: "radio",
    options: ["Sim", "Parcialmente", "Não"],
    section: "2. Avaliação Geral",
    allowComment: true,
    interpretation: "A percepção de ganho pessoal/profissional é um indicador da eficácia das atividades. Um índice elevado aponta que o CEU cumpre sua missão, mas ainda pode haver espaço para aprimorar certos aspectos."
  },
  {
    id: 7,
    question: "3.1 - Como você avalia o atendimento da equipe do CEU (monitores, professores, gestores)?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "3. Atendimento e Qualidade do Serviço",
    allowComment: true,
    interpretation: "O atendimento da equipe é crucial para a satisfação. Altos índices de avaliação positiva mostram preparo e cordialidade; baixos índices sinalizam necessidade de treinamento ou melhor comunicação."
  },
  {
    id: 8,
    question: "3.2 - Você sente que a equipe do CEU está disponível e pronta para ajudar quando necessário?",
    type: "radio",
    options: ["Sempre", "Na maioria das vezes", "Às vezes", "Raramente", "Nunca"],
    section: "3. Atendimento e Qualidade do Serviço",
    allowComment: true,
    interpretation: "Disponibilidade e prontidão da equipe refletem diretamente no bem-estar dos participantes. Respostas negativas indicam possíveis falhas de pessoal, escala ou comunicação interna."
  },
  {
    id: 9,
    question: "3.3 - Como você avalia a comunicação da unidade (informação sobre eventos, mudanças, etc.)?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "3. Atendimento e Qualidade do Serviço",
    allowComment: true,
    interpretation: "Uma boa comunicação é essencial para engajamento. Se os participantes a julgam insuficiente, vale considerar aprimorar canais (WhatsApp, redes sociais, cartazes, etc.)."
  },
  {
    id: 10,
    question: "4.1 - As atividades do CEU têm impacto positivo na sua vida ou na de seus filhos?",
    type: "radio",
    options: ["Sim", "Parcialmente", "Não"],
    section: "4. Impacto e Satisfação Pessoal",
    allowComment: true,
    interpretation: "Medir o impacto positivo demonstra o valor social do CEU. Respostas 'Parcialmente' ou 'Não' podem indicar que o CEU não está atingindo todo o potencial de transformação."
  },
  {
    id: 11,
    question: "4.2 - Você indicaria o CEU para amigos ou familiares?",
    type: "radio",
    options: ["Sim", "Talvez", "Não"],
    section: "4. Impacto e Satisfação Pessoal",
    allowComment: true,
    interpretation: "O indicador de recomendação sugere grau de satisfação e confiança no CEU. Uma alta taxa de 'Sim' aponta grande aprovação, enquanto 'Talvez' e 'Não' indicam oportunidades de melhorias."
  },
  {
    id: 12,
    question: "5.1 - Há algo que você gostaria de ver melhorado no CEU?",
    type: "radio",
    options: ["Sim", "Não"],
    section: "5. Sugestões e Melhorias",
    allowComment: true,
    interpretation: "Esta pergunta abre espaço para melhorias pontuais e específicas. Se 'Sim' for significativo, é fundamental coletar esses comentários para ações futuras."
  },
  {
    id: 13,
    question: "5.2 - Que tipo de novas atividades ou programas você gostaria de ver no CEU?",
    type: "radio",
    options: ["Sim", "Não"],
    section: "5. Sugestões e Melhorias",
    allowComment: true,
    interpretation: "Novas atividades ou programas expandem a atratividade do CEU. Mesmo que a maioria diga 'Não', sugestões adicionais podem surgir nos comentários."
  },
  {
    id: 14,
    question: "5.3 - Há algum outro comentário ou sugestão que gostaria de compartilhar?",
    type: "radio",
    options: ["Sim", "Não"],
    section: "5. Sugestões e Melhorias",
    allowComment: true,
    interpretation: "Um espaço aberto para o participante expressar livremente opiniões, sugestões e relatos além dos itens anteriores."
  }
];

export default questions;
