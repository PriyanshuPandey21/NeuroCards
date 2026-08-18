"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Upload,
  BarChart3,
  Sparkles,
  ArrowRight,
  FileText,
  BrainCircuit,
  GraduationCap,
  CheckCircle2,
  ChevronDown,
  Layers,
  Target,
  Clock,
  Flame,
  BookOpen,
  RefreshCw,
  Star,
  Download,
  Play,
  Check,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Animation Variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

// Sample Demo Cards for Interactive Hero Simulator
const HERO_SAMPLE_CARDS = [
  {
    topic: "Neuroscience",
    badge: "Synaptic Plasticity",
    question: "What is Synaptic Plasticity and why is it crucial for learning?",
    answer: "Synaptic plasticity is the ability of synapses to strengthen or weaken over time in response to changes in activity. It forms the biological foundation of active recall and long-term memory formation.",
    page: "Page 14 • Principles of Neural Science",
    retention: "+24%",
  },
  {
    topic: "Computer Science",
    badge: "Algorithms",
    question: "How does the SM-2 Spaced Repetition Algorithm calculate review intervals?",
    answer: "SM-2 calculates optimal review intervals using an Ease Factor (EF), repeating successful cards at exponentially increasing intervals (e.g. 1d → 6d → EF×interval) to lock knowledge into long-term memory.",
    page: "Page 82 • Learning Algorithms",
    retention: "+31%",
  },
  {
    topic: "Pharmacology",
    badge: "Receptor Dynamics",
    question: "Differentiate between Agonist and Competitive Antagonist drugs.",
    answer: "Agonists bind to and activate receptors to produce a biological response. Competitive antagonists bind to the same active site without activating it, blocking agonists from binding.",
    page: "Page 45 • Pharmacology Essentials",
    retention: "+19%",
  },
];

// Interactive FAQ Data
const FAQS = [
  {
    question: "How does AI flashcard generation work in NeuroCards?",
    answer: "When you upload a PDF or document, NeuroCards uses advanced Large Language Models (Gemini & OpenAI) to analyze the semantic structure of your material. It automatically identifies key definitions, core concepts, relationships, and formulas, turning them into high-yield Question & Answer flashcard pairs instantly.",
  },
  {
    question: "What is Spaced Repetition (SM-2) and how does it help me?",
    answer: "Spaced Repetition is a scientifically proven study method that schedules reviews right before you are predicted to forget a card. NeuroCards implements the SM-2 algorithm, adjusting review dates based on your rating (Hard, Good, Easy) so you stop wasting time studying what you already know.",
  },
  {
    question: "Can I source-link flashcards directly back to my original PDF?",
    answer: "Yes! Every AI-generated flashcard is automatically tagged with the exact page number and text snippet from your uploaded PDF. Clicking the source link in the study deck opens the original PDF right at the exact line.",
  },
  {
    question: "Is there a quick way to test NeuroCards without creating an account?",
    answer: "Absolutely! We provide pre-filled demo login credentials on the sign-in page. Simply click 'Sign In' to jump directly into the full dashboard, upload documents, and test all features instantly.",
  },
  {
    question: "Can I export my flashcards for offline study or Anki?",
    answer: "Yes, NeuroCards lets you export your decks into PDF cheat sheets, JSON backups, and Anki-compatible files so you can study anywhere, anytime.",
  },
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHeroCardIdx, setActiveHeroCardIdx] = useState(0);
  const [isHeroFlipped, setIsHeroFlipped] = useState(false);
  const [heroCardScore, setHeroCardScore] = useState<{ [key: number]: string }>({});
  const [activeTabShowreel, setActiveTabShowreel] = useState<"study" | "pdf" | "analytics">("study");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentHeroCard = HERO_SAMPLE_CARDS[activeHeroCardIdx];

  const handleScoreCard = (quality: string) => {
    setHeroCardScore((prev) => ({ ...prev, [activeHeroCardIdx]: quality }));
    setIsHeroFlipped(false);
    setTimeout(() => {
      setActiveHeroCardIdx((prev) => (prev + 1) % HERO_SAMPLE_CARDS.length);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-foreground font-sans selection:bg-chart-5 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Mesh Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-chart-1/25 to-chart-5/20 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-chart-2/20 to-chart-3/15 blur-[140px] rounded-full animate-float-slow" />
        <div className="absolute top-96 left-1/3 w-[400px] h-[400px] bg-chart-5/15 blur-[110px] rounded-full animate-float" />
      </div>

      {/* Floating Glass Navbar */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/40 py-2.5 px-6 rounded-2xl"
            : "bg-white/60 backdrop-blur-md border border-slate-200/50 py-3 px-6 rounded-2xl"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-chart-5 via-chart-2 to-chart-1 p-0.5 shadow-md shadow-chart-5/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Zap className="h-5 w-5 text-chart-5 transition-transform group-hover:rotate-12" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-chart-5 bg-clip-text text-transparent">
                  NeuroCards<span className="text-chart-5">.ai</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-chart-5/10 text-chart-5 border border-chart-5/20">
                  v2.0
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Anchors */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#features" className="hover:text-chart-5 transition-colors">
              Features
            </Link>
            <Link href="#simulator" className="hover:text-chart-5 transition-colors flex items-center gap-1">
              Live Demo
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>
            <Link href="#how-it-works" className="hover:text-chart-5 transition-colors">
              How It Works
            </Link>
            <Link href="#showreel" className="hover:text-chart-5 transition-colors">
              Preview
            </Link>
            <Link href="#testimonials" className="hover:text-chart-5 transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="hover:text-chart-5 transition-colors">
              FAQ
            </Link>
          </div>

          {/* Header Action CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-chart-5 px-3 py-2 rounded-lg transition-colors hidden sm:block"
            >
              Sign in
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-chart-5 to-chart-2 hover:from-chart-5/90 hover:to-chart-2/90 text-white rounded-xl shadow-lg shadow-chart-5/25 hover:shadow-chart-5/40 transition-all duration-300 hover:-translate-y-0.5 font-semibold text-sm px-5 h-10 gap-2">
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-24">
          
          {/* Left Column: Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-chart-3 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-chart-5 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Next-Gen AI & Spaced Repetition (SM-2)
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-chart-1" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
              Turn Heavy PDFs & Notes into{" "}
              <span className="bg-gradient-to-r from-chart-5 via-chart-2 to-chart-1 bg-clip-text text-transparent">
                Smart Flashcards
              </span>{" "}
              in Seconds.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              NeuroCards automatically extracts key concepts, definitions, and formulas from your study documents. Master any subject with AI active recall and retention algorithms.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-gradient-to-r from-chart-5 via-chart-5 to-chart-2 hover:from-chart-5/95 hover:to-chart-2/95 text-white font-bold rounded-2xl shadow-xl shadow-chart-5/30 text-base px-8 h-14 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-chart-5/40 gap-3"
                >
                  <Zap className="w-5 h-5" />
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <a href="#simulator" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto bg-white/80 hover:bg-white border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm text-base px-7 h-14 transition-all hover:border-slate-300 gap-2.5 backdrop-blur-md"
                >
                  <Play className="w-4 h-4 text-chart-5 fill-chart-5/20" />
                  <span>Try Live Simulator</span>
                </Button>
              </a>
            </div>

            {/* Live Trust Metrics Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-slate-900 tracking-tight">10k+</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-chart-5" /> Cards Created
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-slate-900 tracking-tight">99.4%</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <BrainCircuit className="w-3.5 h-3.5 text-chart-2" /> Recall Rate
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-slate-900 tracking-tight">4.9/5</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Student Rating
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-black text-slate-900 tracking-tight">3x</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" /> Faster Study
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Interactive Flashcard Simulator */}
          <motion.div
            id="simulator"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Card Outer Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xl shadow-slate-300/40 backdrop-blur-xl relative overflow-hidden group">
              
              {/* Header inside simulator */}
              <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">
                    Interactive Simulator
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  SM-2 Active
                </span>
              </div>

              {/* Topic Selector Pills */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
                {HERO_SAMPLE_CARDS.map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveHeroCardIdx(idx);
                      setIsHeroFlipped(false);
                    }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                      activeHeroCardIdx === idx
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {card.topic}
                  </button>
                ))}
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={() => setIsHeroFlipped(!isHeroFlipped)}
                className="w-full min-h-[220px] cursor-pointer rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-white shadow-xl relative border border-slate-700/60 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
              >
                {/* Top card bar */}
                <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-chart-1 border border-slate-700">
                    {currentHeroCard.badge}
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-chart-1 animate-spin" style={{ animationDuration: '8s' }} />
                    {isHeroFlipped ? "Answer View" : "Click to Flip"}
                  </span>
                </div>

                {/* Card Content (Front / Back) */}
                <div className="my-4">
                  <AnimatePresence mode="wait">
                    {!isHeroFlipped ? (
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <span className="text-[11px] font-bold text-chart-1 uppercase tracking-wider">
                          QUESTION
                        </span>
                        <p className="text-base sm:text-lg font-bold text-white leading-snug">
                          {currentHeroCard.question}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                          ANSWER
                        </span>
                        <p className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed">
                          {currentHeroCard.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom card footer */}
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <FileText className="w-3.5 h-3.5 text-chart-5" />
                    {currentHeroCard.page}
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Retention {currentHeroCard.retention}
                  </span>
                </div>
              </div>

              {/* Action Buttons for Rating Answer */}
              <div className="mt-5 space-y-3">
                <div className="text-xs font-semibold text-slate-500 text-center flex items-center justify-center gap-1">
                  <span>How well did you recall this card?</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleScoreCard("Hard")}
                    className="py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200/80 font-bold text-xs transition-all flex flex-col items-center gap-0.5 hover:-translate-y-0.5 shadow-sm"
                  >
                    <span>Hard</span>
                    <span className="text-[10px] text-red-500 font-normal">Review 1d</span>
                  </button>

                  <button
                    onClick={() => handleScoreCard("Good")}
                    className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 font-bold text-xs transition-all flex flex-col items-center gap-0.5 hover:-translate-y-0.5 shadow-sm"
                  >
                    <span>Good</span>
                    <span className="text-[10px] text-blue-500 font-normal">Review 3d</span>
                  </button>

                  <button
                    onClick={() => handleScoreCard("Easy")}
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 font-bold text-xs transition-all flex flex-col items-center gap-0.5 hover:-translate-y-0.5 shadow-sm"
                  >
                    <span>Easy</span>
                    <span className="text-[10px] text-emerald-600 font-normal">Review 7d</span>
                  </button>
                </div>

                {heroCardScore[activeHeroCardIdx] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Recorded: Rated &apos;{heroCardScore[activeHeroCardIdx]}&apos;
                    </span>
                    <span className="text-[11px] text-chart-1 font-bold">Next review scheduled</span>
                  </motion.div>
                )}
              </div>

            </div>
          </motion.div>
        </div>

        {/* University & Technology Marquee Banner */}
        <div className="py-10 border-y border-slate-200/80 my-16 bg-white/50 backdrop-blur-sm rounded-3xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Empowering students at top universities & research labs worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold font-serif text-slate-800">
              <GraduationCap className="h-7 w-7 text-chart-5" /> Stanford University
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-sans text-slate-800">
              <Sparkles className="h-6 w-6 text-chart-2" /> OpenAI Lab
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-mono tracking-tighter text-slate-800">
              <BarChart3 className="h-7 w-7 text-chart-1" /> M.I.T.
            </div>
            <div className="flex items-center gap-2 text-xl font-extrabold text-slate-800">
              <BrainCircuit className="h-7 w-7 text-chart-3" /> Harvard Med
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-serif italic text-slate-800">
              <BookOpen className="h-7 w-7 text-chart-5" /> Cambridge
            </div>
          </div>
        </div>

        {/* Section: Ultra Bento Grid Features */}
        <section id="features" className="py-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-chart-5 bg-chart-5/10 px-3 py-1 rounded-full inline-block">
              Supercharged Study Suite
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Everything you need to master complex subjects without burnout.
            </h3>
            <p className="text-slate-600 text-lg">
              Designed specifically for students who want maximum retention with minimal manual effort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento 1: PDF Annotation & Source Linking (Large Card 2 cols) */}
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="whileInView"
              className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-chart-1/20 to-chart-5/15 rounded-full blur-3xl -z-0 pointer-events-none group-hover:scale-125 transition-transform" />
              
              <div className="relative z-10 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-chart-1/10 border border-chart-1/20 text-chart-1 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  PDF Annotation & Direct Source Linking
                </h4>
                <p className="text-slate-600 leading-relaxed max-w-lg">
                  Every generated card connects directly to your source PDF. Click any card tag to instantly jump to the exact page, line, and highlight in your original material.
                </p>
              </div>

              {/* Visual Mockup inside Card 1 */}
              <div className="relative z-10 bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <FileText className="w-4 h-4 text-chart-1" />
                    <span>Neurobiology_Lecture_04.pdf</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-chart-1/20 text-chart-1 border border-chart-1/30">
                    Page 14 Synced
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <p className="bg-slate-800/60 p-2.5 rounded-lg border-l-4 border-chart-1">
                    &quot;Long-Term Potentiation (LTP) is a persistent strengthening of synapses based on recent patterns of activity...&quot;
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="text-emerald-400 font-medium">✨ Auto-linked to Flashcard #04</span>
                    <span className="text-chart-1 cursor-pointer hover:underline">View Source &rarr;</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 2: SM-2 Spaced Repetition */}
            <motion.div
              variants={fadeRight}
              initial="initial"
              whileInView="whileInView"
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-chart-2/15 rounded-full blur-2xl -z-0 pointer-events-none group-hover:scale-125 transition-transform" />

              <div className="relative z-10 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-chart-2/10 border border-chart-2/20 text-chart-2 flex items-center justify-center mb-6">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  SM-2 Algorithm
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Stop over-studying. Our algorithm calculates exact memory decay curves and schedules card reviews right before you forget.
                </p>
              </div>

              {/* Graph Visual Mockup */}
              <div className="relative z-10 bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
                  <span>Retention Curve</span>
                  <span className="text-chart-2">+85% Efficiency</span>
                </div>
                <div className="h-24 w-full flex items-end justify-between gap-2 pt-2 px-1">
                  {[40, 65, 80, 95, 99].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-chart-2 to-chart-5 rounded-t-lg transition-all duration-500 hover:brightness-110"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] font-bold text-slate-500">D{i * 3 + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bento 3: AI Instant Deck Generator */}
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="whileInView"
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="relative z-10 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-chart-3/10 border border-chart-3/20 text-chart-3 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  AI Instant Builder
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Paste notes or topic prompts. AI transforms dense text into clear, high-yield Q&A decks in under 5 seconds.
                </p>
              </div>

              <div className="relative z-10 bg-slate-950 rounded-2xl p-4 text-white text-xs border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-chart-3 font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" /> Prompting Gemini 2.0...
                </div>
                <p className="text-slate-300 italic font-mono text-[11px]">
                  &quot;Generate 15 pharmacology cards from Chapter 3...&quot;
                </p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-chart-3 to-chart-5 w-4/5 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Bento 4: Multi-Format Export */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="relative z-10 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mb-6">
                  <Download className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  Multi-Format Export
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Export your decks seamlessly into Anki packages, printable PDF study guides, or raw JSON data.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-red-500" /> Printable PDF
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-500" /> Anki (.apkg)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> JSON Backup
                </span>
              </div>
            </motion.div>

            {/* Bento 5: Real-Time Performance Analytics */}
            <motion.div
              variants={fadeRight}
              initial="initial"
              whileInView="whileInView"
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="relative z-10 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-6">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                  Mastery Analytics
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Track your study streaks, accuracy percentages, and master deck milestones with visual dashboards.
                </p>
              </div>

              <div className="relative z-10 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
                    <Flame className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">14-Day Streak</span>
                    <span className="text-[11px] text-slate-500">Top 5% Student</span>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700">
                  94.2% Accuracy
                </span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Section: How It Works 3-Step Pipeline */}
        <section id="how-it-works" className="py-20 my-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-chart-2 bg-chart-2/10 px-3 py-1 rounded-full inline-block">
              Simple 3-Step Workflow
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              From Raw Document to Exam Mastery in Minutes.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                icon: Upload,
                color: "from-chart-1 to-chart-5",
                title: "Upload Document",
                desc: "Drag & drop any PDF textbook, lecture slides, or lecture notes into NeuroCards.",
              },
              {
                step: "02",
                icon: Sparkles,
                color: "from-chart-5 to-chart-2",
                title: "AI Deck Generation",
                desc: "Our neural engine scans your material, extracting formulas, entities, and definition pairs.",
              },
              {
                step: "03",
                icon: Target,
                color: "from-chart-2 to-chart-3",
                title: "Active Recall Study",
                desc: "Study cards with spaced repetition. High retention rate locked in with zero wasted effort.",
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="initial"
                  whileInView="whileInView"
                  transition={{ delay: idx * 0.15 }}
                  className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-4xl font-black text-slate-200 font-mono">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Section: Live App Interactive Showreel Preview */}
        <section id="showreel" className="py-16 my-12">
          <div className="bg-slate-950 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-chart-1 px-3 py-1 rounded-full bg-chart-1/10 border border-chart-1/20 inline-block">
                Experience NeuroCards
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Designed for Focus, Built for Speed.
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                Take a look inside the actual interface. Everything is tuned for fast flashcard navigation and seamless PDF reference.
              </p>
            </div>

            {/* Showreel Tabs */}
            <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto pb-2">
              {[
                { id: "study", label: "Study Deck View", icon: Layers },
                { id: "pdf", label: "Split PDF Reader", icon: FileText },
                { id: "analytics", label: "Mastery Analytics", icon: BarChart3 },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabShowreel(tab.id as any)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      activeTabShowreel === tab.id
                        ? "bg-gradient-to-r from-chart-5 to-chart-2 text-white shadow-lg shadow-chart-5/30"
                        : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Showreel Screen Visual */}
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl relative overflow-hidden min-h-[360px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeTabShowreel === "study" && (
                  <motion.div
                    key="tab-study"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 max-w-2xl mx-auto w-full"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-chart-5 text-white flex items-center justify-center font-bold text-xs">
                          NC
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-white">Pathology & Histology Deck</h5>
                          <span className="text-xs text-slate-400">Card 14 of 42 • Spaced Session</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        88% Mastery
                      </span>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                      <span className="text-[11px] font-bold text-chart-1 uppercase tracking-wider block">
                        FRONT CARD
                      </span>
                      <p className="text-lg font-bold text-white">
                        What structural modification increases the surface area for absorption in the small intestine?
                      </p>
                      <div className="pt-4 flex justify-center gap-3">
                        <Button size="sm" className="bg-chart-5 text-white rounded-lg text-xs">
                          Flip Card (Spacebar)
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTabShowreel === "pdf" && (
                  <motion.div
                    key="tab-pdf"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full"
                  >
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-chart-1 font-bold">
                        <FileText className="w-4 h-4" /> PDF Document Reader
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <p className="bg-chart-5/20 border-l-2 border-chart-5 p-2 rounded text-slate-200">
                          Highlighted: &quot;Microvilli and villi increase absorption surface area by over 600-fold...&quot;
                        </p>
                        <p className="text-slate-500 text-[11px]">Chapter 4: Human Physiology (Page 112)</p>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                        <Sparkles className="w-4 h-4" /> Auto-Generated Flashcard
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                        <p className="font-bold text-white">Q: By how much do villi/microvilli expand intestinal surface area?</p>
                        <p className="text-slate-300">A: By over 600-fold.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTabShowreel === "analytics" && (
                  <motion.div
                    key="tab-analytics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full"
                  >
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center space-y-2">
                      <span className="text-xs text-slate-400 font-semibold block">Total Cards Mastered</span>
                      <span className="text-3xl font-black text-chart-1">1,420</span>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center space-y-2">
                      <span className="text-xs text-slate-400 font-semibold block">Current Study Streak</span>
                      <span className="text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
                        <Flame className="w-6 h-6 fill-amber-400" /> 18 Days
                      </span>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center space-y-2">
                      <span className="text-xs text-slate-400 font-semibold block">Average Recall Rate</span>
                      <span className="text-3xl font-black text-emerald-400">96.8%</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section: Testimonials & Social Proof */}
        <section id="testimonials" className="py-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-chart-3 bg-chart-3/10 px-3 py-1 rounded-full inline-block">
              Student Success Stories
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by Thousands of High Performers.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "James L.",
                role: "Medical Student (M3)",
                comment: "NeuroCards completely changed my Pathology prep. Uploading 200-page slide decks and getting perfectly formatted flashcards saved me literally 15 hours a week.",
                rating: 5,
                tag: "Med School",
              },
              {
                name: "Danny G.",
                role: "CS & Systems Undergrad",
                comment: "The SM-2 algorithm paired with PDF source linking is insane. I can click any card and verify the textbook definition in 1 second flat.",
                rating: 5,
                tag: "Computer Science",
              },
              {
                name: "Savannah F.",
                role: "Biochemistry Major",
                comment: "Studying used to feel overwhelming. NeuroCards makes active recall feel like a video game. I hit a 98% on my midterm using this!",
                rating: 5,
                tag: "Bio Chemistry",
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    &quot;{t.comment}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-chart-5 to-chart-2 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{t.name}</h5>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section: Interactive FAQ Accordion */}
        <section id="faq" className="py-16 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-chart-5 bg-chart-5/10 px-3 py-1 rounded-full inline-block">
              Frequently Asked Questions
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Have Questions? We&apos;ve Got Answers.
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:text-chart-5 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      expandedFaq === idx ? "rotate-180 text-chart-5" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100/80 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Section: High-Impact Call to Action Banner */}
        <section className="py-12 my-12">
          <div className="bg-gradient-to-r from-slate-900 via-chart-5 to-slate-950 rounded-[2.5rem] p-10 sm:p-16 text-white text-center relative overflow-hidden shadow-2xl border border-slate-800">
            
            <div className="absolute top-0 right-0 w-96 h-96 bg-chart-1/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-chart-1 backdrop-blur-md">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                No credit card required • Demo credentials pre-filled
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Ready to transform how you study forever?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-normal">
                Join thousands of students mastering their exams with zero stress. Sign in now to test NeuroCards with sample decks instantly.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100 font-extrabold rounded-2xl shadow-xl text-base px-9 h-14 transition-all hover:scale-105 gap-2"
                  >
                    <span>Launch NeuroCards App</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Modern Multi-Column Footer */}
      <footer className="border-t border-slate-200/80 bg-white pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
            
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-chart-5 to-chart-2 p-0.5 shadow-md">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                    <Zap className="h-4 h-4 text-chart-5" />
                  </div>
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  NeuroCards<span className="text-chart-5">.ai</span>
                </span>
              </Link>

              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                An intelligent flashcard learning platform combining AI document parsing with SM-2 spaced repetition for optimal student recall.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  All Systems Operational
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                PLATFORM
              </h5>
              <ul className="space-y-3 text-sm font-semibold text-slate-600">
                <li>
                  <Link href="#features" className="hover:text-chart-5 transition-colors">
                    Features Overview
                  </Link>
                </li>
                <li>
                  <Link href="#simulator" className="hover:text-chart-5 transition-colors">
                    Interactive Simulator
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-chart-5 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#showreel" className="hover:text-chart-5 transition-colors">
                    App Showreel
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                APPLICATION
              </h5>
              <ul className="space-y-3 text-sm font-semibold text-slate-600">
                <li>
                  <Link href="/login" className="hover:text-chart-5 transition-colors">
                    Sign In / App Launch
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-chart-5 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/upload" className="hover:text-chart-5 transition-colors">
                    Upload PDF
                  </Link>
                </li>
                <li>
                  <Link href="/decks" className="hover:text-chart-5 transition-colors">
                    My Decks
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                PROJECT LINKS
              </h5>
              <ul className="space-y-3 text-sm font-semibold text-slate-600">
                <li>
                  <a
                    href="https://github.com/PriyanshuPandey21/NeuroCards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-chart-5 transition-colors flex items-center gap-1.5"
                  >
                    GitHub Repository <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/PriyanshuPandey21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-chart-5 transition-colors flex items-center gap-1.5"
                  >
                    Developer Profile <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-4">
            <span>© {new Date().getFullYear()} NeuroCards.ai. All rights reserved.</span>
            <span className="text-slate-400">
              Crafted with Next.js, Framer Motion, and Tailwind CSS.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
