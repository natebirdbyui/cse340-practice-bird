import express from 'express'; // Import the Express framework for routing
import {facultyListPage, facultyDetailPage } from './faculty/faculty.js';
import { catalogListPage, courseDetailPage } from './catalog/catalog.js';
const router = express.Router();

// existing routes for faculty pages
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultyId', facultyDetailPage);
router.get('/catalog', catalogListPage);
router.get('/catalog/:courseId', courseDetailPage);

export default router;