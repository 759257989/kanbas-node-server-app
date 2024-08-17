

// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//     enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
//   },
//   title: { type: String, required: true },
//   points: { type: Number, required: true },
//   content: { type: String, required: true }, // The actual question content (WYSIWYG)
  
//   // For Multiple Choice Questions
//   options: {
//     type: [String],
//     validate: {
//       validator: function (v) {
//         return v.length > 1; // Ensure there are at least two options
//       },
//       message: "A multiple choice question must have at least two options.",
//     },
//   },
//   correctAnswer: {
//     type: Number, // Index of the correct option in `options` array
//     validate: {
//       validator: function (v) {
//         return this.type !== "Multiple Choice" || (v >= 0 && v < this.options.length);
//       },
//       message: "Correct answer must be a valid index of the options array.",
//     },
//   },

//   // For True/False Questions
//   correctAnswerBoolean: {
//     type: Boolean, // True or False
//     validate: {
//       validator: function (v) {
//         return this.type !== "True/False" || typeof v === "boolean";
//       },
//       message: "Correct answer must be either true or false.",
//     },
//   },

//   // For Fill in the Blank Questions
//   possibleAnswers: {
//     type: [String], // Array of possible correct answers
//     validate: {
//       validator: function (v) {
//         return this.type !== "Fill in the Blank" || v.length > 0;
//       },
//       message: "Fill in the blank question must have at least one correct answer.",
//     },
//   },
//   caseInsensitive: { type: Boolean, default: true }, // Optionally ignore case in correct answers
// });

// const quizSchema = new mongoose.Schema(
//   {
//     name: { type: String},
//     description: { type: String },
//     course: { type: String},
//     due: { type: Date },
//     availableDate: { type: Date },
//     untilDate: { type: Date }, // Added until date
//     points: { type: Number }, // Calculated as the sum of question points
//     questionsNumber: { type: Number },
//     publishedStatus: { type: Boolean, default: false },
//     quizType: {
//       type: String,
//       enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
//       default: "Graded Quiz",
//     },
//     assignmentGroup: {
//       type: String,
//       enum: ["Quizzes", "Exams", "Assignments", "Project"],
//       default: "Quizzes",
//     },
//     shuffleAnswers: { type: Boolean, default: true }, // Yes (default) / No
//     timeLimit: { type: Number, default: 20 }, // Time limit in minutes
//     multipleAttempts: { type: Boolean, default: false }, // No (default) / Yes
//     howManyAttempts: { type: Number, default: 1 }, // Default 1, relevant if multipleAttempts is true
//     showCorrectAnswers: {
//       type: String,
//       enum: ["Always", "After Due Date", "Never"],
//       default: "Never",
//     },
//     accessCode: { type: String, default: "" }, // Passcode for access
//     oneQuestionAtATime: { type: Boolean, default: true }, // Yes (default) / No
//     webcamRequired: { type: Boolean, default: false }, // No (default) / Yes
//     lockQuestionsAfterAnswering: { type: Boolean, default: false }, // No (default) / Yes

//     questions: [questionSchema], // Array of questions
//   }, 
//   { collection: "quizzes" }
// );

// export default quizSchema;


import mongoose from "mongoose";
import studentQuizRecordModel from "./studentQuizRecordSchema.js";

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
  },
  title: { type: String, required: true },
  points: { type: Number, required: true },
  content: { type: String, required: true }, // The actual question content (WYSIWYG)
  
  // For Multiple Choice Questions
  options: [String], // Optional, used only for Multiple Choice

  correctAnswer: {
    type: mongoose.Schema.Types.Mixed, // Can store a Number, String, or Boolean
    required: true,
    validate: {
      validator: function (v) {
        if (this.type === "Multiple Choice") {
          return typeof v === "number";
        } else if (this.type === "True/False") {
          return typeof v === "boolean";
        } else if (this.type === "Fill in the Blank") {
          return typeof v === "string";
        }
        return false;
      },
      message: (props) => `Invalid correctAnswer for question type ${props.path}: ${props.value}`
    }
  },

  // For Fill in the Blank Questions
  possibleAnswers: [String], // Optional, used only for Fill in the Blank
  caseInsensitive: { type: Boolean, default: true }, // Optionally ignore case in correct answers
});

const quizSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    course: { type: String, required: true },
    due: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },
    points: { type: Number, required: true }, // Calculated as the sum of question points
    questionsNumber: { type: Number, required: true },
    publishedStatus: { type: Boolean, default: false },
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: ["Always", "After Due Date", "Never"],
      default: "Never",
    },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },

    questions: [questionSchema], // Array of questions

    studentQuizRecords: [{type: mongoose.Schema.Types.ObjectId, ref: 'StudentQuizRecord' }]
  },
  { collection: "quizzes" }
);

export default quizSchema;
