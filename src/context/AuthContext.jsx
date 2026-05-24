import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { profileService } from '../services/supabaseService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper: build unified user object from Supabase session + profile
    const buildUser = async (supabaseUser) => {
        if (!supabaseUser) return null;
        try {
            const profile = await profileService.get(supabaseUser.id);
            return {
                _id: supabaseUser.id,
                id: supabaseUser.id,
                name: profile?.name || supabaseUser.email?.split('@')[0] || 'User',
                email: supabaseUser.email,
                role: profile?.role || 'student',
                usn: profile?.usn || '',
                // Extra profile fields
                firstName: profile?.first_name || '',
                middleName: profile?.middle_name || '',
                lastName: profile?.last_name || '',
                collegeEmail: profile?.college_email || '',
                dob: profile?.dob || '',
                contact: profile?.contact || '',
                aadhaar: profile?.aadhaar || '',
                avatarUrl: profile?.avatar_url || null,
            };
        } catch {
            // Profile not found yet (e.g. right after registration)
            return {
                _id: supabaseUser.id,
                id: supabaseUser.id,
                name: supabaseUser.email?.split('@')[0] || 'User',
                email: supabaseUser.email,
                role: 'student',
                usn: '',
            };
        }
    };

    useEffect(() => {
        // Check current session on mount
        const init = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const userData = await buildUser(session.user);
                    setUser(userData);
                }
            } catch (err) {
                console.error('Auth init failed:', err);
            } finally {
                setLoading(false);
            }
        };
        init();

        // Listen to auth state changes (login, logout, token refresh)
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                const userData = await buildUser(session.user);
                setUser(userData);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            } else if (event === 'TOKEN_REFRESHED' && session?.user) {
                // Silently refresh user data
                const userData = await buildUser(session.user);
                setUser(userData);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    /**
     * login(email, password, type)
     * Keeps the same signature as the old mock-based login.
     * The "type" param is used to set the role in the profile.
     */
    const login = async (email, password, type) => {
        // ── Demo shortcuts (kept for easy testing) ──
        // email=1 → student, email=2 → teacher, email=3 → parent
        let resolvedEmail = email;
        let resolvedPassword = password;

        if (email === '1') {
            resolvedEmail = 'student@connectprep.demo';
            resolvedPassword = password || 'demo1234';
        } else if (email === '2') {
            resolvedEmail = 'teacher@connectprep.demo';
            resolvedPassword = password || 'demo1234';
        } else if (email === '3') {
            resolvedEmail = 'parent@connectprep.demo';
            resolvedPassword = password || 'demo1234';
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: resolvedEmail,
                password: resolvedPassword,
            });
            if (error) throw error;

            const userData = await buildUser(data.user);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    /**
     * register({ name, email, password, role, usn })
     */
    const register = async ({ name, email, password, role, usn }) => {
        try {
            // 1. Sign up in Supabase Auth
            const { data, error } = await supabase.auth.signUp({ 
                email, 
                password,
                options: {
                    data: {
                        name: name,
                        role: role || 'student'
                    }
                }
            });
            if (error) throw error;

            // Guard: if email confirmation is required, Supabase returns a user
            // but no session. We still treat this as success.
            if (!data?.user) {
                return {
                    success: false,
                    error: 'Check your email and click the confirmation link to activate your account.'
                };
            }

            // 2. Try to create profile row — but don't block login if it fails
            //    (e.g. if the SQL migration hasn't been run yet)
            try {
                await profileService.upsert({
                    id: data.user.id,
                    name,
                    email,
                    role: role || 'student',
                    usn: usn || null,
                });
            } catch (profileErr) {
                // Profile save failed (table may not exist yet) — log it but
                // don't prevent the user from being logged in.
                console.warn('Profile upsert skipped:', profileErr.message);
            }

            // 3. Build user object from whatever we have
            const userData = {
                _id: data.user.id,
                id: data.user.id,
                name,
                email,
                role: role || 'student',
                usn: usn || '',
            };
            setUser(userData);
            return { success: true };
        } catch (error) {
            // Map common Supabase auth errors to friendly messages
            let msg = error.message;
            if (msg?.includes('already registered') || msg?.includes('already exists')) {
                msg = 'An account with this email already exists. Try logging in.';
            } else if (msg?.includes('Invalid email')) {
                msg = 'Please enter a valid email address.';
            } else if (msg?.includes('Password')) {
                msg = 'Password must be at least 6 characters.';
            }
            return { success: false, error: msg };
        }
    };


    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    /**
     * refreshUser() — call after profile save to update in-memory user
     */
    const refreshUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const userData = await buildUser(session.user);
            setUser(userData);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, refreshUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
