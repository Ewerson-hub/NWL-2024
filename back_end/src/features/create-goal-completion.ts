import { goalCompletions, goals } from '../db/schema'
import { db } from '../db'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import dayjs from 'dayjs'

interface CreaGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({
  goalId,
}: CreaGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalComplationCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalComplationCounts)
    .select({
      desireWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCounts: sql`
            COALESCE(${goalComplationCounts.completionCount}, 0)
        `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalComplationCounts, eq(goalComplationCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionCounts, desireWeeklyFrequency } = result[0]

  if (completionCounts >= desireWeeklyFrequency) {
    throw new Error('Goal Already Completed this week!')
  }

  const insertResult = await db
    .insert(goalCompletions)
    .values({
      goalId,
    })
    .returning()

  const goalCompletion = insertResult[0]

  return {
    goalCompletion,
  }
}
