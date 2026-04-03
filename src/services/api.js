const API_BASE_URL = 'http://localhost:5001/api';

// Helper to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('cp_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic fetch wrapper
const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
};

// Auth API
export const authAPI = {
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
    login: (email, password, role) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
    }),
    getMe: () => apiRequest('/auth/me'),
};

// Attendance API
export const attendanceAPI = {
    getAll: () => apiRequest('/attendance'),
    getSummary: () => apiRequest('/attendance/summary'),
    mark: (data) => apiRequest('/attendance', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Question Papers API
export const papersAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return apiRequest(`/papers${params ? `?${params}` : ''}`);
    },
    upload: (data) => apiRequest('/papers', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    getPYQs: () => apiRequest('/papers/pyqs'),
    addPYQ: (data) => apiRequest('/papers/pyqs', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Notes API
export const notesAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return apiRequest(`/notes${params ? `?${params}` : ''}`);
    },
    upload: (data) => apiRequest('/notes', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Study Groups API
export const groupsAPI = {
    getAll: () => apiRequest('/groups'),
    create: (data) => apiRequest('/groups', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    join: (id) => apiRequest(`/groups/${id}/join`, { method: 'POST' }),
};

// Marathons API
export const marathonsAPI = {
    getAll: () => apiRequest('/marathons'),
    create: (data) => apiRequest('/marathons', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    register: (id) => apiRequest(`/marathons/${id}/register`, { method: 'POST' }),
};

// P2P API
export const p2pAPI = {
    getAll: () => apiRequest('/p2p'),
    create: (data) => apiRequest('/p2p', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    register: (id) => apiRequest(`/p2p/${id}/register`, { method: 'POST' }),
};

// Library API
export const libraryAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return apiRequest(`/library${params ? `?${params}` : ''}`);
    },
    getMyBooks: () => apiRequest('/library/my-books'),
    borrow: (id) => apiRequest(`/library/${id}/borrow`, { method: 'POST' }),
    return: (id) => apiRequest(`/library/${id}/return`, { method: 'POST' }),
};

// Results API
export const resultsAPI = {
    getAll: () => apiRequest('/results'),
    add: (data) => apiRequest('/results', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// Doubts API
export const doubtsAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return apiRequest(`/doubts${params ? `?${params}` : ''}`);
    },
    ask: (data) => apiRequest('/doubts', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    answer: (id, answer) => apiRequest(`/doubts/${id}/answer`, {
        method: 'PUT',
        body: JSON.stringify({ answer }),
    }),
};

// Alumni API
export const alumniAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return apiRequest(`/alumni${params ? `?${params}` : ''}`);
    },
    add: (data) => apiRequest('/alumni', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// New Features API
export const extraAPI = {
    getPlacements: () => Promise.resolve([]), // Fallback if backend not ready
    getRoadmap: () => Promise.resolve([]),
    getGamification: () => Promise.resolve({}),
    getProjects: () => Promise.resolve([])
};
