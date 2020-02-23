import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,Unique} from "typeorm";
import { TeacherEntity } from "./teacher-entity";
import { StudentEntity } from "./student-entity";
 
@Entity("tuition")
@Unique(["teacher","student"])
export class TuitionEntity {
 
    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    tuitionId: number;
 
    @ManyToOne(type => TeacherEntity, teacher => teacher.tuitions)
    @JoinColumn({ name: "teacherId" })
    teacher: TeacherEntity;
 
    @ManyToOne(type => StudentEntity, student => student.tuitions)
    @JoinColumn({ name: "studentId" })
    student: StudentEntity;

}