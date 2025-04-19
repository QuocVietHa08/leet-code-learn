import { LandingPage } from '../components/LandingPage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const links = [
  { link: '#', label: 'Home' },
  { link: '#', label: 'Features' },
  { link: '#', label: 'Demo' },
  { link: '#', label: 'Contact' },
];

export default function HomePage() {
  return (
    <>
      <Header links={links} />
      <LandingPage />
      <Footer links={links} />
    </>
  );
}
