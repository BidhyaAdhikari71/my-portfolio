import { useState } from "react";
import { A, A2, A3, BG, TX, useInView, SectionLabel, SectionTitle, PageHero } from "../components";
import { PERSONAL } from "../data";

function ContactCards() {
  const [ref, inView] = useInView();
  const contacts = [
    { label:"Email",    value:PERSONAL.email,    icon:"✉️", href:`mailto:${PERSONAL.email}`,   color:A  },
    { label:"Phone",    value:PERSONAL.phone,    icon:"📞", href:`tel:${PERSONAL.phone}`,       color:A2 },
    { label:"LinkedIn", value:"bidhya-adhikari-58b249317", icon:"🔗", href:PERSONAL.linkedin,  color:A  },
    { label:"GitHub",   value:"BidhyaAdhikari71",    icon:"💻", href:PERSONAL.github,               color:A2 },
    { label:"Location", value:PERSONAL.location, icon:"📍", href:"#",                           color:A3 },
    { label:"Status",   value:"Open to Work",    icon:"🟢", href:"#",                           color:A3 },
  ];
  return (
    <section ref={ref} style={{ padding:"2rem 2.5rem 4rem", maxWidth:900, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1rem" }}>
        {contacts.map((c,i)=>(
          <a key={c.label} href={c.href} style={{
            padding:"1.5rem",
            background:"rgba(255,255,255,0.02)",
            border:`1px solid rgba(167,139,250,0.1)`,
            borderRadius:14, textDecoration:"none",
            display:"flex", alignItems:"center", gap:"1rem",
            transition:"all 0.3s",
            opacity:inView?1:0,
            animation:inView?`fadeInUp 0.5s ${i*0.08}s both`:"none",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background=`${c.color}08`;e.currentTarget.style.borderColor=`${c.color}35`;e.currentTarget.style.transform="translateY(-3px)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";e.currentTarget.style.borderColor="rgba(167,139,250,0.1)";e.currentTarget.style.transform="none";}}
          >
            <div style={{
              width:46, height:46, borderRadius:12,
              background:`${c.color}10`, border:`1px solid ${c.color}20`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", flexShrink:0,
            }}>{c.icon}</div>
            <div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.62rem",color:c.color,letterSpacing:2,textTransform:"uppercase",marginBottom:4,opacity:0.85}}>{c.label}</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"0.85rem",color:"rgba(226,228,240,0.7)",wordBreak:"break-all"}}>{c.value}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  const inputStyle = {
    width:"100%", padding:"0.9rem 1.1rem",
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(167,139,250,0.14)",
    borderRadius:10, color:TX,
    fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.9rem",
    outline:"none", transition:"border-color 0.3s",
  };

  const labelStyle = {
    display:"block", fontFamily:"'Space Mono',monospace",
    fontSize:"0.65rem", color:A, letterSpacing:2,
    textTransform:"uppercase", marginBottom:"0.6rem",
  };

  return (
    <section ref={ref} style={{
      padding:"4rem 2.5rem 8rem",
      background:"rgba(167,139,250,0.02)",
      borderTop:"1px solid rgba(167,139,250,0.06)",
    }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all 0.7s", textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel center>Send a Message</SectionLabel>
          <SectionTitle center>Let's Talk</SectionTitle>
          <p style={{ fontFamily:"'Space Grotesk',sans-serif", color:"rgba(226,228,240,0.45)", fontSize:"0.95rem", lineHeight:1.8 }}>
            Have a project in mind or just want to chat? Drop me a message — I typically respond within 24 hours.
          </p>
        </div>

        {sent ? (
          <div style={{
            padding:"3rem", textAlign:"center",
            background:"rgba(134,239,172,0.05)", border:"1px solid rgba(134,239,172,0.2)",
            borderRadius:16, animation:"fadeInUp 0.5s both",
          }}>
            <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>✅</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:A3, fontSize:"1.3rem", marginBottom:"0.5rem" }}>Message Sent!</h3>
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", color:"rgba(226,228,240,0.55)", fontSize:"0.9rem" }}>Thanks for reaching out. I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ opacity:inView?1:0, transition:"all 0.8s 0.2s" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem", marginBottom:"1.2rem" }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  name="name" value={form.name} onChange={handle}
                  placeholder="Bidhya Adhikari"
                  style={inputStyle}
                  onFocus={e=>{e.target.style.borderColor=A;}}
                  onBlur={e=>{e.target.style.borderColor="rgba(167,139,250,0.14)";}}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="email" type="email" value={form.email} onChange={handle}
                  placeholder="hello@email.com"
                  style={inputStyle}
                  onFocus={e=>{e.target.style.borderColor=A;}}
                  onBlur={e=>{e.target.style.borderColor="rgba(167,139,250,0.14)";}}
                />
              </div>
            </div>

            <div style={{ marginBottom:"1.2rem" }}>
              <label style={labelStyle}>Subject</label>
              <input
                name="subject" value={form.subject} onChange={handle}
                placeholder="Project Inquiry / Job Opportunity / Just saying hi"
                style={inputStyle}
                onFocus={e=>{e.target.style.borderColor=A;}}
                onBlur={e=>{e.target.style.borderColor="rgba(167,139,250,0.14)";}}
              />
            </div>

            <div style={{ marginBottom:"2rem" }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message" value={form.message} onChange={handle}
                placeholder="Tell me about your project, idea, or opportunity..."
                rows={6}
                style={{ ...inputStyle, resize:"vertical", minHeight:140 }}
                onFocus={e=>{e.target.style.borderColor=A;}}
                onBlur={e=>{e.target.style.borderColor="rgba(167,139,250,0.14)";}}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              width:"100%", padding:"1rem",
              background:`linear-gradient(135deg,${A},${A2})`,
              border:"none", borderRadius:10, cursor:loading?"not-allowed":"pointer",
              fontFamily:"'Syne',sans-serif", fontWeight:700,
              fontSize:"0.88rem", letterSpacing:1.5, textTransform:"uppercase",
              color:BG, opacity:loading?0.7:1,
              boxShadow:`0 8px 28px rgba(167,139,250,0.28)`,
              transition:"all 0.3s",
            }}
            onMouseEnter={e=>{if(!loading)e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";}}
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default function Contact({ navigate }) {
  return (
    <div className="page-enter">
      <PageHero
        label="06 — Contact"
        title="Get In Touch"
        subtitle="I'm actively seeking new opportunities. Whether it's a job, freelance project, or just a tech conversation — my inbox is always open."
      />
      <ContactCards/>
      <ContactForm/>
    </div>
  );
}
