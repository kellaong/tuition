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
const teacher_entity_1 = require("../entities/teacher-entity");
const teacher_repository_1 = require("../repositories/teacher-repository");
const base_response_1 = require("../base-response");
exports.getTeacherByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let teacherRepo = new teacher_repository_1.TeacherRepo();
    let baseResponse = new base_response_1.BaseResponse();
    let tcr = new teacher_entity_1.TeacherEntity();
    let email = req.body;
    // console.log(email);
    try {
        let teacher = yield teacherRepo.getTeacherByEmail(email);
        baseResponse.isSuccess = true;
        // baseResponse.response = "1";
        baseResponse.response = JSON.stringify(teacher);
        // if(!teacher||baseResponse.response=="{}"){
        if (!teacher) {
            baseResponse.message = "No teacher found! Make sure your email is correct!";
        }
    }
    catch (e) {
        console.log(e);
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(e);
        baseResponse.message = e.message;
        // baseResponse.message = "Error!!";
    }
    res.send(baseResponse);
});
exports.getAllTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET => GetAllTeachers");
    let teacherRepo = new teacher_repository_1.TeacherRepo();
    let baseResponse = new base_response_1.BaseResponse();
    try {
        //await = wait to get result first, else it will return {} (Promise)
        let teachers = yield teacherRepo.getAllTeachers();
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify(teachers);
        // console.log(teachers);
        // console.log(JSON.stringify(teachers));
        if (!teachers || baseResponse.response == "{}") {
            baseResponse.message = "No teacher found";
        }
    }
    catch (e) {
        console.log(e);
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(e);
        baseResponse.message = "Error!!";
    }
    res.send(baseResponse);
});
exports.saveTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let teacherRepo = new teacher_repository_1.TeacherRepo();
    let baseResponse = new base_response_1.BaseResponse();
    // console.log("Received saveTeacher ==> POST");
    // console.log(req.body);
    try {
        let teacherEntity = new teacher_entity_1.TeacherEntity();
        teacherEntity.email = req.body.email;
        teacherEntity.firstName = req.body.firstName;
        teacherEntity.lastName = req.body.lastName;
        var emailNameArr = teacherEntity.email.split("@");
        if (!teacherEntity.firstName) {
            teacherEntity.firstName = emailNameArr[0];
        }
        var emailNameArr = teacherEntity.email.split("@");
        if (!teacherEntity.lastName) {
            teacherEntity.lastName = emailNameArr[0];
        }
        let result = yield teacherRepo.saveTeacher(teacherEntity);
        console.log(result);
        baseResponse.isSuccess = true;
        // baseResponse.response = JSON.stringify(result);
        baseResponse.message = "Successfully register teacher!";
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(util_1.inspect(e));
        baseResponse.message = "Error in saving!!";
    }
    res.send(baseResponse);
});
//# sourceMappingURL=teacher-controller.js.map