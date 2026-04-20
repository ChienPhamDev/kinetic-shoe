import { Minus, Plus, Trash2, Lock, ArrowRight, ShoppingBag, ChevronLeft } from "lucide-react";
import { CartItem } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove }: CartProps) {
  const navigate = useNavigate();
  const subtotal = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 hover:text-black transition-colors mb-6"
            >
              <ChevronLeft size={14} />
              Continue Shopping
            </Link>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none text-stone-900">
              Your Bag
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 pb-3">
            {items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </p>
        </div>

        {items.length === 0 ? (
          /* --- Empty State --- */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-40 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-stone-50 flex items-center justify-center mb-8">
              <ShoppingBag size={36} className="text-stone-300" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-stone-900 mb-3">Your bag is empty</h2>
            <p className="text-stone-400 font-medium mb-10 max-w-xs">
              Looks like you haven't added anything yet. Explore the collection.
            </p>
            <Link
              to="/shop"
              className="bg-stone-950 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all flex items-center gap-3 group"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-20">

            {/* --- Cart Items --- */}
            <div className="flex-grow space-y-0 divide-y divide-stone-100">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row gap-8 py-10 group">
                      {/* Product Image */}
                      <div className="w-full sm:w-44 aspect-square bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-4">
                        <img
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          src={item.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400"}
                          alt={item.name}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
                              {typeof item.category === "string" ? item.category : (item.category as any)?.name}
                            </p>
                            <h3 className="text-2xl font-black tracking-tight text-stone-900 uppercase leading-tight mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                              Size: {item.selectedSize}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-2xl font-black text-stone-900">
                              ${(Number(item.price) * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-stone-400 font-medium mt-1">
                                ${Number(item.price).toFixed(2)} each
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-1 border border-stone-100 rounded-full p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-600"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-black text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-600"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemove(item.id, item.selectedSize)}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-300 hover:text-red-500 transition-colors group/remove"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} className="group-hover/remove:scale-110 transition-transform" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- Order Summary --- */}
            <aside className="w-full lg:w-[420px] flex-shrink-0">
              <div className="sticky top-32">
                <div className="bg-stone-50 rounded-2xl p-8">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-8">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-stone-500">Subtotal</span>
                      <span className="text-sm font-black text-stone-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-stone-500">Shipping</span>
                      <span className="text-sm font-black text-primary">FREE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-stone-500">Tax (8%)</span>
                      <span className="text-sm font-black text-stone-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-stone-200 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-base font-black uppercase tracking-widest text-stone-900">Total</span>
                      <span className="text-3xl font-black text-stone-900">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-8">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="promo-code-input"
                        className="flex-grow bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold tracking-widest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-300"
                        placeholder="ENTER CODE"
                        type="text"
                      />
                      <button
                        id="promo-apply-btn"
                        className="px-5 bg-stone-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="proceed-to-checkout-btn"
                    onClick={() => navigate("/checkout")}
                    disabled={items.length === 0}
                    className="w-full bg-stone-950 text-white py-5 px-8 rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all disabled:opacity-50 shadow-2xl shadow-stone-950/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-stone-400 tracking-widest uppercase">
                    <Lock size={12} />
                    Secure SSL Encrypted Checkout
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Free Returns", value: "30 Days" },
                    { label: "Shipping", value: "Free" },
                    { label: "Support", value: "24/7" },
                  ].map((badge) => (
                    <div key={badge.label} className="bg-stone-50 rounded-xl p-4">
                      <p className="text-sm font-black text-stone-900">{badge.value}</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-1">{badge.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
