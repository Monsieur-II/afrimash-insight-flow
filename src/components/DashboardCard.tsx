import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const DashboardCard = ({ title, description, icon: Icon }: DashboardCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 cursor-pointer border-border hover:border-primary/30 animate-scale-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-primary font-medium group-hover:underline">
          View Details →
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
