export type RetryStrategy = "none" | "exponential" | "fixed";

export interface SimulationConfig {
  serviceCount: number;
  requestRate: number;
  failureRate: number;
  latencyMs: number;
  retryStrategy: RetryStrategy;
}

export interface ServiceMetrics {
  id: string;
  label: string;
  latencyMs: number;
  errorRate: number;
  requests: number;
}

export interface SimulationState {
  services: ServiceMetrics[];
  retryQueuePercent: number;
  events: string[];
  totalRequests: number;
  failedRequests: number;
}

const SERVICE_LABELS = ["Service A", "Service B", "Service C", "Service D", "Service E"];

export function createInitialState(config: SimulationConfig): SimulationState {
  const services = Array.from({ length: config.serviceCount }, (_, i) => ({
    id: `svc-${i}`,
    label: SERVICE_LABELS[i] ?? `Service ${i + 1}`,
    latencyMs: config.latencyMs + i * 10,
    errorRate: 0,
    requests: 0,
  }));

  return {
    services,
    retryQueuePercent: 0,
    events: ["Simulation initialized. All systems nominal."],
    totalRequests: 0,
    failedRequests: 0,
  };
}

export function tickSimulation(
  state: SimulationState,
  config: SimulationConfig
): SimulationState {
  const newServices = state.services.map((svc) => {
    const jitter = (Math.random() - 0.5) * config.latencyMs * 0.4;
    const latencyMs = Math.max(5, config.latencyMs + jitter + Math.random() * 30);
    const failed = Math.random() * 100 < config.failureRate;
    return {
      ...svc,
      latencyMs: Math.round(latencyMs),
      errorRate: failed ? config.failureRate : Math.max(0, config.failureRate - 5),
      requests: svc.requests + Math.floor(config.requestRate / config.serviceCount / 10),
    };
  });

  const failed = Math.random() * 100 < config.failureRate;
  const totalRequests = state.totalRequests + 1;
  const failedRequests = state.failedRequests + (failed ? 1 : 0);

  let retryQueuePercent = state.retryQueuePercent;
  if (failed && config.retryStrategy !== "none") {
    retryQueuePercent = Math.min(100, retryQueuePercent + 8);
  } else {
    retryQueuePercent = Math.max(0, retryQueuePercent - 3);
  }

  const events = [...state.events];
  if (failed) {
    const svc = newServices[Math.floor(Math.random() * newServices.length)];
    events.push(`${svc.label} failure detected — retry strategy: ${config.retryStrategy}`);
  } else if (Math.random() > 0.85) {
    events.push(`Database latency ↑ — ${Math.round(config.latencyMs * 1.5)}ms`);
  } else if (Math.random() > 0.9) {
    events.push("Retry succeeded after 2 attempts");
  }

  return {
    services: newServices,
    retryQueuePercent,
    events: events.slice(-8),
    totalRequests,
    failedRequests,
  };
}
