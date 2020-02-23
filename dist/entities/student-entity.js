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
const tuition_entity_1 = require("./tuition-entity");
const status_entity_1 = require("./status-entity");
let StudentEntity = class StudentEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], StudentEntity.prototype, "studentId", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], StudentEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], StudentEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], StudentEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToMany(type => tuition_entity_1.TuitionEntity, tuition => tuition.student),
    __metadata("design:type", Array)
], StudentEntity.prototype, "tuitions", void 0);
__decorate([
    typeorm_1.ManyToOne(type => status_entity_1.StatusEntity, status => status.students),
    typeorm_1.JoinColumn({ name: "statusId" }),
    __metadata("design:type", status_entity_1.StatusEntity)
], StudentEntity.prototype, "status", void 0);
StudentEntity = __decorate([
    typeorm_1.Entity("student"),
    typeorm_1.Unique(["email"])
], StudentEntity);
exports.StudentEntity = StudentEntity;
//# sourceMappingURL=student-entity.js.map