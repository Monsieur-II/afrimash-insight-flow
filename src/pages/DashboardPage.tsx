import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { getUserEmail, isAfrimashEmail } from "@/utils/auth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const userEmail = getUserEmail();

  useEffect(() => {
    if (!userEmail || !isAfrimashEmail(userEmail)) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navbar userEmail={userEmail || undefined} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Data-driven insights to power your agricultural business decisions
          </p>
        </div>

        <div className="flex justify-center animate-fade-in">
          <iframe 
            title="Afrimash Dashboard" 
            width="100%" 
            height="800" 
            src="https://app.powerbi.com/view?r=eyJrIjoiNTM2OTUzZjItZGYxNC00YzU0LThkODYtYjNhMWU0YjRhNjQ1IiwidCI6IjQ0ODdiNTJmLWYxMTgtNDgzMC1iNDlkLTNjMjk4Y2I3MTA3NSJ9" 
            frameBorder="0" 
            allowFullScreen={true}
            className="border border-border rounded-lg shadow-card"
          />
        </div>
      </main>

      <footer className="mt-16 py-6 border-t border-border bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Afrimash Data Challenge
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
