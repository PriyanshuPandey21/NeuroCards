/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Quality ratings:
 * 0 - Complete blackout / repeat
 * 1 - Hard (Incorrect but remembered upon seeing the answer)
 * 2 - Hard (Correct but with serious difficulty)
 * 3 - Medium (Correct with some difficulty)
 * 4 - Easy (Correct with minor hesitation)
 * 5 - Perfect (Instant recall)
 */

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface SM2Input {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export interface SM2Output {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: Date;
}

export function mapDifficultyToQuality(
  difficulty: "easy" | "medium" | "hard" | "repeat"
): ReviewQuality {
  switch (difficulty) {
    case "easy":
      return 5;
    case "medium":
      return 3;
    case "hard":
      return 1;
    case "repeat":
      return 0;
  }
}

export function calculateSM2(input: SM2Input, quality: ReviewQuality): SM2Output {
  let { easeFactor, interval, repetitions } = input;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response — reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Ease factor must not go below 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    repetitions,
    nextReviewDate,
  };
}
