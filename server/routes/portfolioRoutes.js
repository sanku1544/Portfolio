import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getGeneralInfo, updateGeneralInfo,
  getProjects, createProject, updateProject, deleteProject,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getEducation, createEducation, updateEducation, deleteEducation,
  getSkills, createSkill, updateSkill, deleteSkill,
  getCertifications, createCertification, updateCertification, deleteCertification,
  sendMessage, getMessages, deleteMessage
} from '../controllers/portfolioController.js';

const router = express.Router();

// Public Routes
router.get('/general', getGeneralInfo);
router.get('/projects', getProjects);
router.get('/experience', getExperiences);
router.get('/education', getEducation);
router.get('/skills', getSkills);
router.get('/certifications', getCertifications);
router.post('/contact', sendMessage);

// Protected Routes
router.put('/general', protect, updateGeneralInfo);

router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

router.post('/experience', protect, createExperience);
router.put('/experience/:id', protect, updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

router.post('/education', protect, createEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

router.post('/certifications', protect, createCertification);
router.put('/certifications/:id', protect, updateCertification);
router.delete('/certifications/:id', protect, deleteCertification);

router.get('/messages', protect, getMessages);
router.delete('/messages/:id', protect, deleteMessage);

export default router;
