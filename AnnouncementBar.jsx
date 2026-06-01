const ITEMS = "✦ ৳১০০০+ অর্ডারে ফ্রি ডেলিভারি  ✦ bKash · Nagad · Rocket · Cash on Delivery  ✦ ৩০ দিনের ফ্রি রিটার্ন  ✦ সারা বাংলাদেশে ডেলিভারি  ✦ ১০০% অরিজিনাল প্রোডাক্ট  ";

export default function AnnouncementBar() {
  return (
    <div style={{ height:"34px", background:"linear-gradient(90deg,#0E0E14 0%,#1A0E2A 40%,#0E0E14 100%)", borderBottom:"1px solid rgba(212,168,75,0.15)", overflow:"hidden", display:"flex", alignItems:"center" }}>
      <div style={{ display:"flex", whiteSpace:"nowrap", animation:"ticker 35s linear infinite" }}>
        {[ITEMS, ITEMS].map((t, i) => (
          <span key={i} style={{ fontSize:"0.68rem", fontWeight:500, letterSpacing:"0.1em", color:"rgba(212,168,75,0.85)", paddingRight:"4rem" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
