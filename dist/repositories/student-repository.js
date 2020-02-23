"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_entity_1 = require("../entities/student-entity");
const typeorm_1 = require("typeorm");
class StudentRepo {
    getAllStudents() {
        return typeorm_1.getManager().getRepository(student_entity_1.StudentEntity).find();
    }
    saveStudent(student) {
        return typeorm_1.getManager().getRepository(student_entity_1.StudentEntity).save(student);
    }
    deleteStudent(student) {
        return typeorm_1.getManager().getRepository(student_entity_1.StudentEntity).remove(student);
    }
    getStudentByEmail(email) {
        return typeorm_1.getManager().getRepository(student_entity_1.StudentEntity).findOne(email);
    }
}
exports.StudentRepo = StudentRepo;
//# sourceMappingURL=student-repository.js.map