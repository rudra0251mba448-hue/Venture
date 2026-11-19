import React from 'react';
import { ShoppingBag, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
}

const GoogleGIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
    />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAccount,
}) => {
  const { user, signingIn, signInWithGoogle } = useAuth();

  const firstName = user?.displayName ? user.displayName.split(' ')[0] : 'Account';

  return (
    <header className="sticky top-0 z-40 bg-[#F8F8F7]/95 backdrop-blur-sm border-b border-[#E4E4E0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
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

        {/* Zone 3: Google Sign-In / Account + Bag Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {user ? (
            <button
              type="button"
              onClick={onOpenAccount}
              className="inline-flex items-center gap-2 px-3 py-2 min-h-[40px] bg-white text-[#141517] border border-[#D4D4CE] text-xs font-semibold rounded-lg hover:border-[#141517] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23527]"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={firstName}
                  referrerPolicy="no-referrer"
                  className="w-4 h-4 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-3.5 h-3.5 text-[#5A5D65]" aria-hidden="true" />
              )}
              <span className="max-w-[96px] truncate">{firstName}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={signingIn}
              className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] bg-white text-[#141517] border border-[#D4D4CE] text-xs font-semibold rounded-lg hover:border-[#141517] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C23527]"
            >
              <GoogleGIcon />
              <span>{signingIn ? 'Signing in...' : 'Sign in'}</span>
            </button>
          )}

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
