import React from 'react';
import { CATEGORIES, CategoryId } from '../data/catalog';

interface FooterProps {
  onSelectCategory: (cat: CategoryId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="border-t border-[#E4E4E0] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-[#E4E4E0]">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold text-[#141517] mb-2">AutoNest</p>
            <p className="text-xs text-[#5A5D65] leading-relaxed">
              Curated, affordable, and vehicle-compatible car accessories, detailing kits, and
              automotive collectibles—launching in Dehradun and dispatching across India.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 text-xs">
            <div>
              <p className="font-semibold text-[#141517] mb-2.5">Categories</p>
              <ul className="space-y-2 text-[#5A5D65]">
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <li key={cat.id}>
                    <a
                      href="#catalogue"
                      onClick={() => onSelectCategory(cat.id)}
                      className="hover:text-[#141517] transition-colors"
                    >
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-[#141517] mb-2.5">Customer Desk</p>
              <ul className="space-y-2 text-[#5A5D65]">
                <li>Dehradun Express &amp; Pan-India COD</li>
                <li>Free delivery on orders ₹999+</li>
                <li>WhatsApp Fitment Desk · 10 AM – 8 PM IST</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#6B707C]">
          <p>© {new Date().getFullYear()} AutoNest Automotive Lifestyle Store.</p>
          <p>Curated Compatibility · No Marketplace Clutter</p>
        </div>
      </div>
    </footer>
  );
};
