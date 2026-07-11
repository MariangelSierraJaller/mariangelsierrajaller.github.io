import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProfileSwitch from "@/components/ProfileSwitch";
import ServicesSection from "@/components/ServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ResumeSection from "@/components/ResumeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProfileSwitch />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ResumeSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

