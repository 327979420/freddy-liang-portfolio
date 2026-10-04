'use client';

import { useRef, useState } from 'react';
import { business, careerByCity, cities, contact, profile, projectCases } from './content';
import { Analytics, ContactFooter, CursorLabel, Journey, Lab, Opening, ProfilePanel, SageVista, SiteHeader, scrollToY, useSceneMotion, type ChapterLink } from './site';

/* The business edition (freddyliang.com): short, one focal point per section.
   Hero (who Freddy is) → projects at a glance → journey (browse) → one project in detail → contact. */
const chapters: readonly ChapterLink[] = [
  { id: 'profile', number: 'I', name: 'Profile', anchor: 'identity' },
  { id: 'work', number: 'II', name: 'Work', anchor: 'projects' },
  { id: 'journey', number: 'III', name: 'Journey', anchor: 'journey' },
  { id: 'contact', number: 'IV', name: 'Contact', anchor: 'contact' },
];

type ProjectId = (typeof projectCases)[number]['id'];
const newestFirst = [...cities].reverse();
// Consistent names across cards, tabs and project sections.
const scenes: Record<ProjectId, () => React.JSX.Element> = {
  'trading-analytics': () => <Analytics category="Power BI dashboard · TMGM" />,
  'sage-vista': () => <SageVista category="Trading research platform (US equities)" />,
  lab: () => <Lab title="Market intelligence" category="Discord apps · Python" />,
};

function ProjectCase({ id }: { id: ProjectId }) {
  const item = projectCases.find(entry => entry.id === id)!;
  return <section className="project-case" aria-label={`${item.name}: summary`}>
    <dl>
      <div><dt>The question</dt><dd>{item.problem}</dd></div>
      <div><dt>What I did</dt><dd>{item.did}</dd></div>
      <div><dt>Tools</dt><dd className="case-tools">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</dd></div>
    </dl>
    {item.links.length > 0 && <div className="case-actions">{item.links.map(link => <a key={link.href} className="ba-chip ba-chip--solid" href={link.href} target="_blank" rel="noopener noreferrer">{link.label === 'Live site' ? 'Open the live platform' : link.label === 'GitHub' ? 'View the code on GitHub' : `${link.label} on GitHub`} <span aria-hidden="true">↗</span></a>)}</div>}
  </section>;
}

export default function BusinessHome() {
  const chapter = useSceneMotion();
  const profilePanel = useRef<HTMLDialogElement>(null);
  const [project, setProject] = useState<ProjectId>('trading-analytics');
  const openProfile = () => profilePanel.current?.showModal();
  // Choosing a project shows it in the detail area; the scroll loop is nudged so the new scene reveals at once.
  const show = (id: ProjectId, jump: boolean) => {
    setProject(id);
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('scroll'));
      const detail = document.getElementById('project-detail');
      if (jump && detail) scrollToY(detail.getBoundingClientRect().top + scrollY - 70);
    });
  };
  const Scene = scenes[project];
  return <div className="portfolio business">
    <div className="material" aria-hidden="true" /><div className="ambient-light" aria-hidden="true" /><div className="cursor-light" aria-hidden="true" />
    <a className="skip-link" href="#projects">Skip to projects</a>
    <SiteHeader chapter={chapter} items={chapters} label="BUSINESS & DATA ANALYST" />
    <Opening owner="BUSINESS & DATA ANALYST" />
    <CursorLabel />
    <ProfilePanel panel={profilePanel} />
    <main>
      {/* Hero: the role is the focal point; the summary says what Freddy can do. */}
      <section className="scene ba-hero2" id="identity" data-scene data-chapter="profile" aria-labelledby="identity-title">
        <div className="hero-light" aria-hidden="true" />
        <div className="ba-top">
          <button type="button" className="ba-name" aria-haspopup="dialog" onClick={openProfile}><strong>Freddy Liang</strong><em>{business.location}</em></button>
          <button type="button" className="ba-photo-lg" data-cursor="FULL PROFILE +" aria-haspopup="dialog" aria-label="Open Freddy's full profile" onClick={openProfile}>
            <img src={profile.portrait} alt={profile.portraitAlt} width={profile.portraitWidth} height={profile.portraitHeight} fetchPriority="high" />
          </button>
        </div>
        <h1 id="identity-title" className="ba-headline">{business.headline}</h1>
        <ul className="ba-pillars">{business.pillars.map(item => <li key={item.keyword}>
          <span className="pillar-keyword">{item.keyword}</span>
          <strong>{item.claim}</strong>
          <span className="pillar-proof">{item.proof.map(proof => proof.href
            ? <a key={proof.text} href={proof.href} target="_blank" rel="noopener noreferrer">{proof.text} <span aria-hidden="true">↗</span></a>
            : <span key={proof.text}>{proof.text}</span>)}</span>
        </li>)}</ul>
        <div className="ba-ctas">
          <a className="ba-button breathe" href="#projects">View projects <span>↓</span></a>
          <a className="ba-button ba-button--ghost breathe" href={`mailto:${contact.email}`}>Email me <span>↗</span></a>
          <button type="button" className="ba-button ba-button--ghost breathe" aria-haspopup="dialog" onClick={openProfile}>Full profile <span>+</span></button>
        </div>
      </section>

      {/* Projects at a glance: the images carry the section; one click opens the detail. */}
      <section className="scene ba-projects" id="projects" data-scene data-chapter="work" aria-labelledby="projects-title">
        <div className="ba-section-head"><p className="chapter-mark">II</p><h2 id="projects-title">Projects</h2></div>
        <ol className="ba-cards">{projectCases.map((item, index) => <li key={item.id}>
          <button type="button" className="card-open" data-cursor="CLICK TO EXPLORE ↓" aria-label={`Explore ${item.name}`} onClick={() => show(item.id, true)}>
            <span className="card-image"><img src={item.image} alt="" width="640" height="400" loading="lazy" decoding="async" /><span className="card-cue">CLICK TO EXPLORE ↓</span></span>
            <span className="card-meta"><em>{String(index + 1).padStart(2, '0')}</em>{item.kind}</span>
            <span className="card-name">{item.name}</span>
            <span className="card-line">{item.glance}</span>
          </button>
          <div className="card-actions">
            {item.links.map(link => <a key={link.href} className="ba-chip ba-chip--solid" href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}
            <button type="button" className="ba-chip" onClick={() => show(item.id, true)}>{item.links.length ? 'Details' : 'Explore the dashboards'} <span aria-hidden="true">↓</span></button>
          </div>
        </li>)}</ol>
      </section>

      {/* Journey: Melbourne first; the arrows browse the rest. */}
      <Journey mark="III" career={careerByCity} stops={newestFirst} mode="browse" hint="← → SEE OTHER CITIES" label="" />

      {/* One project in detail at a time. */}
      <section className="ba-detail" id="project-detail" aria-label="Project detail">
        <div className="ba-tabs" role="tablist" aria-label="Choose a project">{projectCases.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={project === item.id} onClick={() => show(item.id, false)} className={project === item.id ? '' : 'breathe'}><em>{String(index + 1).padStart(2, '0')}</em>{item.name}</button>)}</div>
        <div role="tabpanel" key={project}><Scene /><ProjectCase id={project} /></div>
      </section>
    </main>
    <ContactFooter label="" />
  </div>;
}
