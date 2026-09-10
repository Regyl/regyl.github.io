export type StatusLevel = "operational" | "stable" | "suspicious" | "watching";

export interface SocStatusItem {
  id: string;
  label: string;
  status: StatusLevel;
  statusLabel: string;
  message: string;
}

export const socStatusItems: SocStatusItem[] = [
  {
    id: "api",
    label: "API",
    status: "operational",
    statusLabel: "OPERATIONAL",
    message: "All endpoints responding. Response times within SLO. No anomalies detected.",
  },
  {
    id: "database",
    label: "DATABASE",
    status: "operational",
    statusLabel: "OPERATIONAL",
    message: "No engineers were harmed during this query. Connection pool: healthy. Slow query log: suspiciously empty.",
  },
  {
    id: "java",
    label: "JAVA",
    status: "stable",
    statusLabel: "STABLE",
    message: "JVM heap: comfortable. GC pauses: acceptable. No OutOfMemoryError since last deploy (probably).",
  },
  {
    id: "microservices",
    label: "MICROSERVICES",
    status: "suspicious",
    statusLabel: "SUSPICIOUS",
    message: "We started with one service. Now we have 47. Nobody knows why. Service mesh overhead: immeasurable.",
  },
  {
    id: "production",
    label: "PRODUCTION",
    status: "watching",
    statusLabel: "👀",
    message: "Threat detected: Friday deployment. Works on my machine. The machine has been promoted to production.",
  },
];
