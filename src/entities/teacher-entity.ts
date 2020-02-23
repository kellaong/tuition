import { Entity, Column, PrimaryGeneratedColumn, OneToMany,Unique } from "typeorm";
import { TuitionEntity } from "./tuition-entity";

@Entity("teacher")
@Unique(["email"])
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  teacherId: number;

  @Column({
    length: 100
  })
  firstName: string;

  @Column({
    length: 100
  })
  lastName: string;

  @Column({
    length: 100
  })
  email: string;

  @OneToMany(type => TuitionEntity, tuition => tuition.teacher)
    tuitions: TuitionEntity[];
}