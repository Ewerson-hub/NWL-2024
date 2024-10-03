import { goals } from '../db/schema'
import { db } from '../db'

interface CreaGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreaGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
