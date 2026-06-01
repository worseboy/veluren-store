const CATS = [
  { key:"Dresses",     label:"Dresses",     bn:"ড্রেসেস",     img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80", color:"#8B6FD4" },
  { key:"Tops",        label:"Tops",         bn:"টপস",         img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80", color:"#D4A84B" },
  { key:"Bottoms",     label:"Bottoms",      bn:"বটমস",        img:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80", color:"#2DD4B4" },
  { key:"Shoes",       label:"Shoes",        bn:"জুতা",         img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80", color:"#D4607A" },
  { key:"Accessories", label:"Accessories",  bn:"অ্যাকসেসরিজ",  img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", color:"#60A8D4" },
];

export default function Collections({ onCat }) {
  return (
    <section style={{ background:"var(--bg1)", borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)", padding:"4rem 2rem" }}>
      <div style={{ maxWidth:"1440px", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div className="section-label" style={{ justifyContent:"center" }}>Shop by Category</div>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300, color:"var(--t1)" }}>
            Explore Our <em className="gold-text" style={{ fontStyle:"italic", fontWeight:600 }}>Collections</em>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1rem" }}>
          {CATS.map((c, i) => (
            <button key={c.key} onClick={() => onCat(c.key)} style={{
              position:"relative", aspectRatio:"2/3",
              overflow:"hidden", border:"1px solid var(--line)",
              background:"var(--bg2)", cursor:"pointer",
              animation:`fadeUp 0.5s ${i*0.08}s both`,
              padding:0,
            }}
            onMouseEnter={e => {
              e.currentTarget.querySelector("img").style.transform = "scale(1.08)";
              e.currentTarget.querySelector(".cat-overlay").style.opacity = "1";
              e.currentTarget.style.borderColor = c.color;
              e.currentTarget.style.boxShadow = `0 0 24px ${c.color}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector("img").style.transform = "scale(1)";
              e.currentTarget.querySelector(".cat-overlay").style.opacity = "0";
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <img src={c.img} alt={c.label} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s ease" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(7,7,10,0.9) 0%, rgba(7,7,10,0.3) 50%, transparent 100%)" }} />
              <div className="cat-overlay" style={{ position:"absolute", inset:0, background:`${c.color}18`, opacity:0, transition:"opacity 0.3s" }} />
              <div style={{ position:"absolute", bottom:"1.25rem", left:"1rem", right:"1rem", textAlign:"center" }}>
                <p style={{ fontFamily:"var(--serif)", fontSize:"1.1rem", fontWeight:600, color:"var(--t1)", lineHeight:1.2 }}>{c.label}</p>
                <p style={{ fontSize:"0.65rem", color:"var(--t3)", marginTop:"3px", letterSpacing:"0.1em" }}>{c.bn}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
