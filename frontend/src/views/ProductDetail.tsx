import { useState, useEffect } from "react";
import { Star, Heart, ChevronLeft, ChevronRight, Ruler, Loader2 } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../constants";
import { cn } from "../lib/utils";

interface ProductDetailProps {
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    // Simulate data fetching
    const foundProduct = PRODUCTS.find(p => p.id === id);
    setProduct(foundProduct || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Design Not Found</h2>
        <p className="text-stone-500 mb-8 max-w-md text-center font-medium">The requested blueprint or silhouette is currently unavailable in our ecosystem.</p>
        <Link 
          to="/shop"
          className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const displayThumbs = product.thumbnails.length > 0 ? product.thumbnails : [product.image];
  
  const nextImage = () => setActiveThumb((prev) => (prev + 1) % displayThumbs.length);
  const prevImage = () => setActiveThumb((prev) => (prev - 1 + displayThumbs.length) % displayThumbs.length);

  return (
    <main className="pt-32 pb-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <nav className="mb-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex gap-6">
            <div className="hidden md:flex flex-col gap-2 w-20 flex-shrink-0">
              {displayThumbs.map((thumb, i) => (
                <button 
                  key={i}
                  onMouseEnter={() => setActiveThumb(i)}
                  className={cn(
                    "aspect-square w-full bg-stone-50 rounded-lg overflow-hidden transition-all p-2 border-2",
                    activeThumb === i ? "border-primary opacity-100" : "border-transparent opacity-40 hover:opacity-100"
                  )}
                >
                  <img src={thumb} className="w-full h-full object-contain" alt="" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            <div className="flex-grow relative aspect-square bg-stone-50 rounded-2xl overflow-hidden group shadow-inner">
              <motion.img 
                key={activeThumb}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={displayThumbs[activeThumb]} 
                className="w-full h-full object-contain p-12" 
                alt={product.name} 
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-8 right-8 flex gap-3">
                <button 
                  onClick={prevImage}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-50 transition-all active:scale-90"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-50 transition-all active:scale-90"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <header className="mb-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-primary text-primary" />
                  <span className="text-xs font-black">{product.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter uppercase mb-2 leading-none">
                {product.name}
              </h1>
              <div className="text-2xl font-black text-stone-900 mt-4">
                ${product.price.toFixed(2)}
              </div>
            </header>

            <div className="mb-12">
              <p className="text-stone-500 font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-stone-900">Select Size</h3>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-black transition-colors">
                  <Ruler size={14} />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-14 rounded-xl flex items-center justify-center text-sm font-black transition-all border-2",
                      selectedSize === size 
                        ? "border-primary bg-primary text-on-primary shadow-lg shadow-primary/20" 
                        : "border-stone-100 bg-white hover:border-stone-300 text-stone-500 hover:text-stone-900"
                    )}
                  >
                    US {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 mt-auto">
              <button 
                onClick={() => selectedSize && onAddToCart(product, selectedSize)}
                disabled={!selectedSize}
                className="w-full h-18 bg-stone-950 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all disabled:opacity-50 disabled:hover:bg-stone-950 shadow-2xl shadow-stone-950/20 active:scale-[0.98]"
              >
                Assemble to Bag
              </button>
              <button className="w-full h-18 border-2 border-stone-100 rounded-full font-black uppercase tracking-widest text-xs hover:border-stone-300 transition-all flex items-center justify-center gap-3 group">
                Add to Blueprint
                <Heart size={18} className="group-hover:fill-primary group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-stone-100 pt-12">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Heritage</h4>
                <p className="text-xs font-bold text-stone-900">Engineered in Portland, OR</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Logistics</h4>
                <p className="text-xs font-bold text-stone-900">Expedited Priority Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
