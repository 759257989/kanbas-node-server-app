import express from 'express';
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js"
import cors from "cors";
import CourseRoutes from "./Lab5/Kanbas/Courses/routes.js";
import ModuleRoutes from "./Lab5/Kanbas/Modules/routes.js";
import AssignmentRoutes from './Lab5/Kanbas/Assignments/routes.js';
import mongoose from "mongoose";
// import UserRoutes from "./Users/routes.js";
import UserRoutes from "./User/routes.js";
import "dotenv/config";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);


const app = express()         
app.use(express.json());
app.use(cors());  
app.use(express.json()); 

ModuleRoutes(app);


CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Hello(app)
Lab5(app);

app.listen(process.env.PORT || 4000)
