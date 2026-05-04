import { useState } from "react";
import { A, A2, A3, BG, TX, useInView, SectionLabel, SectionTitle, PageHero } from "../components";
import { SKILLS } from "../data";

const CAT_COLORS = {
  Frontend: A,
  Backend:  A2,
  Database: A3,
  Tools:    "#f9a8d4",
  Others:   "#fcd34d",
};

function SkillBar({ name, level, color, delay, inView }) {
  return (
    <div style={{
      marginBottom:"1.2rem",
      opacity:inView?1:0, transform:inView?"none":"translateX(-20px)",
      transition:`all 0.6s ${delay}s`,
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.78rem", color:TX }}>{name}</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.7rem", color:color, opacity:0.8 }}>{level}%</span>
      </div>
      <div style={{
        height:6, background:"rgba(255,255,255,0.06)",
        borderRadius:100, overflow:"hidden",
      }}>
        <div style={{
          height:"100%", width:inView?`${level}%`:"0%",
          background:`linear-gradient(90deg,${color},${color}88)`,
          borderRadius:100, transition:`width 1s ${delay + 0.2}s ease`,
          boxShadow:inView?`0 0 10px ${color}55`:"none",
        }}/>
      </div>
    </div>
  );
}

function CategoryPanel({ cat, skills, color, isActive, onClick }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      padding:"2rem",
      background: isActive ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
      border:`1px solid ${isActive ? color+"45" : "rgba(226,228,240,0.06)"}`,
      borderRadius:16, cursor:"pointer",
      transition:"all 0.3s",
      position:"relative", overflow:"hidden",
    }}
    onClick={onClick}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${color},transparent)`,opacity:isActive?1:0.4,transition:"opacity 0.3s"}}/>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: isActive?"1.5rem":"0" }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color: isActive?color:TX }}>{cat}</h3>
        <span style={{
          width:22, height:22, borderRadius:"50%",
          background:`${color}15`, border:`1px solid ${color}30`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:color,
        }}>{skills.length}</span>
      </div>
      {isActive && skills.map((s,i)=>(
        <SkillBar key={s.name} name={s.name} level={s.level} color={color} delay={i*0.05} inView={inView}/>
      ))}
      {!isActive && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginTop:"0.75rem" }}>
          {skills.slice(0,4).map(s=>(
            <span key={s.name} style={{
              padding:"0.2rem 0.6rem", background:`${color}0e`,
              border:`1px solid ${color}1e`, borderRadius:100,
              fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"rgba(226,228,240,0.4)",
            }}>{s.name}</span>
          ))}
          {skills.length > 4 && <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"rgba(226,228,240,0.3)", padding:"0.2rem 0" }}>+{skills.length-4} more</span>}
        </div>
      )}
    </div>
  );
}

function AllSkillsCloud() {
  const [ref, inView] = useInView();
  const all = Object.entries(SKILLS).flatMap(([cat, items]) =>
    items.map(s => ({ ...s, cat, color: CAT_COLORS[cat] }))
  );
  const [hov, setHov] = useState(null);
  return (
    <section ref={ref} style={{
      padding:"6rem 2.5rem",
      background:"rgba(167,139,250,0.025)",
      borderTop:"1px solid rgba(167,139,250,0.06)",
      borderBottom:"1px solid rgba(167,139,250,0.06)",
    }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all 0.7s", textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel center>All Skills</SectionLabel>
          <SectionTitle center>Technology Cloud</SectionTitle>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", justifyContent:"center" }}>
          {all.map((s,i)=>(
            <div key={s.name+i}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{
                padding:"0.75rem 1.5rem",
                background: hov===i ? `${s.color}12` : "rgba(255,255,255,0.025)",
                border:`1px solid ${hov===i ? s.color+"50" : "rgba(167,139,250,0.12)"}`,
                borderRadius:8,
                fontFamily:"'Space Mono',monospace",
                fontSize:"0.82rem",
                color: hov===i ? s.color : TX,
                transform: hov===i ? "translateY(-3px)" : "none",
                animation:inView?`fadeInUp 0.4s ${i*0.03}s both`:"none",
                cursor:"default", transition:"all 0.25s",
              }}
            >{s.name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsGrid() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState("Frontend");
  const cats = Object.keys(SKILLS);

  return (
    <section ref={ref} style={{ padding:"3rem 2.5rem 6rem", maxWidth:1060, margin:"0 auto" }}>
      <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all 0.7s", marginBottom:"2.5rem" }}>
        <SectionLabel>Skill Breakdown</SectionLabel>
        <SectionTitle>By Category</SectionTitle>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1.2rem" }}>
        {cats.map((cat)=>(
          <CategoryPanel
            key={cat}
            cat={cat}
            skills={SKILLS[cat]}
            color={CAT_COLORS[cat]}
            isActive={active === cat}
            onClick={()=>setActive(active===cat?"":cat)}
          />
        ))}
      </div>
    </section>
  );
}

export default function Skills({ navigate }) {
  return (
    <div className="page-enter">
      <PageHero
        label="04 — Skills"
        title="Technical Arsenal"
        subtitle="Tools, languages, and frameworks I use to build modern web applications."
      />
      <SkillsGrid/>
      <AllSkillsCloud/>
    </div>
  );
}
