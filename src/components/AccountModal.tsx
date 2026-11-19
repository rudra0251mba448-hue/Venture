import React, { useEffect } from 'react';
import { Car, LogOut, PackageCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VEHICLE_PROFILES, VehicleProfileId } from '../data/catalog';

interface AccountModalProps {
  isOpen: boolean;
  selectedVehicle: VehicleProfileId;
  onSelectVehicle: (vehicle: VehicleProfileId) => void;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  selectedVehicle,
  onSelectVehicle,
  onClose,
}) => {
  const { user, orders, signOutUser } = useAuth();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const initials = (user.displayName || user.email || 'A')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141517]/55 backdrop-blur-[2px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Your AutoNest Account"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E4E4E0] rounded-xl w-full max-w-[540px] max-h-[85vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E4E4E0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Google account avatar'}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#E4E4E0] shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#141517] text-white text-xs font-bold flex items-center justify-center shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-display text-base font-bold text-[#141517] truncate">
                {user.displayName || 'AutoNest Member'}
              </p>
              <p className="text-xs text-[#5A5D65] truncate">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close account modal"
            className="p-2 text-[#5A5D65] hover:text-[#141517] rounded-lg hover:bg-[#F2F2F0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Saved Garage Vehicle */}
          <div className="p-4 bg-[#F8F8F7] border border-[#E4E4E0] rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#141517]">
              <Car className="w-4 h-4 text-[#C23527]" aria-hidden="true" />
              <span>Saved Garage Vehicle</span>
            </div>
            <p className="text-xs text-[#5A5D65]">
              Your fitment filter is saved to your Google account across sessions.
            </p>
            <select
              aria-label="Saved garage vehicle"
              value={selectedVehicle}
              onChange={(e) => onSelectVehicle(e.target.value as VehicleProfileId)}
              className="w-full px-3 py-2 text-xs font-medium bg-white border border-[#D4D4CE] rounded-lg text-[#141517]"
            >
              {VEHICLE_PROFILES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Order History */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#141517]">
                <PackageCheck className="w-4 h-4 text-[#2D6A4F]" aria-hidden="true" />
                <span>Order History ({orders.length})</span>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="p-6 text-center bg-[#F8F8F7] border border-[#E4E4E0] rounded-xl">
                <p className="text-sm font-medium text-[#141517] mb-1">No orders placed yet</p>
                <p className="text-xs text-[#5A5D65]">
                  Orders placed while signed in appear here automatically with delivery details.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="p-4 bg-white border border-[#E4E4E0] rounded-xl space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-semibold text-[#141517]">
                        {order.orderNumber}
                      </span>
                      <span className="text-[#2D6A4F] font-semibold capitalize">
                        {order.status} · {order.paymentMethod}
                      </span>
                    </div>
                    <p className="text-[#35383F] leading-relaxed">{order.itemsSummary}</p>
                    <div className="pt-2 border-t border-[#F0F0EC] flex items-center justify-between text-[#5A5D65]">
                      <span>
                        {order.city} · {order.pincode}
                      </span>
                      <span className="font-mono font-bold text-[#141517] tabular-nums">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E4E4E0] bg-[#F8F8F7] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={async () => {
              await signOutUser();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#35383F] border border-[#D4D4CE] rounded-lg hover:border-[#141517] hover:text-[#141517] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sign out</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#141517] text-white text-xs font-semibold rounded-lg hover:bg-[#272A30] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
