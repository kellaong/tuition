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
const tuition_entity_1 = require("../entities/tuition-entity");
const tuition_repository_1 = require("../repositories/tuition-repository");
const student_entity_1 = require("../entities/student-entity");
const student_repository_1 = require("../repositories/student-repository");
const status_entity_1 = require("../entities/status-entity");
const status_repository_1 = require("../repositories/status-repository");
const teacher_entity_1 = require("../entities/teacher-entity");
const teacher_repository_1 = require("../repositories/teacher-repository");
const base_response_1 = require("../base-response");
const typeorm_1 = require("typeorm");
const functions_1 = require("../common/functions");
exports.registerTuition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let baseResponse = new base_response_1.BaseResponse();
    let teacherEntity = new teacher_entity_1.TeacherEntity();
    let teacherRepo = new teacher_repository_1.TeacherRepo();
    //check request passing correct body content
    if (!req.body.teacher || !req.body.students) {
        baseResponse.isSuccess = false;
        baseResponse.message = "Wrong data to proceed!";
        res.send(baseResponse);
        return false;
    }
    try {
        //check if exist teacher
        teacherEntity.email = req.body.teacher;
        let email = "{\"email\": \"" + teacherEntity.email + "\"}";
        let teacher = yield teacherRepo.getTeacherByEmail(JSON.parse(email));
        // console.log(teacher);
        if (!teacher) { //if teacher not exists, insert teacher
            var emailNameArr = teacherEntity.email.split("@");
            teacherEntity.firstName = emailNameArr[0];
            teacherEntity.lastName = emailNameArr[0];
            teacher = yield teacherRepo.saveTeacher(teacherEntity);
        }
        let studentsArray = req.body.students;
        for (var index in studentsArray) {
            console.log(studentsArray[index]);
            //save student
            let studentEntity = new student_entity_1.StudentEntity();
            let studentRepo = new student_repository_1.StudentRepo();
            let statusEntity = new status_entity_1.StatusEntity();
            let statusRepo = new status_repository_1.StatusRepo();
            //check if exist student
            studentEntity.email = studentsArray[index];
            let email = "{\"email\": \"" + studentEntity.email + "\"}";
            let student = yield studentRepo.getStudentByEmail(JSON.parse(email));
            if (!student) { //if student not exists, insert student
                //if no pass firstname & lastname, default get email name
                var emailNameArr = studentEntity.email.split("@");
                studentEntity.firstName = emailNameArr[0];
                studentEntity.lastName = emailNameArr[0];
                //Default status 1-active
                let statusActive = yield statusRepo.getStatusById(1); //get active status
                studentEntity.status = statusActive; //set default status=active
                student = yield studentRepo.saveStudent(studentEntity);
            }
            //check if exist tuition
            let tuitionEntity = new tuition_entity_1.TuitionEntity();
            let tuitionRepo = new tuition_repository_1.TuitionRepo();
            tuitionEntity.teacher = teacher;
            tuitionEntity.student = student;
            let tuition = yield tuitionRepo.getTuition(tuitionEntity);
            //insert tuition if not exist
            if (!tuition) {
                tuition = yield tuitionRepo.saveTuition(tuitionEntity);
            }
            // console.log(studentsArray[index]);  
            // baseResponse.isSuccess = true;
            // baseResponse.response = JSON.stringify(tuition);
            // baseResponse.message = "Success!!";
        }
        res.status(204).send();
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        // baseResponse.response = JSON.stringify(e);
        baseResponse.message = e.message;
        // baseResponse.message = "Error in saving!!";
        res.send(baseResponse);
    }
});
exports.getCommonStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET => getCommonStudents");
    let tuitionRepo = new tuition_repository_1.TuitionRepo();
    let baseResponse = new base_response_1.BaseResponse();
    // console.log(req.param(name:String,value:string));
    console.log(req.query);
    // console.log(req.query.teacher);
    //check request passing correct parameter
    if (!req.query.teacher) {
        baseResponse.isSuccess = false;
        baseResponse.message = "Wrong data to proceed!";
        res.send(baseResponse);
        return false;
    }
    try {
        //get common student list for specific teacher(s)
        // let teacher = await getRepository(TeacherEntity)
        //                     .createQueryBuilder("teacher")
        //                     // .where("teacher.teacherId = :id", { id: 1 })
        //                     // .where("teacher.email = :teacher", req.query)  //when pass single email
        //                     .where("teacher.email IN (:teacher)", req.query)  //when pass multiple email
        //                     .getMany();
        //                     // .getOne(); //only return  1 result
        //                     // .getRawOne();
        //                     // .getRawMany();
        //                     // .getRawAndEntities();
        //                     // .printSql();  //for debug purpose
        //                     // .getSql();    //to echo the sql statement
        // console.log(JSON.stringify(teacher));     
        //get common student list for specific teacher(s)
        let teacherRes = yield typeorm_1.getRepository(teacher_entity_1.TeacherEntity)
            .createQueryBuilder("teacher")
            .select("teacher.teacherId", "teacherId")
            .where("teacher.email IN (:teacher)", req.query) //when pass multiple email
            .getRawMany();
        // console.log(JSON.stringify(teacherRes)); 
        // let teacherIdArr =[];         
        // for(var index in teacherRes)
        // { 
        //   // console.log(teacherRes[index].teacherId);
        //   teacherIdArr.push(teacherRes[index].teacherId);
        // }
        let teacherIdArr = functions_1.FuncArrayObjectToArray(teacherRes, "teacherId");
        let teacherIdCount = teacherIdArr.length;
        console.log(teacherIdArr);
        console.log(teacherIdCount);
        let students = yield typeorm_1.getRepository(tuition_entity_1.TuitionEntity)
            .createQueryBuilder("tuition")
            .select("student.email", "studEmail")
            .innerJoin("tuition.student", "student")
            // .innerJoinAndSelect("tuition.student", "student.email")  //return all student field
            .where("tuition.teacher IN (:...teacherId)", { teacherId: teacherIdArr })
            // .where("tuition.teacher IN (:...teacherIds)", { teacherIds: [3,2] })  
            .groupBy("tuition.studentId")
            .having("COUNT(tuition.studentId) = :teacherCnt", { teacherCnt: teacherIdCount })
            // .getSql();
            .getRawMany();
        let studentEmailArr = functions_1.FuncArrayObjectToArray(students, "studEmail");
        let studentEmail = JSON.stringify(studentEmailArr);
        let result = "{\"student\": " + studentEmail + "}";
        result = JSON.parse(result);
        console.log(result);
        baseResponse.isSuccess = true;
        baseResponse.response = result;
        if (!students) {
            baseResponse.message = "No tuition found";
        }
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        // baseResponse.response = JSON.stringify(e);
        baseResponse.message = e.message;
    }
    res.send(baseResponse);
});
exports.suspendStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("POST => suspendStudent");
    let tuitionRepo = new tuition_repository_1.TuitionRepo();
    let baseResponse = new base_response_1.BaseResponse();
    console.log(req.body);
    // console.log(req.query.teacher);
    //check request passing correct parameter
    if (!req.body.student) {
        baseResponse.isSuccess = false;
        baseResponse.message = "Wrong data to proceed!";
        res.send(baseResponse);
        return false;
    }
    try {
        //get Suspend's statusId
        let suspendStatus = yield typeorm_1.getRepository(status_entity_1.StatusEntity)
            .createQueryBuilder("status")
            .where("status.statusName = :statusName", { statusName: "Suspend" })
            // .getSql();  
            .getOne();
        console.log(suspendStatus);
        let updateStudStatus = yield typeorm_1.getRepository(student_entity_1.StudentEntity)
            .createQueryBuilder()
            .update(student_entity_1.StudentEntity)
            .set({ status: suspendStatus })
            .where("email = :email", { email: req.body.student })
            // .getSql();
            .execute();
        // console.log(updateStudStatus);
        res.status(204).send();
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        // baseResponse.response = JSON.stringify(e);
        baseResponse.message = e.message;
        res.send(baseResponse);
    }
});
exports.getNotificationRecipient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET => GetAllTuitions");
    let tuitionRepo = new tuition_repository_1.TuitionRepo();
    let baseResponse = new base_response_1.BaseResponse();
    //check request passing correct parameter
    if (!req.body.teacher || !req.body.notification) {
        baseResponse.isSuccess = false;
        baseResponse.message = "Wrong data to proceed!";
        res.send(baseResponse);
        return false;
    }
    try {
        //get any @mentioned student from notification message0
        let mentionedEmail = req.body.notification.match(/(@[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        for (var index in mentionedEmail) {
            //remove the prefix @
            mentionedEmail[index] = mentionedEmail[index].substring(1);
        }
        console.log(mentionedEmail);
        //filter @mentioned student: only not suspened student
        let students = yield typeorm_1.getRepository(student_entity_1.StudentEntity)
            .createQueryBuilder("student")
            .select("student.email", "studEmail")
            .innerJoin("student.status", "status")
            .innerJoin("student.tuitions", "tuition")
            .innerJoin("tuition.teacher", "teacher")
            .where("student.email IN (:mentionedEmail)", { mentionedEmail: mentionedEmail })
            .orWhere("teacher.email = :teacherEmail", { teacherEmail: req.body.teacher })
            .andWhere("status.statusName != :statusName", { statusName: "Suspend" })
            // .getSql();
            .getRawMany();
        //get student registered under this teacher which is not suspened
        console.log(students);
        let studentEmailArr = functions_1.FuncArrayObjectToArray(students, "studEmail");
        let studentEmail = JSON.stringify(studentEmailArr);
        let result = "{\"student\": " + studentEmail + "}";
        result = JSON.parse(result);
        if (!result) {
            baseResponse.message = "No email list found";
        }
        baseResponse.isSuccess = true;
        baseResponse.response = result;
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        baseResponse.message = e.message;
    }
    res.send(baseResponse);
});
// export let getAllTuitions = async (req: Request, res: Response) => {
//   console.log("GET => GetAllTuitions");
//   let tuitionRepo : TuitionRepo = new TuitionRepo();
//   let baseResponse : BaseResponse = new BaseResponse();
//   try{
//     //await = wait to get result first, else it will return {} (Promise)
//     let tuitions = await tuitionRepo.getAllTuitions();
//     baseResponse.isSuccess = true;
//     baseResponse.response = JSON.stringify(tuitions);
//     // console.log(tuitions);
//     // console.log(JSON.stringify(tuitions));
//     if(!tuitions){
//       baseResponse.message = "No tuition found";
//     }
//   }
//   catch(e){
//     console.log(e);
//     baseResponse.isSuccess = false;
//    // baseResponse.response = JSON.stringify(e);
//     baseResponse.message = e.message;
//   }
//   res.send(baseResponse);
// };
//# sourceMappingURL=tuition-controller.js.map