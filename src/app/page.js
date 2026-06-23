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
  { name: "Mirror Gold", type: "Metallic", class: "bg-gradient-to-tr from-amber-300 via-yellow-100 to-amber-500 border-amber-400 text-amber-950", desc: "High-reflection luxury finish for signs & weddings" },
  { name: "Mirror Silver", type: "Metallic", class: "bg-gradient-to-tr from-zinc-300 via-neutral-100 to-zinc-400 border-zinc-300 text-zinc-900", desc: "Crisp, modern reflective finish for premium corporate looks" },
  { name: "Matte Jet Black", type: "Classic Solid", class: "bg-neutral-900 border-neutral-950 text-neutral-100", desc: "Sophisticated, non-reflective deep black acrylic" },
  { name: "Glossy Arctic White", type: "Classic Solid", class: "bg-white border-neutral-200 text-neutral-900", desc: "Clean high-shine bright white, perfect for multi-layering" },
  { name: "Galaxy Glitter Blue", type: "Specialty", class: "bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-700 border-indigo-400 text-white animate-pulse", desc: "Embedded dazzling glitter flakes for statement keychains & earrings" },
  { name: "Rose Gold Glitter", type: "Specialty", class: "bg-gradient-to-br from-pink-400 via-rose-200 to-pink-500 border-pink-300 text-rose-950", desc: "Sparkling elegant finish catching beautiful light reflections" }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lightbox, setLightbox] = useState({ isOpen: false, product: null, index: 0 });
  const [shaanIndex, setShaanIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [customText, setCustomText] = useState('');
  const [chosenColor, setChosenColor] = useState('Mirror Gold');
  const [deliveryMethod, setDeliveryMethod] = useState('Shipping');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
    const message = `⚡️ *NEW ORDER FOR LASERCUTAI* ⚡️\n\n*Product:* ${selectedProduct.name}\n*Material/Color:* ${chosenColor}\n*Price:* $${selectedProduct.price.toFixed(2)}\n\n*Customer:*\n- Name: ${name}\n- Phone: ${whatsapp}\n\n*Specs:* "${customText}"\n- Fulfillment: ${deliveryMethod}`;
    window.open(`https://wa.me/61412345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 font-sans antialiased">
      <div className="bg-indigo-600 text-white text-center py-2 px-4 text-xs font-bold uppercase tracking-wider">
        ❤️ Every order supports a 10-year-old's business dream & local community donations!
      </div>

      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100 px-6 py-4 max-w-7xl mx-auto flex justify-between items-center rounded-b-2xl shadow-sm">
        <span className="text-2xl font-black tracking-tighter text-neutral-900">LASERCUT<span className="text-indigo-600">AI</span></span>
        <div className="text-xs font-bold text-neutral-600 font-mono">📍 Box Hill Garage Studio</div>
      </nav>

      <header className="max-w-4xl mx-auto text-center pt-16 pb-12 px-6 space-y-6">
        <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          Driven by Passion • Built in our Garage
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 leading-tight">
          Started by a passionate 10-year-old.<br />
          <span className="text-indigo-600">Backed by industrial power.</span>
        </h1>
      </header>

      {/* Main Dynamic Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {productsData.map((product) => {
            const featuredImage = product.images.length > 0 
              ? `/images/${product.category}/${product.images[0]}`
              : `/images/placeholder.jpg`;

            return (
              <div key={product.id} className="bg-white border border-neutral-200/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between group">
                <div>
                  <div 
                    onClick={() => product.images.length > 0 && setLightbox({ isOpen: true, product, index: 0 })}
                    className="overflow-hidden rounded-2xl mb-4 bg-neutral-100 aspect-[4/3] relative cursor-zoom-in group-hover:opacity-95 transition"
                  >
                    <img src={featuredImage} alt={product.name} className="w-full h-full object-contain p-2 bg-neutral-50" />
                    {product.images.length > 1 && (
                      <span className="absolute bottom-3 right-3 bg-neutral-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-sm shadow-sm">
                        📸 View Gallery ({product.images.length})
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{product.name}</h3>
                    <span className="text-indigo-600 font-black text-xl bg-indigo-50 px-3 py-1 rounded-xl">from ${product.price}</span>
                  </div>
                  <p className="text-slate-600 text-base font-medium leading-relaxed mb-6">{product.short_desc}</p>
                </div>

                <button 
                  onClick={() => { setSelectedProduct(product); setOrderSubmitted(false); setChosenColor('Mirror Gold'); }}
                  className="w-full bg-neutral-900 hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm tracking-wider transition-all uppercase shadow-md"
                >
                  Customize This Style
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* ✨ MATERIAL COLOR SWATCH CHART SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white border border-neutral-200/80 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-neutral-900">Premium Material Studio</h2>
            <p className="text-slate-600 text-sm font-medium">
              We stock the finest 3mm shatterproof acrylics. Select any finish below to apply to your custom sign, keychain, or custom cutout.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATERIALS.map((mat, i) => (
              <div key={i} className="border border-neutral-200 p-4 rounded-2xl flex items-center gap-4 bg-neutral-50 shadow-2xs">
                <div className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center font-black text-[10px] uppercase shadow-inner tracking-tighter text-center px-1 shrink-0 ${mat.class}`}>
                  {mat.name}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-neutral-900 text-sm">{mat.name}</h4>
                    <span className="bg-neutral-200/80 text-neutral-700 font-mono font-bold text-[9px] px-1.5 py-0.5 rounded-md uppercase tracking-wider">{mat.type}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{mat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDER SECTION */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest font-bold">Behind The Laser Beam</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">Meet Shaan,<br/>Our 10-Year-Old Chief Creator</h2>
            <p className="text-neutral-400 text-sm font-medium leading-relaxed">
              LaserCutAI isn't your typical corporate factory. Shaan started this journey right out of our garage in Box Hill, blending imagination with industrial tech to fund community donations and build custom works of art.
            </p>
            <div className="pt-2 flex gap-2">
              <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-xl">💡 Inventor</span>
              <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-xl">🛠️ Maker</span>
              <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-xl">🇦🇺 Box Hill Local</span>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700/50 relative group shadow-2xl">
              <img 
                src={`/images/shaan/${SHAAN_GALLERY[shaanIndex].file}`} 
                alt="Shaan's journey" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <p className="text-white text-xs font-bold font-mono text-center bg-indigo-600/90 py-2 px-3 rounded-xl backdrop-blur-xs">
                  {SHAAN_GALLERY[shaanIndex].caption}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {SHAAN_GALLERY.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setShaanIndex(idx)}
                  className={`h-2 rounded-full transition-all ${shaanIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-neutral-700'}`}
                  aria-label={`Go to slice ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <div className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50 p-4">
          <button onClick={() => setLightbox({ isOpen: false, product: null, index: 0 })} className="absolute top-6 right-6 text-white text-4xl font-bold p-2 hover:text-indigo-400 transition">&times;</button>
          <div className="max-w-4xl w-full max-h-[70vh] flex items-center justify-center p-4">
            <img src={`/images/${lightbox.product.category}/${lightbox.product.images[lightbox.index]}`} className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-2xl bg-white/5 p-2" alt="Display" />
          </div>
          <div className="flex gap-2 mt-6 overflow-x-auto max-w-full px-4 py-2">
            {lightbox.product.images.map((img, i) => (
              <button key={i} onClick={() => setLightbox(prev => ({ ...prev, index: i }))} className={`w-16 h-16 rounded-xl overflow-hidden border-2 bg-white flex-shrink-0 transition ${lightbox.index === i ? 'border-indigo-500 scale-105' : 'border-transparent opacity-60'}`}>
                <img src={`/images/${lightbox.product.category}/${img}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brand Partners Showcase Grid */}
      <section className="bg-neutral-100 py-16 px-6 border-t border-neutral-200/60">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900">Trusted By Brands & Organizations</h2>
            <p className="text-slate-600 font-medium text-sm mt-2">Premium custom signs, corporate plaques, and displays built directly in our Box Hill studio.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {SPONSOR_LOGOS.map((logo, index) => (
              <div key={index} className="bg-white border border-neutral-200 p-3 rounded-2xl shadow-sm aspect-square flex items-center justify-center group hover:scale-105 transition-transform overflow-hidden">
                <img src={`/images/business/${logo}`} alt="Partnered Brand" className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Popup Form (Now featuring Color Selectors!) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 relative shadow-2xl border border-neutral-100">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 text-2xl font-bold p-2">&times;</button>
            {!orderSubmitted ? (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-neutral-900">Configure Your Piece</h3>
                  <p className="text-xs font-bold text-indigo-600 mt-0.5">{selectedProduct.name} — From ${selectedProduct.price}</p>
                </div>
                
                {/* 🎨 DYNAMIC STEP: SELECT COLOR INTEGRATED IN ORDER */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Select Material Finish</label>
                  <select value={chosenColor} onChange={(e) => setChosenColor(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-xl text-xs bg-white font-semibold">
                    {MATERIALS.map((mat, idx) => (
                      <option key={idx} value={mat.name}>{mat.name} ({mat.type})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Fulfillment</label>
                  <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-xl text-xs bg-white font-semibold">
                    <option value="Shipping">Express Mail (+$10.00)</option>
                    <option value="Weekend Pickup">Collect at Box Hill Garage (Weekend Free)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Design Specs / Custom Text</label>
                  <textarea rows="2" placeholder="Describe what you want cut or written here." required value={customText} onChange={(e) => setCustomText(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-xs font-medium" />
                </div>
                <div className="bg-neutral-50 rounded-xl p-3 space-y-2 border border-neutral-100">
                  <input type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-xs" />
                  <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-xs" />
                  <input type="tel" placeholder="WhatsApp Mobile Number" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-xs" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase shadow-md">
                  Send Specs & Open WhatsApp Pay
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto font-black text-3xl">✓</div>
                <h3 className="text-2xl font-black text-neutral-900">Specs Received!</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">Opening WhatsApp securely to finish payment confirmation...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}