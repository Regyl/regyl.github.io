import {
  Globe,
  Layers,
  Shield,
  Trophy,
  BookOpen,
  Server,
  type LucideIcon,
} from "lucide-react";

export interface ProfilePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

export const profilePillars: ProfilePillar[] = [
  {
    id: "backend",
    title: "Backend",
    subtitle: "Java / Spring / distributed systems",
    description:
      "Building reliable backend systems with Java and Spring Boot. Comfortable with the full stack of distributed systems concerns.",
    icon: Server,
  },
  {
    id: "security",
    title: "Security",
    subtitle: "Cybersecurity / secure engineering mindset",
    description:
      "Professional background in cybersecurity. Security is a design constraint, not an afterthought.",
    icon: Shield,
  },
  {
    id: "architecture",
    title: "Architecture",
    subtitle: "Systems thinking / scalability / reliability",
    description:
      "Thinking in systems — boundaries, failure modes, tradeoffs. Making the wrong thing difficult.",
    icon: Layers,
  },
  {
    id: "competitive",
    title: "Competitive",
    subtitle: "Hackathons / problem solving",
    description:
      "Digital Breakthrough finalist and prize recipient (2021). Comfortable under pressure with ambiguous problems.",
    icon: Trophy,
  },
  {
    id: "research",
    title: "Research",
    subtitle: "Software engineering research / technical writing",
    description:
      "Interested in software engineering research and academic publications. Explores hard problems systematically.",
    icon: BookOpen,
  },
  {
    id: "international",
    title: "International",
    subtitle: "Open to relocation / international engineering teams",
    description:
      "Based in Moscow, pursuing international opportunities in EU, UK, and USA. Ready for distributed teams.",
    icon: Globe,
  },
];
