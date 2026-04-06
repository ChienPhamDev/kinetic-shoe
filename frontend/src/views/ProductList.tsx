import { ChevronDown } from "lucide-react";
import { PRODUCTS } from "../constants";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function ProductList() {
  return (
    <main className="pt-32 pb-20 px-8 max-w-[1600px] mx-auto">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-sm uppercase tracking-[0.2em] text-primary mb-4 block font-bold">Spring/Summer '24 Collection</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">Essential<br />Performance</h1>
          </div>
          <div className="flex flex-col items-end gap-6">
            <p className="text-secondary max-w-xs text-right text-sm leading-relaxed">Curated high-performance silhouettes designed for the modern athlete. Where engineering meets art.</p>
            <div className="flex items-center gap-4">
              <span className="text-sm uppercase tracking-widest text-on-surface-variant font-bold">Sort By</span>
              <div className="relative group">
                <button className="flex items-center gap-2 border-b-2 border-on-surface pb-1 font-bold text-sm">
                  Newest
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-12">
            <div className="space-y-4">
              <h4 className="uppercase tracking-widest text-xs font-bold text-on-surface-variant">Brand</h4>
              <div className="space-y-3">
                {["Kinetic Lab", "AeroStride", "Vortex Series"].map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" defaultChecked={brand === "Kinetic Lab"} />
                    <span className="text-sm group-hover:text-primary transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-widest text-xs font-bold text-on-surface-variant">Size (US)</h4>
              <div className="grid grid-cols-4 gap-2">
                {["7", "7.5", "8", "8.5", "9", "10", "11", "12"].map((size) => (
                  <button key={size} className={`h-10 text-xs font-bold transition-colors ${size === "7" ? "bg-on-surface text-on-primary" : "bg-surface-container-high hover:bg-surface-container-highest"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-widest text-xs font-bold text-on-surface-variant">Color Way</h4>
              <div className="flex flex-wrap gap-3">
                {["#1c1b1b", "#ffffff", "#ff6b00", "#0062a1", "#8e7164"].map((color, i) => (
                  <button 
                    key={color} 
                    className={`w-8 h-8 rounded-full ring-offset-2 ${i === 0 ? "ring-2 ring-primary" : ""} ${color === "#ffffff" ? "border border-stone-200" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-widest text-xs font-bold text-on-surface-variant">Price Range</h4>
              <input type="range" className="w-full h-1 bg-surface-container-highest appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                <span>$120</span>
                <span>$450</span>
              </div>
            </div>
            <button className="w-full kinetic-gradient py-4 text-on-primary font-bold text-xs uppercase tracking-widest">Apply Filters</button>
          </div>
        </aside>

        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
            {PRODUCTS.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="block">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
          <div className="mt-24 text-center">
            <button className="px-12 py-5 border-2 border-on-surface font-bold text-sm uppercase tracking-[0.3em] hover:bg-on-surface hover:text-on-primary transition-all duration-300 shadow-xl shadow-stone-100">
              Load More Designs
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
