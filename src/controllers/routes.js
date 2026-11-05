import express from 'express'; // Import the Express framework for routing
import { facultyListPage, facultyDetailPage } from './faculty/faculty.js';
import { catalogListPage, courseDetailPage } from './catalog/catalog.js';
import { homePage } from './index.js';
import { loginPage, loginUser } from './authcontroller.js';

const router = express.Router();

// 1. Homepage Route (THIS WAS MISSING)
router.get('/', homePage);

// Existing routes for faculty and catalog pages
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultyId', facultyDetailPage);
router.get('/catalog', catalogListPage);
router.get('/catalog/:courseId', courseDetailPage);

// Login middleware and routes
router.use('/login', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/login.css">');
    next();
});
router.get('/login', loginPage); // Uncomment if you have a controller for it

export default router;