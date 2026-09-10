export interface ResearchTopic {
  id: string;
  title: string;
  problem: string;
  whyItMatters: string;
  potentialApproach: string;
  openQuestions: string[];
}

export const researchTopics: ResearchTopic[] = [
  {
    id: "dependency-graphs",
    title: "Dependency graphs for detection rules",
    problem:
      "Detection rules often depend on each other, but dependencies are rarely modeled explicitly.",
    whyItMatters:
      "Without explicit dependency graphs, rule changes can cause cascading failures or silent gaps in coverage.",
    potentialApproach:
      "Build a graph-based model of rule dependencies with cycle detection and impact analysis before deployment.",
    openQuestions: [
      "How do you handle dynamic dependencies at runtime?",
      "What is the minimum viable graph representation for production systems?",
    ],
  },
  {
    id: "graph-based-se",
    title: "Graph-based software engineering systems",
    problem:
      "Codebases are graphs, but most tooling treats them as flat file trees.",
    whyItMatters:
      "Graph-aware tooling could improve refactoring safety, dependency analysis, and architectural enforcement.",
    potentialApproach:
      "Extract call graphs and module dependencies into a queryable graph database for analysis.",
    openQuestions: [
      "How to keep the graph in sync with fast-moving codebases?",
      "What queries provide the most engineering value?",
    ],
  },
  {
    id: "scalable-detection",
    title: "Scalable detection architectures",
    problem:
      "Detection systems must process high-volume event streams without missing signals or drowning in noise.",
    whyItMatters:
      "Poor detection architecture leads to alert fatigue or missed incidents — both expensive failures.",
    potentialApproach:
      "Layered detection with tiered rule evaluation, sampling strategies, and backpressure handling.",
    openQuestions: [
      "Where is the optimal tradeoff between latency and completeness?",
      "How to validate detection coverage at scale?",
    ],
  },
  {
    id: "distributed-reliability",
    title: "Reliability of distributed backend systems",
    problem:
      "Distributed systems fail in ways that are hard to reproduce and harder to prevent.",
    whyItMatters:
      "Reliability is not a feature — it is the foundation that everything else depends on.",
    potentialApproach:
      "Chaos engineering combined with formal failure mode analysis and SLO-driven design.",
    openQuestions: [
      "Which failure modes are worth simulating in production?",
      "How to measure reliability improvements meaningfully?",
    ],
  },
  {
    id: "security-engineering",
    title: "Security engineering in backend systems",
    problem:
      "Security is often bolted on rather than designed in from the start.",
    whyItMatters:
      "A security mindset changes how you design APIs, handle data, and respond to incidents.",
    potentialApproach:
      "Threat modeling integrated into the design review process with security-focused code patterns.",
    openQuestions: [
      "How to balance security rigor with developer velocity?",
      "What automated checks catch the most real vulnerabilities?",
    ],
  },
  {
    id: "developer-productivity",
    title: "Developer productivity and tooling",
    problem:
      "Developers spend significant time on repetitive tasks that could be automated or simplified.",
    whyItMatters:
      "Better tooling compounds — every minute saved per developer multiplies across the team.",
    potentialApproach:
      "Internal developer platforms with self-service infrastructure and opinionated defaults.",
    openQuestions: [
      "What tooling provides the highest ROI for backend teams?",
      "How to measure developer productivity without gaming metrics?",
    ],
  },
];
