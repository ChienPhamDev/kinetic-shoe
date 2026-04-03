import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PRODUCTS } from "../constants";
import { Product } from "../types";

interface HomeProps {
  onNavigate: (view: string, data?: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const newArrivals = PRODUCTS.filter(p => p.isNew);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB2PdVA1V3781zeOSMZWoMJBJ0I_U46ob6GLktr7KBs9VPbqYSz7yY3eN7-zB5r2Uy1CzV3835ExNwX4lNGE0RWzFuFsrDmvr34jsfD3gfZWEkjSpdF74p7iAMow2TxifN5ZWvZpAPu_ggkxZ3jY5AY0BhsJYrp3T1ukaq_VMKYWCjB0Gc9ZtiLccxVi9TIhDZbOz5jhOnm3lmYPprZSflQHmQvueJsQfzrdBe0h6HB1aO-DzTmV-PleeMSxGYJ1pmWNLsUAWdz8c"
            alt="Hero"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4 block">Spring/Summer 2024</span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8 text-on-surface uppercase">
              Elevate Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Kinetic</span> <br /> Potential
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate("list")}
                className="px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold tracking-wide rounded-lg hover:scale-105 transition-transform"
              >
                Shop New Arrivals
              </button>
              <button className="px-10 py-5 border-2 border-outline-variant/20 text-on-surface font-bold tracking-wide rounded-lg hover:bg-surface-container-low transition-colors">
                View Lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">The Collection</h2>
              <p className="text-secondary max-w-md">Precision engineered for the modern athlete and the style-conscious individual.</p>
            </div>
            <button 
              onClick={() => onNavigate("list")}
              className="hidden md:flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-sm group"
            >
              <span>View All Categories</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl cursor-pointer">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgXe4sS8-cfSV2DH8E_hMBzYAqLT2YFUc0ndMZwYEOLhUsjDPMnCOZ9mTTStISajF-cwdIaiDgHlFjSLA1LJ9ErsNFf8xMRnSUa3sJaOKKdoY6-VD7UXvsvdCNHInresRAuyBZZI9BPii9d5c1hJ6rW92Fsj8J83Sg5GLcBesiBlyFan0fi47eFg_Gh11zFq6IhjiAoo5yl6wSUG9XlG8JN2LaHl-08pZ8qkyiJLTJIrztZnrySno-FeuA776D-poaV6CONSRADCY"
                alt="Running"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Running</h3>
                <p className="text-white/70 mb-4 tracking-widest uppercase text-xs">Peak Performance Gear</p>
                <button className="text-white border-b-2 border-primary pb-1 font-bold text-sm uppercase tracking-widest">Explore</button>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="h-1/2 group relative overflow-hidden rounded-xl cursor-pointer">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSslibebdeUaeK-DV1lFN_zjJPNjljhAmzdJNHL0NYQuFaD3gKAMQf4rTtVKarmpmh-3Tp-S__l8mwDX31pdrtHA-_OoZm4UX-CJx90r-bo8kFnOHsYXGido2iRnSDRDoWK-tsnhDM6Jtn5SsbgoQ4b3jJnLS-WhOK3veCb-qaPmhgXCZ-TMVn5dJCO-Z0SkTLEiaxdHkyP3xNSANrlWqbBu-ZAewX2wH1DUsQGZkBoQGrnXUIZn-AhhFhR-44Z1jyEEZd_yJzTGk"
                  alt="Sneakers"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Sneakers</h3>
                </div>
              </div>
              <div className="h-1/2 group relative overflow-hidden rounded-xl cursor-pointer">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDskqwalVmM6QIohZsqSOhc-TdgHucVoYod9laQz-LWr1yNjSREmjA5Ly6N8tUIIAoD5dc-WFKPxoKgtZSoVHy2Svr153lUFbPUjd6Pbp0H5wWvxT0-FtE_iHCtHJkw8JSfkQEgAeGk-D2ZSMzONF4JGgrse5cooZ4jMz7xtHk_vpNwOAqodwV1J6i6diwTplAgbzrReJmSIZiPNGNV3wyBTh5HXM8SMB_RMkgl3NaRY3OkpHbnZjeMr3smtDOgtRlZq8q4zqtX7xk"
                  alt="Casual"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Casual</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="container mx-auto px-8 mb-12 flex justify-between items-center">
          <h2 className="text-4xl font-black tracking-tighter uppercase">New Arrivals</h2>
          <div className="flex space-x-2">
            <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="flex gap-8 px-8 overflow-x-auto no-scrollbar snap-x">
          {newArrivals.map((product) => (
            <div key={product.id} className="min-w-[320px] md:min-w-[400px] snap-start">
              <div 
                onClick={() => onNavigate("detail", product)}
                className="bg-surface-container-lowest rounded-lg overflow-hidden mb-4 group cursor-pointer shadow-sm"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">New</div>
                </div>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-lg font-bold tracking-tight uppercase">{product.name}</h4>
                  <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-secondary text-sm mb-2">Available in {product.colors.length} Colors</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="relative bg-on-background rounded-2xl overflow-hidden h-[400px] flex items-center">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-60">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU19RFqK09mMFNZrYNNVa6OjdqJx31YoaLRgmRKhNBO4xn9a0Z9bAuWPHlGKcsCRy6G7HyMNDFQTTFNwsYRy9Ju-GAMK1fLcJVQnCev_FnFJlgT2BOjIpzqPO_hvEYxqP7xVNDK7B3mgRd1B7002syNom43iGaaPuCv9IhXrDrfDfzcw-XmzeaqKsa4614VihyJ16yLfAfQgsERsAcLA9M1G74NsyRCzEzOSoH3MeSqHJoHpw8IJGQn5v3PXp81LFKkyXoFBowVV0"
                alt="Promo"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10 px-12 md:px-20 max-w-2xl">
              <div className="bg-primary-container text-on-primary-container px-4 py-1 inline-block rounded-full text-xs font-black tracking-widest uppercase mb-6">Limited Offer</div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6 uppercase">
                30% Off All <br /> Running Shoes
              </h2>
              <p className="text-white/60 mb-8 max-w-md font-medium">Equip your journey with our elite engineering at a curated price. End of season exhibition.</p>
              <button className="bg-white text-on-background px-10 py-4 font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-transform">
                Claim Discount
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-16">The Kinetic Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "James Miller", role: "MARATHON ATHLETE", text: "The Kinetic Flow V1 redefined my morning run. It's not just a shoe; it's a piece of engineering that disappears on your feet." },
              { name: "Sarah Chen", role: "FASHION DESIGNER", text: "I've never seen such a perfect balance between technical performance and gallery-worthy aesthetics. Simply incredible." },
              { name: "Marcus Thorne", role: "TECH LEAD", text: "The durability for daily city walking is unmatched. Five months in and they still feel like day one. Highly recommended." }
            ].map((review, i) => (
              <div key={i} className="p-8 border border-outline-variant/10 rounded-xl relative">
                <Quote className="text-primary size-12 absolute -top-6 left-1/2 -translate-x-1/2 bg-surface px-2" />
                <p className="text-lg leading-relaxed text-secondary mb-8 italic">"{review.text}"</p>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high mb-3" />
                  <p className="font-bold uppercase tracking-widest text-xs">{review.name}</p>
                  <p className="text-[10px] text-secondary">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
