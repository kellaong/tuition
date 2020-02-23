import { Entity, Column, PrimaryGeneratedColumn, OneToMany,Unique } from "typeorm";
import { StudentEntity } from "./student-entity";

@Entity("status")
export class StatusEntity {
  @PrimaryGeneratedColumn()
  statusId: number;

  @Column({
    length: 100
  })
  statusName: string;

  @OneToMany(type => StudentEntity, student => student.status)
  students: StudentEntity[];
}