'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import Lenis from 'lenis';
import Mochi from './components/Mochi';
import { contact, projects, labItems, cities } from './content';

const chapters = [
  { id: 'profile', number: 'I', name: 'Profile', anchor: 'identity' },
  { id: 'work', number: 'II', name: 'Work', anchor: 'selected-work' },
  { id: 'journey', number: 'III', name: 'Journey', anchor: 'journey' },
  { id: 'contact', number: 'IV', name: 'Contact', anchor: 'contact' },
] as const;
type Chapter = typeof chapters[number]['id'];

const icons = {
  email: <><rect width="20" height="16" x="2" y="4" rx="1" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>,
  github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>,
};
function ContactIcon({ name }: { name: keyof typeof icons }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}
function Keywords({ words }: { words: readonly string[] }) {
  return <p className="keywords">{words.map(word => <span key={word}>{word}</span>)}</p>;
}
function FrameMarks() { return <span className="frame-marks" aria-hidden="true"><i /><i /><i /><i /></span>; }

function useSceneMotion() {
  const [chapter, setChapter] = useState<Chapter>('profile');
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const sections = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
    const chapterSections = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
    let pending = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    let frame = 0;
    let current: Chapter = 'profile';
    const update = () => {
      frame = 0;
      const height = innerHeight;
      for (const section of sections) {
        const box = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (height - box.top) / (box.height + height)));
        const reveal = Math.max(0, Math.min(1, (height * .83 - box.top) / (height * .82)));
        section.style.setProperty('--progress', reduced.matches ? '.5' : progress.toFixed(4));
        section.style.setProperty('--reveal', reduced.matches ? '1' : reveal.toFixed(4));
        section.style.setProperty('--pan', reduced.matches ? '0' : Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - height))).toFixed(4));
        section.dataset.visible = String(box.top < height && box.bottom > 0);
      }
      pending = pending.filter(node => {
        const box = node.getBoundingClientRect();
        if (box.top > height * .88 || box.bottom < 0) return true;
        node.dataset.shown = 'true';
        return false;
      });
      let next: Chapter = 'profile';
      for (const section of chapterSections) if (section.getBoundingClientRect().top < height * .5) next = section.dataset.chapter as Chapter;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) next = 'contact';
      if (next !== current) { current = next; setChapter(next); }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    const finish = () => { root.dataset.intro = 'off'; };
    const key = (event: KeyboardEvent) => { if (['Escape', 'Tab', 'PageDown', 'ArrowDown'].includes(event.key)) finish(); };
    const pointer = (event: globalThis.PointerEvent) => {
      if (reduced.matches) return;
      root.style.setProperty('--pointer-x', ((event.clientX / innerWidth - .5) * 2).toFixed(3));
      root.style.setProperty('--pointer-y', ((event.clientY / innerHeight - .5) * 2).toFixed(3));
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    const resetPointer = (event: globalThis.PointerEvent) => {
      if (event.relatedTarget) return;
      root.style.setProperty('--pointer-x', '0');
      root.style.setProperty('--pointer-y', '0');
    };
    // Titles and images arrive once as they enter the frame; without motion they are simply present.
    root.dataset.motion = reduced.matches ? 'off' : 'on';
    // Smooth scrolling only for wheel input; touch and reduced motion keep native scrolling.
    const lenis = reduced.matches ? null : new Lenis({ autoRaf: true, anchors: { offset: -20 }, lerp: .11 });
    lenis?.on('scroll', queue);
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerout', resetPointer, { passive: true });
    window.addEventListener('pointerdown', finish, { passive: true });
    window.addEventListener('wheel', finish, { passive: true, once: true });
    window.addEventListener('touchstart', finish, { passive: true, once: true });
    document.addEventListener('keydown', key); reduced.addEventListener('change', queue);
    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue);
      window.removeEventListener('pointermove', pointer); window.removeEventListener('pointerdown', finish);
      window.removeEventListener('pointerout', resetPointer);
      window.removeEventListener('wheel', finish); window.removeEventListener('touchstart', finish);
      document.removeEventListener('keydown', key); reduced.removeEventListener('change', queue);
    };
  }, []);
  return chapter;
}

/* One label follows the pointer over any gateway; touch devices keep the static label inside the image. */
function CursorLabel() {
  const label = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = label.current;
    if (!node || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0, shown = false;
    const tick = () => {
      x += (tx - x) * (reduced ? 1 : .2); y += (ty - y) * (reduced ? 1 : .2);
      node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > .3 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: globalThis.PointerEvent) => {
      tx = event.clientX; ty = event.clientY;
      const host = (event.target as Element | null)?.closest?.<HTMLElement>('[data-cursor]');
      if (host) {
        if (!shown) { x = tx; y = ty; }
        node.textContent = host.dataset.cursor ?? '';
        shown = true; node.dataset.shown = 'true';
      } else if (shown) { shown = false; node.dataset.shown = 'false'; }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    document.documentElement.dataset.cursorLabel = 'on';
    window.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); };
  }, []);
  return <div className="cursor-label" ref={label} aria-hidden="true" data-shown="false" />;
}

function SageVista() {
  const [active, setActive] = useState(false);
  return <section className="scene sage-scene" id="sage-vista" data-scene data-chapter="work" data-active={active} aria-labelledby="sage-title">
    <div className="sage-stage">
      <span className="scene-number">01 / SELECTED PROJECT</span>
      <div className="project-heading"><p className="eyebrow">SYSTEMS THAT MAKE SENSE.</p><h2 id="sage-title" data-reveal>Sage Vista<span className="title-dot">.</span></h2><p className="project-category">{projects.sage.category}</p><Keywords words={projects.sage.keywords} /></div>
      <span className="ghost-word sage-ghost" aria-hidden="true">INSIGHT</span>
      <div className="sage-media" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
        <a href={projects.sage.url} target="_blank" rel="noopener noreferrer" className="project-gateway" data-cursor="VIEW LIVE ↗" aria-label="View Sage Vista live in a new tab">
          <img src={projects.sage.image} alt="Sage Vista’s ranked stock candidates, showing scores and the reason behind each selection." width="1948" height="1971" loading="lazy" draggable="false" />
          <span className="gateway-label">VIEW LIVE <span>↗</span></span><FrameMarks />
        </a>
        <p className="media-note"><span>RESEARCH / RANKING / DECISION LOGIC</span><span>01—04</span></p>
      </div>
      <p className="scene-bottom-note">A framework behind the decision.</p>
    </div>
  </section>;
}

function Analytics() {
  return <section className="scene analytics-scene" id="trading-analytics" data-scene data-chapter="work" aria-labelledby="analytics-title">
    <span className="scene-number">02 / SELECTED PROJECT</span>
    <span className="analytics-grid" aria-hidden="true" />
    <div className="analytics-title"><p className="eyebrow">FROM RECORDS TO RECOGNITION.</p><h2 id="analytics-title" data-reveal>Trading <span>analytics.</span></h2><p className="project-category">Trading analytics dashboard · Power BI</p><Keywords words={['INSIGHT', 'CLARITY']} /></div>
    <p className="analytics-reserved"><span>POWER BI</span><span>CASE IN PREPARATION</span></p>
  </section>;
}
function MaxRebate() {
  const [active, setActive] = useState(false);
  return <section className="scene rebate-scene" id="max-rebate" data-scene data-chapter="work" data-active={active} aria-labelledby="rebate-title">
    <span className="scene-number">03 / SELECTED PROJECT</span>
    <div className="rebate-heading"><p className="eyebrow">A CLEARER WAY THROUGH.</p><h2 id="rebate-title" data-reveal>Max-Rebate<span className="title-dot">.</span></h2><p className="project-category">{projects.rebate.category}</p></div>
    <Keywords words={projects.rebate.keywords} />
    <span className="ghost-word rebate-ghost" aria-hidden="true">CLARITY</span>
    <div className="rebate-echo" aria-hidden="true"><img src={projects.rebate.image} alt="" width="2226" height="1280" loading="lazy" /></div>
    <div className="rebate-surface" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}><p className="surface-label"><span>MAX-REBATE.COM</span><span>PRODUCT / CUSTOMER JOURNEY</span></p>
      <a className="rebate-window project-gateway" href={projects.rebate.url} target="_blank" rel="noopener noreferrer" data-cursor="VISIT SITE ↗" aria-label="Visit the live Max-Rebate website in a new tab">
        <div className="website-strip"><img src="/images/max-rebate-full-en.jpg" alt="The live English Max-Rebate website, from its rebate introduction through eligibility and account guidance." width="1440" height="4382" loading="lazy" draggable="false" /></div>
        <span className="gateway-label">VISIT SITE <span>↗</span></span><FrameMarks />
      </a>
      <p className="media-note"><span>ELIGIBILITY → GUIDANCE → APPLICATION</span><span>03—04</span></p>
    </div>
  </section>;
}

const trailCrops = ['12% 8%', '8% 70%', '60% 72%', '85% 20%', '40% 40%', '75% 90%'];
function Lab() {
  const [active, setActive] = useState<string | null>(null);
  const trail = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0, t: 0, n: 0 });
  // Fast movement across the empty space leaves a few short-lived fragments of the real app output.
  const leaveTrail = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !trail.current || document.documentElement.dataset.motion !== 'on') return;
    if ((event.target as Element).closest('.lab-window')) return;
    const now = performance.now(), prev = last.current;
    const distance = Math.hypot(event.clientX - prev.x, event.clientY - prev.y);
    if (distance < 90 || now - prev.t < 70) return;
    last.current = { x: event.clientX, y: event.clientY, t: now, n: prev.n + 1 };
    const box = event.currentTarget.getBoundingClientRect();
    const fragment = document.createElement('span');
    fragment.className = 'lab-fragment';
    fragment.style.left = `${event.clientX - box.left}px`;
    fragment.style.top = `${event.clientY - box.top}px`;
    fragment.style.backgroundPosition = trailCrops[prev.n % trailCrops.length];
    trail.current.append(fragment);
    while (trail.current.children.length > 6) trail.current.firstElementChild?.remove();
    fragment.addEventListener('animationend', () => fragment.remove());
  };
  return <section className="scene lab-scene" id="lab" data-scene data-chapter="work" data-active={active ?? ''} aria-labelledby="lab-title" onPointerMove={leaveTrail} onPointerLeave={() => setActive(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}>
    <span className="scene-number">04 / SELECTED PROJECT</span>
    <div className="lab-trail" ref={trail} aria-hidden="true" />
    <div className="lab-heading"><p className="eyebrow">SMALL BUILDS. USEFUL HABITS.</p><h2 id="lab-title" data-reveal>Lab<span className="title-dot">.</span></h2><p className="project-category">Automation tools &amp; Discord apps</p><Keywords words={['SYSTEMS']} /></div>
    <span className="ghost-word lab-ghost" aria-hidden="true">SYSTEMS</span>
    <p className="lab-guide">A few experiments in making things work.<span>SWIPE TO EXPLORE →</span></p>
    <div className="lab-windows">
      {labItems.map((item, index) => <article className={`lab-window lab-window--${item.crop}`} key={item.id} data-selected={active === item.id} data-reveal style={{ '--window-index': index } as CSSProperties}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" data-cursor="VIEW PROJECT ↗" aria-label={`View ${item.title} on GitHub in a new tab`} onPointerEnter={() => setActive(item.id)} onFocus={() => setActive(item.id)}>
          <div className="window-bar"><span>{item.number}</span><span>{item.title}</span><span aria-hidden="true">↗</span></div>
          <div className={`lab-crop crop--${item.crop}`}><img src="/images/lab-discord-apps.png" alt={item.alt} width="2978" height="2660" loading="lazy" draggable="false" /></div>
          <div className="window-footer"><span>{item.kind}</span><span className="window-visit">VIEW PROJECT ↗</span></div>
        </a>
      </article>)}
    </div>
    <p className="lab-footnote">TWO APPS / THREE VIEWS</p>
  </section>;
}
function Journey() {
  const [selected, setSelected] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const select = (index: number) => setSelected(Math.max(0, Math.min(cities.length - 1, index)));
  const dragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as Element).closest('button,a')) return;
    start.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const dragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const delta = event.clientX - start.current.x;
    event.currentTarget.style.setProperty('--drag-x', `${Math.max(-55, Math.min(55, delta * .18))}px`);
  };
  const dragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (start.current) {
      const dx = event.clientX - start.current.x, dy = event.clientY - start.current.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) select(selected + (dx < 0 ? 1 : -1));
    }
    start.current = null;
    event.currentTarget.style.setProperty('--drag-x', '0px');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const city = cities[selected];
  return <section className="scene journey-scene" id="journey" data-scene data-chapter="journey" aria-labelledby="journey-title">
    <div className="chapter-title journey-heading">
      <p className="chapter-mark">III <span>/</span> PERSONAL JOURNEY</p>
      <h2 id="journey-title" data-reveal>Journey</h2>
      <p className="chapter-line">Four places. One ongoing journey.</p>
    </div>
    <div className="journey-panel" data-reveal tabIndex={0} role="region" aria-label="Explore Freddy's journey. Use left and right arrow keys or drag horizontally." onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={event => { start.current = null; event.currentTarget.style.setProperty('--drag-x', '0px'); }}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select(selected + (event.key === 'ArrowRight' ? 1 : -1)); } if (event.key === 'Home') { event.preventDefault(); select(0); } if (event.key === 'End') { event.preventDefault(); select(3); } }}>
      <div className="journey-images" aria-hidden="true">{cities.map((image, index) => <img className={selected === index ? 'current' : ''} key={image.name} src={image.image} alt="" style={{objectPosition:image.position}} width={image.width} height={image.height} loading="lazy" draggable="false" />)}</div>
      <div className="city-display" aria-live="polite" aria-atomic="true"><span className="city-count">0{selected + 1} / 04</span><p key={city.name}>{city.name.toUpperCase()}</p></div>
      <div className="journey-controls"><button aria-label="Previous city" disabled={selected === 0} onClick={() => select(selected - 1)}>←</button><span>DRAG TO MOVE THROUGH</span><button aria-label="Next city" disabled={selected === cities.length - 1} onClick={() => select(selected + 1)}>→</button></div>
    </div>
    <div className="journey-route"><span className="route-line" aria-hidden="true"><i style={{width:`${selected / 3 * 100}%`}} /></span><nav aria-label="Journey cities">{cities.map((city, index) => <button key={city.name} aria-label={city.name} aria-pressed={selected === index} onClick={() => select(index)}><span className="route-preview" aria-hidden="true"><img src={city.image} alt="" width={city.width} height={city.height} loading="lazy" style={{objectPosition:city.position}} /></span><span>0{index + 1}</span>{city.name}</button>)}</nav></div>
    <div className="journey-credit"><p>City reference photography <span>·</span> <a href={city.source} target="_blank" rel="noopener noreferrer">{city.author} ↗</a> <span>·</span> <a href={city.licenseUrl} target="_blank" rel="noopener noreferrer">{city.license}</a></p><span>Cropped &amp; displayed in monochrome</span></div>
  </section>;
}

export default function Home() {
  const chapter = useSceneMotion();
  return <div className="portfolio">
    <div className="material" aria-hidden="true" /><div className="ambient-light" aria-hidden="true" /><div className="cursor-light" aria-hidden="true" />
    <a className="skip-link" href="#sage-vista">Skip to projects</a>
    <header className="site-header"><a className="wordmark" href="#identity">FREDDY LIANG <span>PORTFOLIO</span></a>
      <nav className="chapter-nav" aria-label="Chapters">{chapters.map(item => <a key={item.id} href={`#${item.anchor}`} aria-current={chapter === item.id ? 'location' : undefined}><span className="chapter-number">{item.number}</span><span className="chapter-name">{item.name}</span></a>)}</nav>
    </header>
    <div className="opening" aria-hidden="true"><div className="opening-word word-systems">SYSTEMS</div><div className="opening-word word-clarity">CLARITY</div><div className="opening-word word-insight">INSIGHT</div><span className="opening-rule" /><span className="opening-vertical" /></div>
    <CursorLabel />
    <main>
      <section className="scene identity" id="identity" data-scene data-chapter="profile" aria-labelledby="identity-title">
        <div className="hero-light" aria-hidden="true" /><span className="hero-rail" aria-hidden="true" />
        <div className="identity-meta"><p>PERSONAL PORTFOLIO</p><p>BUSINESS / DATA ANALYSIS</p></div>
        <h1 id="identity-title"><span>FREDDY</span><span>LIANG<span className="identity-dot">.</span></span></h1>
        <div className="hero-mochi"><Mochi /></div>
        <div className="identity-bottom"><a className="text-link" href="#selected-work">ENTER THE WORK <span>↓</span></a><Keywords words={['SYSTEMS', 'CLARITY', 'INSIGHT']} /></div>
      </section>
      <section className="scene work-threshold" id="selected-work" data-scene data-chapter="work" aria-labelledby="work-title">
        <p className="threshold-meta chapter-mark">II <span>/</span> SELECTED WORK <span>/</span> 01—04</p>
        <h2 id="work-title" data-reveal><span>SELECTED</span><span>WORK<span className="threshold-arrow" aria-hidden="true">↘</span></span></h2>
        <div className="threshold-image" aria-hidden="true"><img src={projects.sage.image} alt="" width="1948" height="1971" loading="lazy" /></div>
        <p className="threshold-note">Built around real questions.</p>
      </section>
      <SageVista />
      <Analytics />
      <MaxRebate />
      <Lab />
      <Journey />
    </main>
    <footer className="scene contact" id="contact" data-scene data-chapter="contact" aria-labelledby="contact-title">
      <p className="chapter-mark">IV <span>/</span> CONTACT</p>
      <h2 id="contact-title" data-reveal>Contact</h2>
      <ul className="contact-links">
        <li><a href={`mailto:${contact.email}`} aria-label={`Email Freddy at ${contact.email}`}><ContactIcon name="email" /><span className="contact-name">Email</span><span className="contact-detail">{contact.email}</span></a></li>
        <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Freddy on LinkedIn, opens in a new tab"><ContactIcon name="linkedin" /><span className="contact-name">LinkedIn <span aria-hidden="true">↗</span></span></a></li>
        <li><a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="Freddy on GitHub, opens in a new tab"><ContactIcon name="github" /><span className="contact-name">GitHub <span aria-hidden="true">↗</span></span></a></li>
      </ul>
      <div className="contact-bottom"><Keywords words={['SYSTEMS', 'CLARITY', 'INSIGHT']} /><a className="back-top" href="#identity">BACK TO TOP ↑</a></div>
    </footer>
  </div>;
}
