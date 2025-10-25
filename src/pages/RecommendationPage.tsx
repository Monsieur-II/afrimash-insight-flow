import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { getUserEmail } from "@/utils/auth";
import { toast } from "@/hooks/use-toast";
import { API_CONFIG } from "@/config/api";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const RecommendationPage = () => {
  const navigate = useNavigate();
  const userEmail = getUserEmail();
  const { items } = useCart();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return;
    }
    
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.baseUrl}/customers/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        
        // Transform API response to match our Product interface
        const products: Product[] = data.map((item: any, index: number) => ({
          id: `product-${index}`,
          name: item.title,
          description: `Premium quality ${item.title.toLowerCase()}`,
          price: `₦${Math.floor(Math.random() * 50000 + 5000).toLocaleString()}`,
          image: item.image_url,
        }));

        setDisplayedProducts(products);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast({
          title: "Error loading recommendations",
          description: "Unable to fetch personalized recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userEmail, navigate]);

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navbar userEmail={userEmail || undefined} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Welcome to Afrimash!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Here are products you might love based on your interests
          </p>
          {userEmail && (
            <p className="text-sm text-accent font-medium">
              Personalized for {userEmail}
            </p>
          )}
        </div>

        {/* Action button */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <Button
            onClick={() => navigate("/cart")}
            variant="outline"
            className="gap-2 relative"
          >
            <ShoppingCart className="w-4 h-4" />
            View Cart
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading your personalized recommendations...</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recommendations available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              </div>
            ))}
          </div>
        )}

        {/* Additional info section */}
        <div className="mt-12 p-8 bg-card rounded-lg border border-border shadow-card text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-card-foreground mb-3">
            Need Something Specific?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our recommendation engine learns from your preferences to show you the most relevant products.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Back to Login
          </Button>
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

export default RecommendationPage;
