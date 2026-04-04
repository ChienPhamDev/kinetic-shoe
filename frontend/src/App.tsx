/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
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

type View = "home" | "list" | "detail" | "cart" | "checkout" | "profile" | "login" | "register";

function AppContent() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: string, data?: any) => {
    if (view === "detail" && data) {
      setSelectedProduct(data);
    }
    setCurrentView(view as View);
  };

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
    setCurrentView("cart");
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
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        cartCount={cartCount} 
      />

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === "home" && <Home onNavigate={handleNavigate} />}
            {currentView === "list" && <ProductList onNavigate={handleNavigate} />}
            {currentView === "detail" && selectedProduct && (
              <ProductDetail product={selectedProduct} onAddToCart={addToCart} />
            )}
            {currentView === "cart" && (
              <Cart 
                items={cart} 
                onUpdateQuantity={updateQuantity} 
                onRemove={removeFromCart} 
                onCheckout={() => setCurrentView("checkout")}
              />
            )}
            {currentView === "checkout" && (
              <Checkout 
                items={cart} 
                onComplete={() => {
                  alert("Purchase Complete! Thank you for shopping with KINETIC.");
                  setCart([]);
                  setCurrentView("home");
                }} 
              />
            )}
            {currentView === "profile" && <Profile />}
            {currentView === "login" && <Login onNavigate={handleNavigate} />}
            {currentView === "register" && <Register onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
