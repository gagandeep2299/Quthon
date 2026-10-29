import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { animate, createDrawable, morphTo, random, remove, stagger } from 'animejs'
import { cases, industries, insights, services, solutions } from './data'

const nav = [
  ['Services', '/services'], ['Solutions', '/solutions'], ['Industries', '/industries'],
  ['Work', '/work'], ['Insights', '/insights'], ['About', '/about'],
]

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('quthon-theme')
    return saved === 'light' ? 'light' : 'dark'
  })
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('quthon-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = loading || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading, menuOpen])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = window.setTimeout(() => setLoading(false), 300)
      return () => window.clearTimeout(timer)
    }

    animate('.loader-mark-shape', {
      d: morphTo('.loader-target-a'),
      rotate: [0, 360],
      duration: 1800,
      alternate: true,
      loop: true,
      ease: 'inOut(2)',
    })
    animate('.loader-ring', {
      rotate: 360,
      duration: 4200,
      loop: true,
      ease: 'linear',
    })
    animate('.loader-word span', {
      opacity: [0, 1],
      y: [8, 0],
      delay: stagger(55),
      duration: 600,
      ease: 'outExpo',
    })

    const timer = window.setTimeout(() => {
      animate('.loading-screen', {
        opacity: [1, 0],
        duration: 650,
        ease: 'inOutQuad',
        complete: () => setLoading(false),
      })
    }, 2100)

    return () => {
      window.clearTimeout(timer)
      remove('.loader-mark-shape, .loader-ring, .loader-word span, .loading-screen')
    }
  }, [])

  useEffect(() => {
    const glow = document.querySelector<HTMLElement>('.cursor-glow')
    if (!glow || window.matchMedia('(pointer: coarse)').matches) return
    const moveGlow = (event: PointerEvent) => {
      glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    }
    window.addEventListener('pointermove', moveGlow)
    return () => window.removeEventListener('pointermove', moveGlow)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

    animate('.hero-copy > *, .page-hero .container > *', {
      opacity: [0, 1],
      y: [24, 0],
      delay: stagger(90, { start: 180 }),
      duration: 900,
      ease: 'outExpo',
    })

    animate('.hero-visual .orb', {
      y: () => random(-18, 18),
      x: () => random(-12, 12),
      rotate: () => random(-25, 25),
      duration: () => random(1800, 3400),
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    })

    animate('.hero-visual .beam', {
      scaleX: [0, 1],
      opacity: [0, 0.8, 0.25],
      delay: stagger(180),
      duration: 1600,
      ease: 'outExpo',
    })

    const drawable = createDrawable('.hero-drawable')
    if (drawable.length) {
      animate(drawable, {
        draw: ['0 0', '0 1', '1 1'],
        delay: stagger(180),
        duration: 1800,
        ease: 'inOut(3)',
      })
    }

    const targets = '.service-card, .solution-panel, .case-card, .insight-card, .industry-selector button, .industry-detail'
    const elements = Array.from(document.querySelectorAll<HTMLElement>(targets))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const animatedElement = entry.target as HTMLElement
        const siblings = Array.from(animatedElement.parentElement?.querySelectorAll<HTMLElement>(targets) ?? [])
          .filter((element) => element.parentElement === animatedElement.parentElement)
        animate(animatedElement, {
          opacity: [0, 1],
          y: [32, 0],
          scale: [0.98, 1],
          delay: siblings.indexOf(animatedElement) * 70,
          duration: 850,
          ease: 'outExpo',
        })
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      remove('.hero-copy > *, .page-hero .container > *, .hero-visual .orb, .hero-visual .beam')
      remove(elements)
    }
  }, [pathname])

  return <div className="site-shell">
    {loading && <div className="loading-screen" role="status" aria-label="Loading Quthon">
      <div className="loader-brand">
        <svg className="loader-logo" viewBox="0 0 120 120" aria-hidden="true">
          <circle className="loader-ring" cx="60" cy="60" r="54" />
          <path className="loader-mark-shape" d="M60 20 C82 20 100 38 100 60 C100 82 82 100 60 100 C38 100 20 82 20 60 C20 38 38 20 60 20 Z" />
          <path className="loader-target-a" d="M60 18 L102 42 L102 78 L60 102 L18 78 L18 42 Z" />
          <path className="loader-target-b" d="M34 26 C58 14 92 24 104 48 C116 72 98 98 70 104 C42 110 16 94 14 66 C12 48 20 34 34 26 Z" />
        </svg>
        <div className="loader-word" aria-hidden="true">{'QUTHON'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}</div>
      </div>
    </div>}
    <div className="cursor-glow" aria-hidden="true" />
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="header inner-header" aria-label="Primary navigation">
      <div className="nav-wrap container">
        <NavLink className="brand" to="/" aria-label="Quthon home" onClick={() => setMenuOpen(false)}><span className="brand-mark">Q</span><span>QUTHON</span></NavLink>
        <nav className="desktop-nav" aria-label="Main menu">{nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav>
        <NavLink className="nav-contact" to="/contact">Let’s talk <span className="arrow" aria-hidden="true">→</span></NavLink>
        <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span className="theme-toggle-track"><span className="theme-toggle-icon">{theme === 'dark' ? '☾' : '☀'}</span></span></button>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
      </div>
      {menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile menu">
        {nav.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>{label}<span aria-hidden="true">→</span></NavLink>)}
        <NavLink className="mobile-cta" to="/contact" onClick={() => setMenuOpen(false)}>Start a conversation</NavLink>
      </nav>}
    </header>
    <main id="main-content"><Outlet /></main>
    <footer><div className="container footer-grid"><div className="footer-brand"><NavLink className="brand" to="/"><span className="brand-mark">Q</span><span>QUTHON</span></NavLink><p>Engineering what moves enterprise forward.</p></div><div className="footer-links"><div><strong>Explore</strong>{nav.slice(0, 3).map(([label,path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</div><div><strong>Discover</strong>{nav.slice(3).map(([label,path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</div><div><strong>Connect</strong><a href="mailto:hello@quthon.com">Email</a><NavLink to="/contact">Contact</NavLink><a href="#top">LinkedIn</a></div></div></div><div className="container footer-bottom"><span>© 2026 Quthon. All rights reserved.</span><div><NavLink to="/">Privacy</NavLink><NavLink to="/">Accessibility</NavLink></div></div></footer>
  </div>
}

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead: string }) {
  return <section className="page-hero"><div className="container"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><p>{lead}</p></div></section>
}

export function HomePage() {
  return <>
    <section className="hero" id="top"><div className="hero-grid container"><div className="hero-copy"><p className="eyebrow"><span /> Enterprise technology, engineered</p><h1>Move complexity.<br /><em>Build momentum.</em></h1><p className="hero-lede">We help ambitious organizations modernize systems, unlock trusted data, and deliver digital products that create measurable value.</p><div className="hero-actions"><NavLink className="button button-primary" to="/contact">Start a conversation →</NavLink><NavLink className="button button-secondary" to="/work">Explore our work</NavLink></div></div><div className="hero-visual" aria-hidden="true"><div className="orb orb-one"/><div className="orb orb-two"/><div className="orb orb-three"/><div className="beam beam-one"/><div className="beam beam-two"/><svg className="hero-svg" viewBox="0 0 520 520" aria-hidden="true"><path className="hero-drawable" d="M68 410 C160 360 145 220 260 260 S348 420 452 330"/><path className="hero-drawable" d="M92 140 C180 100 220 180 300 118 S410 60 452 150"/><circle cx="68" cy="410" r="5"/><circle cx="452" cy="330" r="5"/></svg><div className="visual-core"><span>OUTCOME</span><strong>01</strong></div></div></div><div className="proof-strip container"><div><strong>120+</strong><span>enterprise programs</span></div><div><strong>18</strong><span>global delivery hubs</span></div><div><strong>92%</strong><span>repeat partnerships</span></div><div><strong>4.8×</strong><span>average value realized</span></div></div></section>
    <div className="signal-marquee" aria-label="Capabilities"><div className="signal-track"><span>AI PRODUCTS</span><i>✦</i><span>PLATFORM ENGINEERING</span><i>✦</i><span>DATA &amp; CLOUD</span><i>✦</i><span>EXPERIENTIAL DESIGN</span><i>✦</i><span>AI PRODUCTS</span><i>✦</i><span>PLATFORM ENGINEERING</span><i>✦</i><span>DATA &amp; CLOUD</span><i>✦</i><span>EXPERIENTIAL DESIGN</span><i>✦</i></div></div>
    <section className="section services-section"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span /> What we do</p><h2>From strategy to<br />ship-ready systems.</h2></div><p>Quthon brings the disciplines together—so your biggest transformation never becomes six disconnected projects.</p></div><div className="service-grid">{services.map(service => <article className="service-card" key={service.title}><div className="service-top"><span>{service.number}</span><div className={`service-glyph ${service.icon}`}><i/><i/><i/></div></div><h3>{service.title}</h3><p>{service.text}</p><NavLink to="/services">Explore →</NavLink></article>)}</div></div></section>
    <section className="section work-section"><div className="container"><div className="work-heading"><div><p className="eyebrow"><span /> Proof in practice</p><h2>Transformation that<br />shows up in the numbers.</h2></div><NavLink className="text-link" to="/work">View all work →</NavLink></div><div className="case-grid">{cases.map((item,index)=><article className={`case-card case-${index+1}`} key={item.title}><div className="case-art"><span/><i/><b/></div><div className="case-body"><p>{item.sector}</p><h3>{item.title}</h3><div className="case-result"><strong>{item.metric}</strong><span>{item.metricLabel}</span></div><p className="case-copy">{item.body}</p><NavLink to="/work">Read case study →</NavLink></div></article>)}</div></div></section>
    <section className="contact-section"><div className="container"><p className="eyebrow"><span /> Start a conversation</p><div className="contact-grid"><h2>What needs to<br /><em>move forward?</em></h2><div><p>Bring us the hard problem, the ambitious target, or the transformation that cannot wait.</p><NavLink className="contact-button" to="/contact">Start a conversation →</NavLink></div></div></div></section>
  </>
}

export function ServicesPage() { return <><PageHero eyebrow="Services" title={<>Technology capability,<br/><em>connected.</em></>} lead="Strategy, engineering, data, cloud, and delivery in one accountable partnership."/><section className="section"><div className="container"><div className="service-grid">{services.map(service=><article className="service-card" key={service.title}><div className="service-top"><span>{service.number}</span><div className={`service-glyph ${service.icon}`}><i/><i/><i/></div></div><h3>{service.title}</h3><p>{service.text}</p><NavLink to="/contact">Discuss your challenge →</NavLink></article>)}</div></div></section></> }

export function SolutionsPage() { return <><PageHero eyebrow="Solutions" title={<>Build for the outcomes<br/><em>that matter.</em></>} lead="Pragmatic transformation across digital core, intelligent operations, and connected experiences."/><section className="section"><div className="container solution-list">{solutions.map((solution,index)=><article className="solution-panel" key={solution.title}><div className="solution-index">0{index+1}</div><div className="solution-copy"><p>{solution.eyebrow}</p><h3>{solution.title}</h3><span>{solution.text}</span></div><div className="solution-metric"><strong>{solution.metric}</strong><p>{solution.label}</p></div><NavLink to="/contact">→</NavLink></article>)}</div></section></> }

export function IndustriesPage() {
  const [activeIndustry,setActiveIndustry]=useState(0)
  return <><PageHero eyebrow="Industries" title={<>Deep context.<br/><em>Decisive progress.</em></>} lead="Sector expertise that turns complex operating realities into practical technology decisions."/><section className="section"><div className="container industry-layout"><div className="industry-selector" role="tablist" aria-label="Industry sectors">{industries.map((industry,index)=><button role="tab" aria-selected={activeIndustry===index} className={activeIndustry===index?'active':''} key={industry.name} onClick={()=>setActiveIndustry(index)}><span>0{index+1}</span><strong>{industry.name}</strong><span>→</span></button>)}</div><div className="industry-detail" role="tabpanel"><span>0{activeIndustry+1} — 05</span><div className="industry-shape"><i/><i/><i/></div><p>{industries[activeIndustry].text}</p><NavLink to="/contact">Explore industry solutions →</NavLink></div></div></section></>
}

export function WorkPage() { return <><PageHero eyebrow="Work" title={<>Transformation you can<br/><em>measure.</em></>} lead="Selected programs where technology decisions created resilient capabilities and measurable business value."/><section className="section work-section"><div className="container case-grid">{cases.map((item,index)=><article className={`case-card case-${index+1}`} key={item.title}><div className="case-art"><span/><i/><b/></div><div className="case-body"><p>{item.sector}</p><h3>{item.title}</h3><div className="case-result"><strong>{item.metric}</strong><span>{item.metricLabel}</span></div><p className="case-copy">{item.body}</p><NavLink to="/contact">Discuss a similar program →</NavLink></div></article>)}</div></section></> }

export function InsightsPage() { return <><PageHero eyebrow="Insights" title={<>Ideas for what<br/><em>comes next.</em></>} lead="Research, field guidance, and executive perspectives for the technology decisions ahead."/><section className="section"><div className="container insight-grid">{insights.map((insight,index)=><article className="insight-card" key={insight.title}><div className={`insight-art insight-${index+1}`}><span/><i/></div><div className="insight-meta"><span>{insight.type}</span><span>{insight.time}</span></div><h3>{insight.title}</h3><time>{insight.date}</time></article>)}</div></section></> }

export function AboutPage() { return <><PageHero eyebrow="About Quthon" title={<>Built to solve.<br/><em>Wired to deliver.</em></>} lead="A technology and transformation partner for organizations that refuse to choose between ambition and accountability."/><section className="section"><div className="container about-layout"><div><h2>One team.<br/>Shared outcomes.</h2></div><div className="about-copy"><p>Quthon combines strategic clarity, deep engineering, and embedded delivery to turn important technology initiatives into durable business capability.</p><p>Our teams work alongside yours, building the confidence and systems needed to keep creating value after the program ends.</p><NavLink className="text-link" to="/contact">Meet Quthon →</NavLink></div></div></section></> }

export function ContactPage() { return <><PageHero eyebrow="Contact" title={<>Let’s move something<br/><em>important forward.</em></>} lead="Bring us the hard problem, the ambitious target, or the transformation that cannot wait."/><section className="section"><div className="container contact-page-grid"><div><h2>Start a conversation</h2><p>Tell us where you want to go and what is standing in the way.</p><a className="contact-button" href="mailto:hello@quthon.com">hello@quthon.com →</a></div><form className="contact-form" onSubmit={event=>{event.preventDefault(); const data=new FormData(event.currentTarget); window.location.href=`mailto:hello@quthon.com?subject=Quthon inquiry from ${encodeURIComponent(String(data.get('name')))}`}}><label>Name<input name="name" required /></label><label>Work email<input name="email" type="email" required /></label><label>Organization<input name="organization" /></label><label>What can we help with?<textarea name="message" rows={5} required /></label><button className="button button-primary" type="submit">Send inquiry →</button></form></div></section></> }
