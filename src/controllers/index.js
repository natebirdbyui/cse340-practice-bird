/**
 * Controller for rendering the home page
 */
export const homePage = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};

export const aboutPage = (req, res) => {
    res.render('about', {
        title: 'About'
    });
};

export const demoPage = (req, res) => {
    res.render('demo', {
        title: 'Demo'
    });
};

export const testErrorPage = (req, res) => {
    res.render('test-error', {
        title: 'Test Error'
    });
};  

export const contactPage = (req, res) => {
    res.render('contact', {
        title: 'Contact'
    });
};

export const loginPage = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};

export const registerPage = (req, res) => { 
    res.render('register', {
        title: 'Register'
    });
};