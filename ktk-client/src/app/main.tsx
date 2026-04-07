import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/query-client.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "@/shared/components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <BrowserRouter>
                    <App />
                    <ReactQueryDevtools />
                    <ToastContainer position="bottom-right" />
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </StrictMode>,
);
