import { useState, useEffect } from "react";
import {
  A, A2, A3, BG, TX,
  Typewriter, ProfilePhoto, useInView, Counter,
  SectionLabel, SectionTitle, Chip,
} from "../components";
import { PERSONAL, PROJECTS, SKILLS } from "../data";

function Hero({ navigate }) {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 120); }, []);
  const tr = (d) => ({
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(28px)",
    transition: `all 0.8s ${d}s`,
  });

  return (
    <section style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden", padding:"6rem 2.5rem 4rem",
    }}>
      {/* Grid bg */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:`
          linear-gradient(rgba(167,139,250,0.03) 1px,transparent 1px),
          linear-gradient(90deg,rgba(167,139,250,0.03) 1px,transparent 1px)`,
        backgroundSize:"64px 64px",
      }}/>
      {/* Corner brackets */}
      {[0,1,2,3].map(i=>(
        <div key={i} style={{
          position:"absolute", zIndex:1, width:52, height:52,
          top:i<2?88:"auto", bottom:i>=2?44:"auto",
          left:i%2===0?44:"auto", right:i%2===1?44:"auto",
          borderTop:    i<2  ? `1.5px solid rgba(167,139,250,0.22)` : "none",
          borderBottom: i>=2 ? `1.5px solid rgba(167,139,250,0.22)` : "none",
          borderLeft:   i%2===0 ? `1.5px solid rgba(167,139,250,0.22)` : "none",
          borderRight:  i%2===1 ? `1.5px solid rgba(167,139,250,0.22)` : "none",
        }}/>
      ))}

      <div style={{
        zIndex:2, maxWidth:1020, width:"100%",
        display:"grid", gridTemplateColumns:"1fr auto",
        alignItems:"center", gap:"5rem",
      }}>
        {/* Left: text */}
        <div>
          <div style={tr(0.1)}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"0.35rem 1.1rem",
              border:`1px solid rgba(167,139,250,0.3)`, borderRadius:100,
              fontFamily:"'Space Mono',monospace", fontSize:"0.7rem",
              letterSpacing:3, color:A, textTransform:"uppercase",
              background:"rgba(167,139,250,0.06)", marginBottom:"2rem",
            }}>
              <span style={{
                width:7, height:7, borderRadius:"50%", background:A3,
                animation:"pulse 2s ease-in-out infinite",
                boxShadow:`0 0 8px ${A3}`,
              }}/>
              Available for Opportunities
            </div>
          </div>

          <div style={tr(0.22)}>
            <h1 style={{
              fontFamily:"'Syne',sans-serif",
              fontSize:"clamp(2.8rem,6vw,5.4rem)",
              fontWeight:800, lineHeight:1.05,
              margin:"0 0 0.8rem", letterSpacing:-1.5, color:TX,
            }}>
              BIDHYA<br/>
              <span style={{
                background:`linear-gradient(135deg,${A},${A2})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>ADHIKARI</span>
            </h1>
          </div>

          <div style={{
            ...tr(0.4),
            fontFamily:"'Space Mono',monospace",
            fontSize:"clamp(0.88rem,1.8vw,1.15rem)",
            color:"rgba(226,228,240,0.55)", marginBottom:"2.5rem", minHeight:34,
          }}>
            <Typewriter texts={PERSONAL.roles}/>
          </div>

          <div style={{ ...tr(0.56), display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"3rem" }}>
            <button onClick={() => navigate("projects")} style={{
              padding:"0.85rem 2rem",
              background:`linear-gradient(135deg,${A},${A2})`,
              color:BG, borderRadius:8, border:"none",
              fontFamily:"'Syne',sans-serif", fontWeight:700,
              fontSize:"0.8rem", letterSpacing:1.2, textTransform:"uppercase",
              cursor:"pointer",
              boxShadow:`0 8px 28px rgba(167,139,250,0.26)`,
              transition:"all 0.3s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 14px 36px rgba(167,139,250,0.38)`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 8px 28px rgba(167,139,250,0.26)`;}}
            >View Work</button>

            <button onClick={() => navigate("contact")} style={{
              padding:"0.85rem 2rem", background:"transparent",
              color:TX, borderRadius:8,
              border:"1px solid rgba(226,228,240,0.18)",
              fontFamily:"'Syne',sans-serif", fontWeight:700,
              fontSize:"0.8rem", letterSpacing:1.2, textTransform:"uppercase",
              cursor:"pointer", transition:"all 0.3s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=A;e.currentTarget.style.color=A;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(226,228,240,0.18)";e.currentTarget.style.color=TX;}}
            >Let's Talk</button>
          </div>

          {/* Stats row */}
          <div style={{ ...tr(0.7), display:"flex", gap:"2rem" }}>
            {PERSONAL.stats.map(s=>(
              <div key={s.label}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.8rem", color:A, lineHeight:1 }}>
                  <Counter target={s.value} suffix={s.suffix}/>
                </div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.72rem", color:"rgba(226,228,240,0.4)", marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div style={{
          opacity:on?1:0, transform:on?"none":"translateX(28px) scale(0.95)",
          transition:"all 0.9s 0.5s",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem",
        }}>

<img
  src="/images/gitphoto.jpeg"
  alt="Profile"
  style={{
    width: 220,
    height: 220,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid rgba(167,139,250,0.3)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  }}
/>

          <p style={{
            fontFamily:"'Space Mono',monospace", fontSize:"0.6rem",
            color:"rgba(167,139,250,0.4)", letterSpacing:1.5,
            textTransform:"uppercase", textAlign:"center",
          }}></p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        opacity:on?0.4:0, transition:"opacity 1s 1.4s", zIndex:2,
      }}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:"0.6rem",letterSpacing:3,color:TX,textTransform:"uppercase"}}>Scroll</span>
        <div style={{width:1,height:52,background:`linear-gradient(to bottom,${A},transparent)`,animation:"scrollPulse 2s ease-in-out infinite"}}/>
      </div>
    </section>
  );
}

function FeaturedProjects({ navigate }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(null);
  const { PROJECTS: P } = { PROJECTS };

  return (
    <section ref={ref} style={{ padding:"6rem 2.5rem", maxWidth:1060, margin:"0 auto" }}>
      <div style={{
        opacity:inView?1:0, transform:inView?"none":"translateY(28px)",
        transition:"all 0.7s",
        display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"3rem",
      }}>
        <div>
          <SectionLabel>Featured Work</SectionLabel>
          <SectionTitle>Recent Projects</SectionTitle>
        </div>
        <button onClick={() => navigate("projects")} style={{
          background:"none", border:`1px solid rgba(167,139,250,0.25)`,
          color:A, borderRadius:8, padding:"0.6rem 1.4rem",
          fontFamily:"'Syne',sans-serif", fontWeight:700,
          fontSize:"0.75rem", letterSpacing:1.2, textTransform:"uppercase",
          cursor:"pointer", transition:"all 0.3s",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background=`rgba(167,139,250,0.08)`;e.currentTarget.style.borderColor=A;}}
        onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="rgba(167,139,250,0.25)";}}
        >View All →</button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.6rem" }}>
        {PROJECTS.slice(0,3).map((p,i)=>(
          <div key={p.id}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{
              opacity:inView?1:0,
              transform:inView?(hov===i?"translateY(-6px)":"none"):"translateY(44px)",
              transition:`opacity 0.7s ${i*0.14}s, transform 0.3s`,
              background:hov===i?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
              border:`1px solid ${hov===i?p.color+"50":"rgba(226,228,240,0.07)"}`,
              borderRadius:16, padding:"1.8rem",
              position:"relative", overflow:"hidden", cursor:"pointer",
            }}
            onClick={() => navigate("projects")}
          >
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${p.color},transparent)`,opacity:hov===i?1:0.5,transition:"opacity 0.3s"}}/>
            <div style={{fontSize:"2rem",marginBottom:"0.8rem"}}>{p.icon}</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.05rem",color:TX,marginBottom:"0.3rem"}}>{p.title}</h3>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"0.8rem",color:"rgba(226,228,240,0.45)",lineHeight:1.7,marginBottom:"1.2rem"}}>{p.description}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0.38rem"}}>
              {p.stack.map(t=>(
                <span key={t} style={{padding:"0.26rem 0.72rem",background:`${p.color}12`,border:`1px solid ${p.color}28`,borderRadius:100,color:p.color,fontFamily:"'Space Mono',monospace",fontSize:"0.62rem"}}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSnippet({ navigate }) {
  const [ref, inView] = useInView();
  const allSkills = Object.entries(SKILLS).flatMap(([cat, items]) =>
    items.slice(0, 3).map(s => ({ ...s, cat }))
  );

  return (
    <section ref={ref} style={{ padding:"6rem 2.5rem", background:"rgba(167,139,250,0.025)", borderTop:"1px solid rgba(167,139,250,0.06)", borderBottom:"1px solid rgba(167,139,250,0.06)" }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(28px)", transition:"all 0.7s", textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel center>Tech Stack</SectionLabel>
          <SectionTitle center>What I Work With</SectionTitle>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.7rem", justifyContent:"center", opacity:inView?1:0, transition:"all 0.8s 0.2s" }}>
          {allSkills.map((s,i)=>(
            <div key={s.name+i} style={{
              padding:"0.7rem 1.4rem",
              background:"rgba(255,255,255,0.025)", border:`1px solid rgba(167,139,250,0.13)`,
              borderRadius:8, fontFamily:"'Space Mono',monospace", fontSize:"0.8rem", color:TX,
              animation:inView?`fadeInUp 0.35s ${i*0.04}s both`:"none",
              cursor:"default", transition:"all 0.3s",
            }}
            onMouseEnter={e=>{e.target.style.background=`rgba(167,139,250,0.09)`;e.target.style.borderColor=A;e.target.style.color=A;e.target.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.target.style.background="rgba(255,255,255,0.025)";e.target.style.borderColor="rgba(167,139,250,0.13)";e.target.style.color=TX;e.target.style.transform="none";}}
            >{s.name}</div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:"2.5rem", opacity:inView?1:0, transition:"all 0.8s 0.4s" }}>
          <button onClick={() => navigate("skills")} style={{
            background:"none", border:`1px solid rgba(167,139,250,0.25)`,
            color:A, borderRadius:8, padding:"0.7rem 1.8rem",
            fontFamily:"'Syne',sans-serif", fontWeight:700,
            fontSize:"0.78rem", letterSpacing:1.2, textTransform:"uppercase",
            cursor:"pointer", transition:"all 0.3s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background=`rgba(167,139,250,0.08)`;}}
          onMouseLeave={e=>{e.currentTarget.style.background="none";}}
          >View Full Skill Set →</button>
        </div>
      </div>
    </section>
  );
}

function CTABanner({ navigate }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding:"8rem 2.5rem" }}>
      <div style={{
        maxWidth:760, margin:"0 auto", textAlign:"center",
        opacity:inView?1:0, transform:inView?"none":"translateY(30px)",
        transition:"all 0.7s",
      }}>
        <div style={{
          padding:"4rem 3rem",
          background:"rgba(167,139,250,0.04)",
          border:"1px solid rgba(167,139,250,0.14)",
          borderRadius:24, position:"relative", overflow:"hidden",
        }}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${A},${A2},transparent)`}}/>
          <SectionLabel center>Let's Collaborate</SectionLabel>
          <h2 style={{
            fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:TX,
            marginBottom:"1rem", lineHeight:1.2,
          }}>
            Ready to Build Something <span style={{background:`linear-gradient(135deg,${A},${A2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Amazing?</span>
          </h2>
          <p style={{ fontFamily:"'Space Grotesk',sans-serif", color:"rgba(226,228,240,0.5)", fontSize:"1rem", lineHeight:1.8, marginBottom:"2rem" }}>
            I'm actively seeking new opportunities. If you have a project in mind or just want to connect — let's talk.
          </p>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("contact")} style={{
              padding:"0.85rem 2.2rem",
              background:`linear-gradient(135deg,${A},${A2})`,
              color:BG, borderRadius:8, border:"none",
              fontFamily:"'Syne',sans-serif", fontWeight:700,
              fontSize:"0.82rem", letterSpacing:1.2, textTransform:"uppercase",
              cursor:"pointer", boxShadow:`0 8px 28px rgba(167,139,250,0.26)`,
              transition:"all 0.3s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
            >Get In Touch</button>
            <a href={`mailto:${PERSONAL.email}`} style={{
              padding:"0.85rem 2.2rem", background:"transparent",
              color:TX, borderRadius:8, border:"1px solid rgba(226,228,240,0.18)",
              fontFamily:"'Syne',sans-serif", fontWeight:700,
              fontSize:"0.82rem", letterSpacing:1.2, textTransform:"uppercase",
              textDecoration:"none", transition:"all 0.3s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=A;e.currentTarget.style.color=A;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(226,228,240,0.18)";e.currentTarget.style.color=TX;}}
            >Send Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home({ navigate }) {
  return (
    <div className="page-enter">
      <Hero navigate={navigate}/>
      <FeaturedProjects navigate={navigate}/>
      <SkillsSnippet navigate={navigate}/>
      <CTABanner navigate={navigate}/>
    </div>
  );
}
