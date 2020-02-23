"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teacher_entity_1 = require("../entities/teacher-entity");
const typeorm_1 = require("typeorm");
class TeacherRepo {
    getAllTeachers() {
        return typeorm_1.getManager().getRepository(teacher_entity_1.TeacherEntity).find();
    }
    // getTeacherById(teacherId: number) {
    //     return getManager().getRepository(TeacherEntity).findOne(teacherId);
    // }
    getTeacherByEmail(email) {
        return typeorm_1.getManager().getRepository(teacher_entity_1.TeacherEntity).findOne(email);
    }
    saveTeacher(teacher) {
        return typeorm_1.getManager().getRepository(teacher_entity_1.TeacherEntity).save(teacher);
    }
    deleteTeacher(teacher) {
        return typeorm_1.getManager().getRepository(teacher_entity_1.TeacherEntity).remove(teacher);
    }
}
exports.TeacherRepo = TeacherRepo;
//# sourceMappingURL=teacher-repository.js.map