const TextFileReader = require("../TextFileReader");
const Path = require("path");

// const studentsJsonPath = Path.resolve("src/data/students.json");
// const landmarksJsonPath = Path.resolve("src/data/landmarks.geo.json");

let _landmarks;

/**
 * @description mock fetch data from landmarks.geo.json;
 * @returns {Object[]}
 */
const localMockDataFetch = () => {
  if (!_landmarks) {
    const landmarksJsonPath = Path.resolve("src/data/landmarks.geo.json");
    _landmarks = new TextFileReader().read(landmarksJsonPath).toJson([]);
  }
  return _landmarks;
};

const landmarksPartial = {
  landmark: ({ id }) => localMockDataFetch().find(x => x.id === id),
    
  landmarks(params) {
    // params will contain {name, address, ...} some fields that user passed in when query
    const landmarks = localMockDataFetch(); // new TextFileReader().read(landmarksJsonPath).toJson([]);
    const keys = Object.keys(params);
    console.log(landmarks);
    return landmarks.filter(x => keys.every(key => x[key] === params[key]));
  },
  createLandmark({ landmark }) {
    const landmarks = localMockDataFetch(); // new TextFileReader().read(landmarksJsonPath).toJson([]);
    const nextId =
      Math.max.apply(
        null,
        landmarks.map(x => x.id)
      ) + 1;
    landmark.id = `${nextId}`;
    landmarks.push(landmark);
    console.log(landmarks);
    return landmark;
  },
  deleteLandmark({ id }) {
    const landmarks = localMockDataFetch(); // new TextFileReader().read(landmarksJsonPath).toJson([]);
    const idx = landmarks.findIndex(x => x.id === id);
    if (idx < 0) return null;
    const [deleted] = landmarks.splice(idx, 1);
    console.log(landmarks);
    return deleted;
  },
  updateLandmark({ id, landmark }) {
    const landmarks = localMockDataFetch(); // new TextFileReader().read(landmarksJsonPath).toJson([]);
    const idx = landmarks.findIndex(x => x.id === id);
    if (idx < 0) return null;
    landmarks.splice(idx, 1, landmark);
    console.log(landmarks);
    return landmark;
  }
};

module.exports = {
  hello: () => "Hello, type-18-hek is now boosted by Apollo + GraphQL",
  // student: ({ id }) =>
  //   new TextFileReader()
  //     .read(studentsJsonPath)
  //     .toJson([])
  //     .find(x => x.id === id),
  // students(params) {
  //   // params will contain {name, age, id, ...} some fields that user passed in when query
  //   const students = new TextFileReader().read(studentsJsonPath).toJson([]);
  //   const keys = Object.keys(params);
  //   return students.filter(x => keys.every(key => x[key] === params[key]));
  // },
  // createStudent({ student }) {
  //   const students = new TextFileReader().read(studentsJsonPath).toJson([]);
  //   if (!students.find(x => x.id === student.id)) {
  //     students.push(student);
  //     return true;
  //   }
  //   return false;
  // },
  // deleteStudent({ id }) {
  //   const students = new TextFileReader().read(studentsJsonPath).toJson([]);
  //   const idx = students.findIndex(x => x.id === id);
  //   if (idx < 0) return false;
  //   students.splice(idx, 1);
  //   return true;
  // },
  // updateStudent({ id, student }) {
  //   const students = new TextFileReader().read(studentsJsonPath).toJson([]);
  //   const idx = students.findIndex(x => x.id === id);
  //   if (idx < 0) return null;
  //   students.splice(idx, 1, student);
  //   return student;
  // },
  ...landmarksPartial
};
