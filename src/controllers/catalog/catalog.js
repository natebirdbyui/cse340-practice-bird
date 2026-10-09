import { getAllCourses, getCourseById } from '../../models/catalog/catalog.js';

// 1. Catalog List Page
const catalogListPage = (req, res) => {
    const courses = getAllCourses();
    res.render('catalog', {
        title: 'Course Catalog',
        courses: courses
    });
};

// 2. Course Detail Page with Sorting
const courseDetailPage = (req, res, next) => {
    const courseId = req.params.courseId;
    const course = getCourseById(courseId);

    // Handle course not found - passes error to global error handler in server.js
    if (!course) {
        const err = new Error(`Course ${courseId} not found`);
        err.status = 404;
        return next(err);
    }

    // Get sort query parameter (default to 'time')
    const sortBy = req.query.sort || 'time';

    // Create a shallow copy of sections array before sorting
    let sortedSections = [...course.sections];

    switch (sortBy) {
        case 'professor':
            sortedSections.sort((a, b) => a.professor.localeCompare(b.professor));
            break;
        case 'room':
            sortedSections.sort((a, b) => a.room.localeCompare(b.room));
            break;
        case 'time':
        default:
            // Keep original time order
            break;
    }

    console.log(`Viewing course: ${courseId}, sorted by: ${sortBy}`);

    // Renders src/views/course-detail.ejs (Solution A)
    res.render('course-detail', {
        title: `${course.id} - ${course.title}`,
        course: { ...course, sections: sortedSections },
        currentSort: sortBy
    });
};

export { catalogListPage, courseDetailPage };