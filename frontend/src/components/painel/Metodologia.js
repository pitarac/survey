// src/components/painel/Metodologia.jsx
import React from 'react';
import './Metodologia.css'; // Importando estilos específicos (opcional)

const Metodologia = ({ totalAlunos, percentualAmostra, tamanhoAmostra, totalRespostas, indiceConfianca, margemErro }) => {
  return (
    <section className="metodologia">
      <h2>Metodologia</h2>

      <h3>População e Amostra</h3>
      <p>
        A população-alvo desta pesquisa compreende {totalAlunos} alunos matriculados no Instituto Idecace no curso de Céu das Artes. Para garantir a representatividade dos resultados, foi adotada uma amostragem aleatória simples, selecionando {percentualAmostra}% do universo total, o que corresponde a {tamanhoAmostra} alunos.
      </p>

      <h3>Coleta de Dados</h3>
      <p>
        Os questionários foram distribuídos eletronicamente por meio do aplicativo WhatsApp, uma ferramenta amplamente utilizada pelos alunos, facilitando o acesso e aumentando a taxa de resposta. O uso do WhatsApp permitiu uma coleta de dados rápida e eficiente, respeitando as normas de privacidade e consentimento informado dos participantes.
      </p>

      <h3>Tamanho da Amostra e Margem de Erro</h3>
      <p>
        A amostra de {totalRespostas} alunos foi calculada para proporcionar uma margem de erro adequada para os resultados da pesquisa. Considerando um nível de confiança de {indiceConfianca}%, a margem de erro estimada para esta amostra é de aproximadamente ±{margemErro}%. Este nível de precisão é considerado aceitável para estudos de avaliação de serviços em contextos acadêmicos, permitindo inferências confiáveis sobre a população total com base nos dados coletados.
      </p>

      <h4>Cálculo da Margem de Erro:</h4>
      <p>
        A margem de erro (E) para uma amostra aleatória simples pode ser calculada pela fórmula:
      </p>
      <pre>
        <code>
          E = Z × √(p(1−p)/n)
        </code>
      </pre>
      <p>
        Onde:
      </p>
      <ul>
        <li><strong>Z</strong> = valor z correspondente ao nível de confiança (para {indiceConfianca}%, Z ≈ 1,96)</li>
        <li><strong>p</strong> = proporção estimada da característica de interesse (usualmente 0,5 para maximizar a margem de erro)</li>
        <li><strong>n</strong> = tamanho da amostra</li>
      </ul>
      <p>
        Aplicando os valores:
      </p>
      <pre>
        <code>
          E = 1,96 × √(0,5 × 0,5 / {tamanhoAmostra}) ≈ 0,028 ou 2,8%
        </code>
      </pre>
      <p>
        Arredondando, obtemos uma margem de erro de aproximadamente ±{margemErro}%.
      </p>

      <h3>Procedimentos Éticos</h3>
      <p>
        A pesquisa respeitou todas as diretrizes éticas estabelecidas, incluindo a obtenção de consentimento informado dos participantes e a garantia de anonimato e confidencialidade dos dados coletados.
      </p>
    </section>
  );
};

export default Metodologia;
