import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { 
  fetchProducts, 
  fetchBrands, 
  fetchColors, 
  fetchSizes 
} from "../lib/api";
import { 
  Product, 
  Brand, 
  Category,
  Color, 
  Size, 
  PaginatedResponse 
} from "../types";


export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Product>["meta"] | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    brandId: "",
    colorId: "",
    sizeId: "",
    minPrice: 0,
    maxPrice: 1000,
    page: 1,
    limit: 9
  });

  useEffect(() => {
    const loadLookupData = async () => {
      try {
        const [brandsData, colorsData, sizesData] = await Promise.all([
          fetchBrands(),
          fetchColors(),
          fetchSizes()
        ]);
        setBrands(brandsData);
        setColors(colorsData);
        setSizes(sizesData);
      } catch (error) {
        console.error("Error loading filters:", error);
      }
    };
    loadLookupData();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(filters);
        // Map backend entities to UI-friendly format
        const mappedData = response.data.map(p => ({
          ...p,
          category: (p.category as Category)?.name || "Uncategorized",
          // Calculate min price from variants
          price: p.variants?.length > 0 
            ? Math.min(...p.variants.map(v => Number(v.price))) 
            : 0,
          // Find primary image or use first
          image: p.images?.find(img => img.is_primary)?.url || p.images?.[0]?.url || "",
          rating: 4.5, // Placeholder for now
          reviewsCount: 120 // Placeholder for now
        }));
        setProducts(mappedData);

        setMeta(response.meta);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBrand = (id: string) => {
    setFilters(prev => ({ ...prev, brandId: prev.brandId === id ? "" : id, page: 1 }));
  };

  const toggleSize = (id: string) => {
    setFilters(prev => ({ ...prev, sizeId: prev.sizeId === id ? "" : id, page: 1 }));
  };

  const selectColor = (id: string) => {
    setFilters(prev => ({ ...prev, colorId: prev.colorId === id ? "" : id, page: 1 }));
  };

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
                {brands.map((brand) => (
                  <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" 
                      checked={filters.brandId === brand.id}
                      onChange={() => toggleBrand(brand.id)}
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-widest text-xs font-bold text-on-surface-variant">Size (Metric)</h4>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button 
                    key={size.id} 
                    onClick={() => toggleSize(size.id)}
                    className={`h-10 text-xs font-bold transition-colors ${filters.sizeId === size.id ? "bg-on-surface text-on-primary" : "bg-surface-container-high hover:bg-surface-container-highest"}`}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-widest text-xs font-bold text-on-surface-variant">Color Way</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button 
                    key={color.id} 
                    onClick={() => selectColor(color.id)}
                    className={`w-8 h-8 rounded-full ring-offset-2 ${filters.colorId === color.id ? "ring-2 ring-primary" : ""} ${color.hex_code.toLowerCase() === "#ffffff" ? "border border-stone-200" : ""}`}
                    style={{ backgroundColor: color.hex_code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-widest text-xs font-bold text-on-surface-variant">Price Range</h4>
              <input 
                type="range" 
                min="0"
                max="2000"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value), page: 1 }))}
                className="w-full h-1 bg-surface-container-highest appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                <span>$0</span>
                <span>${filters.maxPrice}</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-surface-container-low" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Link key={product.id} to={`/product/${product.slug}`} className="block">
                      <ProductCard product={product} />
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-secondary uppercase tracking-[0.3em] font-bold">No silhouettes found matching your criteria</p>
                  </div>
                )}
              </div>
              
              {meta && meta.lastPage > 1 && (
                <div className="mt-24 flex items-center justify-center gap-4">
                  <button 
                    disabled={filters.page === 1}
                    onClick={() => handlePageChange(filters.page - 1)}
                    className="w-12 h-12 flex items-center justify-center border-2 border-on-surface disabled:opacity-30 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(meta.lastPage)].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-12 h-12 font-bold text-sm transition-colors ${filters.page === pageNum ? "bg-on-surface text-on-primary" : "hover:bg-surface-container-highest"}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button 
                    disabled={filters.page === meta.lastPage}
                    onClick={() => handlePageChange(filters.page + 1)}
                    className="w-12 h-12 flex items-center justify-center border-2 border-on-surface disabled:opacity-30 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
