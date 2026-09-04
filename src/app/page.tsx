import PromoBar from "@/components/PromoBar";
import Hero from "@/components/Hero";
import Symptoms from "@/components/Symptoms";
import Features from "@/components/Features";
import Profile from "@/components/Profile";
import Steps from "@/components/Steps";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black">
      <PromoBar />
      <Hero />
      <Symptoms />
      <Features />
      <Profile />
      <Steps />
      <CTA />
      <Footer />
    </main>
  );
}
