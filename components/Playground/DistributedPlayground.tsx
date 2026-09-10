"use client";

import { useEffect, useRef, useState } from "react";
import {
  createInitialState,
  tickSimulation,
  type RetryStrategy,
  type SimulationConfig,
  type SimulationState,
} from "@/lib/simulation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const defaultConfig: SimulationConfig = {
  serviceCount: 3,
  requestRate: 100,
  failureRate: 5,
  latencyMs: 50,
  retryStrategy: "exponential",
};

export function DistributedPlayground() {
  const [config, setConfigState] = useState<SimulationConfig>(defaultConfig);
  const [state, setState] = useState<SimulationState>(() => createInitialState(defaultConfig));
  const [running, setRunning] = useState(true);
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  function updateConfig(partial: Partial<SimulationConfig>) {
    setConfigState((prev) => {
      const next = { ...prev, ...partial };
      if ("serviceCount" in partial || "retryStrategy" in partial) {
        setState(createInitialState(next));
      }
      return next;
    });
  }

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setState((prev) => tickSimulation(prev, configRef.current));
    }, 500);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <Section
      id="playground"
      title="Distributed System Playground"
      subtitle="A visual simulation — not a real distributed system, but the kind of thing I think about."
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="glass space-y-5 rounded-xl p-5">
          <ControlSlider
            label="Services"
            value={config.serviceCount}
            min={1}
            max={5}
            step={1}
            onChange={(v) => updateConfig({ serviceCount: v })}
          />
          <ControlSlider
            label="Request rate (req/s)"
            value={config.requestRate}
            min={10}
            max={500}
            step={10}
            onChange={(v) => updateConfig({ requestRate: v })}
          />
          <ControlSlider
            label="Failure rate (%)"
            value={config.failureRate}
            min={0}
            max={50}
            step={1}
            onChange={(v) => updateConfig({ failureRate: v })}
          />
          <ControlSlider
            label="Latency (ms)"
            value={config.latencyMs}
            min={10}
            max={200}
            step={5}
            onChange={(v) => updateConfig({ latencyMs: v })}
          />
          <div>
            <label htmlFor="retry-strategy" className="font-mono text-xs text-muted-foreground">
              Retry strategy
            </label>
            <select
              id="retry-strategy"
              value={config.retryStrategy}
              onChange={(e) =>
                updateConfig({ retryStrategy: e.target.value as RetryStrategy })
              }
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="none">None</option>
              <option value="fixed">Fixed</option>
              <option value="exponential">Exponential</option>
            </select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRunning((r) => !r)}
            className="w-full"
          >
            {running ? "Pause" : "Resume"}
          </Button>
        </div>

        <div className="space-y-4">
          <SystemDiagram serviceCount={config.serviceCount} services={state.services} />

          <div className="grid gap-4 sm:grid-cols-2">
            <MetricBar
              label="Retry queue"
              value={state.retryQueuePercent}
              suffix="%"
            />
            {state.services.slice(0, 2).map((svc) => (
              <MetricBar
                key={svc.id}
                label={`${svc.label} latency`}
                value={Math.min(100, (svc.latencyMs / 200) * 100)}
                suffix={`${svc.latencyMs}ms`}
              />
            ))}
          </div>

          <div className="glass rounded-xl p-4">
            <p className="font-mono text-xs uppercase text-muted-foreground">Event log</p>
            <div
              className="mt-2 max-h-32 overflow-y-auto font-mono text-xs"
              role="log"
              aria-live="polite"
            >
              {state.events.map((event, i) => (
                <div key={i} className="py-0.5 text-muted-foreground">
                  [{new Date().toLocaleTimeString()}] {event}
                </div>
              ))}
            </div>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            Total: {state.totalRequests} requests · Failed: {state.failedRequests}
          </p>
        </div>
      </div>
    </Section>
  );
}

function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <label className="font-mono text-xs text-muted-foreground">{label}</label>
        <span className="font-mono text-xs text-brand">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-brand"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </div>
  );
}

function MetricBar({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="glass rounded-lg p-4">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-brand">{suffix}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            value > 70 ? "bg-red-500" : value > 40 ? "bg-amber-500" : "bg-brand"
          )}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );
}

function SystemDiagram({
  serviceCount,
  services,
}: {
  serviceCount: number;
  services: { id: string; label: string; latencyMs: number }[];
}) {
  const visibleServices = services.slice(0, serviceCount);

  return (
    <div className="glass overflow-x-auto rounded-xl p-6">
      <svg viewBox="0 0 400 280" className="mx-auto w-full min-w-[320px] max-w-md" aria-label="System architecture diagram">
        <DiagramNode x={180} y={10} label="Client" />
        <DiagramNode x={180} y={60} label="API Gateway" />
        {visibleServices.map((svc, i) => {
          const x = 60 + i * (280 / Math.max(1, visibleServices.length - 1 || 1));
          const clampedX = visibleServices.length === 1 ? 180 : Math.min(x, 320);
          return (
            <g key={svc.id}>
              <DiagramNode x={clampedX} y={130} label={svc.label} latency={svc.latencyMs} />
              <line x1={180} y1={85} x2={clampedX} y2={130} stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
            </g>
          );
        })}
        <DiagramNode x={100} y={210} label="Cache" />
        <DiagramNode x={260} y={210} label="Database" />
        {visibleServices[0] && (
          <line x1={visibleServices.length === 1 ? 180 : 60} y1={155} x2={100} y2={210} stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
        )}
        {visibleServices[1] && (
          <line x1={visibleServices.length === 2 ? 320 : 180} y1={155} x2={260} y2={210} stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
        )}
      </svg>
    </div>
  );
}

function DiagramNode({
  x,
  y,
  label,
  latency,
}: {
  x: number;
  y: number;
  label: string;
  latency?: number;
}) {
  return (
    <g>
      <rect
        x={x - 50}
        y={y}
        width="100"
        height="28"
        rx="4"
        fill="#111113"
        stroke="rgba(255,255,255,0.12)"
      />
      <text x={x} y={y + 18} textAnchor="middle" fill="#fafafa" fontSize="10" fontFamily="monospace">
        {label}
      </text>
      {latency !== undefined && (
        <text x={x} y={y + 40} textAnchor="middle" fill="#3b82f6" fontSize="8" fontFamily="monospace">
          {latency}ms
        </text>
      )}
    </g>
  );
}
