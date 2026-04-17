import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get all decks with flashcard counts
    const decks = await prisma.deck.findMany({
      where: { userId },
      include: {
        flashcards: {
          select: {
            id: true,
            nextReviewDate: true,
            repetitions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const totalDecks = decks.length;
    let totalCards = 0;
    let cardsMastered = 0;
    let cardsToReview = 0;

    const recentDecks = decks.slice(0, 6).map((deck) => {
      const dueCount = deck.flashcards.filter(
        (f) => new Date(f.nextReviewDate) <= now
      ).length;
      const masteredCount = deck.flashcards.filter(
        (f) => f.repetitions >= 3
      ).length;

      totalCards += deck.flashcards.length;
      cardsMastered += masteredCount;
      cardsToReview += dueCount;

      return {
        id: deck.id,
        title: deck.title,
        cardCount: deck.flashcards.length,
        createdAt: deck.createdAt.toISOString(),
        dueCount,
        masteredCount,
      };
    });

    // Count remaining deck stats
    decks.slice(6).forEach((deck) => {
      totalCards += deck.flashcards.length;
      cardsMastered += deck.flashcards.filter((f) => f.repetitions >= 3).length;
      cardsToReview += deck.flashcards.filter(
        (f) => new Date(f.nextReviewDate) <= now
      ).length;
    });

    // Get study streak
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { studyStreak: true },
    });

    return Response.json({
      totalDecks,
      totalCards,
      cardsMastered,
      cardsToReview,
      studyStreak: user?.studyStreak || 0,
      recentDecks,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return Response.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}
