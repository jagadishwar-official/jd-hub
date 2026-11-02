
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setDbUser(null);
            setLoading(true);

            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken();

                    const response = await fetch("http://localhost:5000/api/users/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setDbUser(data.user);
                    }
                } catch (error) {
                    console.log("User Profile Error:", error.message);
                }
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setDbUser(null);
    };

    const isAdmin = dbUser?.role === "admin";

    return (
        <AuthContext.Provider value={{ user, dbUser, isAdmin, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
