import model from "./model.js";

export const findAllQuizzes = (cid) => model.find({course: cid});
export const createQuiz = (quiz) => model.create(quiz);
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findQuizById = (qid) => model.find({_id:qid});
const findQuizByIdFindbyId = (qid) => model.findById(qid);
export const setPublishedStats = (quizId, updateData) => {
    return model.findByIdAndUpdate(
        quizId,
        { $set: updateData },
        { new: true }  // This option ensures the returned document is the updated one
    );
};

export const updateQuiz = (qid, updateData) => {
    return model.findByIdAndUpdate(
        qid,
        { $set: updateData },
        { new: true }  // This option returns the updated document
    );
};


//////////////////////////////////////////////////////////////
