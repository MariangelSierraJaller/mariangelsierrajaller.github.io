import type {
  TestimonialId,
  TestimonialsSectionCopy,
} from "@/types/content";

export const EN_TESTIMONIALS: TestimonialsSectionCopy = {
  eyebrow: "Endorsements & Recommendations",
  title: "Professional Endorsements",
  subtitle:
    "Feedback from engineering collaborators, operational supervisors, and academic mentors.",
  prevLabel: "Previous endorsement",
  nextLabel: "Next endorsement",
  statsLabels: {
    total: "5 Verified Endorsements",
    collaboration: "3 Professional & Operational",
    academic: "2 Academic & Engineering",
  },
  items: {
    sebastianLopez: {
      id: "sebastianLopez" as TestimonialId,
      role: "Backend & Data Engineer",
      organization: "LinkedIn Recommendation",
      relationship: "Technical Collaborator & Engineering Peer",
      highlight: "Strategic vision & technical judgment",
      quote:
        "Mariangel stands out for her ability to integrate technology into administrative, accounting and operational processes, delivering solutions that save time, reduce rework and strengthen decision-making. Her hands-on experience in automation, ERP (NetSuite), data analysis and digitalization shows a valuable blend of technical judgment and strategic vision.",
    },
    aspaenProcurement: {
      id: "aspaenProcurement" as TestimonialId,
      role: "Procurement & Sourcing Leadership",
      organization: "Asociación para la Enseñanza — ASPAEN",
      relationship: "Operational Supervision",
      highlight: "Operational discipline & vendor traceability",
      quote:
        "Mariangel brought exceptional order and transparency to our procurement pipeline. Her disciplined management of purchase requisitions, thorough supplier evaluations, and rigorous NetSuite workflows eliminated backlogs and ensured 100% documentation traceability across our centers.",
    },
    aspaenTreasury: {
      id: "aspaenTreasury" as TestimonialId,
      role: "Finance & Treasury Administration",
      organization: "Asociación para la Enseñanza — ASPAEN",
      relationship: "Administrative Supervision",
      highlight: "Flawless reconciliation & fiscal compliance",
      quote:
        "Her precision in managing daily bank reconciliations and validating electronic invoicing with DIAN has been vital for our fiscal stability. Mariangel combines absolute accounting rigor with a proactive drive to automate time-consuming administrative tasks.",
    },
    sanJoseEngineering: {
      id: "sanJoseEngineering" as TestimonialId,
      role: "Faculty of Engineering & Analytics",
      organization: "Fundación Universidad San José",
      relationship: "Academic Faculty & Mentorship",
      highlight: "Analytical synthesis & systems modeling",
      quote:
        "Mariangel demonstrates remarkable analytical capacity in both Systems and Industrial Engineering courses. She excels at bridging theoretical process modeling with practical software implementations, showcasing the maturity and discipline required for high-impact engineering leadership.",
    },
    itmBioengineering: {
      id: "itmBioengineering" as TestimonialId,
      role: "Bioengineering Research & Clinical Technology Group",
      organization: "Institución Universitaria ITM",
      relationship: "Academic Research Guidance",
      highlight: "Clinical systems rigor & ethical responsibility",
      quote:
        "In the Biomedical Engineering program, Mariangel consistently demonstrates an exemplary understanding of hospital technology management, regulatory compliance, and clinical systems safety. Her interdisciplinary perspective elevates collaborative engineering projects.",
    },
  },
};
