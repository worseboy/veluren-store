import { DELIVERY_FEE, FREE_DELIVERY } from "../App";

export default function Cart({ open, onClose, cart, remove, updateQty, onCheckout }) {
  const sub  = cart.reduce((a,i) => a + i.price*i.qty, 0);
  const del  = sub >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  const total= sub + del;
  const rem  = FREE_DELIVERY - sub;

  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200, backdropFilter:"blur(6px)", animation:"fadeIn 0.2s" }} />}

      <aside style={{
        position:"fixed", top:0, right:0, bottom:0, width:"min(460px,100vw)",
        background:"rgba(10,10,14,0.98)", backdropFilter:"blur(30px)",
        borderLeft:"1px solid var(--line)", zIndex:201,
        display:"flex", flexDirection:"column",
        transform: open?"translateX(0)":"translateX(100%)",
        transition:"transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        boxShadow:"-16px 0 64px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.5rem 1.75rem", borderBottom:"1px solid var(--line)" }}>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"1.5rem", fontWeight:400, color:"var(--t1)" }}>
            Shopping Cart {cart.length>0 && <span style={{ fontFamily:"var(--sans)", fontSize:"0.85rem", color:"var(--t4)" }}>({cart.reduce((a,i)=>a+i.qty,0)})</span>}
          </h2>
          <button onClick={onClose} style={{ width:"36px", height:"36px", border:"1px solid var(--line)", borderRadius:"50%", fontSize:"0.9rem", color:"var(--t3)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--rose)";e.currentTarget.style.color="var(--rose)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--line)";e.currentTarget.style.color="var(--t3)";}}
          >✕</button>
        </div>

        {/* Free delivery progress */}
        {cart.length > 0 && (
          <div style={{ padding:"0.75rem 1.75rem", background:"var(--bg2)", borderBottom:"1px solid var(--line)" }}>
            {rem > 0 ? <>
              <p style={{ fontSize:"0.7rem", color:"var(--t4)", marginBottom:"6px" }}>আরও <strong style={{ color:"var(--g3)" }}>৳{rem.toLocaleString()}</strong> কিনলে ফ্রি ডেলিভারি!</p>
              <div style={{ height:"2px", background:"var(--line)", borderRadius:"1px", overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${Math.min((sub/FREE_DELIVERY)*100,100)}%`, background:"var(--gold-grad2)", borderRadius:"1px", transition:"width 0.4s" }} />
              </div>
            </> : <p style={{ fontSize:"0.7rem", color:"var(--teal)", fontWeight:600, textAlign:"center" }}>🎉 ফ্রি ডেলিভারি পেয়েছেন!</p>}
          </div>
        )}

        {/* Items */}
        <div style={{ flex:1, overflowY:"auto", padding:"1.5rem 1.75rem" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign:"center", paddingTop:"5rem" }}>
              <p style={{ fontSize:"3rem", marginBottom:"1.25rem", animation:"float 3s ease infinite" }}>🛒</p>
              <p style={{ fontFamily:"var(--serif)", fontSize:"1.4rem", color:"var(--t4)" }}>Cart খালি আছে</p>
              <p style={{ fontSize:"0.78rem", color:"var(--t4)", marginTop:"0.5rem" }}>পছন্দের পণ্য যোগ করুন</p>
            </div>
          ) : cart.map(item => (
            <div key={item.key} style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid var(--line)" }}>
              <div style={{ width:"86px", height:"108px", flexShrink:0, overflow:"hidden", background:"var(--bg3)", border:"1px solid var(--line)" }}>
                <img src={item.image} alt={item.namebn} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:"var(--serif)", fontSize:"0.95rem", color:"var(--t1)", lineHeight:1.3, marginBottom:"4px" }}>{item.namebn}</p>
                <div style={{ display:"flex", gap:"6px", marginBottom:"8px" }}>
                  <span style={{ fontSize:"0.65rem", color:"var(--t4)", background:"var(--bg3)", border:"1px solid var(--line)", padding:"2px 7px" }}>Size: {item.size}</span>
                  <span style={{ width:"13px", height:"13px", borderRadius:"50%", background:item.color.hex, border:"1px solid rgba(255,255,255,0.12)", flexShrink:0, display:"inline-block" }} />
                </div>
                <p className="gold-text" style={{ fontSize:"0.95rem", fontWeight:700, marginBottom:"10px" }}>৳ {(item.price*item.qty).toLocaleString()}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", border:"1px solid var(--line)", background:"var(--bg3)" }}>
                    <button onClick={()=>updateQty(item.key,item.qty-1)} style={{ width:"30px", height:"28px", fontSize:"1rem", color:"var(--t3)", background:"none", border:"none", cursor:"pointer", transition:"color 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.color="var(--rose)"}
                      onMouseLeave={e=>e.currentTarget.style.color="var(--t3)"}
                    >−</button>
                    <span style={{ width:"28px", textAlign:"center", fontSize:"0.85rem", fontWeight:700, color:"var(--t1)", lineHeight:"28px" }}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.key,item.qty+1)} style={{ width:"30px", height:"28px", fontSize:"1rem", color:"var(--t3)", background:"none", border:"none", cursor:"pointer", transition:"color 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.color="var(--g2)"}
                      onMouseLeave={e=>e.currentTarget.style.color="var(--t3)"}
                    >+</button>
                  </div>
                  <button onClick={()=>remove(item.key)} style={{ fontSize:"0.68rem", color:"var(--rose)", background:"none", border:"none", cursor:"pointer", fontWeight:500 }}>সরান ✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding:"1.5rem 1.75rem", borderTop:"1px solid var(--line)", background:"rgba(14,14,20,0.98)" }}>
            {[["সাবটোটাল",`৳ ${sub.toLocaleString()}`,"var(--t3)"],["ডেলিভারি", del===0?"ফ্রি 🎉":`৳ ${del}`, del===0?"var(--teal)":"var(--t3)"]].map(([k,v,c])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem", marginBottom:"0.5rem" }}>
                <span style={{ color:"var(--t4)" }}>{k}</span><span style={{ color:c }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop:"1px solid var(--line)", paddingTop:"1rem", marginBottom:"1.25rem", display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontFamily:"var(--serif)", fontSize:"1.1rem", color:"var(--t1)" }}>মোট</span>
              <span className="gold-text" style={{ fontFamily:"var(--serif)", fontSize:"1.5rem", fontWeight:700 }}>৳ {total.toLocaleString()}</span>
            </div>
            <button onClick={onCheckout} className="btn-gold" style={{ width:"100%", marginBottom:"0.75rem", padding:"1.1rem", fontSize:"0.78rem" }}>অর্ডার করুন →</button>
            <button onClick={onClose} className="btn-ghost" style={{ width:"100%", padding:"0.8rem", fontSize:"0.7rem" }}>কেনাকাটা চালিয়ে যান</button>
          </div>
        )}
      </aside>
    </>
  );
}
