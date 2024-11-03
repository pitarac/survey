// src/domain/entities/Response.js
class Response {
  constructor({ studentId, answers, comments, submittedAt }) {
    this.studentId = studentId;
    this.answers = answers;
    this.comments = comments;
    this.submittedAt = submittedAt || new Date();
  }
}

module.exports = Response;