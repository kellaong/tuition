import { Request, Response } from "express";
import { inspect } from 'util';
import { TeacherEntity } from "../entities/teacher-entity";
import { TeacherRepo } from "../repositories/teacher-repository";
import { BaseResponse } from "../base-response";

export let getTeacherByEmail = async (req: Request, res: Response) => {
  let teacherRepo: TeacherRepo = new TeacherRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  let tcr:TeacherEntity = new TeacherEntity();
  let email:string = req.body;
  // console.log(email);

  try{
    let teacher = await teacherRepo.getTeacherByEmail(email);
    baseResponse.isSuccess = true;
    // baseResponse.response = "1";
    baseResponse.response = JSON.stringify(teacher);
    // if(!teacher||baseResponse.response=="{}"){
    if(!teacher){
      baseResponse.message = "No teacher found! Make sure your email is correct!";
    }
  }
  catch(e){
    console.log(e);
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(e);
    baseResponse.message = e.message;
    // baseResponse.message = "Error!!";
  }
  res.send(baseResponse);
};

export let getAllTeachers = async (req: Request, res: Response) => {
  console.log("GET => GetAllTeachers");
  let teacherRepo : TeacherRepo = new TeacherRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  try{
    //await = wait to get result first, else it will return {} (Promise)
    let teachers = await teacherRepo.getAllTeachers();
    baseResponse.isSuccess = true;
    baseResponse.response = JSON.stringify(teachers);
    
    // console.log(teachers);
    // console.log(JSON.stringify(teachers));
    if(!teachers||baseResponse.response=="{}"){
      baseResponse.message = "No teacher found";
    }
  }
  catch(e){
    console.log(e);
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(e);
    baseResponse.message = "Error!!";
  }

  res.send(baseResponse);
};

export let saveTeacher = async (req: Request, res: Response) => {
  let teacherRepo: TeacherRepo = new TeacherRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  // console.log("Received saveTeacher ==> POST");
  // console.log(req.body);
  try{
    let teacherEntity:TeacherEntity = new TeacherEntity();
    teacherEntity.email = req.body.email;
    teacherEntity.firstName = req.body.firstName;
    teacherEntity.lastName = req.body.lastName;

    var emailNameArr = teacherEntity.email.split("@");
    if(!teacherEntity.firstName){
      teacherEntity.firstName = emailNameArr[0];
    }
    var emailNameArr = teacherEntity.email.split("@");
    if(!teacherEntity.lastName){
      teacherEntity.lastName = emailNameArr[0];
    }

    let result = await teacherRepo.saveTeacher(teacherEntity);
    console.log(result);
    baseResponse.isSuccess = true;
    // baseResponse.response = JSON.stringify(result);
    baseResponse.message = "Successfully register teacher!";
  }
  catch(e){
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(inspect(e));
    baseResponse.message = "Error in saving!!";
  }
  res.send(baseResponse);
};