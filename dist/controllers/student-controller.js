"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const student_entity_1 = require("../entities/student-entity");
const student_repository_1 = require("../repositories/student-repository");
const status_entity_1 = require("../entities/status-entity");
const status_repository_1 = require("../repositories/status-repository");
const base_response_1 = require("../base-response");
exports.getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET => GetAllStudents");
    let studentRepo = new student_repository_1.StudentRepo();
    let baseResponse = new base_response_1.BaseResponse();
    try {
        let students = yield studentRepo.getAllStudents();
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify(students);
    }
    catch (e) {
        console.log(e);
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(e);
        baseResponse.message = "No student Found";
    }
    res.send(baseResponse);
});
exports.saveStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("POST => SaveStudent");
    let studentRepo = new student_repository_1.StudentRepo();
    let studentEntity = new student_entity_1.StudentEntity();
    let statusEntity = new status_entity_1.StatusEntity();
    let statusRepo = new status_repository_1.StatusRepo();
    let baseResponse = new base_response_1.BaseResponse();
    try {
        studentEntity.studentId = req.body.id;
        studentEntity.firstName = req.body.firstName;
        studentEntity.lastName = req.body.lastName;
        studentEntity.email = req.body.email;
        let statusActive = yield statusRepo.getStatusById(1); //get active status
        studentEntity.status = statusActive; //set default status=active
        var emailNameArr = studentEntity.email.split("@");
        if (!studentEntity.firstName) {
            studentEntity.firstName = emailNameArr[0];
        }
        var emailNameArr = studentEntity.email.split("@");
        if (!studentEntity.lastName) {
            studentEntity.lastName = emailNameArr[0];
        }
        let result = yield studentRepo.saveStudent(studentEntity);
        console.log(result);
        baseResponse.isSuccess = true;
        // baseResponse.response = JSON.stringify(result);
        baseResponse.message = "Successfully register student!";
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        // baseResponse.response = JSON.stringify(inspect(e));
        // baseResponse.message = "Error in saving!!";
        baseResponse.message = e.message;
    }
    res.send(baseResponse);
});
exports.deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DELETE ==> DeleteStudent");
});
//# sourceMappingURL=student-controller.js.map