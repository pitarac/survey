const SubmitSurveyResponses = require('../../application/use-cases/SubmitSurveyResponses');

const submitResponses = async (req, res) => {
  try {
    const { token, responses, comments } = req.body; // Incluindo comments aqui
    const result = await SubmitSurveyResponses(token, responses, comments);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  submitResponses,
};
