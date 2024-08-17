import db from "../Database/index.js";
import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
  
//     app.post("/api/courses/:cid/modules", (req, res) => {
//         const { cid } = req.params;
//         const newModule = {
//           ...req.body,
//           course: cid,
//           _id: new Date().getTime().toString(),
//         };
//         db.modules.push(newModule);
//         res.send(newModule);
//       }); 
    
//     app.get("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const modules = db.modules.filter((m) => m.course === cid);
//     res.json(modules);
//   });

//   app.delete("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     db.modules = db.modules.filter((m) => m._id !== mid);
//     res.sendStatus(200);
//   });

//   app.put("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     const moduleIndex = db.modules.findIndex(
//       (m) => m._id === mid);
//     db.modules[moduleIndex] = {
//       ...db.modules[moduleIndex],
//       ...req.body
//     };
//     res.sendStatus(204);
//   });
// }

  const findAllModules = async (req, res) => {
    // const { cid } = req.params;
    // console.log("module req params: ",req.params)
    const modules = await dao.findAllModules(req.params.cid)
    // console.log("module routes modules find: ",modules)
    res.json(modules)
  }

  const deleteModuleById = async (req, res) => {
    // console.log("module routes delete params: ",req.params)
    const status = await dao.deleteModule(req.params.mid)
    // console.log("module routes delete status: ", status)
    res.sendStatus(200);
  }

  const updateModuleById = async (req, res) => {
    // console.log("module routes update params: ",req.params)
    const status = await dao.updateModule(req.params.mid, req.body)
    // console.log("the module routes update status: ", status)
    res.sendStatus(204);
  }

  const createModule = async (req, res) => {
    console.log("module create route req param body: ", req.body)
    const newModule = await dao.createModule(req.body)
    res.json(newModule)
  }

  app.post("/api/courses/:cid/modules", createModule); 

app.get("/api/courses/:cid/modules", findAllModules);

app.delete("/api/modules/:mid", deleteModuleById);

app.put("/api/modules/:mid", updateModuleById);

}
