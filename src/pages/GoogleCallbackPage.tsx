import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/shared/components/ui/spinner";

const GoogleCallbackPage = () => {
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();

    const { user, getCurrentUser } = useAuth();

    const accessToken = searchParams.get("access_token");

    // Set token from URL query param (after OAuth redirect)
    useEffect(() => {
        if (!accessToken) return;

        getCurrentUser();
    }, [accessToken]);

    useEffect(() => {
        if (user) navigate("/", { replace: true });
    }, [user, navigate]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Spinner className="size-10" />
        </div>
    );
};

export default GoogleCallbackPage;
