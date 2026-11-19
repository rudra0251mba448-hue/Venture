import React, { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  CATEGORIES,
  CategoryId,
  CuratedBundle,
  Product,
  PRODUCTS,
  VEHICLE_PROFILES,
  VehicleProfileId,
} from './data/catalog';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { BundlesAndProof } from './components/BundlesAndProof';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AccountModal } from './components/AccountModal';
import { Footer } from './components/Footer';

type SortOrder = 'featured' | 'price-asc' | 'price-desc';

const CART_STORAGE_KEY = 'autonest_bag_v1';

export default function App() {
  const { user, preferredVehicle, savePreferredVehicle, authError, clearAuthError } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleProfileId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('featured');

  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota issues
    }
  }, [cartItems]);

  useEffect(() => {
    if (user && preferredVehicle !== 'all') {
      setSelectedVehicle(preferredVehicle);
    }
  }, [user, preferredVehicle]);

  const handleSelectVehicle = (vehicle: VehicleProfileId) => {
    setSelectedVehicle(vehicle);
    if (user) {
      void savePreferredVehicle(vehicle);
    }
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesVehicle =
        selectedVehicle === 'all' || product.compatibleVehicles.includes(selectedVehicle);
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortBenefit.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesVehicle && matchesQuery;
    });

    if (sortOrder === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, selectedVehicle, searchQuery, sortOrder]);

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddProduct = (product: Product, variant?: string) => {
    const chosenVariant = variant ?? product.variants[0] ?? 'Standard';
    const key = `${product.id}__${chosenVariant}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          variant: chosenVariant,
          price: product.price,
          quantity: 1,
          artworkId: product.id,
        },
      ];
    });
  };

  const handleAddBundle = (bundle: CuratedBundle) => {
    const key = `bundle__${bundle.id}`;
    const leadArtwork = bundle.productIds[0] ?? 'maglock-dash-mount';
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: bundle.id,
          name: bundle.name,
          variant: 'Launch Bundle Pack',
          price: bundle.price,
          quantity: 1,
          artworkId: leadArtwork,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleInspectById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) setInspectedProduct(found);
  };

  const activeVehicleObj = VEHICLE_PROFILES.find((v) => v.id === selectedVehicle);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F7] text-[#141517]">
      <Header
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {authError && (
        <div
          role="alert"
          className="bg-[#FBF6F0] border-b border-[#E7D4BE] px-4 sm:px-6 py-2.5 text-xs text-[#8C5A2B]"
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
            <span>{authError}</span>
            <button
              type="button"
              onClick={clearAuthError}
              aria-label="Dismiss sign-in notice"
              className="p-1 hover:text-[#141517] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        <Hero
          selectedVehicle={selectedVehicle}
          onSelectVehicle={handleSelectVehicle}
          onInspectProduct={handleInspectById}
        />

        {/* Curated Catalogue Section */}
        <section id="catalogue" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-medium text-[#5A5D65] mb-1.5">
                Curated Product Catalogue · {filteredProducts.length} Items
                {selectedVehicle !== 'all' && activeVehicleObj
                  ? ` · Filtered for ${activeVehicleObj.shortLabel}`
                  : ''}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141517]">
                Essential upgrades for your cabin
              </h2>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#8A8E96] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mount, detailing..."
                  aria-label="Search accessories"
                  className="pl-9 pr-3 py-2 min-h-[40px] w-52 sm:w-60 text-xs bg-white border border-[#D4D4CE] rounded-lg text-[#141517] placeholder:text-[#8A8E96] focus:outline-2 focus:outline-[#141517]"
                />
              </div>

              <select
                aria-label="Sort products"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="px-3 py-2 min-h-[40px] text-xs font-medium bg-white border border-[#D4D4CE] rounded-lg text-[#141517] cursor-pointer focus:outline-2 focus:outline-[#141517]"
              >
                <option value="featured">Sort: Curated Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Segmented Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E4E4E0]">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EEEEEC] rounded-lg">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white text-[#141517] shadow-xs'
                        : 'text-[#5A5D65] hover:text-[#141517]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {selectedVehicle !== 'all' && (
              <button
                type="button"
                onClick={() => handleSelectVehicle('all')}
                className="text-xs font-medium text-[#C23527] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                Reset vehicle filter
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white border border-[#E4E4E0] rounded-xl">
              <p className="font-display text-lg font-semibold text-[#141517] mb-1">
                No matching accessories for this filter
              </p>
              <p className="text-sm text-[#5A5D65] mb-5">
                Try clearing your search or switching back to all vehicles.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  handleSelectVehicle('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-[#141517] text-white text-xs font-semibold rounded-lg hover:bg-[#C23527] transition-colors cursor-pointer"
              >
                Show All Curated Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedVehicle={selectedVehicle}
                  onInspect={setInspectedProduct}
                  onQuickAdd={(item) => handleAddProduct(item)}
                />
              ))}
            </div>
          )}
        </section>

        <BundlesAndProof onAddBundle={handleAddBundle} />
      </main>

      <Footer onSelectCategory={setSelectedCategory} />

      <ProductModal
        product={inspectedProduct}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={handleSelectVehicle}
        onClose={() => setInspectedProduct(null)}
        onAddToBag={(product, variant) => {
          handleAddProduct(product, variant);
          setIsCartOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      <AccountModal
        isOpen={isAccountOpen}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={handleSelectVehicle}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}
