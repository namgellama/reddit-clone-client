import {
    createContext,
    useContext,
    useEffect,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { useLogout } from "@/features/auth/hooks/useLogout";
import type { LoginFormFields } from "@/features/auth/validation";
import type { User } from "@/features/user/types";
import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";

interface AuthContextType {
    isLoading: boolean;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    isAuthenticated: boolean;
    login: (data: LoginFormFields) => Promise<void>;
    logout: () => Promise<void>;
    getCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")!)
            : null,
    );
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!user;

    const { loginMutation } = useLogin();
    const { logoutMutation } = useLogout();

    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const response = await api.get<User>(API_ENDPOINT.user.getMe);
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            setUser(null);
            localStorage.removeItem("user");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const login = async (data: LoginFormFields) => {
        const formData = new FormData();
        formData.append("username", data.email);
        formData.append("password", data.password);

        await loginMutation(formData);
        await getCurrentUser();
        setIsLoading(false);
    };

    const logout = async () => {
        await logoutMutation();
        localStorage.removeItem("user");
        setUser(null);
        setIsLoading(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading: isLoading,
                user,
                setUser,
                isAuthenticated,
                login,
                logout,
                getCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
};
