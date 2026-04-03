// Basic mock backend to simulate API calls and database
export const mockBackend = {
    users: [
        { id: 1, name: 'Student One', email: 'student@test.com', role: 'student', password: 'password' },
        { id: 2, name: 'Teacher One', email: 'teacher@test.com', role: 'teacher', password: 'password' },
    ],

    // Hierarchical Data for Dropdowns
    years: ['2024', '2023', '2022', '2021'],
    colleges: ['RV College', 'BMS College', 'PES University', 'MSRIT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Electronics', 'Computer Science', 'Kannada', 'Comm Skills', 'Mechanical'],
    examTypes: ['Internal 1', 'Internal 2', 'Internal 3', 'Semester End Exam', 'Quiz'],

    // Question Papers Database
    questionPapers: [
        { id: 1, year: '2024', college: 'RV College', subject: 'Mathematics', type: 'Internal 1', file: 'math_ia1_2024.pdf' },
        { id: 2, year: '2023', college: 'BMS College', subject: 'Physics', type: 'Semester End Exam', file: 'phy_sem_2023.pdf' },
    ],

    // PYQs Database
    pyqs: [
        { id: 1, question: "Derive Euler's Equation of Motion", subject: "Mechanical", yearsAsked: [2018, 2021, 2023] },
        { id: 2, question: "Explain Heisenberg's Uncertainty Principle", subject: "Physics", yearsAsked: [2019, 2022] },
        { id: 3, question: "Prove Divergence Theorem", subject: "Mathematics", yearsAsked: [2020, 2023, 2024] },
    ],

    // Study Materials (Notes)
    studyMaterials: [
        { id: 1, title: 'Calculus Complete Notes', type: 'PDF', author: 'Prof. Smith', category: 'Teacher Note', verifiedBy: 'HOD' },
        { id: 2, title: 'Physics Mindmap - Unit 1', type: 'Image', author: 'Rank 1 Student', category: 'Best Student Note', verifiedBy: 'Prof. Jones' },
        { id: 3, title: 'Chemistry Short Notes', type: 'PDF', author: 'Dr. White', category: 'Teacher Note', verifiedBy: 'Self' },
        { id: 4, title: 'Data Structures Cheat Sheet', type: 'PDF', author: 'Student Club', category: 'Best Student Note', verifiedBy: 'Prof. Alan' },
    ],

    // Group Study
    studyGroups: [
        { id: 1, name: 'Late Night Coders', members: 12, topic: 'Programming', venue: 'Library Discussion Room 2', time: '8:00 PM', host: 'Alex' },
        { id: 2, name: 'Physics Phenoms', members: 5, topic: 'Physics', venue: 'Student Lounge', time: '5:30 PM', host: 'Sam' },
    ],

    // Study Marathons (New)
    marathons: [
        { id: 1, topic: 'Calculus Marathon', venue: 'Main Auditorium', duration: '3 Hours', host: 'Prof. David', date: '2024-03-30', status: 'Upcoming', canRegister: true },
        { id: 2, topic: 'Full Stack Dev Sprint', venue: 'Computer Lab 1', duration: '5 Hours', host: 'Coding Club', date: '2024-03-25', status: 'Completed', testAvailable: true, userScore: 85 },
    ],


    // Peer to Peer Tutoring Schedule
    p2pSchedule: [
        { id: 1, tutor: 'Sarah (Sem 5)', topic: 'Thermodynamics Basics', time: '2024-03-25 14:00', venue: 'Room 303', studentsRegistered: 5 },
        { id: 2, tutor: 'Mike (Sem 7)', topic: 'React JS Fundamentals', time: '2024-03-26 16:00', venue: 'Lab 2', studentsRegistered: 12 },
    ],

    attendance: {
        present: 88,
        total: 120,
        history: [
            { date: '2024-03-22', status: 'Present' },
            { date: '2024-03-21', status: 'Present' },
            { date: '2024-03-20', status: 'Absent' },
        ],
        // New Data for Redesign
        curriculums: ['2021 SCHEME', '2022 SCHEME'],
        terms: ['1', '2', '3', '4', '5', '6', '7', '8'],
        courseSummary: [
            { course: '1BEECT103 - Elements of Electronics Engineering', present: 42, total: 50, percentage: 84 },
            { course: '1BIMEK105 - Introduction to Mechanical Engineering', present: 45, total: 50, percentage: 90 },
            { course: '1BEECTL107 - Elements of Electronics Engineering Lab', present: 15, total: 15, percentage: 100 },
            { course: '1BENGK108 - Communication Skills - I', present: 18, total: 30, percentage: 60 },
            { course: '1BDTTK109 - Design Thinking and Tinkering Lab', present: 14, total: 15, percentage: 93 },
            { course: '1BCHEE102 - Applied Chemistry for EEE Stream', present: 38, total: 50, percentage: 76 },
            { course: '1BAIAK104 - Introduction to AI & its Applications', present: 48, total: 50, percentage: 96 },
            { course: '1BCHEEL106 - Applied Chemistry Lab for EEE Stream', present: 15, total: 15, percentage: 100 },
            { course: '1BKSKK110 - Samskruthika Kannada', present: 20, total: 20, percentage: 100 },
            { course: '1BMATE101 - Applied Mathematics - I for EE Stream', present: 40, total: 50, percentage: 80 },
        ],
        daywise: [
            { course: '1BMATE101 - Applied Mathematics', date: '22/03/2024', status: 'Present', docStatus: 'Verified' },
            { course: '1BCHEE102 - Applied Chemistry', date: '22/03/2024', status: 'Present', docStatus: 'Verified' },
            { course: '1BEECT103 - Elements of Electronics', date: '21/03/2024', status: 'Absent', docStatus: 'Pending' },
            { course: '1BAIAK104 - Introduction to AI', date: '21/03/2024', status: 'Present', docStatus: 'Verified' },
            { course: '1BIMEK105 - Mechanical Engg', date: '20/03/2024', status: 'Present', docStatus: 'Verified' },
        ]
    },

    libraryBooks: [
        { id: 101, title: 'Introduction to Algorithms', dueDate: '2024-04-10', status: 'Borrowed' },
        { id: 102, title: 'Clean Code: A Handbook', status: 'Available' },
        { id: 103, title: 'Artificial Intelligence', status: 'Available' },
    ],

    // Tutors for 1to1 Doubt Solving
    tutors: [
        { id: 1, name: 'Dr. Emily', specialization: ['Chemistry', 'Biology'], rating: 4.9 },
        { id: 2, name: 'Prof. Alan', specialization: ['Mathematics', 'Physics'], rating: 4.8 },
        { id: 3, name: 'Tutor Mike', specialization: ['Computer Science', 'Data Structures'], rating: 4.7 },
    ],

    // Analysis Logic (Mock)
    referencePapers: [],
    getAnalysis: (studentPaperId) => {
        return {
            score: 85,
            comparison: [
                { q: 1, topic: 'Calculus', status: 'Excellent', feedback: 'Perfect match with reference.' },
                { q: 2, topic: 'Integration', status: 'Needs Improvement', feedback: 'Missed substitution step.' },
            ]
        };
    },

    // Unified Results
    results: [
        { type: 'Semester', title: 'Sem 1', score: '8.5 GPA', status: 'Pass', weakAreas: ['Mechanics'] },
        { type: 'Semester', title: 'Sem 2', score: '8.8 GPA', status: 'Pass', weakAreas: ['Thermodynamics'] },
        { type: 'Marathon', title: 'Full Stack Dev Sprint', score: '85%', status: 'Distinction', weakAreas: ['CSS Grid'] },
        { type: 'Quiz', title: 'Physics Internal 1', score: '18/20', status: 'Excellent', weakAreas: [] },
    ],

    alumni: [
        { id: 1, name: 'Sarah Connor', batch: 2020, company: 'Google', role: 'SWE' },
    ],
    doubts: [
        { id: 1, question: 'How to balance this redox reaction?', subject: 'Chemistry', status: 'Resolved' },
    ],

    // --- NEW FEATURES DATA ---

    // Placement & Internship Hub
    placements: [
        { id: 1, type: 'Internship', company: 'Microsoft', role: 'Software Research Intern', stipend: '₹80,000/pm', rounds: ['OA', 'Tech 1', 'Tech 2', 'HR'], vault: true },
        { id: 2, type: 'Full-time', company: 'Atlassian', role: 'Graduate Engineer', package: '42 LPA', rounds: ['Coding', 'System Design', 'Values'], vault: true },
        { id: 3, type: 'Internship', company: 'Adobe', role: 'Product Intern', stipend: '₹1,00,000/pm', rounds: ['Portfolio Review', 'Design Task', 'HR'], vault: false },
    ],

    // Gamification
    gamification: {
        points: 4500,
        streak: 12,
        level: 4,
        nextLevelAt: 5000,
        leaderboard: [
            { rank: 1, name: 'Ananya R.', points: 8900, badge: 'Sage' },
            { rank: 2, name: 'Student One', points: 4500, badge: 'Scholar' },
            { rank: 3, name: 'Vikram S.', points: 4200, badge: 'Scholar' },
            { rank: 4, name: 'Rahul K.', points: 3800, badge: 'Novice' },
        ]
    },

    // AI Study Roadmap
    roadmaps: [
        {
            id: 1,
            topic: 'Mastering Calculus',
            status: 'In Progress',
            progress: 65,
            tasks: [
                { id: 1, title: 'Revise Limits & Continuity', completed: true },
                { id: 2, title: 'Solve 2023 Internal Paper', completed: true },
                { id: 3, title: 'Watch Integration Masterclass', completed: false },
                { id: 4, title: 'Mock Test: Derivatives', completed: false },
            ]
        }
    ],

    // Student Portfolio (Projects)
    projects: [
        { id: 1, title: 'AI Attendance System', tech: 'Python, OpenCV', description: 'Real-time face recognition for classroom attendance.' },
        { id: 2, title: 'Connect & Prep', tech: 'React, Node.js', description: 'A neo-brutalist student collaboration platform.' },
    ],

    // --- BATCH 2 FEATURES DATA ---

    // Timetable
    timetable: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        periods: [1, 2, 3, 4, 5, 6],
        schedule: [
            {
                day: 'Monday', slots: [
                    { period: 1, span: 2, subject: 'COM SKILLS', type: 'Lecture' },
                    { period: 3, span: 2, subject: 'PHY LAB', type: 'Lab' },
                    { period: 5, span: 2, subject: 'INUNITY', type: 'Lecture' },
                ]
            },
            {
                day: 'Tuesday', slots: [
                    { period: 1, span: 1, subject: 'EC', type: 'Lecture' },
                    { period: 2, span: 1, subject: 'CONS', type: 'Lecture' },
                    { period: 3, span: 1, subject: 'C', type: 'Lecture' },
                    { period: 4, span: 1, subject: 'MAT', type: 'Lecture' },
                    { period: 5, span: 2, subject: 'CADE-LAB', type: 'Lab' },
                ]
            },
            {
                day: 'Wednesday', slots: [
                    { period: 1, span: 1, subject: 'MAT', type: 'Lecture' },
                    { period: 2, span: 1, subject: 'PHY', type: 'Lecture' },
                    { period: 3, span: 2, subject: 'MATLAB', type: 'Lab' },
                    { period: 5, span: 2, subject: 'C-LAB', type: 'Lab' },
                ]
            },
            {
                day: 'Thursday', slots: [
                    { period: 1, span: 2, subject: 'CADE-T', type: 'Tutorial' },
                    { period: 3, span: 1, subject: 'MAT', type: 'Lecture' },
                    { period: 4, span: 1, subject: 'PHY', type: 'Lecture' },
                    { period: 5, span: 1, subject: 'EC', type: 'Lecture' },
                    { period: 6, span: 1, subject: 'C', type: 'Lecture' },
                ]
            },
            {
                day: 'Friday', slots: [
                    { period: 1, span: 1, subject: 'C', type: 'Lecture' },
                    { period: 2, span: 1, subject: 'PHY', type: 'Lecture' },
                    { period: 3, span: 2, subject: 'CADE-T', type: 'Tutorial' },
                    { period: 5, span: 1, subject: 'MAT', type: 'Lecture' },
                    { period: 6, span: 1, subject: 'EC', type: 'Lecture' },
                ]
            },
        ],
        exams: [
            { date: '2026-03-15', subject: 'Mathematics', type: 'Internal 2' },
            { date: '2026-03-18', subject: 'Physics', type: 'Internal 2' },
            { date: '2026-04-20', subject: 'All Subjects', type: 'Semester End Exam' },
        ]
    },

    // Chat / Discussion Forum
    chatRooms: [
        { id: 1, name: 'Mathematics Help', subject: 'Mathematics', members: 45, lastMessage: 'Can someone explain integration by parts?', lastTime: '2 min ago' },
        { id: 2, name: 'Physics Discussion', subject: 'Physics', members: 38, lastMessage: 'Wave optics doubt - diffraction vs interference', lastTime: '15 min ago' },
        { id: 3, name: 'Coding Club', subject: 'Computer Science', members: 67, lastMessage: 'DSA contest this Saturday!', lastTime: '1 hr ago' },
        { id: 4, name: 'Placement Prep', subject: 'General', members: 120, lastMessage: 'Microsoft interview experience shared', lastTime: '3 hrs ago' },
    ],
    chatMessages: [
        { id: 1, roomId: 1, user: 'Ananya R.', message: 'Can someone explain integration by parts?', time: '10:30 AM', isOwn: false },
        { id: 2, roomId: 1, user: 'You', message: 'Sure! Use the LIATE rule to pick u and dv.', time: '10:32 AM', isOwn: true },
        { id: 3, roomId: 1, user: 'Vikram S.', message: 'Also check Prof Smith notes page 45', time: '10:33 AM', isOwn: false },
        { id: 4, roomId: 1, user: 'Rahul K.', message: 'Thanks! That formula sheet was helpful 🙏', time: '10:35 AM', isOwn: false },
    ],

    // AI Quiz Generator
    quizBank: [
        { id: 1, subject: 'Mathematics', question: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correct: 0 },
        { id: 2, subject: 'Mathematics', question: 'Evaluate: lim(x→0) sin(x)/x', options: ['0', '1', '∞', 'undefined'], correct: 1 },
        { id: 3, subject: 'Physics', question: 'Unit of magnetic flux is:', options: ['Tesla', 'Weber', 'Henry', 'Gauss'], correct: 1 },
        { id: 4, subject: 'Physics', question: "Which law states F = ma?", options: ["Newton's 1st", "Newton's 2nd", "Newton's 3rd", "Kepler's"], correct: 1 },
        { id: 5, subject: 'Chemistry', question: 'pH of pure water at 25°C is:', options: ['0', '7', '14', '1'], correct: 1 },
        { id: 6, subject: 'Computer Science', question: 'Time complexity of binary search:', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
        { id: 7, subject: 'Electronics', question: 'A PN junction diode allows current in:', options: ['Both directions', 'Forward bias only', 'Reverse bias only', 'Neither'], correct: 1 },
        { id: 8, subject: 'Mathematics', question: 'The integral of 1/x is:', options: ['x', 'ln|x| + C', '1/x² + C', 'e^x + C'], correct: 1 },
    ],

    // CGPA Calculator
    semesterGrades: [
        {
            sem: 1, subjects: [
                { name: 'Mathematics I', credits: 4, grade: 'A', points: 9 },
                { name: 'Physics', credits: 4, grade: 'A+', points: 10 },
                { name: 'Chemistry', credits: 3, grade: 'B+', points: 8 },
                { name: 'Electronics', credits: 3, grade: 'A', points: 9 },
                { name: 'Comm Skills', credits: 2, grade: 'A+', points: 10 },
                { name: 'Workshop', credits: 2, grade: 'S', points: 10 },
            ], sgpa: 9.11
        },
        {
            sem: 2, subjects: [
                { name: 'Mathematics II', credits: 4, grade: 'A+', points: 10 },
                { name: 'Mechanical Engg', credits: 3, grade: 'A', points: 9 },
                { name: 'AI & Apps', credits: 3, grade: 'A+', points: 10 },
                { name: 'Design Thinking', credits: 2, grade: 'A', points: 9 },
                { name: 'Kannada', credits: 1, grade: 'A+', points: 10 },
                { name: 'Chem Lab', credits: 2, grade: 'S', points: 10 },
            ], sgpa: 9.60
        },
    ],

    // Notifications
    notifications: [
        { id: 1, type: 'warning', title: 'Attendance Alert', message: 'Comm Skills attendance dropped below 65%', time: '10 min ago', read: false },
        { id: 2, type: 'event', title: 'Marathon Tomorrow', message: 'Calculus Marathon starts at 2:00 PM in Main Auditorium', time: '1 hr ago', read: false },
        { id: 3, type: 'upload', title: 'New Paper Uploaded', message: 'Mathematics Internal 2 - 2024 paper is now available', time: '3 hrs ago', read: false },
        { id: 4, type: 'placement', title: 'Microsoft Registration Open', message: 'Register before March 28 for the OA round', time: '5 hrs ago', read: true },
        { id: 5, type: 'social', title: 'Study Group Invite', message: 'Alex invited you to "Late Night Coders"', time: '1 day ago', read: true },
    ],

    // Student Activity Feed
    activityFeed: [
        { id: 1, user: 'Ananya R.', action: 'uploaded', target: 'Physics Unit 3 Notes', type: 'notes', time: '5 min ago', avatar: '#ff4d4d' },
        { id: 2, user: 'Vikram S.', action: 'completed', target: 'Full Stack Dev Marathon', type: 'marathon', time: '30 min ago', avatar: '#00cc66' },
        { id: 3, user: 'Prof. Smith', action: 'added', target: 'Mathematics Internal 2 Paper (2024)', type: 'paper', time: '1 hr ago', avatar: '#4d79ff' },
        { id: 4, user: 'Rahul K.', action: 'asked', target: 'Doubt: Kirchhoff\'s voltage law', type: 'doubt', time: '2 hrs ago', avatar: '#ffcc00' },
        { id: 5, user: 'Coding Club', action: 'announced', target: 'Hackathon Registration Open', type: 'event', time: '4 hrs ago', avatar: '#a78bfa' },
        { id: 6, user: 'You', action: 'earned', target: '+50 XP for uploading verified notes', type: 'xp', time: '6 hrs ago', avatar: '#f472b6' },
    ],

    // Weekly Challenges
    challenges: [
        { id: 1, title: 'PYQ Warrior', desc: 'Solve 10 Previous Year Questions this week', progress: 7, target: 10, xp: 200, deadline: '3 days left', icon: '⚔️' },
        { id: 2, title: 'Note Master', desc: 'Upload 3 verified study notes', progress: 1, target: 3, xp: 150, deadline: '5 days left', icon: '📝' },
        { id: 3, title: 'Social Scholar', desc: 'Attend 2 group study sessions', progress: 2, target: 2, xp: 100, deadline: 'Completed!', icon: '🎉', completed: true },
        { id: 4, title: 'Doubt Destroyer', desc: 'Help resolve 5 doubts from peers', progress: 3, target: 5, xp: 250, deadline: '4 days left', icon: '💡' },
    ],

    // Personal Notes / To-Do
    personalNotes: [
        { id: 1, title: 'Exam Prep Checklist', content: '- Revise Calculus Unit 3\n- Practice integration problems\n- Review Physics formulas', pinned: true, color: '#a78bfa', updatedAt: '2 hrs ago' },
        { id: 2, title: 'Important Formulas', content: '∫sin(x)dx = -cos(x) + C\nF = ma\nE = mc²', pinned: false, color: '#f472b6', updatedAt: '1 day ago' },
    ],
    todos: [
        { id: 1, text: 'Submit Chemistry Lab Report', done: false, priority: 'high' },
        { id: 2, text: 'Register for Calculus Marathon', done: true, priority: 'medium' },
        { id: 3, text: 'Complete DSA Assignment', done: false, priority: 'high' },
        { id: 4, text: 'Read Physics Unit 4', done: false, priority: 'low' },
        { id: 5, text: 'Update portfolio with new project', done: true, priority: 'medium' },
    ],

    // Recorded Lectures
    lectures: [
        { id: 1, subject: 'Mathematics', unit: 'Unit 1', title: 'Limits & Continuity', teacher: 'Prof. Smith', link: '#', duration: '1h 20m', views: 234 },
        { id: 2, subject: 'Mathematics', unit: 'Unit 2', title: 'Differentiation', teacher: 'Prof. Smith', link: '#', duration: '1h 45m', views: 189 },
        { id: 3, subject: 'Physics', unit: 'Unit 1', title: 'Mechanics - Newton Laws', teacher: 'Dr. White', link: '#', duration: '55m', views: 312 },
        { id: 4, subject: 'Physics', unit: 'Unit 3', title: 'Wave Optics', teacher: 'Dr. White', link: '#', duration: '1h 10m', views: 156 },
        { id: 5, subject: 'Computer Science', unit: 'Unit 1', title: 'Intro to Data Structures', teacher: 'Prof. Alan', link: '#', duration: '2h 00m', views: 445 },
        { id: 6, subject: 'Chemistry', unit: 'Unit 2', title: 'Electrochemistry', teacher: 'Dr. Emily', link: '#', duration: '1h 30m', views: 98 },
    ],

    // Semester Analytics
    semesterAnalytics: [
        { sem: 1, sgpa: 8.5, attendance: 82, studyHours: 120, weakSubjects: ['Mechanics'], strongSubjects: ['Mathematics'] },
        { sem: 2, sgpa: 8.8, attendance: 88, studyHours: 145, weakSubjects: ['Thermodynamics'], strongSubjects: ['AI & Apps', 'Mathematics'] },
    ],

    login: async (email, password, type) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockBackend.users.find(u => u.email === email && u.password === password && u.role === type);
                if (user) {
                    resolve({ user, token: 'mock-jwt-token' });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800);
        });
    }
};
