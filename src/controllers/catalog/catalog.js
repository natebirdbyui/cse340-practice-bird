//import { getAllCourses, getCourseById } from '../../models/catalog/catalog.js';
import { getAllCourses, getCourseBySlug } from '../../models/catalog/courses.js';
import { getSectionsByCourseSlug } from '../../models/catalog/catalog.js';

// 1. Catalog List Page
const catalogListPage = async (req, res) => {
    const courses = await getAllCourses();

    //console.log(courses);

    res.render('catalog', {
        title: 'Course Catalog',
        courses: courses
    });
};

// 2. Course Detail Page with Sorting
const courseDetailPage = async (req, res, next) => {
    const courseSlug = req.params.slugId;
    const course = await getCourseBySlug(courseSlug);

    // Handle course not found - passes error to global error handler in server.js
    if (!course || Object.keys(course).length === 0) {
        const err = new Error(`Course ${courseSlug} not found`);
        err.status = 404;
        return next(err);
    }   

    // Fetch sections using your imported model function
    const sortBy = req.query.sort || 'time';
    const sections = await getSectionsByCourseSlug(courseSlug, sortBy);

    //console.log(sections);
    // Create a shallow copy of sections array before sorting (with safety fallback)
    let sortedSections = [...(sections || [])];

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

    //console.log(`Viewing course: ${courseSlug}, sorted by: ${sortBy}`);

    // Renders src/views/course-detail.ejs
    res.render('course-detail', {
        title: `${course.courseCode} - ${course.title}`,
        course: course,
        sections: sortedSections,
        currentSort: sortBy
    });
};

export { catalogListPage, courseDetailPage };