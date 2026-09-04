import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  mockBookings,
  mockCustomers,
  mockEnquiries,
  mockHomepageData,
  mockManufacturingSteps,
  mockOrders,
  mockPortfolio,
  mockProducts,
  mockReviews,
  mockServices,
  mockSettings,
  type Booking,
  type Customer,
  type Enquiry,
  type HomepageData,
  type ManufacturingStep,
  type Order,
  type PortfolioItem,
  type Product,
  type Review,
  type Service,
  type Settings,
} from "@/data/mock";

export type CartLine = {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: number;
  color: string;
  qty: number;
};

export type Toast = { id: number; message: string; tone: "success" | "error" };

type StoreValue = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  steps: ManufacturingStep[];
  setSteps: React.Dispatch<React.SetStateAction<ManufacturingStep[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
  homepage: HomepageData;
  setHomepage: React.Dispatch<React.SetStateAction<HomepageData>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;

  cart: CartLine[];
  addToCart: (line: CartLine) => void;
  removeFromCart: (index: number) => void;
  changeQty: (index: number, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  toasts: Toast[];
  notify: (message: string, tone?: "success" | "error") => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(mockPortfolio);
  const [steps, setSteps] = useState<ManufacturingStep[]>(mockManufacturingSteps);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries);
  const [homepage, setHomepage] = useState<HomepageData>(mockHomepageData);
  const [settings, setSettings] = useState<Settings>(mockSettings);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback(
    (message: string, tone: "success" | "error" = "success") => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message, tone }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    },
    [],
  );

  const addToCart = useCallback((line: CartLine) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (l) =>
          l.productId === line.productId &&
          l.size === line.size &&
          l.color === line.color,
      );
      if (idx === -1) return [...prev, line];
      return prev.map((l, i) => (i === idx ? { ...l, qty: l.qty + line.qty } : l));
    });
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const changeQty = useCallback((index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((l, i) => (i === index ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const login = useCallback((email: string, password: string) => {
    const ok = email.trim().toLowerCase() === "admin@luvaan.com" && password === "admin123";
    if (ok) setIsAdmin(true);
    return ok;
  }, []);

  const logout = useCallback(() => setIsAdmin(false), []);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartSubtotal = cart.reduce((s, l) => s + l.qty * l.price, 0);

  const value = useMemo<StoreValue>(
    () => ({
      products, setProducts,
      orders, setOrders,
      customers, setCustomers,
      services, setServices,
      bookings, setBookings,
      portfolio, setPortfolio,
      steps, setSteps,
      reviews, setReviews,
      enquiries, setEnquiries,
      homepage, setHomepage,
      settings, setSettings,
      cart, addToCart, removeFromCart, changeQty, clearCart, cartCount, cartSubtotal,
      isAdmin, login, logout,
      toasts, notify,
    }),
    [
      products, orders, customers, services, bookings, portfolio, steps, reviews,
      enquiries, homepage, settings, cart, cartCount, cartSubtotal, isAdmin,
      toasts, addToCart, removeFromCart, changeQty, clearCart, login, logout, notify,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
