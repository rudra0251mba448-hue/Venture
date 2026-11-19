import React from 'react';

interface ProductArtworkProps {
  productId: string;
  mode?: 'studio' | 'blueprint';
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  productId,
  mode = 'studio',
  className = 'w-full h-full',
}) => {
  const isBlueprint = mode === 'blueprint';
  const bgFill = isBlueprint ? '#141517' : '#F2F2F0';
  const strokeMain = isBlueprint ? '#E4E4E0' : '#1E2024';
  const strokeMuted = isBlueprint ? '#4B505B' : '#C8C8C2';
  const accent = '#C23527';

  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${productId} ${mode} illustration`}
    >
      <rect width="400" height="300" fill={bgFill} />

      {/* Subtle studio floor / architectural grid */}
      {isBlueprint ? (
        <g opacity="0.22">
          <path d="M0 60H400M0 120H400M0 180H400M0 240H400" stroke="#4B505B" strokeWidth="0.75" />
          <path d="M80 0V300M160 0V300M240 0V300M320 0V300" stroke="#4B505B" strokeWidth="0.75" />
        </g>
      ) : (
        <>
          <ellipse cx="200" cy="236" rx="112" ry="18" fill="#E3E3DF" />
          <line x1="40" y1="240" x2="360" y2="240" stroke="#E0E0DC" strokeWidth="1" />
        </>
      )}

      {productId === 'maglock-dash-mount' && (
        <g>
          {/* Steel Hook Arm */}
          <path
            d="M115 162H165C173 162 178 156 178 148V142"
            stroke={strokeMain}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M115 162H132"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Ball joint collar */}
          <circle cx="178" cy="146" r="14" fill={isBlueprint ? '#22252A' : '#2C2F36'} stroke={strokeMain} strokeWidth="2" />
          {/* Magnetic Disc Ring */}
          <circle cx="222" cy="142" r="64" fill={isBlueprint ? '#1B1D21' : '#18191C'} stroke={strokeMain} strokeWidth="2.5" />
          <circle cx="222" cy="142" r="54" stroke={strokeMuted} strokeWidth="1.5" strokeDasharray="4 4" />
          {/* N52 Magnet Ring */}
          <circle cx="222" cy="142" r="36" stroke={accent} strokeWidth="6" />
          <circle cx="222" cy="142" r="16" fill={isBlueprint ? '#141517' : '#27292E'} stroke={strokeMuted} strokeWidth="1.5" />
          {/* Blueprint dimension */}
          {isBlueprint && (
            <g stroke="#9CA3AF" strokeWidth="1">
              <line x1="158" y1="62" x2="286" y2="62" />
              <line x1="158" y1="56" x2="158" y2="68" />
              <line x1="286" y1="56" x2="286" y2="68" />
              <text x="222" y="54" textAnchor="middle" fill="#D1D5DB" fontSize="10" fontFamily="monospace">
                64 mm N52 RING
              </text>
            </g>
          )}
        </g>
      )}

      {productId === 'gap-organizer-set' && (
        <g>
          {/* Tapered foam fin */}
          <path
            d="M126 196L146 226H268L278 196H126Z"
            fill={isBlueprint ? '#1E2025' : '#2A2C31'}
            stroke={strokeMain}
            strokeWidth="2"
          />
          {/* Main Nappa body */}
          <path
            d="M110 110C110 98 119 90 131 90H269C281 90 290 98 290 110V182C290 192 281 198 271 198H129C119 198 110 192 110 182V110Z"
            fill={isBlueprint ? '#191B1F' : '#1E2024'}
            stroke={strokeMain}
            strokeWidth="2.5"
          />
          {/* Red Stitch Accent Line */}
          <rect
            x="118"
            y="98"
            width="164"
            height="92"
            rx="12"
            stroke={accent}
            strokeWidth="1.75"
            strokeDasharray="5 4"
          />
          {/* Divider & Cup/Phone Slot */}
          <line x1="212" y1="90" x2="212" y2="198" stroke={strokeMain} strokeWidth="2.5" />
          <rect x="132" y="106" width="66" height="22" rx="6" fill={isBlueprint ? '#111214' : '#101113'} />
          <circle cx="250" cy="144" r="24" fill={isBlueprint ? '#111214' : '#101113'} stroke={strokeMuted} strokeWidth="1.5" />
          {/* USB cable slot */}
          <rect x="156" y="178" width="18" height="8" rx="3" fill={accent} />
          {isBlueprint && (
            <text x="200" y="72" textAnchor="middle" fill="#D1D5DB" fontSize="10" fontFamily="monospace">
              GAP FIT: 18–42 MM · DUAL USB PASS
            </text>
          )}
        </g>
      )}

      {productId === 'detailing-starter-kit' && (
        <g>
          {/* Zipper Case Base */}
          <rect x="86" y="168" width="228" height="62" rx="10" fill={isBlueprint ? '#1D2025' : '#26282D'} stroke={strokeMain} strokeWidth="2" />
          <line x1="86" y1="186" x2="314" y2="186" stroke={accent} strokeWidth="2" />
          {/* Spray Bottle 1: Ceramic Mist */}
          <rect x="114" y="96" width="46" height="94" rx="8" fill={isBlueprint ? '#15171B' : '#FFFFFF'} stroke={strokeMain} strokeWidth="2" />
          <rect x="128" y="78" width="18" height="18" fill={strokeMain} />
          <path d="M122 72H164L158 82H122V72Z" fill={accent} />
          <rect x="122" y="122" width="30" height="36" rx="3" fill={isBlueprint ? '#22252B' : '#F2F2F0'} stroke={strokeMuted} strokeWidth="1" />
          {/* Bottle 2: Shampoo */}
          <rect x="176" y="104" width="46" height="86" rx="8" fill={isBlueprint ? '#15171B' : '#18191C'} stroke={strokeMain} strokeWidth="2" />
          <rect x="190" y="90" width="18" height="14" fill={strokeMuted} />
          <rect x="184" y="126" width="30" height="32" rx="3" fill={accent} />
          {/* Folded 800GSM Microfiber Towel */}
          <rect x="236" y="122" width="54" height="68" rx="6" fill={isBlueprint ? '#262930' : '#D9D9D4'} stroke={strokeMain} strokeWidth="2" />
          <line x1="236" y1="145" x2="290" y2="145" stroke={strokeMain} strokeWidth="1.5" />
          <line x1="236" y1="168" x2="290" y2="168" stroke={strokeMain} strokeWidth="1.5" />
          {isBlueprint && (
            <text x="200" y="54" textAnchor="middle" fill="#D1D5DB" fontSize="10" fontFamily="monospace">
              6-PIECE · SiO2 MIST + 800GSM + BRUSH
            </text>
          )}
        </g>
      )}

      {productId === 'ambient-fiber-kit' && (
        <g>
          {/* Dashboard Trim Profile */}
          <path
            d="M72 178C125 138 235 124 328 134"
            stroke={strokeMain}
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Illuminated Fiber Line */}
          <path
            d="M76 176C128 138 236 125 324 134"
            stroke={accent}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Subtle Halo */}
          <path
            d="M76 176C128 138 236 125 324 134"
            stroke={accent}
            strokeOpacity="0.28"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* USB-C Inline Controller Module */}
          <rect x="150" y="192" width="76" height="28" rx="6" fill={isBlueprint ? '#202227' : '#18191C'} stroke={strokeMain} strokeWidth="2" />
          <circle cx="170" cy="206" r="5" fill={accent} />
          <rect x="188" y="202" width="24" height="8" rx="2" fill={strokeMuted} />
          <path d="M226 206H258V170" stroke={strokeMuted} strokeWidth="2" strokeDasharray="3 3" />
          {isBlueprint && (
            <text x="200" y="88" textAnchor="middle" fill="#D1D5DB" fontSize="10" fontFamily="monospace">
              1.5 MM FLANGE · 3.0M DIFFUSED OPTIC
            </text>
          )}
        </g>
      )}

      {productId === 'foldable-boot-crate' && (
        <g>
          {/* Back Panel */}
          <polygon
            points="102,108 262,92 298,118 138,136"
            fill={isBlueprint ? '#1C1E22' : '#2E3036'}
            stroke={strokeMain}
            strokeWidth="2"
          />
          {/* Front Wall */}
          <polygon
            points="102,108 138,136 138,218 102,188"
            fill={isBlueprint ? '#181A1E' : '#23252A'}
            stroke={strokeMain}
            strokeWidth="2"
          />
          <polygon
            points="138,136 298,118 298,200 138,218"
            fill={isBlueprint ? '#22242A' : '#18191C'}
            stroke={strokeMain}
            strokeWidth="2"
          />
          {/* Center Divider */}
          <line x1="218" y1="127" x2="218" y2="208" stroke={strokeMuted} strokeWidth="2" />
          {/* Side Mesh Pocket + Velcro Base Strip */}
          <rect x="156" y="156" width="44" height="36" rx="4" stroke={strokeMuted} strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="236" y="148" width="44" height="36" rx="4" stroke={strokeMuted} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="138" y1="214" x2="298" y2="196" stroke={accent} strokeWidth="4" />
          {isBlueprint && (
            <text x="200" y="68" textAnchor="middle" fill="#D1D5DB" fontSize="10" fontFamily="monospace">
              45L COLLAPSIBLE · 1680D BALLISTIC
            </text>
          )}
        </g>
      )}

      {productId === 'alloy-metal-scent' && (
        <g>
          {/* Main Machined Aluminum Bar */}
          <rect x="92" y="128" width="216" height="38" rx="8" fill={isBlueprint ? '#1F2228' : '#1E2024'} stroke={strokeMain} strokeWidth="2.5" />
          {/* Perforated Vent Slots */}
          <rect x="118" y="142" width="128" height="10" rx="5" fill={isBlueprint ? '#111214' : '#32353D'} />
          <line x1="140" y1="142" x2="140" y2="152" stroke={strokeMain} strokeWidth="2" />
          <line x1="168" y1="142" x2="168" y2="152" stroke={strokeMain} strokeWidth="2" />
          <line x1="196" y1="142" x2="196" y2="152" stroke={strokeMain} strokeWidth="2" />
          <line x1="224" y1="142" x2="224" y2="152" stroke={strokeMain} strokeWidth="2" />
          {/* Crimson End Dial */}
          <rect x="278" y="128" width="30" height="38" rx="6" fill={accent} stroke={strokeMain} strokeWidth="2" />
          {/* Ceramic Refill Stick beside */}
          <rect x="132" y="190" width="136" height="14" rx="7" fill={isBlueprint ? '#2D3038' : '#FFFFFF'} stroke={strokeMuted} strokeWidth="1.5" />
          <text x="200" y="222" textAnchor="middle" fill={isBlueprint ? '#9CA3AF' : '#5A5D65'} fontSize="10" fontFamily="monospace">
            SOLID CERAMIC CORE · 3× REFILLS
          </text>
        </g>
      )}

      {productId === 'twin-usb-fast-charger' && (
        <g>
          {/* Outer Alloy Cylinder */}
          <rect x="150" y="88" width="100" height="126" rx="18" fill={isBlueprint ? '#1D2025' : '#18191C'} stroke={strokeMain} strokeWidth="2.5" />
          {/* Top Face Bezel */}
          <rect x="164" y="100" width="72" height="56" rx="12" fill={isBlueprint ? '#121316' : '#2B2E35'} stroke={strokeMuted} strokeWidth="1.5" />
          {/* USB-C PD 45W Port */}
          <rect x="176" y="114" width="22" height="10" rx="5" fill={accent} />
          {/* USB-A QC3.0 Port */}
          <rect x="206" y="114" width="20" height="10" rx="2" fill="#E4E4E0" />
          {/* Pull Ring Tab */}
          <path d="M180 144H220" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
          {/* Braided Cable Tail */}
          <path d="M200 214V238C200 246 218 248 240 248H286" stroke={strokeMain} strokeWidth="5" strokeLinecap="round" strokeDasharray="4 3" />
          {isBlueprint && (
            <text x="200" y="68" textAnchor="middle" fill="#D1D5DB" fontSize="10" fontFamily="monospace">
              45W PD + 20W QC · FLUSH 12V PROFILE
            </text>
          )}
        </g>
      )}

      {productId === 'diecast-keychain-model' && (
        <g>
          {/* Acrylic Display Plinth */}
          <rect x="86" y="186" width="166" height="22" rx="4" fill={isBlueprint ? '#1C1E22' : '#18191C'} stroke={strokeMain} strokeWidth="2" />
          {/* 1:64 Coupe Silhouette */}
          <path
            d="M104 178L124 146C130 138 140 134 156 134H196C212 134 226 144 236 156L242 178H104Z"
            fill={isBlueprint ? '#2A2D34' : '#FFFFFF'}
            stroke={strokeMain}
            strokeWidth="2.5"
          />
          <path d="M138 144H192L214 156H128L138 144Z" fill={isBlueprint ? '#111214' : '#22252A'} />
          <circle cx="136" cy="178" r="14" fill="#18191C" stroke={strokeMuted} strokeWidth="2" />
          <circle cx="212" cy="178" r="14" fill="#18191C" stroke={strokeMuted} strokeWidth="2" />
          <circle cx="136" cy="178" r="5" fill={accent} />
          <circle cx="212" cy="178" r="5" fill={accent} />
          {/* Spinning Rotor Keychain */}
          <circle cx="288" cy="152" r="32" fill={isBlueprint ? '#22252B' : '#D8D8D3'} stroke={strokeMain} strokeWidth="2.5" />
          <circle cx="288" cy="152" r="22" stroke={strokeMuted} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M306 128A30 30 0 0 1 318 164" stroke={accent} strokeWidth="9" strokeLinecap="round" />
          <circle cx="288" cy="108" r="10" stroke={strokeMain} strokeWidth="2" />
        </g>
      )}
    </svg>
  );
};
