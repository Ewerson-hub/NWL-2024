import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { createCompletionRoute } from './routes/create-completion-goal'
import { createGoalRoute } from './routes/create-goals'
import { getWeekSumaryRoute } from './routes/get-week-sumary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// set routes
app.register(getPendingGoalsRoute)
app.register(createCompletionRoute)
app.register(createGoalRoute)
app.register(getWeekSumaryRoute)

// Configure Cors
app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server Running'))
