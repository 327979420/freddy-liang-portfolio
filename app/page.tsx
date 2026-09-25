'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from 'react';
import Lenis from 'lenis';
import Mochi from './components/Mochi';
import { contact, projects, labItems, cities, sageFrames, dashboardPages, profile } from './content';

let lenisInstance: Lenis | null = null;
function scrollToY(top: number) {
  if (lenisInstance) lenisInstance.scrollTo(top, { duration: 1.1 });
  else window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

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
    const last = new Map<HTMLElement, string>();
    const update = () => {
      frame = 0;
      const height = innerHeight;
      for (const section of sections) {
        const box = section.getBoundingClientRect();
        // Sections well outside the frame keep their settled values; skipping them avoids restyling the whole page.
        if (last.has(section) && (box.top > height * 1.6 || box.bottom < -height * .6)) continue;
        const progress = reduced.matches ? .5 : Math.max(0, Math.min(1, (height - box.top) / (box.height + height)));
        const reveal = reduced.matches ? 1 : Math.max(0, Math.min(1, (height * .83 - box.top) / (height * .82)));
        const key = `${progress.toFixed(3)}|${reveal.toFixed(3)}`;
        if (last.get(section) === key) continue;
        last.set(section, key);
        section.style.setProperty('--progress', progress.toFixed(3));
        section.style.setProperty('--reveal', reveal.toFixed(3));
        section.dataset.lit = String(reveal > .55);
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
    const lenis = reduced.matches ? null : new Lenis({ autoRaf: true, anchors: { offset: -20 }, lerp: .2, wheelMultiplier: 1.15 });
    lenis?.on('scroll', queue);
    lenisInstance = lenis;
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
      lenis?.destroy(); lenisInstance = null;
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
    const place = (target: Element | null) => {
      const host = target?.closest?.<HTMLElement>('[data-cursor]');
      if (host) {
        if (!shown) { x = tx; y = ty; }
        node.textContent = host.dataset.cursor ?? '';
        shown = true; node.dataset.shown = 'true';
      } else if (shown) { shown = false; node.dataset.shown = 'false'; }
    };
    const move = (event: globalThis.PointerEvent) => {
      tx = event.clientX; ty = event.clientY;
      place(event.target as Element | null);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const scroll = () => place(document.elementFromPoint(tx, ty));
    document.documentElement.dataset.cursorLabel = 'on';
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll); };
  }, []);
  return <div className="cursor-label" ref={label} aria-hidden="true" data-shown="false" />;
}

type ViewerItem = { title: string; image: string; width: number; height: number; caption: string };

/* Full-screen focus for a project image: the picture, where it sits in the set, and one or two lines on what it shows. */
function FocusViewer({ dialog, items, index, setIndex, label, live }: { dialog: RefObject<HTMLDialogElement | null>; items: readonly ViewerItem[]; index: number; setIndex: (index: number) => void; label: string; live?: string }) {
  const step = (delta: number) => setIndex((index + delta + items.length) % items.length);
  const item = items[index];
  return <dialog ref={dialog} className="focus-viewer" aria-label={label} data-lenis-prevent
    onKeyDown={event => { if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1); }}
    onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
    <div className="viewer-bar"><p><span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>{label}</p>
      <div>{live && <a href={live} target="_blank" rel="noopener noreferrer">VIEW LIVE <span aria-hidden="true">↗</span></a>}<button type="button" onClick={() => dialog.current?.close()}>CLOSE <span aria-hidden="true">×</span></button></div></div>
    <figure className="viewer-page"><img key={item.image} src={item.image} alt={`${label}: ${item.title}.`} width={item.width} height={item.height} /></figure>
    <div className="viewer-caption" key={item.title}><p>{item.title}</p><p>{item.caption}</p></div>
    <div className="viewer-controls"><button type="button" onClick={() => step(-1)} aria-label="Previous">←</button>
      <span>{items.map((entry, position) => <button type="button" key={entry.title} aria-label={entry.title} aria-pressed={position === index} onClick={() => setIndex(position)} />)}</span>
      <button type="button" onClick={() => step(1)} aria-label="Next">→</button></div>
  </dialog>;
}

const sageItems: ViewerItem[] = sageFrames.map(item => ({ title: item.label, image: item.image, width: item.width, height: item.height, caption: item.caption }));

/* Sage Vista: an index of four screens beside one large stage. Choosing a screen swaps it instantly and explains it;
   clicking the stage brings that screen into focus. */
function SageVista() {
  const [frame, setFrame] = useState(0);
  const [page, setPage] = useState(0);
  const [auto, setAuto] = useState(true);
  const viewer = useRef<HTMLDialogElement>(null);
  const current = sageFrames[frame];
  const choose = (index: number) => { setAuto(false); setFrame((index + sageFrames.length) % sageFrames.length); };
  return <section className="scene sage-scene" id="sage-vista" data-scene data-chapter="work" data-auto={auto} aria-labelledby="sage-title">
    <span className="scene-number">02 / SELECTED PROJECT</span>
    <span className="ghost-word sage-ghost" aria-hidden="true">INSIGHT</span>
    <div className="project-heading">
      <p className="eyebrow">SYSTEMS THAT MAKE SENSE.</p><h2 id="sage-title" data-reveal>Sage Vista<span className="title-dot">.</span></h2><p className="project-category">{projects.sage.category}</p><Keywords words={projects.sage.keywords} />
      <div className="screen-caption" aria-live="polite"><p className="caption-label"><span>{String(frame + 1).padStart(2, '0')} / {String(sageFrames.length).padStart(2, '0')}</span>{current.label}</p><p className="caption-text" key={current.label}>{current.caption}</p></div>
      <div className="screen-arrows"><button type="button" onClick={() => choose(frame - 1)} aria-label="Previous screen">←</button><button type="button" onClick={() => choose(frame + 1)} aria-label="Next screen">→</button><a className="live-link" href={projects.sage.url} target="_blank" rel="noopener noreferrer">VIEW LIVE SITE <span>↗</span></a></div>
    </div>
    <div className="sage-stage">
      <button type="button" className="sage-screen" data-cursor="FOCUS +" aria-label={`Open ${current.label} in focus`} onClick={() => { setAuto(false); setPage(frame); viewer.current?.showModal(); }}>
        {sageFrames.map((item, index) => <span className="sage-frame" key={item.label} data-current={index === frame} style={{ '--focus': item.focus, '--zoom': item.scale, '--crop': item.position } as CSSProperties}>
          <img src={item.image} alt={index === frame ? `Sage Vista: ${item.label}.` : ''} width={item.width} height={item.height} loading="lazy" decoding="async" draggable="false" />
        </span>)}
        <FrameMarks />
      </button>
      <ol className="screen-thumbs" aria-label="Sage Vista screens">
        {sageFrames.map((item, index) => <li key={item.label}><button type="button" aria-pressed={index === frame} onClick={() => choose(index)}>
          <span className="thumb-image"><img src={item.image} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" style={{ objectPosition: item.position }} /></span>
          <span className="thumb-label"><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</span>
          {index === frame && auto && <i className="thumb-progress" onAnimationEnd={() => setFrame(value => (value + 1) % sageFrames.length)} />}
        </button></li>)}
      </ol>
    </div>
    <FocusViewer dialog={viewer} items={sageItems} index={page} setIndex={setPage} label="Sage Vista" live={projects.sage.url} />
  </section>;
}

const dashboardItems: ViewerItem[] = dashboardPages.map(item => ({ title: item.title, image: item.image, width: item.width, height: item.height, caption: item.caption }));

function Analytics() {
  const [active, setActive] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const viewer = useRef<HTMLDialogElement>(null);
  const open = (index: number) => { setPage(index); viewer.current?.showModal(); };
  const hovered = active === null ? null : dashboardPages[active];
  return <section className="scene analytics-scene" id="trading-analytics" data-scene data-chapter="work" data-active={active ?? ''} aria-labelledby="analytics-title" onPointerLeave={() => setActive(null)}>
    <span className="scene-number">01 / SELECTED PROJECT</span>
    <span className="analytics-grid" aria-hidden="true" />
    <span className="ghost-word analytics-ghost" aria-hidden="true">CLARITY</span>
    <div className="analytics-title"><p className="eyebrow">FROM RECORDS TO RECOGNITION.</p><h2 id="analytics-title" data-reveal>Trading <span>analytics.</span></h2><p className="project-category">Trading analytics dashboard · Power BI</p><Keywords words={['INSIGHT', 'CLARITY']} />
      <div className="stack-caption" aria-live="polite">{hovered
      ? <><p className="caption-label"><span>{String((active ?? 0) + 1).padStart(2, '0')} / 03</span>{hovered.title}</p><p className="caption-text" key={hovered.title}>{hovered.caption}</p></>
      : <p className="caption-label">THREE PAGES <span>/</span> SELECT ONE TO EXPLORE</p>}</div>
    </div>
    <div className="dashboard-stack">
      {dashboardPages.map((item, index) => <button type="button" className="dashboard-page" key={item.title} data-index={index} data-selected={active === index} data-cursor="FOCUS +" style={{ '--page': index } as CSSProperties}
        onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => open(index)} aria-label={`Open the ${item.title} dashboard page in focus`}>
        <img src={item.image} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" draggable="false" />
        <span className="page-caption"><span>{String(index + 1).padStart(2, '0')}</span>{item.note}</span>
      </button>)}
    </div>
    <FocusViewer dialog={viewer} items={dashboardItems} index={page} setIndex={setPage} label="Trading analytics · Power BI" />
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
    <span className="scene-number">03 / SELECTED PROJECT</span>
    <div className="lab-trail" ref={trail} aria-hidden="true" />
    <div className="lab-heading"><p className="eyebrow">SMALL BUILDS. USEFUL HABITS.</p><h2 id="lab-title" data-reveal>Lab<span className="title-dot">.</span></h2><p className="project-category">Automation tools &amp; Discord apps</p><Keywords words={['SYSTEMS']} /></div>
    <span className="ghost-word lab-ghost" aria-hidden="true">SYSTEMS</span>
    <p className="lab-guide">A few experiments in making things work.<span>SWIPE TO EXPLORE →</span></p>
    <div className="lab-windows">
      {labItems.map((item, index) => <article className={`lab-window lab-window--${item.crop}`} key={item.id} data-selected={active === item.id} data-reveal style={{ '--window-index': index } as CSSProperties}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" data-cursor="VIEW PROJECT ↗" aria-label={`View ${item.title} on GitHub in a new tab`} onPointerEnter={() => setActive(item.id)} onFocus={() => setActive(item.id)}>
          <div className="window-bar"><span>{item.number}</span><span>{item.title}</span><span aria-hidden="true">↗</span></div>
          <div className={`lab-crop crop--${item.crop}`}><img src="/images/lab-discord-apps.png" alt={item.alt} width="2978" height="2660" loading="lazy" decoding="async" draggable="false" /></div>
          <p className="window-caption">{item.caption}</p>
          <div className="window-footer"><span>{item.kind}</span><span className="window-visit">VIEW PROJECT ↗</span></div>
        </a>
      </article>)}
    </div>
    <p className="lab-footnote">TWO APPS / THREE VIEWS</p>
  </section>;
}
function Journey() {
  const [selected, setSelected] = useState(0);
  const [memory, setMemory] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    let raf = 0, currentCity = 0;
    const update = () => {
      raf = 0;
      const box = node.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - innerHeight)));
      node.style.setProperty('--route', Math.min(1, progress * cities.length / (cities.length - 1)).toFixed(3));
      const next = Math.min(cities.length - 1, Math.floor(progress * cities.length));
      if (next !== currentCity) { currentCity = next; setSelected(next); setMemory(false); }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); };
  }, []);
  // Every control scrolls to the matching stretch of the route, so scroll position and city never disagree.
  const select = (index: number) => {
    const node = track.current;
    if (!node) return;
    const target = Math.max(0, Math.min(cities.length - 1, index));
    const top = node.getBoundingClientRect().top + scrollY + (node.offsetHeight - innerHeight) * (target + .5) / cities.length;
    scrollToY(top);
  };
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
    <div className="journey-track" ref={track}><div className="journey-sticky">
    <div className="journey-panel" data-reveal data-memory={memory} tabIndex={0} role="region" aria-label="Explore Freddy's journey. Scroll, use the left and right arrow keys, or drag horizontally." onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={event => { start.current = null; event.currentTarget.style.setProperty('--drag-x', '0px'); }}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select(selected + (event.key === 'ArrowRight' ? 1 : -1)); } if (event.key === 'Home') { event.preventDefault(); select(0); } if (event.key === 'End') { event.preventDefault(); select(3); } }}>
      <div className="journey-images" aria-hidden="true">{cities.map((image, index) => <img className={selected === index ? 'current' : ''} key={image.name} src={image.image} alt="" style={{objectPosition:image.position}} width={image.width} height={image.height} loading="lazy" decoding="async" draggable="false" />)}</div>
      <button type="button" className="memory" data-cursor={memory ? 'BACK TO THE CITY' : 'SEE MY PHOTO +'} aria-pressed={memory} onClick={() => setMemory(value => !value)} aria-label={memory ? `Show the ${city.name} skyline` : `Show Freddy's own photo from ${city.name}`}>
        <span className="memory-frame">{cities.map((item, index) => <img key={item.name} className={selected === index ? 'current' : ''} src={item.memory.image} alt={selected === index ? `Freddy in ${item.name}.` : ''} width={item.memory.width} height={item.memory.height} style={{ objectPosition: item.memory.position }} loading="lazy" decoding="async" draggable="false" />)}</span>
        <span className="memory-label">{memory ? 'BACK TO CITY' : `MY ${city.name.toUpperCase()}`} <span aria-hidden="true">{memory ? '−' : '+'}</span></span>
      </button>
      <div className="city-display" aria-live="polite" aria-atomic="true"><span className="city-count">0{selected + 1} / 04</span><p key={city.name}>{city.name.toUpperCase()}</p></div>
      <div className="journey-controls"><button aria-label="Previous city" disabled={selected === 0} onClick={() => select(selected - 1)}>←</button><span>SCROLL TO TRAVEL ↓</span><button aria-label="Next city" disabled={selected === cities.length - 1} onClick={() => select(selected + 1)}>→</button></div>
    </div>
    <div className="journey-route"><span className="route-line" aria-hidden="true"><i /></span><nav aria-label="Journey cities">{cities.map((city, index) => <button key={city.name} aria-label={city.name} aria-pressed={selected === index} onClick={() => select(index)}><span className="route-preview" aria-hidden="true"><img src={city.image} alt="" width={city.width} height={city.height} loading="lazy" decoding="async" style={{objectPosition:city.position}} /></span><span>0{index + 1}</span>{city.name}</button>)}</nav></div>
    <div className="journey-credit"><p>City reference photography <span>·</span> <a href={city.source} target="_blank" rel="noopener noreferrer">{city.author} ↗</a> <span>·</span> <a href={city.licenseUrl} target="_blank" rel="noopener noreferrer">{city.license}</a></p><span>Cropped &amp; displayed in monochrome</span></div>
    </div></div>
  </section>;
}

function ProfilePanel({ panel }: { panel: RefObject<HTMLDialogElement | null> }) {
  return <dialog ref={panel} className="profile-panel" aria-labelledby="profile-title" data-lenis-prevent onClick={event => { if (event.target === event.currentTarget) panel.current?.close(); }}>
    <div className="profile-inner">
      <figure className="profile-photo"><img src={profile.portrait} alt={profile.portraitAlt} width={profile.portraitWidth} height={profile.portraitHeight} /></figure>
      <div className="profile-text">
        <p className="chapter-mark">I <span>/</span> PROFILE</p>
        <h2 id="profile-title">Freddy Liang</h2>
        <p className="profile-lead">{profile.lead}</p>
        {profile.experience.length > 0 && <section className="profile-experience" aria-label="Experience"><p className="caption-label">EXPERIENCE</p><ol>{profile.experience.map(item => <li key={item.role + item.organisation}><p><strong>{item.role}</strong> <span>{item.organisation}</span></p><p className="experience-period">{item.period}</p><p>{item.line}</p></li>)}</ol></section>}
        {profile.lines.map(line => <p key={line}>{line}</p>)}
        <div className="profile-links"><a href={`mailto:${contact.email}`}>EMAIL</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href={contact.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a></div>
      </div>
      <button type="button" className="profile-close" onClick={() => panel.current?.close()}>CLOSE <span aria-hidden="true">×</span></button>
    </div>
  </dialog>;
}

export default function Home() {
  const chapter = useSceneMotion();
  const profilePanel = useRef<HTMLDialogElement>(null);
  const openProfile = () => profilePanel.current?.showModal();
  return <div className="portfolio">
    <div className="material" aria-hidden="true" /><div className="ambient-light" aria-hidden="true" /><div className="cursor-light" aria-hidden="true" />
    <a className="skip-link" href="#trading-analytics">Skip to projects</a>
    <header className="site-header"><a className="wordmark" href="#identity">FREDDY LIANG <span>PORTFOLIO</span></a>
      <nav className="chapter-nav" aria-label="Chapters">{chapters.map(item => <a key={item.id} href={`#${item.anchor}`} aria-current={chapter === item.id ? 'location' : undefined}><span className="chapter-number">{item.number}</span><span className="chapter-name">{item.name}</span></a>)}</nav>
    </header>
    <div className="opening" aria-hidden="true"><p className="opening-owner">FREDDY LIANG <span>/</span> PERSONAL PORTFOLIO</p><div className="opening-word word-systems">SYSTEMS</div><div className="opening-word word-clarity">CLARITY</div><div className="opening-word word-insight">INSIGHT</div><span className="opening-rule" /><span className="opening-vertical" /></div>
    <CursorLabel />
    <ProfilePanel panel={profilePanel} />
    <main>
      <section className="scene identity" id="identity" data-scene data-chapter="profile" aria-labelledby="identity-title">
        <div className="hero-light" aria-hidden="true" /><span className="hero-rail" aria-hidden="true" />
        <div className="identity-meta"><p>PERSONAL PORTFOLIO</p><p>BUSINESS / DATA ANALYSIS</p></div>
        <h1 id="identity-title"><button type="button" className="identity-name" data-cursor="OPEN PROFILE +" aria-haspopup="dialog" onClick={openProfile}><span>FREDDY</span><span>LIANG<span className="identity-dot">.</span></span></button></h1>
        <div className="hero-mochi"><Mochi /></div>
        <div className="identity-bottom"><div className="identity-actions"><a className="text-link" href="#selected-work">ENTER THE WORK <span>↓</span></a><button type="button" className="text-link" aria-haspopup="dialog" onClick={openProfile}>ABOUT FREDDY <span>+</span></button></div><Keywords words={['SYSTEMS', 'CLARITY', 'INSIGHT']} /></div>
      </section>
      <section className="scene intro-scene" id="about" data-scene data-chapter="profile" aria-labelledby="about-title">
        <p className="chapter-mark">I <span>/</span> PROFILE</p>
        <h2 id="about-title" className="intro-statement" data-reveal>I’m Freddy. I turn <em>messy problems and raw data</em> into clearer requirements, better processes and <em>useful insight</em>.</h2>
        <dl className="intro-facts">{profile.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        <button type="button" className="intro-portrait" data-cursor="FULL PROFILE +" aria-haspopup="dialog" aria-label="Open Freddy's full profile" onClick={openProfile}>
          <img src={profile.portrait} alt={profile.portraitAlt} width={profile.portraitWidth} height={profile.portraitHeight} loading="lazy" decoding="async" />
        </button>
        <button type="button" className="text-link intro-more" aria-haspopup="dialog" onClick={openProfile}>FULL PROFILE <span>+</span></button>
      </section>
      <section className="scene work-threshold" id="selected-work" data-scene data-chapter="work" aria-labelledby="work-title">
        <p className="threshold-meta chapter-mark">II <span>/</span> SELECTED WORK <span>/</span> 01—03</p>
        <h2 id="work-title" data-reveal><span>SELECTED</span><span>WORK<span className="threshold-arrow" aria-hidden="true">↘</span></span></h2>
        <div className="threshold-image" aria-hidden="true"><img src={dashboardPages[0].image} alt="" width={dashboardPages[0].width} height={dashboardPages[0].height} loading="lazy" decoding="async" /></div>
        <p className="threshold-note">Built around real questions.</p>
      </section>
      <Analytics />
      <SageVista />
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
      <div className="contact-bottom"><div className="contact-keywords"><Keywords words={["SYSTEMS", "CLARITY", "INSIGHT"]} /><span className="ai-line">· AI-EMPOWERED</span></div><a className="back-top" href="#identity">BACK TO TOP ↑</a></div>
    </footer>
  </div>;
}
