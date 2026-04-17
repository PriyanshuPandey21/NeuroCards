"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Upload,
  BarChart3,
  Sparkles,
  ArrowRight,
  FileText,
  BrainCircuit,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const scaleUp = {
  initial: { opacity: 0, scale: 0.95, y: 30 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-chart-1 selection:text-white">
      {/* Absolute top minimal nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm" : "bg-transparent py-2"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="h-6 w-6 text-chart-5 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold tracking-tight">NeuroCards.ai</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-chart-5 transition-colors">Features</Link>
            <Link href="#testimonials" className="hover:text-chart-5 transition-colors">Testimonials</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-chart-5 transition-colors">
              Log in
            </Link>
            <Link href="/login">
              <Button className="bg-chart-5 hover:bg-chart-5/90 text-white rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 px-6">
                Go to app
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container mirroring RemNote padding */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        
        {/* Massive Highlight Title Section */}
        <section className="py-16 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]"
          >
            All the tools you need for <span className="text-chart-5">efficient studying.</span>
          </motion.h1>
        </section>

        {/* 3 Bento Pristine Cards (Image 2) */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 overflow-hidden">
          <motion.div variants={fadeLeft} initial="initial" whileInView="whileInView" className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
            <div className="w-full h-48 bg-slate-50/80 rounded-2xl mb-8 flex items-center justify-center border border-slate-100/50 relative overflow-hidden">
              {/* Mockup SVG Abstract */}
              <div className="absolute inset-x-4 top-4 bottom-0 bg-white rounded-t-xl shadow-lg border border-slate-200 border-b-0 p-4">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <FileText className="w-5 h-5 text-chart-2" />
                  <div className="h-2 w-24 bg-slate-200 rounded-full" />
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-100 rounded-full" />
                  <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
                  <div className="h-2 w-4/6 bg-chart-2/20 rounded-full relative">
                     <span className="absolute -top-3 -right-2 text-[10px] font-bold text-chart-2 bg-white px-1 shadow-sm rounded-sm">Link</span>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3"><span className="text-chart-2">PDF</span> Annotation</h3>
            <p className="text-muted-foreground leading-relaxed">Got a PDF, PowerPoint, or other document to learn from? Upload it and tie the source material to your notes.</p>
          </motion.div>

          <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
            <div className="w-full h-48 bg-slate-50/80 rounded-2xl mb-8 flex items-center justify-center border border-slate-100/50 relative overflow-hidden">
               <div className="absolute inset-x-4 top-4 bottom-0 bg-white rounded-t-xl shadow-lg border border-slate-200 border-b-0 p-4">
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg mb-2">
                    <div className="h-2 w-16 bg-slate-200 rounded-full" />
                    <div className="h-2 w-12 bg-chart-3/40 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg mb-2">
                    <div className="h-2 w-20 bg-slate-200 rounded-full" />
                    <div className="h-2 w-16 bg-chart-4/40 rounded-full" />
                  </div>
               </div>
            </div>
            <h3 className="text-2xl font-bold mb-3"><span className="text-chart-3">Smart</span> Tracking</h3>
            <p className="text-muted-foreground leading-relaxed">Keep tabs on your study progress, master targets, and upcoming reviews with dashboards you can customize to fit your needs.</p>
          </motion.div>

          <motion.div variants={fadeRight} initial="initial" whileInView="whileInView" transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
            <div className="w-full h-48 bg-slate-50/80 rounded-2xl mb-8 flex items-center justify-center border border-slate-100/50 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-chart-1 rounded-full opacity-20 animate-pulse" />
                     <div className="absolute bottom-4 left-4 border border-chart-1 text-chart-1 text-xs font-bold px-2 py-1 rounded-sm bg-white">
                       Front
                     </div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-slate-300" />
                       <span className="w-2 h-2 rounded-full bg-chart-1" />
                     </div>
                  </div>
               </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Flashcards via <span className="text-chart-1">AI</span></h3>
            <p className="text-muted-foreground leading-relaxed">Master visual and textual content automatically. Say goodbye to manual creation and let NextGen AI extract knowledge.</p>
          </motion.div>
        </section>

        {/* Interim CTA */}
        <section className="text-center mb-24">
          <p className="text-lg text-muted-foreground mb-6">Ready to add an extra day to your weekend?</p>
          <Link href="/login">
            <Button size="xl" className="bg-chart-5 hover:bg-chart-5/90 text-white rounded-xl shadow-md text-lg px-8 h-14">
              Join thousands of students - it&apos;s free &rarr;
            </Button>
          </Link>
        </section>

        {/* Section 4: Massive Split Pastel Rectangles (Image 1 style) */}
        <section className="space-y-8 mb-32">
          
          {/* Top block (Blue-ish) */}
          <motion.div variants={fadeLeft} initial="initial" whileInView="whileInView" className="bg-[#f2f7ff] rounded-[2.5rem] w-full min-h-[400px] flex flex-col lg:flex-row items-center justify-between p-12 lg:p-20 relative overflow-hidden">
            <div className="lg:w-1/2 z-10 space-y-6 text-center lg:text-left mb-12 lg:mb-0">
               <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm mb-2 text-chart-5">
                 <Upload className="h-6 w-6" />
               </div>
               <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                 Instantly <span className="text-chart-5">generate smart cards</span><br/>from your uploads
               </h2>
               <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
                 Never waste hours copying definitions. The moment you upload your PDF, AI generates structured cards synced seamlessly to your brain.
               </p>
            </div>
            <div className="lg:w-1/2 relative w-full h-[300px] lg:h-auto lg:absolute lg:right-0 lg:bottom-0 lg:top-10 flex justify-center lg:justify-end pr-0 lg:pr-10">
               {/* Abstract Mockup Desktop + Mobile */}
               <div className="w-[400px] h-[300px] bg-white rounded-t-xl border-t border-x border-slate-200 shadow-2xl relative flex flex-col p-4">
                  <div className="flex gap-2 mb-4 border-b pb-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden relative">
                     <span className="text-slate-300 font-bold text-2xl absolute opacity-30">SmartFlash Hub</span>
                     {/* Overlapping mobile mockup */}
                     <div className="absolute -left-4 top-10 w-[120px] h-[220px] bg-white border border-slate-200 rounded-3xl shadow-xl flex flex-col items-center pt-3 gap-2">
                        <div className="w-10 h-1 bg-slate-200 rounded-full" />
                        <div className="w-11/12 h-32 bg-chart-1/10 rounded-xl mt-2 flex flex-col p-2 gap-2">
                           <div className="w-1/2 h-2 bg-chart-1/30 rounded-full" />
                           <div className="w-full h-10 bg-white rounded-md mt-auto shadow-sm" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Bottom block (Purple/Pink-ish) */}
          <motion.div variants={fadeRight} initial="initial" whileInView="whileInView" className="bg-[#fcf5ff] rounded-[2.5rem] w-full min-h-[400px] flex flex-col lg:flex-row items-center justify-between p-12 lg:p-20 relative overflow-hidden">
            <div className="lg:w-1/2 z-10 space-y-6 text-center lg:text-left mb-12 lg:mb-0">
               <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm mb-2 text-chart-2">
                 <BrainCircuit className="h-6 w-6" />
               </div>
               <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                 <span className="text-chart-2">Unlock</span> perfect recall<br/>for your exams
               </h2>
               <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
                 Spaced repetition outshines all other learning techniques. Our algorithm tracks what you forget to ensure you only study exactly what matters.
               </p>
               <Link href="/login" className="inline-block mt-4">
                 <Button variant="outline" size="lg" className="rounded-xl border-slate-200 bg-white text-foreground shadow-sm hover:bg-slate-50">
                   See Spacing Algorithm &rarr;
                 </Button>
               </Link>
            </div>
            <div className="lg:w-1/2 relative flex justify-center lg:justify-end w-full h-[300px]">
               {/* Abstract Grid visual representing spaced repetition/flashcards */}
               <div className="grid grid-cols-2 gap-4 absolute -right-10 top-0 w-[500px]">
                  <div className="bg-white p-4 rounded-2xl shadow-lg border border-chart-2/10 transform rotate-[-2deg] transition hover:rotate-0">
                    <div className="h-3 w-16 bg-chart-2/20 mb-2 rounded-full" />
                    <div className="h-2 w-full bg-slate-100 mb-2 rounded-full" />
                    <div className="h-2 w-3/4 bg-slate-100 mb-6 rounded-full" />
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                      <div className="w-8 h-8 rounded-full border-2 border-chart-2 bg-chart-2/10" />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 transform rotate-[3deg] translate-y-8">
                    <div className="h-3 w-20 bg-emerald-400/20 mb-2 rounded-full" />
                    <div className="h-2 w-full bg-slate-100 mb-2 rounded-full" />
                    <div className="h-2 w-4/5 bg-slate-100 mb-6 rounded-full" />
                    <div className="flex gap-2">
                       <span className="text-xs font-bold text-emerald-500 px-2 py-1 bg-emerald-50 rounded-md">Mastered</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 transform rotate-[-1deg] translate-y-4">
                    <div className="h-3 w-12 bg-chart-4/20 mb-2 rounded-full" />
                    <div className="h-2 w-full bg-slate-100 mb-2 rounded-full" />
                   <div className="h-10 bg-slate-50 rounded-lg mt-4 border border-slate-100 flex items-center px-4">
                     <div className="h-1 w-full bg-chart-4/50 rounded-full" />
                   </div>
                  </div>
               </div>
            </div>
          </motion.div>

        </section>

        {/* Section 5: Stats and Testimonials Grid (Image 3 style) */}
        <section id="testimonials" className="mb-24 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight mb-16">
            Join <span className="text-chart-2">thousands of students</span><br/>getting higher grades in less time!
          </h2>
          
          {/* Grayscale Tech / University simulated logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale mb-20">
             <div className="flex items-center gap-2 text-2xl font-bold font-serif italic"><GraduationCap className="h-8 w-8" /> University Placeholder</div>
             <div className="flex items-center gap-2 text-2xl font-bold font-sans"><Sparkles className="h-6 w-6" /> OpenAI Tech</div>
             <div className="flex items-center gap-2 text-2xl font-bold font-mono tracking-tighter"><BarChart3 className="h-8 w-8" /> M.I.T.</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { name: "James L.", desc: "Med student", comment: "NeuroCards.ai streamlines this process unlike anything else out there. It allows you to study while facilitating memorization without breaking flow. It's a priceless superpower." },
              { name: "Danny G.", desc: "CS student", comment: "This is like a hardcore brain hack, except when you get hopelessly addicted to it your life is more organized and you're demonstrably smarter." },
              { name: "Savannah F.", desc: "Bio undergrad", comment: "NeuroCards.ai has quickly become one of my favorite products of all time. Super satisfying to run through flashcards instead of dreading them. Works like magic 🪄" }
            ].map((t, i) => (
              <motion.div key={i} variants={i === 0 ? fadeLeft : i === 1 ? fadeUp : fadeRight} initial="initial" whileInView="whileInView" transition={{ delay: i * 0.1 }} className="bg-white border text-left border-slate-100 shadow-sm p-6 rounded-2xl hover:shadow-md transition overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                     {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{t.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20 pt-16 pb-8 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <Zap className="h-6 w-6 text-chart-5" />
                 <span className="font-bold text-2xl tracking-tight">NeuroCards.ai</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm mb-6 leading-relaxed">
                A college project designed to transform the way students study. Upload PDFs, generate AI flashcards, and master your subjects with minimal effort.
              </p>
              <div className="flex gap-4 text-slate-400">
                 {/* GitHub Link mapping for the project */}
                 <a href="https://github.com/PriyanshuPandey21/NeuroCards" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-300 hover:border-chart-5 hover:text-chart-5 hover:bg-chart-5/5 transition flex items-center justify-center font-bold text-xs">GH</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-400 mb-4 tracking-wider text-sm">PROJECT</h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-700">
                <li><Link href="#features" className="hover:text-chart-5 transition-colors">Features Overview</Link></li>
                <li><Link href="/login" className="hover:text-chart-5 transition-colors">Launch App</Link></li>
                <li><Link href="#testimonials" className="hover:text-chart-5 transition-colors">Testimonials</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-400 mb-4 tracking-wider text-sm">DEVELOPER</h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-700">
                <li><a href="https://github.com/PriyanshuPandey21" target="_blank" rel="noopener noreferrer" className="hover:text-chart-5 transition-colors">GitHub Profile</a></li>
                <li><a href="https://github.com/PriyanshuPandey21/NeuroCards" target="_blank" rel="noopener noreferrer" className="hover:text-chart-5 transition-colors">Repository</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex text-center flex-col items-center justify-center text-sm font-semibold text-slate-400">
             <span>© {new Date().getFullYear()} NeuroCards.ai. A college project.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
