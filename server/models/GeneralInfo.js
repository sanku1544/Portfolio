import mongoose from 'mongoose';

const generalInfoSchema = new mongoose.Schema({
  name: { type: String, default: 'Sanket Nikam' },
  role: { type: String, default: 'MERN Stack Developer' },
  location: { type: String, default: 'Pune, India' },
  aboutDescription: { type: String },
  aboutImage: { type: String },
  heroImage: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  instagramUrl: { type: String },
  email: { type: String },
  phone: { type: String },
  resumeUrl: { type: String },
  views: { type: Number, default: 0 }
});

const GeneralInfo = mongoose.model('GeneralInfo', generalInfoSchema);
export default GeneralInfo;
