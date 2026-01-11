// User and Authentication Types
export type DelegateType = 'pharmacy_students' | 'all_delegate' | 'foreign_delegates';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  delegateType: DelegateType;
  country?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  iconColor?: string;
  maxLength?: number;
}

export interface ValidationRule {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

// Registration and Pricing Types
export interface RegistrationPackage {
  id: string;
  priceUSD: number;
  priceTHB: number;
  originalPriceUSD?: number;
  originalPriceTHB?: number;
}

export interface AddOn {
  id: string;
  priceUSD: number;
  priceTHB: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  institution: string;
  dietaryRequirement: string;
  specialNeeds: string;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
  style?: React.CSSProperties;
}

export interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: string;
  iconColor?: string;
  maxLength?: number;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

// Tab Types
export type AuthTab = 'member' | 'pharmacist' | 'international';

export interface TabConfig {
  id: AuthTab;
  label: string;
  icon: string;
  color: string;
}
