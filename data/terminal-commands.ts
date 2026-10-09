export interface TerminalCommand {
  command: string;
  aliases?: string[];
  response: string | string[];
  animated?: boolean;
}

export const terminalCommands: TerminalCommand[] = [
  {
    command: "help",
    response: [
      "Available commands:",
      "  help          — Show this message",
      "  about         — About Eugene",
      "  skills        — Technical focus areas",
      "  experience    — Work experience",
      "  contact       — Contact information",
      "  coffee        — ☕",
      "  sudo hire-eugene — Request permission",
      "  rm -rf /regrets — Nice try",
      "",
      "Tip: Press Tab to autocomplete. ↑/↓ for history.",
    ],
  },
  {
    command: "about",
    response: [
      "Eugene Novikov",
      "Senior Java Software Engineer / Tech Lead",
      "~5 years in software engineering",
      "Background: cybersecurity / security engineering",
      "Origin: Moscow | Open to: EU, UK, USA",
      "",
      "Interested in distributed systems, security, and",
      "building technically sophisticated backends.",
    ],
  },
  {
    command: "skills",
    response: [
      "Primary: Java, Spring Boot, distributed systems",
      "Focus:  Backend architecture, security engineering",
      "Also:    PostgreSQL, Kafka, Docker, event-driven systems",
      "",
      "No percentage bars. If you need proof, ask a hard question.",
    ],
  },
  {
    command: "experience",
    response: [
      "Experience: ~5 years in software engineering",
      "",
      "[PLACEHOLDER] Detailed work history",
      "Replace with real employers and roles in resume viewer.",
      "",
      "Download resume: /resume.pdf",
    ],
  },
  {
    command: "contact",
    response: [
      "GitHub:   https://github.com/Regyl",
      "LinkedIn: https://www.linkedin.com/in/eugene-novikov-regyl/",
      "Medium:   https://medium.com/@regyl",
      "LeetCode: https://leetcode.com/u/novikovevgeny1/",
      "Email:    YOUR_EMAIL_HERE [PLACEHOLDER]",
    ],
  },
  {
    command: "coffee",
    response: [
      "☕ Coffee status: ██████████ 100%",
      "",
      "Current state: Caffeinated and operational",
      "Side effects:  May cause excessive system design diagrams",
      "Warning:       Do not deploy after 4th cup",
    ],
  },
  {
    command: "sudo hire-eugene",
    response: [
      "Checking permissions...",
      "",
      "✓ Senior Engineer",
      "✓ Java",
      "✓ Distributed systems",
      "✓ Security",
      "✓ Can debug production",
      "✓ Knows what a race condition is",
      "",
      "Permission granted.",
      "",
      "> hire eugene",
    ],
    animated: true,
  },
  {
    command: "rm -rf /regrets",
    aliases: ["rm -rf", "rm -rf /", "rm -rf /*"],
    response: [
      "Nice try.",
      "",
      "Portfolio deletion prevented.",
      "Error: Operation not permitted — senior engineers keep their mistakes as learning data.",
    ],
  },
];

export const bootSequence = [
  "$ whoami",
  "eugene",
  "",
  "eugene@portfolio:~$ ./profile",
  "",
  "Role:       Senior Software Engineer",
  "Specialty:  Backend systems",
  "Language:   Java",
  "Status:     Building things",
  "Coffee:     ██████████ 100%",
  "Production: probably on fire",
  "",
  "> system ready",
  "",
  'Type "help" for available commands.',
];

export function findCommand(input: string): TerminalCommand | undefined {
  const normalized = input.trim().toLowerCase();
  return terminalCommands.find(
    (cmd) =>
      cmd.command === normalized ||
      cmd.aliases?.some((alias) => alias === normalized)
  );
}

export function getCommandSuggestions(partial: string): string[] {
  const all = terminalCommands.map((c) => c.command);
  if (!partial) return all;
  return all.filter((cmd) => cmd.startsWith(partial.toLowerCase()));
}
