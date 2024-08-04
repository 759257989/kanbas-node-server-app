import db from "../Database/index.js";
export default function AssignmentRoutes(app) {
//   app.put("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     const course = req.body;
//     Database.courses = Database.courses.map((c) =>
//       c._id === id ? { ...c, ...course } : c
//     );
//     res.sendStatus(204);
//   });

app.put("/api/courses/:id/", (req, res) => {
    const { id } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (m) => m._id === id);
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body
    };
    res.sendStatus(204);
  });


app.delete("/api/courses/assignments/:id", (req, res) => {
    const { id } = req.params;
    db.assignments = db.assignments.filter((m) => m._id !== id);
    res.sendStatus(200);
  });





  
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });


  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((m) => m.course === cid);
    res.send(assignments);
  });

//   app.delete("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     Database.courses = Database.courses.filter((c) => c._id !== id);
//     res.sendStatus(204);
//   });
}
