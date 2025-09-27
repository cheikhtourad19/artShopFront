// lib/auth.ts - Utility functions for authentication

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api";

// Get token from localStorage (client-side only)
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Create authenticated API request headers
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request function with authentication
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<unknown> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: getAuthHeaders(),
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || `API Error: ${response.status}`);
  }

  return data;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    // Parse JWT to check expiration
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Decode JWT token
export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};
