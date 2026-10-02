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
const scenes: Record<ProjectId, () => React.JSX.Element> = { 'trading-analytics': Analytics, 'sage-vista': SageVista, lab: Lab };

function ProjectCase({ id }: { id: ProjectId }) {
  const item = projectCases.find(entry => entry.id === id)!;
  return <section className="project-case" aria-label={`${item.name}: summary`}>
    <dl>
      <div><dt>The question</dt><dd>{item.problem}</dd></div>
      <div><dt>What I did</dt><dd>{item.did}</dd></div>
      <div><dt>Tools</dt><dd className="case-tools">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</dd></div>
    </dl>
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
    <SiteHeader chapter={chapter} items={chapters} label="BUSINESS ANALYST" />
    <Opening owner="BUSINESS ANALYST PORTFOLIO" />
    <CursorLabel />
    <ProfilePanel panel={profilePanel} />
    <main>
      {/* Hero: the role is the focal point; the summary says what Freddy can do. */}
      <section className="scene ba-hero2" id="identity" data-scene data-chapter="profile" aria-labelledby="identity-title">
        <div className="hero-light" aria-hidden="true" />
        <button type="button" className="ba-person" data-cursor="FULL PROFILE +" aria-haspopup="dialog" onClick={openProfile}>
          <img src={profile.portrait} alt={profile.portraitAlt} width={profile.portraitWidth} height={profile.portraitHeight} fetchPriority="high" />
          <span><strong>Freddy Liang</strong><em>{business.location}</em></span>
        </button>
        <h1 id="identity-title" className="ba-headline">{business.headline}</h1>
        <p className="ba-positioning">{business.positioning}</p>
        <p className="ba-credentials">{business.credentials.map(item => <span key={item}>{item}</span>)}</p>
        <ul className="ba-pillars">{business.pillars.map(item => <li key={item.keyword}>
          <span className="pillar-keyword">{item.keyword}</span>
          <strong>{item.claim}</strong>
          <span className="pillar-proof">{item.proof.join(' · ')}</span>
        </li>)}</ul>
        <div className="ba-ctas">
          <a className="ba-button" href="#projects">View projects <span>↓</span></a>
          <a className="ba-button ba-button--ghost" href={`mailto:${contact.email}`}>Email me <span>↗</span></a>
          <button type="button" className="ba-button ba-button--ghost" aria-haspopup="dialog" onClick={openProfile}>Full profile <span>+</span></button>
        </div>
      </section>

      {/* Projects at a glance: the images carry the section; one click opens the detail. */}
      <section className="scene ba-projects" id="projects" data-scene data-chapter="work" aria-labelledby="projects-title">
        <div className="ba-section-head"><p className="chapter-mark">II <span>/</span> SELECTED WORK</p><h2 id="projects-title">Projects</h2></div>
        <ol className="ba-cards">{projectCases.map((item, index) => <li key={item.id}>
          <button type="button" data-cursor="SEE DETAILS ↓" onClick={() => show(item.id, true)}>
            <span className="card-image"><img src={item.image} alt="" width="640" height="400" loading="lazy" decoding="async" /></span>
            <span className="card-meta"><em>{String(index + 1).padStart(2, '0')}</em>{item.kind}</span>
            <span className="card-name">{item.name}</span>
            <span className="card-line">{item.glance}</span>
          </button>
        </li>)}</ol>
      </section>

      {/* Journey: Melbourne first; the arrows browse the rest. */}
      <Journey mark="III" career={careerByCity} stops={newestFirst} mode="browse" hint="← → SEE OTHER CITIES" line="Four cities, newest first." />

      {/* One project in detail at a time. */}
      <section className="ba-detail" id="project-detail" aria-label="Project detail">
        <div className="ba-tabs" role="tablist" aria-label="Choose a project">{projectCases.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={project === item.id} onClick={() => show(item.id, false)}><em>{String(index + 1).padStart(2, '0')}</em>{item.name}</button>)}</div>
        <div role="tabpanel" key={project}><Scene /><ProjectCase id={project} /></div>
      </section>
    </main>
    <ContactFooter />
  </div>;
}
