import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

const ProductCard = ({ name, description, price, image }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 overflow-hidden border-border hover:border-accent/50 animate-fade-in">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg text-card-foreground">{name}</CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-2xl font-bold text-primary">{price}</div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
