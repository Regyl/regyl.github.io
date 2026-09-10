export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  architecture: string;
  technologies: string[];
  engineeringChallenge: string;
  github: string;
  demo?: string;
  isPlaceholder: boolean;
  architectureNodes: { id: string; label: string; x: number; y: number }[];
  architectureEdges: { from: string; to: string }[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "[PLACEHOLDER] Project Name",
    description:
      "[PLACEHOLDER] Brief description of the project. Replace with real project details.",
    problem:
      "[PLACEHOLDER] What problem did this project solve? Describe the business or technical need.",
    architecture:
      "[PLACEHOLDER] High-level architecture overview — services, data flow, key design decisions.",
    technologies: ["Java", "Spring Boot", "PostgreSQL"],
    engineeringChallenge:
      "[PLACEHOLDER] The hardest engineering problem you solved on this project.",
    github: "https://github.com/Regyl",
    isPlaceholder: true,
    architectureNodes: [
      { id: "client", label: "Client", x: 150, y: 20 },
      { id: "api", label: "API", x: 150, y: 80 },
      { id: "service", label: "Service", x: 80, y: 150 },
      { id: "db", label: "Database", x: 220, y: 150 },
    ],
    architectureEdges: [
      { from: "client", to: "api" },
      { from: "api", to: "service" },
      { from: "service", to: "db" },
    ],
  },
  {
    id: "project-2",
    title: "[PLACEHOLDER] Project Name",
    description:
      "[PLACEHOLDER] Brief description of the project. Replace with real project details.",
    problem:
      "[PLACEHOLDER] What problem did this project solve? Describe the business or technical need.",
    architecture:
      "[PLACEHOLDER] High-level architecture overview — services, data flow, key design decisions.",
    technologies: ["Java", "Spring Boot", "Kafka", "Redis"],
    engineeringChallenge:
      "[PLACEHOLDER] The hardest engineering problem you solved on this project.",
    github: "https://github.com/Regyl",
    isPlaceholder: true,
    architectureNodes: [
      { id: "gateway", label: "Gateway", x: 150, y: 20 },
      { id: "svc-a", label: "Service A", x: 60, y: 100 },
      { id: "svc-b", label: "Service B", x: 240, y: 100 },
      { id: "kafka", label: "Kafka", x: 150, y: 180 },
    ],
    architectureEdges: [
      { from: "gateway", to: "svc-a" },
      { from: "gateway", to: "svc-b" },
      { from: "svc-a", to: "kafka" },
      { from: "svc-b", to: "kafka" },
    ],
  },
  {
    id: "project-3",
    title: "[PLACEHOLDER] Project Name",
    description:
      "[PLACEHOLDER] Brief description of the project. Replace with real project details.",
    problem:
      "[PLACEHOLDER] What problem did this project solve? Describe the business or technical need.",
    architecture:
      "[PLACEHOLDER] High-level architecture overview — services, data flow, key design decisions.",
    technologies: ["Java", "Spring Security", "Docker"],
    engineeringChallenge:
      "[PLACEHOLDER] The hardest engineering problem you solved on this project.",
    github: "https://github.com/Regyl",
    isPlaceholder: true,
    architectureNodes: [
      { id: "user", label: "User", x: 150, y: 20 },
      { id: "auth", label: "Auth", x: 150, y: 90 },
      { id: "core", label: "Core API", x: 150, y: 160 },
    ],
    architectureEdges: [
      { from: "user", to: "auth" },
      { from: "auth", to: "core" },
    ],
  },
];
