import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    number: {
        type: String,
        // required: true, // Course number is required
        // unique: true,   // Course number should be unique
      },
      name: {
        type: String,
        // required: true, // Course name is required
      },
      startDate: {
        type: Date,
        // required: true, // Start date is required
      },
      endDate: {
        type: Date,
        // required: true, // End date is required
      },
      department: {
        type: String,
        // required: true, // Department code is required
      },
      credits: {
        type: Number,
        // required: true, // Credits are required
        min: 0          // Minimum credits should be 0
      },
      description: {
        type: String,
        // required: false, // Description is optional
      },
    }, {
      collection: 'courses' // Name of the collection in MongoDB
         // Adds createdAt and updatedAt timestamps
    });
export default courseSchema;
