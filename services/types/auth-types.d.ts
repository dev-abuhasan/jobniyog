import type { UserRole } from "@/services/db/schema";
export type { UserRole };

export type AuthProvider = "phone" | "email" | "google" | "facebook" | "linkedin";

export interface AuthUser {
  id: string;
  name: string;
  phone?: string;    // undefined for social-only users
  email?: string;
  avatar?: string;   // profile image URL from social provider
  cashBalance?: number;
  provider: AuthProvider;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}

export interface StoredUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  cashBalance?: number;
  passwordHash: string;
  provider: AuthProvider;
  role: UserRole;
  createdAt: string;
  otpVerified: boolean;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface SignupRequest {
  phone: string;
  password: string;
  name: string;
}

export interface OtpSendRequest {
  phone: string;
}

export interface OtpVerifyRequest {
  phone: string;
  otp: string;
}

export interface SocialLoginRequest {
  provider: Exclude<AuthProvider, "phone">;
  accessToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
