/**
 * Controller for rendering the home page
 */
export const homePage = (req, res) => {
    res.render('home', {
        title: 'Home'
    });
};