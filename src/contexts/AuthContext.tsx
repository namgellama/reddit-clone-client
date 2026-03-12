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
import type { LoginResponse } from "@/features/auth/types/login";
import type { LoginFormFields } from "@/features/auth/validation";
import { useGetMe } from "@/features/user/hooks/useGetMe";
import type { User } from "@/features/user/types";
import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api, {
    type AxiosRequestConfigWithRetry,
    type InternalAxiosRequestConfigWithRetry,
} from "@/shared/lib/api";

interface AuthContextType {
    isLoading: boolean;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
    isAuthenticated: boolean;
    login: (data: LoginFormFields) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")!)
            : null,
    );
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!user;

    const { loginMutation } = useLogin();
    const { logoutMutation } = useLogout();
    const { currentUser, isLoading: isCurrentUserLoading } = useGetMe(!!token);

    const navigate = useNavigate();

    // Bootstrap authentication when the app loads
    useEffect(() => {
        const bootstrapAuth = async () => {
            setIsLoading(true);
            try {
                const response = await api.post<LoginResponse>(
                    API_ENDPOINT.auth.refreshToken,
                    null,
                    { withCredentials: true },
                );

                setToken(response.data.access_token);
            } catch {
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        bootstrapAuth();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
            localStorage.setItem("user", JSON.stringify(currentUser));
            setIsLoading(false);
        }
    }, [currentUser]);

    // Set token in every request header
    useEffect(() => {
        const authInterceptor = api.interceptors.request.use(
            (config: InternalAxiosRequestConfigWithRetry) => {
                if (!config._retry && token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
        );

        return () => api.interceptors.request.eject(authInterceptor);
    }, [token]);

    // Handle token refresh on 401 responses
    useEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest =
                    error.config as AxiosRequestConfigWithRetry;

                if (
                    originalRequest.url?.includes(
                        API_ENDPOINT.auth.refreshToken,
                    )
                ) {
                    return Promise.reject(error);
                }

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = await api.post<LoginResponse>(
                            API_ENDPOINT.auth.refreshToken,
                        );
                        const accessToken = response.data.access_token;
                        setToken(accessToken);

                        originalRequest.headers!.Authorization = `Bearer ${accessToken}`;

                        return api(originalRequest);
                    } catch (error) {
                        setToken(null);
                        setUser(null);
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => api.interceptors.response.eject(refreshInterceptor);
    }, []);

    const login = async (data: LoginFormFields) => {
        const formData = new FormData();
        formData.append("username", data.email);
        formData.append("password", data.password);

        const res = await loginMutation(formData);
        setToken(res.access_token);
        setIsLoading(false);
    };

    const logout = async () => {
        await logoutMutation();
        setToken(null);
        setUser(null);
        setIsLoading(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading: isLoading || isCurrentUserLoading,
                user,
                setUser,
                token,
                setToken,
                isAuthenticated,
                login,
                logout,
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
