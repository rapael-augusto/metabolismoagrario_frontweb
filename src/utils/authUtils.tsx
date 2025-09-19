// src/utils/authUtils.ts
import { jwtDecode } from 'jwt-decode';
import { toast } from "react-toastify";

interface UserTokenPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
}

export const getRoleFromToken = (): string | null => {
  const token = sessionStorage.getItem("@token");
  if (token) {
    try {
      const decodedToken = jwtDecode<UserTokenPayload>(token);
      return decodedToken.role;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  }
  return null;
};

export const initializeRoleInStorage = () => {
  const role = getRoleFromToken();
  if (role) {
    sessionStorage.setItem("userRole", role);
  } else {
    sessionStorage.removeItem("userRole");
  }
};

export const getRoleFromStorage = (): string | null => {
  return sessionStorage.getItem("userRole");
};

export const validatePassword = (
  password: string,
  silent = false
): string | boolean => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (password.length < minLength) {
    const msg = "A senha deve ter pelo menos 8 caracteres.";
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  if (!hasUppercase) {
    const msg = "A senha deve conter pelo menos uma letra maiúscula.";
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  if (!hasLowercase) {
    const msg = "A senha deve conter pelo menos uma letra minúscula.";
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  if (!hasNumber) {
    const msg = "A senha deve conter pelo menos um número.";
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  return silent ? '' : true;
};

export const validateEmail = (
  email: string,
  silent = false
): string | boolean => {
  if (!email || email.trim() === "") {
    const msg = "E-mail é obrigatório.";
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    const msg = "Por favor, insira um e-mail válido.";
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  return silent ? "" : true;
};
