import Image from "next/image";
import LandingNavbar from "./components/landing/LandingNavbar";
import Hero from "./components/landing/Hero";
import JobSection from "./components/landing/JobSection";
import Footer from "./components/landing/Footer";

export default function Home() {
  return (
    <div className="landing-page">
      <LandingNavbar />
      <main>
        <Hero />
        <JobSection />
      </main>
      <Footer />
    </div>


  );
}
