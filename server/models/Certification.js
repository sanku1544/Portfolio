import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String },
  image: { type: String }
});

const Certification = mongoose.model('Certification', certificationSchema);
export default Certification;
