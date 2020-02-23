import { TeacherEntity } from "../entities/teacher-entity";
import { getManager } from "typeorm";

export class TeacherRepo {

  getAllTeachers() {
    return getManager().getRepository(TeacherEntity).find();
  }

  // getTeacherById(teacherId: number) {
  //     return getManager().getRepository(TeacherEntity).findOne(teacherId);
  // }
  
  getTeacherByEmail(email: string) {
    return getManager().getRepository(TeacherEntity).findOne(email);
  }

  saveTeacher(teacher: TeacherEntity) {
      return getManager().getRepository(TeacherEntity).save(teacher);
  }

  deleteTeacher(teacher: TeacherEntity) {
      return getManager().getRepository(TeacherEntity).remove(teacher);
  }
}