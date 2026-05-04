import { useState } from "react";
import { A, A2, A3, BG, TX, useInView, SectionLabel, SectionTitle, PageHero } from "../components";
import { PROJECTS } from "../data";

function ProjectCard({ p, i, inView, navigate }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        opacity:inView?1:0,
        transform:inView?(hov?"translateY(-6px)":"none"):"translateY(48px)",
        transition:`opacity 0.7s ${i*0.14}s, transform 0.3s`,
        background:hov?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
        border:`1px solid ${hov?p.color+"55":"rgba(226,228,240,0.07)"}`,
        borderRadius:20, padding:"2rem",
        position:"relative", overflow:"hidden",
        display:"flex", flexDirection:"column",
      }}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${p.color},transparent)`,opacity:hov?1:0.5,transition:"opacity 0.3s"}}/>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.2rem" }}>
        <div style={{ fontSize:"2.5rem" }}>{p.icon}</div>
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <span style={{
            padding:"0.25rem 0.75rem",
            background: p.status==="Live" ? `rgba(134,239,172,0.12)` : `rgba(167,139,250,0.1)`,
            border:`1px solid ${p.status==="Live" ? "#86efac40" : "rgba(167,139,250,0.2)"}`,
            borderRadius:100,
            fontFamily:"'Space Mono',monospace", fontSize:"0.6rem",
            color: p.status==="Live" ? A3 : A,
            letterSpacing:1,
          }}>{p.status==="Live" ? "🟢 " : "✅ "}{p.status}</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", color:"rgba(226,228,240,0.3)" }}>{p.year}</span>
        </div>
      </div>

      <div style={{ marginBottom:"0.4rem" }}>
        <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.2rem",color:TX,marginBottom:"0.25rem"}}>{p.title}</h3>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.68rem",color:p.color,letterSpacing:1,textTransform:"uppercase",opacity:0.8}}>{p.subtitle}</div>
      </div>

      <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"0.85rem",color:"rgba(226,228,240,0.52)",lineHeight:1.8,marginBottom:"1.2rem",flex:1}}>{p.description}</p>

      {/* Bullets */}
      <ul style={{ listStyle:"none", padding:0, margin:"0 0 1.4rem" }}>
        {p.bullets.map(b=>(
          <li key={b} style={{
            fontFamily:"'Space Grotesk',sans-serif",fontSize:"0.8rem",
            color:"rgba(226,228,240,0.45)",marginBottom:"0.38rem",
            display:"flex",gap:8,alignItems:"flex-start",
          }}>
            <span style={{color:p.color,marginTop:2,flexShrink:0}}>▸</span>{b}
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginBottom:"1.5rem" }}>
        {p.stack.map(t=>(
          <span key={t} style={{
            padding:"0.28rem 0.78rem",
            background:`${p.color}12`, border:`1px solid ${p.color}28`,
            borderRadius:100, color:p.color,
            fontFamily:"'Space Mono',monospace", fontSize:"0.65rem",
          }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display:"flex", gap:"0.8rem" }}>
        <a href={p.github} style={{
          flex:1, padding:"0.65rem",
          background:`${p.color}0e`, border:`1px solid ${p.color}25`,
          borderRadius:8, textDecoration:"none",
          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          fontFamily:"'Space Mono',monospace", fontSize:"0.68rem", color:p.color,
          letterSpacing:1, transition:"all 0.3s",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}20`;}}
        onMouseLeave={e=>{e.currentTarget.style.background=`${p.color}0e`;}}
        >💻 GitHub</a>
        <a href={p.live} style={{
          flex:1, padding:"0.65rem",
          background:`linear-gradient(135deg,${p.color}20,${p.color}10)`,
          border:`1px solid ${p.color}35`, borderRadius:8,
          textDecoration:"none",
          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          fontFamily:"'Space Mono',monospace", fontSize:"0.68rem", color:p.color,
          letterSpacing:1, transition:"all 0.3s",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}30`;}}
        onMouseLeave={e=>{e.currentTarget.style.background=`linear-gradient(135deg,${p.color}20,${p.color}10)`;}}
        >🚀 Live Demo</a>
      </div>
    </div>
  );
}

function ProjectGrid() {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState("All");
  const stacks = ["All", "React.js", "Node.js", "HTML5", "MySQL"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.stack.includes(filter));

  return (
    <section ref={ref} style={{ padding:"2rem 2.5rem 8rem", maxWidth:1060, margin:"0 auto" }}>
      {/* Filters */}
      <div style={{
        display:"flex", gap:"0.5rem", flexWrap:"wrap",
        justifyContent:"center", marginBottom:"3rem",
        opacity:inView?1:0, transform:inView?"none":"translateY(20px)", transition:"all 0.7s",
      }}>
        {stacks.map(s=>(
          <button key={s} onClick={()=>setFilter(s)} style={{
            padding:"0.52rem 1.3rem",
            background: filter===s ? `linear-gradient(135deg,${A},${A2})` : "transparent",
            color: filter===s ? BG : "rgba(226,228,240,0.4)",
            border: filter===s ? "none" : "1px solid rgba(226,228,240,0.12)",
            borderRadius:100, cursor:"pointer",
            fontFamily:"'Syne',sans-serif", fontWeight:700,
            fontSize:"0.75rem", letterSpacing:0.8,
            transition:"all 0.3s",
          }}>{s}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"2rem" }}>
        {filtered.map((p,i)=>(
          <ProjectCard key={p.id} p={p} i={i} inView={inView}/>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"4rem", color:"rgba(226,228,240,0.3)", fontFamily:"'Space Mono',monospace", fontSize:"0.85rem" }}>
          No projects match this filter.
        </div>
      )}
    </section>
  );
}

export default function Projects({ navigate }) {
  return (
    <div className="page-enter">
      <PageHero
        label="03 — Work"
        title="Featured Projects"
        subtitle="A collection of things I've built — from full-stack apps to polished frontends."
      />
      <ProjectGrid/>
    </div>
  );
}
