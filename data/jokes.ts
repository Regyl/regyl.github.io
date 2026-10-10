export interface Joke {
  id: string;
  text: string;
  location: "terminal" | "soc" | "footer" | "help";
}

export const jokes: Joke[] = [
  {
    id: "works-on-machine",
    text: "Works on my machine. The machine has been promoted to production.",
    location: "soc",
  },
  {
    id: "microservices",
    text: "We started with one service. Now we have 47. Nobody knows why.",
    location: "footer",
  },
  {
    id: "kubernetes",
    text: "Kubernetes: because apparently running one container was too easy.",
    location: "terminal",
  },
  {
    id: "interview",
    text: "Interviewer: 'What's your biggest weakness?' Me: 'Distributed systems.' Interviewer: 'That's not a weakness.' Me: 'Give it 6 months.'",
    location: "help",
  },
  {
    id: "git-blame",
    text: "git blame is just a formal way of asking 'who do I need to talk to about this?'",
    location: "footer",
  },
  {
    id: "spring-magic",
    text: "Spring Boot: it works, and at this point I'm too afraid to ask why.",
    location: "terminal",
  },
];
