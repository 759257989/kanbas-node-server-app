import mongoose from "mongoose";

const studentQuizRecordSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    // courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    answers: mongoose.Schema.Types.Mixed, // Stores answers given by the student
    score: { type: Number },
    attempts: { type: Number, default: 1 },
    
}, { collection: "student_quiz_records" });

// export default mongoose.model("StudentQuizRecord", studentQuizRecordSchema);
export default studentQuizRecordSchema;