export interface EngineeringTopic {
  id: string;
  title: string;
  summary: string;
  questions: string[];
}

export const engineeringTopics: EngineeringTopic[] = [
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    summary: "Systems that must work when individual parts don't.",
    questions: [
      "What happens when the network lies?",
      "What happens when the database is slow?",
      "What happens when the same message arrives twice?",
      "What happens at 03:17 AM?",
    ],
  },
  {
    id: "backend-architecture",
    title: "Backend Architecture",
    summary: "The art of drawing boxes that actually match reality.",
    questions: [
      "Where do you draw service boundaries?",
      "What belongs in sync vs async paths?",
      "When is a monolith the right answer?",
    ],
  },
  {
    id: "detection-systems",
    title: "Detection Systems",
    summary: "Finding signal in noise at scale.",
    questions: [
      "How do you avoid alert fatigue?",
      "What happens when rules depend on each other?",
      "How do you test detection coverage?",
    ],
  },
  {
    id: "dependency-graphs",
    title: "Dependency Graphs",
    summary: "Everything is connected. Most tools pretend it isn't.",
    questions: [
      "What breaks when this node changes?",
      "Are there cycles in your dependencies?",
      "Can you visualize impact before deploying?",
    ],
  },
  {
    id: "security-engineering",
    title: "Security Engineering",
    summary: "Building systems that assume attackers exist.",
    questions: [
      "What is your threat model?",
      "Where is trust established and verified?",
      "What happens when credentials leak?",
    ],
  },
  {
    id: "apis",
    title: "APIs",
    summary: "Contracts between systems that will outlive the teams that wrote them.",
    questions: [
      "Is this API idempotent?",
      "What happens on version mismatch?",
      "How do you handle partial failures gracefully?",
    ],
  },
  {
    id: "event-driven",
    title: "Event-Driven Architectures",
    summary: "Decoupling through messages — and new ways to fail.",
    questions: [
      "What is your ordering guarantee?",
      "How do consumers handle duplicates?",
      "What happens when the queue grows faster than processing?",
    ],
  },
  {
    id: "performance",
    title: "Performance",
    summary: "Making fast things faster, and slow things obvious.",
    questions: [
      "Where is the actual bottleneck?",
      "What is p99 telling you that p50 hides?",
      "Is this optimization worth the complexity?",
    ],
  },
  {
    id: "reliability",
    title: "Reliability",
    summary: "Making failure boring and recovery automatic.",
    questions: [
      "What is your blast radius?",
      "Can you roll back in under 5 minutes?",
      "Do your retries make things worse?",
    ],
  },
  {
    id: "developer-tooling",
    title: "Developer Tooling",
    summary: "Tools that save minutes compound into hours.",
    questions: [
      "What manual step happens every deploy?",
      "Where do developers lose context switching?",
      "What would you automate first?",
    ],
  },
];
