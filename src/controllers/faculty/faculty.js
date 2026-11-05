import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';
import pool from '../db.js';

const facultyListPage = (req, res, next) => {
    try {
        const sortBy = req.query.sortBy || 'name';
        const facultyList = getSortedFaculty(sortBy); // Add await if this is an async database call

        res.render('faculty/list', {
            title: 'Faculty Directory',
            facultyList,
            currentSort: sortBy
        });
    } catch (err) {
        next(err);
    }
};

const facultyDetailPage = (req, res, next) => {
    try {
        const { facultyId } = req.params;
        const facultyMember = getFacultyById(facultyId); // Add await if this is an async database call

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

export { facultyListPage, facultyDetailPage };
export const getSortedFaculty = async (sortBy) => {
    const result = await pool.query(`SELECT * FROM faculty ORDER BY ${sortBy}`);
    return result.rows; 
};

export const getFacultyById = async (facultyId) => {
    const result = await pool.query('SELECT * FROM faculty WHERE id = $1', [facultyId]);
    return result.rows[0];
};