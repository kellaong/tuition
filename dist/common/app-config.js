"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tuition_entity_1 = require("../entities/tuition-entity");
const status_entity_1 = require("../entities/status-entity");
const teacher_entity_1 = require("../entities/teacher-entity");
const student_entity_1 = require("../entities/student-entity");
exports.dbOptions = {
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "",
    database: "tuition",
    // entities: [
    //   __dirname + "/entity/*.js"
    // ],
    // entities: [
    //   __dirname + "/entities/entity/*.js"
    // ],
    entities: [tuition_entity_1.TuitionEntity, status_entity_1.StatusEntity, teacher_entity_1.TeacherEntity, student_entity_1.StudentEntity],
    synchronize: true,
};
//# sourceMappingURL=app-config.js.map