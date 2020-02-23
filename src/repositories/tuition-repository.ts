import { TuitionEntity } from "../entities/tuition-entity";
import { getManager } from "typeorm";

export class TuitionRepo {

  getAllTuitions() {
    // get all tuition
    return getManager().getRepository(TuitionEntity).find();
  }

  saveTuition(tuition: TuitionEntity) { 
    return getManager().getRepository(TuitionEntity).save(tuition);
  }
  
  getTuition(tuition: TuitionEntity) {
    return getManager().getRepository(TuitionEntity).findOne(tuition);
  }
  
  getCommonStudents(teacherID: number) {
    return getManager().getRepository(TuitionEntity).findOne(teacherID);
  }
  // getTuitionByTeacherArr(teacherArr:[]){
  //   return getManager().getRepository(TuitionEntity).find();
  // }
}