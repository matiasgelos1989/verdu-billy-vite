import { useContext } from "react";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isUserLogged, setUserLogged] = useState(false);
    const login = (token) => {
        if (token) {
            setUserLogged(true);
        }
    }
    const logout = () => {
        setUserLogged(false);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ isUserLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}