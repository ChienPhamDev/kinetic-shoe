import { ShoppingBag, User, Search, Menu, LogIn } from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
}

export default function Navbar({ currentView, onNavigate, cartCount }: NavbarProps) {
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { name: "Men", id: "men" },
    { name: "Women", id: "women" },
    { name: "New Arrivals", id: "new" },
    { name: "Sale", id: "sale" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-8 h-20 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-12">
          <button 
            onClick={() => onNavigate("home")}
            className="text-2xl font-black tracking-tighter text-stone-900 uppercase"
          >
            KINETIC
          </button>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate("list")}
                className={cn(
                  "font-bold tracking-tight uppercase transition-colors pb-1 border-b-2",
                  currentView === "list" && item.id === "women"
                    ? "text-primary border-primary"
                    : "text-stone-600 border-transparent hover:text-stone-900"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-stone-600 hover:opacity-80 transition-opacity">
            <Search size={24} />
          </button>
          
          {isAuthenticated ? (
            <button 
              onClick={() => onNavigate("profile")}
              className={cn(
                "text-stone-600 hover:opacity-80 transition-opacity flex items-center gap-2",
                currentView === "profile" && "text-primary"
              )}
            >
              <User size={24} />
              <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">
                {user.fullName ? user.fullName.split(' ')[0] : 'Member'}
              </span>
            </button>
          ) : (
            <button 
              onClick={() => onNavigate("login")}
              className={cn(
                "text-stone-600 hover:opacity-80 transition-opacity flex items-center gap-2",
                currentView === "login" && "text-primary"
              )}
            >
              <LogIn size={24} />
              <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-primary">Join / Sign In</span>
            </button>
          )}

          <button 
            onClick={() => onNavigate("cart")}
            className="text-stone-600 hover:opacity-80 transition-opacity relative"
          >
            <ShoppingBag size={24} className={cn(currentView === "cart" && "text-primary")} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-stone-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
