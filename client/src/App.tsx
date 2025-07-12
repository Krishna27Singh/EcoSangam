import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/Layout";
import Home from "@/components/pages/Home";
import Dashboard from "@/components/pages/Dashboard";
import CarbonCalculator from "@/components/pages/CarbonCalculator";
import About from "@/components/pages/About";
import UserProfile from "@/components/pages/UserProfile";
import LoginSignup from "@/components/pages/LoginSignup";
import NotFound from "@/pages/NotFound";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const { login } = useAuth(); // use login from AuthContext

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Login page */}
            <Route index element={<LoginSignup />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calculator" element={<CarbonCalculator />} />
              <Route path="about" element={<About />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
