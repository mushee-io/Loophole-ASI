"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Cpu,
  Layers3,
  Sparkles,
  FileText,
  BarChart3,
  Play,
  ChevronRight,
  Cloud,
  Activity,
  Network,
  KanbanSquare,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function MusheeDemo() {
  const promptPresets = [
    "Analyze decentralized GPU inference for AI-native startups",
    "Create a short investor brief for Mushee",
    "Compare centralized AI APIs with decentralized inference infrastructure",
    "Summarize why multi-agent AI matters for enterprise workflows",
  ];

  const baseStages = [
    {
      key: "planner",
      title: "Planner Agent",
      icon: Layers3,
      desc: "Breaks the task into a clean execution plan.",
      output: "Defined task goal, structure, and execution path.",
    },
    {
      key: "research",
      title: "Research Agent",
      icon: FileText,
      desc: "Extracts context, angles, and supporting signals.",
      output: "Mapped infrastructure trends, startup need, and market timing.",
    },
    {
      key: "analyst",
      title: "Analyst Agent",
      icon: BarChart3,
      desc: "Turns context into a decision-ready viewpoint.",
      output: "Framed upside, tradeoffs, and ecosystem impact clearly.",
    },
    {
      key: "writer",
      title: "Writer Agent",
      icon: Sparkles,
      desc: "Produces the final polished output.",
      output: "Returned concise, investor-friendly final answer.",
    },
  ];

  const baseTasks = [
    {
      id: "task-1",
      title: "Define objective",
      owner: "Planner Agent",
      detail: "Clarify the exact goal, desired output and constraints.",
    },
    {
      id: "task-2",
      title: "Gather supporting context",
      owner: "Research Agent",
      detail: "Collect market, product and infrastructure context for the run.",
    },
    {
      id: "task-3",
      title: "Structure decision layer",
      owner: "Analyst Agent",
      detail: "Turn context into insights, tradeoffs and recommended framing.",
    },
    {
      id: "task-4",
      title: "Generate final response",
      owner: "Writer Agent",
      detail: "Produce a concise polished output ready for presentation.",
    },
  ];

  const demoRuns = [
    {
      id: "run-1",
      title: "Analyze decentralized GPU inference for AI-native startups",
      createdAt: "Today · 10:24",
      status: "Completed",
      output:
        "Decentralized GPU inference gives startups elastic access to compute, lowers concentration risk, and opens a new distribution layer for AI-native products.",
    },
    {
      id: "run-2",
      title: "Generate investor-ready brief for Mushee",
      createdAt: "Today · 09:51",
      status: "Completed",
      output:
        "Mushee is a multi-agent AI orchestration layer designed to route tasks across specialized agents on decentralized inference infrastructure.",
    },
  ];

  const [page, setPage] = useState("home");
  const [walletConnected, setWalletConnected] = useState(false);
  const [credits, setCredits] = useState(120);
  const [prompt, setPrompt] = useState(promptPresets[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedRun, setSelectedRun] = useState(demoRuns[0]);
  const [stageIndex, setStageIndex] = useState(4);

  const currentStages = useMemo(() => {
    return baseStages.map((stage, idx) => ({
      ...stage,
      status: isRunning ? (idx < stageIndex ? "done" : idx === stageIndex ? "running" : "idle") : "done",
    }));
  }, [isRunning, stageIndex]);

  const currentTasks = useMemo(() => {
    return baseTasks.map((task, idx) => ({
      ...task,
      status: isRunning ? (idx < stageIndex ? "done" : idx === stageIndex ? "running" : "queued") : "done",
    }));
  }, [isRunning, stageIndex]);

  function runDemo(nextPrompt?: string) {
    const chosenPrompt = nextPrompt || prompt;
    setPrompt(chosenPrompt);
    setPage("run");
    setSelectedRun({
      id: `demo-${Date.now()}`,
      title: chosenPrompt,
      createdAt: "Live demo · now",
      status: "Running",
      output:
        "Mushee coordinates specialized AI agents across a visible workflow, turning a single prompt into an execution plan, research layer, analytical layer and final polished output.",
    });
    setIsRunning(true);
    setStageIndex(0);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      if (i >= 4) {
        clearInterval(timer);
        setStageIndex(4);
        setIsRunning(false);
        setSelectedRun((prev) => ({ ...prev, status: "Completed" }));
        setCredits((c) => Math.max(0, c - 5));
      } else {
        setStageIndex(i);
      }
    }, 900);
  }

  function Nav() {
    return (
      <div className="sticky top-0 z-30 px-4 pt-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[30px] border border-red-200/80 bg-black px-5 py-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <button onClick={() => setPage("home")} className="text-left">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Mushee</div>
          </button>
          <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <button onClick={() => setPage("home")} className="hover:text-red-300">Home</button>
            <button onClick={() => setPage("dashboard")} className="hover:text-red-300">Dashboard</button>
            <button onClick={() => setPage("run")} className="hover:text-red-300">Live Run</button>
            <button onClick={() => setPage("deck")} className="hover:text-red-300">Pitch Deck</button>
          </div>
          <button
            onClick={() => setWalletConnected((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-red-200/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-100 transition hover:-translate-y-0.5"
          >
            <Wallet className="h-4 w-4" />
            {walletConnected ? "Testnet wallet connected" : "Connect testnet wallet"}
          </button>
        </div>
      </div>
    );
  }

  function Shell({ children }: { children: React.ReactNode }) {
    return <div className="mx-auto w-full max-w-7xl px-4 md:px-8">{children}</div>;
  }

  function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={`rounded-[30px] border border-red-200/80 bg-white p-6 shadow-[0_18px_60px_rgba(239,68,68,0.08)] transition duration-300 hover:-translate-y-1 ${className}`}>
        {children}
      </div>
    );
  }

  function StatusPill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "red" | "soft" }) {
    const cls =
      tone === "red"
        ? "bg-red-600 text-white"
        : tone === "soft"
          ? "border border-red-200 bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-600";
    return <span className={`rounded-full px-3 py-1 text-xs font-medium ${cls}`}>{children}</span>;
  }

  function CrewBoard() {
    return (
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Crew board</div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Visible task delegation</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <KanbanSquare className="h-4 w-4" /> Crew mode
          </div>
        </div>
        <div className="mt-6 grid gap-3">
          {currentTasks.map((task) => (
            <div key={task.id} className="rounded-[22px] border border-red-200/70 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{task.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{task.detail}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">{task.owner}</span>
                  <StatusPill tone={task.status === "done" ? "red" : task.status === "running" ? "soft" : "default"}>
                    {task.status}
                  </StatusPill>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  function HomePage() {
    return (
      <Shell>
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pt-8 md:pt-10">
          <Card className="overflow-hidden px-6 py-10 md:px-12 md:py-16">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-5 inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
                Multi-agent AI demo for ASI:Cloud
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-7xl md:leading-[1.02]">
                Mushee turns one prompt into a coordinated AI crew.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                A black and red product demo that shows how specialized agents plan, research, analyze and write through one visible execution flow.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                <Cloud className="h-4 w-4" /> Built as the product layer for decentralized inference
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={() => setPage("dashboard")} className="rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-red-700">
                  View dashboard
                </button>
                <button onClick={() => runDemo(prompt)} className="rounded-full border border-red-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5">
                  Run live demo
                </button>
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-4xl rounded-[26px] border border-red-200 bg-white p-3 shadow-[0_12px_36px_rgba(239,68,68,0.08)] md:p-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-14 flex-1 rounded-[18px] border border-red-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none"
                />
                <button onClick={() => runDemo(prompt)} className="inline-flex h-14 items-center justify-center gap-2 rounded-[18px] bg-red-600 px-6 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-red-700">
                  <Play className="h-4 w-4" /> Run with agents
                </button>
              </div>
            </div>
          </Card>
        </motion.section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Submit one task", "A single prompt starts the full multi-agent workflow."],
            ["02", "Crew delegates work", "Each agent owns a clear task and hands off to the next step."],
            ["03", "Show execution clearly", "The product makes orchestration visible for demos, teams and developers."],
          ].map(([n, title, text]) => (
            <Card key={n}>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{n}</div>
              <div className="mt-4 text-xl font-semibold text-slate-900">{title}</div>
              <div className="mt-3 text-sm leading-6 text-slate-600">{text}</div>
            </Card>
          ))}
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Agent pipeline</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">One task. Four visible agents.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {baseStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.key} className="rounded-[24px] border border-red-200 bg-slate-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex rounded-2xl border border-red-200 bg-red-50 p-3 text-red-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-4 text-lg font-semibold text-slate-900">{stage.title}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{stage.desc}</div>
                      </div>
                      <StatusPill tone="red">Ready</StatusPill>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <CrewBoard />
        </section>

        <section className="mt-8 pb-8">
          <Card className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Infrastructure layer</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Built to showcase real AI-native workload demand for decentralized inference.
              </h3>
            </div>
            <div className="grid gap-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4">Crew-based agent execution</div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4">Task delegation and handoff visibility</div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4">Developer-facing product layer</div>
            </div>
          </Card>
        </section>
      </Shell>
    );
  }

  function DashboardPage() {
    return (
      <Shell>
        <section className="pt-8">
          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Dashboard</div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">Manage runs, credits and crew outputs.</h1>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[22px] border border-red-200 bg-red-50 p-4">
                  <div className="text-sm text-slate-500">Credits</div>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{credits}</div>
                </div>
                <div className="rounded-[22px] border border-red-200 bg-red-50 p-4">
                  <div className="text-sm text-slate-500">Agents per run</div>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">4</div>
                </div>
                <div className="rounded-[22px] border border-red-200 bg-red-50 p-4">
                  <div className="text-sm text-slate-500">Mode</div>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">Testnet</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="text-sm font-semibold text-slate-900">Run new crew task</div>
              <div className="mt-1 text-sm text-slate-500">Use a prompt below to trigger the live demo pipeline.</div>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={6} className="mt-5 w-full rounded-[22px] border border-red-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none" />
              <button onClick={() => runDemo(prompt)} className="mt-4 rounded-full bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-red-700">
                Run with agents
              </button>
            </Card>
          </div>
        </section>

        <section className="mt-4 pb-8">
          <Card>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Recent runs</div>
                <div className="mt-1 text-sm text-slate-500">Visible task history for the demo environment.</div>
              </div>
            </div>
            <div className="space-y-3">
              {demoRuns.map((run) => (
                <button key={run.id} onClick={() => { setSelectedRun(run); setPage("run"); setIsRunning(false); setStageIndex(4); }} className="block w-full rounded-[22px] border border-red-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-medium text-slate-900">{run.title}</div>
                      <div className="mt-1 text-sm text-slate-500">{run.createdAt}</div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span>4 agents</span>
                      <StatusPill tone="red">{run.status}</StatusPill>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </section>
      </Shell>
    );
  }

  function RunPage() {
    return (
      <Shell>
        <section className="pt-8">
          <Card>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Run details</div>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">{selectedRun.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{selectedRun.createdAt}</span>
              <span>•</span>
              <span>4 agents</span>
              <span>•</span>
              <StatusPill tone={isRunning ? "soft" : "red"}>{isRunning ? "Running" : selectedRun.status}</StatusPill>
            </div>
          </Card>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <Card>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Agent execution</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">Live crew pipeline</div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <Network className="h-4 w-4" /> Visible handoffs
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {currentStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.key} className="rounded-[24px] border border-red-200 bg-slate-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className={`inline-flex rounded-2xl border border-red-200 p-3 ${stage.status === "running" ? "animate-pulse bg-red-100 text-red-700" : "bg-red-50 text-red-700"}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-4 text-lg font-semibold text-slate-900">{stage.title}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{stage.desc}</div>
                      </div>
                      <StatusPill tone={stage.status === "done" ? "red" : stage.status === "running" ? "soft" : "default"}>{stage.status}</StatusPill>
                    </div>
                    <div className="mt-5 text-sm leading-6 text-slate-600">{stage.output}</div>
                  </div>
                );
              })}
            </div>
          </Card>
          <CrewBoard />
        </section>

        <section className="mt-4 pb-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <div className="text-sm font-semibold text-slate-900">Final output</div>
            <div className="mt-4 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">{selectedRun.output}</div>
          </Card>
          <Card>
            <div className="text-sm font-semibold text-slate-900">API preview</div>
            <div className="mt-4 rounded-[22px] bg-black p-4 font-mono text-sm text-red-50">
              <div>POST /api/run</div>
              <div className="mt-3 text-red-100/60">{`{`}</div>
              <div className="pl-4">"prompt": "{selectedRun.title}"</div>
              <div className="text-red-100/60">{`}`}</div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm text-slate-600">
              <Cpu className="h-4 w-4" /> Testnet demo mode
            </div>
          </Card>
        </section>
      </Shell>
    );
  }

  function DeckPage() {
    const slides = [
      ["What it is", "Mushee is a multi-agent AI orchestration demo designed to showcase decentralized inference workflows through a clean product interface."],
      ["What we are building", "A user submits one task, then planner, research, analyst and writer agents coordinate the response in a visible crew pipeline."],
      ["What makes it stronger", "We added visible task delegation and handoff tracking so the execution model is obvious instantly."],
      ["Why it matters", "Most AI apps hide execution. Mushee makes the workflow visible, productized and ready for decentralized inference infrastructure."],
      ["Ecosystem value", "This drives practical demand for compute, gives developers a real product layer, and turns infrastructure into something people can actually use."],
      ["Demo story", "Beautiful landing page, dashboard, live run view, crew board, testnet wallet connection, credits, and API positioning — all in one clean flow."],
    ];
    return (
      <Shell>
        <section className="pt-8 pb-8">
          <Card>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pitch deck notes</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">Presentation-ready structure for today.</h1>
            <div className="mt-8 space-y-4">
              {slides.map(([title, text], i) => (
                <div key={title} className="rounded-[24px] border border-red-200 bg-slate-50 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Slide {i + 1}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </Shell>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.14),transparent_20%),linear-gradient(180deg,#fff8f8_0%,#f8fafc_100%)] text-slate-900">
      <Nav />
      {page === "home" && <HomePage />}
      {page === "dashboard" && <DashboardPage />}
      {page === "run" && <RunPage />}
      {page === "deck" && <DeckPage />}
      <div className="px-4 pb-6 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-red-200 bg-white px-6 py-5 text-sm text-slate-500 shadow-[0_18px_60px_rgba(239,68,68,0.08)]">
          <span>Mushee · Multi-agent AI orchestration for decentralized inference infrastructure.</span>
          <span className="hidden items-center gap-2 text-red-700 md:inline-flex"><Activity className="h-4 w-4" /> Demo ready</span>
        </div>
      </div>
    </div>
  );
}
