"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Layers,
  BookOpen,
  Target,
  Flame,
  ArrowRight,
  Plus,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface DeckSummary {
  id: string;
  title: string;
  cardCount: number;
  createdAt: string;
  dueCount: number;
  masteredCount: number;
}

interface DashboardData {
  totalDecks: number;
  totalCards: number;
  cardsMastered: number;
  cardsToReview: number;
  studyStreak: number;
  recentDecks: DeckSummary[];
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Decks",
      value: data?.totalDecks || 0,
      icon: Layers,
      color: "from-chart-1 to-chart-2",
      bgColor: "bg-chart-1/10",
      textColor: "text-chart-1",
    },
    {
      label: "Cards Mastered",
      value: data?.cardsMastered || 0,
      icon: Target,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
    {
      label: "Due Today",
      value: data?.cardsToReview || 0,
      icon: BookOpen,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
    {
      label: "Study Streak",
      value: `${data?.studyStreak || 0}d`,
      icon: Flame,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      textColor: "text-red-500",
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold">
          Welcome back,{" "}
          <span className="gradient-text">
            {session?.user?.name || "Learner"}
          </span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&#39;s your learning progress at a glance.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-5">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ) : (
                  <>
                    <div
                      className={`h-10 w-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}
                    >
                      <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/upload">
            <Card className="card-hover cursor-pointer group border-dashed">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center shadow-lg shadow-chart-1/25">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Upload New PDF</p>
                  <p className="text-sm text-muted-foreground">
                    Create flashcards from a new document
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors ml-auto" />
              </CardContent>
            </Card>
          </Link>
          {data && data.cardsToReview > 0 && (
            <Link href={data.recentDecks?.[0] ? `/study/${data.recentDecks[0].id}` : "/decks"}>
              <Card className="card-hover cursor-pointer group">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Review Due Cards</p>
                    <p className="text-sm text-muted-foreground">
                      {data.cardsToReview} cards waiting for review
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors ml-auto" />
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Recent Decks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Decks</h2>
          <Link href="/decks">
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : data?.recentDecks && data.recentDecks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.recentDecks.map((deck, index) => {
              const masteryPercent =
                deck.cardCount > 0
                  ? Math.round((deck.masteredCount / deck.cardCount) * 100)
                  : 0;
              return (
                <motion.div
                  key={deck.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link href={`/decks/${deck.id}`}>
                    <Card className="card-hover cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {deck.title}
                          </h3>
                          <Badge
                            variant={deck.dueCount > 0 ? "warning" : "success"}
                          >
                            {deck.dueCount > 0
                              ? `${deck.dueCount} due`
                              : "All done"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Layers className="h-3 w-3" />
                            {deck.cardCount} cards
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(deck.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Mastery</span>
                            <span className="font-medium">{masteryPercent}%</span>
                          </div>
                          <Progress value={masteryPercent} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Layers className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">No decks yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a PDF to create your first flashcard deck!
              </p>
              <Link href="/upload">
                <Button variant="gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload PDF
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
