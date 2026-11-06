import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

// 1. Faculty List Page with Sorting
const facultyListPage = async (req, res, next) => {
    try {
        const sortBy = req.query.sort || 'name';
        
        // Use the imported model function and pass the sort query
        const faculty = await getSortedFaculty(sortBy);

        res.render('faculty/list', {
            title: 'Faculty Directory',
            facultyList: faculty || [], 
            currentSort: sortBy
        });
    } catch (err) {
        next(err);
    }
};

// 2. Faculty Detail Page
const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);

    if (!facultyMember || Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: `${facultyMember.name} Faculty Profile`,
        faculty: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };