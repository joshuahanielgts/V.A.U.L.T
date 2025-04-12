import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InvestorDashboard from "./pages/InvestorDashboard";
import StartupDashboard from "./pages/StartupDashboard";
import NotFound from "./pages/NotFound";
import { DirectionProvider } from "@radix-ui/react-direction";

const queryClient = new QueryClient();

const ChatbotLoader = () => {
  const location = useLocation();

  useEffect(() => {
    const scriptId = "fastbots-chatbot";

    const shouldLoad =
      location.pathname.startsWith("/startup-dashboard") ||
      location.pathname.startsWith("/investor-dashboard");

    const alreadyLoaded = document.getElementById(scriptId);

    if (shouldLoad && !alreadyLoaded) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.defer = true;
      script.src = "https://app.fastbots.ai/embed.js";
      script.setAttribute("data-bot-id", "cm9e0dm211m3srik7qtbjfnq6");
      document.body.appendChild(script);
    }

    if (!shouldLoad && alreadyLoaded) {
      alreadyLoaded.remove();
    }
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DirectionProvider dir="ltr">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ChatbotLoader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/investor-dashboard/*" element={<InvestorDashboard />} />
            <Route path="/startup-dashboard/*" element={<StartupDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DirectionProvider>
  </QueryClientProvider>
);

export default App;
