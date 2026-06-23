import './globals.css';

export const metadata = {
  title: 'LaserCutAI - Custom Premium Acrylic Designs',
  description: 'Order bespoke laser-cut keychains, house signs, and jewelry on demand.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Force inject Tailwind Play CDN so the styling works instantly regardless of build configs */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#fcfbf9] text-gray-900 antialiased">{children}</body>
    </html>
  );
}
