import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deckId } = await params;

    const deck = await prisma.deck.findFirst({
      where: { id: deckId, userId: session.user.id },
      include: {
        flashcards: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!deck) {
      return Response.json({ error: "Deck not found" }, { status: 404 });
    }

    return Response.json(deck);
  } catch (error) {
    console.error("Flashcards fetch error:", error);
    return Response.json({ error: "Failed to load flashcards" }, { status: 500 });
  }
}

// Add a manual flashcard
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deckId } = await params;
    const { question, answer, difficulty, topic } = await req.json();

    // Verify ownership
    const deck = await prisma.deck.findFirst({
      where: { id: deckId, userId: session.user.id },
    });

    if (!deck) {
      return Response.json({ error: "Deck not found" }, { status: 404 });
    }

    const flashcard = await prisma.flashcard.create({
      data: {
        deckId,
        question,
        answer,
        difficulty: difficulty || "medium",
        topic: topic || null,
        type: "concept",
      },
    });

    // Update card count
    await prisma.deck.update({
      where: { id: deckId },
      data: { cardCount: { increment: 1 } },
    });

    return Response.json(flashcard);
  } catch (error) {
    console.error("Add flashcard error:", error);
    return Response.json({ error: "Failed to add flashcard" }, { status: 500 });
  }
}

// Update a flashcard
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deckId } = await params;
    const { flashcardId, question, answer, difficulty, topic } = await req.json();

    // Verify ownership
    const deck = await prisma.deck.findFirst({
      where: { id: deckId, userId: session.user.id },
    });

    if (!deck) {
      return Response.json({ error: "Deck not found" }, { status: 404 });
    }

    const flashcard = await prisma.flashcard.update({
      where: { id: flashcardId },
      data: {
        ...(question && { question }),
        ...(answer && { answer }),
        ...(difficulty && { difficulty }),
        ...(topic !== undefined && { topic }),
      },
    });

    return Response.json(flashcard);
  } catch (error) {
    console.error("Update flashcard error:", error);
    return Response.json({ error: "Failed to update flashcard" }, { status: 500 });
  }
}

// Delete a flashcard
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ deckId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deckId } = await params;
    const { flashcardId } = await req.json();

    const deck = await prisma.deck.findFirst({
      where: { id: deckId, userId: session.user.id },
    });

    if (!deck) {
      return Response.json({ error: "Deck not found" }, { status: 404 });
    }

    await prisma.flashcard.delete({ where: { id: flashcardId } });

    await prisma.deck.update({
      where: { id: deckId },
      data: { cardCount: { decrement: 1 } },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete flashcard error:", error);
    return Response.json({ error: "Failed to delete flashcard" }, { status: 500 });
  }
}
