"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuition_entity_1 = require("../entities/tuition-entity");
const typeorm_1 = require("typeorm");
class TuitionRepo {
    getAllTuitions() {
        // get all tuition
        return typeorm_1.getManager().getRepository(tuition_entity_1.TuitionEntity).find();
    }
    saveTuition(tuition) {
        return typeorm_1.getManager().getRepository(tuition_entity_1.TuitionEntity).save(tuition);
    }
    getTuition(tuition) {
        return typeorm_1.getManager().getRepository(tuition_entity_1.TuitionEntity).findOne(tuition);
    }
    getCommonStudents(teacherID) {
        return typeorm_1.getManager().getRepository(tuition_entity_1.TuitionEntity).findOne(teacherID);
    }
}
exports.TuitionRepo = TuitionRepo;
//# sourceMappingURL=tuition-repository.js.map