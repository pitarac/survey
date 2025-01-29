const questions = [
  {
    id: 1,
    question: "1.1 - Unidade do CEU:",
    type: "radio",
    options: [
      "CEU Itapoã",
      "CEU Recanto",
      "CEU QNR 02",
      "CEU QMN 28",
      "CEU QNN 13",
      "Outro"
    ],
    otherOption: true,
    section: "1. Informações Gerais",
    allowComment: false // Comentário desabilitado
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
    allowComment: false // Comentário desabilitado
  },
  {
    id: 3,
    question: "2.1 - Como você avalia a infraestrutura da unidade do CEU que frequenta?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "2. Avaliação Geral",
    allowComment: true // Comentário habilitado
  },
  {
    id: 4,
    question: "2.3 - Como você avalia os programas e atividades oferecidos?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "2. Avaliação Geral",
    allowComment: true // Comentário habilitado
  },
  {
    id: 5,
    question: "2.4 - Os horários das atividades atendem às suas necessidades?",
    type: "radio",
    options: ["Sim", "Parcialmente", "Não"],
    section: "2. Avaliação Geral",
    allowComment: true // Comentário habilitado
  },
  {
    id: 6,
    question: "2.5 - Você sente que sua participação nas atividades contribui para seu desenvolvimento pessoal/profissional?",
    type: "radio",
    options: ["Sim", "Parcialmente", "Não"],
    section: "2. Avaliação Geral",
    allowComment: true // Comentário habilitado
  },
  {
    id: 7,
    question: "3.1 - Como você avalia o atendimento da equipe do CEU (monitores, professores, gestores)?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "3. Atendimento e Qualidade do Serviço",
    allowComment: true // Comentário habilitado
  },
  {
    id: 8,
    question: "3.2 - Você sente que a equipe do CEU está disponível e pronta para ajudar quando necessário?",
    type: "radio",
    options: ["Sempre", "Na maioria das vezes", "Às vezes", "Raramente", "Nunca"],
    section: "3. Atendimento e Qualidade do Serviço",
    allowComment: true // Comentário habilitado
  },
  {
    id: 9,
    question: "3.3 - Como você avalia a comunicação da unidade (informação sobre eventos, mudanças, etc.)?",
    type: "radio",
    options: ["Excelente", "Boa", "Regular", "Ruim", "Muito Ruim"],
    section: "3. Atendimento e Qualidade do Serviço",
    allowComment: true // Comentário habilitado
  },
  {
    id: 10,
    question: "4.1 - As atividades do CEU têm impacto positivo na sua vida ou na de seus filhos?",
    type: "radio",
    options: ["Sim", "Parcialmente", "Não"],
    section: "4. Impacto e Satisfação Pessoal",
    allowComment: true // Comentário habilitado
  },
  {
    id: 11,
    question: "4.2 - Você indicaria o CEU para amigos ou familiares?",
    type: "radio",
    options: ["Sim", "Talvez", "Não"],
    section: "4. Impacto e Satisfação Pessoal",
    allowComment: true // Comentário habilitado
  },
  {
    id: 12,
    question: "5.1 - Há algo que você gostaria de ver melhorado no CEU?",
    type: "radio",
    options: ["Sim", "Não"],
    section: "5. Sugestões e Melhorias",
    allowComment: true // Comentário habilitado
  },
  {
    id: 13,
    question: "5.2 - Que tipo de novas atividades ou programas você gostaria de ver no CEU?",
    type: "radio",
    options: ["Sim", "Não"],
    section: "5. Sugestões e Melhorias",
    allowComment: true // Comentário habilitado
  },
  {
    id: 14,
    question: "5.3 - Há algum outro comentário ou sugestão que gostaria de compartilhar?",
    type: "radio",
    options: ["Sim", "Não"],
    section: "5. Sugestões e Melhorias",
    allowComment: true // Comentário habilitado
  }
];

export default questions;
