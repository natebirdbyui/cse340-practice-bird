// src/controllers/error.js

// Catches standard unhandled routes (e.g., /random-invalid-url)
const handle404 = (req, res, next) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found',
        message: 'Sorry, the page or resource you requested could not be found.',
        url: req.originalUrl
    });
};

// Catches thrown/forwarded errors (e.g., return next(err))
const handleErrors = (err, req, res, next) => {
    const statusCode = err.status || 500;

    // Log the error stack to terminal in development mode
    if (res.locals.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // If the error status is 404, render the error404 template cleanly
    if (statusCode === 404) {
        return res.status(404).render('404', {
            title: '404 - Resource Not Found',
            message: err.message || 'The requested resource could not be found.',
            url: req.originalUrl
        });
    }

    // Otherwise render error.ejs for 500/general server errors
    res.status(statusCode).render('500', {
        title: `${statusCode} - Server Error`,
        message: err.message || 'An unexpected error occurred on our server.',
        error: res.locals.NODE_ENV === 'development' ? err : {}
    });
};

export { handle404, handleErrors };