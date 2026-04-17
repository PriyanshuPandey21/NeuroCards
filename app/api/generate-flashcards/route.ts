import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateFlashcardsFromText } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, title, cardCount } = await req.json();

    if (!text || text.trim().length < 50) {
      return Response.json({ error: "Not enough text to generate flashcards" }, { status: 400 });
    }

    const parsedCount = cardCount ? Math.min(Math.max(parseInt(cardCount, 10), 1), 25) : 15;

    // Generate flashcards using AI
    const result = await generateFlashcardsFromText(text, title || "Untitled", parsedCount);

    // Create deck with flashcards in database
    const deck = await prisma.deck.create({
      data: {
        title: title || "Untitled Deck",
        userId: session.user.id,
        summary: result.summary,
        pdfText: text.substring(0, 50000), // Store truncated text for regeneration
        cardCount: result.flashcards.length,
        flashcards: {
          create: result.flashcards.map((card) => ({
            question: card.question,
            answer: card.answer,
            difficulty: card.difficulty,
            topic: card.topic,
            type: card.type,
          })),
        },
      },
    });

    return Response.json({
      deckId: deck.id,
      cardCount: result.flashcards.length,
      summary: result.summary,
    });
  } catch (error) {
    console.error("Flashcard generation error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to generate flashcards" },
      { status: 500 }
    );
  }
}
