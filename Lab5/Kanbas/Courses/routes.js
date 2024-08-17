import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  const deleteCourse = async (req, res) => {
    // console.log("trying deleting in routes courses: ", req.params);
    const status = await dao.deleteCourse(req.params.id);
    // console.log("delete a course")
    res.json(status);
  };

  const createCourse = async (req, res) => {
    // console.log("creating course in courses routes: ", req.body);
    const course = await dao.createCourse(req.body);
    // console.log("creating course in courses routes: ", course);
    res.json(course);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    // console.log("find all courses: ", courses)
    res.json(courses);
  };

  const findCourseById = async (req, res) => {
    // console.log("course routes param by id in courses route: ", req.params);
    const course = await dao.findCourseById(req.params.id);
    // console.log("the course found in courses route:: ", course);
    res.json(course);
  }; 

  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateCourse(id, req.body);
    res.json(status);
  };


  // project version 
  // get all courses created by faculty

  const fetchCoursesCreatedByFaculty = async (req, res) => {
    const {id} = req.params;
    // console.log("fetching falculty courses in courses routes: ", req.params)
    const facultyCourses = await dao.findFacultyAllCourses(id);
    // console.log(" falculty courses found in courses routes: ", facultyCourses)
    res.json(facultyCourses);
  }


  // const fetchCoursesEnrolledByStudent = async (req, res) => {
  //   const {id} = req.params; //student id
  //   const {enrolled}  = req.body
    // console.log("fetching student id in courses routes: ", req.params)
    // console.log("fetching student enrolled in courses routes: ", req.body)
    // const studentEnrolled = 
    // const studentCourses = await dao.findStudentAllCourses(id);
    // console.log(" student courses found in courses routes: ", studentCourses)
    // res.json(studentCourses);
  // }


  const findCourseByNumber = async (req, res) => {
    console.log("course number routes param by number: ", req.params);
    const course = await dao.findCourseByNumber(req.params.number);
    // console.log("the course found: ", course);
    res.json(course);
  };

  app.get("/api/courses/:number/number", findCourseByNumber);

  app.get("/api/courses/:id/faculty", fetchCoursesCreatedByFaculty);

  // app.get("/api/courses/:id/student", fetchCoursesEnrolledByStudent);


  ////////////////////////////////////////////////////////////////
 

  app.get("/api/courses/:id", findCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.delete("/api/courses/:id", deleteCourse);
}
