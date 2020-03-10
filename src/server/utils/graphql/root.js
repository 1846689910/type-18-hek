const { students } = require("./dataset");
module.exports = {
  hello: () => "Hello World",
  student: ({ id }) => students.find(x => x.id === id),
  students(params) {
    // params will contain {name, age, id, ...} some fields that user passed in when query
    const keys = Object.keys(params);
    return students.filter(x => keys.every(key => x[key] === params[key]));
  },
  createStudent({ student }) {
    console.log(student);
    if (!students.find(x => x.id === student.id)) {
      students.push(student);
      return true;
    }
    return false;
  },
  deleteStudent({ id }) {
    const idx = students.findIndex(x => x.id === id);
    if (idx < 0) return false;
    students.splice(idx, 1);
    return true;
  },
  updateStudent({ id, student }) {
    const idx = students.findIndex(x => x.id === id);
    if (idx < 0) return null;
    students.splice(idx, 1, student);
    return student;
  }
};
