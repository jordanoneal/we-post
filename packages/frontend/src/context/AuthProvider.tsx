import { createContext, useState } from "react";

export interface AuthContextType {
    auth: {};
    setAuth: (value: {}) => void;
}

const AuthContext = createContext<AuthContextType>({
    auth: {},
    setAuth: (value) => { },
});

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;