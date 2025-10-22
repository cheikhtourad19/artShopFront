// types/auth.ts
export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  isAdmin: boolean;

}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface AuthResponse {
  msg: string;
  user: User;
  token: string;
}

export interface ApiError {
  msg: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
