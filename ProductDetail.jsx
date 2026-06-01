import { useState } from "react";

export default function ProductDetail({ product: p, onBack, onAdd, wish, toggleWish }) {
  const [size,     setSize]    = useState("");
  const [color,    setColor]   = useState(p.colors[0]);
  const [img,      setImg]     = useState(0);
  const [added,    setAdded]   = useState(false);
  const [sizeErr,  setSizeErr] = useState(false);
  const disc = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : null;

  const handleAdd = () => {
    if (!size) { setSizeErr(true); return; }
    setSizeErr(false);
    onAdd(p, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const row = (icon, title, sub) => (
    <div style={{ display:"flex", gap:"12px", padding:"0.85rem", background:"var(--bg3)", border:"1px solid var(--line)" }}>
      <span style={{ fontSize:"1rem", flexShrink:0 }}>{icon}</span>
      <div><p style={{ fontSize:"0.76rem", fontWeight:600, color:"var(--t2)", marginBottom:"1px" }}>{title}</p><p style={{ fontSize:"0.68rem", color:"var(--t4)" }}>{sub}</p></div>
    </div>
  );

  return (
    <div style={{ background:"var(--bg0)", padding:"3rem 2rem 6rem" }}>
      <div style={{ maxWidth:"1440px", margin:"0 auto" }}>

        {/* Breadcrumb */}
        <nav style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"2.5rem", fontSize:"0.72rem", color:"var(--t4)" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--t4)", transition:"color 0.2s", fontSize:"0.72rem" }}
            onMouseEnter={e=>e.currentTarget.style.color="var(--g2)"}
            onMouseLeave={e=>e.currentTarget.style.color="var(--t4)"}
          >Home</button>
          <span>›</span><span>{p.category}</span><span>›</span>
          <span style={{ color:"var(--t3)" }}>{p.namebn}</span>
        </nav>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>

          {/* Images */}
          <div style={{ animation:"fadeIn 0.4s" }}>
            <div style={{ aspectRatio:"3/4", overflow:"hidden", background:"var(--bg2)", border:"1px solid var(--line)", marginBottom:"10px" }}>
              <img src={p.images[img]} alt={p.namebn} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"opacity 0.3s" }} />
            </div>
            {p.images.length > 1 && (
              <div style={{ display:"flex", gap:"8px" }}>
                {p.images.map((src, i) => (
                  <button key={i} onClick={() => setImg(i)} style={{ width:"76px", height:"96px", overflow:"hidden", padding:0, border:`2px solid ${img===i?"var(--g2)":"var(--line)"}`, background:"var(--bg2)", transition:"border-color 0.2s" }}>
                    <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ animation:"fadeUp 0.5s" }}>
            {/* Badges */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"1rem" }}>
              {p.badge && <span style={{ fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"4px 10px", background:p.badge==="Sale"?"var(--rose)":p.badge==="Bestseller"?"var(--gold-grad2)":"var(--bg3)", color:p.badge==="Bestseller"?"var(--bg0)":"#fff" }}>{p.badge}</span>}
              {disc && <span style={{ fontSize:"0.58rem", fontWeight:700, padding:"4px 10px", background:"var(--rose)", color:"#fff" }}>-{disc}% ছাড়</span>}
            </div>

            <p style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--g2)", fontWeight:600, marginBottom:"0.5rem" }}>{p.category}</p>
            <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.8rem,3vw,2.8rem)", fontWeight:400, color:"var(--t1)", lineHeight:1.1, marginBottom:"0.75rem" }}>{p.namebn}</h1>

            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"1.5rem" }}>
              <span style={{ color:"var(--g2)", fontSize:"0.9rem" }}>{"★".repeat(Math.floor(p.rating))}</span>
              <span style={{ fontSize:"0.72rem", color:"var(--t4)" }}>{p.rating} ({p.reviews} রিভিউ)</span>
            </div>

            {/* Price */}
            <div style={{ background:"var(--bg2)", border:"1px solid var(--line)", borderLeft:"3px solid var(--g2)", padding:"1.25rem 1.5rem", marginBottom:"1.75rem", display:"flex", alignItems:"baseline", gap:"12px" }}>
              <span className="gold-text" style={{ fontFamily:"var(--serif)", fontSize:"2.5rem", fontWeight:700 }}>৳ {p.price.toLocaleString()}</span>
              {p.oldPrice && <span style={{ fontSize:"1rem", color:"var(--t4)", textDecoration:"line-through" }}>৳ {p.oldPrice.toLocaleString()}</span>}
              {disc && <span style={{ fontSize:"0.75rem", color:"var(--rose)", fontWeight:600 }}>({disc}% ছাড়)</span>}
            </div>

            <p style={{ fontSize:"0.88rem", color:"var(--t3)", lineHeight:1.85, marginBottom:"2rem", fontWeight:300 }}>{p.description}</p>

            {/* Color */}
            <div style={{ marginBottom:"1.75rem" }}>
              <p style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--t3)", fontWeight:600, marginBottom:"10px" }}>
                রঙ: <span style={{ color:"var(--g2)", fontWeight:400, textTransform:"none", letterSpacing:0 }}>{color.name}</span>
              </p>
              <div style={{ display:"flex", gap:"10px" }}>
                {p.colors.map(c => (
                  <button key={c.hex} onClick={() => setColor(c)} title={c.name} style={{
                    width:"32px", height:"32px", borderRadius:"50%", background:c.hex,
                    border:`2px solid ${color.hex===c.hex?"var(--g2)":"transparent"}`,
                    outline: color.hex===c.hex ? "2px solid rgba(212,168,75,0.25)" : "none",
                    outlineOffset:"3px", cursor:"pointer", transition:"all 0.2s",
                    transform: color.hex===c.hex ? "scale(1.15)" : "scale(1)",
                  }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom:"2rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
                <p style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color: sizeErr?"var(--rose)":"var(--t3)", fontWeight:600 }}>
                  {sizeErr ? "⚠️ সাইজ বেছে নিন" : "সাইজ"}
                </p>
                <button style={{ fontSize:"0.68rem", color:"var(--g2)", background:"none", border:"none", cursor:"pointer", textDecoration:"underline" }}>সাইজ গাইড</button>
              </div>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {p.sizes.map(s => (
                  <button key={s} onClick={() => { setSize(s); setSizeErr(false); }} style={{
                    padding:"8px 16px", fontSize:"0.75rem", fontWeight:600,
                    border:"1px solid",
                    borderColor: size===s ? "var(--g2)" : sizeErr ? "var(--rose)" : "var(--line)",
                    background: size===s ? "rgba(212,168,75,0.12)" : "transparent",
                    color: size===s ? "var(--g3)" : "var(--t3)",
                    cursor:"pointer", transition:"all 0.18s",
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:"flex", gap:"10px", marginBottom:"2rem" }}>
              <button onClick={handleAdd} style={{
                flex:1, padding:"1.1rem",
                background: added ? "linear-gradient(135deg,var(--teal),#1AAA90)" : "var(--gold-grad2)",
                color:"var(--bg0)", fontSize:"0.78rem", fontWeight:700,
                letterSpacing:"0.14em", textTransform:"uppercase",
                border:"none", cursor:"pointer", transition:"all 0.3s",
                transform: added?"scale(1.01)":"scale(1)",
              }}>
                {added ? "✓ যোগ হয়েছে!" : "Cart এ যোগ করুন"}
              </button>
              <button onClick={() => toggleWish(p.id)} style={{
                padding:"1.1rem 1.25rem",
                border:`1px solid ${wish.includes(p.id)?"var(--rose)":"var(--line)"}`,
                background: wish.includes(p.id) ? "rgba(212,96,122,0.1)" : "transparent",
                fontSize:"1.15rem", cursor:"pointer", transition:"all 0.2s",
              }}>{wish.includes(p.id) ? "❤️" : "🤍"}</button>
            </div>

            {/* Trust grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              {row("🚚","ফ্রি ডেলিভারি","৳১০০০+ অর্ডারে")}
              {row("↩️","৩০ দিন রিটার্ন","বিনা প্রশ্নে")}
              {row("✅","অরিজিনাল পণ্য","১০০% গ্যারান্টি")}
              {row("🔒","নিরাপদ পেমেন্ট","SSL সুরক্ষিত")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
