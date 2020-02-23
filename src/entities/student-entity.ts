import {Entity, Column,  PrimaryGeneratedColumn, OneToMany,ManyToOne,JoinColumn, Unique} from "typeorm";
import { TuitionEntity } from "./tuition-entity";
import { StatusEntity } from "./status-entity";

@Entity("student")
@Unique(["email"])

export class StudentEntity {
  @PrimaryGeneratedColumn()
  studentId: number;

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

  @OneToMany(type => TuitionEntity, tuition => tuition.student)
  tuitions: TuitionEntity[];

  @ManyToOne(type => StatusEntity, status => status.students)
  @JoinColumn({ name: "statusId" })
  status: StatusEntity;
}

