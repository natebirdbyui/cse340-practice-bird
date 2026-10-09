// src/controllers/error.js

// Handle 404 - Resource Not Found
const handle404 = (req, res, next) => {
    res.status(404).render('error404', { // pulls from error404.ejs
        title: '404 - Page Not Found',
        message: 'Sorry, the page or resource you requested could not be found.',
        url: req.originalUrl
    });
};

// Handle 500 & General Errors (Must have 4 arguments for Express to recognize as error middleware)
const handleErrors = (err, req, res, next) => {
    const statusCode = err.status || 500;
    
    // Log the error stack in development for debugging
    if (res.locals.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    res.status(statusCode).render('error', {
        title: `${statusCode} - Server Error`,
        message: err.message || 'An unexpected error occurred on our server.',
        error: res.locals.NODE_ENV === 'development' ? err : {}
    });
};

export { handle404, handleErrors };