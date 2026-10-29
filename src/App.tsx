import { useEffect, useState } from 'react'
import { cases, industries, insights, services, solutions } from './data'

const nav = [
  ['Services', 'services'], ['Solutions', 'solutions'], ['Industries', 'industries'],
  ['Work', 'work'], ['Insights', 'insights'], ['About', 'about'],
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndustry, setActiveIndustry] = useState(0)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="header" aria-label="Primary navigation">
        <div className="nav-wrap container">
          <a className="brand" href="#top" aria-label="Quthon home"><span className="brand-mark">Q</span><span>QUTHON</span></a>
          <nav className="desktop-nav" aria-label="Main menu">
            {nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <a className="nav-contact" href="#contact">Let’s talk <span className="arrow" aria-hidden="true">?</span></a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <span aria-hidden="true">�</span> : <span aria-hidden="true">?</span>}
          </button>
        </div>
        {menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile menu">
          {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<span className="arrow" aria-hidden="true">?</span></a>)}
          <a className="mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a conversation</a>
        </nav>}
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Enterprise technology, engineered</p>
              <h1>Move complexity.<br /><em>Build momentum.</em></h1>
              <p className="hero-lede">We help ambitious organizations modernize systems, unlock trusted data, and deliver digital products that create measurable value.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Start a conversation <span className="arrow" aria-hidden="true">?</span></a>
                <a className="button button-secondary" href="#work">Explore our work</a>
              </div>
            </div>
            <div className="hero-visual" aria-label="Abstract geometric visualization of connected enterprise systems">
              <div className="orb orb-one" /><div className="orb orb-two" /><div className="orb orb-three" />
              <div className="beam beam-one" /><div className="beam beam-two" /><div className="beam beam-three" />
              <div className="visual-core"><span>OUTCOME</span><strong>01</strong></div>
              <div className="visual-label label-one"><span>DATA</span><i /></div>
              <div className="visual-label label-two"><span>PLATFORM</span><i /></div>
              <div className="visual-label label-three"><span>VALUE</span><i /></div>
            </div>
          </div>
          <div className="proof-strip container">
            <div><strong>120+</strong><span>enterprise programs</span></div>
            <div><strong>18</strong><span>global delivery hubs</span></div>
            <div><strong>92%</strong><span>repeat partnerships</span></div>
            <div><strong>4.8×</strong><span>average value realized</span></div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow"><span /> What we do</p><h2>From strategy to<br />ship-ready systems.</h2></div><p>Quthon brings the disciplines together—so your biggest transformation never becomes six disconnected projects.</p></div>
            <div className="service-grid">
              {services.map((service) => <article className="service-card" key={service.number}><div className="service-top"><span>{service.number}</span><div className={`service-glyph ${service.icon}`}><i /><i /><i /></div></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Learn about ${service.title}`}>Explore <span className="arrow" aria-hidden="true">?</span></a></article>)}
            </div>
          </div>
        </section>

        <section className="section solutions-section" id="solutions">
          <div className="container">
            <p className="eyebrow"><span /> Solutions</p>
            <div className="solutions-head"><h2>Build the future around<br />what matters most.</h2><p>Pragmatic transformation across the business capabilities, technology foundations, and human experiences that shape performance.</p></div>
            <div className="solution-list">
              {solutions.map((solution, index) => <article className="solution-panel" key={solution.title}><div className="solution-index">0{index + 1}</div><div className="solution-copy"><p>{solution.eyebrow}</p><h3>{solution.title}</h3><span>{solution.text}</span></div><div className="solution-metric"><strong>{solution.metric}</strong><p>{solution.label}</p></div><a href="#contact" aria-label={`Explore ${solution.title}`}><span className="arrow" aria-hidden="true">?</span></a></article>)}
            </div>
          </div>
        </section>

        <section className="section industries-section" id="industries">
          <div className="container industry-layout">
            <div className="industry-intro"><p className="eyebrow"><span /> Industries</p><h2>Deep context.<br />Decisive progress.</h2><p>Our teams understand the operating realities behind each sector—so solutions are designed for adoption, not just architecture.</p></div>
            <div className="industry-selector" role="tablist" aria-label="Industry sectors">
              {industries.map((industry, index) => <button role="tab" aria-selected={activeIndustry === index} className={activeIndustry === index ? 'active' : ''} key={industry.name} onClick={() => setActiveIndustry(index)}><span>0{index + 1}</span><strong>{industry.name}</strong><span className="arrow" aria-hidden="true">?</span></button>)}
            </div>
            <div className="industry-detail" role="tabpanel"><span>01 — 05</span><div className="industry-shape"><i /><i /><i /></div><p>{industries[activeIndustry].text}</p><a href="#contact">Explore industry solutions <span className="arrow" aria-hidden="true">?</span></a></div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="work-heading"><div><p className="eyebrow"><span /> Proof in practice</p><h2>Transformation that<br />shows up in the numbers.</h2></div><a className="text-link" href="#contact">View all work <span className="arrow" aria-hidden="true">?</span></a></div>
            <div className="case-grid">
              {cases.map((item, index) => <article className={`case-card case-${index + 1}`} key={item.title}><div className="case-art"><span /><i /><b /></div><div className="case-body"><p>{item.sector}</p><h3>{item.title}</h3><div className="case-result"><strong>{item.metric}</strong><span>{item.metricLabel}</span></div><p className="case-copy">{item.body}</p><a href="#contact" aria-label={`Read case study: ${item.title}`}>Read case study <span className="arrow" aria-hidden="true">?</span></a></div></article>)}
            </div>
          </div>
        </section>

        <section className="testimonial-section"><div className="container"><div className="quote-mark">“</div><blockquote>Quthon did more than modernize our technology. They changed the pace and confidence with which our teams make decisions.</blockquote><div className="quote-person"><span>CTO</span><strong>Global financial services organization</strong></div></div></section>

        <section className="section insights-section" id="insights">
          <div className="container">
            <div className="insights-head"><div><p className="eyebrow"><span /> Insights</p><h2>Ideas for what comes next.</h2></div><a className="text-link" href="#contact">View all insights <span className="arrow" aria-hidden="true">?</span></a></div>
            <div className="insight-grid">{insights.map((insight, index) => <article className="insight-card" key={insight.title}><div className={`insight-art insight-${index + 1}`}><span /><i /></div><div className="insight-meta"><span>{insight.type}</span><span>{insight.time}</span></div><h3>{insight.title}</h3><time>{insight.date}</time></article>)}</div>
          </div>
        </section>

        <section className="section about-section" id="about"><div className="container about-layout"><div><p className="eyebrow"><span /> About Quthon</p><h2>Built to solve,<br />wired to deliver.</h2></div><div className="about-copy"><p>Quthon is a technology and transformation partner for organizations that refuse to choose between ambition and accountability.</p><p>We combine strategic clarity, deep engineering, and embedded delivery to turn important technology initiatives into durable business capability.</p><a className="text-link" href="#contact">Meet Quthon <span className="arrow" aria-hidden="true">?</span></a></div></div></section>

        <section className="contact-section" id="contact"><div className="container"><p className="eyebrow"><span /> Start a conversation</p><div className="contact-grid"><h2>What needs to<br /><em>move forward?</em></h2><div><p>Bring us the hard problem, the ambitious target, or the transformation that cannot wait. We’ll help you find the clearest route to value.</p><a href="mailto:hello@quthon.com" className="contact-button">hello@quthon.com <span className="arrow" aria-hidden="true">→</span></a></div></div></div></section>
      </main>

      <footer><div className="container footer-grid"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">Q</span><span>QUTHON</span></a><p>Engineering what moves enterprise forward.</p></div><div className="footer-links"><div><strong>Explore</strong>{nav.slice(0, 3).map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div><strong>Discover</strong>{nav.slice(3).map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div><strong>Connect</strong><a href="mailto:hello@quthon.com">Email</a><a href="#contact">Contact</a><a href="#top">LinkedIn</a></div></div></div><div className="container footer-bottom"><span>© 2026 Quthon. All rights reserved.</span><div><a href="#top">Privacy</a><a href="#top">Accessibility</a></div></div></footer>
    </div>
  )
}
