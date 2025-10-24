import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { getUserEmail } from "@/utils/auth";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";

const RecommendationPage = () => {
  const navigate = useNavigate();
  const userEmail = getUserEmail();
  const [displayedProducts, setDisplayedProducts] = useState(products);

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  const shuffleProducts = () => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setDisplayedProducts(shuffled);
    toast({
      title: "Products refreshed!",
      description: "Here are some new recommendations for you.",
    });
  };

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

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mb-8 animate-fade-in">
          <Button
            onClick={shuffleProducts}
            className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-card hover:shadow-hover transition-all duration-300"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle Recommendations
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </div>

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
