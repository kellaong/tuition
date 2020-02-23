import { Request, Response } from "express";
import { inspect } from 'util';
import { TuitionEntity } from "../entities/tuition-entity";
import { TuitionRepo } from "../repositories/tuition-repository";
import { StudentEntity } from "../entities/student-entity";
import { StudentRepo } from "../repositories/student-repository";
import { StatusEntity } from "../entities/status-entity";
import { StatusRepo } from "../repositories/status-repository";
import { TeacherEntity } from "../entities/teacher-entity";
import { TeacherRepo } from "../repositories/teacher-repository";
import { BaseResponse } from "../base-response";
import {getRepository} from "typeorm";
import {FuncArrayObjectToArray} from "../common/functions";

export let registerTuition = async (req: Request, res: Response) => {
  let baseResponse : BaseResponse = new BaseResponse();
  let teacherEntity:TeacherEntity = new TeacherEntity();
  let teacherRepo: TeacherRepo = new TeacherRepo();
  
  //check request passing correct body content
  if(!req.body.teacher || !req.body.students){
    baseResponse.isSuccess = false;
    baseResponse.message = "Wrong data to proceed!";
    res.send(baseResponse);
    return false;
  }

  try{
    //check if exist teacher
    teacherEntity.email = req.body.teacher;
    let email:string = "{\"email\": \""+teacherEntity.email+"\"}"; 
    let teacher = await teacherRepo.getTeacherByEmail(JSON.parse(email));
    // console.log(teacher);

    if(!teacher){  //if teacher not exists, insert teacher
      var emailNameArr = teacherEntity.email.split("@");
      teacherEntity.firstName = emailNameArr[0];
      teacherEntity.lastName = emailNameArr[0];
  
      teacher = await teacherRepo.saveTeacher(teacherEntity);  
    }

    let studentsArray:[] = req.body.students;
    for(var index in studentsArray)
    { 
      console.log(studentsArray[index]);
      //save student
      let studentEntity : StudentEntity = new StudentEntity();
      let studentRepo : StudentRepo = new StudentRepo();
      let statusEntity : StatusEntity = new StatusEntity();
      let statusRepo : StatusRepo = new StatusRepo()

      //check if exist student
      studentEntity.email = studentsArray[index];
      let email:string = "{\"email\": \""+studentEntity.email+"\"}"; 
      let student = await studentRepo.getStudentByEmail(JSON.parse(email));
      if(!student){  //if student not exists, insert student

        //if no pass firstname & lastname, default get email name
        var emailNameArr = studentEntity.email.split("@");
        studentEntity.firstName = emailNameArr[0];
        studentEntity.lastName = emailNameArr[0];

        //Default status 1-active
        let statusActive = await statusRepo.getStatusById(1); //get active status
        studentEntity.status = statusActive; //set default status=active

        student = await studentRepo.saveStudent(studentEntity);  
      }
      //check if exist tuition
      let tuitionEntity:TuitionEntity = new TuitionEntity();
      let tuitionRepo: TuitionRepo = new TuitionRepo();
      tuitionEntity.teacher = teacher;
      tuitionEntity.student = student;

      let tuition = await tuitionRepo.getTuition(tuitionEntity); 
      
      //insert tuition if not exist
      if(!tuition){
        tuition = await tuitionRepo.saveTuition(tuitionEntity); 
      }
      // console.log(studentsArray[index]);  
      
      // baseResponse.isSuccess = true;
      // baseResponse.response = JSON.stringify(tuition);
      // baseResponse.message = "Success!!";
    }
    res.status(204).send();
  }
  catch(e){
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    // baseResponse.response = JSON.stringify(e);
    baseResponse.message = e.message;
    // baseResponse.message = "Error in saving!!";
    res.send(baseResponse);
  }
};



export let getCommonStudents = async (req: Request, res: Response) => {
  console.log("GET => getCommonStudents");
  let tuitionRepo : TuitionRepo = new TuitionRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  // console.log(req.param(name:String,value:string));
  console.log(req.query);
  // console.log(req.query.teacher);

  //check request passing correct parameter
  if(!req.query.teacher){
    baseResponse.isSuccess = false;
    baseResponse.message = "Wrong data to proceed!";
    res.send(baseResponse);
    return false;
  }

  try{
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
    let teacherRes = await getRepository(TeacherEntity)
                          .createQueryBuilder("teacher")
                          .select("teacher.teacherId", "teacherId")
                          .where("teacher.email IN (:teacher)", req.query)  //when pass multiple email
                          .getRawMany();
    
    // console.log(JSON.stringify(teacherRes)); 
    // let teacherIdArr =[];         
    // for(var index in teacherRes)
    // { 
    //   // console.log(teacherRes[index].teacherId);
    //   teacherIdArr.push(teacherRes[index].teacherId);
    // }

    let teacherIdArr:[] =FuncArrayObjectToArray(teacherRes,"teacherId");


    let teacherIdCount =teacherIdArr.length; 
    console.log(teacherIdArr);                      
    console.log(teacherIdCount);                             
                 
    let students = await getRepository(TuitionEntity)
                        .createQueryBuilder("tuition")
                        .select("student.email","studEmail")
                        .innerJoin("tuition.student", "student")
                        // .innerJoinAndSelect("tuition.student", "student.email")  //return all student field
                        .where("tuition.teacher IN (:...teacherId)", { teacherId: teacherIdArr })  
                        // .where("tuition.teacher IN (:...teacherIds)", { teacherIds: [3,2] })  
                        .groupBy("tuition.studentId")
                        .having("COUNT(tuition.studentId) = :teacherCnt",{teacherCnt:teacherIdCount})
                        // .getSql();
                        .getRawMany();
    
    let studentEmailArr:[] =FuncArrayObjectToArray(students,"studEmail");
    let studentEmail = JSON.stringify(studentEmailArr);   
    let result:string = "{\"student\": "+studentEmail+"}";
    result = JSON.parse(result);


    console.log(result);                                     
    baseResponse.isSuccess = true;
    baseResponse.response = result;
    
    if(!students){
      baseResponse.message = "No tuition found";
    }
  }
  catch(e){
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    // baseResponse.response = JSON.stringify(e);
    baseResponse.message = e.message;
  }

    res.send(baseResponse);
};

export let suspendStudent = async (req: Request, res: Response) => {
  console.log("POST => suspendStudent");
  let tuitionRepo : TuitionRepo = new TuitionRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  console.log(req.body);
  // console.log(req.query.teacher);

  //check request passing correct parameter
  if(!req.body.student){
    baseResponse.isSuccess = false;
    baseResponse.message = "Wrong data to proceed!";
    res.send(baseResponse);
    return false;
  }
  try{
    //get Suspend's statusId
    let suspendStatus = await getRepository(StatusEntity)
                          .createQueryBuilder("status")
                          .where("status.statusName = :statusName", {statusName: "Suspend"})
                          // .getSql();  
                          .getOne();

    console.log(suspendStatus);


    let updateStudStatus = await getRepository(StudentEntity)
                                .createQueryBuilder()
                                .update(StudentEntity)
                                .set({ status: suspendStatus })
                                .where("email = :email", { email: req.body.student })
                                // .getSql();
                                .execute();

                                
    // console.log(updateStudStatus);

    res.status(204).send();
 
  }
  catch(e){
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    // baseResponse.response = JSON.stringify(e);
    baseResponse.message = e.message;
    res.send(baseResponse);
  }


};

export let getNotificationRecipient = async (req: Request, res: Response) => {
  console.log("GET => GetAllTuitions");
  let tuitionRepo : TuitionRepo = new TuitionRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  //check request passing correct parameter
  if(!req.body.teacher||!req.body.notification){
    baseResponse.isSuccess = false;
    baseResponse.message = "Wrong data to proceed!";
    res.send(baseResponse);
    return false;
  }

  try{
    //get any @mentioned student from notification message0
    let mentionedEmail = req.body.notification.match(/(@[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    for(var index in mentionedEmail)
    { 
      //remove the prefix @
      mentionedEmail[index]=mentionedEmail[index].substring(1);
    }
    console.log(mentionedEmail);
    

    //filter @mentioned student: only not suspened student
    let students = await getRepository(StudentEntity)
                        .createQueryBuilder("student")
                        .select("student.email","studEmail")
                        .innerJoin("student.status", "status")
                        .innerJoin("student.tuitions","tuition")
                        .innerJoin("tuition.teacher","teacher")
                        .where("student.email IN (:mentionedEmail)", {mentionedEmail: mentionedEmail})
                        .orWhere("teacher.email = :teacherEmail", {teacherEmail: req.body.teacher})
                        .andWhere("status.statusName != :statusName", {statusName: "Suspend"}) 
                        // .getSql();
                        .getRawMany();

    //get student registered under this teacher which is not suspened

    console.log(students);

    let studentEmailArr:[] =FuncArrayObjectToArray(students,"studEmail");
    let studentEmail = JSON.stringify(studentEmailArr);   
    let result:string = "{\"student\": "+studentEmail+"}";
    result = JSON.parse(result);

    if(!result){
      baseResponse.message = "No email list found";
    }
    
    baseResponse.isSuccess = true;
    baseResponse.response = result;
    
  }
  catch(e){
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    baseResponse.message = e.message;
  }

  res.send(baseResponse);
};

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
