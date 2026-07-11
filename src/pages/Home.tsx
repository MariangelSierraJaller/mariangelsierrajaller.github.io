import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProfileSwitch from "@/components/ProfileSwitch";
import ProfessionalProfile from "@/components/ProfessionalProfile";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ResumeSection from "@/components/ResumeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import { useProfile } from "@/context/ProfileContext";

export default function Home() {
  const { locked } = useProfile();
  return (
    <>
      <HeroSection />
      {!locked && <ProfileSwitch />}
      <AboutSection />
      <EducationSection />
      <ProfessionalProfile />
      <ExperienceSection />
      <SkillsSection />
      <ResumeSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
