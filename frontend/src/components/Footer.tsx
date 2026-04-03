export default function Footer() {
  return (
    <footer className="bg-stone-50 w-full pt-20 pb-10 border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 max-w-7xl mx-auto">
        <div className="md:col-span-1">
          <span className="text-xl font-black text-stone-900 mb-6 block uppercase">KINETIC</span>
          <p className="text-sm tracking-wide text-stone-500">
            Pushing the boundaries of performance through art and engineering since 2024.
          </p>
        </div>
        <div>
          <h6 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-on-surface">Experience</h6>
          <ul className="space-y-4">
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Men's Running</a></li>
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Women's Training</a></li>
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Limited Drops</a></li>
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-on-surface">Company</h6>
          <ul className="space-y-4">
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Customer Service</a></li>
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
            <li><a className="text-sm tracking-wide text-stone-500 hover:text-primary transition-colors" href="#">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-on-surface">Newsletter</h6>
          <div className="relative">
            <input 
              className="w-full bg-transparent border-b-2 border-outline-variant/30 py-3 text-xs font-bold tracking-widest focus:outline-none focus:border-primary transition-colors" 
              placeholder="EMAIL ADDRESS" 
              type="email"
            />
            <button className="absolute right-0 bottom-3 font-black text-primary">
              →
            </button>
          </div>
        </div>
      </div>
      <div className="mt-20 px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-outline-variant/10">
        <span className="text-xs tracking-widest text-stone-500 uppercase">© 2024 KINETIC GALLERY. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6 text-stone-500">
          <span className="hover:text-primary cursor-pointer uppercase text-[10px] font-bold tracking-widest">Instagram</span>
          <span className="hover:text-primary cursor-pointer uppercase text-[10px] font-bold tracking-widest">Twitter</span>
          <span className="hover:text-primary cursor-pointer uppercase text-[10px] font-bold tracking-widest">TikTok</span>
        </div>
      </div>
    </footer>
  );
}
