import Countdown from "@/components/Countdown";
import Hero from "@/components/Hero";
import Symptoms from "@/components/Symptoms";
import Features from "@/components/Features";
import Profile from "@/components/Profile";
import Steps from "@/components/Steps";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black">
      <Countdown />
      <Hero />
      <Symptoms />
      <Features />
      <Profile />
      <Steps />
      <CTA />
    </main>
  );
}
