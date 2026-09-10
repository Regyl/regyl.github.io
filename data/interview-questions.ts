export type InterviewCategory =
  | "Java"
  | "System Design"
  | "Distributed Systems"
  | "Security"
  | "Backend"
  | "Behavioral";

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  question: string;
  approach: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "sd-1",
    category: "System Design",
    question: "Design a URL shortener.",
    approach:
      "Start with requirements: read/write ratio, custom URLs, TTL. Use base62 encoding for short keys, a distributed cache for hot URLs, and consistent hashing for database sharding. Consider collision handling and analytics as secondary concerns.",
  },
  {
    id: "sd-2",
    category: "System Design",
    question:
      "How would you design a distributed rate limiter for 10 million requests per second?",
    approach:
      "Use token bucket or sliding window counters. Partition by client ID with consistent hashing. Local counters with periodic sync for approximate limits, or Redis with Lua scripts for strict limits. Consider edge rate limiting to reduce backend load.",
  },
  {
    id: "sd-3",
    category: "System Design",
    question: "How would you make an API idempotent?",
    approach:
      "Accept an idempotency key in the request header. Store key + response in a TTL cache. On duplicate requests, return cached response. Use database unique constraints for natural idempotency on writes.",
  },
  {
    id: "sd-4",
    category: "System Design",
    question: "How would you debug high latency in a microservices architecture?",
    approach:
      "Distributed tracing first — find the slow span. Check p99 vs p50 to identify tail latency. Look for N+1 calls, missing connection pooling, GC pauses, and downstream timeouts. Compare canary vs production metrics.",
  },
  {
    id: "sd-5",
    category: "System Design",
    question: "How would you design a detection-rule dependency graph?",
    approach:
      "Model rules as nodes, dependencies as directed edges. Detect cycles before deployment. Topological sort for evaluation order. Impact analysis: given a rule change, compute all downstream affected rules.",
  },
  {
    id: "ds-1",
    category: "Distributed Systems",
    question: "What happens when Kafka consumers fall behind?",
    approach:
      "Consumer lag grows. Depending on retention, old messages may be deleted before processing. Mitigate with more partitions/consumers, backpressure on producers, dead letter queues, and monitoring lag as an SLO.",
  },
  {
    id: "ds-2",
    category: "Distributed Systems",
    question: "Explain the CAP theorem in a real system you've worked on.",
    approach:
      "Most production systems choose CP or AP with tunable consistency. Example: a payment system favors consistency (CP), while a feed system may accept eventual consistency (AP) for availability.",
  },
  {
    id: "java-1",
    category: "Java",
    question: "How does the G1 garbage collector work at a high level?",
    approach:
      "G1 divides the heap into regions. It tracks garbage density per region and collects regions with most garbage first (Garbage First). Targets predictable pause times via incremental collection.",
  },
  {
    id: "java-2",
    category: "Java",
    question: "What is the difference between @Transactional and programmatic transactions?",
    approach:
      "@Transactional uses AOP proxies — only works on public methods called through the proxy. Programmatic transactions via TransactionTemplate give explicit control but more boilerplate. Self-invocation bypasses @Transactional.",
  },
  {
    id: "sec-1",
    category: "Security",
    question: "How would you secure a REST API?",
    approach:
      "Authentication (OAuth2/JWT), authorization (RBAC), input validation, rate limiting, HTTPS everywhere, security headers, audit logging. Principle of least privilege. Never trust client-side validation alone.",
  },
  {
    id: "sec-2",
    category: "Security",
    question: "What is a threat model and when would you create one?",
    approach:
      "A structured analysis of threats (STRIDE/DREAD). Create during design for new features handling sensitive data. Identifies assets, trust boundaries, and mitigations before code is written.",
  },
  {
    id: "be-1",
    category: "Backend",
    question: "How do you handle database migrations in production?",
    approach:
      "Backward-compatible migrations only. Expand-contract pattern: add new column, dual-write, migrate reads, remove old. Never drop columns in the same deploy. Test rollback path.",
  },
  {
    id: "be-2",
    category: "Backend",
    question: "When would you choose sync vs async communication between services?",
    approach:
      "Sync when you need immediate response and strong consistency. Async when you can tolerate eventual consistency, need decoupling, or handle traffic spikes. Prefer async for side effects.",
  },
  {
    id: "beh-1",
    category: "Behavioral",
    question: "Tell me about a time you debugged a production incident.",
    approach:
      "[PLACEHOLDER] Replace with a real STAR-format story. Structure: Situation, Task, Action, Result. Focus on systematic debugging, communication, and post-mortem learnings.",
  },
  {
    id: "beh-2",
    category: "Behavioral",
    question: "How do you approach technical disagreements with teammates?",
    approach:
      "Focus on tradeoffs, not opinions. Write down requirements and constraints. Prototype when uncertain. Escalate with data, not authority. The goal is the best solution, not winning the argument.",
  },
];

export const systemDesignQuestions = interviewQuestions.filter(
  (q) => q.category === "System Design" || q.category === "Distributed Systems"
);
