import { useState } from "react";
import { DELIVERY_FEE, FREE_DELIVERY } from "../App";

const DISTRICTS = ["ঢাকা","চট্টগ্রাম","সিলেট","রাজশাহী","খুলনা","বরিশাল","রংপুর","ময়মনসিংহ","কুমিল্লা","নারায়ণগঞ্জ","গাজীপুর","টাঙ্গাইল","ফরিদপুর","যশোর","নোয়াখালী","বগুড়া","দিনাজপুর","পাবনা","নাটোর","সিরাজগঞ্জ","অন্যান্য"];
const DIVISIONS = ["ঢাকা বিভাগ","চট্টগ্রাম বিভাগ","রাজশাহী বিভাগ","খুলনা বিভাগ","বরিশাল বিভাগ","সিলেট বিভাগ","রংপুর বিভাগ","ময়মনসিংহ বিভাগ"];

const PAY_METHODS = [
  { id:"bkash",  name:"bKash",                  icon:"🟣", color:"#E2136E", num:"01XXXXXXXXX", hasId:true  },
  { id:"nagad",  name:"Nagad",                  icon:"🟠", color:"#F06F23", num:"01XXXXXXXXX", hasId:true  },
  { id:"rocket", name:"Rocket",                 icon:"💜", color:"#8B1D8E", num:"01XXXXXXXXX", hasId:true  },
  { id:"cod",    name:"Cash on Delivery",        icon:"💵", color:"#2DD4B4", num:null,          hasId:false },
  { id:"card",   name:"ডেবিট / ক্রেডিট কার্ড", icon:"💳", color:"#4A90D9", num:null,          hasId:false, isCard:true },
];

export default function Checkout({ cart, onBack, onDone }) {
  const sub   = cart.reduce((a,i) => a + i.price*i.qty, 0);
  const del   = sub >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  const total = sub + del;

  const [step, setStep] = useState(1);
  const [pay,  setPay]  = useState(null);
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState({});

  const [f, setF] = useState({ name:"",phone:"",email:"",alt:"",div:"",dist:"",thana:"",addr:"",zip:"",note:"",txn:"",cnum:"",cexp:"",ccvv:"" });
  const set = (k,v) => { setF(p=>({...p,[k]:v})); setErr(e=>({...e,[k]:""})); };

  const v1 = () => {
    const e={};
    if(!f.name.trim())              e.name="নাম দিন";
    if(!/^01[3-9]\d{8}$/.test(f.phone)) e.phone="সঠিক নম্বর দিন";
    if(!f.dist)                     e.dist="জেলা বেছে নিন";
    if(!f.thana.trim())             e.thana="থানা দিন";
    if(!f.addr.trim())              e.addr="ঠিকানা দিন";
    setErr(e); return !Object.keys(e).length;
  };
  const v2 = () => {
    const e={};
    if(!pay){e.pay="পেমেন্ট পদ্ধতি বেছে নিন";setErr(e);return false;}
    const pm=PAY_METHODS.find(p=>p.id===pay);
    if(pm.hasId && !f.txn.trim())              e.txn="Transaction ID দিন";
    if(pm.isCard){
      if(!/^\d{16}$/.test(f.cnum.replace(/\s/g,""))) e.cnum="সঠিক কার্ড নম্বর";
      if(!/^\d{2}\/\d{2}$/.test(f.cexp))              e.cexp="MM/YY ফরম্যাট";
      if(!/^\d{3,4}$/.test(f.ccvv))                   e.ccvv="CVV দিন";
    }
    setErr(e); return !Object.keys(e).length;
  };

  const confirm = async () => {
    setBusy(true);
    await new Promise(r=>setTimeout(r,1800));
    setBusy(false);
    onDone({ orderId:"VL"+Date.now().toString().slice(-8), customer:{name:f.name,phone:f.phone,address:`${f.addr}, ${f.thana}, ${f.dist}`}, items:cart, total, payMethod:pay, txn:f.txn });
  };

  // Styled input
  const inp = (k, ph, type="text", extra={}) => (
    <input type={type} placeholder={ph} value={f[k]}
      onChange={e=>set(k,e.target.value)}
      style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg3)", border:`1px solid ${err[k]?"var(--rose)":"var(--line)"}`, color:"var(--t1)", fontSize:"0.85rem", borderRadius:"2px", outline:"none", transition:"border-color 0.2s", ...extra }}
      onFocus={e=>e.target.style.borderColor="var(--g2)"}
      onBlur={e=>e.target.style.borderColor=err[k]?"var(--rose)":"var(--line)"}
    />
  );
  const lbl = (text) => <label style={{ display:"block", fontSize:"0.62rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--t4)", fontWeight:600, marginBottom:"6px" }}>{text}</label>;
  const ferr = (k) => err[k] && <p style={{ fontSize:"0.65rem", color:"var(--rose)", marginTop:"4px" }}>{err[k]}</p>;
  const field = (k, label, ph, span=1, type="text") => (
    <div style={{ gridColumn:`span ${span}` }}>
      {lbl(label)}{inp(k,ph,type)}{ferr(k)}
    </div>
  );

  const cardStyle = { background:"var(--bg2)", border:"1px solid var(--line)", padding:"2.5rem", boxShadow:"0 4px 32px rgba(0,0,0,0.3)" };
  const stepDot = (n) => (
    <div style={{ width:"32px", height:"32px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontWeight:700,
      background: step>=n ? "var(--gold-grad2)" : "var(--bg3)",
      color: step>=n ? "var(--bg0)" : "var(--t4)",
      border:`1px solid ${step>=n?"transparent":"var(--line)"}`,
      transition:"all 0.3s",
    }}>{step>n?"✓":n}</div>
  );

  return (
    <div style={{ background:"var(--bg0)", minHeight:"100vh", padding:"3rem 1.5rem 5rem" }}>
      <div style={{ maxWidth:"1140px", margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2.5rem" }}>
          <button onClick={onBack} style={{ fontSize:"0.72rem", color:"var(--t4)", background:"none", border:"none", cursor:"pointer", transition:"color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.color="var(--g2)"}
            onMouseLeave={e=>e.currentTarget.style.color="var(--t4)"}
          >← ফিরে যান</button>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"2rem", fontWeight:400 }}>
            <span className="gold-text">Checkout</span>
          </h1>
        </div>

        {/* Step bar */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:"3rem" }}>
          {[["1","তথ্য"],["2","পেমেন্ট"],["3","কনফার্ম"]].map(([n,l],i)=>(
            <div key={n} style={{ display:"flex", alignItems:"center", flex:i<2?1:"auto" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                {stepDot(+n)}
                <span style={{ fontSize:"0.72rem", fontWeight:500, color:step>=+n?"var(--g2)":"var(--t4)", letterSpacing:"0.08em" }}>{l}</span>
              </div>
              {i<2 && <div style={{ flex:1, height:"1px", background:step>i+1?"var(--g2)":"var(--line)", margin:"0 1rem", transition:"background 0.3s" }} />}
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:"2rem", alignItems:"start" }}>

          {/* FORM */}
          <div style={cardStyle}>

            {/* ── STEP 1 ── */}
            {step===1 && (
              <div style={{ animation:"fadeIn 0.3s" }}>
                <h2 style={{ fontFamily:"var(--serif)", fontSize:"1.5rem", fontWeight:400, color:"var(--t1)", marginBottom:"2rem" }}>আপনার তথ্য</h2>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem", marginBottom:"1.2rem" }}>
                  {field("name","পুরো নাম *","আপনার নাম")}
                  {field("phone","ফোন নম্বর *","01XXXXXXXXX")}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem", marginBottom:"1.2rem" }}>
                  {field("email","ইমেইল (ঐচ্ছিক)","email@example.com")}
                  {field("alt","বিকল্প নম্বর","01XXXXXXXXX")}
                </div>
                <div style={{ height:"1px", background:"var(--line)", margin:"1.5rem 0" }} />
                <p style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--g2)", fontWeight:600, marginBottom:"1.5rem" }}>ডেলিভারি ঠিকানা</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem", marginBottom:"1.2rem" }}>
                  <div>
                    {lbl("বিভাগ")}
                    <select value={f.div} onChange={e=>set("div",e.target.value)}
                      style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg3)", border:"1px solid var(--line)", color:f.div?"var(--t1)":"var(--t4)", fontSize:"0.85rem", outline:"none", appearance:"none" }}
                      onFocus={e=>e.target.style.borderColor="var(--g2)"} onBlur={e=>e.target.style.borderColor="var(--line)"}>
                      <option value="">বিভাগ বেছে নিন</option>
                      {DIVISIONS.map(d=><option key={d} value={d} style={{background:"var(--bg3)"}}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    {lbl("জেলা *")}
                    <select value={f.dist} onChange={e=>set("dist",e.target.value)}
                      style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg3)", border:`1px solid ${err.dist?"var(--rose)":"var(--line)"}`, color:f.dist?"var(--t1)":"var(--t4)", fontSize:"0.85rem", outline:"none", appearance:"none" }}
                      onFocus={e=>e.target.style.borderColor="var(--g2)"} onBlur={e=>e.target.style.borderColor=err.dist?"var(--rose)":"var(--line)"}>
                      <option value="">জেলা বেছে নিন</option>
                      {DISTRICTS.map(d=><option key={d} value={d} style={{background:"var(--bg3)"}}>{d}</option>)}
                    </select>
                    {ferr("dist")}
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem", marginBottom:"1.2rem" }}>
                  {field("thana","থানা / উপজেলা *","থানার নাম")}
                  {field("zip","পোস্ট কোড","1200")}
                </div>
                <div style={{ marginBottom:"1.2rem" }}>
                  {lbl("বিস্তারিত ঠিকানা *")}
                  <textarea placeholder="বাড়ি নং / রাস্তা নং / এলাকা" value={f.addr} onChange={e=>set("addr",e.target.value)}
                    style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg3)", border:`1px solid ${err.addr?"var(--rose)":"var(--line)"}`, color:"var(--t1)", fontSize:"0.85rem", outline:"none", minHeight:"80px", resize:"vertical", fontFamily:"var(--sans)" }}
                    onFocus={e=>e.target.style.borderColor="var(--g2)"} onBlur={e=>e.target.style.borderColor=err.addr?"var(--rose)":"var(--line)"}
                  />
                  {ferr("addr")}
                </div>
                <div style={{ marginBottom:"2rem" }}>
                  {lbl("অর্ডার নোট (ঐচ্ছিক)")}
                  <textarea placeholder="বিশেষ নির্দেশনা..." value={f.note} onChange={e=>set("note",e.target.value)}
                    style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg3)", border:"1px solid var(--line)", color:"var(--t1)", fontSize:"0.85rem", outline:"none", minHeight:"60px", resize:"vertical", fontFamily:"var(--sans)" }}
                    onFocus={e=>e.target.style.borderColor="var(--g2)"} onBlur={e=>e.target.style.borderColor="var(--line)"}
                  />
                </div>
                <button onClick={()=>{if(v1())setStep(2);}} className="btn-gold" style={{ width:"100%", padding:"1.1rem", fontSize:"0.78rem" }}>পেমেন্ট পদ্ধতি বেছে নিন →</button>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step===2 && (
              <div style={{ animation:"fadeIn 0.3s" }}>
                <h2 style={{ fontFamily:"var(--serif)", fontSize:"1.5rem", color:"var(--t1)", marginBottom:"0.5rem" }}>পেমেন্ট পদ্ধতি</h2>
                <p style={{ fontSize:"0.8rem", color:"var(--t4)", marginBottom:"2rem" }}>মোট পরিমাণ: <span className="gold-text" style={{ fontWeight:700, fontSize:"1rem" }}>৳ {total.toLocaleString()}</span></p>

                {err.pay && <p style={{ fontSize:"0.78rem", color:"var(--rose)", marginBottom:"1rem", padding:"0.75rem 1rem", background:"rgba(212,96,122,0.1)", border:"1px solid rgba(212,96,122,0.3)" }}>⚠️ {err.pay}</p>}

                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", marginBottom:"2rem" }}>
                  {PAY_METHODS.map(pm => (
                    <div key={pm.id} onClick={()=>{setPay(pm.id);setErr(e=>({...e,pay:""}));}} style={{
                      border:`1.5px solid ${pay===pm.id?pm.color:"var(--line)"}`,
                      background: pay===pm.id ? `${pm.color}0F` : "var(--bg3)",
                      padding:"1.1rem 1.25rem", cursor:"pointer", transition:"all 0.2s",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                        <div style={{ width:"18px", height:"18px", borderRadius:"50%", border:`2px solid ${pay===pm.id?pm.color:"var(--line2)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          {pay===pm.id && <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:pm.color }} />}
                        </div>
                        <span style={{ fontSize:"1rem" }}>{pm.icon}</span>
                        <span style={{ fontSize:"0.88rem", fontWeight:600, color:pay===pm.id?pm.color:"var(--t2)" }}>{pm.name}</span>
                        {pm.num && <span style={{ marginLeft:"auto", fontSize:"0.72rem", color:"var(--t4)" }}>{pm.num}</span>}
                      </div>

                      {pay===pm.id && (
                        <div style={{ marginTop:"1rem", marginLeft:"42px", animation:"fadeIn 0.2s" }}>
                          {pm.num && (
                            <div style={{ background:"var(--bg2)", border:`1px solid ${pm.color}`, padding:"0.85rem 1rem", marginBottom:"1rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div>
                                <p style={{ fontSize:"0.6rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--t4)", marginBottom:"3px" }}>{pm.name} নম্বর</p>
                                <p style={{ fontSize:"1.2rem", fontWeight:700, color:pm.color, letterSpacing:"0.06em" }}>{pm.num}</p>
                              </div>
                              <button onClick={()=>navigator.clipboard?.writeText(pm.num)} style={{ fontSize:"0.65rem", color:pm.color, border:`1px solid ${pm.color}`, padding:"5px 12px", background:"transparent", cursor:"pointer" }}>Copy</button>
                            </div>
                          )}
                          {pm.hasId && <>
                            {lbl("Transaction ID *")}
                            {inp("txn","TXN ID এখানে দিন")}
                            {ferr("txn")}
                          </>}
                          {pm.isCard && (
                            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                              <div>
                                {lbl("কার্ড নম্বর *")}
                                <input value={f.cnum} placeholder="1234 5678 9012 3456"
                                  onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,16);set("cnum",v.replace(/(.{4})/g,"$1 ").trim());}}
                                  style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg2)", border:`1px solid ${err.cnum?"var(--rose)":"var(--line)"}`, color:"var(--t1)", fontSize:"0.85rem", outline:"none", letterSpacing:"0.1em" }}
                                  onFocus={e=>e.target.style.borderColor=pm.color} onBlur={e=>e.target.style.borderColor=err.cnum?"var(--rose)":"var(--line)"}
                                />
                                {ferr("cnum")}
                              </div>
                              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                                <div>
                                  {lbl("Expiry *")}
                                  <input value={f.cexp} placeholder="MM/YY" maxLength={5}
                                    onChange={e=>{let v=e.target.value.replace(/\D/g,"");if(v.length>=2)v=v.slice(0,2)+"/"+v.slice(2,4);set("cexp",v);}}
                                    style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg2)", border:`1px solid ${err.cexp?"var(--rose)":"var(--line)"}`, color:"var(--t1)", fontSize:"0.85rem", outline:"none" }}
                                    onFocus={e=>e.target.style.borderColor=pm.color} onBlur={e=>e.target.style.borderColor=err.cexp?"var(--rose)":"var(--line)"}
                                  />
                                  {ferr("cexp")}
                                </div>
                                <div>
                                  {lbl("CVV *")}
                                  <input type="password" value={f.ccvv} placeholder="123" maxLength={4}
                                    onChange={e=>set("ccvv",e.target.value.replace(/\D/g,"").slice(0,4))}
                                    style={{ width:"100%", padding:"0.8rem 1rem", background:"var(--bg2)", border:`1px solid ${err.ccvv?"var(--rose)":"var(--line)"}`, color:"var(--t1)", fontSize:"0.85rem", outline:"none" }}
                                    onFocus={e=>e.target.style.borderColor=pm.color} onBlur={e=>e.target.style.borderColor=err.ccvv?"var(--rose)":"var(--line)"}
                                  />
                                  {ferr("ccvv")}
                                </div>
                              </div>
                            </div>
                          )}
                          {pm.id==="cod" && <p style={{ fontSize:"0.8rem", color:"var(--t3)", lineHeight:1.7 }}>পণ্য হাতে পেলে ডেলিভারি ম্যানকে <strong style={{color:"var(--teal)"}}>৳{total.toLocaleString()}</strong> ক্যাশে দিন।</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display:"flex", gap:"1rem" }}>
                  <button onClick={()=>setStep(1)} className="btn-ghost" style={{ padding:"1rem 1.5rem", fontSize:"0.72rem" }}>← ফিরে</button>
                  <button onClick={()=>{if(v2())setStep(3);}} className="btn-gold" style={{ flex:1, padding:"1rem", fontSize:"0.78rem" }}>রিভিউ করুন →</button>
                </div>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step===3 && (
              <div style={{ animation:"fadeIn 0.3s" }}>
                <h2 style={{ fontFamily:"var(--serif)", fontSize:"1.5rem", color:"var(--t1)", marginBottom:"2rem" }}>অর্ডার রিভিউ</h2>

                {[
                  { title:"ডেলিভারি তথ্য", step:1, body: <><p style={{fontSize:"0.88rem",fontWeight:600,color:"var(--t1)"}}>{f.name} — {f.phone}</p><p style={{fontSize:"0.8rem",color:"var(--t3)",marginTop:"2px"}}>{f.addr}, {f.thana}, {f.dist}</p>{f.note&&<p style={{fontSize:"0.75rem",color:"var(--t4)",marginTop:"4px",fontStyle:"italic"}}>নোট: {f.note}</p>}</> },
                  { title:"পেমেন্ট", step:2, body: <><p style={{fontSize:"0.88rem",fontWeight:600,color:"var(--t1)"}}>{PAY_METHODS.find(p=>p.id===pay)?.icon} {PAY_METHODS.find(p=>p.id===pay)?.name}</p>{f.txn&&<p style={{fontSize:"0.75rem",color:"var(--t3)",marginTop:"2px"}}>TXN: {f.txn}</p>}</> },
                ].map(s=>(
                  <div key={s.title} style={{ background:"var(--bg3)", border:"1px solid var(--line)", borderLeft:"3px solid var(--g2)", padding:"1.25rem", marginBottom:"1rem" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                      <p style={{ fontSize:"0.62rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--t4)", fontWeight:600 }}>{s.title}</p>
                      <button onClick={()=>setStep(s.step)} style={{ fontSize:"0.65rem", color:"var(--g2)", background:"none", border:"none", cursor:"pointer", textDecoration:"underline" }}>সম্পাদনা</button>
                    </div>
                    {s.body}
                  </div>
                ))}

                <div style={{ marginBottom:"2rem" }}>
                  {cart.map(item=>(
                    <div key={item.key} style={{ display:"flex", gap:"12px", padding:"0.75rem 0", borderBottom:"1px solid var(--line)", alignItems:"center" }}>
                      <img src={item.image} alt="" style={{ width:"52px", height:"66px", objectFit:"cover", flexShrink:0, border:"1px solid var(--line)" }} />
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:"0.82rem", color:"var(--t1)", fontWeight:500 }}>{item.namebn}</p>
                        <p style={{ fontSize:"0.68rem", color:"var(--t4)", marginTop:"2px" }}>Size: {item.size} · Qty: {item.qty}</p>
                      </div>
                      <span className="gold-text" style={{ fontSize:"0.88rem", fontWeight:700, flexShrink:0 }}>৳{(item.price*item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize:"0.7rem", color:"var(--t4)", lineHeight:1.7, marginBottom:"1.5rem", padding:"1rem", background:"var(--bg3)", border:"1px solid var(--line)" }}>
                  🔒 অর্ডার দিলে আমাদের Terms & Conditions ও Privacy Policy তে সম্মতি দিচ্ছেন।
                </p>

                <div style={{ display:"flex", gap:"1rem" }}>
                  <button onClick={()=>setStep(2)} className="btn-ghost" style={{ padding:"1rem 1.5rem", fontSize:"0.72rem" }}>← ফিরে</button>
                  <button onClick={confirm} disabled={busy} style={{
                    flex:1, padding:"1rem",
                    background: busy ? "var(--bg4)" : "var(--gold-grad2)",
                    color:"var(--bg0)", fontSize:"0.82rem", fontWeight:700,
                    letterSpacing:"0.12em", textTransform:"uppercase",
                    border:"none", cursor:busy?"not-allowed":"pointer", transition:"all 0.2s",
                  }}>
                    {busy ? (
                      <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                        <span style={{ width:"16px", height:"16px", border:"2px solid var(--bg0)", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite", display:"inline-block" }} />
                        অর্ডার পাঠানো হচ্ছে...
                      </span>
                    ) : "✓ অর্ডার কনফার্ম করুন"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div style={{ background:"var(--bg2)", border:"1px solid var(--line)", padding:"2rem", position:"sticky", top:"90px", boxShadow:"0 4px 32px rgba(0,0,0,0.3)" }}>
            <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.15rem", fontWeight:400, color:"var(--t1)", marginBottom:"1.5rem", paddingBottom:"1rem", borderBottom:"1px solid var(--line)" }}>অর্ডার সারসংক্ষেপ</h3>
            {cart.map(item=>(
              <div key={item.key} style={{ display:"flex", gap:"10px", marginBottom:"1rem" }}>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <img src={item.image} alt="" style={{ width:"52px", height:"65px", objectFit:"cover", border:"1px solid var(--line)" }} />
                  <span style={{ position:"absolute", top:"-5px", right:"-5px", background:"var(--g2)", color:"var(--bg0)", borderRadius:"50%", width:"17px", height:"17px", fontSize:"0.58rem", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{item.qty}</span>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:"0.78rem", color:"var(--t1)", fontWeight:500, lineHeight:1.3, marginBottom:"2px" }}>{item.namebn}</p>
                  <p style={{ fontSize:"0.65rem", color:"var(--t4)" }}>{item.size}</p>
                </div>
                <span className="gold-text" style={{ fontSize:"0.82rem", fontWeight:700, flexShrink:0 }}>৳{(item.price*item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop:"1px solid var(--line)", paddingTop:"1rem", marginTop:"1rem" }}>
              {[["সাবটোটাল",`৳ ${sub.toLocaleString()}`,"var(--t3)"],["ডেলিভারি",del===0?"ফ্রি 🎉":`৳ ${del}`,del===0?"var(--teal)":"var(--t3)"]].map(([k,v,c])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem", marginBottom:"0.5rem" }}>
                  <span style={{ color:"var(--t4)" }}>{k}</span><span style={{ color:c }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid var(--line)", paddingTop:"0.85rem", marginTop:"0.85rem", display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"var(--serif)", fontSize:"1rem", color:"var(--t1)" }}>মোট</span>
                <span className="gold-text" style={{ fontFamily:"var(--serif)", fontSize:"1.4rem", fontWeight:700 }}>৳ {total.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ marginTop:"1.5rem", padding:"1rem", background:"var(--bg3)", border:"1px solid var(--line)", fontSize:"0.68rem", color:"var(--t4)", lineHeight:2 }}>
              🔒 SSL সুরক্ষিত পেমেন্ট<br/>🚚 ২–৩ কার্যদিবসে ডেলিভারি<br/>↩️ ৩০ দিনের রিটার্ন<br/>📞 01XXXXXXXXX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
