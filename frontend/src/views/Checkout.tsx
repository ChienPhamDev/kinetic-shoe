import { useState } from "react";
import { Lock, CreditCard, Wallet, Apple, ShieldCheck, Truck, Package, ChevronLeft, CheckCircle2 } from "lucide-react";
import { CartItem } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutProps {
  items: CartItem[];
  onComplete: () => void;
}

type PaymentMethod = "card" | "paypal" | "apple";

export default function Checkout({ items, onComplete }: CheckoutProps) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleComplete = async () => {
    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 1800));
    setIsSubmitting(false);
    setIsComplete(true);
    onComplete();
  };

  const getCategoryName = (category: CartItem["category"]) =>
    typeof category === "string" ? category.split("/")[0].trim() : (category as any)?.name || "";

  if (isComplete) {
    return (
      <main className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-8"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={52} className="text-primary" />
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-stone-900 mb-4">Order Confirmed</h1>
          <p className="text-stone-400 font-medium mb-10 leading-relaxed">
            Thank you for shopping with KINETIC. Your order is being prepared and will ship within 1–2 business days.
          </p>
          <Link
            to="/shop"
            className="bg-stone-950 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all inline-flex items-center gap-3"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header */}
        <div className="mb-16">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 hover:text-black transition-colors mb-6"
          >
            <ChevronLeft size={14} />
            Back to Bag
          </Link>
          <div className="flex items-center gap-3 text-primary mb-4">
            <Lock size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Checkout</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none text-stone-900">
            Shipping &amp; Payment
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-16">

            {/* Shipping */}
            <section>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-stone-100 italic select-none">01</span>
                <h2 className="text-xl font-black tracking-tight uppercase text-stone-900">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">Full Name</label>
                  <input
                    id="checkout-full-name"
                    className="w-full bg-stone-50 border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300"
                    placeholder="Johnathan Doe"
                    type="text"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">Email Address</label>
                  <input
                    id="checkout-email"
                    className="w-full bg-stone-50 border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300"
                    placeholder="you@kinetic.com"
                    type="email"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">Street Address</label>
                  <input
                    id="checkout-address"
                    className="w-full bg-stone-50 border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300"
                    placeholder="123 Kinetic Way, Suite 4B"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">City</label>
                  <input
                    id="checkout-city"
                    className="w-full bg-stone-50 border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300"
                    placeholder="New York"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">Zip Code</label>
                  <input
                    id="checkout-zip"
                    className="w-full bg-stone-50 border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300"
                    placeholder="10001"
                    type="text"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-stone-100 italic select-none">02</span>
                <h2 className="text-xl font-black tracking-tight uppercase text-stone-900">Payment Method</h2>
              </div>

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {(["card", "paypal", "apple"] as PaymentMethod[]).map((method) => {
                  const icon = method === "card" ? <CreditCard size={20} /> : method === "paypal" ? <Wallet size={20} /> : <Apple size={20} />;
                  const label = method === "card" ? "Credit Card" : method === "paypal" ? "PayPal" : "Apple Pay";
                  return (
                    <button
                      key={method}
                      id={`payment-method-${method}`}
                      onClick={() => setPaymentMethod(method)}
                      className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 transition-all ${
                        paymentMethod === method
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-stone-100 hover:border-stone-200 text-stone-400"
                      }`}
                    >
                      {icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Card Form */}
              <AnimatePresence mode="wait">
                {paymentMethod === "card" && (
                  <motion.div
                    key="card-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-stone-50 rounded-2xl p-8 space-y-4"
                  >
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">Card Number</label>
                      <input
                        id="checkout-card-number"
                        className="w-full bg-white border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300 tracking-widest"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">Expiry</label>
                        <input
                          id="checkout-card-expiry"
                          className="w-full bg-white border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300"
                          placeholder="MM / YY"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">CVV</label>
                        <input
                          id="checkout-card-cvv"
                          className="w-full bg-white border border-stone-100 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-stone-300"
                          placeholder="•••"
                          type="text"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                {paymentMethod !== "card" && (
                  <motion.div
                    key={`${paymentMethod}-placeholder`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-stone-50 rounded-2xl p-12 flex items-center justify-center"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                      You will be redirected to {paymentMethod === "paypal" ? "PayPal" : "Apple Pay"} to complete payment.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-8 py-8 border-t border-stone-100">
              {[
                { icon: <ShieldCheck size={18} className="text-primary" />, label: "Secure SSL" },
                { icon: <Truck size={18} className="text-primary" />, label: "Fast Insured Shipping" },
                { icon: <Package size={18} className="text-primary" />, label: "Original Box Included" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-stone-400 text-xs font-black uppercase tracking-widest">
                  {icon}
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order Summary */}
          <aside className="lg:col-span-5">
            <div className="sticky top-32 bg-stone-50 rounded-2xl p-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-8">
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-start">
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        className="w-full h-full object-contain"
                        src={item.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200"}
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                        {getCategoryName(item.category)}
                      </p>
                      <p className="text-sm font-black tracking-tight text-stone-900 uppercase truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                        Size: {item.selectedSize} · Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-black text-stone-900 flex-shrink-0">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-stone-200 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-stone-500">Subtotal</span>
                  <span className="font-black text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-stone-500">Shipping</span>
                  <span className="font-black text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-stone-500">Tax (8%)</span>
                  <span className="font-black text-stone-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-stone-200">
                  <span className="font-black uppercase tracking-widest text-stone-900">Total</span>
                  <span className="text-2xl font-black text-stone-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                id="complete-purchase-btn"
                onClick={handleComplete}
                disabled={isSubmitting || items.length === 0}
                className="w-full bg-stone-950 text-white py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all disabled:opacity-60 shadow-2xl shadow-stone-950/20 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Complete Purchase"
                )}
              </button>

              <p className="mt-5 flex items-center justify-center gap-2 text-[10px] font-black text-stone-400 tracking-widest uppercase">
                <Lock size={12} />
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
