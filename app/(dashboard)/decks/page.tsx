"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Plus,
  Search,
  Clock,
  Target,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface DeckItem {
  id: string;
  title: string;
  cardCount: number;
  dueCount: number;
  masteredCount: number;
  summary: string | null;
  createdAt: string;
}

export default function DecksListPage() {
  const [decks, setDecks] = useState<DeckItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const res = await fetch("/api/decks");
      if (res.ok) {
        setDecks(await res.json());
      }
    } catch {
      console.error("Failed to fetch decks");
    } finally {
      setLoading(false);
    }
  };

  const filteredDecks = decks.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            My <span className="gradient-text">Decks</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            {decks.length} deck{decks.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link href="/upload">
          <Button variant="gradient">
            <Plus className="h-4 w-4 mr-2" />
            New Deck
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search decks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Decks Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredDecks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDecks.map((deck, index) => {
            const mastery =
              deck.cardCount > 0
                ? Math.round((deck.masteredCount / deck.cardCount) * 100)
                : 0;
            return (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/decks/${deck.id}`}>
                  <Card className="card-hover cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold line-clamp-1 flex-1">
                          {deck.title}
                        </h3>
                        <Badge
                          variant={deck.dueCount > 0 ? "warning" : "success"}
                          className="ml-2 shrink-0"
                        >
                          {deck.dueCount > 0 ? `${deck.dueCount} due` : "✓"}
                        </Badge>
                      </div>

                      {deck.summary && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {deck.summary}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          {deck.cardCount} cards
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {deck.masteredCount} mastered
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(deck.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Mastery</span>
                          <span className="font-medium">{mastery}%</span>
                        </div>
                        <Progress value={mastery} />
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
            <h3 className="font-semibold mb-1">
              {search ? "No decks found" : "No decks yet"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {search
                ? "Try a different search term"
                : "Upload a PDF to create your first deck!"}
            </p>
            {!search && (
              <Link href="/upload">
                <Button variant="gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload PDF
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
