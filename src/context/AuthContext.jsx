import { createContext, useContext, useState, useCallback } from "react";
import { googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [loginError, setLoginError] = useState(null);
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("nfa_user");
            if (!stored) return null;
            
            const parsed = JSON.parse(stored);
            
            // If token expired, clear it and treat as logged out
            const now = Math.floor(Date.now() / 1000);
            if (parsed.expiresAt && parsed.expiresAt < now) {
                localStorage.removeItem("nfa_user");
                return null;
            }
            
            return parsed;
        } catch {
            return null;
        }
    });

	const login = useCallback(async (credentialResponse) => {
        setLoginError(null);
        try {
            const decoded = jwtDecode(credentialResponse.credential);
    
            // Check token expiry before storing
            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp < now) {
                console.error("Token already expired");
                return;
            }
    
            // Call backend to register/upsert user AND get is_admin
            const res = await fetch("https://chat-server-production-e62d.up.railway.app/api/auth/login", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${credentialResponse.credential}`,
                },
            });
    
            if (!res.ok) {
                if (res.status === 403) {
                    setLoginError("Your account hasn't been granted access yet. Please contact the administrator.");
                } else {
                    setLoginError("Login failed. Please try again.");
                }
                return;
            }
    
            const backendUser = await res.json();
    
            const userData = {
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
                sub: decoded.sub,
                token: credentialResponse.credential,
                expiresAt: decoded.exp,
                is_admin: backendUser.is_admin ?? false,  // ← from backend
            };
    
            setUser(userData);
            localStorage.setItem("nfa_user", JSON.stringify(userData));
        } catch (err) {
            console.error("Failed to login:", err);
            setLoginError("Login failed. Please try again.")
        }
    }, []);

	const logout = useCallback(() => {
		googleLogout();
		setUser(null);
		localStorage.removeItem("nfa_user");
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
                loginError,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used outside of AuthProvider");
	return ctx;
}
