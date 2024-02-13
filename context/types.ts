
export interface CompareCard {
  id: number,
  name: string,
  creditCardPhoto: string,
};
export interface AuthState {
  isAuthenticated: boolean;
  compareList: CompareCard[];
  favoriteNumber: number;
}

export interface AuthContextType {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}
