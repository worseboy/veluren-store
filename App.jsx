import { useState, useEffect } from "react";
import AnnouncementBar  from "./components/AnnouncementBar";
import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import Collections      from "./components/Collections";
import ProductGrid      from "./components/ProductGrid";
import ProductDetail    from "./components/ProductDetail";
import Cart             from "./components/Cart";
import Checkout         from "./components/Checkout";
import OrderSuccess     from "./components/OrderSuccess";
import Footer           from "./components/Footer";
import { db, collection, onSnapshot, query, orderBy } from "./firebase";

export const DELIVERY_FEE  = 80;
export const FREE_DELIVERY = 999;

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [page,     setPage]     = useState("home");
  const [product,  setProduct]  = useState(null);
  const [cart,     setCart]     = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wish,     setWish]     = useState([]);
  const [cat,      setCat]      = useState("All");
  const [order,    setOrder]    = useState(null);

  // Firebase থেকে পণ্য লোড করো
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map((d, i) => ({
        id: d.id,
        _firebaseId: d.id,
        // Firebase data
        name:        d.data().name        || "পণ্য",
        namebn:      d.data().namebn      || d.data().name || "পণ্য",
        price:       Number(d.data().price) || 0,
        oldPrice:    d.data().oldPrice    || null,
        category:    d.data().category    || "Other",
        image:       d.data().image       || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85",
        images:      d.data().images      || [d.data().image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85"],
        badge:       d.data().badge       || "",
        colors:      d.data().colors      || [{ name: "Default", hex: "#6c63ff" }],
        sizes:       d.data().sizes       || ["S", "M", "L", "XL"],
        description: d.data().description || "",
        stock:       d.data().stock       || 0,
        rating:      d.data().rating      || 4.5,
        reviews:     d.data().reviews     || 0,
      }));
      setProducts(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addToCart = (p, size, color) => {
    const key = `${p.id}|${size}|${color.hex}`;
    setCart(prev => {
      const hit = prev.find(i => i.key === key);
      if (hit) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, size, color, key, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = key => setCart(p => p.filter(i => i.key !== key));
  const updateQty = (key, qty) => qty < 1 ? removeFromCart(key) : setCart(p => p.map(i => i.key === key ? { ...i, qty } : i));
  const toggleWish = id => setWish(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const nav = (pg, prod = null) => { setPage(pg); setProduct(prod); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <AnnouncementBar />
      <Navbar
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
        onLogo={() => nav("home")}
        onCat={c => { setCat(c); nav("home"); }}
      />

      <main style={{ flex: 1 }}>
        {page === "home" && <>
          <Hero onShop={() => document.getElementById("products")?.scrollIntoView({ behavior:"smooth" })} />
          <Collections onCat={c => { setCat(c); document.getElementById("products")?.scrollIntoView({ behavior:"smooth" }); }} />
          <ProductGrid
            products={products}
            loading={loading}
            cat={cat}
            setCat={setCat}
            onProduct={p => nav("product", p)}
            wish={wish}
            toggleWish={toggleWish}
          />
        </>}

        {page === "product" && product &&
          <ProductDetail product={product} onBack={() => nav("home")} onAdd={addToCart} wish={wish} toggleWish={toggleWish} />}

        {page === "checkout" &&
          <Checkout cart={cart} onBack={() => nav("home")} onDone={o => { setOrder(o); setCart([]); nav("success"); }} />}

        {page === "success" && order &&
          <OrderSuccess order={order} onContinue={() => nav("home")} />}
      </main>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} remove={removeFromCart} updateQty={updateQty}
        onCheckout={() => { setCartOpen(false); nav("checkout"); }} />

      {!["checkout","success"].includes(page) && <Footer />}
    </div>
  );
}
