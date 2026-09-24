'use client';
import { useState, type PointerEvent } from 'react';

export default function Mochi({ small = false }: { small?: boolean }) {
  const [awake, setAwake] = useState(false);
  const look = (event: PointerEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
    event.currentTarget.style.setProperty('--look-x', String(x));
    event.currentTarget.style.setProperty('--look-y', String(y));
  };
  return <button className={`mochi-object ${small ? 'mochi-small' : ''}`} data-awake={awake}
    aria-label="Make Mochi look at you" aria-pressed={awake}
    onPointerMove={look} onPointerLeave={event => {
      event.currentTarget.style.removeProperty('--look-x');
      event.currentTarget.style.removeProperty('--look-y');
    }} onClick={() => setAwake(value => !value)}>
    <span className="mochi-shadow" aria-hidden="true" />
    <span className="mochi-layers" aria-hidden="true">
      <img className="mochi-body" src="/images/mochi-cutout.png" alt="" width="1024" height="1536" fetchPriority={small ? 'auto' : 'high'} loading={small ? 'lazy' : 'eager'} draggable="false" />
      <img className="mochi-head" src="/images/mochi-cutout.png" alt="" width="1024" height="1536" draggable="false" />
      <img className="mochi-eyes" src="/images/mochi-cutout.png" alt="" width="1024" height="1536" draggable="false" />
    </span>
    {!small && <span className="mochi-caption">MOCHI <span>move a little closer</span></span>}
  </button>;
}
