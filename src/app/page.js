'use client';
import React, { useState } from 'react';
import productsData from './products.json';

// Verbatim list matching your local C:\...\public\images\business\ directory exactly
const SPONSOR_LOGOS = [
  "AET logo.png",
  "Boss Automotive.PNG",
  "Dealwala Logo.jpg",
  "Desi Kothi Sydney.jpg",
  "Dishas Kitchen.png",
  "Emblem_of_India_svg3.gif",
  "Honest-Logo NEW.jpg",
  "Indian Matrimonial.png",
  "istockphoto-1320299224-612x612.jpg",
  "LaserCutCaravanLoveHeartbeatWallDecor.jpg",
  "Logo SBI Australia.jpg",
  "Prudential Edu - NEW.jpg",
  "Radhe.jpg",
  "RDFM LOGO.jpg",
  "Savaa properties-NEW.jpg",
  "Select Insure - NEW.jpg",
  "SVCC LOGO_2023.png",
  "Sydney.jpg",
  "Travelcrafters-Logo-NEW.jpg",
  "vector-decorative-kangaroo-patterned-design-44625880.jpeg"
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [customText, setCustomText] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Shipping');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
    
    const message = `⚡️ *NEW ORDER FOR LASERCUTAI* ⚡️\n\n*Product:* ${selectedProduct.name}\n*Price:* $${selectedProduct.price.toFixed(2)}\n\n*Customer Details:*\n- Name: ${name}\n- Email: ${email}\n- Phone: ${whatsapp}\n\n*Customization Specs:*\n- Fulfillment: ${deliveryMethod}\n- Text/Specs: "${customText}"\n\n--- \n👉 Let's head to the garage and build this!`;
    window.open(`https://wa.me/61412345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextImage = (productId, totalImages) => {
    setActiveImageIndexes(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
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

      {/* Dynamic Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {productsData.map((product) => {
            const currentImgIdx = activeImageIndexes[product.id] || 0;
            const imagePath = product.images.length > 0 
              ? `/images/${product.category}/${product.images[currentImgIdx]}`
              : `/images/placeholder.jpg`;

            return (
              <div key={product.id} className="bg-white border border-neutral-200/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between group">
                <div>
                  <div className="overflow-hidden rounded-2xl mb-4 bg-neutral-100 aspect-[4/3] relative">
                    <img 
                      src={imagePath} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-2 bg-neutral-50" 
                    />
                    {product.images.length > 1 && (
                      <button 
                        onClick={() => nextImage(product.id, product.images.length)}
                        className="absolute bottom-3 right-3 bg-neutral-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-sm shadow-sm hover:bg-indigo-600 transition"
                      >
                        Next Photo ({currentImgIdx + 1}/{product.images.length}) ➔
                      </button>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{product.name}</h3>
                    <span className="text-indigo-600 font-black text-xl bg-indigo-50 px-3 py-1 rounded-xl">from ${product.price}</span>
                  </div>
                  
                  <p className="text-slate-600 text-base font-medium leading-relaxed mb-6">{product.short_desc}</p>
                </div>

                <button 
                  onClick={() => { setSelectedProduct(product); setOrderSubmitted(false); }}
                  className="w-full bg-neutral-900 hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm tracking-wider transition-all uppercase shadow-md"
                >
                  Customize This Style
                </button>
              </div>
            );
          })}
        </div>
      </main>

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
                <img 
                  src={`/images/business/${logo}`} 
                  alt="Partnered Brand Work" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Popup Form */}
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
                
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">How to get it</label>
                  <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} className="w-full px-3 py-2 border border-neutral-200 rounded-xl text-xs bg-white font-semibold">
                    <option value="Shipping">Express Mail (+$10.00)</option>
                    <option value="Weekend Pickup">Collect at Box Hill Garage (Weekend Free)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">What text, name, or design specs do you want?</label>
                  <textarea 
                    rows="2"
                    placeholder="Describe what you want cut or written here." 
                    required 
                    value={customText} 
                    onChange={(e) => setCustomText(e.target.value)} 
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-xs font-medium"
                  />
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

      <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 text-center text-xs font-medium border-t border-neutral-900">
        <p className="text-white font-bold text-sm mb-1">LaserCutAI Garage Studio</p>
        <p className="mb-4">89 Brahman Road, Box Hill NSW 2765, Australia</p>
      </footer>
    </div>
  );
}