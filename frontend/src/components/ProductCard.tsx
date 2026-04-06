import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <div className="aspect-[4/5] bg-surface-container-low mb-6 relative overflow-hidden flex items-center justify-center p-8">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
          referrerPolicy="no-referrer"
        />
        {product.isLimited && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Limited Drop</span>
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-4 right-4">
            <span className="bg-on-surface text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">New Arrival</span>
          </div>
        )}
        <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
          <ShoppingCart size={20} className="text-on-surface" />
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-headline text-lg font-bold text-on-surface tracking-tight mb-1 uppercase">{product.name}</h3>
          <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-2">{product.category}</p>
          <div className="flex items-center gap-1 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                className={cn(i >= Math.floor(product.rating) && "text-stone-300")}
              />
            ))}
            <span className="text-[10px] text-secondary ml-1 font-bold">({product.reviewsCount})</span>
          </div>
        </div>
        <span className="font-black text-lg">${product.price.toFixed(2)}</span>
      </div>
    </motion.div>
  );
}
