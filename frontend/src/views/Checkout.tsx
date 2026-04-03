import { Lock, CreditCard, Wallet, Apple, ShieldCheck, Truck, Package } from "lucide-react";
import { CartItem } from "../types";

interface CheckoutProps {
  items: CartItem[];
  onComplete: () => void;
}

export default function Checkout({ items, onComplete }: CheckoutProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-primary uppercase tracking-[0.2em] font-bold text-xs">
              <Lock size={14} />
              SECURE CHECKOUT
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Shipping & Payment</h1>
          </header>

          <section className="space-y-8">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-black text-outline-variant opacity-30 italic">01</span>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant mb-2">Full Name</label>
                <input className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all px-4 py-4 rounded-lg placeholder:text-secondary/50" placeholder="Johnathan Doe" type="text" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant mb-2">Street Address</label>
                <input className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all px-4 py-4 rounded-lg placeholder:text-secondary/50" placeholder="123 Kinetic Way, Studio 4B" type="text" />
              </div>
              <input className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all px-4 py-4 rounded-lg" placeholder="City" type="text" />
              <input className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all px-4 py-4 rounded-lg" placeholder="Zip Code" type="text" />
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-black text-outline-variant opacity-30 italic">02</span>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Payment Method</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-on-surface text-on-primary rounded-lg border-2 border-on-surface">
                <CreditCard className="mb-2" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Credit Card</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-surface-container-high text-on-surface rounded-lg border-2 border-transparent hover:border-outline-variant transition-all">
                <Wallet className="mb-2" />
                <span className="text-[10px] font-bold tracking-widest uppercase">PayPal</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-surface-container-high text-on-surface rounded-lg border-2 border-transparent hover:border-outline-variant transition-all">
                <Apple className="mb-2" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Apple Pay</span>
              </button>
            </div>
            <div className="p-8 bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(28,27,27,0.04)] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-on-surface-variant mb-2">Card Number</label>
                <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-white transition-all px-4 py-4 rounded-lg" placeholder="0000 0000 0000 0000" type="text" />
              </div>
              <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-white transition-all px-4 py-4 rounded-lg" placeholder="MM / YY" type="text" />
              <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary focus:bg-white transition-all px-4 py-4 rounded-lg" placeholder="123" type="text" />
            </div>
          </section>

          <div className="flex flex-wrap gap-8 py-8 items-center border-t border-outline-variant/10">
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="text-primary" size={18} />
              Secure SSL
            </div>
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
              <Truck className="text-primary" size={18} />
              Fast Insured Shipping
            </div>
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
              <Package className="text-primary" size={18} />
              Original Box Included
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <div className="bg-surface-container-low rounded-xl p-8 space-y-8">
            <h3 className="text-xl font-bold tracking-tight uppercase">Order Summary</h3>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-surface-container-highest rounded overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{item.category.split('/')[0]}</div>
                    <div className="text-sm font-bold leading-tight uppercase">{item.name}</div>
                    <div className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">Size: {item.selectedSize} US</div>
                    <div className="text-sm font-bold mt-2">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8 border-t border-outline-variant/20">
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-secondary">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-secondary">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-secondary">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black uppercase tracking-tighter pt-4 border-t border-on-surface/5">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={onComplete}
              className="kinetic-gradient w-full py-5 rounded text-white font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(160,65,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              Complete Purchase
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
