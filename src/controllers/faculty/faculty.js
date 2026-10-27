import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';
import pool from '../../config/db.js';



const facultyListPage = (req, res) => {
    const sortBy = req.query.sortBy || 'name';
    const facultyList = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        facultyList,
        currentSort: sortBy
    });
};

const facultyDetailPage = (req, res, next) => {
    const { facultyId } = req.params;
    const facultyMember = getFacultyById(facultyId);

    if (!facultyMember) {
        const err = new Error('Faculty member not found');
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: facultyMember.name,
        faculty: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };
export async function getSortedFaculty(sortBy) {
    // Example query using the shared pool
    const result = await pool.query('SELECT * FROM faculty');
    return result.rows;
}