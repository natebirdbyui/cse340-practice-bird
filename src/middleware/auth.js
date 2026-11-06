/**
 * Middleware to require authentication for protected routes.
 * Redirects to login page if user is not authenticated.
 * Sets res.locals.isLoggedIn = true for authenticated requests.
 */
const requireLogin = (req, res, next) => {
    // Check if user is logged in via session; we can beef this up later with roles and permissions
    if (req.session && req.session.user) {
        // User is authenticated - set UI state and continue
        res.locals.isLoggedIn = true;
        next();
    } else {
        // User is not authenticated - redirect to login
        res.redirect('/login');
    }
};

// Middleware to require specific role
const requireRole = (roleName) => {
    return (req, res, next) => {
        if (!req.session || !req.session.accountData) {
            req.flash("notice", "Please log in.");
            return res.redirect("/account/login");
        }
        
        if (req.session.accountData.role_name !== roleName) {
            req.flash("notice", "You do not have permission to access this resource.");
            return res.redirect("/");
        }
        
        next();
    };
};



export { requireLogin, requireRole };