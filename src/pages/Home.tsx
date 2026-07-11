import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProfileSwitch from "@/components/ProfileSwitch";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProfileSwitch />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
