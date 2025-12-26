import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import App from "@/app/App.tsx";

import "@/index.css";

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
    </StrictMode>
);
