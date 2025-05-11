
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookAppointment from "./pages/BookAppointment";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PatientDatabase from "./pages/PatientDatabase";

const App = () => {
  // Create a client inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/patient-database" element={<PatientDatabase />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
