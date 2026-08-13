import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem("token");
    });
    
    // ✅ ADDED: User state
    const [user, setUser] = useState(() => {
        try {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.log("Error parsing user data:", error);
            return null;
        }
    });

    // ✅ FIXED: Login function with user data
    const login = (token, userData) => {
        console.log("🔐 Login called with:", userData);
        
        // Make sure user has all fields
        const userObj = {
            _id: userData._id || userData.id,
            name: userData.name || userData.username || 'User',
            email: userData.email || '',
            role: userData.role || 'user',
            ...userData
        };
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userObj));
        
        setUser(userObj);
        setIsLoggedIn(true);
        
        console.log("✅ User set in context:", userObj);
    };

    // ✅ FIXED: Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
        console.log("👋 User logged out");
    };

    // ✅ ADDED: Load user from localStorage on app start
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsLoggedIn(true);
                console.log("✅ User loaded from localStorage:", parsedUser);
            } catch (error) {
                console.log("❌ Error parsing user data:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}