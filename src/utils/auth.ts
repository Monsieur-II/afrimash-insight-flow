// Authentication utilities
export const isAfrimashEmail = (email: string): boolean => {
  return email.toLowerCase().endsWith('@afrimash.com');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const setUserEmail = (email: string): void => {
  localStorage.setItem('afrimash_user_email', email);
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem('afrimash_user_email');
};

export const clearUserEmail = (): void => {
  localStorage.removeItem('afrimash_user_email');
};
