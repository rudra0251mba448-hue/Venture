import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { VehicleProfileId } from '../data/catalog';

export interface SavedOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  pincode: string;
  carModel?: string;
  paymentMethod: 'COD' | 'UPI';
  status: 'confirmed' | 'preparing' | 'dispatched';
  itemCount: number;
  itemsSummary: string;
  subtotal: number;
  shipping: number;
  total: number;
  createdAtMs: number;
}

export interface NewOrderPayload {
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  pincode: string;
  carModel?: string;
  paymentMethod: 'COD' | 'UPI';
  itemCount: number;
  itemsSummary: string;
  subtotal: number;
  shipping: number;
  total: number;
}

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  signingIn: boolean;
  authError: string | null;
  preferredVehicle: VehicleProfileId;
  orders: SavedOrder[];
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  savePreferredVehicle: (vehicle: VehicleProfileId) => Promise<void>;
  saveOrder: (order: NewOrderPayload) => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const VALID_VEHICLES: VehicleProfileId[] = [
  'all',
  'swift-baleno',
  'nexon-punch',
  'creta-i20',
  'thar-suv',
  'city-sedan',
];

function sanitizeVehicle(v: unknown): VehicleProfileId {
  if (typeof v === 'string' && VALID_VEHICLES.includes(v as VehicleProfileId)) {
    return v as VehicleProfileId;
  }
  return 'all';
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [preferredVehicle, setPreferredVehicle] = useState<VehicleProfileId>('all');
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  const ensureUserProfile = useCallback(async (firebaseUser: User) => {
    const userPath = `users/${firebaseUser.uid}`;
    const userRef = doc(db, 'users', firebaseUser.uid);
    const displayName = (firebaseUser.displayName || 'AutoNest Driver').slice(0, 120);
    const email = (firebaseUser.email || '').slice(0, 200);
    const photoURL = firebaseUser.photoURL ? firebaseUser.photoURL.slice(0, 500) : undefined;

    try {
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          displayName,
          email,
          ...(photoURL ? { photoURL } : {}),
          preferredVehicle: 'all',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setPreferredVehicle('all');
      } else {
        const data = snap.data();
        setPreferredVehicle(sanitizeVehicle(data.preferredVehicle));
        await updateDoc(userRef, {
          displayName,
          ...(photoURL ? { photoURL } : {}),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, userPath);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);

      if (firebaseUser) {
        try {
          await ensureUserProfile(firebaseUser);
        } catch (err) {
          console.error('Failed to sync user profile:', err);
        }
      } else {
        setPreferredVehicle('all');
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, [ensureUserProfile]);

  useEffect(() => {
    if (!authReady || !user) {
      setOrders([]);
      return;
    }

    const ordersPath = `users/${user.uid}/orders`;
    const q = query(collection(db, 'users', user.uid, 'orders'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: SavedOrder[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          const created = d.createdAt instanceof Timestamp ? d.createdAt.toMillis() : Date.now();
          return {
            id: docSnap.id,
            orderNumber: String(d.orderNumber || docSnap.id),
            customerName: String(d.customerName || ''),
            phone: String(d.phone || ''),
            city: String(d.city || ''),
            address: String(d.address || ''),
            pincode: String(d.pincode || ''),
            carModel: typeof d.carModel === 'string' ? d.carModel : undefined,
            paymentMethod: d.paymentMethod === 'UPI' ? 'UPI' : 'COD',
            status:
              d.status === 'dispatched' || d.status === 'preparing' ? d.status : 'confirmed',
            itemCount: Number(d.itemCount || 1),
            itemsSummary: String(d.itemsSummary || ''),
            subtotal: Number(d.subtotal || 0),
            shipping: Number(d.shipping || 0),
            total: Number(d.total || 0),
            createdAtMs: created,
          };
        });
        list.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setOrders(list);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, ordersPath);
      }
    );

    return () => unsubscribe();
  }, [authReady, user]);

  const signInWithGoogle = useCallback(async () => {
    setSigningIn(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const code =
        typeof err === 'object' && err !== null && 'code' in err
          ? String((err as { code?: string }).code)
          : '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setAuthError(null);
      } else if (code === 'auth/popup-blocked') {
        setAuthError('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
      } else {
        setAuthError('Unable to sign in with Google right now. Please try again.');
        console.error('Google Sign-In error:', err);
      }
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setAuthError(null);
    await signOut(auth);
  }, []);

  const savePreferredVehicle = useCallback(
    async (vehicle: VehicleProfileId) => {
      const safeVehicle = sanitizeVehicle(vehicle);
      setPreferredVehicle(safeVehicle);
      if (!user) return;

      const userPath = `users/${user.uid}`;
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          preferredVehicle: safeVehicle,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, userPath);
      }
    },
    [user]
  );

  const saveOrder = useCallback(
    async (payload: NewOrderPayload) => {
      if (!user) return;
      await ensureUserProfile(user);

      const safeOrderNumber = payload.orderNumber.slice(0, 16);
      const orderId = safeOrderNumber.replace(/[^a-zA-Z0-9_-]/g, '');
      const orderPath = `users/${user.uid}/orders/${orderId}`;

      const cleanDoc: Record<string, unknown> = {
        orderNumber: safeOrderNumber,
        userId: user.uid,
        customerName: payload.customerName.trim().slice(0, 120),
        phone: payload.phone.trim().slice(0, 24),
        city: payload.city.trim().slice(0, 80),
        address: payload.address.trim().slice(0, 300),
        pincode: payload.pincode.trim().slice(0, 6),
        paymentMethod: payload.paymentMethod,
        status: 'confirmed',
        itemCount: Math.max(1, Math.min(50, Math.round(payload.itemCount))),
        itemsSummary: payload.itemsSummary.trim().slice(0, 1000),
        subtotal: payload.subtotal,
        shipping: payload.shipping,
        total: payload.subtotal + payload.shipping,
        createdAt: serverTimestamp(),
      };

      if (payload.carModel && payload.carModel.trim()) {
        cleanDoc.carModel = payload.carModel.trim().slice(0, 80);
      }

      try {
        await setDoc(doc(db, 'users', user.uid, 'orders', orderId), cleanDoc);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, orderPath);
      }
    },
    [user, ensureUserProfile]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        signingIn,
        authError,
        preferredVehicle,
        orders,
        signInWithGoogle,
        signOutUser,
        savePreferredVehicle,
        saveOrder,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}
