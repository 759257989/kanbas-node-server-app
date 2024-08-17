import model from "./model.js";

export const createCourse = (course) => model.create(course);
export const findAllCourses = () => model.find();
export const findCourseById = (courseId) => model.findById({ _id: courseId });
export const updateCourse = (courseId, course) =>  model.updateOne({ _id: courseId }, { $set: course});
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
export const findFacultyAllCourses = (id) => model.find({creator: id})
export const findCourseByNumber = (courseNumber) => model.find({number: courseNumber})

// export const findStudentAllCourses = (id) => model.find({creator: id}) 