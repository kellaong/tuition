"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const teacher_entity_1 = require("./teacher-entity");
const student_entity_1 = require("./student-entity");
let TuitionEntity = class TuitionEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "Id", type: "smallint" }),
    __metadata("design:type", Number)
], TuitionEntity.prototype, "tuitionId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => teacher_entity_1.TeacherEntity, teacher => teacher.tuitions),
    typeorm_1.JoinColumn({ name: "teacherId" }),
    __metadata("design:type", teacher_entity_1.TeacherEntity)
], TuitionEntity.prototype, "teacher", void 0);
__decorate([
    typeorm_1.ManyToOne(type => student_entity_1.StudentEntity, student => student.tuitions),
    typeorm_1.JoinColumn({ name: "studentId" }),
    __metadata("design:type", student_entity_1.StudentEntity)
], TuitionEntity.prototype, "student", void 0);
TuitionEntity = __decorate([
    typeorm_1.Entity("tuition"),
    typeorm_1.Unique(["teacher", "student"])
], TuitionEntity);
exports.TuitionEntity = TuitionEntity;
//# sourceMappingURL=tuition-entity.js.map