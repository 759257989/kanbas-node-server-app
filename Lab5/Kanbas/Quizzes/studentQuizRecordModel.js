// import mongoose from "mongoose";
// import studentQuizRecordSchema from "./studentQuizRecordSchema";
// const studentQuizRecordModel = mongoose.model("studentQuizRecordsModel", studentQuizRecordSchema);
// export default studentQuizRecordModel;  


import mongoose from "mongoose";
import studentQuizRecordSchema from "./studentQuizRecordSchema.js";

// Create the model with a consistent naming convention
const StudentQuizRecordModel = mongoose.model("StudentQuizRecord", studentQuizRecordSchema);

export default StudentQuizRecordModel;
