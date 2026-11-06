import { Router } from 'express';
import { addDemoHeaders } from '../middleware/demo/headers.js';
import { catalogListPage, courseDetailPage } from './catalog/catalog.js';
import { facultyListPage, facultyDetailPage } from './faculty/faculty.js';
import { homePage, aboutPage, demoPage, testErrorPage } from './index.js';
import contactRoutes from './forms/contact.js';
import registrationRoutes from './forms/registration.js';
import loginRoutes from './forms/login.js';
import { processLogout, showDashboard } from './forms/login.js';
import { requireLogin, requireRole } from '../middleware/auth.js';
// Fixed: Imported using standard ES import syntax instead of require()
import * as accountController from './authcontroller.js'; // Adjust path if authcontroller.js is located elsewhere

const router = Router();

// 1. Homepage Route
router.get('/', homePage);

// About Page
router.get('/about', aboutPage);

// Add catalog-specific styles to all catalog routes
router.use('/catalog', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/catalog.css">');
    next();
});

router.use('/faculty', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/faculty.css">');
    next();
});

router.use('/contact', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contact.css">');
    next();
});

router.use('/login', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/login.css">');
    next();
});

router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/register.css">');
    next();
});

// Routes for faculty and catalog pages
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultySlug', facultyDetailPage);

router.get('/catalog', catalogListPage);
router.get('/catalog/:slugId', courseDetailPage);

// Department Page Routes
router.get('/department', (req, res) => {
    res.render('department');
});

// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);

// Contact form routes
router.use('/contact', contactRoutes);
router.use('/register', registrationRoutes);

// User permission routes for admin
router.get("/admin/dashboard", requireRole("admin"), (req, res) => {
    res.render("admin/dashboard");
});

// Login routes (form and submission)
router.use('/login', loginRoutes);

// Authentication-related routes at root level
router.get('/logout', processLogout);

// Fixed: requireRole and requireLogin must come BEFORE showDashboard controller
router.get('/dashboard', requireLogin, requireRole('admin'), showDashboard);

export default router;