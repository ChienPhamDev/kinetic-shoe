import { useState } from "react";
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Ruler } from "lucide-react";
import { Product } from "../types";
import { cn } from "../lib/utils";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [activeThumb, setActiveThumb] = useState(0);

  const displayThumbs = product.thumbnails.length > 0 ? product.thumbnails : [product.image];
  
  const nextImage = () => setActiveThumb((prev) => (prev + 1) % displayThumbs.length);
  const prevImage = () => setActiveThumb((prev) => (prev - 1 + displayThumbs.length) % displayThumbs.length);

  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex gap-4">
            {/* Vertical Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-16 flex-shrink-0">
              {displayThumbs.map((thumb, i) => (
                <button 
                  key={i}
                  onMouseEnter={() => setActiveThumb(i)}
                  className={cn(
                    "aspect-square w-full bg-stone-50 rounded overflow-hidden transition-opacity",
                    activeThumb === i ? "opacity-100" : "opacity-40 hover:opacity-100"
                  )}
                >
                  <img src={thumb} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="flex-grow relative aspect-square bg-[#f6f6f6] rounded-sm overflow-hidden group">
              <img 
                src={displayThumbs[activeThumb]} 
                className="w-full h-full object-contain p-4" 
                alt={product.name} 
                referrerPolicy="no-referrer"
              />
              
              {/* Navigation Arrows */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                <button 
                  onClick={prevImage}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 py-2">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-medium text-black mb-1">
                {product.name}
              </h1>
              <p className="text-stone-500 font-medium mb-4">{product.category}</p>
              <div className="text-lg font-medium text-black">
                {product.price.toLocaleString()}₫
              </div>
            </header>

            {/* Colorway Selection (Mockup) */}
            <div className="mb-10">
              <div className="flex gap-2">
                <div className="w-16 h-16 border-2 border-black rounded p-1 cursor-pointer">
                  <img src={displayThumbs[0]} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </div>
                {displayThumbs[1] && (
                  <div className="w-16 h-16 border border-stone-200 rounded p-1 cursor-pointer hover:border-stone-400 transition-colors">
                    <img src={displayThumbs[1]} className="w-full h-full object-cover opacity-80" alt="" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className="w-16 h-16 border border-stone-200 rounded flex flex-col items-center justify-center cursor-pointer hover:border-stone-400 transition-colors bg-stone-50">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-500 via-yellow-500 to-blue-500 mb-1" />
                  <span className="text-[8px] font-bold uppercase text-center leading-tight">Design<br/>Your Own</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-black">Select Size</h3>
                <button className="flex items-center gap-1 text-sm font-medium text-black hover:text-stone-500 transition-colors">
                  <Ruler size={16} />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-12 border rounded flex items-center justify-center text-sm font-medium transition-all",
                      selectedSize === size 
                        ? "border-black bg-white" 
                        : "border-stone-200 hover:border-black"
                    )}
                  >
                    EU {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button 
                onClick={() => selectedSize && onAddToCart(product, selectedSize)}
                className="w-full h-16 bg-black text-white rounded-full font-bold text-base hover:bg-stone-800 transition-colors"
              >
                Add to Bag
              </button>
              <button className="w-full h-16 border border-stone-200 rounded-full font-bold text-base hover:border-black transition-colors flex items-center justify-center gap-2">
                Favourite
                <Heart size={20} />
              </button>
            </div>

            {/* Product Description */}
            <div className="mt-12 pt-12 border-t border-stone-100">
              <p className="text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
