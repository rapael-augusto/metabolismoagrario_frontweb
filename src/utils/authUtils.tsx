// src/utils/authUtils.ts
import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
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
    const msg = i18next.t("auth-utils.password-min-char-case");
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  if (!hasUppercase) {
    const msg = i18next.t("auth-utils.password-uppercase-case");
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  if (!hasLowercase) {
    const msg = i18next.t("auth-utils.password-lowercase-case");
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  if (!hasNumber) {
    const msg = i18next.t("auth-utils.password-number-case");
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
    const msg = i18next.t("auth-utils.email-required-case");
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    const msg = i18next.t("auth-utils.email-valid-case");
    if (!silent) toast.error(msg);
    return silent ? msg : false;
  }

  return silent ? "" : true;
};
