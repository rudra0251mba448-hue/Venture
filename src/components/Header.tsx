import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F8F7]/95 backdrop-blur-sm border-b border-[#E4E4E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element display wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#141517] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C23527]"
        >
          AutoNest
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A5D65]"
        >
          <a
            href="#catalogue"
            className="hover:text-[#141517] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Catalogue
          </a>
          <a
            href="#fitment-guide"
            className="hover:text-[#141517] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Fitment Guide
          </a>
          <a
            href="#bundles"
            className="hover:text-[#141517] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Bundles
          </a>
          <a
            href="#pilot"
            className="hover:text-[#141517] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Dehradun Pilot
          </a>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-[#141517] text-white text-sm font-medium rounded-lg hover:bg-[#272A30] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23527]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Bag</span>
            <span className="font-mono text-xs tabular-nums text-[#E4E4E0]">
              ({cartCount})
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
