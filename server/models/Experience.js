import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String },
  technologies: [{ type: String }],
  order: { type: Number, default: 0 }
});

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
