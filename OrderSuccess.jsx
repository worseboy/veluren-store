export function OrderSuccess({ order, onContinue }) {
  return (
    <div style={{ background:"var(--bg0)", minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"3rem 1.5rem" }}>
      <div style={{ maxWidth:"580px", width:"100%", textAlign:"center" }}>

        {/* Ring */}
        <div style={{ position:"relative", width:"96px", height:"96px", margin:"0 auto 2rem", animation:"scaleIn 0.5s 0.1s both" }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"var(--gold-grad2)", opacity:0.12, animation:"pulse 2.5s infinite" }} />
          <div style={{ position:"absolute", inset:"5px", borderRadius:"50%", border:"2px solid var(--g2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span className="gold-text" style={{ fontSize:"2.2rem" }}>✓</span>
          </div>
        </div>

        <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,5vw,3rem)", fontWeight:300, marginBottom:"1rem", animation:"fadeUp 0.5s 0.2s both" }}>
          অর্ডার <em className="gold-text" style={{ fontStyle:"italic", fontWeight:600 }}>সফল!</em>
        </h1>
        <p style={{ fontSize:"0.9rem", color:"var(--t3)", lineHeight:1.8, marginBottom:"2.5rem", animation:"fadeUp 0.5s 0.3s both" }}>
          আপনার অর্ডার গ্রহণ করা হয়েছে। শীঘ্রই কনফার্মেশনের জন্য কল করা হবে।
        </p>

        {/* Card */}
        <div style={{ background:"var(--bg2)", border:"1px solid rgba(212,168,75,0.25)", borderLeft:"4px solid var(--g2)", padding:"1.75rem 2rem", marginBottom:"2rem", textAlign:"left", animation:"fadeUp 0.5s 0.4s both", boxShadow:"var(--gold-glow)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <span style={{ fontSize:"0.62rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--t4)", fontWeight:600 }}>অর্ডার আইডি</span>
            <span className="gold-text" style={{ fontFamily:"var(--serif)", fontSize:"1.3rem", fontWeight:700 }}>#{order.orderId}</span>
          </div>
          {[["নাম",order.customer.name],["ফোন",order.customer.phone],["ঠিকানা",order.customer.address],["মোট",`৳ ${order.total.toLocaleString()}`],["পেমেন্ট",order.payMethod.toUpperCase()]].map(([k,v])=>(
            <div key={k} style={{ display:"flex", gap:"12px", padding:"0.4rem 0", borderBottom:"1px solid var(--line)" }}>
              <span style={{ fontSize:"0.72rem", color:"var(--t4)", minWidth:"72px", flexShrink:0 }}>{k}:</span>
              <span style={{ fontSize:"0.8rem", color:"var(--t1)", fontWeight:500 }}>{v}</span>
            </div>
          ))}
          {order.txn && (
            <div style={{ display:"flex", gap:"12px", paddingTop:"0.4rem" }}>
              <span style={{ fontSize:"0.72rem", color:"var(--t4)", minWidth:"72px" }}>TXN:</span>
              <span className="gold-text" style={{ fontSize:"0.8rem", fontWeight:600 }}>{order.txn}</span>
            </div>
          )}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem", marginBottom:"2.5rem", animation:"fadeUp 0.5s 0.5s both" }}>
          {[["🚚","২–৩ দিনে","ডেলিভারি"],["📞","কনফার্ম","কল পাবেন"],["↩️","৩০ দিন","রিটার্ন"]].map(([ico,t1,t2])=>(
            <div key={t1} style={{ background:"var(--bg2)", border:"1px solid var(--line)", padding:"1.25rem 0.75rem" }}>
              <p style={{ fontSize:"1.4rem", marginBottom:"6px" }}>{ico}</p>
              <p style={{ fontSize:"0.75rem", fontWeight:600, color:"var(--t2)" }}>{t1}</p>
              <p style={{ fontSize:"0.65rem", color:"var(--t4)", marginTop:"2px" }}>{t2}</p>
            </div>
          ))}
        </div>

        <button onClick={onContinue} className="btn-gold" style={{ animation:"fadeUp 0.5s 0.6s both", fontSize:"0.78rem" }}>
          কেনাকাটা চালিয়ে যান →
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
