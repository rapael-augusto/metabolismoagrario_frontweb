// src/utils/authUtils.ts
import { jwtDecode } from 'jwt-decode';

interface UserTokenPayload {
    sub: string;
    name: string;
    email: string;
    role: string;
}

export const getRoleFromToken = (): string | null => {
    const token = sessionStorage.getItem('@token');
    if (token) {
        try {
            const decodedToken = jwtDecode<UserTokenPayload>(token);
            return decodedToken.role;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
        }
    }
    return null;
};

export const initializeRoleInStorage = () => {
    const role = getRoleFromToken();
    if (role) {
        sessionStorage.setItem('userRole', role);
    } else {
        sessionStorage.removeItem('userRole');
    }
};

export const getRoleFromStorage = (): string | null => {
    return sessionStorage.getItem('userRole');
};
