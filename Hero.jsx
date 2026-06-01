export default function Hero({ onShop }) {
  return (
    <section style={{ position:"relative", minHeight:"calc(100vh - 102px)", overflow:"hidden", background:"var(--bg0)" }}>

      {/* BG image */}
      <div style={{ position:"absolute", inset:0 }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90" alt="" style={{ objectPosition:"60% center", opacity:0.35 }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(110deg, rgba(7,7,10,0.98) 0%, rgba(7,7,10,0.88) 40%, rgba(7,7,10,0.5) 70%, rgba(7,7,10,0.2) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, var(--bg0) 0%, transparent 50%)" }} />
      </div>

      {/* Glow blobs */}
      <div style={{ position:"absolute", top:"15%", left:"5%", width:"500px", height:"500px", background:"radial-gradient(circle, rgba(212,168,75,0.06) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"20%", right:"15%", width:"400px", height:"400px", background:"radial-gradient(circle, rgba(139,111,212,0.08) 0%, transparent 65%)", pointerEvents:"none" }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:1, maxWidth:"1440px", margin:"0 auto", padding:"6rem 2.5rem 4rem", minHeight:"inherit", display:"flex", flexDirection:"column", justifyContent:"center" }}>

        <div style={{ maxWidth:"680px" }}>
          {/* Label */}
          <div className="section-label" style={{ animation:"fadeUp 0.6s 0.1s both" }}>
            Summer Collection 2025
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily:"var(--serif)", fontWeight:300,
            fontSize:"clamp(3.5rem, 8vw, 7.5rem)",
            lineHeight:0.95, color:"var(--t1)",
            marginBottom:"1.5rem",
            animation:"fadeUp 0.7s 0.2s both",
          }}>
            Fashion<br />
            <span className="gold-text" style={{ fontStyle:"italic", fontWeight:600 }}>Redefined</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize:"1rem", color:"var(--t3)", lineHeight:1.8,
            maxWidth:"440px", fontWeight:300,
            marginBottom:"3rem",
            animation:"fadeUp 0.7s 0.35s both",
          }}>
            হাতে বাছাই করা প্রিমিয়াম পোশাক — আপনার প্রতিটি মুহূর্তকে বিশেষ করে তোলে। সারা বাংলাদেশে দ্রুত ডেলিভারি।
          </p>

          {/* CTA */}
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", animation:"fadeUp 0.7s 0.45s both" }}>
            <button onClick={onShop} className="btn-gold">কেনাকাটা শুরু করুন →</button>
            <button className="btn-ghost">Lookbook দেখুন</button>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:"3rem", marginTop:"5rem", flexWrap:"wrap", animation:"fadeUp 0.7s 0.55s both" }}>
            {[["10K+","খুশি কাস্টমার"],["500+","প্রিমিয়াম পণ্য"],["4.9 ★","গড় রেটিং"],["48h","ডেলিভারি"]].map(([n,l]) => (
              <div key={l}>
                <p className="gold-text" style={{ fontFamily:"var(--serif)", fontSize:"2.2rem", fontWeight:700, lineHeight:1 }}>{n}</p>
                <p style={{ fontSize:"0.68rem", color:"var(--t4)", letterSpacing:"0.1em", marginTop:"5px", textTransform:"uppercase" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div style={{
        position:"absolute", bottom:"3rem", right:"3rem", zIndex:2,
        background:"rgba(14,14,20,0.9)", backdropFilter:"blur(20px)",
        border:"1px solid rgba(212,168,75,0.25)",
        padding:"1.4rem 2rem",
        animation:"fadeUp 0.7s 0.65s both, borderGlow 3s 1s infinite",
      }}>
        <p style={{ fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--t4)", marginBottom:"5px" }}>শুরু হচ্ছে মাত্র</p>
        <p className="gold-text" style={{ fontFamily:"var(--serif)", fontSize:"2.4rem", fontWeight:700, lineHeight:1 }}>৳ ১,৯০০</p>
        <p style={{ fontSize:"0.65rem", color:"var(--teal)", marginTop:"5px", fontWeight:500 }}>✓ ৩০ দিন ফ্রি রিটার্ন</p>
      </div>

      {/* Scroll cue */}
      <div style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", animation:"float 2s ease infinite" }}>
        <span style={{ fontSize:"0.6rem", letterSpacing:"0.18em", color:"var(--t4)", textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:"1px", height:"32px", background:"linear-gradient(to bottom, var(--g2), transparent)" }} />
      </div>
    </section>
  );
}
