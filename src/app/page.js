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

const SIZES = [
  { name: "Standard Base Size (Included)", extraCost: 0, desc: "Default size listed on the product catalog card." },
  { name: "Medium Scale Upgrade (+ $25.00)", extraCost: 25, desc: "Up to A4 size/300mm equivalent — ideal for desk signs & small plates." },
  { name: "Large Event Upgrade (+ $55.00)", extraCost: 55, desc: "Up to A2 size/600mm equivalent — prominent wall address signage." },
  { name: "Industrial Maximum Single Sheet Upgrade (+ $140.00)", extraCost: 140, desc: "Massive 900mm x 1300mm layout — full machine threshold capacity." },
  { name: "Infinite Multi-Panel Joined Custom Sign (Quote Required)", extraCost: 0, desc: "Linking multiple 900x1300mm sheets together seamlessly for colossal structural displays." }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shaanIndex, setShaanIndex] = useState(0);
  
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [customText, setCustomText] = useState('');
  const [chosenColor, setChosenColor] = useState('Clear Acrylic (3mm / 4.5mm)');
  const [chosenSize, setChosenSize] = useState(SIZES[0]);
  const [deliveryMethod, setDeliveryMethod] = useState('Shipping');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    let basePrice = selectedProduct.price;
    if (selectedProduct.isComboEligible) {
      if (quantity === 1) basePrice = 8;
      else if (quantity === 2) basePrice = 15 / 2;
      else basePrice = (20 + (quantity - 3) * 6.50) / quantity;
    }
    return (basePrice + chosenSize.extraCost) * quantity;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
    const finalTotal = calculateTotal();
    const isBundleApplied = selectedProduct.isComboEligible && quantity >= 2;

    const message = `⚡️ *NEW ORDER FOR LASERCUTAI* ⚡️\n\n*Product:* ${selectedProduct.name}\n*Quantity:* ${quantity}x\n*Size Selection:* ${chosenSize.name}\n*Material:* ${chosenColor}\n*Total Computed Price:* $${finalTotal.toFixed(2)}${isBundleApplied ? ' (Bundle Combo Applied!)' : ''}\n\n*Customer Details:*\n- Name: ${name}\n- WhatsApp: ${whatsapp}\n\n*Customization Request:*\n"${customText}"\n\n*Delivery:* ${deliveryMethod}`;
    
    window.open(`https://wa.me/61412345678?text=${encodeURIComponent(message)}`, '_blank');
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
            const featuredImage = product.images && product.images.length > 0 
              ? `/images/${folderName}/${product.images[0]}`
              : null;

            return (
              <div key={product.id} className="bg-white border border-neutral-200/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between group relative">
                {product.isComboEligible && (
                  <span className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-xl shadow-md uppercase">
                    🎉 Mix Combo Offer Available
                  </span>
                )}
                
                <div>
                  <div className="overflow-hidden rounded-2xl mb-4 bg-neutral-100 aspect-[4/3] relative group-hover:opacity-95 transition flex items-center justify-center">
                    {featuredImage ? (
                      <img src={featuredImage} alt={product.name} className="w-full h-full object-contain p-2 bg-neutral-50" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 font-mono text-center text-xs px-4">
                        📸 [ Place image inside: public/images/{folderName}/{product.images?.[0] || 'file.jpg'} ]
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-2 gap-2">
                    <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight leading-tight">{product.name}</h3>
                    <span className="text-indigo-600 font-black text-lg bg-indigo-50 px-3 py-1 rounded-xl shrink-0">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">{product.short_desc}</p>
                  
                  {product.isComboEligible && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-xs text-amber-900 font-bold flex justify-between items-center">
                      <span>🏷️ Multi-Buy Pricing:</span>
                      <span className="font-mono">Mix & match: 1 for $8 | 2 for $15 | 3 for $20!</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => { 
                    setSelectedProduct(product); 
                    setQuantity(1); 
                    setOrderSubmitted(false); 
                    setChosenColor('Clear Acrylic (3mm / 4.5mm)');
                    setChosenSize(SIZES[0]);
                  }}
                  className="w-full bg-neutral-900 hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm tracking-wider transition-all uppercase shadow-md"
                >
                  Configure Size & Finish
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
            <h2 className="text-3xl font-black tracking-tight text-neutral-900">Premium Material & Scale Studio</h2>
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

      {/* Modal Popup Customizer */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 relative shadow-2xl border border-neutral-100 my-8">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 text-2xl font-bold p-2">&times;</button>
            
            {!orderSubmitted ? (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-neutral-900">Configure Custom Order</h3>
                  <p className="text-xs font-bold text-indigo-600 mt-0.5">{selectedProduct.name}</p>
                </div>
                
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider">How many items?</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 bg-white border border-neutral-300 rounded-lg font-black text-sm flex items-center justify-center shadow-xs">-</button>
                    <span className="font-mono font-black text-base text-neutral-900">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 bg-white border border-neutral-300 rounded-lg font-black text-sm flex items-center justify-center shadow-xs">+</button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Select Dimension Scale</label>
                  <select 
                    value={chosenSize.name} 
                    onChange={(e) => {
                      const match = SIZES.find(s => s.name === e.target.value);
                      if(match) setChosenSize(match);
                    }} 
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl text-xs bg-white font-semibold"
                  >
                    {SIZES.map((size, idx) => (
                      <option key={idx} value={size.name}>{size.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Select Material Finish</label>
                  <select value={chosenColor} onChange={(e) => setChosenColor(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-xl text-xs bg-white font-semibold">
                    {MATERIALS.map((mat, idx) => (
                      <option key={idx} value={mat.name}>{mat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Design Specs / Text Copy</label>
                  <textarea rows="2" placeholder="Describe layout details or name engravings here." required value={customText} onChange={(e) => setCustomText(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-xs font-medium" />
                </div>

                <div className="bg-neutral-50 rounded-xl p-3 space-y-2 border border-neutral-100">
                  <input type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-xs" />
                  <input type="tel" placeholder="WhatsApp Number" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-xs" />
                </div>

                <div className="border-t border-neutral-100 pt-3 flex justify-between items-center">
                  <span className="text-xs text-neutral-500 font-bold block">Total Amount:</span>
                  <span className="text-2xl font-black text-indigo-600 font-mono">${calculateTotal().toFixed(2)}</span>
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase shadow-md">
                  Send Specs to WhatsApp
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto font-black text-3xl">✓</div>
                <h3 className="text-2xl font-black text-neutral-900">Specs Forwarded!</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}