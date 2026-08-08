"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layout,
  Terminal,
  Lock,
  BarChart,
  Zap,
  Layers,
  Code2,
  Users,
  GraduationCap,
  Briefcase,
  Rocket,
  //   Github
} from "lucide-react";
import GithubIcon from "./_utils/GithubIcon";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0916] text-slate-300 font-sans selection:bg-purple-500/30">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            DevMatrix v1.0 is live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Build. Manage. Scale. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              All in One Place.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            DevMatrix is your all-in-one platform for managing projects, code,
            teams, and workflows — designed specifically for modern developers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="flex items-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold transition-all hover:bg-slate-200 hover:scale-105 active:scale-95"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="#features"
              className="flex items-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              Explore Features
            </Link>
          </div>

          {/* Code Editor Mockup */}
          <div className="mt-20 relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#131221] shadow-2xl shadow-purple-900/20 overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-black/40">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-slate-500">
                devmatrix-workspace.ts
              </div>
            </div>
            <div className="p-6 text-left font-mono text-sm md:text-base overflow-x-auto">
              <pre className="text-slate-300">
                <span className="text-purple-400">import</span> {"{ Matrix }"}{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'@devmatrix/core'</span>;<br />
                <br />
                <span className="text-blue-400">const</span> workspace ={" "}
                <span className="text-purple-400">new</span>{" "}
                <span className="text-yellow-300">Matrix</span>({"{"}
                <br />
                {"  "}name:{" "}
                <span className="text-green-400">'Next-Gen-App&apos;</span>,
                <br />
                {"  "}framework:{" "}
                <span className="text-green-400">'Next.js'</span>,<br />
                {"  "}teamSize: <span className="text-orange-400">5</span>,
                <br />
                {"  "}autoScale: <span className="text-blue-400">true</span>
                <br />
                {"}"});
                <br />
                <br />
                workspace.<span className="text-yellow-300">deploy</span>().
                <span className="text-yellow-300">then</span>((){" "}
                <span className="text-purple-400">{"=>"}</span> {"{"}
                <br />
                {"  "}console.<span className="text-yellow-300">log</span>(
                <span className="text-green-400">
                  '🚀 Project is live on DevMatrix!'
                </span>
                );
                <br />
                {"}"});
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Features Section */}
      <section
        id="features"
        className="py-24 border-t border-white/5 bg-[#0d0c1b]"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core Modules
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Everything you need to orchestrate your entire development
              lifecycle from a single dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Layout,
                title: "Project Management",
                desc: "Manage projects, tasks, and workflows efficiently with agile boards.",
              },
              {
                icon: Terminal,
                title: "Code Workspace",
                desc: "Integrated coding environment with native version control support.",
              },
              {
                icon: Lock,
                title: "Auth & User System",
                desc: "Secure, drop-in authentication and user management built-in.",
              },
              {
                icon: BarChart,
                title: "Analytics Dashboard",
                desc: "Track performance, team activity, and deployment progress in real-time.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-transform">
                  <feature.icon className="text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {[
              {
                step: "01",
                title: "Create your workspace",
                desc: "Set up your environment in seconds with smart defaults.",
              },
              {
                step: "02",
                title: "Build and manage",
                desc: "Write code, track issues, and manage tasks simultaneously.",
              },
              {
                step: "03",
                title: "Collaborate and scale",
                desc: "Invite your team, deploy instantly, and monitor growth.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex-1 text-center relative z-10 w-full"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#131221] border border-white/10 flex items-center justify-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500 mb-6 shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Developer Experience Section */}
      <section className="py-24 border-y border-white/5 bg-[#0d0c1b] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Designed for the ultimate Developer Experience
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                We stripped away the complexity so you can focus on what
                matters: writing great code and shipping products.
              </p>

              <ul className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Fast performance",
                    desc: "Optimized for speed. No loading spinners, just instant feedback.",
                  },
                  {
                    icon: Layout,
                    title: "Clean UI / Dark mode first",
                    desc: "A gorgeous, distraction-free interface built for night owls.",
                  },
                  {
                    icon: Layers,
                    title: "Modular system",
                    desc: "Use only what you need. Every app is connected but decoupled.",
                  },
                  {
                    icon: Rocket,
                    title: "Scalable architecture",
                    desc: "From side projects to enterprise, DevMatrix scales with you.",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-purple-400" size={16} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
              {/* Terminal Visual */}
              <div className="rounded-xl border border-white/10 bg-black p-6 font-mono text-sm shadow-2xl relative z-10">
                <div className="flex gap-2 mb-4 pb-4 border-b border-white/10">
                  <Terminal size={16} className="text-slate-500" />
                  <span className="text-slate-500">Terminal</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-purple-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">
                      npx create-devmatrix-app my-project
                    </span>
                  </div>
                  <div className="text-slate-400">
                    Creating a new DevMatrix app in /my-project.
                  </div>
                  <div className="text-slate-400">
                    Installing dependencies...
                  </div>
                  <div className="text-green-400">
                    ✓ Success! Created my-project.
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="text-purple-400">➜</span>
                    <span className="text-blue-400">my-project</span>
                    <span className="text-white">npm run dev</span>
                  </div>
                  <div className="text-slate-400">
                    ready - started server on 0.0.0.0:3000, url:
                    http://localhost:3000
                  </div>
                  <div className="text-blue-400 animate-pulse">_</div>
                </div>
              </div>

              {/* Decorative elements behind terminal */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Use Cases */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Who is DevMatrix for?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code2,
                title: "Indie Developers",
                desc: "Ship side projects faster without juggling 10 different tools.",
              },
              {
                icon: Rocket,
                title: "Startups",
                desc: "Move fast and break things, but keep your workflow organized.",
              },
              {
                icon: Users,
                title: "Teams",
                desc: "Collaborate seamlessly with unified access and permissions.",
              },
              {
                icon: GraduationCap,
                title: "Students",
                desc: "Learn modern dev workflows with industry-standard practices.",
              },
            ].map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <useCase.icon className="text-slate-300" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-slate-400">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to scale your workflow?
          </h2>
          <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto">
            Start building your next project with DevMatrix today. Join the
            ecosystem designed for builders.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
            >
              Create Account
            </Link>
            <Link
              href="#"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              View Docs
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-white/10 bg-[#06050b] py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">
              DevMatrix
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <GithubIcon width={30} height={30} className="text-black" />{" "}
              GitHub
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 text-center md:text-left text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} DevMatrix Ecosystem. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
