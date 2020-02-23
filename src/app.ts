import express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as appConfig from "./common/app-config";

//controller
import * as teacherController from "./controllers/teacher-controller";
import * as studentController from "./controllers/student-controller";
import * as tuitionController from "./controllers/tuition-controller";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

//routes
app.get('/', (req, res) => { res.send('Welcome to tuition center!'); });

//Teacher
app.get("/GetAllTeachers", teacherController.getAllTeachers);
app.post("/GetTeacherByEmail", teacherController.getTeacherByEmail);
app.post("/SaveTeacher", teacherController.saveTeacher);
app.delete("/DeleteStudent", studentController.deleteStudent);

//Student
app.get("/GetAllStudents", studentController.getAllStudents);
app.post("/SaveStudent", studentController.saveStudent);
app.delete("/DeleteStudent", studentController.deleteStudent);

//Tuition
app.post("/api/register", tuitionController.registerTuition);
app.get("/api/commonstudents", tuitionController.getCommonStudents);
app.post("/api/suspend", tuitionController.suspendStudent);
app.post("/api/retrievefornotifications", tuitionController.getNotificationRecipient);

/**
 * Create connection to DB using configuration provided in 
 * appconfig file.
 */
createConnection(appConfig.dbOptions).then(async connection => {
  console.log("Connected to DB");

}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = app;

//app.listen(port, err => {
//  if (err) {
//    return console.error(err);
//  }
//  return console.log(`server is listening on ${port}`);
//});