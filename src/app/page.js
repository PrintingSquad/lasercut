'use client';
import React, { useState } from 'react';
import productsData from './products.json';

const SPONSOR_LOGOS = [
  "AET logo.png", "Boss Automotive.PNG", "Dealwala Logo.jpg", "Desi Kothi Sydney.jpg",
  "Dishas Kitchen.png", "Emblem_of_India_svg3.gif", "Honest-Logo NEW.jpg", "Indian Matrimonial.png",
  "istockphoto-1320299224-612x612.jpg", "LaserCutCaravanLoveHeartbeatWallDecor.jpg", "Logo SBI Australia.jpg",
  "Prudential Edu - NEW.jpg", "Radhe.jpg", "RDFM LOGO.jpg", "Savaa properties-NEW.jpg",
  "Select Insure - NEW.jpg", "SVCC LOGO_2023.png", "Sydney.jpg", "Travelcrafters-Logo-NEW.jpg",
  "vector-decorative-kangaroo-patterned-design-44625880.jpeg"
];

const SHAAN_GALLERY = [
  { file: "1.jpg", caption: "Fueling big ideas & charting out business blueprints" },
  { file: "2.jpg", caption: "Dreaming big, looking to the future" },
  { file: "3.jpg", caption: "Always looking at angles from a unique perspective" },
  { file: "4.jpg", caption: "Inspired by nature, precision, and local wildlife" },
  { file: "5.jpg", caption: "Family team building & exploring innovative designs" },
  { file: "6.jpg", caption: "Scouting out community inspiration across the globe" },
  { file: "7.jpg", caption: "Right at home under the Sydney lights, ready to build" }
];

const MATERIALS = [
  { name: "Clear Acrylic (3mm / 4.5mm)", type: "Premium Solid", class: "bg-gradient-to-br from-white/80 to-neutral-200/40 border-neutral-300 text-neutral-700 shadow-inner", desc: "Crystal clear, glass-like impact resistant sheets" },
  { name: "Mirror Gold / Silver", type: "High Reflective", class: "bg-gradient-to-tr from-amber-300 via-zinc-100 to-amber-500 border-amber-400 text-amber-950", desc: "Luxurious mirror effect for signs and visual depth" },
  { name: "Matte Gold / Silver", type: "Metallic", class: "bg-gradient-to-r from-yellow-600 via-zinc-400 to-yellow-700 border-neutral-400 text-neutral-100", desc: "Muted, upscale satin metal finish without glare" },
  { name: "Glossy White / Black", type: "Classic High Shine", class: "bg-gradient-to-r from-white via-neutral-400 to-neutral-900 border-neutral-300 text-neutral-900", desc: "Ultra-slick polished look, great for layered designs" },
  { name: "Matte White / Black", type: "Satin Solid", class: "bg-gradient-to-r from-neutral-100 to-neutral-800 border-neutral-400 text-white", desc: "Smooth anti-reflective matte texture for high readability" },
  { name: "MDF Wood (White / Brown)", type: "Natural Timber", class: "bg-gradient-to-br from-amber-100 via-amber-200 to-amber-700 border-amber-800 text-amber-950", desc: "Eco-friendly natural wood textures and custom finished surfaces" }
];

const SIZE_TIERS = [
  { id: "small", name: "Small Size (Under 10cm)", desc: "Perfect for basic keychains, labels, tags, and small badges." },
  { id: "medium", name: "Medium Size (10cm up to 15cm)", desc: "Flat rate upgrade for prominent desk items and identifiers." },
  { id: "large_20cm", name: "Large Size (15cm to 20cm)", desc: "+$10 scale increase for wall markers and intermediate signs." },
  { id: "large_25cm", name: "Extra Large Size (20cm to 25cm)", desc: "+$20 scale increase for retail displays and plaques." },
  { id: "industrial", name: "Industrial Scale / Custom Display (Over 25cm)", desc: "Subject to full manual machine threshold review (Quoted via WhatsApp)." }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shaanIndex, setShaanIndex] = useState(0);
  
  // Customization Configuration States
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [customText, setCustomText] = useState('');
  const [chosenColor, setChosenColor] = useState('Clear Acrylic (3mm / 4.5mm)');
  const [selectedSizeId, setSelectedSizeId] = useState('small');
  const [isTwoColor, setIsTwoColor] = useState(false); 
  const [deliveryMethod, setDeliveryMethod] = useState('Shipping');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const calculateSingleUnitOriginalPrice = () => {
    if (!selectedProduct) return 0;
    if (selectedSizeId === 'industrial') return selectedProduct.price;

    let originalPrice = selectedProduct.price;

    if (selectedSizeId === 'small') {
      originalPrice = selectedProduct.price;
    } else if (selectedSizeId === 'medium') {
      originalPrice = 20.00;
    } else if (selectedSizeId === 'large_20cm') {
      originalPrice = 30.00;
    } else if (selectedSizeId === 'large_25cm') {
      originalPrice = 40.00;
    }

    return originalPrice;
  };

  const calculateFinalUnitPrice = () => {
    const originalPrice = calculateSingleUnitOriginalPrice();
    if (isTwoColor) {
      return originalPrice + (originalPrice / 2);
    }
    return originalPrice;
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    const unitPrice = calculateFinalUnitPrice();
    
    let basePrice = unitPrice;
    if (selectedProduct.isComboEligible && selectedSizeId === 'small' && !isTwoColor) {
      if (quantity === 1) basePrice = 8;
      else if (quantity === 2) basePrice = 15 / 2;
      else basePrice = (20 + (quantity - 3) * 6.50) / quantity;
    }
    
    return basePrice * quantity;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
    const unitPrice = calculateFinalUnitPrice();
    const finalTotal = calculateTotal();
    const variantViewed = selectedProduct.images[currentImageIndex];
    const currentSizeName = SIZE_TIERS.find(s => s.id === selectedSizeId)?.name || 'Custom';

    const message = `⚡️ *NEW ORDER FOR LASERCUTAI* ⚡️\n\n*Product:* ${selectedProduct.name}\n*Layout Image Ref:* Folder: [${selectedProduct.imageFolder}] / File: [${variantViewed}]\n*Quantity:* ${quantity}x\n\n*🔧 SPECS:*\n- *Size Selection:* ${currentSizeName}\n- *Material Style:* ${chosenColor}\n- *Layering Profile:* ${isTwoColor ? 'Two Colors (Double Layer Layered Acrylic)' : 'Single Color Blocked'}\n- *Calculated Rate Per Unit:* $${unitPrice.toFixed(2)}\n- *Total Computed Price:* $${finalTotal.toFixed(2)}\n\n*👤 CUSTOMER DETAILS:*\n- Name: ${name}\n- WhatsApp: ${whatsapp}\n\n*📝 CUSTOMIZATION REQUEST:*\n"${customText}"\n\n*Delivery Layout:* ${deliveryMethod}`;
    
    window.open(`https://wa.me/61412345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextImage = () => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
  };

  const prevImage = () => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  };

  const filteredProducts = activeCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 font-sans antialiased overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}} />

      <div className="bg-indigo-600 text-white text-center py-2 px-4 text-xs font-bold uppercase tracking-wider">
        ❤️ Every order supports a 10-year-old's business dream & local community donations!
      </div>

      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100 px-6 py-4 max-w-7xl mx-auto flex justify-between items-center rounded-b-2xl shadow-sm">
        <span className="text-2xl font-black tracking-tighter text-neutral-900">LASERCUT<span className="text-indigo-600">AI</span></span>
        <div className="text-xs font-bold text-neutral-600 font-mono">📍 Box Hill Garage Studio</div>
      </nav>

      <header className="max-w-4xl mx-auto text-center pt-16 pb-6 px-6 space-y-4">
        <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          Driven by Passion • Built in our Garage
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 leading-tight">
          Industrial Scale Execution.<br />
          <span className="text-indigo-600">Tailored Precision Engineering.</span>
        </h1>
      </header>

      {/* CATEGORY TABS */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center gap-2 flex-wrap">
        {[
          { id: 'all', label: '✨ All Collections' },
          { id: 'gift-ideas', label: '🎁 Gift Ideas, Earrings & Lamps' },
          { id: 'pets', label: '🐾 Pets & Animals' },
          { id: 'plates', label: '🚪 Name & Number Plates' },
          { id: 'business', label: '💼 Custom Branding Signs' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border ${activeCategory === tab.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => {
            const folderName = product.imageFolder || product.category;
            const featuredImage = `/images/${folderName}/1.jpg`;

            return (
              <div key={product.id} className="bg-white border border-neutral-200/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between group relative">
                {product.isComboEligible && (
                  <span className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-xl shadow-md uppercase">
                    🎉 Mix Combo Available
                  </span>
                )}
                
                <div>
                  <div className="overflow-hidden rounded-2xl mb-4 bg-neutral-50 aspect-[4/3] relative group-hover:opacity-95 transition flex items-center justify-center border border-neutral-100">
                    <img src={featuredImage} alt={product.name} className="w-full h-full object-contain p-2" />
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-2 gap-2">
                    <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight leading-tight">{product.name}</h3>
                    <span className="text-indigo-600 font-black text-lg bg-indigo-50 px-3 py-1 rounded-xl shrink-0">
                      from ${product.price}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">{product.short_desc}</p>
                </div>

                <button 
                  onClick={() => { 
                    setSelectedProduct(product); 
                    setQuantity(1); 
                    setOrderSubmitted(false); 
                    setCurrentImageIndex(0);
                    setSelectedSizeId('small');
                    setIsTwoColor(false);
                    setChosenColor('Clear Acrylic (3mm / 4.5mm)');
                  }}
                  className="w-full bg-neutral-900 hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm tracking-wider transition-all uppercase shadow-md"
                >
                  Configure & Order
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* MATERIAL STUDIO SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white border border-neutral-200/80 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-neutral-900">Premium Material Studio</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATERIALS.map((mat, i) => (
              <div key={i} className="border border-neutral-200 p-4 rounded-2xl flex items-center gap-4 bg-neutral-50 shadow-2xs">
                <div className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center font-black text-[9px] uppercase shadow-inner tracking-tighter text-center px-1 shrink-0 leading-tight ${mat.class}`}>
                  {mat.name.split(" (")[0]}
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">{mat.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{mat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDER CARD */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest font-bold">Behind The Laser Beam</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">Meet Shaan,<br/>Our 10-Year-Old Chief Creator</h2>
            <p className="text-neutral-400 text-sm font-medium leading-relaxed">
              LaserCutAI isn't your typical corporate factory. Shaan started this journey right out of our garage in Box Hill, blending imagination with industrial tech to fund community donations and build custom works of art.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700/50 relative group shadow-2xl">
              <img src={`/images/shaan/${SHAAN_GALLERY[shaanIndex].file}`} alt="Shaan" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <p className="text-white text-xs font-bold font-mono text-center bg-indigo-600/90 py-2 px-3 rounded-xl">{SHAAN_GALLERY[shaanIndex].caption}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {SHAAN_GALLERY.map((_, idx) => (
                <button key={idx} onClick={() => setShaanIndex(idx)} className={`h-2 rounded-full transition-all ${shaanIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-neutral-700'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE ROLLING BRAND MARQUEE */}
      <section className="bg-white py-10 border-t border-b border-neutral-200/50 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf9f6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf9f6] to-transparent z-10 pointer-events-none" />
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee gap-6 flex items-center">
            {SPONSOR_LOGOS.concat(SPONSOR_LOGOS).map((logo, idx) => (
              <div key={idx} className="h-16 w-32 bg-neutral-50 border border-neutral-150 p-2.5 rounded-xl flex items-center justify-center shrink-0">
                <img src={`/images/business/${logo}`} alt="Brand Logo" className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 AMAZON-STYLE FULL SCREEN SPLIT STUDIO OVERLAY */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md flex justify-end z-50 transition-all duration-300">
          <div className="w-full lg:w-[85vw] xl:w-[75vw] h-full bg-neutral-50 shadow-2xl flex flex-col relative overflow-hidden animate-in slide-in-from-right duration-200">
            
            {/* STICKY RETAIL HEADER WITH CLEAR CLOSE ACTION */}
            <div className="sticky top-0 z-50 bg-white border-b border-neutral-200 px-4 py-3 sm:px-6 flex justify-between items-center shadow-xs">
              <div>
                <h3 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight leading-tight">{selectedProduct.name}</h3>
                <p className="text-[11px] text-neutral-500 font-medium hidden sm:block mt-0.5">{selectedProduct.short_desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right font-mono hidden sm:block">
                  <span className="text-xs text-neutral-400 block font-sans font-bold uppercase tracking-wider">Total Est.</span>
                  <span className="text-xl font-black text-indigo-600">${calculateTotal().toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-2 rounded-xl text-xs sm:text-sm font-black tracking-wide border border-neutral-200 transition flex items-center gap-1.5 active:scale-95"
                >
                  <span>✕</span> Close
                </button>
              </div>
            </div>

            {/* SPLIT RETAIL BOARD AREA */}
            <div className="flex-1 overflow-y-auto grid lg:grid-cols-12 gap-0">
              
              {/* LEFT COLUMN: THE AMAZON-STYLE HERO GALLERY DISPLAY */}
              <div className="lg:col-span-6 bg-white border-b lg:border-b-0 lg:border-r border-neutral-200 p-4 sm:p-6 flex flex-col justify-start lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] overflow-y-auto">
                
                {/* LARGE SCREEN LIGHTBOX CANVAS */}
                <div className="relative overflow-hidden rounded-2xl bg-neutral-50 aspect-[4/3] flex items-center justify-center border border-neutral-100 shadow-inner group">
                  <img 
                    src={`/images/${selectedProduct.imageFolder}/${selectedProduct.images[currentImageIndex]}`} 
                    alt={`Layout View`}
                    className="w-full h-full object-contain p-4 mix-blend-multiply transition-all duration-300"
                  />
                  
                  {/* FLOATING ACTION CANVAS SWITCHES */}
                  <button type="button" onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 w-10 h-10 rounded-full font-black text-sm flex items-center justify-center shadow-md border border-neutral-200 active:scale-90 transition">←</button>
                  <button type="button" onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900 w-10 h-10 rounded-full font-black text-sm flex items-center justify-center shadow-md border border-neutral-200 active:scale-90 transition">→</button>
                  
                  <div className="absolute bottom-3 right-3 bg-neutral-900/80 backdrop-blur-xs text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-md tracking-wider">
                    VARIATION: {currentImageIndex + 1} / 12
                  </div>
                </div>

                {/* HORIZONTAL SWIPEABLE THUMBNAIL TRACK */}
                <div className="mt-4">
                  <p className="text-[11px] font-black text-neutral-400 uppercase tracking-wider mb-2">Available Design Variations (Select to View)</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin snap-x">
                    {selectedProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 bg-neutral-50 p-1 flex-shrink-0 snap-start transition-all overflow-hidden flex items-center justify-center ${currentImageIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-sm' : 'border-neutral-200 hover:border-neutral-400'}`}
                      >
                        <img src={`/images/${selectedProduct.imageFolder}/${img}`} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 hidden lg:block border-t border-neutral-100 pt-4">
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/60 text-amber-900 text-xs font-medium space-y-1">
                    <span className="font-bold block">💡 Live Fabrication Preview</span>
                    Our automated pricing system instantly re-calculates quotes based on surface length tiers and layout layering selected on the right panel.
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: CONFIGURATION ENGINE CONTROLS */}
              <div className="lg:col-span-6 p-4 sm:p-6 space-y-6 bg-neutral-50">
                {!orderSubmitted ? (
                  <form onSubmit={handleCheckout} className="space-y-5">
                    
                    {/* MOBILE LIVE TOTAL READOUT BANNER */}
                    <div className="sm:hidden bg-white border border-neutral-200 p-3 rounded-2xl flex items-center justify-between shadow-xs">
                      <span className="text-xs font-bold text-neutral-500">Live Config Price:</span>
                      <span className="text-xl font-black text-indigo-600 font-mono">${calculateTotal().toFixed(2)}</span>
                    </div>

                    {/* DYNAMIC SIZE SELECTOR ENGINE */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-black text-neutral-800 uppercase tracking-wider">Step 1: Choose Dimensions & Size</label>
                      <div className="space-y-2">
                        {SIZE_TIERS.map((tier) => (
                          <label 
                            key={tier.id} 
                            className={`flex items-start gap-3 p-3 rounded-xl border text-left cursor-pointer transition-all ${selectedSizeId === tier.id ? 'border-indigo-600 bg-white shadow-xs ring-1 ring-indigo-50' : 'border-neutral-200 bg-white hover:bg-neutral-50'}`}
                          >
                            <input 
                              type="radio" 
                              name="sizeTierStudio" 
                              value={tier.id} 
                              checked={selectedSizeId === tier.id} 
                              onChange={() => setSelectedSizeId(tier.id)}
                              className="mt-0.5 text-indigo-600 focus:ring-indigo-500 w-4 h-4" 
                            />
                            <div>
                              <p className="text-xs font-bold text-neutral-900">{tier.name}</p>
                              <p className="text-[10px] text-neutral-500 leading-tight mt-0.5">{tier.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* TWO-COLOR / DOUBLE LAYER CONFIGURATION PANEL */}
                    <div className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3 shadow-xs">
                      <label className="block text-[11px] font-black text-neutral-800 uppercase tracking-wider">Step 2: Acrylic Layer Configuration</label>
                      <div className="grid grid-cols-1 gap-2">
                        <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${!isTwoColor ? 'border-indigo-600 bg-indigo-50/20 text-neutral-900' : 'border-neutral-200 bg-white text-neutral-700'}`}>
                          <input 
                            type="radio" 
                            name="layerTypeStudio" 
                            checked={!isTwoColor} 
                            onChange={() => setIsTwoColor(false)} 
                            className="text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                          />
                          <div className="text-xs">
                            <span className="font-bold block">Single Solid Base Color</span>
                            <span className="text-[10px] text-neutral-400 block font-medium">Standard baseline fabrication</span>
                          </div>
                        </label>
                        
                        <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isTwoColor ? 'border-indigo-600 bg-indigo-50/20 text-neutral-900 shadow-xs' : 'border-neutral-200 bg-white text-neutral-700'}`}>
                          <input 
                            type="radio" 
                            name="layerTypeStudio" 
                            checked={isTwoColor} 
                            onChange={() => setIsTwoColor(true)} 
                            className="text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                          />
                          <div className="text-xs">
                            <span className="font-black text-indigo-600 block">Two Color Layered Accent (+50%)</span>
                            <span className="text-[10px] text-neutral-500 block font-medium">Premium dual overlay for high-contrast visual pop</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* CORE OPTIONS AND TEXTURES */}
                    <div className="space-y-4 bg-white border border-neutral-200 p-4 rounded-2xl shadow-xs">
                      <div>
                        <label className="block text-[11px] font-black text-neutral-800 uppercase tracking-wider mb-1.5">Step 3: Select Material Texture</label>
                        <select value={chosenColor} onChange={(e) => setChosenColor(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-xs bg-white font-bold text-neutral-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                          {MATERIALS.map((mat, idx) => (
                            <option key={idx} value={mat.name}>{mat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                        <label className="text-[11px] font-black text-neutral-800 uppercase tracking-wider">Order Quantity</label>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 bg-neutral-100 hover:bg-neutral-200 active:scale-95 border border-neutral-200 rounded-xl font-black text-sm flex items-center justify-center transition shadow-2xs">-</button>
                          <span className="font-mono font-black text-base text-neutral-900 w-6 text-center">{quantity}</span>
                          <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 bg-neutral-100 hover:bg-neutral-200 active:scale-95 border border-neutral-200 rounded-xl font-black text-sm flex items-center justify-center transition shadow-2xs">+</button>
                        </div>
                      </div>
                    </div>

                    {/* CUSTOM DETAILS FORM SUMMARY */}
                    <div className="space-y-3 bg-white border border-neutral-200 p-4 rounded-2xl shadow-xs">
                      <label className="block text-[11px] font-black text-neutral-800 uppercase tracking-wider">Step 4: Customization Engraving Details</label>
                      <div>
                        <textarea 
                          rows="2" 
                          placeholder="Include text engravings, layout dimensions, or precise color options required." 
                          required 
                          value={customText} 
                          onChange={(e) => setCustomText(e.target.value)} 
                          className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <input type="text" placeholder="Your Full Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500" />
                        <input type="tel" placeholder="WhatsApp Phone" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500" />
                      </div>
                    </div>

                    {/* FINAL SUM CHECKOUT ACTION PANEL */}
                    <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 p-4 rounded-2xl text-white space-y-3 shadow-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-neutral-400 font-bold block uppercase tracking-wide">Unit rate: ${calculateFinalUnitPrice().toFixed(2)}</span>
                          <span className="text-xs text-neutral-300 font-bold">Total Estimated Order Price:</span>
                        </div>
                        <span className="text-2xl font-black text-indigo-400 font-mono">${calculateTotal().toFixed(2)}</span>
                      </div>
                      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-black text-xs tracking-widest uppercase shadow-md transition active:scale-[0.99]">
                        Submit Order Specs to WhatsApp →
                      </button>
                    </div>

                  </form>
                ) : (
                  <div className="text-center py-16 bg-white border border-neutral-200 rounded-3xl space-y-4 shadow-xs">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto font-black text-3xl">✓</div>
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Specs Sent Successfully!</h3>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">We have opened WhatsApp on your device. Send the auto-generated message to submit your layout configurations to Shaan.</p>
                    <button type="button" onClick={() => setOrderSubmitted(false)} className="text-indigo-600 text-xs font-bold underline">Modify setup configs</button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}