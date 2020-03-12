const TextFileReader = require("../TextFileReader");
const Path = require("path");

const studentsJsonPath = Path.resolve("src/data/students.json");
const landmarksJsonPath = Path.resolve("src/data/landmarks.json");

const landmarksPartial = {
  landmark: ({ name }) =>
    new TextFileReader()
      .read(landmarksJsonPath)
      .toJson([])
      .find(x => x.properties.name === name),
  landmarks(params) {
    // params will contain {name, address, ...} some fields that user passed in when query
    const landmarks = new TextFileReader().read(landmarksJsonPath).toJson([]);
    const keys = Object.keys(params);
    return landmarks.filter(x => keys.every(key => x[key] === params[key]));
  },
  createLandmark({ landmark }) {
    const landmarks = new TextFileReader().read(landmarksJsonPath).toJson([]);
    if (!landmarks.find(x => x.properties.name === landmark.name)) {
      landmarks.push(landmark);
      return true;
    }
    return false;
  },
  deleteLandmark({ name }) {
    const landmarks = new TextFileReader().read(landmarksJsonPath).toJson([]);
    const idx = landmarks.findIndex(x => x.properties.name === name);
    if (idx < 0) return false;
    landmarks.splice(idx, 1);
    return true;
  },
  updateLandmark({ name, landmark }) {
    const landmarks = new TextFileReader().read(landmarksJsonPath).toJson([]);
    const idx = landmarks.findIndex(x => x.properties.name === name);
    if (idx < 0) return null;
    landmarks.splice(idx, 1, landmark);
    return landmark;
  }
};

module.exports = {
  hello: () => "Hello, type-18-hek now support graphql",
  student: ({ id }) =>
    new TextFileReader()
      .read(studentsJsonPath)
      .toJson([])
      .find(x => x.id === id),
  students(params) {
    // params will contain {name, age, id, ...} some fields that user passed in when query
    const students = new TextFileReader().read(studentsJsonPath).toJson([]);
    const keys = Object.keys(params);
    return students.filter(x => keys.every(key => x[key] === params[key]));
  },
  createStudent({ student }) {
    const students = new TextFileReader().read(studentsJsonPath).toJson([]);
    if (!students.find(x => x.id === student.id)) {
      students.push(student);
      return true;
    }
    return false;
  },
  deleteStudent({ id }) {
    const students = new TextFileReader().read(studentsJsonPath).toJson([]);
    const idx = students.findIndex(x => x.id === id);
    if (idx < 0) return false;
    students.splice(idx, 1);
    return true;
  },
  updateStudent({ id, student }) {
    const students = new TextFileReader().read(studentsJsonPath).toJson([]);
    const idx = students.findIndex(x => x.id === id);
    if (idx < 0) return null;
    students.splice(idx, 1, student);
    return student;
  },
  ...landmarksPartial
};
