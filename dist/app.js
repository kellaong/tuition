"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const appConfig = __importStar(require("./common/app-config"));
//controller
const teacherController = __importStar(require("./controllers/teacher-controller"));
const studentController = __importStar(require("./controllers/student-controller"));
const tuitionController = __importStar(require("./controllers/tuition-controller"));
const app = express_1.default();
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
typeorm_1.createConnection(appConfig.dbOptions).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to DB");
})).catch(error => console.log("TypeORM connection error: ", error));
module.exports = app;
//app.listen(port, err => {
//  if (err) {
//    return console.error(err);
//  }
//  return console.log(`server is listening on ${port}`);
//});
//# sourceMappingURL=app.js.map