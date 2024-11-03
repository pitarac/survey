// src/application/use-cases/SubmitSurveyResponses.js

const StudentModel = require('../../infrastructure/database/models/StudentModel');
const ResponseModel = require('../../infrastructure/database/models/ResponseModel');

const SubmitSurveyResponses = async (token, responses, comments) => {
  console.log('Iniciando submissão de respostas...');
  try {
    // Buscar estudante pelo token
    console.log('Buscando estudante com token:', token);
    const student = await StudentModel.findOne({ token });

    if (!student) {
      console.warn('Token não encontrado ou expirado:', token);
    } else {
      console.log('Estudante encontrado com sucesso:', student);
    }

    // Salvar as respostas e os comentários, independente se o estudante for encontrado ou não
    console.log('Preparando para salvar respostas e comentários:', responses, comments);
    const response = new ResponseModel({
      studentId: student ? student._id : null, // studentId será null se o estudante não for encontrado
      answers: responses,
      comments: comments // Incluindo os comentários aqui
    });

    try {
      const savedResponse = await response.save();
      console.log('Respostas salvas com sucesso:', savedResponse);
    } catch (saveError) {
      console.error('Erro ao salvar respostas no banco de dados:', saveError);
      throw new Error('Falha ao salvar respostas no banco de dados.');
    }

    // Atualizar o status da mensagem do estudante, se o estudante for encontrado
    if (student) {
      student.messageStatus = 'Enviado'; // Atualiza o status para 'Enviado'
      try {
        const updatedStudent = await student.save();
        console.log('Status atualizado para o estudante:', updatedStudent._id);
      } catch (saveError) {
        console.error('Erro ao atualizar status do estudante:', saveError);
        throw new Error('Falha ao atualizar status do estudante.');
      }
    }

    return { message: 'Respostas recebidas com sucesso.' };
  } catch (error) {
    console.error('Erro ao processar a submissão da pesquisa:', error);
    throw new Error('Erro ao processar a submissão da pesquisa.');
  }
};

module.exports = SubmitSurveyResponses;
