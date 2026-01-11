'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// User roles
export type UserRole = 'admin' | 'organizer' | 'reviewer' | 'staff' | 'verifier';

// Event assignment
export interface AssignedEvent {
    id: number;
    code: string;
    name: string;
}

// User interface
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    assignedEvents: AssignedEvent[]; // Events this user can access (empty for admin = all)
}

// Auth context type
interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    canAccessEvent: (eventId: number) => boolean;
    getAccessibleEventIds: () => number[];
    currentEvent: AssignedEvent | null;
    setCurrentEvent: (event: AssignedEvent | null) => void;
    login: (user: User) => void;
    logout: () => void;
}

// Mock users for demo
export const mockUsers: User[] = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@conferencehub.com',
        role: 'admin',
        assignedEvents: [], // Admin sees all events
    },
    {
        id: 2,
        name: 'สมชาย ใจดี',
        email: 'somchai@hospital.com',
        role: 'organizer',
        assignedEvents: [
            { id: 1, code: 'ACCP2026', name: 'ACCP Annual Conference 2026' }
        ],
    },
    {
        id: 3,
        name: 'Dr. Wichai Tanaka',
        email: 'wichai@university.edu',
        role: 'reviewer',
        assignedEvents: [
            { id: 1, code: 'ACCP2026', name: 'ACCP Annual Conference 2026' }
        ],
    },
    {
        id: 4,
        name: 'สุภาพร รักสวย',
        email: 'supaporn@gmail.com',
        role: 'staff',
        assignedEvents: [
            { id: 1, code: 'ACCP2026', name: 'ACCP Annual Conference 2026' },
            { id: 2, code: 'MIS2026', name: 'Medical Innovation Summit' }
        ],
    },
    {
        id: 5,
        name: 'นัฐพร ศรีสุข',
        email: 'nattaporn@edu.th',
        role: 'verifier',
        assignedEvents: [
            { id: 1, code: 'ACCP2026', name: 'ACCP Annual Conference 2026' }
        ],
    },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Default to admin for demo (in real app, this would come from login)
    const [user, setUser] = useState<User | null>(mockUsers[0]);
    const [currentEvent, setCurrentEvent] = useState<AssignedEvent | null>(null);

    const isAdmin = user?.role === 'admin';

    const canAccessEvent = (eventId: number): boolean => {
        if (!user) return false;
        if (isAdmin) return true;
        return user.assignedEvents.some(e => e.id === eventId);
    };

    const getAccessibleEventIds = (): number[] => {
        if (!user) return [];
        if (isAdmin) return []; // Empty means all events
        return user.assignedEvents.map(e => e.id);
    };

    const login = (newUser: User) => {
        setUser(newUser);
        // Auto-select first event for non-admin users
        if (newUser.role !== 'admin' && newUser.assignedEvents.length > 0) {
            setCurrentEvent(newUser.assignedEvents[0]);
        } else {
            setCurrentEvent(null);
        }
    };

    const logout = () => {
        setUser(null);
        setCurrentEvent(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAdmin,
            canAccessEvent,
            getAccessibleEventIds,
            currentEvent,
            setCurrentEvent,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
