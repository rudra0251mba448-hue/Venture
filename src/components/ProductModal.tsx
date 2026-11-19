import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check, MessageSquare, Star, X } from 'lucide-react';
import { Product, VEHICLE_PROFILES, VehicleProfileId } from '../data/catalog';
import { ProductArtwork } from './ProductArtwork';

interface ProductModalProps {
  product: Product | null;
  selectedVehicle: VehicleProfileId;
  onSelectVehicle: (vehicle: VehicleProfileId) => void;
  onClose: () => void;
  onAddToBag: (product: Product, variant: string) => void;
}

type DetailTab = 'specs' | 'install' | 'reviews';

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  selectedVehicle,
  onSelectVehicle,
  onClose,
  onAddToBag,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [artMode, setArtMode] = useState<'studio' | 'blueprint'>('studio');
  const [activeTab, setActiveTab] = useState<DetailTab>('specs');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [carModelInput, setCarModelInput] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] ?? 'Standard');
      setArtMode('studio');
      setActiveTab('specs');
      setEnquiryOpen(false);
      setCarModelInput('');
      setEnquirySent(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const isCompatible =
    selectedVehicle === 'all' || product.compatibleVehicles.includes(selectedVehicle);
  const currentVehicleObj = VEHICLE_PROFILES.find((v) => v.id === selectedVehicle);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carModelInput.trim()) return;
    setEnquirySent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141517]/60 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E4E4E0] rounded-xl w-full max-w-[960px] max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-[#E4E4E0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#5A5D65]">
            <span className="font-mono">{product.sku}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Install: {product.installTime}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-2 text-[#5A5D65] hover:text-[#141517] rounded-lg hover:bg-[#F2F2F0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Gallery & Blueprint Toggle */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E4E4E0] bg-[#F2F2F0]">
              <ProductArtwork productId={product.id} mode={artMode} className="w-full h-full" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex p-1 bg-[#F2F2F0] rounded-lg">
                <button
                  type="button"
                  onClick={() => setArtMode('studio')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    artMode === 'studio'
                      ? 'bg-white text-[#141517] shadow-xs'
                      : 'text-[#5A5D65] hover:text-[#141517]'
                  }`}
                >
                  Studio View
                </button>
                <button
                  type="button"
                  onClick={() => setArtMode('blueprint')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    artMode === 'blueprint'
                      ? 'bg-white text-[#141517] shadow-xs'
                      : 'text-[#5A5D65] hover:text-[#141517]'
                  }`}
                >
                  Fitment Blueprint
                </button>
              </div>

              <span className="text-xs font-mono text-[#5A5D65]">
                {product.dimensions}
              </span>
            </div>

            {/* Compatibility Status Box */}
            <div
              className={`mt-2 p-4 rounded-lg border ${
                isCompatible
                  ? 'bg-[#F4F8F6] border-[#C6DED1]'
                  : 'bg-[#FBF6F0] border-[#E7D4BE]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {isCompatible ? (
                  <Check className="w-4 h-4 text-[#2D6A4F] mt-0.5 shrink-0" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-[#8C5A2B] mt-0.5 shrink-0" aria-hidden="true" />
                )}
                <div className="text-xs">
                  <p className="font-semibold text-[#141517] mb-1">
                    {selectedVehicle === 'all'
                      ? 'Compatibility Guidance'
                      : isCompatible
                      ? `Verified Fit for ${currentVehicleObj?.label}`
                      : `Check Trim Clearance for ${currentVehicleObj?.label}`}
                  </p>
                  <p className="text-[#4A4D55] leading-relaxed">{product.fitmentSummary}</p>

                  {/* Quick vehicle switch */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <label htmlFor="modal-vehicle-select" className="text-[#5A5D65]">
                      Test car:
                    </label>
                    <select
                      id="modal-vehicle-select"
                      value={selectedVehicle}
                      onChange={(e) => onSelectVehicle(e.target.value as VehicleProfileId)}
                      className="text-xs font-medium bg-white border border-[#D4D4CE] rounded px-2 py-1 text-[#141517]"
                    >
                      {VEHICLE_PROFILES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <h2
                id="pdp-modal-title"
                className="font-display text-2xl font-bold text-[#141517] leading-tight mb-2"
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold font-mono tabular-nums text-[#141517]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm font-mono tabular-nums text-[#8A8E96] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#5A5D65]">
                  Incl. taxes · Free delivery above ₹999
                </span>
              </div>

              <p className="text-sm text-[#4A4D55] leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-5">
                <span className="block text-xs font-semibold text-[#141517] mb-2">
                  Select Finish / Option
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const active = selectedVariant === variant;
                    return (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#141517] text-white border-[#141517]'
                            : 'bg-[#F8F8F7] text-[#35383F] border-[#E4E4E0] hover:border-[#141517]'
                        }`}
                      >
                        {variant}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Add to Bag + Fitment Enquiry */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    onAddToBag(product, selectedVariant || product.variants[0]);
                    onClose();
                  }}
                  className="flex-1 min-w-[200px] px-6 py-3 min-h-[44px] bg-[#C23527] text-white text-sm font-semibold rounded-lg hover:bg-[#A82C20] transition-colors cursor-pointer"
                >
                  Add to Bag · ₹{product.price.toLocaleString('en-IN')}
                </button>

                <button
                  type="button"
                  onClick={() => setEnquiryOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-4 py-3 min-h-[44px] text-xs font-medium text-[#141517] border border-[#D4D4CE] rounded-lg hover:border-[#141517] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ask Fitment</span>
                </button>
              </div>

              {enquiryOpen && (
                <form
                  onSubmit={handleEnquirySubmit}
                  className="mb-6 p-4 bg-[#F8F8F7] border border-[#E4E4E0] rounded-lg"
                >
                  {enquirySent ? (
                    <p className="text-xs text-[#2D6A4F] font-medium">
                      Fitment check logged for “{carModelInput}”. Our Dehradun curation team
                      confirms trim measurements within 2 hours on WhatsApp.
                    </p>
                  ) : (
                    <>
                      <label
                        htmlFor="fitment-car-input"
                        className="block text-xs font-semibold text-[#141517] mb-1.5"
                      >
                        Not listed above? Enter your exact car model &amp; year
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="fitment-car-input"
                          type="text"
                          value={carModelInput}
                          onChange={(e) => setCarModelInput(e.target.value)}
                          placeholder="e.g. 2023 Maruti Fronx Delta"
                          className="flex-1 px-3 py-2 text-xs bg-white border border-[#D4D4CE] rounded-md text-[#141517]"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-[#141517] text-white text-xs font-medium rounded-md hover:bg-[#272A30] cursor-pointer whitespace-nowrap"
                        >
                          Check Fit
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}

              {/* Tabbed Details: Specs / Install / Reviews */}
              <div>
                <div className="flex border-b border-[#E4E4E0] gap-6 mb-4">
                  {(
                    [
                      { id: 'specs', label: 'Specifications' },
                      { id: 'install', label: 'Install Guide' },
                      { id: 'reviews', label: `Reviews (${product.reviews.length})` },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-[#141517] text-[#141517]'
                          : 'border-transparent text-[#5A5D65] hover:text-[#141517]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'specs' && (
                  <dl className="divide-y divide-[#F0F0EC] text-xs">
                    <div className="py-2 flex justify-between gap-4">
                      <dt className="text-[#5A5D65]">Material</dt>
                      <dd className="font-medium text-[#141517] text-right">
                        {product.materialSpec}
                      </dd>
                    </div>
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="py-2 flex justify-between gap-4">
                        <dt className="text-[#5A5D65]">{spec.label}</dt>
                        <dd className="font-medium text-[#141517] text-right">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab === 'install' && (
                  <ol className="space-y-2.5 text-xs text-[#35383F]">
                    {product.installSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-2.5 leading-relaxed">
                        <span className="font-mono font-semibold text-[#C23527] shrink-0">
                          0{idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    {product.reviews.map((rev, idx) => (
                      <div key={idx} className="p-3 bg-[#F8F8F7] rounded-lg border border-[#E4E4E0]">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-semibold text-[#141517]">
                            {rev.author} · {rev.city}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-xs font-mono text-[#141517]">
                            <Star className="w-3 h-3 fill-[#C23527] text-[#C23527]" aria-hidden="true" />
                            {rev.rating}.0
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5A5D65] mb-1.5">{rev.car}</p>
                        <p className="text-xs text-[#35383F] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
