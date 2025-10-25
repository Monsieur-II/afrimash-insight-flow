import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getUserEmail } from "@/utils/auth";

const CartPage = () => {
  const navigate = useNavigate();
  const userEmail = getUserEmail();
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (!userEmail) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navbar userEmail={userEmail} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" />
            Your Cart
          </h1>
          <p className="text-muted-foreground">
            {items.length === 0 ? "Your cart is empty" : `${items.length} item(s) in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="p-12 text-center animate-fade-in">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mb-6">No items in your cart yet</p>
            <Button onClick={() => navigate("/recommendations")}>
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="animate-fade-in">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground mb-1">{item.name}</h3>
                        <p className="text-lg font-bold text-primary mb-3">{item.price}</p>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="ml-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4 animate-fade-in">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-card-foreground">Order Summary</h2>
                  <div className="space-y-2 py-4 border-y border-border">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₦{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₦{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/recommendations")}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
