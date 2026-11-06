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

async function editUserProfile(req, res) {
    const targetUserId = parseInt(req.params.userId);
    const currentUser = res.locals.accountData || req.session.accountData;

  // Allow if user is an Admin OR if they are editing their own account
    const canEdit = currentUser.role_name === 'Admin' || currentUser.account_id === targetUserId;

    if (!canEdit) {
        req.flash("notice", "You are not authorized to update this profile.");
        return res.redirect("/");
    }

  // Proceed with update logic...
}

export { editUserProfile };