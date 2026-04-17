"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ChevronLeft,
  Loader2,
  CheckCircle,
  Sparkles,
  Target,
  Zap,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: string;
  topic: string | null;
  type: string | null;
}

interface DeckData {
  id: string;
  title: string;
  flashcards: Flashcard[];
}

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<DeckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    fetchDeck();
  }, [deckId]);

  const fetchDeck = async () => {
    try {
      const res = await fetch(`/api/flashcards/${deckId}`);
      if (res.ok) {
        const data = await res.json();
        setDeck(data);
      } else {
        toast("Failed to load deck", "error");
        router.push("/decks");
      }
    } catch {
      toast("Failed to load deck", "error");
    } finally {
      setLoading(false);
    }
  };

  const currentCard = deck?.flashcards[currentIndex];
  const totalCards = deck?.flashcards.length || 0;

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const goToNext = useCallback(() => {
    if (deck && currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else if (reviewed.size === totalCards) {
      setSessionComplete(true);
    }
  }, [currentIndex, totalCards, deck, reviewed.size]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleRating = async (rating: "easy" | "medium" | "hard" | "repeat") => {
    if (!currentCard || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await fetch("/api/review-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flashcardId: currentCard.id, rating }),
      });

      setReviewed((prev) => new Set(prev).add(currentCard.id));

      if (currentIndex < totalCards - 1) {
        goToNext();
      } else {
        setSessionComplete(true);
      }
    } catch {
      toast("Failed to save review", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flipCard();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "1") {
        handleRating("easy");
      } else if (e.key === "2") {
        handleRating("medium");
      } else if (e.key === "3") {
        handleRating("hard");
      } else if (e.key === "4") {
        handleRating("repeat");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipCard, goToNext, goToPrev, currentCard, isSubmitting]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-chart-1" />
      </div>
    );
  }

  if (!deck || totalCards === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto text-center">
        <p className="text-muted-foreground">No flashcards found in this deck.</p>
        <Link href="/decks">
          <Button variant="outline" className="mt-4">
            Back to Decks
          </Button>
        </Link>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/25">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Session Complete! 🎉</h2>
          <p className="text-muted-foreground mb-8">
            You reviewed {reviewed.size} of {totalCards} cards.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="gradient"
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
                setReviewed(new Set());
                setSessionComplete(false);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Study Again
            </Button>
            <Link href={`/decks/${deckId}`}>
              <Button variant="outline">View Deck</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href={`/decks/${deckId}`}>
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {deck.title}
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {totalCards}
          </span>
          <Badge variant="default">
            {reviewed.size} reviewed
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Progress value={currentIndex + 1} max={totalCards} className="mb-8" />

      {/* Flashcard */}
      <div
        className="perspective-1000 cursor-pointer mb-8"
        onClick={flipCard}
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-[320px] rounded-2xl border border-border bg-card p-8 flex flex-col items-center justify-center relative shadow-xl"
          >
            {/* Card type badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {currentCard?.topic && (
                <Badge variant="secondary">{currentCard.topic}</Badge>
              )}
              <Badge
                variant={
                  currentCard?.difficulty === "easy"
                    ? "success"
                    : currentCard?.difficulty === "hard"
                    ? "destructive"
                    : "warning"
                }
              >
                {currentCard?.difficulty}
              </Badge>
            </div>

            <div className="absolute top-4 right-4">
              <Badge variant="outline">
                {isFlipped ? "Answer" : "Question"}
              </Badge>
            </div>

            <div className="text-center max-w-lg">
              {!isFlipped ? (
                <div>
                  <Zap className="h-6 w-6 text-chart-1 mx-auto mb-4" />
                  <p className="text-xl font-semibold leading-relaxed">
                    {currentCard?.question}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Click or press Space to reveal answer
                  </p>
                </div>
              ) : (
                <div>
                  <Sparkles className="h-6 w-6 text-emerald-500 mx-auto mb-4" />
                  <p className="text-lg leading-relaxed">
                    {currentCard?.answer}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating Buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-center text-sm text-muted-foreground mb-3">
            How well did you know this?
          </p>
          <div className="grid grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => handleRating("easy")}
              disabled={isSubmitting}
              className="border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50"
            >
              <Target className="h-4 w-4 mr-1" />
              Easy
              <span className="text-xs text-muted-foreground ml-1">(1)</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleRating("medium")}
              disabled={isSubmitting}
              className="border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/50"
            >
              Medium
              <span className="text-xs text-muted-foreground ml-1">(2)</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleRating("hard")}
              disabled={isSubmitting}
              className="border-red-500/30 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
            >
              Hard
              <span className="text-xs text-muted-foreground ml-1">(3)</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleRating("repeat")}
              disabled={isSubmitting}
              className="border-primary/30 hover:bg-chart-1/10 hover:text-chart-1 hover:border-primary/50"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Repeat
              <span className="text-xs text-muted-foreground ml-1">(4)</span>
            </Button>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Space</kbd> to flip
        </div>
        <Button
          variant="ghost"
          onClick={goToNext}
          disabled={currentIndex === totalCards - 1 && reviewed.size !== totalCards}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
