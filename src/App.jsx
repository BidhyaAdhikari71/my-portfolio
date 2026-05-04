import { useState, useEffect } from "react";
import "./index.css";

import { NavBar, Footer, GlowCursor, AmbientOrbs } from "./components";

import Home       from "./pages/Home";
import About      from "./pages/About";
import Projects   from "./pages/Projects";
import Skills     from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact    from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (to) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(to);
  };

  const renderPage = () => {
    switch (page) {
      case "home":       return <Home       navigate={navigate}/>;
      case "about":      return <About      navigate={navigate}/>;
      case "projects":   return <Projects   navigate={navigate}/>;
      case "skills":     return <Skills     navigate={navigate}/>;
      case "experience": return <Experience navigate={navigate}/>;
      case "contact":    return <Contact    navigate={navigate}/>;
      default:           return <Home       navigate={navigate}/>;
    }
  };

  return (
    <div style={{ position:"relative", minHeight:"100vh", background:"#0d0f1a" }}>
      <GlowCursor/>
      <AmbientOrbs/>
      <NavBar currentPage={page} navigate={navigate}/>
      <main style={{ position:"relative", zIndex:1 }}>
        {renderPage()}
      </main>
      <Footer navigate={navigate}/>
    </div>
  );
}
