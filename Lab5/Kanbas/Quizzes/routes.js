import * as dao from "./dao.js";
import * as studentQuizDao from './studentQuizRecorddao.js'; // Adjust the path if necessary

export default function QuizRoutes(app) {


    //fetch user quizdata
    const findUserScore = async(req,res) => {
        const result = await studentQuizDao.findRecordByQIdFAndUId (req.params.qid, req.params.uid)
        if (result !== null) {
            const score = result.score
        res.json(score)
        } else {
            res.json(null)
        }
        
    }

    app.get("/api/quizzes/:qid/:uid/score",findUserScore)


    // taking the quiz routes
    const findQuizAttempsInfoByQIdAndUId = async (req, res) => {
        const result = await studentQuizDao.findRecordByQIdFAndUId (req.params.qid, req.params.uid)
        res.json(result)
    }

    app.get("/api/quizzes/:qid/:uid/attemptsTook",findQuizAttempsInfoByQIdAndUId)



    //update new attempt records in collection
   const saveUserAttempResult = async(req,res) => {
    const new_attempt = req.body
    const status = studentQuizDao.saveOrUpdateStudentQuizRecord(req.params.uid, req.params.qid, req.body)
    res.sendStatus(204);
   } 
   app.put("/api/quizzes/:qid/:uid/saveAttempt",saveUserAttempResult )

    //////////////////////////////////////////////////////////////////////
    //get the quizzes in course
    const findAllQuizzes = async (req, res) => {
        
        // console.log("module req params: ",req.params)
        const quizzes = await dao.findAllQuizzes(req.params.cid)
        // console.log("quiz routes.js quizes find: ",quizzes)
        res.json(quizzes)
      }

    app.get("/api/quizzes/:cid/quizzes", findAllQuizzes );

    const createQuiz = async (req, res) => {
        // console.log("quiz create route req param body: ", req.body)
        const newQuiz = await dao.createQuiz(req.body)
        res.json(newQuiz)
      }

    app.post("/api/quizzes/:cid/quiz", createQuiz);

    const deleteQuizById = async (req, res) => {
        console.log("quiz routes delete params: ",req.params)
        const status = await dao.deleteQuiz(req.params.qid)
        // console.log("module routes delete status: ", status)
        res.sendStatus(200);
      }
    app.delete("/api/quizzes/:qid", deleteQuizById)


    const updateQuizById = async (req, res) => {
        // console.log("module routes update params: ",req.params)
        const status = await dao.updateQuiz(req.params.qid, req.body)
        // console.log("the module routes update status: ", status)
        res.sendStatus(204);
      }
    
      app.put("/api/quizzes/:qid", updateQuizById);

      const updatePublishedStatus = async (req, res) => {
        try {
            const quizId = req.params.qid;
    
            // Find the quiz by ID
            const quiz = await dao.findQuizById(quizId);
            if (!quiz) {
                return res.status(404).json({ error: "Quiz not found" });
            }
    
            console.log("Current quiz data:", quiz);
    
            // Toggle the publishedStatus
            const updatedPublishedStatus = !quiz.publishedStatus;
    
            // Save the updated quiz back to the database
            const updatedQuiz = await dao.setPublishedStats(quizId, { publishedStatus: updatedPublishedStatus });
    
            console.log("Updated quiz data:", updatedQuiz);
    
            // Send the updated quiz as a response
            res.json(updatedQuiz);
        } catch (error) {
            console.error("Error updating quiz published status:", error);
            res.status(500).json({ error: "Failed to update quiz" });
        }
    };
    
    app.patch("/api/quizzes/:qid", updatePublishedStatus);

    const findQuizById  = async (req, res) => {
        // console.log("module req params: ",req.params)
        const quiz = await dao.findQuizById(req.params.qid)
        console.log("quiz routes.js quizes find by find: ",quiz)
        res.json(quiz)
      }
     
      app.get("/api/quizzes/:qid/findById", findQuizById );



      /////////////////////////////////////////////////////////////////////////////
    
    // Submit quiz route
    const submitQuiz = async (req, res) => {
        const { cid, qid } = req.params;
        const { studentId, answers } = req.body;

        try {
            // Find the quiz by ID
            const quiz = await dao.findQuizById(qid);
            if (!quiz) {
                return res.status(404).json({ error: "Quiz not found" });
            }

            // Validate the number of attempts left for the student
            const studentQuizRecord = await dao.findStudentQuizRecord(studentId, qid);
            if (studentQuizRecord && studentQuizRecord.attempts >= quiz.howManyAttempts) {
                return res.status(400).json({ error: "No attempts left" });
            }

            // Score the quiz
            let score = 0;
            quiz.questions.forEach(question => {
                if (answers[question._id] === question.correctAnswer) {
                    score += question.points;
                }
            });

            // Save the student's quiz submission
            const submission = await dao.saveQuizSubmission(studentId, qid, cid, answers, score);

            // Return the result
            res.json({ submission, score });
        } catch (error) {
            console.error("Error submitting quiz:", error);
            res.status(500).json({ error: "Failed to submit quiz" });
        }
    };

    app.post("/api/courses/:cid/quizzes/:qid/submit", submitQuiz);
}
