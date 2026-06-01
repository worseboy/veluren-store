import { useState, useEffect } from "react";

const LINKS = ["New In","Women","Men","Accessories","Sale"];

export default function Navbar({ cartCount, onCart, onLogo, onCat }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const iconBtn = (icon, label, onClick) => (
    <button onClick={onClick} title={label} style={{
      width:"38px", height:"38px", display:"flex", alignItems:"center", justifyContent:"center",
      border:"1px solid var(--line)", borderRadius:"50%",
      background:"rgba(20,20,28,0.5)", fontSize:"0.9rem",
      transition:"all 0.2s", position:"relative",
    }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--g2)"; e.currentTarget.style.background="rgba(212,168,75,0.08)"; }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--line)"; e.currentTarget.style.background="rgba(20,20,28,0.5)"; }}
    >{icon}</button>
  );

  return (
    <nav style={{
      position:"sticky", top:0, zIndex:100,
      background: scrolled ? "rgba(7,7,10,0.97)" : "rgba(7,7,10,0.82)",
      backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      borderBottom: scrolled ? "1px solid rgba(212,168,75,0.18)" : "1px solid var(--line)",
      transition:"all 0.4s",
      boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
    }}>
      <div style={{ maxWidth:"1440px", margin:"0 auto", padding:"0 2rem", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

        {/* Logo — VELUREN */}
        <button onClick={onLogo} style={{
          fontFamily:"var(--serif)", fontSize:"1.85rem", fontWeight:700,
          letterSpacing:"0.1em", lineHeight:1,
          background:"var(--gold-grad)", backgroundSize:"200% auto",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          backgroundClip:"text", animation:"shimmer 5s linear infinite",
        }}>VELUREN</button>

        {/* Desktop links */}
        <div className="hide-sm" style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"2.5rem" }}>
          {LINKS.map(l => (
            <button key={l} onClick={onLogo} style={{
              fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase",
              color: l==="Sale" ? "var(--rose)" : "var(--t3)",
              padding:"4px 0", transition:"color 0.2s",
            }}
            onMouseEnter={e=>e.currentTarget.style.color = l==="Sale"?"#E8809A":"var(--g2)"}
            onMouseLeave={e=>e.currentTarget.style.color = l==="Sale"?"var(--rose)":"var(--t3)"}
            >{l}</button>
          ))}
        </div>

        {/* Icons */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <div className="hide-sm" style={{ display:"flex", gap:"8px" }}>
            {iconBtn("🔍","Search")}
            {iconBtn("👤","Account")}
          </div>

          {/* Cart */}
          <button onClick={onCart} style={{
            position:"relative", width:"38px", height:"38px",
            display:"flex", alignItems:"center", justifyContent:"center",
            border:"1px solid var(--line)", borderRadius:"50%",
            background:"rgba(20,20,28,0.5)", fontSize:"0.9rem", transition:"all 0.2s",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--g2)"; e.currentTarget.style.background="rgba(212,168,75,0.08)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--line)"; e.currentTarget.style.background="rgba(20,20,28,0.5)"; }}
          >
            🛒
            {cartCount > 0 && (
              <span style={{
                position:"absolute", top:"-4px", right:"-4px",
                background:"linear-gradient(135deg,var(--rose),#B0304A)",
                color:"#fff", borderRadius:"50%", width:"18px", height:"18px",
                fontSize:"0.58rem", fontWeight:700,
                display:"flex", alignItems:"center", justifyContent:"center",
                border:"2px solid var(--bg0)", animation:"scaleIn 0.2s",
              }}>{cartCount}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="show-sm" style={{
            width:"38px", height:"38px", border:"1px solid var(--line)",
            borderRadius:"50%", background:"rgba(20,20,28,0.5)",
            fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center",
          }}>{open ? "✕" : "☰"}</button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background:"rgba(10,10,14,0.98)", backdropFilter:"blur(20px)", borderTop:"1px solid var(--line)", padding:"1.5rem 2rem 2rem", animation:"fadeIn 0.2s" }}>
          {LINKS.map(l => (
            <button key={l} onClick={() => { onLogo(); setOpen(false); }} style={{
              display:"block", width:"100%", textAlign:"left",
              padding:"0.85rem 0", fontSize:"0.82rem", letterSpacing:"0.12em", textTransform:"uppercase",
              color: l==="Sale" ? "var(--rose)" : "var(--t3)",
              borderBottom:"1px solid var(--line)", fontWeight:500,
            }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
