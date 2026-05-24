import { supabase } from '../lib/supabase';

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
export const authService = {
    // Sign up a new user and create their profile row
    register: async ({ email, password, name, role, usn }) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // Create profile row
        const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            name,
            email,
            role: role || 'student',
            usn: usn || null,
        });
        if (profileError) throw profileError;

        return data;
    },

    login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    },

    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    getSession: async () => {
        const { data } = await supabase.auth.getSession();
        return data.session;
    },

    onAuthStateChange: (callback) => {
        return supabase.auth.onAuthStateChange(callback);
    },
};

// ─────────────────────────────────────────────
// PROFILES
// ─────────────────────────────────────────────
export const profileService = {
    get: async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },

    update: async (userId, updates) => {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    upsert: async (profile) => {
        const { data, error } = await supabase
            .from('profiles')
            .upsert(profile)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// PARENT DETAILS
// ─────────────────────────────────────────────
export const parentService = {
    get: async (userId) => {
        const { data, error } = await supabase
            .from('parent_details')
            .select('*')
            .eq('user_id', userId);
        if (error) throw error;
        return data || [];
    },

    upsert: async (userId, parents) => {
        // Delete existing, then insert fresh
        await supabase.from('parent_details').delete().eq('user_id', userId);
        if (parents.length === 0) return [];
        const { data, error } = await supabase
            .from('parent_details')
            .insert(parents.map(p => ({ ...p, user_id: userId })))
            .select();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// PROJECTS (Portfolio)
// ─────────────────────────────────────────────
export const projectService = {
    getAll: async (userId) => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    add: async (userId, project) => {
        const { data, error } = await supabase
            .from('projects')
            .insert({ ...project, user_id: userId })
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
    },
};

// ─────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────
export const notificationService = {
    getAll: async (userId) => {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    markRead: async (id) => {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', id);
        if (error) throw error;
    },

    markAllRead: async (userId) => {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId);
        if (error) throw error;
    },
};

// ─────────────────────────────────────────────
// NOTICE BOARD
// ─────────────────────────────────────────────
export const noticeService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .order('date', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    getSignatures: async (userId) => {
        const { data, error } = await supabase
            .from('notice_signatures')
            .select('notice_id')
            .eq('user_id', userId);
        if (error) throw error;
        // Return a set of signed notice IDs
        const signed = {};
        (data || []).forEach(s => { signed[s.notice_id] = true; });
        return signed;
    },

    toggleSignature: async (userId, noticeId, isSigned) => {
        if (isSigned) {
            // Remove signature
            const { error } = await supabase
                .from('notice_signatures')
                .delete()
                .eq('user_id', userId)
                .eq('notice_id', noticeId);
            if (error) throw error;
        } else {
            // Add signature
            const { error } = await supabase
                .from('notice_signatures')
                .insert({ user_id: userId, notice_id: noticeId });
            if (error) throw error;
        }
    },
};

// ─────────────────────────────────────────────
// HOMEWORK
// ─────────────────────────────────────────────
export const homeworkService = {
    getAll: async (userId) => {
        const { data, error } = await supabase
            .from('homework')
            .select('*')
            .eq('user_id', userId)
            .order('due_date', { ascending: true });
        if (error) throw error;
        return data || [];
    },

    updateStatus: async (id, status) => {
        const { error } = await supabase
            .from('homework')
            .update({ status })
            .eq('id', id);
        if (error) throw error;
    },

    add: async (homework) => {
        const { data, error } = await supabase
            .from('homework')
            .insert(homework)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// ATTENDANCE
// ─────────────────────────────────────────────
export const attendanceService = {
    getAll: async (userId) => {
        const { data, error } = await supabase
            .from('attendance')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    getMonth: async (userId, year, month) => {
        // month is 1-indexed
        const from = `${year}-${String(month).padStart(2, '0')}-01`;
        const to = `${year}-${String(month).padStart(2, '0')}-31`;
        const { data, error } = await supabase
            .from('attendance')
            .select('*')
            .eq('user_id', userId)
            .gte('date', from)
            .lte('date', to);
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// TIMETABLE
// ─────────────────────────────────────────────
export const timetableService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('timetable')
            .select('*')
            .order('day_index', { ascending: true })
            .order('period', { ascending: true });
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// REPORT CARD
// ─────────────────────────────────────────────
export const reportCardService = {
    getAll: async (userId) => {
        const { data, error } = await supabase
            .from('report_card')
            .select('*')
            .eq('user_id', userId)
            .order('term', { ascending: true });
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// DOUBTS
// ─────────────────────────────────────────────
export const doubtService = {
    getAll: async (subject) => {
        let query = supabase
            .from('doubts')
            .select('*, doubt_answers(*)')
            .order('created_at', { ascending: false });
        if (subject) query = query.eq('subject', subject);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    post: async (doubt) => {
        const { data, error } = await supabase
            .from('doubts')
            .insert(doubt)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    markResolved: async (id) => {
        const { error } = await supabase
            .from('doubts')
            .update({ resolved: true })
            .eq('id', id);
        if (error) throw error;
    },

    postAnswer: async (answer) => {
        const { data, error } = await supabase
            .from('doubt_answers')
            .insert(answer)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// HELP & CARE BOX
// ─────────────────────────────────────────────
export const helpCareService = {
    submit: async (submission) => {
        const { data, error } = await supabase
            .from('help_care')
            .insert(submission)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// GAMIFICATION
// ─────────────────────────────────────────────
export const gamificationService = {
    get: async (userId) => {
        const { data, error } = await supabase
            .from('gamification')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },

    getLeaderboard: async () => {
        const { data, error } = await supabase
            .from('gamification')
            .select('*, profiles(name)')
            .order('points', { ascending: false })
            .limit(10);
        if (error) throw error;
        return data || [];
    },

    update: async (userId, updates) => {
        const { data, error } = await supabase
            .from('gamification')
            .update(updates)
            .eq('user_id', userId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// STUDY GROUPS
// ─────────────────────────────────────────────
export const studyGroupService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('study_groups')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    create: async (group) => {
        const { data, error } = await supabase
            .from('study_groups')
            .insert(group)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// MARATHONS
// ─────────────────────────────────────────────
export const marathonService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('marathons')
            .select('*')
            .order('date', { ascending: true });
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// PEER TUTORING (P2P)
// ─────────────────────────────────────────────
export const p2pService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('p2p_sessions')
            .select('*')
            .order('session_time', { ascending: true });
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// NOTES / MATERIALS
// ─────────────────────────────────────────────
export const notesService = {
    getAll: async (filters = {}) => {
        let query = supabase.from('notes_materials').select('*').order('created_at', { ascending: false });
        if (filters.category) query = query.eq('category', filters.category);
        if (filters.subject) query = query.eq('subject', filters.subject);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    upload: async (note) => {
        const { data, error } = await supabase
            .from('notes_materials')
            .insert(note)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// QUESTION PAPERS
// ─────────────────────────────────────────────
export const papersService = {
    getAll: async (filters = {}) => {
        let query = supabase.from('question_papers').select('*').order('year', { ascending: false });
        if (filters.year) query = query.eq('year', filters.year);
        if (filters.subject) query = query.eq('subject', filters.subject);
        if (filters.college) query = query.eq('college', filters.college);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    upload: async (paper) => {
        const { data, error } = await supabase
            .from('question_papers')
            .insert(paper)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};

// ─────────────────────────────────────────────
// LIBRARY
// ─────────────────────────────────────────────
export const libraryService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('library_books')
            .select('*')
            .order('title', { ascending: true });
        if (error) throw error;
        return data || [];
    },

    getMyBooks: async (userId) => {
        const { data, error } = await supabase
            .from('library_books')
            .select('*')
            .eq('borrowed_by', userId);
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// ALUMNI
// ─────────────────────────────────────────────
export const alumniService = {
    getAll: async (filters = {}) => {
        let query = supabase.from('alumni').select('*').order('batch', { ascending: false });
        if (filters.batch) query = query.eq('batch', filters.batch);
        if (filters.company) query = query.ilike('company', `%${filters.company}%`);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// PLACEMENTS
// ─────────────────────────────────────────────
export const placementService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('placements')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },
};

// ─────────────────────────────────────────────
// CHAT
// ─────────────────────────────────────────────
export const chatService = {
    getRooms: async () => {
        const { data, error } = await supabase
            .from('chat_rooms')
            .select('*')
            .order('name', { ascending: true });
        if (error) throw error;
        return data || [];
    },

    getMessages: async (roomId) => {
        const { data, error } = await supabase
            .from('chat_messages')
            .select('*, profiles(name)')
            .eq('room_id', roomId)
            .order('created_at', { ascending: true });
        if (error) throw error;
        return data || [];
    },

    sendMessage: async (message) => {
        const { data, error } = await supabase
            .from('chat_messages')
            .insert(message)
            .select('*, profiles(name)')
            .single();
        if (error) throw error;
        return data;
    },

    subscribeToRoom: (roomId, callback) => {
        return supabase
            .channel(`room-${roomId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'chat_messages',
                filter: `room_id=eq.${roomId}`,
            }, callback)
            .subscribe();
    },
};

// ─────────────────────────────────────────────
// ROADMAPS
// ─────────────────────────────────────────────
export const roadmapService = {
    getAll: async (userId) => {
        const { data, error } = await supabase
            .from('roadmaps')
            .select('*, roadmap_tasks(*)')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    toggleTask: async (taskId, completed) => {
        const { error } = await supabase
            .from('roadmap_tasks')
            .update({ completed })
            .eq('id', taskId);
        if (error) throw error;
    },
};
