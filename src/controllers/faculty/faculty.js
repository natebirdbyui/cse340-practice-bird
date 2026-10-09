const facultyDetailPage = (req, res, next) => {
    const { facultyId } = req.params;
    const facultyMember = getFacultyById(facultyId);

    if (!facultyMember) {
        const err = new Error('Faculty member not found');
        err.status = 404;
        return next(err); // Triggers handle404 / handleErrors middleware
    }

    res.render('faculty/detail', {
        title: facultyMember.name,
        faculty: facultyMember
    });
};