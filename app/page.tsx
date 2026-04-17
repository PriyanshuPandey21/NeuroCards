"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Upload,
  BookOpen,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle,
  FileText,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: Upload,
    title: "PDF Upload",
    description: "Drag & drop any PDF — study notes, textbooks, slides — and we'll extract the content instantly.",
  },
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "GPT-4o generates diverse flashcard types: concepts, definitions, true/false, fill-in-the-blank.",
  },
  {
    icon: Sparkles,
    title: "Spaced Repetition",
    description: "SM-2 algorithm schedules reviews so you remember everything with minimal effort.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Dashboard with mastery stats, study streaks, and daily review targets.",
  },
  {
    icon: Layers,
    title: "Deck Management",
    description: "Organize, rename, edit, search, and export your flashcard decks effortlessly.",
  },
  {
    icon: BookOpen,
    title: "Smart Study Mode",
    description: "Beautiful card flip animations, keyboard shortcuts, and difficulty rating for each card.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Your PDF",
    description: "Drop any study material — the AI handles the rest.",
    icon: FileText,
  },
  {
    number: "02",
    title: "AI Generates Cards",
    description: "High-quality flashcards covering every key concept.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Study & Master",
    description: "Flip, rate, and let spaced repetition do the magic.",
    icon: Brain,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">Neuroocards</span>
          </Link>
          <div className="flex items-center gap-3">

            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="gradient" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-chart-1" />
            Powered by GPT-4o AI
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Transform PDFs into
            <br />
            <span className="gradient-text">Smart Flashcards</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Upload any study material and let AI generate high-quality flashcards.
            Master any subject with spaced repetition learning.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                Start Learning Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            variants={fadeUp}
            className="mt-16 relative max-w-4xl mx-auto"
          >
            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-2xl shadow-chart-1/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Simulated flashcard previews */}
                {[
                  { q: "What is photosynthesis?", a: "The process by which plants convert light energy...", d: "easy" },
                  { q: "Define mitochondria", a: "The powerhouse of the cell that generates ATP...", d: "medium" },
                  { q: "Newton's Third Law?", a: "Every action has an equal and opposite reaction.", d: "hard" },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    className="card-hover rounded-xl border border-border bg-card p-5 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                  >
                    <div className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium mb-3 ${card.d === "easy" ? "bg-emerald-500/10 text-emerald-500" :
                        card.d === "medium" ? "bg-amber-500/10 text-amber-500" :
                          "bg-red-500/10 text-red-500"
                      }`}>
                      {card.d}
                    </div>
                    <p className="font-medium text-sm mb-2">{card.q}</p>
                    <p className="text-xs text-muted-foreground">{card.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-chart-1/10 via-chart-3/10 to-indigo-500/10 blur-xl" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to <span className="gradient-text">learn smarter</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From PDF upload to mastery — a complete learning toolkit powered by AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-hover rounded-2xl border border-border bg-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-chart-1/10 to-chart-2/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-chart-1" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three steps to <span className="gradient-text">mastery</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From PDF to perfect recall in minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-chart-1/25">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-5xl font-bold text-muted-foreground/20 absolute -top-2 left-1/2 -translate-x-1/2">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="animated-gradient p-12 sm:p-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to learn smarter?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of students who ace their exams with AI-powered flashcards.
              </p>
              <Link href="/login">
                <Button size="xl" className="bg-white text-chart-1 hover:bg-white/90 shadow-xl">
                  Get Started — It&apos;s Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold">Neuroocards</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Neuroocards. Built with ❤️ for learners.
          </p>
        </div>
      </footer>
    </div>
  );
}
