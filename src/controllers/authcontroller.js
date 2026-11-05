/**
 * Controller for handling user authentication and login views
 */
export const loginPage = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};

export const loginUser = (req, res) => {
    // Handle login form submission logic here later
    res.redirect('/');
};