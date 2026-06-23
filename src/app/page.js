'use client';
import React, { useState } from 'react';

const PRODUCTS = [
  {
    id: "prod_lamps",
    name: "Custom 3D Acrylic Night Lamps",
    short_desc: "Beautifully engraved edge-lit acrylic designs. Includes standard LED base or custom matching acrylic base.",
    price: 49.00,
    images: [
      "H2dcfa86e331143f7a6c1141a1c9f52d12.jpg",
      "H2fac60c36d844ebdb7efa7109576a51et.jpg",
      "H3049ebc6bb1c4c3a919139e59fa9d4ff0.jpg",
      "H26944f4fc5e647c7a1e1faa9e792ce22e_2.jpg", // Added _2
      "Ha9027d1de10848549e35a94689ef5652v.jpg",
      "Hadddc0603a4843d1b34b7897bb4c8da2m.jpg",
      "Hb1996cdcb25b4b9a9892260cc925579bB_2.jpg", // Added _2
      "Hb49302fee8be42969936ebc8c6172d41B_2.jpg", // Added _2
      "Hbbd1ef4e06b048aabc22ab97c3da375dt.jpg",
      "S6ba68865aa4e4ff98f25674b74d240144.jpg"
    ]
  },
  {
    id: "prod_house",
    name: "Modern House Number Signs",
    short_desc: "Big, clean street numbers cut from premium acrylic layered on timber or floating mount standoffs.",
    price: 79.00,
    images: [
      "Custom-Property-Sign-Street-Number-Silver.jpg",
      "f027c8_25ee1874b19147e48e89b9f5df58c7af_mv2_600x_crop_center.jpg",
      "71fMcOldKTL.jpg"
    ]
  },
  {
    id: "prod_names",
    name: "Custom 3D Script Name Signs",
    short_desc: "Stunning mirror gold and colored backing script plates for bedrooms, backdrops, and special events.",
    price: 45.00,
    images: [
      "image_25cca625-f83b-4f16-a9dc-7bab38956d07.jpg",
      "image_cc2d866e-e909-4bcf-b9e7-012935d5b5dd.jpg",
      "il_fullxfull.5127962598_qrck.jpg"
    ]
  },
  {
    id: "prod_business",
    name: "Premium Business Logo Plaques",
    short_desc: "High-end multi-layered acrylic and wood trophies, desk stands, and branding blocks for store counters.",
    price: 120.00,
    images: [
      "Untitled-4.jpg"
    ]
  },
  {
    id: "prod_family",
    name: "Custom Family & Pet Nameplates",
    short_desc: "Laser-engraved round entry signs, door plaques, or custom-shaped animal silhouettes with any custom text.",
    price: 35.00,
    images: [
      "8a0b3309-7fba-407e-8900-87d7197de0b1.jpeg",
      "2_9ca3e9be-e710-4214-9455-454033a37142.jpg",
      "acrylic-name-plate-for-home.jpg"
    ]
  }
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
      
      {/* Dynamic Announcement */}
      <div className="bg-indigo-600 text-white text-center py-2 px-4 text-xs font-bold uppercase tracking-wider">
        ❤️ Every order supports a 10-year-old's business dream & local community donations!
      </div>

      {/* Simplified Sticky Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100 px-6 py-4 max-w-7xl mx-auto flex justify-between items-center rounded-b-2xl shadow-sm">
        <span className="text-2xl font-black tracking-tighter text-neutral-900">LASERCUT<span className="text-indigo-600">AI</span></span>
        <div className="text-xs font-bold text-neutral-600 font-mono">📍 Box Hill Garage Studio</div>
      </nav>

      {/* The Core Story (Big & Emotional) */}
      <header className="max-w-4xl mx-auto text-center pt-16 pb-12 px-6 space-y-6">
        <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          Driven by Passion • Built in our Garage
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 leading-tight">
          Started by a passionate 10-year-old.<br />
          <span className="text-indigo-600">Backed by industrial power.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
          From selling door-to-door and making his first $20, to launching a real garage laser studio. We design clean custom acrylic pieces, and a portion of everything earned goes straight back into community donations. 
        </p>
      </header>

      {/* Shopify Style Ultra Clean Product Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => {
            const currentImgIdx = activeImageIndexes[product.id] || 0;
            return (
              <div key={product.id} className="bg-white border border-neutral-200/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between group">
                <div>
                  <div className="overflow-hidden rounded-2xl mb-4 bg-neutral-100 aspect-[4/3] relative">
                    <img 
                      src={`/images/${product.images[currentImgIdx]}`} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-2 bg-neutral-50" 
                    />
                    {product.images.length > 1 && (
                      <button 
                        onClick={() => nextImage(product.id, product.images.length)}
                        className="absolute bottom-3 right-3 bg-neutral-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-sm shadow-sm hover:bg-indigo-600 transition"
                      >
                        See Next Example ({currentImgIdx + 1}/{product.images.length}) ➔
                      </button>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{product.name}</h3>
                    <span className="text-indigo-600 font-black text-xl bg-indigo-50 px-3 py-1 rounded-xl">from ${product.price}</span>
                  </div>
                  
                  {/* Big, direct, clear one-liner description */}
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

      {/* Checkout Popup */}
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
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">What text, name, base material or custom shape do you want?</label>
                  <textarea 
                    rows="2"
                    placeholder="Describe what you want cut or written here. (For lamps: mention if you want a custom matching acrylic base!)" 
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
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">Opening WhatsApp securely to finish payment confirmation with the team...</p>
                <button onClick={() => setSelectedProduct(null)} className="mt-2 bg-neutral-100 text-neutral-800 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 text-center text-xs font-medium border-t border-neutral-900">
        <p className="text-white font-bold text-sm mb-1">LaserCutAI Garage Studio</p>
        <p className="mb-4">89 Brahman Road, Box Hill NSW 2765, Australia</p>
        <p className="text-neutral-600">Open Doors Public Hours: Saturday & Weekend (9am – 4pm)</p>
      </footer>
    </div>
  );
}