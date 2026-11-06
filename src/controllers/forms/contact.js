import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createContactForm, getAllContactForms } from '../../models/forms/contact.js';

const router = Router();

/**
 * Display the contact form page.
 */
const showContactForm = (req, res) => {
    res.render('forms/contact/form', {
        title: 'Contact Us'
    });
};

/**
 * Handle contact form submission with validation.
 * If validation passes, save to database and redirect.
 * If validation fails, log errors and redirect back to form.
 */
const handleContactSubmission = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
            console.error(error);
        });
        return res.redirect('/contact');
    }

    const { name, email, subject, message } = req.body;

    try {
        await createContactForm({ name, email, subject, message });

        req.flash('success', 'Thank you for contacting us! We will respond soon.');
        return res.redirect('/contact');
    } catch (error) {
        console.error('Error saving contact form:', error);
        req.flash('error', 'Unable to submit your message. Please try again later.');
        return res.redirect('/contact');
    }
};


/**
 * Display all contact form submissions.
 */
const showContactResponses = async (req, res) => {
    let contactForms = [];

    try {
        contactForms = await getAllContactForms();
    } catch (error) {
        req.flash('error', 'Unable to retrieve contact form submissions.');
        console.error('Error retrieving contact forms:', error);
    }

    res.render('forms/contact/responses', {
        title: 'Contact Form Submissions',
        contactForms
    });
};

/**
 * GET /contact - Display the contact form
 */
router.get('/', showContactForm);

/**
 * POST /contact - Handle contact form submission with validation
 */
router.post('/',
    [
        body('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage('name must be at least 2 characters'),
        
        body('email')
        .trim()
        .isLength({ min: 2 })
        .withMessage('email must be at least 2 characters'),

        body('subject')
            .trim()
            .isLength({ min: 2 })
            .withMessage('Subject must be at least 2 characters'),
        body('message')
            .trim()
            .isLength({ min: 10 })
            .withMessage('Message must be at least 10 characters')
    ],
    handleContactSubmission
);

/**
 * GET /contact/responses - Display all contact form submissions
 */
router.get('/responses', showContactResponses);

export default router;