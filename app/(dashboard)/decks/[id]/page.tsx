"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Play,
  Edit3,
  Trash2,
  Plus,
  Search,
  Download,
  RefreshCw,
  Loader2,
  Check,
  X,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";
import jsPDF from "jspdf";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: string;
  topic: string | null;
  type: string | null;
  repetitions: number;
  nextReviewDate: string;
}

interface DeckDetail {
  id: string;
  title: string;
  summary: string | null;
  pdfText: string | null;
  cardCount: number;
  createdAt: string;
  flashcards: Flashcard[];
}

export default function DeckDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<DeckDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editData, setEditData] = useState({ question: "", answer: "" });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addData, setAddData] = useState({ question: "", answer: "", difficulty: "medium", topic: "" });
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    fetchDeck();
  }, [deckId]);

  const fetchDeck = async () => {
    try {
      const res = await fetch(`/api/flashcards/${deckId}`);
      if (res.ok) {
        const data = await res.json();
        setDeck(data);
        setNewTitle(data.title);
      } else {
        toast("Deck not found", "error");
        router.push("/decks");
      }
    } catch {
      toast("Failed to load deck", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!newTitle.trim()) return;
    try {
      await fetch("/api/decks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deckId, title: newTitle.trim() }),
      });
      setDeck((prev) => prev ? { ...prev, title: newTitle.trim() } : prev);
      setEditingTitle(false);
      toast("Deck renamed", "success");
    } catch {
      toast("Failed to rename", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await fetch("/api/decks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deckId }),
      });
      toast("Deck deleted", "success");
      router.push("/decks");
    } catch {
      toast("Failed to delete deck", "error");
    }
  };

  const handleEditCard = async (flashcardId: string) => {
    try {
      const res = await fetch(`/api/flashcards/${deckId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flashcardId,
          question: editData.question,
          answer: editData.answer,
        }),
      });
      if (res.ok) {
        setDeck((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            flashcards: prev.flashcards.map((f) =>
              f.id === flashcardId
                ? { ...f, question: editData.question, answer: editData.answer }
                : f
            ),
          };
        });
        setEditingCard(null);
        toast("Card updated", "success");
      }
    } catch {
      toast("Failed to update card", "error");
    }
  };

  const handleDeleteCard = async (flashcardId: string) => {
    try {
      await fetch(`/api/flashcards/${deckId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flashcardId }),
      });
      setDeck((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          flashcards: prev.flashcards.filter((f) => f.id !== flashcardId),
          cardCount: prev.cardCount - 1,
        };
      });
      toast("Card deleted", "success");
    } catch {
      toast("Failed to delete card", "error");
    }
  };

  const handleAddCard = async () => {
    if (!addData.question.trim() || !addData.answer.trim()) {
      toast("Question and answer are required", "warning");
      return;
    }
    try {
      const res = await fetch(`/api/flashcards/${deckId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addData),
      });
      if (res.ok) {
        const newCard = await res.json();
        setDeck((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            flashcards: [...prev.flashcards, newCard],
            cardCount: prev.cardCount + 1,
          };
        });
        setShowAddDialog(false);
        setAddData({ question: "", answer: "", difficulty: "medium", topic: "" });
        toast("Card added", "success");
      }
    } catch {
      toast("Failed to add card", "error");
    }
  };

  const handleRegenerate = async () => {
    if (!deck?.pdfText) {
      toast("No PDF text available for regeneration", "warning");
      return;
    }
    setRegenerating(true);
    try {
      const res = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: deck.pdfText, title: deck.title, deckId }),
      });
      if (res.ok) {
        toast("Flashcards regenerated! Reloading...", "success");
        await fetchDeck();
      } else {
        toast("Failed to regenerate", "error");
      }
    } catch {
      toast("Failed to regenerate flashcards", "error");
    } finally {
      setRegenerating(false);
    }
  };

  const handleExportPDF = () => {
    if (!deck) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(deck.title, 20, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`${deck.flashcards.length} flashcards`, 20, 28);

    let y = 40;
    deck.flashcards.forEach((card, i) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text(`Q${i + 1}: ${card.question}`, 20, y, { maxWidth: 170 });
      const qLines = doc.splitTextToSize(`Q${i + 1}: ${card.question}`, 170);
      y += qLines.length * 5 + 3;
      doc.setTextColor(80);
      doc.setFontSize(10);
      doc.text(`A: ${card.answer}`, 25, y, { maxWidth: 165 });
      const aLines = doc.splitTextToSize(`A: ${card.answer}`, 165);
      y += aLines.length * 5 + 8;
    });

    doc.save(`${deck.title}.pdf`);
    toast("Deck exported as PDF", "success");
  };

  const filteredCards = deck?.flashcards.filter((card) => {
    const matchesSearch =
      card.question.toLowerCase().includes(search.toLowerCase()) ||
      card.answer.toLowerCase().includes(search.toLowerCase()) ||
      (card.topic?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesDifficulty =
      filterDifficulty === "all" || card.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const now = new Date();
  const dueCount = deck?.flashcards.filter(
    (f) => new Date(f.nextReviewDate) <= now
  ).length || 0;
  const masteredCount = deck?.flashcards.filter(
    (f) => f.repetitions >= 3
  ).length || 0;
  const mastery = deck && deck.flashcards.length > 0
    ? Math.round((masteredCount / deck.flashcards.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="space-y-3 mt-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (!deck) return null;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/decks">
          <Button variant="ghost" size="sm" className="mb-3">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Decks
          </Button>
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {editingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-2xl font-bold h-12"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleRename()}
                />
                <Button size="icon" variant="ghost" onClick={handleRename}>
                  <Check className="h-4 w-4 text-emerald-500" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditingTitle(false);
                    setNewTitle(deck.title);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <h1
                className="text-2xl lg:text-3xl font-bold cursor-pointer hover:text-chart-1 transition-colors"
                onClick={() => setEditingTitle(true)}
                title="Click to rename"
              >
                {deck.title}
              </h1>
            )}
            {deck.summary && (
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                {deck.summary}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href={`/study/${deckId}`}>
              <Button variant="gradient">
                <Play className="h-4 w-4 mr-2" />
                Study
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{deck.flashcards.length}</p>
            <p className="text-xs text-muted-foreground">Total Cards</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">{dueCount}</p>
            <p className="text-xs text-muted-foreground">Due Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500">{masteredCount}</p>
            <p className="text-xs text-muted-foreground">Mastered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold gradient-text">{mastery}%</p>
            <p className="text-xs text-muted-foreground">Mastery</p>
            <Progress value={mastery} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions Bar */}
      <motion.div
        className="flex flex-wrap items-center gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Button variant="outline" size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Add Card
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={regenerating || !deck.pdfText}
        >
          {regenerating ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Regenerate
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportPDF}>
          <Download className="h-4 w-4 mr-1" />
          Export PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Deck
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search flashcards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "easy", "medium", "hard"].map((d) => (
            <Button
              key={d}
              variant={filterDifficulty === d ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterDifficulty(d)}
              className="capitalize"
            >
              {d}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Flashcards List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredCards?.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="card-hover">
                <CardContent className="p-4">
                  {editingCard === card.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editData.question}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, question: e.target.value }))
                        }
                        placeholder="Question"
                      />
                      <Textarea
                        value={editData.answer}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, answer: e.target.value }))
                        }
                        placeholder="Answer"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEditCard(card.id)}>
                          <Check className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingCard(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={
                              card.difficulty === "easy"
                                ? "success"
                                : card.difficulty === "hard"
                                ? "destructive"
                                : "warning"
                            }
                          >
                            {card.difficulty}
                          </Badge>
                          {card.topic && (
                            <Badge variant="secondary">{card.topic}</Badge>
                          )}
                          {card.repetitions >= 3 && (
                            <Badge variant="success">Mastered</Badge>
                          )}
                        </div>
                        <p className="font-medium text-sm mb-1">{card.question}</p>
                        <p className="text-sm text-muted-foreground">{card.answer}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setEditingCard(card.id);
                            setEditData({
                              question: card.question,
                              answer: card.answer,
                            });
                          }}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredCards?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No flashcards match your search.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent onClose={() => setShowDeleteDialog(false)}>
          <DialogHeader>
            <DialogTitle>Delete Deck</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deck.title}&quot;? This will
              permanently delete all {deck.flashcards.length} flashcards. This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Card Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent onClose={() => setShowAddDialog(false)}>
          <DialogHeader>
            <DialogTitle>Add New Flashcard</DialogTitle>
            <DialogDescription>
              Create a custom flashcard for this deck.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium">Question</label>
              <Textarea
                placeholder="Enter your question..."
                value={addData.question}
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, question: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Answer</label>
              <Textarea
                placeholder="Enter the answer..."
                value={addData.answer}
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, answer: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <select
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm mt-1"
                  value={addData.difficulty}
                  onChange={(e) =>
                    setAddData((prev) => ({ ...prev, difficulty: e.target.value }))
                  }
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Topic (optional)</label>
                <Input
                  placeholder="e.g. Mitosis"
                  value={addData.topic}
                  onChange={(e) =>
                    setAddData((prev) => ({ ...prev, topic: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleAddCard}>
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
