import React, { useState } from 'react';
import { Check, Package, ShieldCheck, Truck } from 'lucide-react';
import { CURATED_BUNDLES, CuratedBundle, PRODUCTS } from '../data/catalog';
import { ProductArtwork } from './ProductArtwork';

interface BundlesAndProofProps {
  onAddBundle: (bundle: CuratedBundle) => void;
}

export const BundlesAndProof: React.FC<BundlesAndProofProps> = ({ onAddBundle }) => {
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);

  const handleBundleClick = (bundle: CuratedBundle) => {
    onAddBundle(bundle);
    setAddedBundleId(bundle.id);
    window.setTimeout(() => setAddedBundleId(null), 1500);
  };

  return (
    <>
      {/* Section: Curated Launch Bundles */}
      <section id="bundles" className="border-t border-[#E4E4E0] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium text-[#5A5D65] mb-1.5">
                Value Packs · Launch Offer
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141517]">
                Curated starter bundles
              </h2>
            </div>
            <p className="text-sm text-[#5A5D65] max-w-md">
              Paired accessories designed around real daily driving and weekend care—priced to
              deliver clear savings and zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CURATED_BUNDLES.map((bundle) => {
              const bundleProducts = bundle.productIds
                .map((id) => PRODUCTS.find((p) => p.id === id))
                .filter(Boolean);
              const isAdded = addedBundleId === bundle.id;

              return (
                <div
                  key={bundle.id}
                  className="border border-[#E4E4E0] rounded-xl bg-[#F8F8F7] p-6 flex flex-col justify-between gap-6"
                >
                  <div>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {bundleProducts.map((item) =>
                        item ? (
                          <div
                            key={item.id}
                            className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E4E4E0] bg-[#F2F2F0]"
                          >
                            <ProductArtwork productId={item.id} className="w-full h-full" />
                          </div>
                        ) : null
                      )}
                    </div>

                    <p className="text-xs text-[#5A5D65] mb-1">
                      Ideal for {bundle.idealFor}
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#141517] mb-1">
                      {bundle.name}
                    </h3>
                    <p className="text-sm text-[#4A4D55] mb-4">{bundle.subtitle}</p>

                    <ul className="space-y-2 text-xs text-[#35383F]">
                      {bundle.highlights.map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2D6A4F] mt-0.5 shrink-0" aria-hidden="true" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#E4E4E0] flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-xl font-bold font-mono tabular-nums text-[#141517]">
                        ₹{bundle.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm font-mono tabular-nums text-[#8A8E96] line-through">
                        ₹{bundle.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBundleClick(bundle)}
                      className={`px-5 py-2.5 min-h-[40px] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isAdded
                          ? 'bg-[#2D6A4F] text-white'
                          : 'bg-[#141517] text-white hover:bg-[#C23527]'
                      }`}
                    >
                      {isAdded ? 'Bundle Added to Bag' : 'Add Bundle to Bag'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Why AutoNest & Dehradun Pilot Proof */}
      <section id="pilot" className="border-t border-[#E4E4E0] bg-[#F8F8F7]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium text-[#5A5D65] mb-1.5">
              Why AutoNest · Dehradun Launch Pilot
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141517] mb-3">
              Built to end marketplace guesswork
            </h2>
            <p className="text-sm text-[#4A4D55] leading-relaxed">
              Instead of scrolling through hundreds of unverified listings across generic sites,
              AutoNest tests and curates every accessory for real Indian road conditions, cabin
              dimensions, and student-to-professional budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E4E4E0] rounded-xl p-6">
              <ShieldCheck className="w-5 h-5 text-[#C23527] mb-4" aria-hidden="true" />
              <h3 className="font-display text-base font-semibold text-[#141517] mb-2">
                01. Clear Vehicle Compatibility
              </h3>
              <p className="text-sm text-[#5A5D65] leading-relaxed">
                Every listing specifies vent blade clearance, console gap range, and seam tolerances
                for popular hatchbacks, SUVs, and sedans.
              </p>
            </div>

            <div className="bg-white border border-[#E4E4E0] rounded-xl p-6">
              <Package className="w-5 h-5 text-[#C23527] mb-4" aria-hidden="true" />
              <h3 className="font-display text-base font-semibold text-[#141517] mb-2">
                02. Tightly Curated Quality
              </h3>
              <p className="text-sm text-[#5A5D65] leading-relaxed">
                Only 8 vetted essentials from selected suppliers—chosen for matte OEM finishes,
                durable N52 magnets, and non-greasy detailing formulas.
              </p>
            </div>

            <div className="bg-white border border-[#E4E4E0] rounded-xl p-6">
              <Truck className="w-5 h-5 text-[#C23527] mb-4" aria-hidden="true" />
              <h3 className="font-display text-base font-semibold text-[#141517] mb-2">
                03. COD &amp; Express Local Dispatch
              </h3>
              <p className="text-sm text-[#5A5D65] leading-relaxed">
                Pay securely via Cash on Delivery or UPI on delivery. Free shipping above ₹999
                with fast dispatch across Dehradun and major Indian cities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
