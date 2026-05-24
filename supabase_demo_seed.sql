-- ================================================================
-- DEMO ACCOUNTS — Run AFTER supabase_migration.sql
-- Creates the demo student/teacher/parent accounts for quick login
-- (enter 1, 2, or 3 in the login screen)
-- ================================================================

-- NOTE: Supabase doesn't allow creating auth users via SQL directly.
-- These accounts must be created via the Supabase Dashboard:
--
-- Go to: Authentication → Users → Add User
--
-- Create these 3 accounts:
--   Email: student@connectprep.demo   Password: demo1234
--   Email: teacher@connectprep.demo   Password: demo1234  
--   Email: parent@connectprep.demo    Password: demo1234
--
-- Then run the SQL below to set their profile data:

-- ── After creating auth users, insert their profile rows ──
-- (Replace the UUIDs below with the actual user IDs from Supabase Dashboard)

-- You can find user IDs in: Authentication → Users → click user → copy UUID

-- Example (replace 'your-student-uuid-here' with real UUID):
/*
INSERT INTO profiles (id, name, email, role, usn, first_name, last_name, contact) VALUES
('your-student-uuid-here', 'Demo Student', 'student@connectprep.demo', 'student', '4VV25EC032', 'Demo', 'Student', '9999999999'),
('your-teacher-uuid-here', 'Demo Teacher', 'teacher@connectprep.demo', 'teacher', NULL, 'Demo', 'Teacher', '8888888888'),
('your-parent-uuid-here', 'Demo Parent', 'parent@connectprep.demo', 'parent', NULL, 'Demo', 'Parent', '7777777777')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    usn = EXCLUDED.usn;
*/

-- ── Sample homework for demo student ──
-- (Run after creating the student user and noting their UUID)
/*
INSERT INTO homework (user_id, subject, title, due_date, status, priority) VALUES
('your-student-uuid-here', 'Mathematics', 'Chapter 7 - Quadratic Equations Ex 4.2', '2026-05-28', 'assigned', 'high'),
('your-student-uuid-here', 'Science', 'Plant Cell Diagram & Labeling', '2026-05-29', 'submitted', 'medium'),
('your-student-uuid-here', 'English', 'French Revolution Essay - 800 words', '2026-05-30', 'revision', 'medium'),
('your-student-uuid-here', 'Computer Science', 'React Hooks Implementation', '2026-06-01', 'assigned', 'high'),
('your-student-uuid-here', 'Physics', 'Kinematics Problems Set', '2026-05-28', 'assigned', 'medium');
*/

-- ── Sample gamification for demo student ──
/*
INSERT INTO gamification (user_id, points, streak, level, next_level_at, badge) VALUES
('your-student-uuid-here', 4500, 12, 4, 5000, 'Scholar')
ON CONFLICT (user_id) DO UPDATE SET
    points = EXCLUDED.points,
    streak = EXCLUDED.streak,
    level = EXCLUDED.level,
    badge = EXCLUDED.badge;
*/

-- ── Sample attendance for demo student (current month) ──
/*
INSERT INTO attendance (user_id, date, status) VALUES
('your-student-uuid-here', '2026-05-01', 'present'),
('your-student-uuid-here', '2026-05-02', 'present'),
('your-student-uuid-here', '2026-05-05', 'present'),
('your-student-uuid-here', '2026-05-06', 'present'),
('your-student-uuid-here', '2026-05-07', 'absent'),
('your-student-uuid-here', '2026-05-08', 'present'),
('your-student-uuid-here', '2026-05-09', 'present'),
('your-student-uuid-here', '2026-05-12', 'present'),
('your-student-uuid-here', '2026-05-13', 'present'),
('your-student-uuid-here', '2026-05-14', 'present'),
('your-student-uuid-here', '2026-05-15', 'absent'),
('your-student-uuid-here', '2026-05-16', 'present'),
('your-student-uuid-here', '2026-05-19', 'present'),
('your-student-uuid-here', '2026-05-20', 'present'),
('your-student-uuid-here', '2026-05-21', 'present'),
('your-student-uuid-here', '2026-05-22', 'present'),
('your-student-uuid-here', '2026-05-23', 'present')
ON CONFLICT DO NOTHING;
*/

-- ── Sample notifications for demo student ──
/*
INSERT INTO notifications (user_id, type, title, message, read) VALUES
('your-student-uuid-here', 'warning', 'Attendance Alert', 'Comm Skills attendance dropped below 65%', FALSE),
('your-student-uuid-here', 'event', 'Marathon Tomorrow', 'Calculus Marathon starts at 2:00 PM in Main Auditorium', FALSE),
('your-student-uuid-here', 'upload', 'New Paper Uploaded', 'Mathematics Internal 2 - 2024 paper is now available', FALSE),
('your-student-uuid-here', 'placement', 'Microsoft Registration Open', 'Register before March 28 for the OA round', TRUE),
('your-student-uuid-here', 'social', 'Study Group Invite', 'Alex invited you to "Late Night Coders"', TRUE);
*/
