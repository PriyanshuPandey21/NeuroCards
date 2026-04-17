"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";

type UploadStage = "idle" | "uploading" | "extracting" | "generating" | "complete" | "error";

const stageMessages: Record<UploadStage, string> = {
  idle: "",
  uploading: "Uploading your PDF...",
  extracting: "Extracting text from document...",
  generating: "AI is generating flashcards...",
  complete: "Flashcards generated successfully!",
  error: "Something went wrong. Please try again.",
};

const stageProgress: Record<UploadStage, number> = {
  idle: 0,
  uploading: 20,
  extracting: 45,
  generating: 75,
  complete: 100,
  error: 0,
};

export default function UploadPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [stage, setStage] = useState<UploadStage>("idle");
  const [dragActive, setDragActive] = useState(false);
  const [deckId, setDeckId] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      if (!title) setTitle(droppedFile.name.replace(/\.pdf$/i, ""));
    } else {
      toast("Please upload a PDF file only.", "error");
    }
  }, [title, toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      if (!title) setTitle(selectedFile.name.replace(/\.pdf$/i, ""));
    } else {
      toast("Please upload a PDF file only.", "error");
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast("Please select a file and enter a title.", "warning");
      return;
    }

    try {
      // Stage 1: Upload
      setStage("uploading");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title.trim());

      const uploadRes = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errData = await uploadRes.json().catch(() => ({}));
        throw new Error(errData.error || "Upload failed");
      }

      const { text, title: docTitle } = await uploadRes.json();

      // Stage 2: Extract complete
      setStage("extracting");
      await new Promise((r) => setTimeout(r, 800));

      // Stage 3: Generate flashcards
      setStage("generating");
      const genRes = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, title: docTitle || title.trim() }),
      });

      if (!genRes.ok) {
        const errData = await genRes.json().catch(() => ({}));
        throw new Error(errData.error || "Generation failed");
      }

      const { deckId: newDeckId, cardCount } = await genRes.json();
      setDeckId(newDeckId);
      setStage("complete");
      toast(`Generated ${cardCount} flashcards!`, "success");
    } catch (err) {
      setStage("error");
      toast(err instanceof Error ? err.message : "Something went wrong", "error");
    }
  };

  const resetUpload = () => {
    setFile(null);
    setTitle("");
    setStage("idle");
    setDeckId(null);
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold">
          Upload <span className="gradient-text">PDF</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Drop your study material and let AI create flashcards for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Deck Title</label>
              <Input
                placeholder="e.g. Biology Chapter 5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={stage !== "idle"}
              />
            </div>

            {/* Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : file
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              } ${stage !== "idle" ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => stage === "idle" && document.getElementById("pdf-input")?.click()}
            >
              <input
                id="pdf-input"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="file-info"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-14 w-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                      <FileText className="h-7 w-7 text-emerald-500" />
                    </div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {stage === "idle" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="mt-2 text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1"
                      >
                        <X className="h-3 w-3" /> Remove
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-14 w-14 rounded-xl bg-chart-1/10 flex items-center justify-center mb-3">
                      <Upload className="h-7 w-7 text-chart-1" />
                    </div>
                    <p className="font-medium text-sm">
                      Drop your PDF here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF files only, up to 10MB
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Indicator */}
            <AnimatePresence>
              {stage !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <Progress value={stageProgress[stage]} />
                  <div className="flex items-center gap-2">
                    {stage === "error" ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : stage === "complete" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-chart-1" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      {stageMessages[stage]}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-3">
              {stage === "complete" ? (
                <>
                  <Button
                    variant="gradient"
                    className="flex-1"
                    onClick={() => router.push(`/study/${deckId}`)}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Studying
                  </Button>
                  <Button variant="outline" onClick={() => router.push(`/decks/${deckId}`)}>
                    View Deck
                  </Button>
                  <Button variant="ghost" onClick={resetUpload}>
                    Upload Another
                  </Button>
                </>
              ) : stage === "error" ? (
                <>
                  <Button variant="gradient" onClick={handleUpload} className="flex-1">
                    Try Again
                  </Button>
                  <Button variant="ghost" onClick={resetUpload}>
                    Reset
                  </Button>
                </>
              ) : (
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={handleUpload}
                  disabled={!file || !title.trim() || stage !== "idle"}
                >
                  {stage !== "idle" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Generate Flashcards
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
