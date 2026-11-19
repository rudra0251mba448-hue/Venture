import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product, VehicleProfileId } from '../data/catalog';
import { ProductArtwork } from './ProductArtwork';

interface ProductCardProps {
  product: Product;
  selectedVehicle: VehicleProfileId;
  onInspect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedVehicle,
  onInspect,
  onQuickAdd,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const isCompatible =
    selectedVehicle === 'all' || product.compatibleVehicles.includes(selectedVehicle);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article
      className="group bg-white border border-[#E4E4E0] rounded-xl overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#C8C8C2]"
    >
      {/* Artwork Stage (~68% visual weight, uniform 4:3) */}
      <button
        type="button"
        onClick={() => onInspect(product)}
        className="relative aspect-[4/3] w-full bg-[#F2F2F0] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C23527]"
        aria-label={`Inspect ${product.name}`}
      >
        <ProductArtwork
          productId={product.id}
          mode="studio"
          className="w-full h-full transition-transform duration-200 group-hover:scale-[1.02]"
        />
        {product.stockNote && (
          <span className="absolute bottom-3 left-3 text-[11px] font-medium text-[#35383F] bg-white/90 px-2 py-0.5 rounded border border-[#E4E4E0]">
            {product.stockNote}
          </span>
        )}
      </button>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Unboxed clean metadata with typographic separator */}
          <div className="flex items-center gap-1.5 text-xs text-[#5A5D65] mb-1.5">
            <span className="uppercase tracking-wide font-medium">
              {product.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className={isCompatible ? 'text-[#2D6A4F] font-medium' : 'text-[#8C5A2B]'}>
              {selectedVehicle === 'all'
                ? product.universalFit
                  ? 'Universal Fit'
                  : 'Model Verified'
                : isCompatible
                ? 'Verified Fit'
                : 'Check Clearance'}
            </span>
          </div>

          <h3 className="font-display text-base font-semibold text-[#141517] leading-snug mb-1.5">
            <button
              type="button"
              onClick={() => onInspect(product)}
              className="text-left hover:text-[#C23527] transition-colors cursor-pointer"
            >
              {product.name}
            </button>
          </h3>

          <p className="text-sm text-[#5A5D65] leading-relaxed line-clamp-2">
            {product.shortBenefit}
          </p>
        </div>

        {/* Baseline-aligned Price & Quick Add */}
        <div className="pt-3 border-t border-[#F0F0EC] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-semibold font-mono tabular-nums text-[#141517]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs font-mono tabular-nums text-[#8A8E96] line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23527] ${
              justAdded
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-[#141517] text-white hover:bg-[#C23527]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
