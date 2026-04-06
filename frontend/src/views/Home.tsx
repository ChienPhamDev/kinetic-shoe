import { motion } from "motion/react";
import { ArrowRight, Zap, Shield, TrendingUp, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { PRODUCTS } from "../constants";
import ProductCard from "../components/ProductCard";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const newArrivals = PRODUCTS.filter(p => p.isNew);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-20"
          ></motion.div>
        </div>

        <div className="max-w-[1600px] mx-auto px-8 w-full relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-primary text-sm font-black uppercase tracking-[0.4em] mb-6 block drop-shadow-sm">Spring / Summer '24</span>
              <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter uppercase mb-10 selection:bg-primary selection:text-white">
                Engineered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-white">Kinetic</span> <br />
                Force.
              </h1>
              
              <div className="flex flex-wrap gap-6 items-center">
                <Link
                  to="/shop"
                  className="bg-primary text-on-primary px-10 py-6 rounded-sm font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-white hover:text-black transition-all group active:scale-95 shadow-2xl shadow-primary/20"
                >
                  Explore Global Collection
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <button className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Play size={18} className="fill-current ml-1" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Watch Technology Release</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute right-8 bottom-12 hidden xl:block">
          <div className="flex gap-12">
            {[
              { label: "Energy Return", value: "96%" },
              { label: "Weight Reduction", value: "-140g" },
              { label: "Support Points", value: "3.2k" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-right"
              >
                <p className="text-primary text-3xl font-black italic">{stat.value}</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Drop Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8">
          <header className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Elite Performance</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-stone-900">
                Selected <br />Elite Items
              </h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="w-16 h-16 border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-16 h-16 border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </header>

          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12"
          >
            {newArrivals.map((product) => (
              <div 
                key={product.id} 
                className="min-w-[400px] snap-start"
              >
                <Link to={`/product/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/shop"
              className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-stone-400 hover:text-primary transition-colors border-b-2 border-stone-100 hover:border-primary pb-2"
            >
              View Full Ecosystem
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Pillar Section */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: <Zap size={32} />, title: "Hyper-Responsive", desc: "Our proprietary Kinetic Cloud foam provides maximum energy return with every stride." },
              { icon: <Shield size={32} />, title: "Anatomic Lockdown", desc: "Internal skeletal structure ensures complete stability during directional shifts." },
              { icon: <TrendingUp size={32} />, title: "Elite Precision", desc: "Data-driven design optimized across 10,000 gait analysis data points." }
            ].map((feature, i) => (
              <div key={i} className="group cursor-default">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:-translate-y-2">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-stone-900">{feature.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-40 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="text-[30rem] font-black uppercase tracking-tighter">Kinetic</span>
        </div>
        <div className="max-w-[1200px] mx-auto px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
            Elevate Your <br />Performance Tier.
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-16 text-sm font-medium leading-relaxed">
            Join the KINETIC Elite Collective for priority access to technical drops, early development testing, and personalized athletic insights.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/register"
              className="bg-primary text-on-primary px-12 py-6 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
            >
              Join the Collective
            </Link>
            <Link 
              to="/login"
              className="border-2 border-white/20 text-white px-12 py-6 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black hover:border-white transition-all"
            >
              Member Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
