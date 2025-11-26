import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String }, // Can be a URL or icon name
  category: { type: String, default: 'Other' }, // Frontend, Backend, Tools
  proficiency: { type: Number } // 0-100
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
