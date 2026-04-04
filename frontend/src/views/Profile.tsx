import { useState } from "react";
import { User, MapPin, Package, Edit2, LogOut, ChevronRight, CheckCircle2 } from "lucide-react";
import { MOCK_ORDERS } from "../constants";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

type ProfileTab = "personal" | "addresses" | "orders";

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");

  if (!user) return null;

  return (
    <main className="pt-20 min-h-screen bg-white">
      <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside className="w-full md:w-80 border-r border-stone-100 p-8 md:sticky md:top-20 h-fit">
          <div className="flex flex-col items-center md:items-start mb-12">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary p-1">
                <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded-lg text-primary text-2xl font-black uppercase">
                  {user.fullName.charAt(0)}
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-sm font-black uppercase tracking-widest text-on-surface mb-1">Member Profile</h2>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">ELITE MEMBER</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("personal")}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all",
                activeTab === "personal" ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "text-stone-500 hover:bg-stone-50"
              )}
            >
              <User size={18} />
              Personal Info
            </button>
            <button 
              onClick={() => setActiveTab("addresses")}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all",
                activeTab === "addresses" ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "text-stone-500 hover:bg-stone-50"
              )}
            >
              <MapPin size={18} />
              Addresses
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all",
                activeTab === "orders" ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "text-stone-500 hover:bg-stone-50"
              )}
            >
              <Package size={18} />
              Order History
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-grow p-8 md:p-16">
          <header className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Member Dashboard</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              {activeTab === "personal" ? "Settings" : activeTab === "addresses" ? "Locations" : "History"}
            </h1>
          </header>

          <div className="max-w-4xl">
            {activeTab === "personal" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <section>
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-1">Personal Information</h3>
                      <p className="text-sm text-stone-500">Update your identity and contact details.</p>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Edit All</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-100 border border-stone-100 rounded-xl overflow-hidden">
                    <div className="bg-white p-8 group cursor-pointer hover:bg-stone-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Legal Name</span>
                        <Edit2 size={14} className="text-stone-300 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xl font-medium">{user.fullName}</p>
                    </div>
                    <div className="bg-white p-8 group cursor-pointer hover:bg-stone-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Email Address</span>
                        <Edit2 size={14} className="text-stone-300 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xl font-medium">{user.email}</p>
                    </div>
                    <div className="bg-white p-8 group cursor-pointer hover:bg-stone-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Phone Number</span>
                        <Edit2 size={14} className="text-stone-300 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xl font-medium">{user.phone || 'Not provided'}</p>
                    </div>
                    <div className="bg-white p-8 group cursor-pointer hover:bg-stone-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Member Since</span>
                      </div>
                      <p className="text-xl font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <section className="lg:col-span-2 bg-on-surface rounded-2xl p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Account Security</h3>
                      <p className="text-white/60 text-sm mb-10 max-w-md">Maintain the integrity of your elite status by regularly updating your credentials and monitoring active sessions.</p>
                      
                      <div className="space-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-white/10">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Password</p>
                            <p className="text-xs text-white/40">Last changed recently</p>
                          </div>
                          <button className="bg-primary px-6 py-2 rounded font-bold text-[10px] uppercase tracking-widest">Change</button>
                        </div>
                        <div className="flex justify-between items-center py-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Two-Factor Auth</p>
                            <p className="text-xs text-primary font-bold uppercase tracking-widest">Enabled</p>
                          </div>
                          <CheckCircle2 size={20} className="text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mb-24 blur-3xl"></div>
                  </section>

                  <section className="bg-stone-50 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-stone-200 rounded-xl flex items-center justify-center mb-6">
                      <LogOut size={24} className="text-stone-500" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2">Global Sign Out</h3>
                    <p className="text-xs text-stone-500 mb-8">Instantly log out from all devices across the Kinetic ecosystem.</p>
                    <button 
                      onClick={() => logout()}
                      className="w-full border-2 border-stone-200 py-4 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-on-surface hover:text-white hover:border-on-surface transition-all"
                    >
                      Deauthorize All
                    </button>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="bg-stone-50 rounded-2xl p-8 border border-stone-100 group cursor-pointer hover:border-primary transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Package size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-black text-lg uppercase tracking-tight">{order.id}</h4>
                          <p className="text-xs text-stone-500 font-bold uppercase tracking-widest">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Status</p>
                          <span className="text-xs font-black uppercase tracking-widest text-primary">{order.status}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Total</p>
                          <span className="text-lg font-black">${order.total.toFixed(2)}</span>
                        </div>
                        <ChevronRight size={20} className="text-stone-300 group-hover:text-primary transition-colors" />
                      </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex-shrink-0 w-20 h-24 bg-white rounded-lg overflow-hidden border border-stone-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "addresses" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-primary bg-stone-50 p-8 rounded-2xl relative">
                  <div className="absolute top-6 right-6 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Default</div>
                  <h4 className="font-black uppercase tracking-tight mb-4">Home Studio</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {user.fullName}<br />
                    123 Kinetic Way, Studio 4B<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                  <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Edit Address</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
