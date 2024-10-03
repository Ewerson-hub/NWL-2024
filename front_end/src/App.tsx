import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goals'
import { Summary } from './components/summary'
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-Summary'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, //60 sec
  })

  return (
    <Dialog>
      {/*  */}
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
