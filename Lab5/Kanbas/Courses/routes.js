import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  //   app.put("/api/courses/:id", (req, res) => {
  //       const { id } = req.params;
  //       const course = req.body;
  //       Database.courses = Database.courses.map((c) =>
  //         c._id === id ? { ...c, ...course } : c
  //       );
  //       res.sendStatus(204);
  //     });
    
  //   app.post("/api/courses", (req, res) => {
  //       const course = { ...req.body,
  //         _id: new Date().getTime().toString() };
  //       Database.courses.push(course);
  //       res.send(course);
  //     });
    
  // app.get("/api/courses", (req, res) => {
  //   const courses = Database.courses;
  //   res.send(courses);
  // });

  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   Database.courses = Database.courses.filter((c) => c._id !== id);
  //   res.sendStatus(204);
  // });

// }

// export default function CourseRoutes(app) {

  const deleteCourse = async(req, res) => {
    console.log("trying deleting in routes courses: ", req.params)
    const status = await dao.deleteCourse(req.params.id)
    // console.log("delete a course")
    res.json(status);
  };

  const createCourse = async (req, res) => {
    console.log("creating course in courses routes: ", req.body)
    const course= await dao.createCourse(req.body);
    console.log("creating course in courses routes: ", course)
    res.json(course);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    // console.log("find all courses: ", courses) 
    res.json(courses)
  }

  const findCourseById = async (req, res) => {
    console.log("course routes param by id: ",req.params)
    const course = await dao.findCourseById(req.params.id);
    console.log("the course found: ", course)
    res.json(course);
  };

  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateCourse(id, req.body);
    res.json(status);
  };
  
  app.get("/api/courses/:id", findCourseById);
  app.put("/api/courses/:id", updateCourse); 
    
  app.post("/api/courses", createCourse); 
    

  app.get("/api/courses", findAllCourses);

  app.delete("/api/courses/:id", deleteCourse);

}
