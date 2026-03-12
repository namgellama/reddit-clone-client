import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import App from "@/app/App.tsx";
import "@/index.css";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 2000,
                        }}
                    />
                </AuthProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
);
