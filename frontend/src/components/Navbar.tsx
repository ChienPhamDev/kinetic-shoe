import { ShoppingBag, User, Search, Menu, LogIn } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { name: "Men", id: "men", path: "/shop?cat=men" },
    { name: "Women", id: "women", path: "/shop?cat=women" },
    { name: "New Arrivals", id: "new", path: "/shop?new=true" },
    { name: "Sale", id: "sale", path: "/shop?sale=true" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-stone-100">
      <div className="flex justify-between items-center px-8 h-20 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-12">
          <Link 
            to="/"
            className="text-2xl font-black tracking-tighter text-stone-900 uppercase hover:opacity-80 transition-opacity"
          >
            KINETIC
          </Link>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => cn(
                  "text-xs font-black tracking-widest uppercase transition-all pb-1 border-b-2 hover:text-primary",
                  isActive
                    ? "text-primary border-primary"
                    : "text-stone-500 border-transparent hover:border-stone-200"
                )}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-stone-600 hover:text-primary transition-colors">
            <Search size={22} />
          </button>
          
          {isAuthenticated && user ? (
            <Link 
              to="/profile"
              className="text-stone-600 hover:text-primary transition-colors flex items-center gap-3 group"
            >
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase tracking-widest text-primary leading-none mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Member Access</span>
                <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">
                  {user.fullName ? user.fullName.split(' ')[0] : 'Member'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <User size={20} />
              </div>
            </Link>
          ) : (
            <Link 
              to="/login"
              className="text-stone-600 hover:text-primary transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <LogIn size={20} />
              </div>
              <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-primary font-bold">Sign In</span>
            </Link>
          )}

          <Link 
            to="/cart"
            className="text-stone-600 hover:text-primary transition-colors relative group"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-stone-50 transition-colors">
              <ShoppingBag size={22} />
            </div>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-on-primary text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden text-stone-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
