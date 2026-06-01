import { useState } from "react";

const CATS = ["All","Tops","Bottoms","Dresses","Shoes","Accessories","Other"];

export default function ProductGrid({ products, loading, cat, setCat, onProduct, wish, toggleWish }) {
  const list = cat === "All" ? products : products.filter(p => p.category === cat);

  return (
    <section id="products" style={{ background:"var(--bg0)", padding:"5rem 2rem 6rem" }}>
      <div style={{ maxWidth:"1440px", margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <div className="section-label">Featured Products</div>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:300, color:"var(--t1)", lineHeight:1.1 }}>
              Curated <em className="gold-text" style={{ fontStyle:"italic", fontWeight:600 }}>Pieces</em>
            </h2>
          </div>
          <p style={{ fontSize:"0.75rem", color:"var(--t4)" }}>{list.length}টি পণ্য</p>
        </div>

        {/* Filter */}
        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"3rem", flexWrap:"wrap" }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding:"0.55rem 1.3rem",
              fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase",
              border:"1px solid", borderRadius:"2px",
              borderColor: cat===c ? "var(--g2)" : "var(--line)",
              background: cat===c ? "rgba(212,168,75,0.1)" : "transparent",
              color: cat===c ? "var(--g3)" : "var(--t4)",
              cursor:"pointer", transition:"all 0.2s",
            }}
            onMouseEnter={e=>{ if(cat!==c){e.currentTarget.style.borderColor="var(--line2)";e.currentTarget.style.color="var(--t3)";} }}
            onMouseLeave={e=>{ if(cat!==c){e.currentTarget.style.borderColor="var(--line)";e.currentTarget.style.color="var(--t4)";} }}
            >{c}</button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign:"center", padding:"5rem", color:"var(--t4)" }}>
            <div style={{ width:"40px", height:"40px", border:"3px solid rgba(212,168,75,0.2)", borderTopColor:"var(--g2)", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 1rem" }} />
            <p style={{ fontSize:"0.85rem", letterSpacing:"0.1em" }}>পণ্য লোড হচ্ছে...</p>
          </div>
        )}

        {/* Grid */}
        {!loading && list.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:"1.5rem" }}>
            {list.map((p, i) => (
              <Card key={p.id} p={p} i={i} onClick={() => onProduct(p)}
                wishlisted={wish.includes(p.id)}
                onWish={e => { e.stopPropagation(); toggleWish(p.id); }} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && list.length === 0 && (
          <div style={{ textAlign:"center", padding:"5rem", color:"var(--t4)" }}>
            <p style={{ fontSize:"3rem", marginBottom:"1rem" }}>🔍</p>
            <p style={{ fontFamily:"var(--serif)", fontSize:"1.5rem", color:"var(--t3)", marginBottom:"1rem" }}>পণ্য পাওয়া যায়নি</p>
            <button onClick={() => setCat("All")} className="btn-ghost" style={{ padding:"0.75rem 2rem", fontSize:"0.72rem" }}>সব পণ্য দেখুন</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Card({ p, i, onClick, wishlisted, onWish }) {
  const [hov, setHov] = useState(false);
  const disc = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : null;

  return (
    <article onClick={onClick}
      style={{
        cursor:"pointer", background:"var(--bg2)",
        border:`1px solid ${hov ? "rgba(212,168,75,0.35)" : "var(--line)"}`,
        transition:"all 0.35s",
        transform: hov ? "translateY(-8px)" : "none",
        boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.5), 0 0 1px rgba(212,168,75,0.2)" : "none",
        animation:`fadeUp 0.5s ${Math.min(i*0.06,0.36)}s both`,
        overflow:"hidden",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden", background:"var(--bg3)" }}>
        <img src={p.image} alt={p.namebn || p.name}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.7s", transform: hov?"scale(1.08)":"scale(1)" }}
          onError={e => e.target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85"}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(7,7,10,0.7) 0%, transparent 55%)", opacity: hov?1:0, transition:"opacity 0.3s" }} />

        {/* Badges */}
        <div style={{ position:"absolute", top:"10px", left:"10px", display:"flex", flexDirection:"column", gap:"4px" }}>
          {p.badge && <span style={{ fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"4px 10px", background: p.badge==="Sale"?"var(--rose)": p.badge==="Bestseller"?"var(--gold-grad2)":"var(--bg3)", color: p.badge==="Bestseller"?"var(--bg0)":"#fff", border: p.badge==="New"?"1px solid var(--line2)":"none" }}>{p.badge}</span>}
          {disc && <span style={{ fontSize:"0.58rem", fontWeight:700, padding:"4px 10px", background:"var(--rose)", color:"#fff" }}>-{disc}%</span>}
        </div>

        {/* Wishlist */}
        <button onClick={onWish} style={{
          position:"absolute", top:"10px", right:"10px",
          width:"36px", height:"36px", borderRadius:"50%",
          background:"rgba(7,7,10,0.75)", backdropFilter:"blur(8px)",
          border:`1px solid ${wishlisted?"var(--rose)":"var(--line2)"}`,
          fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center",
          opacity: hov||wishlisted ? 1 : 0, transition:"all 0.25s",
          transform: wishlisted ? "scale(1.1)" : "scale(1)",
        }}>{wishlisted ? "❤️" : "🤍"}</button>

        {/* Quick view */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          background:"linear-gradient(135deg,var(--g1),var(--g3))",
          color:"var(--bg0)", textAlign:"center", padding:"0.85rem",
          fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
          transform: hov ? "translateY(0)" : "translateY(100%)",
          transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}>Quick View →</div>
      </div>

      {/* Info */}
      <div style={{ padding:"1.25rem 1.25rem 1.4rem" }}>
        <p style={{ fontSize:"0.62rem", color:"var(--t4)", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"5px" }}>{p.category}</p>
        <p style={{ fontFamily:"var(--serif)", fontSize:"1.05rem", color:"var(--t1)", marginBottom:"8px", lineHeight:1.3 }}>{p.namebn || p.name}</p>
        <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"10px" }}>
          <span style={{ fontSize:"0.72rem", color:"var(--g2)" }}>{"★".repeat(Math.floor(p.rating || 4))}</span>
          <span style={{ fontSize:"0.62rem", color:"var(--t4)" }}>({p.reviews || 0})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:"7px" }}>
            <span className="gold-text" style={{ fontSize:"1rem", fontWeight:700 }}>৳ {Number(p.price).toLocaleString()}</span>
            {p.oldPrice && <span style={{ fontSize:"0.78rem", color:"var(--t4)", textDecoration:"line-through" }}>৳ {p.oldPrice.toLocaleString()}</span>}
          </div>
          <div style={{ display:"flex", gap:"4px" }}>
            {(p.colors || []).slice(0,3).map(c => <span key={c.hex} title={c.name} style={{ width:"12px", height:"12px", borderRadius:"50%", background:c.hex, border:"1px solid rgba(255,255,255,0.12)", display:"inline-block" }} />)}
          </div>
        </div>
      </div>
    </article>
  );
}
