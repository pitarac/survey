// src/components/painel/Conclusao.jsx
import React from 'react';
import './Conclusao.css'; // Importando estilos específicos

const Conclusao = () => {
  return (
    <section className="conclusao">
      <h2>Conclusão</h2>
      
      <p>
        A análise estatística descritiva revelou altos níveis de satisfação entre os alunos do Céu das Artes em relação aos serviços oferecidos pelo Instituto Idecace. Índices de satisfação superiores a 80% em diversas categorias indicam uma percepção positiva geral. No entanto, a presença de respostas negativas, ainda que em menor proporção, destaca áreas específicas que necessitam de atenção e aprimoramento.
      </p>
      
      <p>
        Os testes de hipóteses poderão ser aplicados para investigar se as diferenças observadas nas avaliações são estatisticamente significativas, permitindo inferências mais robustas sobre as preferências e necessidades dos alunos. Este estudo fornece uma base sólida para a tomada de decisões estratégicas visando a melhoria contínua dos serviços oferecidos pelo CEU, contribuindo para o desenvolvimento pessoal e profissional dos alunos.
      </p>
      
      <h3>Recomendações para Melhoria</h3>
      
      <ul>
        <li>
          <strong>Aprimorar a Comunicação:</strong> Investir em canais de comunicação mais eficazes para garantir que todas as informações relevantes sejam transmitidas de maneira clara e oportuna.
        </li>
        <li>
          <strong>Diversificação de Atividades:</strong> Implementar novas atividades e programas conforme as sugestões dos alunos, visando atender a uma gama mais ampla de interesses e necessidades.
        </li>
        <li>
          <strong>Ajuste de Horários:</strong> Revisar os horários das atividades para acomodar melhor as demandas dos alunos, reduzindo a insatisfação observada.
        </li>
        <li>
          <strong>Treinamento da Equipe:</strong> Continuar investindo no treinamento da equipe para manter elevados padrões de atendimento e disponibilidade.
        </li>
      </ul>
    </section>
  );
};

export default Conclusao;
