"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  Database,
  Layers,
  Link2,
  PackageCheck,
  Play,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

interface ProjectVisualProps {
  variant: string;
  compact?: boolean;
}

export default function ProjectVisual({ variant, compact = false }: ProjectVisualProps) {
  // 1. TripSplit State (vyom027)
  const [activeTrip, setActiveTrip] = useState<"Goa '26" | "Manali Trek">("Goa '26");
  const [isDebtSimplified, setIsDebtSimplified] = useState(true);
  const [tripSettled, setTripSettled] = useState(false);

  // 2. Build2Buzz State (gosaiyash)
  const [selectedRepoIndex, setSelectedRepoIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerified, setHasVerified] = useState(true);

  const build2buzzRepos = [
    {
      name: "vyom027/TripSplit",
      lang: "Kotlin / Compose",
      readmeFact: "Offline Room DB · Zero-signup deep link claim",
      observedFact: "Verified 280ms UI render · SSRF sandbox pass",
      claim: "Eliminates debt confusion via graph-based transfer minimization.",
    },
    {
      name: "gosaiyash/trainmesh",
      lang: "Kotlin / SQLite",
      readmeFact: "Local SQLite storage · AI workout assistant",
      observedFact: "GPS distance tracking stream verified",
      claim: "Combines local fitness routines with grounded AI guidance.",
    },
  ];

  // 3. Har Apparels State (vyom027)
  const [activeRole, setActiveRole] = useState<"worker" | "supervisor">("worker");
  const [completedBundles, setCompletedBundles] = useState(24);
  const [harStep, setHarStep] = useState(3); // 1 = Denim Ingest, 2 = Cutting, 3 = Stitching, 4 = QC Passed

  // 4. QuicklyCart State (gosaiyash)
  const [orderStage, setOrderStage] = useState(3); // 1 = Placed, 2 = Packed, 3 = Rider Dispatched, 4 = Delivered
  const [merchantOnline, setMerchantOnline] = useState(true);

  // -------------------------------------------------------------
  // VARIANT: TripSplit (Mobile & FinTech - vyom027)
  // -------------------------------------------------------------
  if (variant === "tripsplit") {
    const tripData = {
      "Goa '26": {
        total: "18,450",
        netBalance: "+1,850",
        isOwed: true,
        simplifiedText: "6 raw debts reduced to 2 direct transfers",
        unsimplifiedText: "6 individual cross-payments required",
        transfer: "Yash → Vyom: ₹1,850",
        members: ["Vyom (Organizer)", "Yash", "Devang", "Riddhi"],
      },
      "Manali Trek": {
        total: "32,800",
        netBalance: "+3,400",
        isOwed: true,
        simplifiedText: "8 raw debts reduced to 3 direct transfers",
        unsimplifiedText: "8 individual cross-payments required",
        transfer: "Aarav → Vyom: ₹3,400",
        members: ["Vyom (Organizer)", "Aarav", "Kabir", "Meera"],
      },
    }[activeTrip];

    return (
      <div className={`project-visual visual-tripsplit ${compact ? "is-compact" : ""}`} aria-hidden={compact}>
        <div className="tripsplit-window">
          {/* Top Bar */}
          <div className="window-top">
            <span className="window-dots"><i /><i /><i /></span>
            <span className="window-top-label">TRIPSPLIT / OFFLINE ANDROID</span>
            <span className="window-sample-tag">ROOM DB · FIRESTORE</span>
            <div className="window-timeframes" role="group" aria-label="Trip selector">
              {(["Goa '26", "Manali Trek"] as const).map((trip) => (
                <button
                  key={trip}
                  type="button"
                  className={`window-tf-btn ${activeTrip === trip ? "is-active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTrip(trip);
                  }}
                >
                  {trip}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="tripsplit-body">
            {/* Balance Card */}
            <div className="tripsplit-balance-card">
              <div className="ts-balance-header">
                <div>
                  <small>EXPEDITION POOL ({activeTrip})</small>
                  <b>₹{tripData.total}<span>.00</span></b>
                </div>
                <div className="ts-net-badge">
                  <small>YOUR POSITION</small>
                  <span className="ts-pos-value">{tripData.netBalance}</span>
                </div>
              </div>

              {/* Debt Simplification Visualizer */}
              <div className="ts-algorithm-box">
                <div className="ts-algo-header">
                  <span className="ts-algo-title">
                    <Zap size={11} className="text-blue" />
                    <b>DEBT SIMPLIFIER</b>
                  </span>
                  <button
                    type="button"
                    className="ts-algo-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDebtSimplified((prev) => !prev);
                    }}
                    title="Toggle graph debt minimization algorithm"
                  >
                    {isDebtSimplified ? "Graph Optimized" : "Raw Transactions"}
                  </button>
                </div>

                <div className="ts-transfer-row">
                  <span className="ts-transfer-chip">
                    <Users size={11} />
                    {isDebtSimplified ? tripData.transfer : tripData.unsimplifiedText}
                  </span>
                  <button
                    type="button"
                    className={`ts-settle-btn ${tripSettled ? "is-settled" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setTripSettled((prev) => !prev);
                    }}
                  >
                    {tripSettled ? <Check size={11} /> : null}
                    <span>{tripSettled ? "Settled" : "Record Settle"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Offline & Architecture Badges */}
            <div className="tripsplit-bottom-row">
              <div className="ts-badge-item">
                <Database size={11} className="text-blue" />
                <span>Room DB · 100% Offline Ready</span>
              </div>
              <div className="ts-badge-item">
                <Link2 size={11} className="text-blue" />
                <span>Zero-Signup App Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT: Build2Buzz (Applied AI & Pipeline - gosaiyash)
  // -------------------------------------------------------------
  if (variant === "build2buzz") {
    const curRepo = build2buzzRepos[selectedRepoIndex];

    function runVerification() {
      setIsVerifying(true);
      setHasVerified(false);
      setTimeout(() => {
        setIsVerifying(false);
        setHasVerified(true);
      }, 700);
    }

    return (
      <div className={`project-visual visual-build2buzz ${compact ? "is-compact" : ""}`} aria-hidden={compact}>
        <div className="build2buzz-window">
          {/* Top Bar */}
          <div className="window-top">
            <span className="window-dots"><i /><i /><i /></span>
            <span className="window-top-label">BUILD2BUZZ / GROUNDED AI</span>
            <span className="window-sample-tag">ZERO HALLUCINATION</span>
            <div className="window-timeframes">
              <button
                type="button"
                className="window-tf-btn is-active"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRepoIndex((prev) => (prev === 0 ? 1 : 0));
                }}
              >
                Switch Repo
              </button>
            </div>
          </div>

          <div className="build2buzz-body">
            {/* Repo Header */}
            <div className="b2b-header">
              <div className="b2b-repo-info">
                <Bot size={13} className="text-blue" />
                <b>{curRepo.name}</b>
                <span className="b2b-lang-pill">{curRepo.lang}</span>
              </div>
              <button
                type="button"
                className="b2b-inspect-btn"
                onClick={(e) => {
                  e.preventDefault();
                  runVerification();
                }}
                disabled={isVerifying}
              >
                {isVerifying ? <RotateCcw size={10} className="spin-icon" /> : <Play size={10} />}
                <span>{isVerifying ? "Inspecting..." : "Verify Demo"}</span>
              </button>
            </div>

            {/* Fact Isolation Grid */}
            <div className="b2b-facts-grid">
              <div className="b2b-fact-card">
                <small><CheckCircle2 size={10} className="text-green" /> README DOCUMENTATION</small>
                <p>{curRepo.readmeFact}</p>
              </div>
              <div className="b2b-fact-card">
                <small><ShieldCheck size={10} className="text-blue" /> HEADLESS BROWSER DEMO</small>
                <p>{curRepo.observedFact}</p>
              </div>
            </div>

            {/* Drafted Post Preview */}
            <div className="b2b-draft-box">
              <div className="b2b-draft-header">
                <span className="b2b-verified-badge">
                  <Sparkles size={10} /> {hasVerified ? "100% Grounded in Evidence" : "Evaluating claims..."}
                </span>
                <span className="b2b-char-count">420 / 3,000 chars</span>
              </div>
              <p className="b2b-post-snippet">“{curRepo.claim}”</p>
              <div className="b2b-footer-row">
                <span><Check size={10} className="text-green" /> Human-in-the-Loop Signoff</span>
                <span className="b2b-api-tag">LinkedIn REST API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT: Har Apparels (Industrial ERP - vyom027)
  // -------------------------------------------------------------
  if (variant === "har-apparels") {
    function advanceHarStage() {
      setHarStep((prev) => (prev >= 4 ? 1 : prev + 1));
      setCompletedBundles((prev) => prev + 4);
    }

    return (
      <div className={`project-visual visual-har-apparels ${compact ? "is-compact" : ""}`} aria-hidden={compact}>
        <div className="har-window">
          {/* Top Bar */}
          <div className="window-top">
            <span className="window-dots"><i /><i /><i /></span>
            <span className="window-top-label">HAR APPARELS / SHOP-FLOOR ERP</span>
            <span className="window-sample-tag">DENIM MANUFACTURING</span>
            <div className="window-timeframes">
              <button
                type="button"
                className={`window-tf-btn ${activeRole === "worker" ? "is-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveRole("worker");
                }}
              >
                Worker
              </button>
              <button
                type="button"
                className={`window-tf-btn ${activeRole === "supervisor" ? "is-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveRole("supervisor");
                }}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="har-body">
            {/* Production Header */}
            <div className="har-metrics-row">
              <div className="har-metric-card">
                <small>RAW DENIM ROLLS</small>
                <b>42 Rolls <span>(3,840m)</span></b>
                <span className="text-blue">Lot #DR-88</span>
              </div>
              <div className="har-metric-card">
                <small>TODAY'S BUNDLES</small>
                <b>{completedBundles} <span>units</span></b>
                <span className="text-green">88% on target</span>
              </div>
              <div className="har-metric-card">
                <small>ACTIVE WORK ORDER</small>
                <b>Batch #D-204</b>
                <span>Slim-Fit Jeans</span>
              </div>
            </div>

            {/* Shop Floor Stage Tracker */}
            <div className="har-pipeline-track">
              <span className={`pipe-node ${harStep >= 1 ? "is-done" : ""}`}>
                <Check size={9} /> Roll Ingest
              </span>
              <span className="pipe-line"><i style={{ width: harStep >= 2 ? "100%" : "30%" }} /></span>
              <span className={`pipe-node ${harStep >= 2 ? "is-done" : ""}`}>
                <Layers size={9} /> Cutting
              </span>
              <span className="pipe-line"><i style={{ width: harStep >= 3 ? "100%" : "0%" }} /></span>
              <span className={`pipe-node ${harStep >= 3 ? "is-done" : ""}`}>
                <Workflow size={9} /> Stitching
              </span>
              <span className="pipe-line"><i style={{ width: harStep >= 4 ? "100%" : "0%" }} /></span>
              <span className={`pipe-node ${harStep >= 4 ? "is-done" : ""}`}>
                <PackageCheck size={9} /> QC Passed
              </span>
            </div>

            {/* Action Bar */}
            <div className="har-action-bar">
              <div className="har-action-left">
                <Clock3 size={11} className="text-blue" />
                <span>Shift 01: Line 3 Active</span>
              </div>
              <button
                type="button"
                className="har-log-btn"
                onClick={(e) => {
                  e.preventDefault();
                  advanceHarStage();
                }}
                title="Log completed work order bundle"
              >
                <PackageCheck size={11} />
                <span>Advance Stage</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT: QuicklyCart (Multi-Vendor Platform - gosaiyash)
  // -------------------------------------------------------------
  const stages = [
    { num: 1, label: "Order Placed", role: "Customer" },
    { num: 2, label: "Store Packed", role: "Merchant" },
    { num: 3, label: "Rider Assigned", role: "Rider" },
    { num: 4, label: "Delivered", role: "Customer" },
  ];

  function advanceOrderStage() {
    setOrderStage((prev) => (prev >= 4 ? 1 : prev + 1));
  }

  return (
    <div className={`project-visual visual-quicklycart ${compact ? "is-compact" : ""}`} aria-hidden={compact}>
      <div className="quickly-window">
        {/* Top Bar */}
        <div className="window-top">
          <span className="window-dots"><i /><i /><i /></span>
          <span className="window-top-label">QUICKLYCART / MULTI-VENDOR</span>
          <span className="window-sample-tag">STATE MACHINE</span>
          <div className="window-timeframes">
            <button
              type="button"
              className={`window-tf-btn ${merchantOnline ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setMerchantOnline((prev) => !prev);
              }}
            >
              {merchantOnline ? "Store Open" : "Offline"}
            </button>
          </div>
        </div>

        <div className="quickly-body">
          {/* Order Header */}
          <div className="quickly-header">
            <div>
              <small>MULTI-ROLE ORDER DISPATCH</small>
              <b>Order #QC-904 <span>(3 items)</span></b>
            </div>
            <button
              type="button"
              className="quickly-cycle-btn"
              onClick={(e) => {
                e.preventDefault();
                advanceOrderStage();
              }}
              title="Advance order lifecycle state machine"
            >
              <Truck size={11} />
              <span>Advance Lifecycle</span>
            </button>
          </div>

          {/* State Machine Stepper */}
          <div className="quickly-stepper">
            {stages.map((st) => (
              <div
                key={st.num}
                className={`quickly-step ${orderStage >= st.num ? "is-active" : ""}`}
              >
                <span className="quickly-step-icon">
                  {orderStage >= st.num ? <Check size={9} /> : st.num}
                </span>
                <span className="quickly-step-text">
                  <b>{st.label}</b>
                  <small>{st.role}</small>
                </span>
              </div>
            ))}
          </div>

          {/* Metrics Footer */}
          <div className="quickly-metrics-grid">
            <div>
              <small>MERCHANT STATUS</small>
              <b>12 Local Stores</b>
              <span className="text-green">Verified ledger</span>
            </div>
            <div>
              <small>RIDER ROUTING</small>
              <b>1.4 km radius</b>
              <span className="text-blue">Last-mile GPS</span>
            </div>
            <div>
              <small>TRANSACTIONS</small>
              <b>Idempotent</b>
              <span className="text-green">No double-claims</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
