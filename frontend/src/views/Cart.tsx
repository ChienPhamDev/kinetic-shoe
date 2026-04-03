import { Minus, Plus, Trash2, Lock } from "lucide-react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
      <header className="mb-16">
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-4">Your Bag</h1>
        <p className="text-sm tracking-[0.05em] uppercase text-secondary font-medium">Curated Selection • {items.length} Items</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex-grow space-y-12">
          {items.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-outline-variant/20 rounded-xl">
              <p className="text-secondary uppercase tracking-widest font-bold">Your bag is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col md:flex-row gap-8 group">
                <div className="w-full md:w-64 aspect-[4/5] bg-surface-container overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={item.image} 
                    alt={item.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight text-on-surface uppercase mb-1">{item.name}</h3>
                      <p className="text-secondary tracking-wide text-sm mb-4">{item.category}</p>
                      <div className="flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-on-surface-variant">
                        <span>Size: US {item.selectedSize}</span>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="text-lg font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black tracking-tight mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => onRemove(item.id, item.selectedSize)}
                        className="text-error hover:opacity-70 transition-opacity"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="w-full lg:w-[400px]">
          <div className="sticky top-32 bg-surface-container-low p-8 rounded-lg">
            <h2 className="text-2xl font-black tracking-tight uppercase mb-8">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-on-surface-variant">
                <span className="font-medium tracking-wide">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="font-medium tracking-wide">Estimated Shipping</span>
                <span className="font-bold text-tertiary">FREE</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="font-medium tracking-wide">Tax</span>
                <span className="font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-secondary">Promo Code</label>
              <div className="flex gap-2">
                <input className="flex-grow bg-surface-container-lowest border-none px-4 py-3 text-sm tracking-widest focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="ENTER CODE" type="text" />
                <button className="px-6 bg-secondary text-on-secondary text-xs font-bold uppercase tracking-widest hover:bg-on-surface transition-colors">Apply</button>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-5 px-8 rounded-lg font-black uppercase tracking-[0.1em] text-sm shadow-xl shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
            <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold text-secondary tracking-widest uppercase">
              <Lock size={14} />
              Secure SSL Checkout
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
