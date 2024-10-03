import { CheckCircle2, Plus } from 'lucide-react'
import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import logo from '../assets/logo-in-orbit.svg'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { getSummary } from '../http/get-Summary'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-BR'
import { PendingGoals } from './pending-goals'

dayjs.locale(ptBr)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, //60 sec
  })

  if (!data) {
    return null
  }
  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round((data?.completed * 100) / data?.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img width="50px" src={logo} alt="in.orbit" />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>

        <Separator />
        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {Object.entries(data.completedPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formatToDate = dayjs(date).format('D[ de ]MMMM')

            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium ">
                  <span className="capitalize"> {weekDay} </span>
                  <span className="text-zinc-400 text-xs">
                    ({formatToDate})
                  </span>

                  <ul className="flex flex-col gap-3">
                    {goals.map(goal => {
                      const time = dayjs(date).format('HH:mm')
                      return (
                        <li key={goal.id} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="text-sm text-zinc-400">
                            Voce completou{' '}
                            <span className="text-zinc-100">{goal.title}</span>{' '}
                            ás <span className="text-zinc-100">{time}</span>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
