// src/domain/entities/Student.js
class Student {
  constructor({ id, name, phoneNumber, token }) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.token = token;
  }
}

module.exports = Student;
