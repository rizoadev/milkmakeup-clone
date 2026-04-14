"use client";
import { useState, createContext, useContext, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  wishlist: string[];
  createdAt: string;
};

type Address = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal: string;
  isDefault: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "milkmakeup_user";
const USERS_KEY = "milkmakeup_users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveUser = (u: User) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const login = (email: string, password: string): boolean => {
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    const found = users.find((u) => u.email === email);
    if (!found) return false;
    
    const user: User = { ...found };
    saveUser(user);
    return true;
  };

  const register = (name: string, email: string, phone: string, password: string): boolean => {
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    
    if (users.find((u) => u.email === email)) return false;
    
    const newUser: User = {
      id: "USR-" + Date.now(),
      name,
      email,
      phone,
      addresses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    saveUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    saveUser(updated);
    
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = updated;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    // Mock - always succeed
    return true;
  };

  const addAddress = (address: Omit<Address, "id">) => {
    if (!user) return;
    const newAddress = { ...address, id: "ADDR-" + Date.now() };
    const updated = {
      ...user,
      addresses: [...user.addresses, newAddress],
    };
    saveUser(updated);
  };

  const updateAddress = (id: string, address: Partial<Address>) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.map((a) => (a.id === id ? { ...a, ...address } : a)),
    };
    saveUser(updated);
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.filter((a) => a.id !== id),
    };
    saveUser(updated);
  };

  const addToWishlist = (productId: string) => {
    if (!user) return;
    if (user.wishlist.includes(productId)) return;
    const updated = { ...user, wishlist: [...user.wishlist, productId] };
    saveUser(updated);
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    const updated = { ...user, wishlist: user.wishlist.filter((id) => id !== productId) };
    saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        addAddress,
        updateAddress,
        deleteAddress,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}

// Mock orders data
export const mockOrders = [
  { id: "ORD-2026-001", date: "2026-04-10", items: 3, total: 96000, status: "delivered", products: ["Cloud Wing Mascara", "Girl Gang Lip Gloss", "Proof Primer"] },
  { id: "ORD-2026-002", date: "2026-04-12", items: 2, total: 64000, status: "shipped", tracking: "JNE123456", products: ["Cloud Paint Rosy", "Skin Savvy"] },
  { id: "ORD-2026-003", date: "2026-04-13", items: 5, total: 160000, status: "pending", products: ["Ooh Lash", "Kiss Balm", "Eyes Pencil", "Cloud Wing", "Girl Gang"] },
];

export const mockProducts = [
  { id: "1", name: "Cloud Wing - Ultra Black Mascara", slug: "cloud-wing-ultra-black-mascara", price: 32000, image: "https://placehold.co/400x500/f5f5f5/000?text=Cloud+Wing" },
  { id: "2", name: "Girl Gang - Lip Gloss", slug: "girl-gang-lip-gloss", price: 24000, image: "https://placehold.co/400x500/f5f5f5/000?text=Girl+Gang" },
  { id: "3", name: "Proof Waterproof Primer", slug: "proof-waterproof-primer", price: 38000, image: "https://placehold.co/400x500/f5f5f5/000?text=Proof+Primer" },
  { id: "4", name: "Cloud Paint - Rosy", slug: "cloud-paint-rosy", price: 28000, image: "https://placehold.co/400x500/f5f5f5/000?text=Cloud+Paint" },
  { id: "5", name: "Skin Savvy - Daily Moisturizer", slug: "skin-savvy-daily-moisturizer", price: 42000, image: "https://placehold.co/400x500/f5f5f5/000?text=Skin+Savvy" },
  { id: "6", name: "Ooh Lash Lift", slug: "ooh-lash-lift", price: 36000, image: "https://placehold.co/400x500/f5f5f5/000?text=Ooh+Lash" },
  { id: "7", name: "Kiss For Day - Lip Balm", slug: "kiss-for-day-lip-balm", price: 18000, image: "https://placehold.co/400x500/f5f5f5/000?text=Kiss+For+Day" },
  { id: "8", name: "Eyes On You - Eye Pencil", slug: "eyes-on-you-eye-pencil", price: 22000, image: "https://placehold.co/400x500/f5f5f5/000?text=Eyes+On+You" },
];