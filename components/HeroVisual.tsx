"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Activity, ArrowUpRight, Bot, CircleCheck, Code2, Layers3, Sparkles, TrendingUp, Zap } from "lucide-react";

interface StatusPreset {
  label: string;
  workflows: string;
  completion: string;
  uptime: string;
  path: string;
}

const statusPresets: Record<string, StatusPreset> = {
  "24h": {
    label: "24h",
    workflows: "04",
    completion: "98.2%",
    uptime: "99.98%",
    path: "M0 37 C15 37 18 19 31 24 S49 35 64 21 S83 27 98 17 S122 28 139 13 S166 22 178 9 S204 18 216 6 S231 10 240 3",
  },
  "7d": {
    label: "7d",
    workflows: "12",
    completion: "99.4%",
    uptime: "100%",
    path: "M0 40 C20 40 30 25 50 28 S80 18 100 22 S130 14 160 16 S190 8 215 10 S230 4 240 2",
  },
  "30d": {
    label: "30d",
    workflows: "28",
    completion: "99.8%",
    uptime: "99.99%",
    path: "M0 42 C25 42 45 30 70 32 S110 20 135 24 S175 12 195 15 S225 6 240 3",
  },
};

const aiQueries = [
  {
    q: "Context search",
    title: "AI assistant",
    ans: "Context found · 6 linked models",
    lines: [92, 78, 54],
  },
  {
    q: "API synthesis",
    title: "Code intelligence",
    ans: "Pipeline verified · 0 regressions",
    lines: [88, 65, 72],
  },
  {
    q: "Workflow map",
    title: "Automation engine",
    ans: "4 handoffs optimized",
    lines: [95, 82, 40],
  },
];

export default function HeroVisual() {
  const [activePreset, setActivePreset] = useState<"24h" | "7d" | "30d">("24h");
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentStatus = statusPresets[activePreset];
  const currentAi = aiQueries[activeQueryIndex];

  return (
    <div
      className="hero-visual"
      aria-label="Interactive digital product ecosystem visual"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hero-visual-grid" />
      
      {/* Dynamic ambient glow behind the core */}
      <div className={`hero-glow-back ${isHovered ? "is-active" : ""}`} />

      {/* Outer orbits */}
      <motion.div
        className="orbit orbit-one"
        animate={{ rotate: 360 }}
        transition={{ duration: 52, ease: "linear", repeat: Infinity }}
      >
        <span className="orbit-node node-one" />
        <span className="orbit-node node-two" />
      </motion.div>
      <motion.div
        className="orbit orbit-two"
        animate={{ rotate: -360 }}
        transition={{ duration: 64, ease: "linear", repeat: Infinity }}
      >
        <span className="orbit-node node-three" />
      </motion.div>

      {/* Central interactive sphere */}
      <motion.div
        className="core-sphere"
        animate={{
          y: isHovered ? -12 : [0, -8, 0],
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: isHovered ? 0.3 : 6, ease: "easeInOut", repeat: isHovered ? 0 : Infinity }}
      >
        <div className="sphere-shine" />
        <div className="sphere-inner">A<span>.</span></div>
      </motion.div>

      {/* Interactive Top Card: AI Assistant & Query Switcher */}
      <motion.div
        className="floating-card floating-card-top"
        initial={{ opacity: 0, x: 18, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
      >
        <div className="floating-card-head">
          <span className="card-icon blue"><Sparkles size={14} /></span>
          <span>{currentAi.title}</span>
          <span className="mini-live"><span className="pulse-dot-mini" />LIVE</span>
        </div>

        {/* Interactive mini query tabs */}
        <div className="assistant-query-pills" role="tablist" aria-label="AI demonstration prompts">
          {aiQueries.map((item, idx) => (
            <button
              key={item.q}
              type="button"
              role="tab"
              aria-selected={idx === activeQueryIndex}
              className={`query-pill ${idx === activeQueryIndex ? "is-selected" : ""}`}
              onClick={() => setActiveQueryIndex(idx)}
            >
              {item.q}
            </button>
          ))}
        </div>

        <div className="assistant-lines" aria-hidden="true">
          {currentAi.lines.map((width, i) => (
            <i key={i} style={{ width: `${width}%` }} />
          ))}
        </div>

        <div className="assistant-answer">
          <CircleCheck size={13} className="text-blue" />
          <span>{currentAi.ans}</span>
        </div>
      </motion.div>

      {/* Interactive Bottom Card: Metrics & Live Timeframe Sparkline */}
      <motion.div
        className="floating-card floating-card-bottom"
        initial={{ opacity: 0, x: -18, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="floating-card-head">
          <span className="card-icon blue"><Activity size={14} /></span>
          <span>System metrics</span>
          <div className="timeframe-selector" role="group" aria-label="Metrics timeframe">
            {(["24h", "7d", "30d"] as const).map((preset) => (
              <button
                key={preset}
                type="button"
                className={`timeframe-btn ${activePreset === preset ? "is-active" : ""}`}
                onClick={() => setActivePreset(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="status-metrics">
          <div>
            <strong>{currentStatus.workflows}</strong>
            <span>Active flows</span>
          </div>
          <div>
            <strong>{currentStatus.completion}</strong>
            <span className="metric-tag"><TrendingUp size={10} /> Optimal</span>
          </div>
        </div>

        {/* Sparkline curve */}
        <div className="mini-chart-wrap" title={`Trend for ${activePreset}`}>
          <svg className="mini-chart" viewBox="0 0 240 48" preserveAspectRatio="none" aria-hidden="true">
            <path
              d={currentStatus.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Floating capability badges */}
      <motion.div
        className="floating-pill pill-left"
        whileHover={{ scale: 1.08, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Code2 size={13} /> Software & Web
      </motion.div>
      
      <motion.div
        className="floating-pill pill-right"
        whileHover={{ scale: 1.08, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Bot size={13} /> Applied AI & Agents
      </motion.div>

      <div className="hero-visual-caption">
        <Layers3 size={13} />
        <span>Click cards to interact · One connected ecosystem</span>
        <ArrowUpRight size={12} />
      </div>
    </div>
  );
}
