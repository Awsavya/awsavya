"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  Clock3,
  Command,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

interface ProjectVisualProps {
  variant: string;
  compact?: boolean;
}

export default function ProjectVisual({ variant, compact = false }: ProjectVisualProps) {
  // Lumen State
  const [lumenTimeframe, setLumenTimeframe] = useState<"1M" | "6M" | "1Y">("1M");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [savingsGoal, setSavingsGoal] = useState(72);

  // Relay AI State
  const relayPrompts = [
    {
      q: "What did we decide about onboarding?",
      title: "Onboarding notes (Sample)",
      source: "Product team · 4 sample sources",
      match: "Sample match",
      snippet: "Keep the first-run flow focused on one primary action at a time...",
    },
    {
      q: "Where is the API authentication spec?",
      title: "API Security & Auth (Sample)",
      source: "Engineering · 2 sample sources",
      match: "Sample match",
      snippet: "Use scoped tokens with server-side rotation and short expiry windows...",
    },
    {
      q: "What are our design token standards?",
      title: "Design System Guidelines (Sample)",
      source: "Design Ops · 5 sample sources",
      match: "Sample match",
      snippet: "Neutral silver and white palette with purposeful violet accents and 8pt grid...",
    },
  ];
  const [activeRelayIndex, setActiveRelayIndex] = useState(0);

  // Flowline State
  const [flowRange, setFlowRange] = useState<"7D" | "30D">("7D");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(3); // 3 = completed

  function triggerFlowSimulation() {
    setIsSimulating(true);
    setSimulationStep(1);
    setTimeout(() => setSimulationStep(2), 600);
    setTimeout(() => {
      setSimulationStep(3);
      setIsSimulating(false);
    }, 1400);
  }

  // Lumen Telemetry Data (Index based, avoiding huge budget amounts)
  const lumenData = {
    "1M": {
      balance: "2,480",
      gain: "↗ 8.4% sample index",
      spend: "320 ops",
      bars: [24, 38, 32, 48, 42, 60, 48, 72, 56, 80, 64, 88, 70, 96, 82, 100, 84, 92],
    },
    "6M": {
      balance: "8,920",
      gain: "↗ 24.1% sample index",
      spend: "1,140 ops",
      bars: [30, 44, 40, 56, 52, 68, 60, 78, 68, 86, 75, 92, 82, 98, 88, 100, 90, 96],
    },
    "1Y": {
      balance: "18,450",
      gain: "↗ 58.7% sample index",
      spend: "2,450 ops",
      bars: [35, 48, 45, 62, 58, 74, 66, 82, 74, 90, 82, 95, 88, 100, 92, 98, 94, 99],
    },
  }[lumenTimeframe];

  if (variant === "lumen") {
    return (
      <div className={`project-visual visual-lumen ${compact ? "is-compact" : ""}`} aria-hidden={compact}>
        <div className="visual-window">
          <div className="window-top">
            <span className="window-dots"><i /><i /><i /></span>
            <span className="window-top-label">LUMEN / WEALTH CONCEPT</span>
            <span className="window-sample-tag">DEMO · SAMPLE DATA</span>
            <div className="window-timeframes" role="group" aria-label="Timeframe selector">
              {(["1M", "6M", "1Y"] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  className={`window-tf-btn ${lumenTimeframe === tf ? "is-active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setLumenTimeframe(tf);
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="lumen-body">
            <aside className="lumen-sidebar">
              <span className="lumen-logo">L</span>
              <i className="is-active" />
              <i />
              <i />
              <i />
            </aside>
            <div className="lumen-content">
              <div className="lumen-welcome">
                <span>
                  <small>SAMPLE INTERFACE · MONDAY</small>
                  <b>Your money, in focus.</b>
                </span>
                <span className="lumen-avatar">JD</span>
              </div>
              <div className="lumen-balance">
                <small>Illustrative balance ({lumenTimeframe})</small>
                <b>{lumenData.balance}<span>.00</span></b>
                <span className="lumen-gain">{lumenData.gain}</span>

                {/* Interactive bar chart */}
                <div className="lumen-bars" role="img" aria-label="Monthly cashflow chart (sample data)">
                  {lumenData.bars.map((height, i) => (
                    <i
                      key={i}
                      style={{ height: `${height}%` }}
                      className={hoveredBarIndex === i ? "is-hovered" : ""}
                      onMouseEnter={() => setHoveredBarIndex(i)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      title={`Sample Week ${i + 1}: ${height}%`}
                    />
                  ))}
                </div>
              </div>
              <div className="lumen-bottom-cards">
                <div>
                  <small>Sample monthly spend</small>
                  <b>{lumenData.spend}</b>
                  <span className="text-green">Sample trend · On track</span>
                </div>
                <div
                  className="interactive-savings-card"
                  onClick={(e) => {
                    e.preventDefault();
                    setSavingsGoal((prev) => (prev >= 90 ? 55 : prev + 10));
                  }}
                  title="Click to toggle savings goal progress"
                >
                  <small>Savings goal target (click to test)</small>
                  <b>{savingsGoal}%</b>
                  <span className="lumen-progress">
                    <i style={{ width: `${savingsGoal}%` }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "relay") {
    const currentRelay = relayPrompts[activeRelayIndex];

    return (
      <div className={`project-visual visual-relay ${compact ? "is-compact" : ""}`} aria-hidden={compact}>
        <div className="relay-window">
          <div className="relay-top">
            <span className="relay-symbol"><Bot size={13} /></span>
            <span>relay / workspace concept</span>
            <span className="window-sample-tag">CONCEPT DEMO</span>
          </div>
          <div className="relay-greeting">
            <small>KNOWLEDGE ASSISTANT PROTOTYPE</small>
            <b>Find the thread.</b>
            <span>Ask questions across sample documents and notes.</span>
          </div>

          {/* Interactive prompt pills */}
          <div className="relay-prompt-suggestions" role="tablist" aria-label="Suggested sample questions">
            {relayPrompts.map((p, idx) => (
              <button
                key={p.title}
                type="button"
                className={`relay-pill ${idx === activeRelayIndex ? "is-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveRelayIndex(idx);
                }}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="relay-search">
            <Search size={14} className="text-blue" />
            <span className="relay-query-text">{currentRelay.q}</span>
            <span className="relay-shortcut">⌘ ↵</span>
          </div>

          <div className="relay-result">
            <div className="relay-result-top">
              <span className="relay-file"><Command size={13} /></span>
              <span>
                <b>{currentRelay.title}</b>
                <small>{currentRelay.source}</small>
              </span>
              <span className="relay-match">{currentRelay.match}</span>
            </div>
            <p>“{currentRelay.snippet}”</p>
            <div className="relay-source-row">
              <span><Check size={11} className="text-blue" /> Sample citation linked</span>
              <span className="relay-open-link">Open sample doc <ArrowUpRight size={11} /></span>
            </div>
          </div>

          <div className="relay-mini-row">
            <div><Sparkles size={12} className="text-blue" /><span>Synthesized answer (demo)</span></div>
            <div><Clock3 size={12} /><span>Sample sync</span></div>
          </div>
        </div>
      </div>
    );
  }

  // Flowline
  return (
    <div className={`project-visual visual-flowline ${compact ? "is-compact" : ""}`} aria-hidden={compact}>
      <div className="flow-window">
        <div className="flow-top">
          <span className="flow-brand"><Workflow size={14} /> FLOWLINE OPS</span>
          <span className="window-sample-tag">SIMULATOR · DEMO</span>
          <div className="flow-top-actions">
            <button
              type="button"
              className={`flow-range-btn ${flowRange === "7D" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setFlowRange("7D");
              }}
            >
              7D
            </button>
            <button
              type="button"
              className={`flow-range-btn ${flowRange === "30D" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setFlowRange("30D");
              }}
            >
              30D
            </button>
          </div>
        </div>

        <div className="flow-heading">
          <span>
            <small>SIMULATED PIPELINE</small>
            <b>Illustrative workflow.</b>
          </span>
          <button
            type="button"
            className="flow-simulate-btn"
            onClick={(e) => {
              e.preventDefault();
              triggerFlowSimulation();
            }}
            disabled={isSimulating}
            title="Click to simulate workflow execution"
          >
            {isSimulating ? <RotateCcw size={11} className="spin-icon" /> : <Play size={11} />}
            <span>{isSimulating ? "Simulating..." : "Test pipeline"}</span>
          </button>
        </div>

        <div className="flow-kpis">
          <div>
            <small>Configured nodes</small>
            <b>{flowRange === "7D" ? "18" : "34"}</b>
            <span className="text-blue">Demo queue</span>
          </div>
          <div>
            <small>Sample events</small>
            <b>{flowRange === "7D" ? "1,284" : "6,410"}</b>
            <span className="text-blue">Batch test</span>
          </div>
          <div>
            <small>Simulation</small>
            <b>Active</b>
            <span>Scenario state</span>
          </div>
        </div>

        {/* Live pipeline simulation visual */}
        <div className="flow-pipeline-track">
          <span className={`pipe-node ${simulationStep >= 1 ? "is-done" : ""}`}>
            <Check size={10} /> Webhook
          </span>
          <span className="pipe-line"><i style={{ width: simulationStep >= 2 ? "100%" : "30%" }} /></span>
          <span className={`pipe-node ${simulationStep >= 2 ? "is-done" : ""}`}>
            <Zap size={10} /> Transform
          </span>
          <span className="pipe-line"><i style={{ width: simulationStep >= 3 ? "100%" : "0%" }} /></span>
          <span className={`pipe-node ${simulationStep >= 3 ? "is-done" : ""}`}>
            <BarChart3 size={10} /> Sync
          </span>
        </div>

        <div className="flow-bottom">
          <span><BarChart3 size={12} className="text-blue" /> Pipeline simulator</span>
          <span className="text-green">All sample stages clear <i /></span>
        </div>
      </div>
    </div>
  );
}
