import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/shared/components/ui/spinner";

const GoogleCallbackPage = () => {
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();

    const { setToken, user, token } = useAuth();

    const accessToken = searchParams.get("access_token");

    // Set token from URL query param (after OAuth redirect)
    useEffect(() => {
        if (!accessToken) return;

        setToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (user && token) navigate("/", { replace: true });
    }, [user, token, navigate]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Spinner className="size-10" />
        </div>
    );
};

export default GoogleCallbackPage;
