// Faculty data object
const faculty = {
    'brother-jack': {
        name: 'Brother Jack',
        office: 'STC 392',
        phone: '208-496-1234',
        email: 'jackb@byui.edu',
        department: 'Computer Science',
        title: 'Associate Professor'
    },
    'sister-enkey': {
        name: 'Sister Enkey',
        office: 'STC 394',
        phone: '208-496-2345', 
        email: 'enkeys@byui.edu',
        department: 'Computer Science',
        title: 'Assistant Professor'
    },
    'brother-keers': {
        name: 'Brother Keers',
        office: 'STC 390',
        phone: '208-496-3456',
        email: 'keersb@byui.edu',
        department: 'Computer Science', 
        title: 'Professor'
    },
    'sister-anderson': {
        name: 'Sister Anderson',
        office: 'MC 301',
        phone: '208-496-4567',
        email: 'andersons@byui.edu',
        department: 'Mathematics',
        title: 'Professor'
    },
    'brother-miller': {
        name: 'Brother Miller',
        office: 'MC 305',
        phone: '208-496-5678',
        email: 'millerb@byui.edu',
        department: 'Mathematics',
        title: 'Associate Professor'
    },
    'brother-thompson': {
        name: 'Brother Thompson', 
        office: 'MC 307',
        phone: '208-496-6789',
        email: 'thompsonb@byui.edu',
        department: 'Mathematics',
        title: 'Assistant Professor'
    },
    'brother-davis': {
        name: 'Brother Davis',
        office: 'GEB 205',
        phone: '208-496-7890',
        email: 'davisb@byui.edu',
        department: 'English',
        title: 'Professor'
    },
    'brother-wilson': {
        name: 'Brother Wilson',
        office: 'GEB 301', 
        phone: '208-496-8901',
        email: 'wilsonb@byui.edu',
        department: 'History',
        title: 'Associate Professor'
    },
    'sister-roberts': {
        name: 'Sister Roberts',
        office: 'GEB 305',
        phone: '208-496-9012',
        email: 'robertss@byui.edu',
        department: 'History', 
        title: 'Assistant Professor'
    }
};

export const getSortedFaculty = (sortBy) => {
    const validSortFields = ['name', 'department', 'title'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'department';

    const facultyArray = [];
    for (const key in faculty) {
        facultyArray.push({ ...faculty[key], id: key });
    }

    facultyArray.sort((a, b) => {
        const valA = a[sortField] || '';
        const valB = b[sortField] || '';
        return valA.localeCompare(valB);
    });

    return facultyArray;
};

export const getFacultyById = (facultyId) => {
    const member = faculty[facultyId];
    if (!member) {
        return null;
    }
    return { ...member, id: facultyId };
};

// Slug lookup maps directly to your key names (e.g., 'brother-jack')
export const getFacultyBySlug = (slug) => {
    const member = faculty[slug];
    if (!member) {
        return {}; // Returns empty object to trigger 404 check in controller
    }
    return { ...member, id: slug };
};