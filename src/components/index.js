import { useState, useEffect, useRef } from "react";
import { PERSONAL, NAV_PAGES } from "../data";

//  PALETTE 
export const A  = "#a78bfa";
export const A2 = "#7dd3fc";
export const A3 = "#86efac";
export const BG = "#0d0f1a";
export const TX = "#e2e4f0";

//  HOOKS 
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, inView];
}

//  GLOBAL PHOTO STATE 
let _globalPhoto = null;
let _listeners = [];
export function setGlobalPhoto(src) {
  _globalPhoto = src;
  _listeners.forEach(fn => fn(src));
}
export function useGlobalPhoto() {
  const [photo, setPhoto] = useState(_globalPhoto);
  useEffect(() => {
    _listeners.push(setPhoto);
    return () => { _listeners = _listeners.filter(f => f !== setPhoto); };
  }, []);
  return [photo, setGlobalPhoto];
}

//  GLOW CURSOR 
export function GlowCursor() {
  const [p, setP] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const m = (e) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return (
    <div style={{
      position:"fixed", left:p.x-200, top:p.y-200,
      width:400, height:400, borderRadius:"50%",
      pointerEvents:"none", zIndex:0,
      background:"radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)",
      transition:"left 0.08s,top 0.08s",
    }}/>
  );
}

// ─── TYPEWRITER ──────────────────────────────────────────────────
export function Typewriter({ texts }) {
  const [d, setD] = useState("");
  const [i, setI] = useState(0);
  const [c, setC] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[i];
    const t = setTimeout(() => {
      if (!del) {
        setD(cur.slice(0, c + 1));
        if (c + 1 === cur.length) setTimeout(() => setDel(true), 1800);
        else setC(x => x + 1);
      } else {
        setD(cur.slice(0, c - 1));
        if (c - 1 === 0) { setDel(false); setI(x => (x+1)%texts.length); setC(0); }
        else setC(x => x - 1);
      }
    }, del ? 45 : 85);
    return () => clearTimeout(t);
  }, [c, del, i, texts]);
  return <span>{d}<span style={{animation:"blink 1s step-end infinite",color:A}}>|</span></span>;
}

// ─── COUNTER ─────────────────────────────────────────────────────
export function Counter({ target, suffix = "" }) {
  const [n, setN] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(t); } else setN(v);
    }, 30);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── PROFILE PHOTO ───────────────────────────────────────────────
export function ProfilePhoto({ size = 220, uploadable = false }) {
  const [photo] = useGlobalPhoto();
  const [hover, setHover] = useState(false);
  const inp = useRef(null);

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => setGlobalPhoto(ev.target.result);
    r.readAsDataURL(f);
  };

  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <div style={{
        position:"absolute", inset:-5, borderRadius:"50%",
        background:`conic-gradient(from 0deg,${A},${A2},${A3},${A})`,
        opacity:0.45, animation:"spinRing 7s linear infinite", zIndex:0,
      }}/>
      <div style={{ position:"absolute", inset:-2, borderRadius:"50%", background:BG, zIndex:1 }}/>
      <div
        onClick={() => uploadable && inp.current?.click()}
        onMouseEnter={() => uploadable && setHover(true)}
        onMouseLeave={() => uploadable && setHover(false)}
        style={{
          position:"relative", zIndex:2,
          width:size, height:size, borderRadius:"50%", overflow:"hidden",
          background: photo ? "transparent" : `linear-gradient(135deg,rgba(167,139,250,0.15),rgba(125,211,252,0.15))`,
          border:`1.5px solid rgba(167,139,250,0.2)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          flexDirection:"column", gap:6,
          cursor: uploadable ? "pointer" : "default",
        }}
      >
        {photo ? (
          <>
            <img src={photo} alt="Profile" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            {uploadable && (
              <div style={{
                position:"absolute", inset:0,
                background:"rgba(13,15,26,0.65)",
                display:"flex", alignItems:"center", justifyContent:"center",
                opacity:hover?1:0, transition:"opacity 0.3s",
              }}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:"0.6rem",color:A,letterSpacing:1,textTransform:"uppercase"}}>Change</span>
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{
              fontFamily:"'Syne',sans-serif", fontWeight:800,
              fontSize: size > 150 ? "2.6rem" : "1.4rem",
              background:`linear-gradient(135deg,${A},${A2})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>{PERSONAL.initials}</div>
            {uploadable && (
              <div style={{
                fontFamily:"'Space Mono',monospace", fontSize:"0.58rem",
                color:"rgba(167,139,250,0.55)", letterSpacing:1,
                textTransform:"uppercase", textAlign:"center", lineHeight:1.6, padding:"0 14px",
              }}>Click to add<br/>your photo</div>
            )}
          </>
        )}
      </div>
      <input ref={inp} type="file" accept="image/*" onChange={onFile} style={{display:"none"}}/>
      {uploadable && !photo && (
        <div onClick={() => inp.current?.click()} style={{
          position:"absolute", bottom:6, right:6, zIndex:10,
          width:34, height:34, borderRadius:"50%",
          background:`linear-gradient(135deg,${A},${A2})`,
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", fontSize:"0.9rem",
          boxShadow:`0 4px 14px rgba(167,139,250,0.35)`,
          border:`2px solid ${BG}`,
        }}>📷</div>
      )}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────
export function NavBar({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        padding:"0 2.5rem", height:66,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(13,15,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(167,139,250,0.1)" : "none",
        transition:"all 0.4s",
      }}>
        {/* Logo */}
        <button onClick={() => navigate("home")} style={{
           border:"none", cursor:"pointer",
          fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.25rem", letterSpacing:2,
          background:`linear-gradient(135deg,${A},${A2})`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          padding:0,
        }}>B.A</button>

        {/* Desktop links */}
        <div style={{ display:"flex", gap:"0.1rem", alignItems:"center" }}>
          {NAV_PAGES.map(l => (
            <button key={l.page} onClick={() => navigate(l.page)} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"'Syne',sans-serif", fontWeight:600,
              fontSize:"0.78rem", letterSpacing:1.5, textTransform:"uppercase",
              color: currentPage === l.page ? A : "rgba(226,228,240,0.42)",
              padding:"0.5rem 0.8rem",
              position:"relative", transition:"color 0.3s",
            }}>
              {l.label}
              {currentPage === l.page && (
                <span style={{
                  position:"absolute", bottom:0, left:"0.8rem", right:"0.8rem", height:2,
                  background:`linear-gradient(90deg,${A},${A2})`, borderRadius:2,
                  animation:"slideIn 0.3s ease",
                }}/>
              )}
            </button>
          ))}

          <button onClick={() => navigate("contact")} style={{
            marginLeft:"1rem", padding:"0.52rem 1.4rem",
            background:`linear-gradient(135deg,${A},${A2})`,
            border:"none", borderRadius:6, cursor:"pointer",
            fontFamily:"'Syne',sans-serif", fontWeight:700,
            fontSize:"0.75rem", letterSpacing:1.2, textTransform:"uppercase",
            color:BG, transition:"all 0.3s",
            boxShadow:`0 4px 18px rgba(167,139,250,0.25)`,
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 8px 24px rgba(167,139,250,0.4)`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 18px rgba(167,139,250,0.25)`;}}
          >Hire Me</button>
        </div>
      </nav>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
export function Footer({ navigate }) {
  return (
    <footer style={{
      borderTop:"1px solid rgba(167,139,250,0.08)",
      padding:"3rem 2.5rem 2rem",
      background:"rgba(0,0,0,0.2)",
    }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.2fr 0.8fr 1fr", gap:"3rem", marginBottom:"2.5rem" }}>
          <div>
            <div style={{
              fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem",
              letterSpacing:2, background:`linear-gradient(135deg,${A},${A2})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"0.75rem",
            }}>B.A</div>
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.86rem", color:"rgba(226,228,240,0.45)", lineHeight:1.8 }}>
              MERN Stack Developer crafting digital experiences from Butwal, Nepal.
            </p>
            <div style={{ display:"flex", gap:"0.6rem", marginTop:"1.2rem" }}>
              {[
                { icon:"🔗", href: PERSONAL.linkedin },
                { icon:"💻", href: PERSONAL.github },
                { icon:"✉️", href:`mailto:${PERSONAL.email}` },
              ].map((s,i) => (
                <a key={i} href={s.href} style={{
                  width:36, height:36, borderRadius:8,
                  background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.16)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.9rem",
                  transition:"all 0.3s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=`rgba(167,139,250,0.16)`;e.currentTarget.style.borderColor=A;}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(167,139,250,0.08)";e.currentTarget.style.borderColor="rgba(167,139,250,0.16)";}}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", color:A, letterSpacing:3, textTransform:"uppercase", marginBottom:"1rem" }}>Pages</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {NAV_PAGES.map(l => (
                <button key={l.page} onClick={() => navigate(l.page)} style={{
                  background:"none", border:"none", cursor:"pointer",
                  fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.86rem",
                  color:"rgba(226,228,240,0.45)", textAlign:"left", padding:0, transition:"color 0.2s",
                }}
                onMouseEnter={e=>e.target.style.color=A}
                onMouseLeave={e=>e.target.style.color="rgba(226,228,240,0.45)"}
                >{l.label}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", color:A, letterSpacing:3, textTransform:"uppercase", marginBottom:"1rem" }}>Connect</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {[
                {icon:"✉️", label:PERSONAL.email, href:`mailto:${PERSONAL.email}`},
                {icon:"📞", label:PERSONAL.phone,  href:`tel:${PERSONAL.phone}`},
                {icon:"📍", label:PERSONAL.location, href:"#"},
              ].map(c=>(
                <a key={c.label} href={c.href} style={{
                  display:"flex", gap:8, alignItems:"center",
                  fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.82rem",
                  color:"rgba(226,228,240,0.45)", textDecoration:"none", transition:"color 0.2s",
                }}
                onMouseEnter={e=>e.currentTarget.style.color=TX}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(226,228,240,0.45)"}
                ><span>{c.icon}</span>{c.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(167,139,250,0.06)", paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", color:"rgba(226,228,240,0.2)", letterSpacing:1 }}>
            Designed & Built by Bidhya Adhikari · 2025
          </span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", color:"rgba(226,228,240,0.2)", letterSpacing:1 }}>
            React.js
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── AMBIENT ORBS ────────────────────────────────────────────────
export function AmbientOrbs() {
  return (
    <>
      {[
        { top:"14%", right:"7%",  size:520, color:"rgba(167,139,250,0.05)", dur:9 },
        { bottom:"17%", left:"4%", size:420, color:"rgba(125,211,252,0.04)", dur:11 },
        { top:"52%", left:"42%",  size:280, color:"rgba(134,239,172,0.03)", dur:14 },
      ].map((o,i)=>(
        <div key={i} style={{
          position:"fixed", borderRadius:"50%", pointerEvents:"none", zIndex:0,
          width:o.size, height:o.size,
          top:o.top, right:o.right, bottom:o.bottom, left:o.left,
          background:`radial-gradient(circle,${o.color} 0%,transparent 70%)`,
          animation:`float ${o.dur}s ${i}s ease-in-out infinite`,
        }}/>
      ))}
    </>
  );
}

// ─── SMALL ATOMS ─────────────────────────────────────────────────
export function SectionLabel({ children, center }) {
  return (
    <div style={{
      fontFamily:"'Space Mono',monospace", color:A,
      fontSize:"0.7rem", letterSpacing:4, textTransform:"uppercase",
      marginBottom:"1rem", textAlign:center?"center":undefined,
    }}>{children}</div>
  );
}

export function SectionTitle({ children, center }) {
  return (
    <h2 style={{
      fontFamily:"'Syne',sans-serif", fontWeight:800,
      fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:TX,
      marginBottom:"1.5rem", lineHeight:1.15,
      textAlign:center?"center":undefined,
    }}>{children}</h2>
  );
}

export function PageHero({ label, title, subtitle }) {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);
  return (
    <div style={{
      paddingTop:"10rem", paddingBottom:"4rem",
      textAlign:"center",
      opacity:on?1:0, transform:on?"none":"translateY(24px)",
      transition:"all 0.7s",
    }}>
      <SectionLabel center>{label}</SectionLabel>
      <h1 style={{
        fontFamily:"'Syne',sans-serif", fontWeight:800,
        fontSize:"clamp(2.4rem,5vw,4rem)", color:TX,
        lineHeight:1.1, marginBottom:"1rem",
      }}>{title}</h1>
      {subtitle && (
        <p style={{
          fontFamily:"'Space Grotesk',sans-serif",
          color:"rgba(226,228,240,0.5)", fontSize:"1rem", maxWidth:500, margin:"0 auto",
          lineHeight:1.8,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

export function Chip({ children }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:7, padding:"0.42rem 1rem",
      background:"rgba(167,139,250,0.07)", border:"1px solid rgba(167,139,250,0.16)",
      borderRadius:100, fontFamily:"'Space Mono',monospace",
      fontSize:"0.7rem", color:"rgba(226,228,240,0.62)",
    }}>{children}</div>
  );
}

export function CardBase({ children, hover, color, style = {} }) {
  return (
    <div style={{
      background: hover ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
      border:`1px solid ${hover ? (color||A)+"50" : "rgba(226,228,240,0.07)"}`,
      borderRadius:16, padding:"1.8rem",
      position:"relative", overflow:"hidden",
      transition:"all 0.3s",
      ...style,
    }}>{children}</div>
  );
}
