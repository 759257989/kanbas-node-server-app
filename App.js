import express from "express";
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js";
import cors from "cors";
import CourseRoutes from "./Lab5/Kanbas/Courses/routes.js";
import ModuleRoutes from "./Lab5/Kanbas/Modules/routes.js";
import "dotenv/config";
import AssignmentRoutes from "./Lab5/Kanbas/Assignments/routes.js";
import mongoose from "mongoose";
// import UserRoutes from "./Users/routes.js";
import UserRoutes from "./Lab5/Kanbas/User/routes.js";
import session from "express-session";
import QuizRoutes from "./Lab5/Kanbas/Quizzes/routes.js";
const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

// const CONNECTION_STRING =
//    "mongodb://127.0.0.1:27017/kanbas";
// mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};


// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//       sameSite: "none",
//       secure: true,
//       domain: process.env.NODE_SERVER_DOMAIN,
//     };
//   }
  app.use(session(sessionOptions));
  
//
//   app.use(express.json());

ModuleRoutes(app);

CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
QuizRoutes(app);


Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
