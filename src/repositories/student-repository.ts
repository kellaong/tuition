import { StudentEntity } from "../entities/student-entity";
import { getManager } from "typeorm";

export class StudentRepo {

    getAllStudents() {
        return getManager().getRepository(StudentEntity).find();
    }

    saveStudent(student: StudentEntity) {
        return getManager().getRepository(StudentEntity).save(student);
    }

    deleteStudent(student: StudentEntity) {
        return getManager().getRepository(StudentEntity).remove(student);
    }

    getStudentByEmail(email: string) {
        return getManager().getRepository(StudentEntity).findOne(email);
    }

    // getStudentById(studentId: number) {
    //     return getManager().getRepository(StudentEntity).findOne(studentId);
    // }

}