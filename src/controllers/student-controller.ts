import { Request, Response } from "express";
import { inspect } from 'util';
import { StudentEntity } from "../entities/student-entity";
import { StudentRepo } from "../repositories/student-repository";
import { StatusEntity } from "../entities/status-entity";
import { StatusRepo } from "../repositories/status-repository";
import { BaseResponse } from "../base-response";

export let getAllStudents = async (req: Request, res: Response) => {
  console.log("GET => GetAllStudents");
  let studentRepo : StudentRepo = new StudentRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  try{
    let students = await studentRepo.getAllStudents();
    baseResponse.isSuccess = true;
    baseResponse.response = JSON.stringify(students);
  }
  catch(e){
    console.log(e);
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(e);
    baseResponse.message = "No student Found";
  }

  res.send(baseResponse);
};

export let saveStudent = async (req: Request, res: Response) => {
  console.log("POST => SaveStudent");
  let studentRepo : StudentRepo = new StudentRepo();
  let studentEntity : StudentEntity = new StudentEntity();
  let statusEntity : StatusEntity = new StatusEntity();
  let statusRepo : StatusRepo = new StatusRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  try{
    studentEntity.studentId = req.body.id;
    studentEntity.firstName = req.body.firstName;
    studentEntity.lastName = req.body.lastName;
    studentEntity.email = req.body.email;
    let statusActive = await statusRepo.getStatusById(1); //get active status
    studentEntity.status = statusActive; //set default status=active

    var emailNameArr = studentEntity.email.split("@");
    if(!studentEntity.firstName){
      studentEntity.firstName = emailNameArr[0];
    }
    var emailNameArr = studentEntity.email.split("@");
    if(!studentEntity.lastName){
      studentEntity.lastName = emailNameArr[0];
    }

    let result = await studentRepo.saveStudent(studentEntity);
    console.log(result);
    baseResponse.isSuccess = true;
    // baseResponse.response = JSON.stringify(result);
    baseResponse.message = "Successfully register student!";
  }
  catch(e){
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    // baseResponse.response = JSON.stringify(inspect(e));
    // baseResponse.message = "Error in saving!!";
    baseResponse.message = e.message;
  }
  res.send(baseResponse);
}

export let deleteStudent = async (req: any, res: Response) => {
  console.log("DELETE ==> DeleteStudent");
}