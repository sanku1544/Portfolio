import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import GeneralInfo from './models/GeneralInfo.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_krishna')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    // Check if admin exists
    // Check if admin exists
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      const newAdmin = new User({ username: 'admin', password: 'password123', role: 'admin' });
      await newAdmin.save();
      console.log('Admin user created: admin / password123');
    } else {
      admin.password = 'password123';
      await admin.save();
      console.log('Admin user updated: admin / password123');
    }

    // Seed General Info
    const infoExists = await GeneralInfo.findOne();
    if (!infoExists) {
      await GeneralInfo.create({
        name: 'Krishna Patil',
        role: 'MERN Stack Developer',
        aboutDescription: 'Passionate developer...',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com'
      });
      console.log('General Info seeded');
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
