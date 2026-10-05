import posthog from 'posthog-js';
import { useEffect } from 'react';

/* PostHog visitor analytics (US cloud). The project key is public by design.
   sage.freddyliang.com reports to the same project, so the cookie on .freddyliang.com
   keeps one anonymous visitor across both sites. No session replay, at Freddy's request. */
const POSTHOG_KEY = 'phc_tT898VwuWXwX7s5zaAaJjuzz9qKa2j3tNqrKsxn5W6d8';
const POSTHOG_HOST = 'https://us.i.posthog.com';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

type Properties = Record<string, string | number | boolean | undefined>;

export function initTracking() {
  // Only deployed production builds report; `npm run dev` and local previews stay silent.
  if (process.env.NODE_ENV !== 'production' || LOCAL_HOSTS.has(location.hostname)) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: '2026-08-30',
    person_profiles: 'identified_only',
    disable_session_recording: true,
    capture_heatmaps: true,
    // Opting out on either site applies to both (cookie on the parent domain).
    opt_out_capturing_persistence_type: 'cookie',
    respect_dnt: true,
  });
  document.addEventListener('click', trackOutboundLink, { capture: true });
}

export function trackEvent(event: string, properties?: Properties) {
  if (posthog.__loaded) posthog.capture(event, properties);
}

export const trackingActive = () => posthog.__loaded;
export const optedOut = () => posthog.__loaded && posthog.has_opted_out_capturing();
export function setOptedOut(value: boolean) {
  if (!posthog.__loaded) return;
  if (value) posthog.opt_out_capturing();
  else posthog.opt_in_capturing();
}

// One named event for every link that leaves the page, so contact and project clicks are easy to chart.
function trackOutboundLink(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return;
  const url = new URL(link.href, location.href);
  if (url.origin === location.origin) return;
  const area = link.closest('dialog, [id]');
  trackEvent('outbound_link_clicked', {
    destination: url.protocol === 'mailto:' ? 'email'
      : url.hostname.endsWith('linkedin.com') ? 'linkedin'
      : url.hostname === 'github.com' ? 'github'
      : url.hostname === 'sage.freddyliang.com' ? 'sage-vista'
      : url.hostname,
    url: url.protocol === 'mailto:' ? 'mailto' : url.href,
    label: (link.innerText || link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
    area: area?.id || area?.className.split(' ')[0],
  });
}

// `section_viewed` fires once per visit for each listed section, when half of it (or half the screen) is in view.
export function useSectionViews(ids: readonly string[]) {
  useEffect(() => {
    if (!trackingActive()) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || (entry.intersectionRatio < .5 && entry.intersectionRect.height < innerHeight * .5)) continue;
        observer.unobserve(entry.target);
        trackEvent('section_viewed', { section: entry.target.id });
      }
    }, { threshold: [0, .25, .5, .75, 1] });
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);
}
