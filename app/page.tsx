import Header from './components/Header';
import ProjectsSection from './components/ProjectsSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-[--text-primary] bg-[--bg]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
