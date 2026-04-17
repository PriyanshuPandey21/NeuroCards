import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  calculateSM2,
  mapDifficultyToQuality,
} from "@/lib/spaced-repetition";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { flashcardId, rating } = await req.json();

    if (!flashcardId || !rating) {
      return Response.json({ error: "Missing flashcardId or rating" }, { status: 400 });
    }

    // Get current flashcard
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: flashcardId },
      include: { deck: { select: { userId: true } } },
    });

    if (!flashcard || flashcard.deck.userId !== session.user.id) {
      return Response.json({ error: "Flashcard not found" }, { status: 404 });
    }

    // Calculate SM-2
    const quality = mapDifficultyToQuality(rating);
    const sm2Result = calculateSM2(
      {
        easeFactor: flashcard.easeFactor,
        interval: flashcard.interval,
        repetitions: flashcard.repetitions,
      },
      quality
    );

    // Update flashcard
    const updated = await prisma.flashcard.update({
      where: { id: flashcardId },
      data: {
        easeFactor: sm2Result.easeFactor,
        interval: sm2Result.interval,
        repetitions: sm2Result.repetitions,
        nextReviewDate: sm2Result.nextReviewDate,
        lastReviewDate: new Date(),
      },
    });

    // Update study streak
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { lastStudyDate: true, studyStreak: true },
    });

    if (user) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastStudy = user.lastStudyDate ? new Date(user.lastStudyDate) : null;
      if (lastStudy) lastStudy.setHours(0, 0, 0, 0);

      let newStreak = user.studyStreak;

      if (!lastStudy || lastStudy.getTime() < today.getTime()) {
        // Check if yesterday or older
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastStudy && lastStudy.getTime() === yesterday.getTime()) {
          newStreak += 1;
        } else if (!lastStudy || lastStudy.getTime() < yesterday.getTime()) {
          newStreak = 1;
        }

        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            studyStreak: newStreak,
            lastStudyDate: new Date(),
          },
        });
      }
    }

    return Response.json({
      nextReviewDate: updated.nextReviewDate,
      interval: updated.interval,
      easeFactor: updated.easeFactor,
    });
  } catch (error) {
    console.error("Review card error:", error);
    return Response.json({ error: "Failed to review card" }, { status: 500 });
  }
}
