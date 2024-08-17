import StudentQuizRecordModel from "./studentQuizRecordModel.js";

// Find all quiz records for a specific student
export const findAllRecordsByStudent = (studentId) => {
    return StudentQuizRecordModel.find({ studentId });
};

// Find all quiz records for a specific quiz
export const findAllRecordsByQuiz = (quizId) => {
    return StudentQuizRecordModel.find({ quizId });
};

// Create a new quiz record for a student
export const createStudentQuizRecord = (record) => {
    return StudentQuizRecordModel.create(record);
};

// Delete a quiz record by its ID
export const deleteStudentQuizRecord = (recordId) => {
    return StudentQuizRecordModel.deleteOne({ _id: recordId });
};

// Find a specific quiz record by its ID
export const findRecordById = (recordId) => {
    return StudentQuizRecordModel.find({ _id: recordId });
};

// Find a specific quiz record by its ID using findById
export const findRecordByIdFindById = (recordId) => {
    return StudentQuizRecordModel.findById(recordId);
};

// Find a specific quiz record by its qID and userid 
export const findRecordByQIdFAndUId = (qid, uid) => {
    const record = StudentQuizRecordModel.findOne({ studentId: uid, quizId: qid });
    return record;
};


export const saveOrUpdateStudentQuizRecord = async (studentId, quizId, attemptData) => {
    try {
        // Check if the record already exists
        let existingRecord = await StudentQuizRecordModel.findOne({ studentId, quizId });

        if (existingRecord) {
            // If the record exists, update it
            existingRecord.attempts += 1;
            existingRecord.score = attemptData.score;
            existingRecord.answers = attemptData.answers;
            existingRecord.lastAttemptDate = new Date(); // Optional: Track when the last attempt was made
            await existingRecord.save();
        } else {
            // If no record exists, create a new one
            existingRecord = await StudentQuizRecordModel.create({
                studentId,
                quizId,
                // courseId,
                answers: attemptData.answers,
                score: attemptData.score,
                attempts: 1, // First attempt
                lastAttemptDate: new Date()
            });
        }

        return existingRecord; // Return the record (whether updated or newly created)
    } catch (error) {
        console.error("Error saving or updating quiz record:", error);
        throw error;
    }
};



// Update a quiz record's score or attempts
export const updateStudentQuizRecord = (recordId, updateData) => {
    return StudentQuizRecordModel.findByIdAndUpdate(
        recordId,
        { $set: updateData },
        { new: true }  // Return the updated document
    );
}; 

// Increment the number of attempts for a quiz record
export const incrementAttempts = (recordId) => {
    return StudentQuizRecordModel.findByIdAndUpdate(
        recordId,
        { $inc: { attempts: 1 } },
        { new: true }  // Return the updated document
    );
};

// Update the score of a quiz record
export const updateScore = (recordId, score) => {
    return StudentQuizRecordModel.findByIdAndUpdate(
        recordId,
        { $set: { score } },
        { new: true }  // Return the updated document
    );
};
