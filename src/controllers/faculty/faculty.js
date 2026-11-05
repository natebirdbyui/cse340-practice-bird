import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

export const facultyListPage = async (req, res, next) => {
    try {
        const sortBy = req.query.sortBy || 'name';
        const facultyList = await getSortedFaculty(sortBy);

        res.render('faculty/list', {
            title: 'Faculty Directory',
            facultyList,
            currentSort: sortBy
        });
    } catch (err) {
        next(err);
    }
};

export const facultyDetailPage = async (req, res, next) => {
    try {
        const { facultyId } = req.params;
        const facultyMember = await getFacultyById(facultyId);

        if (!facultyMember) {
            const err = new Error('Faculty member not found');
            err.status = 404;
            return next(err);
        }

        res.render('faculty/detail', {
            title: facultyMember.name,
            faculty: facultyMember
        });
    } catch (err) {
        next(err);
    }
};