"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getRoleFromToken, initializeRoleInStorage  } from './authUtils';

interface AuthContextType {
    role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        initializeRoleInStorage();
        const storedRole = sessionStorage.getItem('userRole');
        setRole(storedRole);
    }, []);

    return (
        <AuthContext.Provider value={{ role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
