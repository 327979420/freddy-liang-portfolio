import type { Metadata } from 'next';
import { CinematicHome } from '../site';

export const metadata: Metadata = {
  title: 'Freddy Liang — Studio edition',
  description: 'The cinematic edition of Freddy Liang’s portfolio.',
};

export default function StudioPage() {
  return <CinematicHome />;
}
