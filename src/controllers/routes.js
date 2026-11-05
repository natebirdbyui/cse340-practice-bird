import express from 'express'; // Import the Express framework for routing
import {facultyListPage, facultyDetailPage } from './faculty/faculty.js';
import { catalogListPage, courseDetailPage } from './catalog/catalog.js';
const router = express.Router();

// existing routes for faculty pages
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultyId', facultyDetailPage);
router.get('/catalog', catalogListPage);
router.get('/catalog/:courseId', courseDetailPage);

// Add login-specific styles to all login routes
router.use('/login', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/login.css">');
    next();
});

export default router;