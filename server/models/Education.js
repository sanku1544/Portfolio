import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: String, required: true },
  grade: { type: String },
  description: { type: String }
});

const Education = mongoose.model('Education', educationSchema);
export default Education;
