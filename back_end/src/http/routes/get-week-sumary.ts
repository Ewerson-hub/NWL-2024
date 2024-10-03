import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSumary } from '../../features/get-week-sumary'

export const getWeekSumaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/sumary', async () => {
    const { summary } = await getWeekSumary()
    return { summary }
  })
}
