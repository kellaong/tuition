import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
import {TuitionEntity} from "../entities/tuition-entity";
import {StatusEntity} from "../entities/status-entity";
import {TeacherEntity} from "../entities/teacher-entity";
import {StudentEntity} from "../entities/student-entity";

export let dbOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3308,
  username: "root",
  password: "",
  database: "tuition",
  // entities: [
  //   __dirname + "/entity/*.js"
  // ],
  // entities: [
  //   __dirname + "/entities/entity/*.js"
  // ],
  entities: [TuitionEntity,StatusEntity,TeacherEntity,StudentEntity],
  synchronize: true,
}
