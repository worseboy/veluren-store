export default function Footer() {
  return (
    <footer style={{ background:"var(--bg1)", borderTop:"1px solid var(--line)" }}>

      {/* Newsletter band */}
      <div style={{ background:"linear-gradient(135deg,rgba(20,14,40,0.8),rgba(14,20,40,0.8))", borderBottom:"1px solid var(--line)", padding:"2.5rem 2rem" }}>
        <div style={{ maxWidth:"1440px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"2rem", flexWrap:"wrap" }}>
          <div>
            <p style={{ fontFamily:"var(--serif)", fontSize:"1.3rem", fontWeight:400, color:"var(--t1)", marginBottom:"4px" }}>নিউজলেটার সাবস্ক্রাইব করুন</p>
            <p style={{ fontSize:"0.78rem", color:"var(--t4)" }}>নতুন কালেকশন ও এক্সক্লুসিভ অফার সবার আগে পান</p>
          </div>
          <div style={{ display:"flex", flexShrink:0 }}>
            <input type="email" placeholder="আপনার ইমেইল দিন"
              style={{ padding:"0.85rem 1.25rem", background:"var(--bg3)", border:"1px solid var(--line)", borderRight:"none", color:"var(--t1)", fontSize:"0.82rem", outline:"none", width:"260px", fontFamily:"var(--sans)" }}
              onFocus={e=>e.target.style.borderColor="var(--g2)"}
              onBlur={e=>e.target.style.borderColor="var(--line)"}
            />
            <button className="btn-gold" style={{ padding:"0.85rem 1.5rem", fontSize:"0.68rem", whiteSpace:"nowrap", borderRadius:0 }}>সাবস্ক্রাইব</button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth:"1440px", margin:"0 auto", padding:"4rem 2rem 3rem", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"3rem" }}>
        <div>
          <h3 style={{ fontFamily:"var(--serif)", fontSize:"2rem", fontWeight:700, letterSpacing:"0.08em", marginBottom:"1rem" }}>
            <span className="gold-text">VELUREN</span>
          </h3>
          <p style={{ fontSize:"0.82rem", lineHeight:1.85, color:"var(--t4)", maxWidth:"260px", marginBottom:"2rem", fontWeight:300 }}>
            আধুনিক ফ্যাশনের সাথে সাশ্রয়ী মূল্যের নিখুঁত সমন্বয়। প্রতিটি পণ্যে আমাদের প্রতিশ্রুতি — মান, স্টাইল ও আরাম।
          </p>
          <div style={{ display:"flex", gap:"8px", marginBottom:"2rem" }}>
            {[["📘","FB"],["📸","IG"],["▶️","YT"],["🐦","TW"]].map(([icon,label])=>(
              <button key={label} title={label} style={{ width:"38px", height:"38px", borderRadius:"50%", border:"1px solid var(--line)", background:"var(--bg3)", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--g2)";e.currentTarget.style.background="rgba(212,168,75,0.08)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--line)";e.currentTarget.style.background="var(--bg3)";}}
              >{icon}</button>
            ))}
          </div>
          {[["📞","01XXXXXXXXX"],["💬","01XXXXXXXXX (WhatsApp)"],["✉️","support@veluren.com.bd"]].map(([ico,txt])=>(
            <p key={txt} style={{ fontSize:"0.75rem", color:"var(--t4)", display:"flex", gap:"8px", marginBottom:"6px" }}><span>{ico}</span><span>{txt}</span></p>
          ))}
        </div>

        {[
          { title:"শপিং", links:["নতুন পণ্য","মেয়েদের পোশাক","ছেলেদের পোশাক","অ্যাকসেসরিজ","জুতা","সেল / অফার"] },
          { title:"সাহায্য", links:["FAQ","অর্ডার ট্র্যাক","রিটার্ন পলিসি","ডেলিভারি","সাইজ গাইড","যোগাযোগ"] },
          { title:"কোম্পানি", links:["আমাদের সম্পর্কে","ব্লগ","ক্যারিয়ার","প্রেস","Terms","Privacy"] },
        ].map(col=>(
          <div key={col.title}>
            <p style={{ fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--g2)", marginBottom:"1.5rem", fontWeight:600 }}>{col.title}</p>
            {col.links.map(l=>(
              <p key={l} style={{ fontSize:"0.8rem", color:"var(--t4)", marginBottom:"0.75rem", cursor:"pointer", transition:"color 0.2s", fontWeight:300 }}
                onMouseEnter={e=>e.target.style.color="var(--g2)"}
                onMouseLeave={e=>e.target.style.color="var(--t4)"}
              >{l}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ borderTop:"1px solid var(--line)", padding:"1.5rem 2rem" }}>
        <div style={{ maxWidth:"1440px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <p style={{ fontSize:"0.68rem", color:"var(--t4)" }}>© 2025 VELUREN Bangladesh. সর্বস্বত্ব সংরক্ষিত।</p>
          <div style={{ display:"flex", gap:"6px", alignItems:"center", flexWrap:"wrap" }}>
            {[["bKash","#E2136E"],["Nagad","#F06F23"],["Rocket","#8B1D8E"],["VISA","#1A4B8E"],["MC","#EB001B"],["COD","#2DD4B4"]].map(([n,c])=>(
              <span key={n} style={{ fontSize:"0.58rem", fontWeight:700, padding:"3px 8px", background:c, color:"#fff", borderRadius:"2px", letterSpacing:"0.04em" }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
