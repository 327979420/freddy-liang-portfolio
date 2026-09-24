'use client';
import { useEffect, useRef, useState } from 'react';

const SRC = '/images/mochi-colour.webp';

/* Mochi looks toward the pointer, or toward a link being hovered elsewhere on the page.
   --near (0–1) grows as the pointer approaches, so he becomes more present before he is touched. */
export default function Mochi() {
  const [awake, setAwake] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, target: { x: number; y: number } | null = null;
    const apply = () => {
      frame = 0;
      if (!target) {
        node.style.setProperty('--look-x', '0'); node.style.setProperty('--look-y', '0'); node.style.setProperty('--near', '0');
        return;
      }
      const box = node.getBoundingClientRect();
      // Eyes sit at roughly 57% / 18% of the artwork.
      const ex = box.left + box.width * .57, ey = box.top + box.height * .18;
      const dx = target.x - ex, dy = target.y - ey;
      node.style.setProperty('--look-x', Math.max(-1, Math.min(1, dx / (innerWidth * .45))).toFixed(3));
      node.style.setProperty('--look-y', Math.max(-1, Math.min(1, dy / (innerHeight * .45))).toFixed(3));
      const cx = box.left + box.width / 2, cy = box.top + box.height / 2;
      const distance = Math.hypot(target.x - cx, target.y - cy) / Math.max(box.width, 1);
      node.style.setProperty('--near', Math.max(0, Math.min(1, 1.35 - distance)).toFixed(3));
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(apply); };
    const move = (event: PointerEvent) => {
      if (reduced.matches) return;
      const link = (event.target as Element | null)?.closest?.('a,button');
      if (link && !node.contains(link)) {
        const box = link.getBoundingClientRect();
        target = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      } else target = { x: event.clientX, y: event.clientY };
      queue();
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) { target = null; queue(); } };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    window.addEventListener('pointerout', leave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      window.removeEventListener('pointerout', leave);
    };
  }, []);

  return <button ref={ref} className="mochi-object" data-awake={awake}
    aria-label="Make Mochi look at you" aria-pressed={awake} onClick={() => setAwake(value => !value)}>
    <span className="mochi-shadow" aria-hidden="true" />
    <span className="mochi-layers" aria-hidden="true">
      <img className="mochi-body" src={SRC} alt="" width="1024" height="1536" fetchPriority="high" loading="eager" draggable="false" />
      <img className="mochi-head" src={SRC} alt="" width="1024" height="1536" draggable="false" />
      <img className="mochi-ear mochi-ear--left" src={SRC} alt="" width="1024" height="1536" draggable="false" />
      <img className="mochi-ear mochi-ear--right" src={SRC} alt="" width="1024" height="1536" draggable="false" />
      <img className="mochi-eyes" src={SRC} alt="" width="1024" height="1536" draggable="false" />
    </span>
    <span className="mochi-caption">MOCHI <span>move a little closer</span></span>
  </button>;
}
