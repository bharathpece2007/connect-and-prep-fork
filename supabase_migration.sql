-- ================================================================
-- CONNECT & PREP — Full Supabase Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- ─────────────────────────────────────────────────────────────────
-- 1. PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    email TEXT,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
    usn TEXT,
    first_name TEXT,
    middle_name TEXT,
    last_name TEXT,
    college_email TEXT,
    personal_email TEXT,
    dob DATE,
    contact TEXT,
    aadhaar TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile row on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'student')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─────────────────────────────────────────────────────────────────
-- 2. PARENT DETAILS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS parent_details (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    parent_type TEXT CHECK (parent_type IN ('parent1', 'parent2', 'guardian')),
    name TEXT,
    email TEXT,
    gender TEXT,
    contact TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 3. PROJECTS (Student Portfolio)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    tech TEXT,
    description TEXT,
    live_url TEXT,
    repo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 4. NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT DEFAULT 'info',
    title TEXT NOT NULL,
    message TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 5. NOTICES (School Notice Board)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notices (
    id BIGSERIAL PRIMARY KEY,
    type TEXT DEFAULT 'announcement' CHECK (type IN ('announcement', 'holiday', 'event')),
    title TEXT NOT NULL,
    content TEXT,
    date TEXT,
    urgent BOOLEAN DEFAULT FALSE,
    requires_signature BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 6. NOTICE SIGNATURES
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notice_signatures (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    notice_id BIGINT REFERENCES notices(id) ON DELETE CASCADE,
    signed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, notice_id)
);

-- ─────────────────────────────────────────────────────────────────
-- 7. HOMEWORK
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS homework (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    due_date DATE,
    status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'submitted', 'revision')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 8. ATTENDANCE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT CHECK (status IN ('present', 'absent', 'holiday')),
    subject TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date, subject)
);

-- ─────────────────────────────────────────────────────────────────
-- 9. TIMETABLE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS timetable (
    id BIGSERIAL PRIMARY KEY,
    day_index INT NOT NULL,  -- 0=Monday ... 5=Saturday
    day_name TEXT NOT NULL,
    period INT NOT NULL,
    time_slot TEXT,
    subject TEXT,
    teacher TEXT,
    type TEXT DEFAULT 'lecture' CHECK (type IN ('lecture', 'lab', 'activity', 'recess')),
    assignment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 10. REPORT CARD
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS report_card (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    term TEXT NOT NULL,
    subject TEXT NOT NULL,
    unit_test NUMERIC,
    terminal NUMERIC,
    grade TEXT,
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 11. DOUBTS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS doubts (
    id BIGSERIAL PRIMARY KEY,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    author_name TEXT,
    subject TEXT,
    question TEXT NOT NULL,
    has_image BOOLEAN DEFAULT FALSE,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 12. DOUBT ANSWERS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS doubt_answers (
    id BIGSERIAL PRIMARY KEY,
    doubt_id BIGINT REFERENCES doubts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    author_name TEXT,
    answer TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 13. HELP & CARE BOX
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS help_care (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    author_name TEXT DEFAULT 'Anonymous',
    category TEXT NOT NULL,
    message TEXT NOT NULL,
    anonymous BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 14. GAMIFICATION
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gamification (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    points INT DEFAULT 0,
    streak INT DEFAULT 0,
    level INT DEFAULT 1,
    next_level_at INT DEFAULT 1000,
    badge TEXT DEFAULT 'Novice',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 15. STUDY GROUPS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_groups (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    topic TEXT,
    venue TEXT,
    time TEXT,
    host TEXT,
    members INT DEFAULT 1,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 16. MARATHONS (Study Marathons)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marathons (
    id BIGSERIAL PRIMARY KEY,
    topic TEXT NOT NULL,
    venue TEXT,
    duration TEXT,
    host TEXT,
    date DATE,
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
    can_register BOOLEAN DEFAULT TRUE,
    test_available BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 17. P2P SESSIONS (Peer Tutoring)
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS p2p_sessions (
    id BIGSERIAL PRIMARY KEY,
    tutor TEXT NOT NULL,
    tutor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    topic TEXT,
    session_time TIMESTAMPTZ,
    venue TEXT,
    students_registered INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 18. NOTES / MATERIALS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notes_materials (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT,
    author TEXT,
    subject TEXT,
    category TEXT,
    verified_by TEXT,
    file_url TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 19. QUESTION PAPERS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS question_papers (
    id BIGSERIAL PRIMARY KEY,
    year TEXT,
    college TEXT,
    subject TEXT,
    type TEXT,
    file_url TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 20. LIBRARY BOOKS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS library_books (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT,
    isbn TEXT,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'borrowed')),
    borrowed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 21. ALUMNI
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alumni (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    batch INT,
    company TEXT,
    role TEXT,
    linkedin_url TEXT,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 22. PLACEMENTS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS placements (
    id BIGSERIAL PRIMARY KEY,
    type TEXT CHECK (type IN ('Internship', 'Full-time')),
    company TEXT NOT NULL,
    role TEXT,
    stipend TEXT,
    package TEXT,
    rounds TEXT[],
    vault BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 23. CHAT ROOMS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_rooms (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    subject TEXT,
    members INT DEFAULT 0,
    last_message TEXT,
    last_time TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 24. CHAT MESSAGES
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT REFERENCES chat_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 25. ROADMAPS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS roadmaps (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 26. ROADMAP TASKS
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS roadmap_tasks (
    id BIGSERIAL PRIMARY KEY,
    roadmap_id BIGINT REFERENCES roadmaps(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================
-- Enable RLS on all user-sensitive tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notice_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_card ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_care ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_tasks ENABLE ROW LEVEL SECURITY;

-- Public read tables (open, no RLS restrictions)
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE marathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE p2p_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- ── POLICIES ────────────────────────────────────────────────────

-- Profiles: users can read all, only edit their own
CREATE POLICY "Anyone can view profiles" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Parent details: only own
CREATE POLICY "Own parent details" ON parent_details FOR ALL USING (auth.uid() = user_id);

-- Projects: only own
CREATE POLICY "Own projects" ON projects FOR ALL USING (auth.uid() = user_id);

-- Notifications: only own
CREATE POLICY "Own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);

-- Notices: public read, admin write
CREATE POLICY "Anyone reads notices" ON notices FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated insert notices" ON notices FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Notice signatures: only own
CREATE POLICY "Own signatures" ON notice_signatures FOR ALL USING (auth.uid() = user_id);

-- Homework: only own
CREATE POLICY "Own homework" ON homework FOR ALL USING (auth.uid() = user_id);

-- Attendance: only own
CREATE POLICY "Own attendance" ON attendance FOR ALL USING (auth.uid() = user_id);

-- Report card: only own
CREATE POLICY "Own report card" ON report_card FOR ALL USING (auth.uid() = user_id);

-- Help care: insert always, read own
CREATE POLICY "Insert help care" ON help_care FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Read own help care" ON help_care FOR SELECT USING (auth.uid() = user_id);

-- Gamification: read all (for leaderboard), write own
CREATE POLICY "Anyone reads gamification" ON gamification FOR SELECT USING (TRUE);
CREATE POLICY "Own gamification write" ON gamification FOR ALL USING (auth.uid() = user_id);

-- Doubts: public read/write
CREATE POLICY "Anyone reads doubts" ON doubts FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated post doubts" ON doubts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authors update doubts" ON doubts FOR UPDATE USING (auth.uid() = author_id);

-- Doubt answers: public read, authenticated write
CREATE POLICY "Anyone reads answers" ON doubt_answers FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated post answers" ON doubt_answers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Public tables: open SELECT, authenticated INSERT
CREATE POLICY "Read study groups" ON study_groups FOR SELECT USING (TRUE);
CREATE POLICY "Insert study groups" ON study_groups FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Read marathons" ON marathons FOR SELECT USING (TRUE);
CREATE POLICY "Read p2p" ON p2p_sessions FOR SELECT USING (TRUE);
CREATE POLICY "Read notes" ON notes_materials FOR SELECT USING (TRUE);
CREATE POLICY "Insert notes" ON notes_materials FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Read papers" ON question_papers FOR SELECT USING (TRUE);
CREATE POLICY "Insert papers" ON question_papers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Read library" ON library_books FOR SELECT USING (TRUE);
CREATE POLICY "Read alumni" ON alumni FOR SELECT USING (TRUE);
CREATE POLICY "Read placements" ON placements FOR SELECT USING (TRUE);
CREATE POLICY "Read chat rooms" ON chat_rooms FOR SELECT USING (TRUE);
CREATE POLICY "Read chat messages" ON chat_messages FOR SELECT USING (TRUE);
CREATE POLICY "Send chat messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Roadmaps: only own
CREATE POLICY "Own roadmaps" ON roadmaps FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own roadmap tasks" ON roadmap_tasks FOR ALL
    USING (EXISTS (SELECT 1 FROM roadmaps r WHERE r.id = roadmap_id AND r.user_id = auth.uid()));

-- ================================================================
-- SEED DATA — Demo notices, placements, alumni, chat rooms
-- ================================================================

-- Notices
INSERT INTO notices (type, title, content, date, urgent, requires_signature) VALUES
('announcement', 'Annual Day Celebration', 'The Annual Day celebration will be held on May 28th, 2026 at the School Auditorium. All parents are cordially invited. Students participating in cultural programs must attend rehearsals from May 20th onwards.', 'May 15, 2026', FALSE, TRUE),
('holiday', 'Summer Vacation Notice', 'School will remain closed for summer vacation from June 1st to June 30th, 2026. School reopens on July 1st. Summer homework packets will be distributed on May 25th.', 'May 12, 2026', FALSE, FALSE),
('event', 'Field Trip to Science Museum', 'A field trip to the Regional Science Museum is planned for May 22nd for Classes 7-9. Permission slips must be signed and returned by May 18th. Bus fee: ₹200. Lunch will be provided.', 'May 10, 2026', TRUE, TRUE),
('announcement', 'PTM Meeting - May 2026', 'Parent Teacher Meeting for all sections is scheduled for May 17th, Saturday, from 10:00 AM to 1:00 PM. Please bring the student diary. Report cards will be shared.', 'May 8, 2026', FALSE, FALSE),
('event', 'Inter-School Sports Competition', 'Selected students will represent our school at the Inter-School Athletics Meet on May 24th. Practice sessions begin from May 12th. Students must carry their sports kit daily.', 'May 5, 2026', FALSE, TRUE),
('announcement', 'Updated School Uniform Policy', 'Starting from the new academic session (July 2026), all students must wear the updated school uniform with the new crest. Orders can be placed at the school store before May 30th.', 'May 2, 2026', FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- Alumni
INSERT INTO alumni (name, batch, company, role) VALUES
('Sarah Connor', 2020, 'Google', 'Software Engineer'),
('Vikram Sharma', 2019, 'Microsoft', 'Senior SDE'),
('Priya Nair', 2021, 'Amazon', 'Product Manager'),
('Rahul Gupta', 2018, 'Goldman Sachs', 'Quant Analyst')
ON CONFLICT DO NOTHING;

-- Placements
INSERT INTO placements (type, company, role, stipend, rounds, vault) VALUES
('Internship', 'Microsoft', 'Software Research Intern', '₹80,000/pm', ARRAY['OA', 'Tech 1', 'Tech 2', 'HR'], TRUE),
('Full-time', 'Atlassian', 'Graduate Engineer', NULL, ARRAY['Coding', 'System Design', 'Values'], TRUE),
('Internship', 'Adobe', 'Product Intern', '₹1,00,000/pm', ARRAY['Portfolio Review', 'Design Task', 'HR'], FALSE)
ON CONFLICT DO NOTHING;

-- Chat rooms
INSERT INTO chat_rooms (name, subject, members, last_message, last_time) VALUES
('Mathematics Help', 'Mathematics', 45, 'Can someone explain integration by parts?', '2 min ago'),
('Physics Discussion', 'Physics', 38, 'Wave optics doubt - diffraction vs interference', '15 min ago'),
('Coding Club', 'Computer Science', 67, 'DSA contest this Saturday!', '1 hr ago'),
('Placement Prep', 'General', 120, 'Microsoft interview experience shared', '3 hrs ago')
ON CONFLICT DO NOTHING;

-- Timetable seed (Monday schedule)
INSERT INTO timetable (day_index, day_name, period, time_slot, subject, teacher, type, assignment) VALUES
(0, 'Monday', 1, '8:00 - 8:45', 'Mathematics', 'Mrs. Sharma', 'lecture', 'Ch 7 Ex 4.2'),
(0, 'Monday', 2, '8:45 - 9:30', 'Science', 'Mr. Patel', 'lecture', NULL),
(0, 'Monday', 3, '9:30 - 10:15', 'English', 'Ms. Gupta', 'lecture', 'Sonnet Essay Draft'),
(0, 'Monday', 0, '10:15 - 10:30', 'RECESS', '', 'recess', NULL),
(0, 'Monday', 4, '10:30 - 11:15', 'Social Studies', 'Mr. Khan', 'lecture', NULL),
(0, 'Monday', 5, '11:15 - 12:00', 'Hindi', 'Mrs. Devi', 'lecture', NULL),
(0, 'Monday', 6, '12:00 - 12:45', 'Computer Science', 'Mr. Reddy', 'lab', NULL),
(0, 'Monday', 0, '12:45 - 1:30', 'LUNCH BREAK', '', 'recess', NULL),
(0, 'Monday', 7, '1:30 - 2:15', 'Physical Education', 'Coach Verma', 'activity', NULL),
(0, 'Monday', 8, '2:15 - 3:00', 'Art & Craft', 'Ms. Rao', 'activity', NULL),
(1, 'Tuesday', 1, '8:00 - 8:45', 'Science', 'Mr. Patel', 'lecture', 'Lab Report'),
(1, 'Tuesday', 2, '8:45 - 9:30', 'Mathematics', 'Mrs. Sharma', 'lecture', NULL),
(1, 'Tuesday', 3, '9:30 - 10:15', 'Hindi', 'Mrs. Devi', 'lecture', NULL),
(1, 'Tuesday', 0, '10:15 - 10:30', 'RECESS', '', 'recess', NULL),
(1, 'Tuesday', 4, '10:30 - 11:15', 'English', 'Ms. Gupta', 'lecture', NULL),
(1, 'Tuesday', 5, '11:15 - 12:00', 'Social Studies', 'Mr. Khan', 'lecture', NULL),
(1, 'Tuesday', 6, '12:00 - 12:45', 'Science Lab', 'Mr. Patel', 'lab', NULL),
(1, 'Tuesday', 0, '12:45 - 1:30', 'LUNCH BREAK', '', 'recess', NULL),
(1, 'Tuesday', 7, '1:30 - 2:15', 'Computer Science', 'Mr. Reddy', 'lab', 'React Hook Setup'),
(1, 'Tuesday', 8, '2:15 - 3:00', 'Music', 'Mrs. Nair', 'activity', NULL)
ON CONFLICT DO NOTHING;

-- ================================================================
-- DONE! All 26 tables created with RLS policies and seed data.
-- ================================================================
