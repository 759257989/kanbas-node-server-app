import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"], 
      default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
  
    enrolledCourses: [
      { //store the course numbers
        
        number: String
      }
    ]
    ,
    quizzes: [
      {
          quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
          courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
          answers: Map,
          score: Number,
          attempt: Number,
          date: { type: Date, default: Date.now },
      }
  ]
  },
  { collection: "users" }
);
export default userSchema; 