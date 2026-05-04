import { A, A2, A3, BG, TX, useInView, SectionLabel, SectionTitle, PageHero } from "../components";
import { EXPERIENCE, PERSONAL } from "../data";

function Timeline() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding:"3rem 2.5rem 6rem", maxWidth:820, margin:"0 auto" }}>
      <div style={{ position:"relative" }}>
        <div style={{
          position:"absolute", left:30, top:0, bottom:0, width:1,
          background:`linear-gradient(to bottom,${A},rgba(167,139,250,0.06))`,
          opacity:inView?0.55:0, transition:"opacity 1s 0.3s",
        }}/>

        {EXPERIENCE.map((it,i)=>(
          <div key={it.company} style={{
            display:"flex", gap:"2rem", marginBottom:"3rem",
            opacity:inView?1:0, transform:inView?"none":"translateX(-30px)",
            transition:`all 0.7s ${i*0.2+0.1}s`,
          }}>
            {/* Node */}
            <div style={{ flexShrink:0, zIndex:1 }}>
              <div style={{
                width:60, height:60, borderRadius:"50%",
                background:`linear-gradient(135deg,${it.color}28,${it.color}0e)`,
                border:`1.5px solid ${it.color}44`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Syne',sans-serif", fontWeight:800,
                color:it.color, fontSize:"0.68rem", letterSpacing:1,
                boxShadow:`0 0 20px ${it.color}18`,
              }}>{it.label}</div>
            </div>

            {/* Card */}
            <div style={{
              flex:1, padding:"1.8rem 2rem",
              background:"rgba(255,255,255,0.02)",
              border:`1px solid rgba(167,139,250,0.09)`,
              borderRadius:16, position:"relative", overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${it.color},transparent)`,opacity:0.6}}/>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.4rem" }}>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:TX,fontSize:"1.1rem"}}>{it.company}</h3>
                <span style={{
                  padding:"0.22rem 0.8rem",
                  background:`${it.color}12`,border:`1px solid ${it.color}25`,
                  borderRadius:100,fontFamily:"'Space Mono',monospace",
                  fontSize:"0.62rem",color:it.color,letterSpacing:0.5,flexShrink:0,marginLeft:"0.8rem",
                }}>{it.period}</span>
              </div>
              <div style={{fontFamily:"'Space Mono',monospace",color:it.color,fontSize:"0.73rem",letterSpacing:1,marginBottom:"1rem",opacity:0.85}}>{it.role}</div>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",color:"rgba(226,228,240,0.55)",lineHeight:1.85,fontSize:"0.88rem",marginBottom:"1.2rem"}}>{it.desc}</p>
              <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                {it.tags.map(t=>(
                  <span key={t} style={{
                    padding:"0.24rem 0.78rem",
                    background:`${it.color}0e`, border:`1px solid ${it.color}1e`,
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

function LanguagesSection() {
  const [ref, inView] = useInView();
  const langs = [
    { lang:"Nepali", level:"Native", pct:100, color:A3 },
    { lang:"English", level:"Professional Working Proficiency", pct:78, color:A2 },
    { lang:"Hindi",  level:"Conversational", pct:60, color:A },
  ];
  return (
    <section ref={ref} style={{
      padding:"6rem 2.5rem",
      background:"rgba(167,139,250,0.025)",
      borderTop:"1px solid rgba(167,139,250,0.06)",
      borderBottom:"1px solid rgba(167,139,250,0.06)",
    }}>
      <div style={{ maxWidth:820, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all 0.7s", textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel center>Languages</SectionLabel>
          <SectionTitle center>Communication</SectionTitle>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.4rem" }}>
          {langs.map((l,i)=>(
            <div key={l.lang} style={{
              padding:"2rem",
              background:"rgba(255,255,255,0.02)",
              border:`1px solid rgba(167,139,250,0.1)`,
              borderRadius:16,
              opacity:inView?1:0, transform:inView?"none":"translateY(24px)",
              transition:`all 0.6s ${i*0.12}s`,
              position:"relative", overflow:"hidden", textAlign:"center",
            }}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${l.color},transparent)`,opacity:0.7}}/>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:TX,marginBottom:"0.3rem"}}>{l.lang}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.65rem",color:l.color,letterSpacing:1,marginBottom:"1.5rem",opacity:0.9}}>{l.level}</div>
              <div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:100,overflow:"hidden"}}>
                <div style={{
                  height:"100%", width:inView?`${l.pct}%`:"0%",
                  background:`linear-gradient(90deg,${l.color},${l.color}66)`,
                  borderRadius:100, transition:`width 1s ${i*0.12+0.3}s ease`,
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationHighlights() {
  const [ref, inView] = useInView();
  const highlights = [
    { icon:"🏫", title:"Tribhuvan University", detail:"Bachelor's Degree · Computer Science", period:"2022 – Present", color:A2 },
    { icon:"💡", title:"Self-Directed Learning", detail:"Udemy, YouTube, Documentation, Open Source", period:"Ongoing", color:A },
    { icon:"🛠️", title:"Real-World Practice", detail:"Synthbit Technology Internship", period:"2024 – Present", color:A3 },
  ];
  return (
    <section ref={ref} style={{ padding:"6rem 2.5rem 8rem", maxWidth:820, margin:"0 auto" }}>
      <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all 0.7s", textAlign:"center", marginBottom:"3rem" }}>
        <SectionLabel center>Education</SectionLabel>
        <SectionTitle center>Where I Learn</SectionTitle>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.4rem" }}>
        {highlights.map((h,i)=>(
          <div key={h.title} style={{
            padding:"2rem",
            background:"rgba(255,255,255,0.02)",
            border:`1px solid rgba(167,139,250,0.1)`,
            borderRadius:16,
            opacity:inView?1:0, transform:inView?"none":"translateY(24px)",
            transition:`all 0.6s ${i*0.12}s`,
            position:"relative", overflow:"hidden",
          }}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${h.color},transparent)`,opacity:0.7}}/>
            <div style={{fontSize:"2rem",marginBottom:"1rem"}}>{h.icon}</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:TX,marginBottom:"0.4rem"}}>{h.title}</h3>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"0.82rem",color:"rgba(226,228,240,0.5)",lineHeight:1.7,marginBottom:"1rem"}}>{h.detail}</p>
            <span style={{
              padding:"0.22rem 0.75rem",
              background:`${h.color}0e`, border:`1px solid ${h.color}20`,
              borderRadius:100, fontFamily:"'Space Mono',monospace",
              fontSize:"0.62rem", color:h.color,
            }}>{h.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Experience({ navigate }) {
  return (
    <div className="page-enter">
      <PageHero
        label="05 — Journey"
        title="Experience & Background"
        subtitle="My professional path, education, and the environments that shaped me as a developer."
      />
      <Timeline/>
      <LanguagesSection/>
      <EducationHighlights/>
    </div>
  );
}
