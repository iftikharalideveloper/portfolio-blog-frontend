import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() =>{
        return !! localStorage.getItem("token");
    });

    const login = (token, user) =>{
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
    };

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}