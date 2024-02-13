import React from 'react';
import { AuthContextType, AuthState } from './types';

const initialAuthState: AuthState = {
  isAuthenticated: false,
  compareList: [],
  favoriteNumber: 0,
};

export const AuthContext = React.createContext<AuthContextType>({
  authState: initialAuthState,
  setAuthState: () => null,
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [authState, setAuthState] = React.useState<AuthState>(initialAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
