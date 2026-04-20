import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import ProductList from "./views/ProductList";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Register from "./views/Register";
import { Product, CartItem } from "./types";
import { AnimatePresence, motion } from "motion/react";
import { AuthProvider } from "./context/AuthContext";

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const location = useLocation();

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
      <ScrollToTop />
      <Navbar cartCount={cartCount} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/product/:slug" element={<ProductDetail onAddToCart={addToCart} />} />
              <Route path="/cart" element={
                <Cart 
                  items={cart} 
                  onUpdateQuantity={updateQuantity} 
                  onRemove={removeFromCart} 
                />
              } />
              <Route path="/checkout" element={
                <Checkout 
                  items={cart} 
                  onComplete={() => {
                    alert("Purchase Complete! Thank you for shopping with KINETIC.");
                    setCart([]);
                  }} 
                />
              } />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
