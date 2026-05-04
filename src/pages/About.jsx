import { useState } from "react";
import {
  A, A2, A3, BG, TX,
  useInView, Counter, ProfilePhoto,
  SectionLabel, SectionTitle, PageHero, Chip,
} from "../components";
import { PERSONAL, EXPERIENCE } from "../data";

function AboutIntro() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding:"4rem 2.5rem 6rem", maxWidth:1060, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
        {/* Left */}
        <div style={{
          opacity:inView?1:0, transform:inView?"none":"translateX(-36px)", transition:"all 0.8s",
        }}>
          <SectionLabel>Who I Am</SectionLabel>
          <SectionTitle>Crafting Digital <span style={{color:A}}>Experiences</span></SectionTitle>
          {PERSONAL.bio.map((p,i)=>(
            <p key={i} style={{
              fontFamily:"'Space Grotesk',sans-serif",
              color:"rgba(226,228,240,0.6)", lineHeight:1.9, fontSize:"0.93rem",
              marginBottom:"1.2rem",
            }}>{p}</p>
          ))}
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginTop:"0.5rem" }}>
            <Chip>📍 {PERSONAL.location}</Chip>
            <Chip>🎓 {PERSONAL.university}</Chip>
            <Chip>💼 Open to Work</Chip>
            <Chip>🌐 Nepali · English · Hindi</Chip>
          </div>
        </div>

        {/* Right */}
        <div style={{
          opacity:inView?1:0, transform:inView?"none":"translateX(36px)", transition:"all 0.8s 0.2s",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"2.5rem",
        }}>
          {/* <ProfilePhoto size={200} uploadable={true}/> */}

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

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem", width:"100%" }}>
            {PERSONAL.stats.map(s=>(
              <div key={s.label} style={{
                padding:"1.4rem 0.8rem", textAlign:"center",
                background:"rgba(255,255,255,0.02)",
                border:`1px solid rgba(167,139,250,0.1)`,
                borderRadius:12, position:"relative", overflow:"hidden",
              }}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${A},${A2})`,opacity:0.55}}/>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"2rem",color:A,lineHeight:1}}>
                  <Counter target={s.value} suffix={s.suffix}/>
                </div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"0.7rem",color:"rgba(226,228,240,0.4)",marginTop:"0.4rem"}}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div style={{ display:"flex", gap:"0.75rem", width:"100%" }}>
            <a href={PERSONAL.linkedin} style={{
              flex:1, padding:"0.75rem",
              background:`rgba(167,139,250,0.07)`, border:`1px solid rgba(167,139,250,0.18)`,
              borderRadius:10, textDecoration:"none",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              fontFamily:"'Space Mono',monospace", fontSize:"0.7rem", color:A, letterSpacing:1,
              transition:"all 0.3s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=`rgba(167,139,250,0.14)`;}}
            onMouseLeave={e=>{e.currentTarget.style.background=`rgba(167,139,250,0.07)`;}}
            >🔗 LinkedIn</a>
            <a href={PERSONAL.github} style={{
              flex:1, padding:"0.75rem",
              background:`rgba(125,211,252,0.07)`, border:`1px solid rgba(125,211,252,0.18)`,
              borderRadius:10, textDecoration:"none",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              fontFamily:"'Space Mono',monospace", fontSize:"0.7rem", color:A2, letterSpacing:1,
              transition:"all 0.3s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=`rgba(125,211,252,0.14)`;}}
            onMouseLeave={e=>{e.currentTarget.style.background=`rgba(125,211,252,0.07)`;}}
            >💻 GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const [ref, inView] = useInView();
  const items = [
    { icon:"🎯", title:"Clean Code", desc:"I write code that is readable, maintainable, and built to scale — not just to work.", color:A },
    { icon:"🎨", title:"UI/UX Focus", desc:"Every interface decision is made with the end user in mind. Design and function go hand in hand.", color:A2 },
    { icon:"🚀", title:"Always Learning", desc:"Technology evolves fast. I stay curious, keep learning, and embrace new tools with enthusiasm.", color:A3 },
    { icon:"🤝", title:"Team Player", desc:"Great products are built by great teams. I value collaboration, feedback, and open communication.", color:A },
  ];
  return (
    <section ref={ref} style={{
      padding:"6rem 2.5rem",
      background:"rgba(167,139,250,0.025)",
      borderTop:"1px solid rgba(167,139,250,0.06)",
      borderBottom:"1px solid rgba(167,139,250,0.06)",
    }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(28px)", transition:"all 0.7s", textAlign:"center", marginBottom:"3.5rem" }}>
          <SectionLabel center>Core Values</SectionLabel>
          <SectionTitle center>What Drives Me</SectionTitle>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.4rem" }}>
          {items.map((v,i)=>(
            <div key={v.title} style={{
              padding:"2rem",
              background:"rgba(255,255,255,0.02)",
              border:`1px solid rgba(167,139,250,0.1)`,
              borderRadius:16,
              opacity:inView?1:0,
              transform:inView?"none":"translateY(30px)",
              transition:`all 0.6s ${i*0.1+0.1}s`,
              position:"relative", overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${v.color},transparent)`,opacity:0.7}}/>
              <div style={{fontSize:"2rem",marginBottom:"1rem"}}>{v.icon}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:TX,fontSize:"1rem",marginBottom:"0.6rem"}}>{v.title}</h3>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",color:"rgba(226,228,240,0.5)",fontSize:"0.85rem",lineHeight:1.75}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding:"6rem 2.5rem", maxWidth:760, margin:"0 auto" }}>
      <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(28px)", transition:"all 0.7s", textAlign:"center", marginBottom:"3.5rem" }}>
        <SectionLabel center>Journey</SectionLabel>
        <SectionTitle center>Experience & Education</SectionTitle>
      </div>
      <div style={{ position:"relative" }}>
        <div style={{
          position:"absolute", left:27, top:0, bottom:0, width:1,
          background:`linear-gradient(to bottom,${A},rgba(167,139,250,0.06))`,
          opacity:inView?0.5:0, transition:"opacity 1s 0.3s",
        }}/>
        {EXPERIENCE.map((it,i)=>(
          <div key={it.company} style={{
            display:"flex", gap:"1.8rem", marginBottom:"2.6rem",
            opacity:inView?1:0, transform:inView?"none":"translateX(-26px)",
            transition:`all 0.7s ${i*0.2+0.2}s`,
          }}>
            <div style={{ flexShrink:0, zIndex:1 }}>
              <div style={{
                width:54, height:54, borderRadius:"50%",
                background:`linear-gradient(135deg,${it.color}30,${it.color}10)`,
                border:`1px solid ${it.color}40`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Syne',sans-serif", fontWeight:800,
                color:it.color, fontSize:"0.68rem", letterSpacing:1,
              }}>{it.label}</div>
            </div>
            <div style={{
              flex:1, padding:"1.4rem 1.6rem",
              background:"rgba(255,255,255,0.02)",
              border:`1px solid rgba(167,139,250,0.09)`,
              borderRadius:12,
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.3rem" }}>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:TX,fontSize:"1.05rem"}}>{it.company}</h3>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:"0.65rem",color:"rgba(226,228,240,0.35)",letterSpacing:1}}>{it.period}</span>
              </div>
              <div style={{fontFamily:"'Space Mono',monospace",color:it.color,fontSize:"0.72rem",letterSpacing:1,marginBottom:"0.8rem"}}>{it.role}</div>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",color:"rgba(226,228,240,0.52)",lineHeight:1.8,fontSize:"0.86rem",marginBottom:"1rem"}}>{it.desc}</p>
              <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                {it.tags.map(t=>(
                  <span key={t} style={{
                    padding:"0.22rem 0.75rem",
                    background:`${it.color}0f`, border:`1px solid ${it.color}20`,
                    borderRadius:100, fontFamily:"'Space Mono',monospace",
                    fontSize:"0.62rem", color:"rgba(226,228,240,0.45)",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function About({ navigate }) {
  return (
    <div className="page-enter">
      <PageHero
        label="01 — About Me"
        title="The Person Behind the Code"
        subtitle="Passionate developer, lifelong learner, and detail-obsessed creator from Nepal."
      />
      <AboutIntro/>
      <Values/>
      <ExperienceTimeline/>
    </div>
  );
}
