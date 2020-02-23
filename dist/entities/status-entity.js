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
const student_entity_1 = require("./student-entity");
let StatusEntity = class StatusEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], StatusEntity.prototype, "statusId", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], StatusEntity.prototype, "statusName", void 0);
__decorate([
    typeorm_1.OneToMany(type => student_entity_1.StudentEntity, student => student.status),
    __metadata("design:type", Array)
], StatusEntity.prototype, "students", void 0);
StatusEntity = __decorate([
    typeorm_1.Entity("status")
], StatusEntity);
exports.StatusEntity = StatusEntity;
//# sourceMappingURL=status-entity.js.map