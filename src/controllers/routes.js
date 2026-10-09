import express from 'express'; // Import the Express framework for routing
import {facultyListPage, facultyDetailPage } from './catalog/catalog.js';

const router = express.Router();

// existing routes for faculty pages
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultyId', facultyDetailPage);

export default router;