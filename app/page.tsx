'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import Mochi from './components/Mochi';
import { contact, projects, labItems, cities } from './content';

function Outbound({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}
function Keywords({ words }: { words: readonly string[] }) {
  return <p className="keywords">{words.map(word => <span key={word}>{word}</span>)}</p>;
}
function FrameMarks() { return <span className="frame-marks" aria-hidden="true"><i /><i /><i /><i /></span>; }

function useSceneMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const sections = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
    let frame = 0;
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
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    const finish = () => { root.dataset.intro = 'off'; };
    const key = (event: KeyboardEvent) => { if (['Escape', 'Tab', 'PageDown', 'ArrowDown'].includes(event.key)) finish(); };
    const pointer = (event: globalThis.PointerEvent) => {
      if (reduced.matches) return;
      root.style.setProperty('--pointer-x', ((event.clientX / innerWidth - .5) * 2).toFixed(3));
      root.style.setProperty('--pointer-y', ((event.clientY / innerHeight - .5) * 2).toFixed(3));
    };
    const resetPointer = (event: globalThis.PointerEvent) => {
      if (event.relatedTarget) return;
      root.style.setProperty('--pointer-x', '0');
      root.style.setProperty('--pointer-y', '0');
    };
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
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue);
      window.removeEventListener('pointermove', pointer); window.removeEventListener('pointerdown', finish);
      window.removeEventListener('pointerout', resetPointer);
      window.removeEventListener('wheel', finish); window.removeEventListener('touchstart', finish);
      document.removeEventListener('keydown', key); reduced.removeEventListener('change', queue);
    };
  }, []);
}

function SageVista() {
  const [active, setActive] = useState(false);
  return <section className="scene sage-scene" id="sage-vista" data-scene data-active={active} aria-labelledby="sage-title">
    <div className="sage-stage">
      <span className="scene-number">01 / SELECTED PROJECT</span>
      <div className="project-heading"><p className="eyebrow">SYSTEMS THAT MAKE SENSE.</p><h2 id="sage-title">Sage Vista<span className="title-dot">.</span></h2><p className="project-category">{projects.sage.category}</p><Keywords words={projects.sage.keywords} /></div>
      <span className="ghost-word sage-ghost" aria-hidden="true">INSIGHT</span>
      <div className="sage-media" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
        <a href={projects.sage.url} target="_blank" rel="noopener noreferrer" className="project-gateway" aria-label="View Sage Vista live in a new tab">
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
  return <section className="scene analytics-scene" id="trading-analytics" data-scene aria-labelledby="analytics-title">
    <span className="scene-number">02 / SELECTED PROJECT</span>
    <span className="ghost-word analytics-ghost" aria-hidden="true">INSIGHT</span>
    <div className="analytics-title"><p className="eyebrow">FROM RECORDS TO RECOGNITION.</p><h2 id="analytics-title">Trading<br /><span>analytics.</span></h2><p className="project-category">Trading analytics dashboard · Power BI</p><Keywords words={['INSIGHT', 'CLARITY']} /></div>
    <div className="analytics-reserved"><span className="reserved-mark" aria-hidden="true">/</span><p>POWER BI<br /><span>PREVIEW TO FOLLOW</span></p><FrameMarks /></div>
  </section>;
}
function MaxRebate() {
  return <section className="scene rebate-scene" id="max-rebate" data-scene aria-labelledby="rebate-title">
    <span className="scene-number">03 / SELECTED PROJECT</span>
    <div className="rebate-heading"><p className="eyebrow">A CLEARER WAY THROUGH.</p><h2 id="rebate-title">Max-Rebate<span className="title-dot">.</span></h2><p className="project-category">{projects.rebate.category}</p></div>
    <Keywords words={projects.rebate.keywords} />
    <span className="ghost-word rebate-ghost" aria-hidden="true">CLARITY</span>
    <div className="rebate-echo" aria-hidden="true"><img src={projects.rebate.image} alt="" width="2226" height="1280" loading="lazy" /></div>
    <div className="rebate-surface"><p className="surface-label"><span>MAX-REBATE.COM</span><span>PRODUCT / CUSTOMER JOURNEY</span></p>
      <a className="rebate-window project-gateway" href={projects.rebate.url} target="_blank" rel="noopener noreferrer" aria-label="Visit the live Max-Rebate website in a new tab">
        <div className="website-strip"><img src="/images/max-rebate-full-en.jpg" alt="The live English Max-Rebate website, from its rebate introduction through eligibility and account guidance." width="1440" height="4382" loading="lazy" draggable="false" /></div>
        <span className="gateway-label">VISIT SITE <span>↗</span></span><FrameMarks />
      </a>
      <p className="media-note"><span>ELIGIBILITY → GUIDANCE → APPLICATION</span><span>03—04</span></p>
    </div>
  </section>;
}
function Lab() {
  const [active, setActive] = useState<string | null>(null);
  return <section className="scene lab-scene" id="lab" data-scene data-active={active ?? ''} aria-labelledby="lab-title" onPointerLeave={() => setActive(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}>
    <span className="scene-number">04 / SELECTED PROJECT</span>
    <div className="lab-heading"><p className="eyebrow">SMALL BUILDS. USEFUL HABITS.</p><h2 id="lab-title">Lab<span className="title-dot">.</span></h2><p className="project-category">Automation tools &amp; Discord apps</p><Keywords words={['SYSTEMS']} /></div>
    <span className="ghost-word lab-ghost" aria-hidden="true">SYSTEMS</span>
    <p className="lab-guide">A few experiments in making things work.<span>SWIPE TO EXPLORE →</span></p>
    <div className="lab-windows">
      {labItems.map((item, index) => <article className={`lab-window lab-window--${item.crop}`} key={item.id} data-selected={active === item.id} style={{ '--window-index': index } as CSSProperties}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} on GitHub in a new tab`} onPointerEnter={() => setActive(item.id)} onFocus={() => setActive(item.id)}>
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
  const panel = useRef<HTMLDivElement>(null);
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
  return <section className="scene journey-scene" id="journey" data-scene aria-labelledby="journey-title">
    <div className="journey-heading"><h2 className="eyebrow" id="journey-title">PERSONAL JOURNEY / BETWEEN PLACES</h2><p>Four places. One ongoing journey.</p></div>
    <div className="journey-panel" ref={panel} tabIndex={0} role="region" aria-label="Explore Freddy's journey. Use left and right arrow keys or drag horizontally." onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={event => { start.current = null; event.currentTarget.style.setProperty('--drag-x', '0px'); }}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select(selected + (event.key === 'ArrowRight' ? 1 : -1)); } if (event.key === 'Home') { event.preventDefault(); select(0); } if (event.key === 'End') { event.preventDefault(); select(3); } }}>
      <div className="journey-images" aria-hidden="true">{cities.map((image, index) => <img className={selected === index ? 'current' : ''} key={image.name} src={image.image} alt="" style={{objectPosition:image.position}} width={image.width} height={image.height} loading="lazy" draggable="false" />)}</div>
      <div className="city-display" aria-live="polite" aria-atomic="true"><span className="city-count">0{selected + 1} / 04</span><p key={city.name}>{city.name.toUpperCase()}</p></div>
      <div className="journey-controls"><button aria-label="Previous city" disabled={selected === 0} onClick={() => select(selected - 1)}>←</button><span>DRAG TO MOVE THROUGH</span><button aria-label="Next city" disabled={selected === cities.length - 1} onClick={() => select(selected + 1)}>→</button></div>
    </div>
    <div className="journey-route"><span className="route-line" aria-hidden="true"><i style={{width:`${selected / 3 * 100}%`}} /></span><nav aria-label="Journey cities">{cities.map((city, index) => <button key={city.name} aria-label={city.name} aria-pressed={selected === index} onClick={() => select(index)}><span>0{index + 1}</span>{city.name}</button>)}</nav></div>
    <div className="journey-credit"><p>City reference photography <span>·</span> <a href={city.source} target="_blank" rel="noopener noreferrer">{city.author} ↗</a> <span>·</span> <a href={city.licenseUrl} target="_blank" rel="noopener noreferrer">{city.license}</a></p><span>Cropped &amp; displayed in monochrome</span></div>
  </section>;
}

export default function Home() {
  useSceneMotion();
  return <div className="portfolio">
    <div className="material" aria-hidden="true" /><div className="ambient-light" aria-hidden="true" />
    <a className="skip-link" href="#sage-vista">Skip to projects</a>
    <header className="site-header"><a className="wordmark" href="#identity">FREDDY LIANG <span>PORTFOLIO</span></a><nav aria-label="Main navigation"><a href="#selected-work">Work <span>↘</span></a><Outbound href={contact.github}>GitHub</Outbound><Outbound href={contact.linkedin}>LinkedIn</Outbound></nav></header>
    <div className="opening" aria-hidden="true"><div className="opening-word word-systems">SYSTEMS</div><div className="opening-word word-clarity">CLARITY</div><div className="opening-word word-insight">INSIGHT</div><span className="opening-rule" /><span className="opening-vertical" /></div>
    <main>
      <section className="scene identity" id="identity" data-scene aria-labelledby="identity-title">
        <div className="hero-light" aria-hidden="true" /><span className="hero-rail" aria-hidden="true" />
        <div className="identity-meta"><p>PERSONAL PORTFOLIO</p><p>BUSINESS / DATA ANALYSIS</p></div>
        <h1 id="identity-title"><span>FREDDY</span><span>LIANG<span className="identity-dot">.</span></span></h1>
        <div className="hero-mochi"><Mochi /></div>
        <div className="identity-bottom"><a className="text-link" href="#selected-work">ENTER THE WORK <span>↓</span></a><Keywords words={['SYSTEMS', 'CLARITY', 'INSIGHT']} /></div>
      </section>
      <section className="scene work-threshold" id="selected-work" data-scene aria-labelledby="work-title">
        <p className="threshold-meta eyebrow">01—04 / SELECTED PROJECTS</p>
        <h2 id="work-title"><span>SELECTED</span><span>WORK<span className="threshold-arrow" aria-hidden="true">↘</span></span></h2>
        <div className="threshold-image" aria-hidden="true"><img src={projects.sage.image} alt="" width="1948" height="1971" loading="lazy" /></div>
        <p className="threshold-note">Built around real questions.</p>
      </section>
      <SageVista />
      <Analytics />
      <MaxRebate />
      <Lab />
      <Journey />
    </main>
    <footer className="ending" id="contact"><p className="eyebrow">STILL EXPLORING.</p><div className="ending-mochi"><Mochi small /></div><p className="ending-name">FREDDY LIANG</p><div className="ending-bottom"><Keywords words={['SYSTEMS', 'CLARITY', 'INSIGHT']} /><nav aria-label="Contact"><Outbound href={contact.github}>GitHub</Outbound><Outbound href={contact.linkedin}>LinkedIn</Outbound><Outbound href={`mailto:${contact.email}`}>Email</Outbound></nav></div><a className="back-top" href="#identity">BACK TO TOP ↑</a></footer>
  </div>;
}
