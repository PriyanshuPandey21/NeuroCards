import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decks = await prisma.deck.findMany({
      where: { userId: session.user.id },
      include: {
        _count: { select: { flashcards: true } },
        flashcards: {
          select: {
            nextReviewDate: true,
            repetitions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const now = new Date();
    const result = decks.map((deck) => ({
      id: deck.id,
      title: deck.title,
      description: deck.description,
      summary: deck.summary,
      cardCount: deck._count.flashcards,
      dueCount: deck.flashcards.filter((f) => new Date(f.nextReviewDate) <= now).length,
      masteredCount: deck.flashcards.filter((f) => f.repetitions >= 3).length,
      createdAt: deck.createdAt.toISOString(),
      updatedAt: deck.updatedAt.toISOString(),
    }));

    return Response.json(result);
  } catch (error) {
    console.error("Decks list error:", error);
    return Response.json({ error: "Failed to load decks" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deckId } = await req.json();

    // Verify ownership
    const deck = await prisma.deck.findFirst({
      where: { id: deckId, userId: session.user.id },
    });

    if (!deck) {
      return Response.json({ error: "Deck not found" }, { status: 404 });
    }

    await prisma.deck.delete({ where: { id: deckId } });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Deck delete error:", error);
    return Response.json({ error: "Failed to delete deck" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deckId, title } = await req.json();

    const deck = await prisma.deck.findFirst({
      where: { id: deckId, userId: session.user.id },
    });

    if (!deck) {
      return Response.json({ error: "Deck not found" }, { status: 404 });
    }

    const updated = await prisma.deck.update({
      where: { id: deckId },
      data: { title },
    });

    return Response.json(updated);
  } catch (error) {
    console.error("Deck update error:", error);
    return Response.json({ error: "Failed to update deck" }, { status: 500 });
  }
}
