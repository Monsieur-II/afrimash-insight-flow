import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearUserEmail } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  userEmail?: string;
}

const Navbar = ({ userEmail }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserEmail();
    navigate("/");
  };

  return (
    <nav className="border-b border-border bg-card shadow-soft">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-farm rounded-lg"></div>
          <h1 className="text-xl font-bold text-primary">Afrimash Insights</h1>
        </div>
        
        {userEmail && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
