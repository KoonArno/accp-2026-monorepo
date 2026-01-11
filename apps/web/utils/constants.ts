import type { AuthTab } from '@/types';

// Authentication tab configurations
export const AUTH_TABS = {
  MEMBER: 'member' as AuthTab,
  PHARMACIST: 'pharmacist' as AuthTab,
  INTERNATIONAL: 'international' as AuthTab
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_ID_CARD: 'ID card must be 13 digits',
  PASSWORD_MISMATCH: 'Passwords do not match',
  MIN_LENGTH: (length: number) => `Minimum length is ${length} characters`
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  LOGOUT: '/api/auth/logout',
  CHECKOUT: '/api/checkout',
  PAYMENT: '/api/payment'
};

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'accp_user',
  AUTH_TOKEN: 'accp_token',
  CHECKOUT_FORM: 'accp_checkout_form',
  LANGUAGE: 'accp_language'
};

// Package IDs
export const PACKAGES = {
  STUDENT: 'student',
  PROFESSIONAL: 'professional'
};

// Add-on IDs
export const ADDONS = {
  WORKSHOP: 'workshop',
  GALA: 'gala'
};

// Colors
export const COLORS = {
  PRIMARY: '#1a237e',
  SECONDARY: '#00695c',
  SUCCESS: '#00C853',
  WARNING: '#FF6F00',
  ERROR: '#f44336',
  GOLD: '#FFBA00'
};
