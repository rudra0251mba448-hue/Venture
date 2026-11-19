import React, { useEffect, useState } from 'react';
import { Check, Copy, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { ProductArtwork } from './ProductArtwork';

export interface CartItem {
  key: string;
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  artworkId: string;
}

interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  pincode: string;
  paymentMethod: 'COD' | 'UPI';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 79;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Dehradun');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [carModel, setCarModel] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [notifyRestocks, setNotifyRestocks] = useState(true);
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && step === 'confirmed' && items.length > 0) {
      setStep('bag');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !city.trim() || !address.trim() || !pincode.trim()) {
      setFormError('Please complete all required delivery fields.');
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setFormError('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    setFormError('');

    const orderNum = `AN-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipt({
      orderNumber: orderNum,
      customerName: fullName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      shipping,
      total,
    });
    onClearCart();
    setStep('confirmed');
  };

  const handleCopySummary = () => {
    if (!receipt) return;
    const itemLines = receipt.items
      .map((i) => `• ${i.name} (${i.variant}) × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString('en-IN')}`)
      .join('\n');
    const summaryText = `AutoNest Order ${receipt.orderNumber}\nName: ${receipt.customerName}\nPhone: ${receipt.phone}\nDelivery: ${receipt.address}, ${receipt.city} - ${receipt.pincode}\nPayment: ${receipt.paymentMethod === 'COD' ? 'Cash on Delivery' : 'UPI on Delivery'}\n\nItems:\n${itemLines}\n\nTotal: ₹${receipt.total.toLocaleString('en-IN')}`;
    navigator.clipboard?.writeText(summaryText);
    setCopiedSummary(true);
    window.setTimeout(() => setCopiedSummary(false), 1800);
  };

  const resetAndClose = () => {
    setStep('bag');
    setReceipt(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141517]/50 backdrop-blur-[2px] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag and checkout"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-[460px] bg-white h-full flex flex-col border-l border-[#E4E4E0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E4E4E0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#141517]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-[#141517]">
              {step === 'bag' && 'Your Bag'}
              {step === 'checkout' && 'Delivery & Payment'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close bag"
            className="p-2 text-[#5A5D65] hover:text-[#141517] rounded-lg hover:bg-[#F2F2F0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'bag' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="w-8 h-8 text-[#B0B3BA] mx-auto mb-3" aria-hidden="true" />
                  <p className="font-display text-base font-semibold text-[#141517] mb-1">
                    Your bag is empty
                  </p>
                  <p className="text-sm text-[#5A5D65] mb-6">
                    Add curated car accessories or a launch bundle to get started.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#141517] text-white text-xs font-semibold rounded-lg hover:bg-[#C23527] transition-colors cursor-pointer"
                  >
                    Browse Catalogue
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free Shipping Progress */}
                  <div className="p-3.5 bg-[#F8F8F7] border border-[#E4E4E0] rounded-lg">
                    <p className="text-xs font-medium text-[#141517] mb-2">
                      {remainingForFree === 0
                        ? 'Unlocked: Free Express Delivery across Dehradun & India'
                        : `Add ₹${remainingForFree.toLocaleString('en-IN')} more for free delivery`}
                    </p>
                    <div className="h-1.5 bg-[#E4E4E0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2D6A4F] transition-all duration-200"
                        style={{
                          width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Line Items */}
                  <ul className="divide-y divide-[#E4E4E0]">
                    {items.map((item) => (
                      <li key={item.key} className="py-4 flex gap-4">
                        <div className="w-20 h-16 rounded-lg overflow-hidden border border-[#E4E4E0] bg-[#F2F2F0] shrink-0">
                          <ProductArtwork productId={item.artworkId} className="w-full h-full" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-[#141517] leading-snug">
                              {item.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.key)}
                              aria-label={`Remove ${item.name}`}
                              className="p-1 text-[#8A8E96] hover:text-[#C23527] transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-xs text-[#5A5D65] mt-0.5 mb-2.5">{item.variant}</p>

                          <div className="flex items-center justify-between gap-3">
                            <div className="inline-flex items-center border border-[#D4D4CE] rounded-md">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.key, -1)}
                                aria-label="Decrease quantity"
                                className="p-1.5 text-[#35383F] hover:bg-[#F2F2F0] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-mono tabular-nums text-[#141517]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.key, 1)}
                                aria-label="Increase quantity"
                                className="p-1.5 text-[#35383F] hover:bg-[#F2F2F0] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-semibold font-mono tabular-nums text-[#141517]">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="p-3.5 bg-[#F8F8F7] border border-[#E4E4E0] rounded-lg flex items-center justify-between text-xs">
                <span className="text-[#5A5D65]">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} item(s) · Payable Total
                </span>
                <span className="font-mono font-bold text-sm tabular-nums text-[#141517]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#141517] mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'COD'
                        ? 'bg-[#141517] text-white border-[#141517]'
                        : 'bg-white text-[#35383F] border-[#D4D4CE]'
                    }`}
                  >
                    Cash on Delivery (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'UPI'
                        ? 'bg-[#141517] text-white border-[#141517]'
                        : 'bg-white text-[#35383F] border-[#D4D4CE]'
                    }`}
                  >
                    UPI on Delivery
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="chk-name" className="block text-xs font-semibold text-[#141517] mb-1">
                  Full Name *
                </label>
                <input
                  id="chk-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Raghav Rawat"
                  className="w-full px-3 py-2.5 text-sm border border-[#D4D4CE] rounded-lg focus:outline-2 focus:outline-[#141517]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="chk-phone" className="block text-xs font-semibold text-[#141517] mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98XXXXXXXX"
                    className="w-full px-3 py-2.5 text-sm border border-[#D4D4CE] rounded-lg focus:outline-2 focus:outline-[#141517]"
                  />
                </div>
                <div>
                  <label htmlFor="chk-city" className="block text-xs font-semibold text-[#141517] mb-1">
                    City *
                  </label>
                  <input
                    id="chk-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Dehradun"
                    className="w-full px-3 py-2.5 text-sm border border-[#D4D4CE] rounded-lg focus:outline-2 focus:outline-[#141517]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="chk-address" className="block text-xs font-semibold text-[#141517] mb-1">
                  Delivery Address *
                </label>
                <textarea
                  id="chk-address"
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Hostel, Street, Landmark (e.g. Rajpur Road)"
                  className="w-full px-3 py-2 text-sm border border-[#D4D4CE] rounded-lg focus:outline-2 focus:outline-[#141517]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="chk-pin" className="block text-xs font-semibold text-[#141517] mb-1">
                    Pincode *
                  </label>
                  <input
                    id="chk-pin"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="248001"
                    className="w-full px-3 py-2.5 text-sm font-mono border border-[#D4D4CE] rounded-lg focus:outline-2 focus:outline-[#141517]"
                  />
                </div>
                <div>
                  <label htmlFor="chk-car" className="block text-xs font-semibold text-[#141517] mb-1">
                    Your Car (Optional)
                  </label>
                  <input
                    id="chk-car"
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="e.g. Swift 2022"
                    className="w-full px-3 py-2.5 text-sm border border-[#D4D4CE] rounded-lg focus:outline-2 focus:outline-[#141517]"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyRestocks}
                  onChange={(e) => setNotifyRestocks(e.target.checked)}
                  className="mt-0.5 rounded border-[#D4D4CE]"
                />
                <span className="text-xs text-[#5A5D65]">
                  Send my tracking link and notify me when curated bundles for my car drop.
                </span>
              </label>

              {formError && (
                <p className="text-xs font-medium text-[#C23527]" role="alert">
                  {formError}
                </p>
              )}
            </form>
          )}

          {step === 'confirmed' && receipt && (
            <div className="space-y-5">
              <div className="p-4 bg-[#F4F8F6] border border-[#C6DED1] rounded-xl">
                <div className="flex items-center gap-2 text-[#2D6A4F] font-semibold text-sm mb-1">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Order {receipt.orderNumber} Confirmed — Preparing Shipment</span>
                </div>
                <p className="text-xs text-[#35383F] leading-relaxed">
                  Thank you, {receipt.customerName}. Dispatch confirmation will be shared to{' '}
                  <span className="font-mono">{receipt.phone}</span> for delivery to {receipt.city} (
                  {receipt.pincode}).
                </p>
              </div>

              <div className="border border-[#E4E4E0] rounded-xl p-4 space-y-3 text-xs">
                <p className="font-semibold text-[#141517]">Receipt Summary</p>
                <div className="divide-y divide-[#F0F0EC]">
                  {receipt.items.map((item) => (
                    <div key={item.key} className="py-2 flex justify-between gap-3">
                      <div>
                        <p className="font-medium text-[#141517]">
                          {item.name} × {item.quantity}
                        </p>
                        <p className="text-[#5A5D65]">{item.variant}</p>
                      </div>
                      <span className="font-mono tabular-nums font-medium text-[#141517]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E4E4E0] space-y-1">
                  <div className="flex justify-between text-[#5A5D65]">
                    <span>Payment Mode</span>
                    <span className="font-medium text-[#141517]">
                      {receipt.paymentMethod === 'COD' ? 'Cash on Delivery' : 'UPI on Delivery'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5A5D65]">
                    <span>Delivery</span>
                    <span className="font-mono tabular-nums">
                      {receipt.shipping === 0 ? 'Free' : `₹${receipt.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#141517] pt-1">
                    <span>Total Payable</span>
                    <span className="font-mono tabular-nums">
                      ₹{receipt.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold border border-[#D4D4CE] rounded-lg hover:border-[#141517] transition-colors cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2D6A4F]" aria-hidden="true" />
                    <span>Copied Order Summary for WhatsApp</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Order Summary</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {step === 'bag' && items.length > 0 && (
          <div className="px-6 py-4 border-t border-[#E4E4E0] bg-[#F8F8F7] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#5A5D65]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#5A5D65]">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? 'Free' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#141517] pt-1">
                <span>Total</span>
                <span className="font-mono tabular-nums">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('checkout')}
              className="w-full py-3 min-h-[44px] bg-[#C23527] text-white text-sm font-semibold rounded-lg hover:bg-[#A82C20] transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

        {step === 'checkout' && (
          <div className="px-6 py-4 border-t border-[#E4E4E0] bg-[#F8F8F7] flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep('bag')}
              className="px-4 py-3 min-h-[44px] text-xs font-semibold text-[#141517] border border-[#D4D4CE] rounded-lg hover:border-[#141517] cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              form="checkout-form"
              className="flex-1 py-3 min-h-[44px] bg-[#C23527] text-white text-sm font-semibold rounded-lg hover:bg-[#A82C20] transition-colors cursor-pointer"
            >
              Confirm Order · ₹{total.toLocaleString('en-IN')}
            </button>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="px-6 py-4 border-t border-[#E4E4E0] bg-[#F8F8F7]">
            <button
              type="button"
              onClick={resetAndClose}
              className="w-full py-3 min-h-[44px] bg-[#141517] text-white text-sm font-semibold rounded-lg hover:bg-[#272A30] transition-colors cursor-pointer"
            >
              Continue Exploring AutoNest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
