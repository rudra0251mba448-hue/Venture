import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PRODUCTS, VEHICLE_PROFILES, VehicleProfileId } from '../data/catalog';

interface HeroProps {
  selectedVehicle: VehicleProfileId;
  onSelectVehicle: (vehicle: VehicleProfileId) => void;
  onInspectProduct: (productId: string) => void;
}

interface Hotspot {
  id: string;
  productId: string;
  zone: string;
  label: string;
  x: number;
  y: number;
}

const COCKPIT_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-mount',
    productId: 'maglock-dash-mount',
    zone: 'AC Vent & Dash',
    label: 'MagLock Pro Mount',
    x: 245,
    y: 122,
  },
  {
    id: 'hs-ambient',
    productId: 'ambient-fiber-kit',
    zone: 'Trim Seam',
    label: 'OEM Ambient Fiber',
    x: 356,
    y: 138,
  },
  {
    id: 'hs-charger',
    productId: 'twin-usb-fast-charger',
    zone: '12V Console',
    label: '65W Flush PD Charger',
    x: 245,
    y: 196,
  },
  {
    id: 'hs-gap',
    productId: 'gap-organizer-set',
    zone: 'Seat Bolster',
    label: 'Nappa Gap Organizer',
    x: 158,
    y: 230,
  },
];

export const Hero: React.FC<HeroProps> = ({
  selectedVehicle,
  onSelectVehicle,
  onInspectProduct,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>('hs-mount');

  const activeHotspot =
    COCKPIT_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? COCKPIT_HOTSPOTS[0];
  const activeProduct = PRODUCTS.find((p) => p.id === activeHotspot.productId);
  const currentProfile =
    VEHICLE_PROFILES.find((v) => v.id === selectedVehicle) ?? VEHICLE_PROFILES[0];

  const compatibleCount =
    selectedVehicle === 'all'
      ? PRODUCTS.length
      : PRODUCTS.filter((p) => p.compatibleVehicles.includes(selectedVehicle)).length;

  return (
    <section id="top" className="border-b border-[#E4E4E0] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Campaign Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#5A5D65] mb-3">
                Curated Automotive Store · Dehradun Pilot &amp; Pan-India Dispatch
              </p>

              <h1
                className="font-display font-bold tracking-tight text-[#141517] leading-[1.08] mb-4 max-w-xl"
                style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.25rem)', textWrap: 'balance' }}
              >
                Curated car accessories, verified for your drive.
              </h1>

              <p className="text-base text-[#4A4D55] leading-relaxed max-w-lg mb-7">
                AutoNest brings carefully selected, affordable, and vehicle-compatible upgrades
                into one clean storefront—so you never waste hours comparing unverified marketplace
                listings.
              </p>

              {/* Garage Vehicle Filter */}
              <div id="fitment-guide" className="mb-7">
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <span className="text-xs font-semibold text-[#141517]">
                    Filter by your car for instant fitment check
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#5A5D65]">
                    {compatibleCount} of {PRODUCTS.length} fit
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {VEHICLE_PROFILES.map((vehicle) => {
                    const active = selectedVehicle === vehicle.id;
                    return (
                      <button
                        key={vehicle.id}
                        type="button"
                        onClick={() => onSelectVehicle(vehicle.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23527] ${
                          active
                            ? 'bg-[#141517] text-white border-[#141517]'
                            : 'bg-[#F8F8F7] text-[#35383F] border-[#E4E4E0] hover:border-[#141517]'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-[#E86454]" aria-hidden="true" />}
                        <span>{vehicle.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-2.5 text-xs text-[#5A5D65]">
                  {currentProfile.fitmentNote}
                </p>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalogue"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#C23527] text-white text-sm font-semibold rounded-lg hover:bg-[#A82C20] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141517]"
              >
                <span>Explore Catalogue</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#bundles"
                className="inline-flex items-center justify-center px-5 py-3 min-h-[44px] bg-transparent text-[#141517] text-sm font-medium rounded-lg border border-[#D4D4CE] hover:border-[#141517] transition-colors whitespace-nowrap shrink-0"
              >
                View Launch Bundles
              </a>
            </div>
          </div>

          {/* Right Interactive Cockpit Blueprint Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 bg-[#141517] rounded-xl border border-[#272A30] p-5 sm:p-6 flex flex-col justify-between text-white min-h-[360px]">
              <div className="flex items-center justify-between gap-4 border-b border-[#272A30] pb-3.5">
                <div>
                  <p className="text-xs font-medium text-[#A1A5AE]">
                    Interactive Cockpit Fitment Map
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {currentProfile.label}
                  </p>
                </div>
                <span className="text-xs font-mono tabular-nums text-[#A1A5AE]">
                  ₹549 – ₹1,399
                </span>
              </div>

              {/* Vector Cockpit Schematic */}
              <div className="relative my-4 flex-1 flex items-center justify-center">
                <svg
                  viewBox="0 0 480 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto max-h-[240px]"
                  role="img"
                  aria-label="Interactive car interior fitment schematic"
                >
                  {/* Windshield & A-pillar architectural outline */}
                  <path
                    d="M42 118C74 48 148 28 240 28C332 28 406 48 438 118"
                    stroke="#32363F"
                    strokeWidth="2"
                  />
                  {/* Main Dashboard Sweep */}
                  <path
                    d="M36 142C98 112 182 104 240 104C298 104 382 112 444 142V188C444 196 436 202 428 202H52C44 202 36 196 36 188V142Z"
                    fill="#1C1E24"
                    stroke="#444854"
                    strokeWidth="2"
                  />
                  {/* Ambient Light Seam Line */}
                  <path
                    d="M52 145C118 122 192 116 240 116C288 116 362 122 428 145"
                    stroke={activeHotspotId === 'hs-ambient' ? '#E85343' : '#C23527'}
                    strokeWidth={activeHotspotId === 'hs-ambient' ? '3.5' : '1.75'}
                    strokeOpacity={activeHotspotId === 'hs-ambient' ? '1' : '0.55'}
                  />
                  {/* Steering Wheel */}
                  <circle cx="122" cy="166" r="46" stroke="#8C919C" strokeWidth="7" />
                  <circle cx="122" cy="166" r="14" fill="#2A2D35" stroke="#5A5E69" strokeWidth="2" />
                  <path d="M84 166H108M136 166H160M122 180V208" stroke="#6B707C" strokeWidth="5" strokeLinecap="round" />

                  {/* Center Infotainment + AC Vents */}
                  <rect x="206" y="102" width="68" height="38" rx="4" fill="#111215" stroke="#555966" strokeWidth="1.75" />
                  <rect x="214" y="150" width="22" height="14" rx="2" fill="#2B2E36" />
                  <rect x="244" y="150" width="22" height="14" rx="2" fill="#2B2E36" />

                  {/* Center Console Tunnel */}
                  <path
                    d="M198 202H282L294 268H186L198 202Z"
                    fill="#17191E"
                    stroke="#3C404B"
                    strokeWidth="1.75"
                  />
                  <circle cx="240" cy="234" r="14" fill="#252830" stroke="#525663" strokeWidth="1.5" />

                  {/* Seat Bolsters */}
                  <path
                    d="M66 218H166V268H66V218Z"
                    fill="#191B20"
                    stroke="#353942"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M314 218H414V268H314V218Z"
                    fill="#191B20"
                    stroke="#353942"
                    strokeWidth="1.5"
                  />

                  {/* Interactive Hotspots */}
                  {COCKPIT_HOTSPOTS.map((spot) => {
                    const isActive = spot.id === activeHotspotId;
                    return (
                      <g
                        key={spot.id}
                        className="cursor-pointer"
                        onClick={() => setActiveHotspotId(spot.id)}
                      >
                        <circle
                          cx={spot.x}
                          cy={spot.y}
                          r={isActive ? 16 : 12}
                          fill={isActive ? '#C23527' : '#2D3039'}
                          fillOpacity={isActive ? 0.25 : 0.85}
                          stroke={isActive ? '#E85343' : '#9CA3AF'}
                          strokeWidth="1.75"
                        />
                        <circle
                          cx={spot.x}
                          cy={spot.y}
                          r="5"
                          fill={isActive ? '#E85343' : '#FFFFFF'}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Hotspot Selector & Inspect Bar */}
              <div className="pt-3.5 border-t border-[#272A30]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {COCKPIT_HOTSPOTS.map((spot) => {
                    const isActive = spot.id === activeHotspotId;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveHotspotId(spot.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#C23527] text-white'
                            : 'bg-[#202329] text-[#B8BCC4] hover:text-white'
                        }`}
                      >
                        {spot.zone}
                      </button>
                    );
                  })}
                </div>

                {activeProduct && (
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {activeProduct.name}
                      </p>
                      <p className="text-xs text-[#A1A5AE] truncate">
                        {activeProduct.fitmentSummary}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onInspectProduct(activeProduct.id)}
                      className="px-3.5 py-2 bg-white text-[#141517] text-xs font-semibold rounded-lg hover:bg-[#E4E4E0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Inspect · ₹{activeProduct.price.toLocaleString('en-IN')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
