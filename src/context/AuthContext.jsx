import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { mockBackend } from '../services/mockBackend';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem('cp_user');
                const token = localStorage.getItem('cp_token');

                if (storedUser && token) {
                    // Verify token is still valid
                    try {
                        const userData = await authAPI.getMe();
                        setUser(userData);
                    } catch {
                        // Token expired or invalid
                        localStorage.removeItem('cp_user');
                        localStorage.removeItem('cp_token');
                    }
                }
            } catch (error) {
                console.error("Failed to check auth", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password, type) => {
        // Simplified Login for Demo/Testing
        if ((email === '1' || email === '11') && type === 'student') {
            const mockStudent = {
                _id: 'mock-student-id',
                name: 'Demo Student',
                email: 'student@test.com',
                role: 'student',
                usn: '4VV25EC001'
            };
            setUser(mockStudent);
            localStorage.setItem('cp_user', JSON.stringify(mockStudent));
            localStorage.setItem('cp_token', 'mock-token-student');
            return { success: true };
        }

        if ((email === '2' || email === '22') && type === 'teacher') {
            const mockTeacher = {
                _id: 'mock-teacher-id',
                name: 'Demo Teacher',
                email: 'teacher@test.com',
                role: 'teacher'
            };
            setUser(mockTeacher);
            localStorage.setItem('cp_user', JSON.stringify(mockTeacher));
            localStorage.setItem('cp_token', 'mock-token-teacher');
            return { success: true };
        }

        if ((email === '3' || email === '33') && type === 'parent') {
            const mockParent = {
                _id: 'mock-parent-id',
                name: 'Demo Parent',
                email: 'parent@test.com',
                role: 'parent'
            };
            setUser(mockParent);
            localStorage.setItem('cp_user', JSON.stringify(mockParent));
            localStorage.setItem('cp_token', 'mock-token-parent');
            return { success: true };
        }

        try {
            // Try Real API first
            const data = await authAPI.login(email, password, type);
            const userData = {
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                usn: data.usn || '4VV25EC032'
            };
            setUser(userData);
            localStorage.setItem('cp_user', JSON.stringify(userData));
            localStorage.setItem('cp_token', data.token);
            return { success: true };
        } catch (error) {
            // Fallback to Mock Backend for Demo
            console.warn("API Login failed, using Mock Backend fallback", error.message);
            try {
                const mockResult = await mockBackend.login(email, password, type);
                const userData = {
                    _id: mockResult.user.id,
                    name: mockResult.user.name,
                    email: mockResult.user.email,
                    role: mockResult.user.role,
                    usn: '4VV25EC032'
                };
                setUser(userData);
                localStorage.setItem('cp_user', JSON.stringify(userData));
                localStorage.setItem('cp_token', mockResult.token);
                return { success: true };
            } catch (mockError) {
                return { success: false, error: mockError.message };
            }
        }
    };

    const register = async (userData) => {
        try {
            const data = await authAPI.register(userData);
            setUser({
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            });
            localStorage.setItem('cp_user', JSON.stringify(data));
            localStorage.setItem('cp_token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cp_user');
        localStorage.removeItem('cp_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
