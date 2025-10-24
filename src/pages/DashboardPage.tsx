import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, TrendingUp, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import { getUserEmail, isAfrimashEmail } from "@/utils/auth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const userEmail = getUserEmail();

  useEffect(() => {
    if (!userEmail || !isAfrimashEmail(userEmail)) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  const dashboardItems = [
    {
      title: "Customer Segmentation",
      description: "Analyze customer groups based on purchasing behavior and demographics to target marketing campaigns.",
      icon: Users,
    },
    {
      title: "Churn Prediction",
      description: "Identify customers at risk of churning and take proactive retention measures before losing them.",
      icon: TrendingUp,
    },
    {
      title: "Customer Retention Analysis",
      description: "Deep dive into customer lifetime value and engagement metrics to improve retention strategies.",
      icon: BarChart3,
    },
    {
      title: "Product Recommendations Overview",
      description: "View aggregated insights on product recommendation performance and cross-sell opportunities.",
      icon: ShoppingCart,
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardItems.map((item, index) => (
            <div
              key={item.title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DashboardCard
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            </div>
          ))}
        </div>

        {/* Placeholder for future charts */}
        <div className="mt-8 p-8 bg-card rounded-lg border border-border shadow-card animate-fade-in">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Quick Metrics Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">1,245</div>
              <div className="text-sm text-muted-foreground">Active Customers</div>
            </div>
            <div className="p-4 bg-secondary/10 rounded-lg">
              <div className="text-3xl font-bold text-secondary mb-1">87%</div>
              <div className="text-sm text-muted-foreground">Retention Rate</div>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-1">₦2.5M</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
          </div>
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
